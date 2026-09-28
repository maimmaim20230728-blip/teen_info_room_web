'use strict';
/* 10代の情報室 起動スモークテスト(疑似DOM・v1.0)
   実在idだけ返す疑似DOMで lang.js + audio.js + tap.js + app.js を起動し、SPEC_YC_V0.md §7 + V0_1〜V0_6 + V1(世界版) の受け入れ条件を検証する。
   ・v0.4: 可視領域(4タブ)は情報提供の形(三人称・記事調)。窓口名を除き「あなた」への語りかけが無い(ja)。タブ「おなじひと」→「データ」
   ・v0.5: メモの部屋の書きかけを kyukei.draft に保持(再起動で復元・しまうと消える・可視領域に出ない)
   ・v0.6: データタブを4カードに再編(学年別=約15/約17/約24人に1人・毎日数時間・だれにも話していない・ひとりの時間)
   ・v1.0: 日英2言語(lang.js)。既定=navigator判定/setLangで全画面切替/ja文言ゴールデン一致/en=5データ(Around the world)+7窓口/🌐は連打対象外
   ・v1.1: 12言語(+de/fr/es/it/pt/nl/sv/ko/zh/ar)。キー完全一致(パリティ)/各言語描画(データ5・まどぐち2)/ar dir=rtl/en仮値の残留なし/🌐シート12言語
   ・起動時に例外なし / 4画面(ひといき/おなじひと/しっておく/まどぐち)の切替 / 各カード表示
   ・可視UIに メモ・せってい・そよぎ の入口/痕跡が無い(v0.3)
   ・初回だけ一度きり案内が出て「わかった」でintroShown=true・以後(リロード)は出ない(v0.3)
   ・アプリ名N連打→「メモの部屋」が開く(書く+一覧が一体)→ しまう→欄が空+一覧に即反映(ヒントトーストは出さない)→ 個別削除 →とじる
   ・せっていは メモの部屋の下部ボタンからのみ開く(v0.3)。クレジット/退出先URL/連打回数/おんがく が中にある
   ・メモの部屋・せっていは保存しない(初期状態は閉じている=リロードで閉じる)
   ・クイック退出が location.replace(戻れない)
   ・BGM(v0.2): audio.jsのSound API・せっていの「おんがく」トグルでprefs.bgm切替+保存・無音ダミーSound廃止
   ・textContentのみ(innerHTML禁止)・clickを使わない(全ボタンTap)
   使い方: node _smoke.js  */
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('./index.html', 'utf8');
const appSrc = fs.readFileSync('./app.js', 'utf8');
const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]));

/* ---- 疑似DOM要素(textContent設定で子をクリア/イベントは_evに保持) ---- */
function makeEl(tag){
  const node = {
    tagName:(tag || 'div').toUpperCase(),
    children:[], dataset:{}, _ev:{}, _attr:{},
    /* style は素の代入(tap.jsのtouchAction)と setProperty(CSS変数 --tabbar-h)の両方が来る */
    style:{ _props:{},
      setProperty(k, v){ this._props[k] = String(v); },
      getPropertyValue(k){ return (k in this._props) ? this._props[k] : ''; },
      removeProperty(k){ delete this._props[k]; } },
    className:'', value:'', placeholder:'', src:'', href:'', target:'', rel:'', rows:0,
    type:'', inputMode:'', hidden:false, disabled:false, lang:'', dir:'',
    appendChild(c){ this.children.push(c); return c; },
    get childNodes(){ return this.children; },
    setAttribute(k, v){ this._attr[k] = v; }, getAttribute(k){ return (k in this._attr) ? this._attr[k] : null; },
    removeAttribute(k){ delete this._attr[k]; },
    addEventListener(t, h){ (this._ev[t] = this._ev[t] || []).push(h); },
    removeEventListener(){},
    focus(){}, click(){}, scrollIntoView(){}, scrollTo(){}, remove(){},
    getBoundingClientRect(){ return { top:0, left:0, width:100, height:50, bottom:50, right:100 }; },
    classList:{
      _s:new Set(),
      add(...c){ c.forEach(x => this._s.add(x)); },
      remove(...c){ c.forEach(x => this._s.delete(x)); },
      toggle(c, f){ if(f === undefined) f = !this._s.has(c); if(f) this._s.add(c); else this._s.delete(c); return f; },
      contains(c){ return this._s.has(c); }
    },
    querySelector(){ return makeEl(); },
    querySelectorAll(){ return []; }
  };
  let _text = '';
  Object.defineProperty(node, 'textContent', {
    get(){ return _text; },
    set(v){ _text = (v == null ? '' : String(v)); node.children.length = 0; }
  });
  return node;
}

const created = {};
function byId(id){
  if(!ids.has(id)) return null;
  if(!created[id]) created[id] = makeEl();
  return created[id];
}
function tap(elm){   // pointerdown → pointerup(同一pointerId・移動なし)
  const d = { pointerId:1, isPrimary:true, clientX:0, clientY:0, preventDefault(){} };
  (elm._ev.pointerdown || []).forEach(h => h(d));
  (elm._ev.pointerup   || []).forEach(h => h({ pointerId:1, clientX:0, clientY:0 }));
}
function allText(node){
  let s = (node && node.textContent) || '';
  (node && node.children || []).forEach(c => { s += ' ' + allText(c); });
  return s;
}
function collectTag(node, tagName, out){
  out = out || [];
  (node.children || []).forEach(c => {
    if(c.tagName === tagName) out.push(c);
    collectTag(c, tagName, out);
  });
  return out;
}

/* ---- localStorage / location ---- */
const store = {};
const localStorageStub = {
  getItem:k => (k in store ? store[k] : null),
  setItem:(k, v) => { store[k] = String(v); },
  removeItem:k => { delete store[k]; }
};
const loc = { _replace:[], _assign:[], _href:'', hostname:'smoke.test', protocol:'https:' };
const locationStub = {
  replace:u => loc._replace.push(u),
  assign:u => loc._assign.push(u),
  get href(){ return loc._href; }, set href(v){ loc._href = v; },
  hostname:'smoke.test', protocol:'https:'
};

/* ---- Web Audio スタブ(audio.jsのBGM生成が例外なく走るだけの最小実装) ---- */
function fakeParam(){ return { value:0, setValueAtTime(){}, linearRampToValueAtTime(){}, exponentialRampToValueAtTime(){}, setTargetAtTime(){} }; }
function fakeNode(){ return { type:'', frequency:fakeParam(), gain:fakeParam(), connect(){}, disconnect(){}, start(){}, stop(){} }; }
function FakeAudioContext(){
  this.state = 'running';   // 起動直後にrunning(=タップでBGMを開始できる)
  this.currentTime = 0;
  this.destination = {};
  this.resume = function(){ this.state = 'running'; };
  this.createOscillator = fakeNode;
  this.createGain = fakeNode;
  this.createBiquadFilter = function(){ return { type:'', frequency:fakeParam(), connect(){}, disconnect(){} }; };
}

/* ---- ResizeObserver スタブ(下タブの実寸監視・observe対象を記録するだけ) ---- */
const roObserved = [];
function FakeResizeObserver(cb){
  this._cb = cb;
  this.observe = t => { roObserved.push(t); };
  this.unobserve = () => {};
  this.disconnect = () => {};
}

/* ---- sandbox ---- */
const documentStub = {
  documentElement:makeEl('html'), head:makeEl('head'), body:makeEl('body'), title:'',
  createElement:t => makeEl(t),
  getElementById:id => byId(id),
  addEventListener(){},
  querySelector(sel){ const m = /^#([A-Za-z0-9_-]+)$/.exec(String(sel).trim()); return m ? byId(m[1]) : makeEl(); },
  querySelectorAll(){ return []; }   // '#tabbar .tab' 等は空(showScreenは例外なく素通り)
};
const clip = [];   // v1.6 例文コピーの受け皿(navigator.clipboard スタブ)
const sandbox = {
  console, document:documentStub, URL,
  navigator:{ language:'ja-JP', clipboard:{ writeText(s){ clip.push(s); return { then(ok){ ok(); } }; } } },
  localStorage:localStorageStub,
  location:locationStub,
  scrollTo(){},
  addEventListener(){},
  setTimeout:() => 0, setInterval:() => 0, clearInterval(){}, clearTimeout(){},
  AudioContext:FakeAudioContext, ResizeObserver:FakeResizeObserver,
  Date
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

const fails = [];
function check(name, cond){ if(cond) console.log('  OK  ' + name); else { console.log('  NG  ' + name); fails.push(name); } }

/* ---- [条件1] 起動(script順=lang.js→audio.js→tap.js→app.js) ---- */
/* Sound は audio.js の const(sandbox直下には現れない)。同じスクリプト内で window に退避して検査可能にする */
const src = ['./lang.js', './audio.js', './tap.js', './app.js'].map(f => fs.readFileSync(f, 'utf8')).join('\n')
  + '\n;try{ window.__Sound = Sound; }catch(e){}'
  + '\n;try{ window.__FAM = { FAM_MAP: FAM_MAP, FAM_SRC: FAM_SRC }; }catch(e){}';
vm.createContext(sandbox);
try{
  vm.runInContext(src, sandbox, { filename:'app-bundle.js' });
}catch(e){
  console.log('SMOKE NG: 起動時に例外');
  console.log(e.stack.split('\n').slice(0, 8).join('\n'));
  process.exit(1);
}
console.log('[条件1] 起動時に例外なし');
check('起動完了(init実行)', true);
check('ヘッダーにアプリ名が入る', byId('hd-title').textContent.length > 0);
check('初期表示は ひといき(他はhidden)',
  !byId('scr-hitoiki').classList.contains('hidden') &&
  byId('scr-onaji').classList.contains('hidden') &&
  byId('scr-madoguchi').classList.contains('hidden'));

/* ---- [v0.3 初回案内] introShown未設定=初回は案内が一度だけ出る ---- */
console.log('[v0.3 初回案内] 初回だけ一度きり案内・「わかった」でintroShown=true');
check('初回(introShown未設定)は案内オーバーレイが出る', !byId('intro').classList.contains('hidden'));
const introTxt = byId('intro-text').textContent;
check('案内文が原案どおり(かくれた機能/名前を3回/メモとせっていの部屋/もう二度と表示されません)',
  introTxt.includes('この部屋には、かくれた機能があります') &&
  introTxt.includes('「10代の情報室」の名前を 3回 つづけてタップ') &&
  introTxt.includes('メモと せっていの部屋が ひらきます') &&
  introTxt.includes('この案内は、もう二度と表示されません'));
tap(byId('intro-ok'));
check('「わかった」1タップで閉じ、introShown=true を保存', byId('intro').classList.contains('hidden') && JSON.parse(store['kyukei.prefs']).introShown === true);

/* ---- [v0.3 可視UI] メモ・せってい・そよぎ の入口が見えない ---- */
console.log('[v0.3 可視UI] メモ・せってい・そよぎ の痕跡が可視UIに無い');
const visEnd = html.indexOf('<!-- メモの部屋');
const visibleRaw = html.slice(html.indexOf('<body'), visEnd);   // ヘッダー+4タブ画面+タブバー(オーバーレイより前)
const visible = visibleRaw.replace(/<!--[\s\S]*?-->/g, '');       // コメントは可視UIではないので除外
check('可視UI(ヘッダー+4タブ+タブバー)に せってい/メモ/そよぎ の文字が無い',
  !visible.includes('せってい') && !visible.includes('メモ') && !visible.includes('そよぎ'));
check('せってい入口(#open-settings)は可視UIに無く、メモの部屋の中にある',
  visible.indexOf('open-settings') < 0 && html.indexOf('id="open-settings"') > visEnd);
check('クレジット(そよぎ/HPリンク)はせってい内=隠し領域にある', html.indexOf('soudansoyogi.com') > visEnd);

/* ---- [v0.1] メモの入口が どこにも見えない(4タブ・scr-memoは廃止) ---- */
console.log('[v0.1] メモの入口が画面に無い(4タブ)');
check('下タブは4つ(data-scrがhitoiki/onaji/shitte/madoguchiのみ)', (html.match(/data-scr="/g) || []).length === 4);
check('下タブに data-scr="memo" が無い', !/data-scr="memo"/.test(html));
check('メモ用セクション(scr-memo)が廃止されている', !/id="scr-memo"/.test(html) && byId('scr-memo') === null);
check('せっていの説明だけが存在に触れる(「メモの部屋が ひらきます」)', html.includes('メモの部屋が ひらきます'));

/* ---- [条件2] 4画面の切替 ---- */
console.log('[条件2] 4タブの切替・カード表示・呼吸アニメ・クイック退出');
let ok4 = true;
['onaji','shitte','madoguchi','hitoiki'].forEach(s => {
  try{ sandbox.showScreen(s); }catch(e){ ok4 = false; console.log('    ' + e.message); }
});
check('4画面を例外なく切替できる', ok4);
check('呼吸フェーズに「すって…」が入る', byId('breath-phase').textContent === 'すって…');

/* カード表示(v0.6 データ4カード・記事調が出ているか) */
const onajiTxt = allText(byId('onaji-list'));
check('データ: 4カード(学年別/毎日数時間/だれにも話していない/ひとりの時間)', byId('onaji-list').children.filter(c => c.className === 'card').length === 4);
check('データ: 学年別の3つの「約N人に1人」(小6約15/中2約17/高2約24)が出る',
  onajiTxt.includes('小学6年生で 約15人に1人（6.5%）') &&
  onajiTxt.includes('中学2年生で 約17人に1人（5.7%）') &&
  onajiTxt.includes('全日制高校2年生で 約24人に1人（4.1%）'));
check('データ: 「毎日、数時間」カード(ほぼ毎日・平均1日3〜4時間)が出る',
  onajiTxt.includes('「ほぼ毎日」がいちばん多く、およそ半数') && onajiTxt.includes('平均で1日3〜4時間と報告されています'));
check('データ: 「半分以上が、だれにも話していない」が出る', onajiTxt.includes('「言ってもわかってもらえない気がする」という理由が多くあげられています'));
check('データ: 末尾の出典注記が令和2〜3年度に差し替わっている',
  onajiTxt.includes('国の全国調査（令和2〜3年度・厚生労働省/文部科学省など）にもとづいています'));
const shitteTxt = allText(byId('shitte-list'));
check('しっておく: 6カードが新文言で揃う(言葉/評価/原因/相談ルール/両立/頼ること)',
  shitteTxt.includes('子ども・若者を「ヤングケアラー」と呼びます') &&
  shitteTxt.includes('支援の現場では「すごいことをしている」と評価されています') &&
  shitteTxt.includes('「だれかのせい」と言えるものではない、というのが支援の現場の考え方です') &&
  shitteTxt.includes('名前を言わなくていいところがあります') &&
  shitteTxt.includes('この2つは両立できる') &&
  shitteTxt.includes('本人と家族の両方を守る方法のひとつとされています'));
const madoTxt = allText(byId('madoguchi-list'));
check('まどぐち冒頭が新文言(相談するかどうかは、本人が決めてよいこと)',
  byId('madoguchi-intro').textContent.includes('相談するかどうかは、本人が決めてよいこと、とされています') &&
  byId('madoguchi-intro').textContent.includes('10代が使える主な窓口を紹介します'));
check('まどぐち: あなたのいばしょ/チャイルドライン/SOS/189 が揃う(窓口は変更なし)',
  madoTxt.includes('あなたのいばしょ') && madoTxt.includes('チャイルドライン') && madoTxt.includes('24時間子供SOSダイヤル') && madoTxt.includes('189'));

/* ---- [v0.4 二人称排除] 可視領域の文言に「あなた」への語りかけが無い ----
   隠し領域(メモの部屋/せってい/初回案内)は対象外。窓口名「あなたのいばしょ」は固有名詞ゆえ除外(§6で不変)。 */
console.log('[v0.4 二人称排除] 可視領域に「あなた」への語りかけが無い');
check('タブラベルが おなじひと→データ に変わっている(内部id=onajiは不変・i18n化)',
  html.includes('data-i18n="tab.onaji">データ</span>') && !html.includes('>おなじひと<') && html.includes('data-scr="onaji"'));
/* ひといきの一言(順送り)を8回ぶん巡回して集める=4本を確実に網羅 */
let allOnelines = '';
for(let i = 0; i < 8; i++){ allOnelines += ' ' + byId('oneline').textContent; sandbox.nextOneline(); }
/* 可視4画面の描画テキスト + タブラベル。固有名詞「あなたのいばしょ」だけ取り除く */
const visibleText = [allOnelines, onajiTxt, shitteTxt, byId('madoguchi-intro').textContent, madoTxt, 'ひといき データ しっておく まどぐち']
  .join(' ').split('あなたのいばしょ').join('');
check('可視領域(一言4本+データ+しっておく+まどぐち+タブ)に、窓口名以外の「あなた」が無い', !visibleText.includes('あなた'));
check('しっておく本文に「あなた」が無い(記事調)', !shitteTxt.includes('あなた'));
check('ひといきの一言4本すべてに「あなた」が無い', !allOnelines.includes('あなた'));

/* まどぐちリンク: 外部は target=_blank rel=noopener / 電話は tel: */
const anchors = collectTag(byId('madoguchi-list'), 'A');
const webA = anchors.filter(a => /^https:/.test(a.href));
const telA = anchors.filter(a => /^tel:/.test(a.href));
check('まどぐち: 外部リンクは target=_blank rel=noopener', webA.length >= 1 && webA.every(a => a.target === '_blank' && a.rel === 'noopener'));
check('まどぐち: 電話は tel: リンク(talkme.jp/childlineはhttps)', telA.length >= 1 && webA.some(a => a.href.indexOf('talkme.jp') >= 0));

/* クイック退出は location.replace(戻れない)・href/assignは使わない */
sandbox.quickExit();
check('クイック退出が location.replace を呼ぶ(既定Google)', loc._replace.length === 1 && loc._replace[0] === 'https://www.google.com');
check('location.href / location.assign は使わない(戻るで戻れない)', loc._assign.length === 0 && loc._href === '');

/* ---- [条件3] メモの部屋(一体型) ---- */
console.log('[条件3] メモの部屋: 連打で開く→書く→しまう→一覧に即反映→個別削除→とじる');
check('起動直後、メモの部屋は閉じている', byId('memo-view').classList.contains('hidden'));
check('メモの部屋の開閉状態はlocalStorageに保存されない', Object.keys(store).every(k => !/view/i.test(k)));

/* 連打(既定3回)で開く。回数を忘れて多めに連打しても通過した瞬間に開く */
check('連打回数の既定は3', sandbox.memoTapGoal() === 3);
const hd = byId('hd-title');
tap(hd); tap(hd);
check('2連打では まだ開かない', byId('memo-view').classList.contains('hidden'));
tap(hd);   // 3回目で開く
check('3連打で メモの部屋が開く', !byId('memo-view').classList.contains('hidden'));
check('開いた部屋に 書く欄と「そっと しまう」がある(一体型)',
  byId('memo-input') !== null && byId('memo-save') !== null);
check('メモ0件のとき 一覧は空表示', allText(byId('memo-view-list')).includes('まだ なにも ありません'));

/* 書く→しまう(memo-saveボタンをタップ)→ 欄が空 + 一覧に即反映 + ヒントは出さない */
byId('memo-input').value = 'きょうは しんどかった';
tap(byId('memo-save'));
check('しまう→ 欄が空になる', byId('memo-input').value === '');
check('しまう→ 端末に1件保存される', JSON.parse(store['kyukei.memos']).length === 1);
check('しまう→ 開いている一覧に即反映(新しいメモが出る)', allText(byId('memo-view-list')).includes('きょうは しんどかった'));
const toastTxt = allText(byId('toast'));
check('トーストは「しまいました」のみ(初回ヒントは廃止=案内文を出さない)',
  !byId('toast').classList.contains('hidden') && toastTxt.includes('しまいました') && !toastTxt.includes('つづけてタップ'));

/* 2件目 */
byId('memo-input').value = 'ねむれない';
tap(byId('memo-save'));
check('2件目も保存され、一覧に新しい順で並ぶ(日時付き)',
  JSON.parse(store['kyukei.memos']).length === 2 &&
  /ねむれない[\s\S]*きょうは しんどかった/.test(allText(byId('memo-view-list'))) &&
  /\d+月\d+日/.test(allText(byId('memo-view-list'))));

/* 個別削除(2段階: 🗑 → けす?) */
const delBtn = collectTag(byId('memo-view-list'), 'BUTTON')[0];
tap(delBtn);
check('削除1回目は「けす?」に変わるだけ(まだ消えない)', delBtn.textContent === 'けす?' && JSON.parse(store['kyukei.memos']).length === 2);
tap(delBtn);
check('削除2回目で1件消える', JSON.parse(store['kyukei.memos']).length === 1);

/* 1タップで閉じる */
tap(byId('memo-view-close'));
check('「とじる」1タップで閉じる', byId('memo-view').classList.contains('hidden'));

/* ---- [v0.3 動線] メモの部屋 → せってい ---- */
console.log('[v0.3 動線] メモの部屋の下部「せってい」ボタンからのみ開く');
tap(byId('hd-title')); tap(byId('hd-title')); tap(byId('hd-title'));   // メモの部屋を開く(goal3)
check('連打で メモの部屋が(再び)開く', !byId('memo-view').classList.contains('hidden'));
tap(byId('open-settings'));   // メモの部屋の中の「せってい」ボタン
check('メモの部屋の「せってい」でせっていが開く', !byId('settings').classList.contains('hidden'));

/* ---- [せってい] 連打回数の変更 + 退出先URL ---- */
console.log('[せってい] 連打回数の変更・退出先URL');
const tapOpts = collectTag(byId('set-taps'), 'BUTTON');   // [1,3,5,10]
check('連打回数の選択肢が4つ(1/3/5/10)', tapOpts.length === 4);
tap(tapOpts[3]);   // 10回を選ぶ
check('連打回数を10に変更→ prefsに保存', JSON.parse(store['kyukei.prefs']).memoTaps === 10 && sandbox.memoTapGoal() === 10);
byId('set-exit').value = 'https://example.com/';
sandbox.saveExitUrl();
check('退出先URLを変更→ prefsに保存', JSON.parse(store['kyukei.prefs']).exitUrl === 'https://example.com/');
sandbox.quickExit();
check('変更後の退出先で location.replace が呼ばれる', loc._replace[loc._replace.length - 1] === 'https://example.com/');

/* ---- [v0.2 BGM] audio.js + おんがくトグル ---- */
console.log('[v0.2 BGM] audio.js / せってい「おんがく」トグル');
const S = sandbox.__Sound;
check('audio.js の Sound が読み込まれている', S && typeof S.tap === 'function');
check('Sound.setBgmEnabled / bgmEnabled / bgmPlaying が存在', typeof S.setBgmEnabled === 'function' && typeof S.bgmEnabled === 'boolean' && typeof S.bgmPlaying === 'boolean');
check('app.js に無音ダミー const Sound が残っていない(audio.jsが正)', !/const\s+Sound\s*=/.test(appSrc));
check('初期 prefs.bgm は true・Sound に同期', JSON.parse(store['kyukei.prefs']).bgm === true && S.bgmEnabled === true);
/* せっていの「おんがく」トグル([ながす]/[ながさない]) */
const bgmOpts = collectTag(byId('set-bgm'), 'BUTTON');
check('おんがくトグルは2択([ながす]/[ながさない])', bgmOpts.length === 2 && bgmOpts[0].textContent === 'ながす' && bgmOpts[1].textContent === 'ながさない');
tap(bgmOpts[1]);   // ながさない
check('OFF→ prefs.bgm=false 保存 + Sound停止(bgmEnabled=false・playing=false)',
  JSON.parse(store['kyukei.prefs']).bgm === false && S.bgmEnabled === false && S.bgmPlaying === false);
tap(bgmOpts[0]);   // ながす
check('ON→ prefs.bgm=true 保存 + Sound再開(bgmEnabled=true)',
  JSON.parse(store['kyukei.prefs']).bgm === true && S.bgmEnabled === true);
/* タップでBGMが始まる(スタブは起動直後running=最初のタップで開始) */
check('タップ経由でBGMが再生状態になる(bgmPlaying)', S.bgmPlaying === true);

/* ---- [条件4] textContentのみ・clickを使わない・v0.1掃除 ---- */
console.log('[条件4] innerHTML禁止・clickを使わない・v0.1の掃除');
check('app.js に innerHTML / insertAdjacentHTML を使っていない', !/\.innerHTML/.test(appSrc) && !/insertAdjacentHTML/.test(appSrc));
check('app.js に onclick を使っていない', !/onclick/.test(appSrc));
check("app.js に addEventListener('click') を使っていない", !/addEventListener\(\s*['"]click['"]/.test(appSrc));
check('index.html に inline onclick を使っていない', !/onclick=/.test(html));
check('クイック退出は location.replace(href/assignを使わない)', /location\.replace/.test(appSrc) && !/location\.href\s*=/.test(appSrc) && !/location\.assign/.test(appSrc));
check('初回ヒントのフラグ hintShown は残っていない(v0.1で削除)', !/hintShown/.test(appSrc));

/* ---- [v1.0 世界版] 日英2言語・切替・ja文言ゴールデン・🌐は連打対象外 ---- */
console.log('[v1.0 世界版] 日英2言語切替・ja文言ゴールデン一致・🌐は連打対象外');
/* 既定はja(navigator=ja-JP) */
check('既定lang=ja(navigator ja-JP)', documentStub.documentElement.lang === 'ja' && byId('hd-title').textContent === '10代の情報室');
/* ja文言ゴールデン(現行と一字一致=lang.jsへlossless移設) */
check('ja ゴールデン: 一言[0]', sandbox.T('onelines')[0] === 'ゆっくりした呼吸には、心拍を落ちつかせる はたらきがあります。');
check('ja ゴールデン: しっておく[0].body', sandbox.T('shitte')[0].body === '家族の世話や家事を日常的に担う子ども・若者を「ヤングケアラー」と呼びます。例えば、世話や家事で宿題や部活の時間がとれない。友だちの誘いを断ることが多い。夜中に家族の対応で起きる。こうした毎日がつづく状態を指します。');
check('ja ゴールデン: onajiNote', sandbox.T('onajiNote') === '数字は 国の全国調査（令和2〜3年度・厚生労働省/文部科学省など）にもとづいています');
check('ja ゴールデン: madoIntro', sandbox.T('madoIntro') === '相談するかどうかは、本人が決めてよいこと、とされています。ここでは、10代が使える主な窓口を紹介します。');
check('ja ゴールデン: memoSaved / settings / close', sandbox.T('memoSaved') === 'しまいました' && sandbox.T('settings') === 'せってい' && sandbox.T('close') === '× とじる');

/* 英語へ切替 */
sandbox.setLang('en');
check('en: html lang属性=en・appName=Teen Info Room', documentStub.documentElement.lang === 'en' && byId('hd-title').textContent === 'Teen Info Room');
check('en: タブ名 Breathe/Data/Basics/Helplines', sandbox.T('tab.hitoiki') === 'Breathe' && sandbox.T('tab.onaji') === 'Data' && sandbox.T('tab.shitte') === 'Basics' && sandbox.T('tab.madoguchi') === 'Helplines');
check('en: 一言[0]', byId('oneline').textContent === 'Slow breathing is known to calm the heart rate.');
check('en: 呼吸フェーズ = Breathe in…', byId('breath-phase').textContent === 'Breathe in…');
const enOnaji = allText(byId('onaji-list'));
check('en データ: 5カード(Around the worldを含む)', byId('onaji-list').children.filter(c => c.className === 'card').length === 5 && enOnaji.includes('Around the world') && enOnaji.includes('Young carers exist in every country'));
check('en データ: 学年別(1 in 15/17/24)+国際数値', enOnaji.includes('about 1 in 15 sixth graders (6.5%)') && enOnaji.includes('about 1 in 17') && enOnaji.includes('about 1 in 24') && enOnaji.includes('about 120,000 young carers'));
check('en データ: 出典注記(Japan\'s national surveys)', enOnaji.includes('Figures are based on Japan'));
const enShitte = allText(byId('shitte-list'));
check('en しっておく: 6カード', byId('shitte-list').children.filter(c => c.className === 'card').length === 6 && enShitte.includes('are called "young carers."') && enShitte.includes('one way to protect both the young person and the family'));
check('en まどぐち冒頭', byId('madoguchi-intro').textContent === 'Whether to talk to someone is up to each person. This page simply lists places that exist.');
const enCards = byId('madoguchi-list').children.filter(c => c.className === 'card');
check('en まどぐち: 窓口7件', enCards.length === 7);
check('en まどぐち: 7件がこの順(グローバル2→英語圏4→英国YC専門1)',
  allText(enCards[0]).includes('Child Helpline International') &&
  allText(enCards[1]).includes('Find a Helpline') &&
  allText(enCards[2]).includes('Childline (UK)') &&
  allText(enCards[3]).includes('Kids Helpline (Australia)') &&
  allText(enCards[4]).includes('Kids Help Phone (Canada)') &&
  allText(enCards[5]).includes('Boys Town National Hotline (USA)') &&
  allText(enCards[6]).includes('Carers Trust (UK)'));
check('en まどぐち: 電話は tel: / Web は https(_blank)', collectTag(byId('madoguchi-list'), 'A').some(a => /^tel:/.test(a.href)) && collectTag(byId('madoguchi-list'), 'A').some(a => /^https:/.test(a.href) && a.target === '_blank' && a.rel === 'noopener'));

/* 日本語へ戻す(以降のブロックはfresh instanceだが、mainはjaに戻しておく) */
sandbox.setLang('ja');
check('ja復帰: appName/データ4カード/まどぐち4件', byId('hd-title').textContent === '10代の情報室' && byId('onaji-list').children.filter(c => c.className === 'card').length === 4 && byId('madoguchi-list').children.filter(c => c.className === 'card').length === 4);

/* 🌐は連打判定に含めない(fresh instance・既定goal3) */
const langInst = makeInstance({});
for(let i = 0; i < 6; i++) tap(langInst.byId('btn-lang'));   // 🌐を連打
check('🌐 を何回タップしてもメモの部屋は開かない(連打対象外)', langInst.byId('memo-view').classList.contains('hidden'));
check('🌐 タップで言語シートが開く', !langInst.byId('lang-sheet').classList.contains('hidden'));
tap(langInst.byId('hd-title')); tap(langInst.byId('hd-title')); tap(langInst.byId('hd-title'));
check('アプリ名を3連打するとメモの部屋が開く(連打カウントは🌐の影響を受けない)', !langInst.byId('memo-view').classList.contains('hidden'));

/* ---- [v1.1 12言語] キー完全一致(パリティ)・各言語描画・ar RTL・en仮値の残留なし ---- */
console.log('[v1.1 12言語] パリティ/各言語描画/ar RTL/翻訳欠落(en仮値残留)検出');
const KL = sandbox.KYUKEI_LANG;
const L12 = ['ja','en','de','fr','es','it','pt','nl','sv','ko','zh','ar'];
check('KYUKEI_LANG に12言語ある', !!KL && L12.every(c => KL[c] && typeof KL[c] === 'object'));
/* 葉キーのパス集合をenと全言語で完全一致 */
function flatKeys(o, pfx){
  let acc = [];
  if(Array.isArray(o)) o.forEach((v, i) => acc = acc.concat(flatKeys(v, pfx + '[' + i + ']')));
  else if(o && typeof o === 'object') Object.keys(o).forEach(k => acc = acc.concat(flatKeys(o[k], pfx ? pfx + '.' + k : k)));
  else acc.push(pfx);
  return acc;
}
const enKeys = flatKeys(KL.en, '').sort().join('|');
const parityFails = L12.filter(c => flatKeys(KL[c], '').sort().join('|') !== enKeys);
check('全12言語のキー構造が完全一致(パリティ)', parityFails.length === 0);
if(parityFails.length) console.log('    パリティ不一致: ' + parityFails.join(','));
/* 各言語に切替→appName=Teen Info Room(追加10言語)・データ5枚・まどぐち2枚・例外なし */
const ADDED = ['de','fr','es','it','pt','nl','sv','ko','zh','ar'];
let renderFails = [];
ADDED.forEach(c => {
  try{
    sandbox.setLang(c);
    const app = byId('hd-title').textContent;
    const dcards = byId('onaji-list').children.filter(x => x.className === 'card').length;
    const mcards = byId('madoguchi-list').children.filter(x => x.className === 'card').length;
    if(app !== 'Teen Info Room') renderFails.push(c + ' appName=' + app);
    if(dcards !== 5) renderFails.push(c + ' onaji=' + dcards);
    if(mcards !== 2) renderFails.push(c + ' mado=' + mcards);
  }catch(e){ renderFails.push(c + ' EXC ' + e.message); }
});
check('追加10言語: appName=Teen Info Room・データ5枚・まどぐち2枚・例外なし', renderFails.length === 0);
if(renderFails.length) console.log('    ' + renderFails.join(' / '));
/* ar は dir=rtl・戻すと ltr */
sandbox.setLang('ar');
check('ar: html dir=rtl・appName・呼吸フェーズがarで描画', documentStub.documentElement.dir === 'rtl' && byId('hd-title').textContent === 'Teen Info Room' && byId('breath-phase').textContent === KL.ar.breathIn);
sandbox.setLang('ja');
check('ja復帰: dir=ltr', documentStub.documentElement.dir === 'ltr');
/* 翻訳欠落(en仮値の残留)検出 */
const PROSE = ['onelines[0]','madoIntro','memoSaved','breathIn','musicOn','shitte[0].body'];
function getPath(o, p){ return p.split(/\.|\[|\]/).filter(Boolean).reduce((a, k) => (a == null ? a : a[k]), o); }
let leak = [];
ADDED.forEach(c => PROSE.forEach(p => { if(getPath(KL[c], p) === getPath(KL.en, p)) leak.push(c + '.' + p); }));
check('追加10言語の主要文言がenと異なる(en仮値の残留なし)', leak.length === 0);
if(leak.length) console.log('    en残留: ' + leak.join(','));
check('追加10言語のappNameはTeen Info Room(en同一・ブランド固定=意図的)', ADDED.every(c => KL[c].appName === 'Teen Info Room'));
check('追加10言語のtapUnitは空(仕様未記載=en準拠)', ADDED.every(c => KL[c].tapUnit === ''));
/* 🌐言語シートは12言語ぶんのボタン */
const li12 = makeInstance({});
tap(li12.byId('btn-lang'));
check('🌐シートに12言語ボタン', li12.byId('lang-choices').children.filter(x => x.tagName === 'BUTTON').length === 12);
/* ja/enゴールデン(移設不変)の再確認 */
check('ja ゴールデン(再): 一言[0]/しっておく[0]', KL.ja.onelines[0] === 'ゆっくりした呼吸には、心拍を落ちつかせる はたらきがあります。' && KL.ja.shitte[0].title === 'ヤングケアラーという言葉');
check('en ゴールデン(再): oneline[0]/tab', KL.en.onelines[0] === 'Slow breathing is known to calm the heart rate.' && KL.en.tab.hitoiki === 'Breathe');
sandbox.setLang('ja');

/* ---- [v1.6 家族] しっておくの下「障害のある家族がいるとき」: 10カード・出典・例文コピー・12言語 ---- */
console.log('[v1.6 家族] 障害のある家族がいるとき(理由の例5・話すときの例2・勉強や物の工夫3)');
sandbox.setLang('ja');
const famBox = byId('family-list');
const famTxt = allText(famBox);
const famCards = famBox.children.filter(c => c.className === 'card');
check('家族: 見出し「障害のある家族がいるとき」と小見出し3つ',
  famBox.children[0].textContent === '障害のある家族がいるとき' &&
  famBox.children.filter(c => c.className === 'fam-sub').map(c => c.textContent).join('|') === 'どうしてそうなるの？（理由の例）|話すときの例|勉強や物の工夫');
check('家族: カードは10枚(5+2+3)', famCards.length === 10);
check('家族: しっておくの6カードはそのまま(別の箱)', byId('shitte-list').children.filter(c => c.className === 'card').length === 6);
const sayBtns = collectTag(famBox, 'BUTTON').filter(b => b.className === 'say-btn');
check('家族: 例文ボタンは8つ(友だち4・先生4)', sayBtns.length === 8);
const famA = collectTag(famBox, 'A');
check('家族: 出典リンクは10件・すべて https + 別タブ + noopener',
  famA.length === 10 && famA.every(a => /^https:\/\//.test(a.href) && a.target === '_blank' && a.rel === 'noopener'));
check('家族: 出典リンクの文字はドメイン名(cpedd.nise.go.jp など)', famA[0].textContent === 'cpedd.nise.go.jp' && famA.every(a => !/^https?:/.test(a.textContent)));
check('家族: ja は一字一句の引用を出す(猫舌・幻覚や妄想・家族支援)',
  famTxt.includes('「「猫舌」の人が熱い食べ物をがんばっても苦手なように、努力だけで克服することが困難な場合もあるので、無理強いは控えましょう。」') &&
  famTxt.includes('こうした幻覚や妄想は、本人にはまるで現実であるように感じられるので') &&
  famTxt.includes('きょうだいや祖父母等への支援も含まれる。'));
check('家族: 出典の発信元(出典：国立特別支援教育総合研究所…)', famTxt.includes('出典：国立特別支援教育総合研究所 発達障害教育推進センター「感覚過敏に対する指導・支援」'));
check('家族: FAM_MAP の出典idが全部 FAM_SRC と12言語の family.src にある',
  !!sandbox.__FAM &&
  [].concat(...Object.values(sandbox.__FAM.FAM_MAP).map(g => [].concat(...g))).every(id => sandbox.__FAM.FAM_SRC[id] && L12x().every(c => KLx()[c].family && KLx()[c].family.src[id])));
function L12x(){ return ['ja','en','de','fr','es','it','pt','nl','sv','ko','zh','ar']; }
function KLx(){ return sandbox.KYUKEI_LANG; }
check('家族: 本文に「あなた」が無い(記事調)', !famTxt.includes('あなた'));
check('家族: 画面に「メモ」の文字が無い(隠してあるメモの部屋を匂わせない)', !famTxt.includes('メモ'));
/* 例文をタップ → その文だけがコピーされ「コピーしました」 */
tap(sayBtns[0]);
check('家族: 例文タップでその文がコピーされる', clip.length === 1 && clip[0] === '家のことで、放課後すぐ帰る日があるんだ。');
check('家族: トーストは「コピーしました」', allText(byId('toast')).includes('コピーしました') && !allText(byId('toast')).includes('メモ'));
tap(sayBtns[7]);
check('家族: 先生への例文もコピーできる', clip[1] === '困ったときに相談できる人を、教えてください。');
/* clipboard が無い端末: 例外にならず「コピーできませんでした」(疑似DOMでは execCommand が無い) */
const nav0 = sandbox.navigator.clipboard;
sandbox.navigator.clipboard = undefined;
let noClipOk = true;
try{ tap(sayBtns[1]); }catch(e){ noClipOk = false; }
check('家族: clipboard が無くても例外にならず「コピーできませんでした」', noClipOk && allText(byId('toast')).includes('コピーできませんでした'));
sandbox.navigator.clipboard = nav0;
/* 他の言語: 10カード・例文8・出典10・日本語の引用は出さない・「(in Japanese)」相当が付く・enと違う訳 */
let famFails = [];
['en','de','fr','es','it','pt','nl','sv','ko','zh','ar'].forEach(c => {
  try{
    sandbox.setLang(c);
    const b = byId('family-list');
    const t = allText(b);
    if(b.children.filter(x => x.className === 'card').length !== 10) famFails.push(c + ' cards');
    if(collectTag(b, 'BUTTON').filter(x => x.className === 'say-btn').length !== 8) famFails.push(c + ' lines');
    if(collectTag(b, 'A').length !== 10) famFails.push(c + ' links');
    if(t.includes('猫舌') || t.includes('幻覚や妄想')) famFails.push(c + ' 日本語の引用が出ている');
    if(!t.includes(KLx()[c].family.srcLang)) famFails.push(c + ' srcLang');
    if(c !== 'en'){
      ['why.cards[0].body', 'talk.cards[0].lines[0]', 'things.cards[2].body', 'head'].forEach(p => {
        const get = o => p.split(/\.|\[|\]/).filter(Boolean).reduce((a, k) => (a == null ? a : a[k]), o);
        if(get(KLx()[c].family) === get(KLx().en.family)) famFails.push(c + ' en残留 ' + p);
      });
    }
  }catch(e){ famFails.push(c + ' EXC ' + e.message); }
});
check('家族: 11言語で10カード・例文8・出典10・引用は ja だけ・(in Japanese)相当・en残留なし', famFails.length === 0);
if(famFails.length) console.log('    ' + famFails.join(' / '));
sandbox.setLang('ja');
check('家族: ja に戻すと日本語の見出しに戻る', byId('family-list').children[0].textContent === '障害のある家族がいるとき');

/* ---- [v0.3 リロード] 同じ端末(store)で再起動: 案内は出ない・両オーバーレイは閉 ---- */
console.log('[v0.3 リロード] introShown保持で案内が出ない・メモの部屋/せってい は閉');
(function reload(){
  const created2 = {};
  const byId2 = id => { if(!ids.has(id)) return null; if(!created2[id]) created2[id] = makeEl(); return created2[id]; };
  const doc2 = {
    documentElement:makeEl('html'), head:makeEl('head'), body:makeEl('body'), title:'',
    createElement:t => makeEl(t), getElementById:id => byId2(id), addEventListener(){},
    querySelector(sel){ const m = /^#([A-Za-z0-9_-]+)$/.exec(String(sel).trim()); return m ? byId2(m[1]) : makeEl(); },
    querySelectorAll(){ return []; }
  };
  const sb2 = {
    console, document:doc2, navigator:{ language:'ja-JP' },
    localStorage:localStorageStub, location:locationStub, scrollTo(){}, addEventListener(){},
    setTimeout:() => 0, setInterval:() => 0, clearInterval(){}, clearTimeout(){},
    AudioContext:FakeAudioContext, ResizeObserver:FakeResizeObserver, Date
  };
  sb2.window = sb2; sb2.globalThis = sb2;
  vm.createContext(sb2);
  try{ vm.runInContext(src, sb2, { filename:'reload.js' }); }
  catch(e){ check('リロード起動が例外なし', false); console.log('    ' + e.message); return; }
  check('リロード起動が例外なし', true);
  check('introShown=true なので 案内は出ない', byId2('intro').classList.contains('hidden'));
  check('リロード後 メモの部屋は閉じている', byId2('memo-view').classList.contains('hidden'));
  check('リロード後 せっていは閉じている', byId2('settings').classList.contains('hidden'));
  check('設定は保持(introShown/bgm/memoTaps/exitUrl)',
    JSON.parse(store['kyukei.prefs']).introShown === true);
})();

/* ---- [v0.5 書きかけ保持] 独立した端末(store)で、入力→再起動→復元→しまうと消える を検証 ---- */
console.log('[v0.5 書きかけ保持] 入力→再起動で復元・しまうと消える・可視領域に出ない');
/* 指定の store(localStorage) を共有する新しいアプリ実体を起動して返す(=リロード相当) */
function makeInstance(instStore){
  const c = {};
  const byIdI = id => { if(!ids.has(id)) return null; if(!c[id]) c[id] = makeEl(); return c[id]; };
  const ls = { getItem:k => (k in instStore ? instStore[k] : null), setItem:(k, v) => { instStore[k] = String(v); }, removeItem:k => { delete instStore[k]; } };
  const doc = {
    documentElement:makeEl('html'), head:makeEl('head'), body:makeEl('body'), title:'',
    createElement:t => makeEl(t), getElementById:id => byIdI(id), addEventListener(){},
    querySelector(sel){ const m = /^#([A-Za-z0-9_-]+)$/.exec(String(sel).trim()); return m ? byIdI(m[1]) : makeEl(); },
    querySelectorAll(){ return []; }
  };
  const sb = {
    console, document:doc, navigator:{ language:'ja-JP' }, localStorage:ls, location:locationStub,
    scrollTo(){}, addEventListener(){}, setTimeout:() => 0, setInterval:() => 0, clearInterval(){}, clearTimeout(){},
    AudioContext:FakeAudioContext, ResizeObserver:FakeResizeObserver, Date
  };
  sb.window = sb; sb.globalThis = sb;
  vm.createContext(sb);
  vm.runInContext(src, sb, { filename:'instance.js' });
  return { byId:byIdI, sandbox:sb };
}
function fireInput(elm){ (elm._ev.input || []).forEach(h => h({ target:elm })); }
const draftStore = {};   // このテスト専用の端末
/* 起動1: 部屋を開いて 書きかけを入力(inputで即保存) */
const A = makeInstance(draftStore);
A.sandbox.openMemoView();
A.byId('memo-input').value = 'かきかけ です';
fireInput(A.byId('memo-input'));
check('入力すると kyukei.draft に即保存される', draftStore['kyukei.draft'] === 'かきかけ です');
/* 閉じる: 欄はクリア・draftは残る(=部屋の外に書きかけを残さない/でも保持) */
A.sandbox.closeMemoView();
check('閉じても kyukei.draft は保持される', draftStore['kyukei.draft'] === 'かきかけ です');
check('閉じると textarea(DOM)は空になる', A.byId('memo-input').value === '');
/* ③ 書きかけの内容が可視領域(4タブ)に現れない */
['hitoiki','onaji','shitte','madoguchi'].forEach(s => A.sandbox.showScreen(s));
const visA = ['scr-hitoiki','scr-onaji','scr-shitte','scr-madoguchi'].map(id => allText(A.byId(id))).join(' ');
check('書きかけの内容が可視領域(4タブ)に現れない', !visA.includes('かきかけ です'));
/* ① 再起動(リロード相当・同じ端末draftStore)→ 部屋を開くと復元 */
const B = makeInstance(draftStore);
check('リロード直後、部屋を開く前は textarea が空(秘匿=開くまで復元しない)', B.byId('memo-input').value === '');
B.sandbox.openMemoView();
check('リロード後、部屋を開くと書きかけが復元される(続きから書ける)', B.byId('memo-input').value === 'かきかけ です');
/* ② 「そっと しまう」で保存→ draftが消える・本体へ移る */
B.sandbox.saveMemo();
check('「そっと しまう」で kyukei.draft が消える', !('kyukei.draft' in draftStore));
check('しまった内容は kyukei.memos に移る', JSON.parse(draftStore['kyukei.memos']).some(e => e.m === 'かきかけ です'));
check('しまった後、textarea は空になる', B.byId('memo-input').value === '');

/* ---- [v1.2 みため] がめんの いろ4種 + もじの大きさ3段階(アクセシビリティ) ---- */
console.log('[v1.2 みため] いろ4種・もじ3段階・保存と再起動の持ちこし');
const lkStore = {};   // このテスト専用の端末
const LK = makeInstance(lkStore);
check('既定は よる(data-theme無し)・ふつう', LK.sandbox.document.body.getAttribute('data-theme') == null &&
  !LK.sandbox.document.body.classList.contains('fs1') && !LK.sandbox.document.body.classList.contains('fs2'));
LK.sandbox.openLooks();
check('みためシートが開く', !LK.byId('looks').classList.contains('hidden'));
check('いろの選択肢が4つ', LK.byId('looks-theme').children.filter(x => x.tagName === 'BUTTON').length === 4);
check('もじの選択肢が3つ', LK.byId('looks-fs').children.filter(x => x.tagName === 'BUTTON').length === 3);
check('既定で「よる」と「ふつう」が選択中', LK.byId('looks-theme').children[0].className.indexOf('sel') >= 0 &&
  LK.byId('looks-fs').children[0].className.indexOf('sel') >= 0);
/* しろ を選ぶ */
tap(LK.byId('looks-theme').children[1]);
check('しろ を選ぶと body[data-theme=light]', LK.sandbox.document.body.getAttribute('data-theme') === 'light');
check('しろ が保存される', JSON.parse(lkStore['kyukei.prefs']).theme === 'light');
/* とくだい を選ぶ */
tap(LK.byId('looks-fs').children[2]);
check('とくだい で body.fs2', LK.sandbox.document.body.classList.contains('fs2') && !LK.sandbox.document.body.classList.contains('fs1'));
check('とくだい が保存される', JSON.parse(lkStore['kyukei.prefs']).fs === 2);
LK.sandbox.closeLooks();
check('とじるでシートが閉じる', LK.byId('looks').classList.contains('hidden'));
/* 再起動で持ちこし */
const LK2 = makeInstance(lkStore);
check('再起動しても しろ/とくだい のまま', LK2.sandbox.document.body.getAttribute('data-theme') === 'light' &&
  LK2.sandbox.document.body.classList.contains('fs2'));
check('再起動時 みためシートは閉じている', LK2.byId('looks').classList.contains('hidden'));
/* 壊れた保存値は既定へ */
const badStore = { 'kyukei.prefs': JSON.stringify({ theme:'neon', fs:9, introShown:true }) };
const LK3 = makeInstance(badStore);
check('壊れた保存値(theme:neon/fs:9)は よる/ふつう へ復旧', LK3.sandbox.document.body.getAttribute('data-theme') == null &&
  !LK3.sandbox.document.body.classList.contains('fs1') && !LK3.sandbox.document.body.classList.contains('fs2'));
/* i18n 11キーが12言語で引ける(パリティ検査は上で済・ここは代表値) */
check('みための i18nキーが12言語で引ける',
  L12.every(c => KL[c].looksOpen && KL[c].looksTitle && KL[c].looksColor && KL[c].themeNight &&
    KL[c].themeLight && KL[c].themeCream && KL[c].themeBlack && KL[c].looksText &&
    KL[c].fsNormal && KL[c].fsLarge && KL[c].fsXL));

/* ---- [セーフエリア] 下タブ/ステータスバーに隠れない ----
   targetSdk36(Android15+)はエッジtoエッジ強制で、WebViewが端末のステータスバー(上)と
   ナビゲーションバー(下)の下まで描かれる。#tabbar は自分の余白に safe-area を持つぶん
   実際の高さが増えるので、本文側がCSSの固定値(76px)のままだと末尾のカードが下タブに隠れる。 */
console.log('[セーフエリア] 下タブ/ステータスバーに隠れない');
const cssTxt = fs.readFileSync('./style.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, '');
check('--tabbar-h のフォールバックに env(safe-area-inset-bottom)',
  /--tabbar-h:calc\(76px\+env\(safe-area-inset-bottom\)\)/.test(cssTxt));
check('body の下余白が max(CSS下限, 実測+10px)',
  /body\{[^}]*padding-bottom:max\(calc\(76px\+env\(safe-area-inset-bottom\)\),calc\(var\(--tabbar-h\)\+10px\)\)/.test(cssTxt));
check('body に固定値の padding-bottom:76px が残っていない', !/padding-bottom:76px/.test(cssTxt));
check('ヘッダーの上余白に env(safe-area-inset-top)(時計・電池と重ならない)',
  /#hd\{[^}]*padding:calc\(28px\+env\(safe-area-inset-top\)\)/.test(cssTxt));
check('ヘッダーの最低高さも env(safe-area-inset-top) ぶん増える',
  /#hd\{[^}]*min-height:calc\(130px\+env\(safe-area-inset-top\)\)/.test(cssTxt));
check('下タブは padding-bottom の safe-area を保ったまま左右も避ける',
  /#tabbar\{[^}]*padding:6px4pxcalc\(6px\+env\(safe-area-inset-bottom\)\)/.test(cssTxt) &&
  /#tabbar\{[^}]*padding-left:max\(4px,env\(safe-area-inset-left\)\)/.test(cssTxt) &&
  /#tabbar\{[^}]*padding-right:max\(4px,env\(safe-area-inset-right\)\)/.test(cssTxt));
check('本文の左右も横向き時のノッチを避ける',
  /#main\{[^}]*env\(safe-area-inset-right\)/.test(cssTxt) && /#main\{[^}]*env\(safe-area-inset-left\)/.test(cssTxt));
check('トーストも --tabbar-h 基準(下タブの上に出る)',
  /\.toast\{[^}]*bottom:max\(calc\(96px\+env\(safe-area-inset-bottom\)\),calc\(var\(--tabbar-h\)\+12px\)\)/.test(cssTxt));
check('オーバーレイ(メモ/せってい/みため/言語/初回案内)の余白がsafe-area',
  /\.overlay\{[^}]*padding:max\(20px,env\(safe-area-inset-top\)\)max\(20px,env\(safe-area-inset-right\)\)max\(20px,env\(safe-area-inset-bottom\)\)max\(20px,env\(safe-area-inset-left\)\)/.test(cssTxt));
check('シートの最大高さから上下バーぶんを引いている',
  /\.sheet-box\{[^}]*max-height:calc\(86vh-env\(safe-area-inset-top\)-env\(safe-area-inset-bottom\)\)/.test(cssTxt));
check('applyBarSpace が下タブの実寸を --tabbar-h に入れている',
  /function applyBarSpace\(\)/.test(appSrc) && /st\.setProperty\('--tabbar-h', h \+ 'px'\)/.test(appSrc));
check('applyBarSpace は style.setProperty が無い環境でも早期returnする(疑似DOM対策)',
  /if\(!st \|\| !st\.setProperty\) return;/.test(appSrc));
check('ResizeObserver で下タブを見張っている',
  /function watchBarSpace\(\)/.test(appSrc) && /new ResizeObserver\(applyBarSpace\)/.test(appSrc));
check('init で applyBarSpace(); watchBarSpace(); を呼ぶ', /applyBarSpace\(\);\s*watchBarSpace\(\);/.test(appSrc));
check('load / resize / orientationchange でも測り直す(ResizeObserverが無い環境の保険)',
  /window\.addEventListener\('load', applyBarSpace\)/.test(appSrc) &&
  /window\.addEventListener\('resize', applyBarSpace\)/.test(appSrc) &&
  /window\.addEventListener\('orientationchange', applyBarSpace\)/.test(appSrc));
const looksFn = /function applyLooks\(\)\{[\s\S]*?\n\}/.exec(appSrc);
check('applyLooks の中でも測り直す(もじを大きくすると下タブの高さが変わる)',
  !!looksFn && /applyBarSpace\(\);/.test(looksFn[0]));
/* 実挙動: 起動時に --tabbar-h が下タブの実寸(疑似DOMの矩形=50px)で入る */
check('起動時に --tabbar-h が実測値で入る', documentStub.documentElement.style.getPropertyValue('--tabbar-h') === '50px');
check('ResizeObserver が #tabbar を observe している', roObserved.indexOf(byId('tabbar')) >= 0);
/* 古い環境/疑似DOM(style.setProperty 無し)でも例外にならない */
const savedStyle = documentStub.documentElement.style;
documentStub.documentElement.style = {};
let guardOk = true;
try{ sandbox.applyBarSpace(); }catch(e){ guardOk = false; }
documentStub.documentElement.style = savedStyle;
check('style.setProperty が無い環境でも applyBarSpace が例外を出さない', guardOk);

console.log('');
if(fails.length){ console.log('SMOKE NG: ' + fails.length + '件失敗'); process.exit(1); }
console.log('SMOKE OK: 全チェック通過');
