/* 10代の情報室 v1.0(世界版=日英2言語)
   ・家族の世話をしている子ども・若者(ヤングケアラー)本人が、夜にひとりで休める部屋。
   ・端末内(localStorage)のみ。送信・アカウント・分析なし(裁定・DESIGN_MEMO §5)。
   ・全ボタンは Tap.bind(clickは使わない)。ユーザー入力のDOM反映は textContent のみ(innerHTML禁止)。
   ・そよぎ緑は使わない中立デザイン。効果音(タップ音)なし。BGMは穏やか・低音量(夜中に開く前提・せっていでON/OFF・v0.2)。
   🔴 全表示文字列は lang.js(ja/en・キー完全一致)。可視領域は情報提供の形(三人称・記事調)で「あなた」への語りかけを排除(v0.4)。
   🔴 script順=lang.js→audio.js→tap.js→app.js。Sound は audio.js 定義。tap.jsのSound.tap()は無音でBGM開始トリガーのみ。 */

/* ---- 隠し閲覧の連打判定(そよぎポケットのシンプル表示に準拠 soyogi_wallet\src\app\wallet\simpleView.ts) ---- */
const TAP_CHOICES = [1, 3, 5, 10];   // 連打回数の選択肢
const DEFAULT_TAPS = 3;              // 既定
const TAP_RESET_MS = 2500;           // タップ間隔がこれを超えたら数え直し(ゆっくりでも押せる)
const EXIT_DEFAULT = 'https://www.google.com';

/* ---- 小さなDOMヘルパー ---- */
function el(tag, cls, text){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(text != null) e.textContent = text;   // textContentのみ(innerHTML禁止)
  return e;
}
function getEl(id){ return document.getElementById(id); }

/* ---- 保存(端末内のみ) ---- */
const LS_MEMOS = 'kyukei.memos', LS_PREFS = 'kyukei.prefs', LS_DRAFT = 'kyukei.draft';
function loadJSON(key, fb){ try{ const v = JSON.parse(localStorage.getItem(key)); return v == null ? fb : v; }catch(e){ return fb; } }
function saveJSON(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }
let memos = loadJSON(LS_MEMOS, []);
if(!Array.isArray(memos)) memos = [];
let prefs = Object.assign({ exitUrl:EXIT_DEFAULT, memoTaps:DEFAULT_TAPS, bgm:true, introShown:false, lang:null }, loadJSON(LS_PREFS, {}));
if(TAP_CHOICES.indexOf(prefs.memoTaps) < 0) prefs.memoTaps = DEFAULT_TAPS;
if(typeof prefs.bgm !== 'boolean') prefs.bgm = true;
if(typeof prefs.introShown !== 'boolean') prefs.introShown = false;
if(prefs.lang !== 'ja' && prefs.lang !== 'en') prefs.lang = null;
function saveMemos(){ saveJSON(LS_MEMOS, memos); }
function savePrefs(){ saveJSON(LS_PREFS, prefs); }

/* ---- i18n(日英2言語・v1.0) ----
   全表示文字列は lang.js(window.KYUKEI_LANG)にキー化。ja/en でキー構造は完全一致。未対応キーは ja へフォールバック。
   ONAJI(データカード)と MADO(窓口)だけは href 付きの構造データのため下に言語別で持つ。 */
const LANGS = (typeof window !== 'undefined' ? window : globalThis).KYUKEI_LANG;
function detectLang(){
  const nav = (typeof navigator !== 'undefined' && (navigator.language || (navigator.languages && navigator.languages[0]))) || '';
  return String(nav).toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en';   // navigatorがja系ならja・それ以外en
}
let lang = (prefs.lang === 'ja' || prefs.lang === 'en') ? prefs.lang : detectLang();
function tget(obj, path){ if(!obj) return undefined; const p = path.split('.'); let c = obj; for(let i = 0; i < p.length; i++){ if(c == null) return undefined; c = c[p[i]]; } return c; }
function T(path){ let v = tget(LANGS[lang], path); if(v == null) v = tget(LANGS.ja, path); return v; }   // ja(監修済み)へフォールバック
function tpl(s, vars){ return String(s).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null) ? vars[k] : m); }
function appName(){ return T('appName'); }

/* ---- 書きかけメモ(プレーンテキスト・v0.5) ----
   途中で文字が消えると否定された気持ちになる、という裁定。閉じても保持し、部屋を開くと続きから書ける。
   保持されるのはメモの部屋の中のtextareaだけ(部屋は連打の先=秘匿性は変わらない)。 */
function loadDraft(){ try{ return localStorage.getItem(LS_DRAFT) || ''; }catch(e){ return ''; } }
function saveDraft(v){ try{ localStorage.setItem(LS_DRAFT, v); }catch(e){} }
function clearDraft(){ try{ localStorage.removeItem(LS_DRAFT); }catch(e){} }

/* ================= 言語別データ(データカード・窓口) =================
   文字列キーは lang.js。ここには href 付きの構造データ(データカード=onaji・窓口=mado)だけを言語別で持つ。
   🔴 ja は監修済み文言のまま。en は SPEC_YC_V1_WORLD/FILL の原案どおり(一字も変えない)。 */

/* ② データ(旧おなじひと。内部id=onajiのまま=タブラベルだけ「データ/Data」)
   ja: 令和2〜3年度の国の実態調査(裏取り済み) / en: 日本の学年別+国際データ(v1.0差し込み・検証済み) */
const ONAJI = {
  ja: [
    { title:'学年別のデータ',
      body:'家族の世話をしている10代の割合は、国の調査でこう報告されています。小学6年生で 約15人に1人（6.5%）。中学2年生で 約17人に1人（5.7%）。全日制高校2年生で 約24人に1人（4.1%）。どの学年でも、1クラスに1〜2人いる計算になります。' },
    { title:'毎日、数時間',
      body:'世話の頻度は「ほぼ毎日」がいちばん多く、およそ半数にのぼります。平日に世話へ使う時間は、平均で1日3〜4時間と報告されています。宿題や部活、睡眠と重なる長さです。' },
    { title:'半分以上が、だれにも話していない',
      body:'中高生への調査では、世話のことを だれにも相談したことがない人が半分以上でした。「言ってもわかってもらえない気がする」という理由が多くあげられています。' },
    { title:'ひとりの時間の役わり',
      body:'本を読む、音楽をきく、深呼吸をする。そういう「ひとりで心が落ちつく時間」が支えになった、という当事者の声が紹介されています。' }
  ],
  en: [
    { title:'Data by school year (Japan)',
      body:"In Japan's national surveys, about 1 in 15 sixth graders (6.5%), about 1 in 17 second-year junior high school students (5.7%), and about 1 in 24 second-year high school students (4.1%) reported caring for a family member. That is one or two students in every classroom." },
    { title:'Every day, for hours',
      body:'In the same surveys, about half of these students helped their family almost every day. On weekdays, care took an average of 3 to 4 hours a day. Those are hours that overlap with homework, clubs, and sleep.' },
    { title:'More than half have told no one',
      body:'In surveys of junior high and high school students in Japan, more than half had never talked to anyone about their caring role. "I don\'t think people would understand" was a common reason.' },
    { title:'Around the world',
      body:'Young carers exist in every country. In England, the 2021 census counted about 120,000 young carers aged 5 to 17 - and the statistics office itself says the true number is likely higher. In Germany, a national survey found that about 5% of 12- to 17-year-olds regularly help care for a family member. In Switzerland, a large study of schoolchildren found 7.9%. In the United States, national time-use data suggests that nearly 1 in 10 people aged 15 to 18 help care for an adult. And in many countries, no one has counted yet.' },
    { title:'The role of time alone',
      body:'Reading, listening to music, breathing slowly. Young people in this situation often say that quiet time alone helped them keep going.' }
  ]
};

/* ④ まどぐち(押し付けない静かな一覧・チャット系を上に)
   ja ✅ 2026-07-19 全件を公式サイトで裏取り済み(Fable):
   ・あなたのいばしょ=チャット24時間365日・無料・匿名(talkme.jp)
   ・チャイルドライン=0120-99-7777・毎日16〜21時(年末年始12/29-1/3休)・18歳まで・名前不要(childline.or.jp/tel)
   ・24時間子供SOSダイヤル=0120-0-78310・24時間・0120=通話無料(mext.go.jp)
   ・児童相談所相談専用ダイヤル=0120-189-783・24時間・無料(こども家庭庁。189は虐待対応=通告用のため使わない)
   en ✅ SPEC_YC_V1_FILL(21エージェント検証済み・グローバル2+英語圏4+英国YC専門1)。公開直前にもう一度最新確認すること。 */
const MADO = {
  ja: [
    { name:'あなたのいばしょ', feature:'（チャット・24時間・無料・匿名）',
      contacts:[ { text:'talkme.jp', href:'https://talkme.jp/', web:true } ] },
    { name:'チャイルドライン', feature:'（18歳まで・名前を言わなくていい）',
      contacts:[ { text:'電話0120-99-7777（毎日16〜21時）', href:'tel:0120997777' },
                 { text:'チャットあり childline.or.jp', href:'https://childline.or.jp/', web:true } ] },
    { name:'24時間子供SOSダイヤル', feature:'（電話・24時間・無料）',
      contacts:[ { text:'0120-0-78310', href:'tel:0120078310' } ] },
    { name:'児童相談所 相談専用ダイヤル', feature:'（電話・24時間・無料）',
      contacts:[ { text:'0120-189-783', href:'tel:0120189783' } ] }
  ],
  en: [
    { name:'Child Helpline International', feature:'(The worldwide network of child helplines - find the one for each country)',
      contacts:[ { text:'childhelplineinternational.org', href:'https://childhelplineinternational.org/', web:true } ] },
    { name:'Find a Helpline', feature:'(A worldwide directory of verified, free and confidential helplines)',
      contacts:[ { text:'findahelpline.com', href:'https://findahelpline.com/', web:true } ] },
    { name:'Childline (UK)', feature:'(Under 19 / free / 24 hours / does not show on the phone bill)',
      contacts:[ { text:'0800 1111', href:'tel:08001111' },
                 { text:'childline.org.uk', href:'https://www.childline.org.uk/', web:true } ] },
    { name:'Kids Helpline (Australia)', feature:'(Ages 5-25 / free / 24 hours)',
      contacts:[ { text:'1800 55 1800', href:'tel:1800551800' },
                 { text:'kidshelpline.com.au', href:'https://kidshelpline.com.au/', web:true } ] },
    { name:'Kids Help Phone (Canada)', feature:'(Free / 24 hours / call or text)',
      contacts:[ { text:'1-800-668-6868', href:'tel:18006686868' },
                 { text:'kidshelpphone.ca', href:'https://kidshelpphone.ca/', web:true } ] },
    { name:'Boys Town National Hotline (USA)', feature:'(Teens and families / toll-free / 24 hours)',
      contacts:[ { text:'800-448-3000', href:'tel:18004483000' } ] },
    { name:'Carers Trust (UK)', feature:'(Support services for young carers across the UK)',
      contacts:[ { text:'carers.org', href:'https://carers.org/', web:true } ] }
  ]
};

/* ================= 画面切替(4タブ。メモはタブに置かない=アプリ名連打でだけ開く) ================= */
const SCREENS = ['hitoiki', 'onaji', 'shitte', 'madoguchi'];
let curScreen = 'hitoiki';
function showScreen(name){
  curScreen = name;
  SCREENS.forEach(s => getEl('scr-' + s).classList.toggle('hidden', s !== name));
  document.querySelectorAll('#tabbar .tab').forEach(b => b.classList.toggle('active', b.dataset.scr === name));
  if(typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0);
}

/* ================= トースト ================= */
let toastTimer = null;
function toast(msg, sub){
  const t = getEl('toast');
  t.textContent = '';
  t.appendChild(el('span', null, msg));
  if(sub) t.appendChild(el('span', 'toast-sub', sub));
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), sub ? 4200 : 1600);
}

/* ================= ① ひといき: 呼吸 + 一言 ================= */
let phaseTimer = null, breathPhase = 'in';   // 現在のフェーズを保持し、言語切替でも訳し直せるように
function setBreathText(){ const p = getEl('breath-phase'); if(p) p.textContent = (breathPhase === 'in') ? T('breathIn') : T('breathOut'); }
function beginBreath(){
  /* CSSアニメの周期(10秒)に合わせて 吸う(4秒)→はく(6秒) の文字を切り替える */
  breathPhase = 'in'; setBreathText();
  clearTimeout(phaseTimer);
  phaseTimer = setTimeout(() => { breathPhase = 'out'; setBreathText(); }, 4000);
}

let onelineIdx = 0;
function showOneline(){ const o = getEl('oneline'); if(o) o.textContent = T('onelines')[onelineIdx]; }
function nextOneline(){ onelineIdx = (onelineIdx + 1) % T('onelines').length; showOneline(); }

/* ================= ②③④ カードの生成(静的・起動時に一度だけ) ================= */
function buildOnaji(){
  const box = getEl('onaji-list');
  box.textContent = '';
  ONAJI[lang].forEach(c => {
    const card = el('div', 'card');
    card.appendChild(el('div', 'card-title', c.title));
    card.appendChild(el('div', 'card-body', c.body));
    box.appendChild(card);
  });
  box.appendChild(el('p', 'card-note', T('onajiNote')));   // 末尾の出典注記
}
function buildShitte(){
  const box = getEl('shitte-list');
  box.textContent = '';
  T('shitte').forEach(c => {
    const card = el('div', 'card');
    card.appendChild(el('div', 'card-title', c.title));
    card.appendChild(el('div', 'card-body', c.body));
    box.appendChild(card);
  });
}
function buildMadoguchi(){
  getEl('madoguchi-intro').textContent = T('madoIntro');
  const box = getEl('madoguchi-list');
  box.textContent = '';
  MADO[lang].forEach(c => {
    const card = el('div', 'card');
    card.appendChild(el('div', 'card-title', c.name));
    card.appendChild(el('div', 'card-body', c.feature));
    const cl = el('div', 'contact');
    c.contacts.forEach(ct => {
      const a = el('a', null, ct.text);
      a.href = ct.href;
      if(ct.web){ a.target = '_blank'; a.rel = 'noopener'; }   // 外部リンクは別タブ・rel=noopener
      cl.appendChild(a);
    });
    card.appendChild(cl);
    box.appendChild(card);
  });
}

/* ================= メモの部屋(そよぎポケット方式: 書いたら見えない・アプリ名連打でだけ開く一体型) ================= */
function saveMemo(){
  const ta = getEl('memo-input');
  const m = (ta.value || '').trim();
  if(!m) return;                       // 空は保存しない(何も起きない)
  memos.push({ t: Date.now(), m: m });
  saveMemos();
  ta.value = '';                       // 欄を空にする
  clearDraft();                        // 本体(kyukei.memos)に移ったので書きかけは消す(v0.5)
  renderMemoViewList();                // 下の一覧に即反映(部屋は開いたまま)
  toast(T('memoSaved'));
}

/* ---- 日時(新しい順の一覧に添える。言語別フォーマット) ---- */
function fmtMemoDate(t){
  const d = new Date(t);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const m = d.getMonth() + 1, day = d.getDate();
  return (lang === 'ja') ? (m + '月' + day + '日 ' + hh + ':' + mm) : (m + '/' + day + ' ' + hh + ':' + mm);
}

/* ---- 隠し閲覧オーバーレイ(新しい順・日時付き・個別削除は2段階) ---- */
function renderMemoViewList(){
  const box = getEl('memo-view-list');
  box.textContent = '';
  if(!memos.length){ box.appendChild(el('div', 'memo-empty', T('memoEmpty'))); return; }
  for(let i = memos.length - 1; i >= 0; i--){   // 末尾=新しい順
    const e = memos[i], idx = i;
    const item = el('div', 'memo-item');
    item.appendChild(el('div', 'memo-item-date', fmtMemoDate(e.t)));
    item.appendChild(el('div', 'memo-item-body', e.m));
    const foot = el('div', 'memo-item-foot');
    const del = el('button', 'btn-del', '🗑');
    let armed = false;
    Tap.bind(del, () => {
      if(!armed){ armed = true; del.textContent = T('deleteConfirm'); return; }   // 2段階: 🗑 → けす?
      memos.splice(idx, 1);
      saveMemos();
      renderMemoViewList();
    });
    foot.appendChild(del);
    item.appendChild(foot);
    box.appendChild(item);
  }
}
function openMemoView(){ getEl('memo-input').value = loadDraft(); renderMemoViewList(); getEl('memo-view').classList.remove('hidden'); }   // v0.5: 開くとき書きかけを復元
function closeMemoView(){ getEl('memo-view').classList.add('hidden'); getEl('memo-view-list').textContent = ''; getEl('memo-input').value = ''; }   // v0.5: 閉じると欄はクリア(書きかけはkyukei.draftに保持)

/* ---- ヘッダー名(ロゴ)の連打で開く。進行状況・痕跡は一切出さない ----
   間隔が TAP_RESET_MS を超えたら数え直し。設定回数を超えて多めに連打しても、通過した瞬間に開く=忘れて詰まない。 */
const logoTap = { n:0, last:0 };
function memoTapGoal(){ return TAP_CHOICES.indexOf(prefs.memoTaps) >= 0 ? prefs.memoTaps : DEFAULT_TAPS; }
function onLogoTap(){
  const now = Date.now();
  logoTap.n = (now - logoTap.last <= TAP_RESET_MS) ? logoTap.n + 1 : 1;
  logoTap.last = now;
  if(logoTap.n >= memoTapGoal()){ logoTap.n = 0; openMemoView(); }
}

/* ================= せってい(タブにはしない・ひといき最下部のリンクから) ================= */
function buildTapChoices(){
  const box = getEl('set-taps');
  box.textContent = '';
  TAP_CHOICES.forEach(n => {
    const b = el('button', 'tap-opt' + (n === prefs.memoTaps ? ' sel' : ''), n + T('tapUnit'));
    Tap.bind(b, () => {
      prefs.memoTaps = n; savePrefs();
      document.querySelectorAll('#set-taps .tap-opt').forEach((x, i) => x.classList.toggle('sel', TAP_CHOICES[i] === n));
    });
    box.appendChild(b);
  });
}
/* おんがく(BGM)の [ながす]/[ながさない] トグル。ONは即開始(タップ済みなら)・OFFはフェード停止 */
function buildBgmToggle(){
  const box = getEl('set-bgm');
  box.textContent = '';
  const OPTS = [{ on:true, label:T('musicOn') }, { on:false, label:T('musicOff') }];
  OPTS.forEach(o => {
    const b = el('button', 'tap-opt' + (o.on === prefs.bgm ? ' sel' : ''), o.label);
    Tap.bind(b, () => {
      prefs.bgm = o.on; savePrefs();
      Sound.setBgmEnabled(o.on);
      document.querySelectorAll('#set-bgm .tap-opt').forEach((x, i) => x.classList.toggle('sel', OPTS[i].on === o.on));
    });
    box.appendChild(b);
  });
}
function openSettings(){
  getEl('set-exit').value = prefs.exitUrl || '';
  buildTapChoices();
  buildBgmToggle();
  getEl('settings').classList.remove('hidden');
}
function closeSettings(){ getEl('settings').classList.add('hidden'); }
function saveExitUrl(){
  const v = (getEl('set-exit').value || '').trim();
  prefs.exitUrl = v || EXIT_DEFAULT;
  savePrefs();
  toast(T('savedPref'));
}

/* ================= 言語(🌐・ヘッダー常時表示。連打判定には含めない) ================= */
function buildLangChoices(){
  const box = getEl('lang-choices');
  if(!box) return;
  box.textContent = '';
  [['ja', '日本語'], ['en', 'English']].forEach(pair => {
    const b = el('button', 'tap-opt' + (pair[0] === lang ? ' sel' : ''), pair[1]);   // 言語名は常に自国表記
    Tap.bind(b, () => { closeLangSheet(); setLang(pair[0]); });
    box.appendChild(b);
  });
}
function openLangSheet(){ buildLangChoices(); getEl('lang-sheet').classList.remove('hidden'); }
function closeLangSheet(){ getEl('lang-sheet').classList.add('hidden'); }
function setLang(code){
  if(code !== 'ja' && code !== 'en' || code === lang) return;
  lang = code; prefs.lang = code; savePrefs();
  applyLang();   // 全画面を新しい言語で描き直す
}
/* 現在の言語で 全表示を反映(起動時と切替時に呼ぶ) */
function applyLang(){
  document.documentElement.lang = lang;
  try{ document.title = appName(); }catch(e){}
  getEl('hd-title').textContent = appName();
  /* 静的ラベル([data-i18n])を一括反映 */
  document.querySelectorAll('[data-i18n]').forEach(n => { const v = T(n.dataset.i18n); if(typeof v === 'string') n.textContent = v; });
  /* 動的コンテンツ */
  buildOnaji(); buildShitte(); buildMadoguchi();
  if(onelineIdx >= T('onelines').length) onelineIdx = 0;
  showOneline();
  setBreathText();
  buildTapChoices(); buildBgmToggle(); buildLangChoices();
  if(getEl('intro') && !getEl('intro').classList.contains('hidden')) setIntroText();
}

/* ================= 初回起動の一度きり案内(発見手段の確保・裁定v0.3) =================
   文言は原案どおり(lang.jsの intro テンプレート)。{name}=アプリ名・{n}=現在の設定回数を反映。
   一度「わかった」を押すと introShown=true で以後は永遠に出さない。 */
function setIntroText(){
  getEl('intro-text').textContent = tpl(T('intro'), { name: appName(), n: prefs.memoTaps });
}
function showIntro(){ setIntroText(); getEl('intro').classList.remove('hidden'); }
function closeIntro(){
  getEl('intro').classList.add('hidden');
  prefs.introShown = true; savePrefs();   // 以後は永遠に出さない
}

/* ================= クイック退出(戻るで戻れないよう location.replace) ================= */
function quickExit(){
  const url = (prefs.exitUrl && prefs.exitUrl.trim()) || EXIT_DEFAULT;
  location.replace(url);
}

/* ================= 起動 ================= */
function init(){
  /* ヘッダー名(ロゴ)。ここを連打すると メモの部屋が開く(痕跡は出さない=.pressing無しでCSS上も無反応)。
     🌐 と × とじる は連打判定には含めない(連打対象はアプリ名だけ=現行どおり) */
  Tap.bind(getEl('hd-title'), onLogoTap);

  /* 🌐 言語(ヘッダー常時表示) + 右上の常設「× とじる」 */
  Tap.bind(getEl('btn-lang'), openLangSheet);
  Tap.bind(getEl('lang-close'), closeLangSheet);
  Tap.bind(getEl('btn-exit'), quickExit);

  /* 下タブ */
  document.querySelectorAll('#tabbar .tab').forEach(b => {
    Tap.bind(b, () => showScreen(b.dataset.scr));
  });

  /* ① 呼吸(アニメの周期に合わせて文字を切り替え)+ 一言(タップで順送り) */
  const circle = getEl('breath-circle');
  if(circle){
    circle.addEventListener('animationstart', beginBreath);
    circle.addEventListener('animationiteration', beginBreath);
  }
  Tap.bind(getEl('oneline'), nextOneline);
  Tap.bind(getEl('open-settings'), openSettings);   // せっていはメモの部屋の下部からのみ(可視UIには出さない)

  /* メモの部屋(書く+一覧が一体・アプリ名連打で開く) */
  Tap.bind(getEl('memo-save'), saveMemo);
  Tap.bind(getEl('memo-view-close'), closeMemoView);
  /* 書きかけを入力のたびに端末へ保存(v0.5)。inputはテキスト入力の追従でありボタン操作ではない */
  getEl('memo-input').addEventListener('input', () => saveDraft(getEl('memo-input').value));

  /* せってい */
  Tap.bind(getEl('settings-close'), closeSettings);
  Tap.bind(getEl('set-exit-save'), saveExitUrl);

  /* 初回案内 */
  Tap.bind(getEl('intro-ok'), closeIntro);

  /* メモの部屋・せってい・案内・言語シートは起動時に必ず閉じておく(開いた状態は保存しない=再起動で必ず閉じている) */
  closeMemoView();
  closeSettings();
  closeLangSheet();
  getEl('intro').classList.add('hidden');

  /* 言語を反映(アプリ名・全ラベル・カード・一言・呼吸をまとめて描画) */
  applyLang();
  beginBreath();

  /* BGM(v0.2): prefs.bgm と同期。実際に鳴るのは最初のタップ以降(ブラウザの自動再生制限に従う) */
  Sound.setBgmEnabled(prefs.bgm);

  showScreen('hitoiki');

  /* 初回だけ 一度きりの案内を出す(発見手段の確保・v0.3) */
  if(!prefs.introShown) showIntro();
}
init();

/* ---- Service Worker 登録(https / localhost のみ・オフライン対応。姉妹アプリと同方式) ---- */
if(typeof navigator !== 'undefined' && navigator.serviceWorker &&
   (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')){
  try{ navigator.serviceWorker.register('sw.js'); }catch(_){}
}
