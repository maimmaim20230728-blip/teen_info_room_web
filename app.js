/* 10代の情報室 / Teen Info Room v1.1(世界版=12言語 ja/en/de/fr/es/it/pt/nl/sv/ko/zh/ar)
   ・家族の世話をしている子ども・若者(ヤングケアラー)本人が、夜にひとりで休める部屋。
   ・端末内(localStorage)のみ。送信・アカウント・分析なし(裁定・DESIGN_MEMO §5)。
   ・全ボタンは Tap.bind(clickは使わない)。ユーザー入力のDOM反映は textContent のみ(innerHTML禁止)。
   ・そよぎ緑は使わない中立デザイン。効果音(タップ音)なし。BGMは穏やか・低音量(夜中に開く前提・せっていでON/OFF・v0.2)。
   🔴 全表示文字列は lang.js(12言語・キー完全一致・フォールバック 選択→en→ja)。可視領域は情報提供の形(三人称・記事調)で「あなた」への語りかけ排除(v0.4)。ar は dir=rtl。
   🔴 script順=lang.js→audio.js→tap.js→app.js。Sound は audio.js 定義。tap.jsのSound.tap()は無音でBGM開始トリガーのみ。 */

/* ---- 隠し閲覧の連打判定(そよぎポケットのシンプル表示に準拠 soyogi_wallet\src\app\wallet\simpleView.ts) ---- */
const TAP_CHOICES = [1, 3, 5, 10];   // 連打回数の選択肢
const DEFAULT_TAPS = 3;              // 既定
const TAP_RESET_MS = 2500;           // タップ間隔がこれを超えたら数え直し(ゆっくりでも押せる)
const EXIT_DEFAULT = 'https://www.google.com';

/* ---- 対応言語(v1.1・12言語)。🌐シートは自称表記・ar はRTL ---- */
const LANG_CODES = ['ja','en','de','fr','es','it','pt','nl','sv','ko','zh','ar'];
const LANG_NAMES = { ja:'日本語', en:'English', de:'Deutsch', fr:'Français', es:'Español', it:'Italiano', pt:'Português', nl:'Nederlands', sv:'Svenska', ko:'한국어', zh:'中文', ar:'العربية' };

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
if(LANG_CODES.indexOf(prefs.lang) < 0) prefs.lang = null;
function saveMemos(){ saveJSON(LS_MEMOS, memos); }
function savePrefs(){ saveJSON(LS_PREFS, prefs); }

/* ---- i18n(12言語・v1.1) ----
   全表示文字列は lang.js(window.KYUKEI_LANG)にキー化。全言語でキー構造は完全一致。
   フォールバックは「選択言語→en→ja」(非日本語の欠落が日本語に落ちないように)。
   ONAJI(データカード)と MADO(窓口)だけは href 付きの構造データのため下に言語別で持つ。 */
const LANGS = (typeof window !== 'undefined' ? window : globalThis).KYUKEI_LANG;
function detectLang(){
  const nav = (typeof navigator !== 'undefined' && (navigator.language || (navigator.languages && navigator.languages[0]))) || '';
  const code = String(nav).toLowerCase().split('-')[0];   // 'de-DE'→'de'・'zh-CN'→'zh'
  return LANG_CODES.indexOf(code) >= 0 ? code : 'en';      // 対応外はen
}
let lang = (LANG_CODES.indexOf(prefs.lang) >= 0) ? prefs.lang : detectLang();
function tget(obj, path){ if(!obj) return undefined; const p = path.split('.'); let c = obj; for(let i = 0; i < p.length; i++){ if(c == null) return undefined; c = c[p[i]]; } return c; }
function T(path){ let v = tget(LANGS[lang], path); if(v == null) v = tget(LANGS.en, path); if(v == null) v = tget(LANGS.ja, path); return v; }   // 選択言語→en→ja
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
  ],
  de: [
    { title: "Zahlen aus Japan (nach Klassenstufe)", body: "In Japans landesweiten Befragungen gab etwa 1 von 15 Sechstklässlern (6,5%), 1 von 17 Schülern der 8. Klasse (5,7%) und 1 von 24 Schülern der 11. Klasse (4,1%) an, ein Familienmitglied zu versorgen. Das sind ein bis zwei in jeder Klasse." },
    { title: "Jeden Tag, stundenlang", body: "Etwa die Hälfte dieser Schüler hilft fast täglich. An Schultagen dauert die Sorge im Schnitt 3 bis 4 Stunden am Tag. Diese Stunden überschneiden sich mit Hausaufgaben, Hobbys und Schlaf." },
    { title: "Mehr als die Hälfte hat es niemandem erzählt", body: "In Befragungen japanischer Schüler hatte mehr als die Hälfte noch nie mit jemandem über ihre Aufgaben zu Hause gesprochen. „Ich glaube nicht, dass andere das verstehen würden\" war ein häufiger Grund." },
    { title: "Rund um die Welt", body: "Junge Pflegende gibt es in jedem Land. In England zählte der Zensus 2021 etwa 120.000 junge Pflegende zwischen 5 und 17 Jahren - und das Statistikamt selbst sagt, die wahre Zahl liege wohl höher. In Deutschland ergab eine bundesweite Befragung, dass etwa 5% der 12- bis 17-Jährigen regelmäßig bei der Versorgung eines Familienmitglieds helfen. In der Schweiz fand eine große Schulstudie 7,9%. In den USA deuten nationale Zeitverwendungsdaten darauf hin, dass fast 1 von 10 Jugendlichen zwischen 15 und 18 einen Erwachsenen mitversorgt. Und in vielen Ländern hat noch niemand gezählt." },
    { title: "Die Rolle der Zeit für sich", body: "Lesen, Musik hören, langsam atmen. Junge Menschen in dieser Lage sagen oft, dass ruhige Zeit für sich allein ihnen geholfen hat, weiterzumachen." }
  ],
  fr: [
    { title: "Chiffres du Japon (par niveau scolaire)", body: "Dans les enquêtes nationales du Japon, environ 1 élève de sixième année sur 15 (6,5%), 1 collégien de deuxième année sur 17 (5,7%) et 1 lycéen de deuxième année sur 24 (4,1%) déclarent s'occuper d'un membre de leur famille. Cela fait un ou deux élèves par classe." },
    { title: "Chaque jour, pendant des heures", body: "Environ la moitié de ces élèves aident leur famille presque tous les jours. En semaine, cela prend en moyenne 3 à 4 heures par jour. Des heures qui se superposent aux devoirs, aux loisirs et au sommeil." },
    { title: "Plus de la moitié n'en ont parlé à personne", body: "Dans les enquêtes menées auprès de collégiens et lycéens japonais, plus de la moitié n'avaient jamais parlé à personne de leur rôle. « Je ne pense pas qu'on me comprendrait » revenait souvent comme raison." },
    { title: "Autour du monde", body: "Les jeunes aidants existent dans tous les pays. En Angleterre, le recensement de 2021 a compté environ 120 000 jeunes aidants de 5 à 17 ans - et l'office des statistiques dit lui-même que le vrai chiffre est sans doute plus élevé. En Allemagne, une enquête nationale a montré qu'environ 5% des 12-17 ans aident régulièrement à s'occuper d'un proche. En Suisse, une grande étude scolaire a trouvé 7,9%. Aux États-Unis, les données nationales d'emploi du temps suggèrent que près d'un jeune de 15 à 18 ans sur 10 aide à s'occuper d'un adulte. Et dans beaucoup de pays, personne n'a encore compté." },
    { title: "Le rôle du temps pour soi", body: "Lire, écouter de la musique, respirer lentement. Les jeunes dans cette situation disent souvent que des moments calmes, seuls, les ont aidés à tenir." }
  ],
  es: [
    { title: "Datos de Japón (por curso escolar)", body: "En las encuestas nacionales de Japón, alrededor de 1 de cada 15 alumnos de sexto de primaria (6,5%), 1 de cada 17 de segundo de secundaria (5,7%) y 1 de cada 24 de segundo de bachillerato (4,1%) declararon cuidar de un familiar. Eso es uno o dos alumnos por clase." },
    { title: "Cada día, durante horas", body: "Alrededor de la mitad de estos alumnos ayudan a su familia casi todos los días. Entre semana, el cuidado ocupa una media de 3 a 4 horas al día. Horas que se solapan con los deberes, las aficiones y el sueño." },
    { title: "Más de la mitad no se lo ha contado a nadie", body: "En las encuestas a estudiantes japoneses de secundaria y bachillerato, más de la mitad nunca había hablado con nadie de su papel. \"No creo que me entiendan\" era una razón frecuente." },
    { title: "Alrededor del mundo", body: "Los jóvenes cuidadores existen en todos los países. En Inglaterra, el censo de 2021 contó unos 120.000 jóvenes cuidadores de 5 a 17 años, y la propia oficina de estadística dice que la cifra real es probablemente mayor. En Alemania, una encuesta nacional halló que alrededor del 5% de los jóvenes de 12 a 17 años ayudan con regularidad a cuidar de un familiar. En Suiza, un gran estudio escolar encontró un 7,9%. En Estados Unidos, los datos nacionales de uso del tiempo sugieren que casi 1 de cada 10 jóvenes de 15 a 18 años ayuda a cuidar de un adulto. Y en muchos países, nadie ha contado todavía." },
    { title: "El papel del tiempo a solas", body: "Leer, escuchar música, respirar despacio. Los jóvenes en esta situación cuentan a menudo que el tiempo tranquilo a solas les ayudó a seguir adelante." }
  ],
  it: [
    { title: "Dati dal Giappone (per anno scolastico)", body: "Nelle indagini nazionali giapponesi, circa 1 alunno di quinta elementare su 15 (6,5%), 1 studente di seconda media su 17 (5,7%) e 1 studente del secondo anno di superiori su 24 (4,1%) dichiara di prendersi cura di un familiare. Cioè uno o due studenti per classe." },
    { title: "Ogni giorno, per ore", body: "Circa la metà di questi studenti aiuta la famiglia quasi ogni giorno. Nei giorni di scuola, la cura richiede in media dalle 3 alle 4 ore al giorno. Ore che si sovrappongono a compiti, passioni e sonno." },
    { title: "Più della metà non l'ha detto a nessuno", body: "Nelle indagini su studenti giapponesi di medie e superiori, più della metà non aveva mai parlato con nessuno del proprio ruolo. \"Non credo che capirebbero\" era un motivo frequente." },
    { title: "Nel mondo", body: "I giovani caregiver esistono in ogni paese. In Inghilterra, il censimento del 2021 ha contato circa 120.000 giovani caregiver tra i 5 e i 17 anni - e lo stesso istituto di statistica dice che il numero vero è probabilmente più alto. In Germania, un'indagine nazionale ha rilevato che circa il 5% dei ragazzi tra i 12 e i 17 anni aiuta regolarmente ad assistere un familiare. In Svizzera, un grande studio nelle scuole ha trovato il 7,9%. Negli Stati Uniti, i dati nazionali sull'uso del tempo suggeriscono che quasi 1 giovane su 10 tra i 15 e i 18 anni aiuta ad assistere un adulto. E in molti paesi, nessuno ha ancora contato." },
    { title: "Il ruolo del tempo per sé", body: "Leggere, ascoltare musica, respirare piano. I giovani in questa situazione raccontano spesso che il tempo tranquillo da soli li ha aiutati ad andare avanti." }
  ],
  pt: [
    { title: "Dados do Japão (por ano escolar)", body: "Nas pesquisas nacionais do Japão, cerca de 1 em cada 15 alunos do sexto ano (6,5%), 1 em cada 17 do segundo ano do fundamental II (5,7%) e 1 em cada 24 do segundo ano do ensino médio (4,1%) relataram cuidar de um familiar. Isso dá um ou dois alunos por turma." },
    { title: "Todos os dias, por horas", body: "Cerca de metade desses alunos ajuda a família quase todos os dias. Em dias de semana, o cuidado leva em média de 3 a 4 horas por dia. Horas que se sobrepõem ao dever de casa, aos hobbies e ao sono." },
    { title: "Mais da metade não contou a ninguém", body: "Nas pesquisas com estudantes japoneses, mais da metade nunca tinha falado com ninguém sobre seu papel. \"Acho que não iam entender\" era um motivo comum." },
    { title: "Pelo mundo", body: "Jovens cuidadores existem em todos os países. Na Inglaterra, o censo de 2021 contou cerca de 120.000 jovens cuidadores de 5 a 17 anos - e o próprio órgão de estatística diz que o número real deve ser maior. Na Alemanha, uma pesquisa nacional mostrou que cerca de 5% dos jovens de 12 a 17 anos ajudam regularmente a cuidar de um familiar. Na Suíça, um grande estudo escolar encontrou 7,9%. Nos Estados Unidos, dados nacionais de uso do tempo sugerem que quase 1 em cada 10 jovens de 15 a 18 anos ajuda a cuidar de um adulto. E em muitos países, ninguém contou ainda." },
    { title: "O papel do tempo sozinho", body: "Ler, ouvir música, respirar devagar. Jovens nessa situação contam muitas vezes que o tempo tranquilo sozinhos os ajudou a seguir em frente." }
  ],
  nl: [
    { title: "Cijfers uit Japan (per leerjaar)", body: "In de landelijke onderzoeken van Japan gaf ongeveer 1 op de 15 leerlingen van groep 8 (6,5%), 1 op de 17 tweedejaars van de onderbouw (5,7%) en 1 op de 24 tweedejaars van de bovenbouw (4,1%) aan voor een familielid te zorgen. Dat zijn er één of twee in elke klas." },
    { title: "Elke dag, urenlang", body: "Ongeveer de helft van deze leerlingen helpt bijna elke dag. Op schooldagen kost de zorg gemiddeld 3 tot 4 uur per dag. Uren die overlappen met huiswerk, hobby's en slaap." },
    { title: "Meer dan de helft heeft het niemand verteld", body: "In onderzoeken onder Japanse scholieren had meer dan de helft er nog nooit met iemand over gesproken. \"Ik denk niet dat ze het zouden begrijpen\" was een veelgenoemde reden." },
    { title: "Over de hele wereld", body: "Jonge mantelzorgers zijn er in elk land. In Engeland telde de volkstelling van 2021 ongeveer 120.000 jonge mantelzorgers van 5 tot 17 jaar - en het statistiekbureau zegt zelf dat het echte aantal waarschijnlijk hoger ligt. In Duitsland bleek uit een landelijk onderzoek dat ongeveer 5% van de 12- tot 17-jarigen regelmatig meehelpt bij de zorg voor een familielid. In Zwitserland vond een groot schoolonderzoek 7,9%. In de Verenigde Staten wijzen nationale tijdsbestedingsgegevens erop dat bijna 1 op de 10 jongeren van 15 tot 18 jaar meezorgt voor een volwassene. En in veel landen heeft nog niemand geteld." },
    { title: "De rol van tijd voor jezelf", body: "Lezen, muziek luisteren, langzaam ademen. Jongeren in deze situatie vertellen vaak dat rustige tijd alleen hen hielp om door te gaan." }
  ],
  sv: [
    { title: "Siffror från Japan (per årskurs)", body: "I Japans nationella undersökningar uppgav ungefär 1 av 15 elever i årskurs 6 (6,5%), 1 av 17 i åttonde klass (5,7%) och 1 av 24 andraårselever på gymnasiet (4,1%) att de tar hand om en familjemedlem. Det är en eller två elever i varje klass." },
    { title: "Varje dag, i timmar", body: "Ungefär hälften av dessa elever hjälper sin familj nästan varje dag. På vardagar tar omsorgen i snitt 3 till 4 timmar om dagen. Timmar som krockar med läxor, fritid och sömn." },
    { title: "Mer än hälften har inte berättat för någon", body: "I undersökningar bland japanska högstadie- och gymnasieelever hade mer än hälften aldrig pratat med någon om sin roll. \"Jag tror inte att de skulle förstå\" var ett vanligt skäl." },
    { title: "Runt om i världen", body: "Unga omsorgsgivare finns i alla länder. I England räknade folkräkningen 2021 till ungefär 120 000 unga omsorgsgivare mellan 5 och 17 år - och statistikmyndigheten säger själv att den verkliga siffran troligen är högre. I Tyskland visade en nationell undersökning att ungefär 5% av 12- till 17-åringarna regelbundet hjälper till att ta hand om en familjemedlem. I Schweiz fann en stor skolstudie 7,9%. I USA tyder nationella tidsanvändningsdata på att nästan 1 av 10 unga mellan 15 och 18 år hjälper till att ta hand om en vuxen. Och i många länder har ingen räknat ännu." },
    { title: "Egentidens roll", body: "Läsa, lyssna på musik, andas långsamt. Unga i den här situationen berättar ofta att lugn tid för sig själva hjälpte dem att orka vidare." }
  ],
  ko: [
    { title: "일본의 데이터 (학년별)", body: "일본의 전국 조사에서는 초등학교 6학년의 약 15명 중 1명(6.5%), 중학교 2학년의 약 17명 중 1명(5.7%), 고등학교 2학년의 약 24명 중 1명(4.1%)이 가족을 돌보고 있다고 답했습니다. 어느 학년이든 한 반에 한두 명 있는 셈입니다." },
    { title: "매일, 몇 시간씩", body: "같은 조사에서 이 학생들의 약 절반이 거의 매일 가족을 돕고 있었습니다. 평일에 돌봄에 쓰는 시간은 하루 평균 3~4시간으로 보고되었습니다. 숙제, 취미, 잠과 겹치는 시간입니다." },
    { title: "절반 이상이 아무에게도 말하지 않았다", body: "일본의 중고생 조사에서는 절반 이상이 돌봄에 대해 아무에게도 이야기한 적이 없었습니다. \"말해도 이해받지 못할 것 같다\"는 이유가 많았습니다." },
    { title: "세계에서는", body: "영 케어러는 모든 나라에 있습니다. 영국에서는 2021년 인구조사에서 5~17세의 영 케어러가 약 12만 명으로 집계되었고, 통계청 스스로 실제 수는 더 많을 것이라고 말합니다. 독일의 전국 조사에서는 12~17세의 약 5%가 정기적으로 가족 돌봄을 돕고 있었습니다. 스위스의 대규모 학교 조사에서는 7.9%였습니다. 미국의 국가 생활시간 조사 데이터는 15~18세의 10명 중 1명 가까이가 어른의 돌봄을 돕고 있음을 시사합니다. 그리고 많은 나라에서는, 아직 아무도 세어 본 적이 없습니다." },
    { title: "혼자만의 시간의 역할", body: "책을 읽고, 음악을 듣고, 천천히 숨을 쉬는 것. 이런 상황의 청소년들은 혼자 조용히 보내는 시간이 버티는 힘이 되었다고 자주 말합니다." }
  ],
  zh: [
    { title: "日本的数据 (按年级)", body: "在日本的全国调查中,小学六年级约每15人有1人(6.5%)、初中二年级约每17人有1人(5.7%)、高中二年级约每24人有1人(4.1%)回答自己在照顾家人。也就是说,每个班级都有一两个人。" },
    { title: "每天,好几个小时", body: "同一调查中,约有一半学生几乎每天都在帮助家人。工作日用于照顾的时间平均每天3到4小时。这些时间与作业、爱好和睡眠相重叠。" },
    { title: "一半以上的人没有告诉过任何人", body: "在对日本初高中生的调查中,一半以上的人从未和任何人谈过自己照顾家人的事。\"说了也不会被理解\"是常见的理由。" },
    { title: "世界各地", body: "每个国家都有年轻照顾者。在英格兰,2021年人口普查统计出约12万名5至17岁的年轻照顾者,而统计局自己也表示实际人数可能更多。在德国,全国调查发现12至17岁中约有5%的人经常帮忙照顾家人。在瑞士,一项大规模学校调查发现比例为7.9%。在美国,国家时间使用数据显示,15至18岁中接近十分之一的人在帮忙照顾成年人。而在许多国家,还没有人统计过。" },
    { title: "独处时间的作用", body: "读书、听音乐、慢慢呼吸。处在这种情况中的年轻人常说,安静的独处时间帮助他们坚持了下来。" }
  ],
  ar: [
    { title: "أرقام من اليابان (حسب الصف الدراسي)", body: "في المسوح الوطنية اليابانية، أفاد نحو 1 من كل 15 تلميذًا في الصف السادس (6.5%)، و1 من كل 17 في الثاني الإعدادي (5.7%)، و1 من كل 24 في الثاني الثانوي (4.1%) بأنهم يعتنون بأحد أفراد الأسرة. أي واحد أو اثنان في كل صف." },
    { title: "كل يوم، لساعات", body: "في المسوح نفسها، كان نحو نصف هؤلاء الطلاب يساعدون أسرهم كل يوم تقريبًا. وفي أيام الدراسة تستغرق الرعاية في المتوسط من 3 إلى 4 ساعات يوميًا. وهي ساعات تتداخل مع الواجبات والهوايات والنوم." },
    { title: "أكثر من النصف لم يخبروا أحدًا", body: "في مسوح شملت طلاب الإعدادي والثانوي في اليابان، لم يتحدث أكثر من نصفهم مع أي أحد عن دورهم. وكان سبب شائع: «لا أظن أن أحدًا سيفهم»." },
    { title: "حول العالم", body: "مقدمو الرعاية اليافعون موجودون في كل بلد. في إنجلترا، أحصى تعداد 2021 نحو 120,000 يافعًا مقدمًا للرعاية بين 5 و17 عامًا، ويقول مكتب الإحصاء نفسه إن الرقم الحقيقي أعلى على الأرجح. وفي ألمانيا وجد مسح وطني أن نحو 5% ممن هم بين 12 و17 عامًا يساعدون بانتظام في رعاية أحد أفراد الأسرة. وفي سويسرا وجدت دراسة مدرسية كبيرة 7.9%. وفي الولايات المتحدة تشير بيانات استخدام الوقت الوطنية إلى أن نحو 1 من كل 10 بين 15 و18 عامًا يساعد في رعاية شخص بالغ. وفي بلدان كثيرة، لم يقم أحد بالعدّ بعد." },
    { title: "دور الوقت مع النفس", body: "القراءة، والاستماع إلى الموسيقى، والتنفّس ببطء. كثيرًا ما يقول اليافعون في هذا الوضع إن الوقت الهادئ مع أنفسهم ساعدهم على الاستمرار." }
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
  ],
  de: [
    { name: "Child Helpline International", feature: "(Das weltweite Netzwerk der Kinder-Hilfetelefone - hier findet sich das richtige für jedes Land)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(Ein weltweites Verzeichnis geprüfter, kostenloser und vertraulicher Hilfsangebote)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  fr: [
    { name: "Child Helpline International", feature: "(Le réseau mondial des lignes d'écoute pour enfants - pour trouver celle de chaque pays)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(Un annuaire mondial de services vérifiés, gratuits et confidentiels)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  es: [
    { name: "Child Helpline International", feature: "(La red mundial de líneas de ayuda para la infancia: para encontrar la de cada país)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(Un directorio mundial de servicios verificados, gratuitos y confidenciales)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  it: [
    { name: "Child Helpline International", feature: "(La rete mondiale delle linee di ascolto per l'infanzia - per trovare quella di ogni paese)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(Un elenco mondiale di servizi verificati, gratuiti e riservati)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  pt: [
    { name: "Child Helpline International", feature: "(A rede mundial de linhas de apoio à infância - para achar a de cada país)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(Um diretório mundial de serviços verificados, gratuitos e confidenciais)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  nl: [
    { name: "Child Helpline International", feature: "(Het wereldwijde netwerk van kinderhulplijnen - vind die van elk land)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(Een wereldwijde gids van gecontroleerde, gratis en vertrouwelijke hulplijnen)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  sv: [
    { name: "Child Helpline International", feature: "(Det världsomspännande nätverket av hjälplinjer för barn - hitta den för varje land)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(En världsomfattande katalog över granskade, gratis och konfidentiella stödlinjer)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  ko: [
    { name: "Child Helpline International", feature: "(전 세계 어린이 상담전화 네트워크 - 각 나라의 창구를 찾을 수 있어요)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(검증된 무료·비밀 상담 창구의 세계 디렉터리)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  zh: [
    { name: "Child Helpline International", feature: "(全球儿童热线网络 - 可以找到各个国家的窗口)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(经过核实的免费保密热线的全球目录)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
  ],
  ar: [
    { name: "Child Helpline International", feature: "(الشبكة العالمية لخطوط مساعدة الأطفال - للعثور على خط كل بلد)", contacts: [ { text: "childhelplineinternational.org", href: "https://childhelplineinternational.org/", web: true } ] },
    { name: "Find a Helpline", feature: "(دليل عالمي لخدمات موثّقة مجانية وسرية)", contacts: [ { text: "findahelpline.com", href: "https://findahelpline.com/", web: true } ] }
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
  (ONAJI[lang] || ONAJI.en).forEach(c => {
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
  (MADO[lang] || MADO.en).forEach(c => {
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
  LANG_CODES.forEach(code => {
    const b = el('button', 'tap-opt' + (code === lang ? ' sel' : ''), LANG_NAMES[code]);   // 言語名は常に自称表記
    Tap.bind(b, () => { closeLangSheet(); setLang(code); });
    box.appendChild(b);
  });
}
function openLangSheet(){ buildLangChoices(); getEl('lang-sheet').classList.remove('hidden'); }
function closeLangSheet(){ getEl('lang-sheet').classList.add('hidden'); }
function setLang(code){
  if(LANG_CODES.indexOf(code) < 0 || code === lang) return;
  lang = code; prefs.lang = code; savePrefs();
  applyLang();   // 全画面を新しい言語で描き直す
}
/* 現在の言語で 全表示を反映(起動時と切替時に呼ぶ) */
function applyLang(){
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';   // アラビア語のみRTL
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
