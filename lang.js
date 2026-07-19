'use strict';
/* 10代の情報室 v1.0 言語データ(日英2言語)
   window.KYUKEI_LANG = { ja, en }。全表示文字列をキー化。キー構造は両言語で完全一致。
   🔴 ja は監修済みの現行文言を一字も変えずに収録。
   🔴 en は SPEC_YC_V1_WORLD.md / SPEC_YC_V1_FILL.md の原案どおり(一字も変えない)。
   ※ データカード(onaji)と窓口(mado)は href 付きの構造データのため app.js に言語別で持つ。 */
window.KYUKEI_LANG = {

  ja: {
    appName: '10代の情報室',
    close: '× とじる',
    langTitle: 'ことば / Language',
    tab: { hitoiki:'ひといき', onaji:'データ', shitte:'しっておく', madoguchi:'まどぐち' },

    breathIn: 'すって…',
    breathOut: 'はいて…',
    onelines: [
      'ゆっくりした呼吸には、心拍を落ちつかせる はたらきがあります。',
      '深呼吸は、3回くらいでも 効果があると言われています。',
      'なにもしない時間は、脳の休息に 必要だと考えられています。',
      '休むことと さぼることは、別のものとされています。'
    ],

    onajiNote: '数字は 国の全国調査（令和2〜3年度・厚生労働省/文部科学省など）にもとづいています',

    shitte: [
      { title:'ヤングケアラーという言葉',
        body:'家族の世話や家事を日常的に担う子ども・若者を「ヤングケアラー」と呼びます。例えば、世話や家事で宿題や部活の時間がとれない。友だちの誘いを断ることが多い。夜中に家族の対応で起きる。こうした毎日がつづく状態を指します。' },
      { title:'がんばりの評価',
        body:'家事や家族の世話は、大人でも大変な仕事です。それを担う10代について、支援の現場では「すごいことをしている」と評価されています。本人ほど「たいしたことではない」と感じやすいことも、知られています。' },
      { title:'原因のとらえ方',
        body:'介護や生活の問題は、病気・お金・人手のことなど、いくつもの事情が重なって起きます。「だれかのせい」と言えるものではない、というのが支援の現場の考え方です。責める相手をさがす必要はない、ということです。' },
      { title:'相談のルール',
        body:'相談窓口には、名前を言わなくていいところがあります。話す内容も、どこまで話すかも、本人が決めてよいことになっています。ただ聞いてもらうだけの使い方ができる窓口もあります。' },
      { title:'両立という考え方',
        body:'家族を大切にすることと、自分の時間や進路を大切にすること。この2つは両立できる、というのが支援の基本的な考え方です。そのための制度やサービスも、少しずつ増えています。' },
      { title:'頼ることの位置づけ',
        body:'大人や制度に頼ることは、ずるいことでも、家族を裏切ることでもなく、本人と家族の両方を守る方法のひとつとされています。' }
    ],

    madoIntro: '相談するかどうかは、本人が決めてよいこと、とされています。ここでは、10代が使える主な窓口を紹介します。',

    memoRoomTitle: 'メモの部屋',
    memoSave: 'そっと しまう',
    memoSaved: 'しまいました',
    memoEmpty: 'まだ なにも ありません',
    close2: 'とじる',
    deleteConfirm: 'けす?',
    settings: 'せってい',

    setExitLabel: '「× とじる」で ひらく ページ',
    setExitNote: 'なにも 入れなければ Google が ひらきます',
    save: 'ほぞん',
    savedPref: 'ほぞんしました',
    setTapsLabel: 'メモを ひらく タップの 回数',
    tapUnit: '回',
    setTapsNote: '画面の いちばん上の なまえを、この 回数 だけ つづけて タップすると、メモの部屋が ひらきます',
    music: 'おんがく',
    musicOn: 'ながす',
    musicOff: 'ながさない',
    privacyNote: '記録はこの端末の中だけ。どこにも送信されません',
    credit: 'アプリ開発：介護と支援の相談どころ　そよぎ',
    version: 'バージョン 1.0',

    introOk: 'わかった',
    intro: 'この部屋には、かくれた機能があります。\nいちばん上の「{name}」の名前を {n}回 つづけてタップすると、\nメモと せっていの部屋が ひらきます。\nこの案内は、もう二度と表示されません。'
  },

  en: {
    appName: 'Teen Info Room',
    close: '× Close',
    langTitle: 'ことば / Language',
    tab: { hitoiki:'Breathe', onaji:'Data', shitte:'Basics', madoguchi:'Helplines' },

    breathIn: 'Breathe in…',
    breathOut: 'Breathe out…',
    onelines: [
      'Slow breathing is known to calm the heart rate.',
      'Even three deep breaths are said to make a difference.',
      'Time spent doing nothing is considered necessary rest for the brain.',
      'Resting and slacking off are considered two different things.'
    ],

    onajiNote: "Figures are based on Japan's national surveys (2020–2021) and on the sources noted for other countries.",

    shitte: [
      { title:'The words "young carer"',
        body:'Children and teenagers who regularly look after family members or run the household are called "young carers." For example: no time for homework or clubs because of care and chores, often turning down friends, getting up at night for a family member. When days like this continue, that is what the term means.' },
      { title:'About the effort',
        body:'Housework and caring for a family member are hard work, even for adults. Support workers describe teenagers who do this as doing something remarkable. It is also known that the young people themselves tend to feel it is "nothing special."' },
      { title:'How to think about the cause',
        body:'Care and family problems happen when many things pile up: illness, money, not enough hands. Support workers say this is not something one person can be blamed for. There is no need to look for someone to blame.' },
      { title:'How helplines work',
        body:'Some helplines do not ask for a name. What to say, and how much, is decided by the caller. Some lines simply listen.' },
      { title:'Both can matter',
        body:"Caring about family and caring about one's own time and future can go together. That is the basic idea behind youth support, and services for it are slowly growing." },
      { title:'About asking for help',
        body:'Relying on adults or on support services is not cheating, and it is not betraying the family. It is considered one way to protect both the young person and the family.' }
    ],

    madoIntro: 'Whether to talk to someone is up to each person. This page simply lists places that exist.',

    memoRoomTitle: 'The Memo Room',
    memoSave: 'Save quietly',
    memoSaved: 'Saved quietly ✓',
    memoEmpty: 'Nothing here yet.',
    close2: 'Close',
    deleteConfirm: 'Delete?',
    settings: 'Settings',

    setExitLabel: 'Page opened by "× Close"',
    setExitNote: 'If this is empty, Google opens.',
    save: 'Save',
    savedPref: 'Saved',
    setTapsLabel: 'Taps to open the Memo Room',
    tapUnit: '',
    setTapsNote: 'Tap the name at the top of the screen this many times in a row to open the Memo Room.',
    music: 'Music',
    musicOn: 'Play',
    musicOff: 'Off',
    privacyNote: 'Everything stays on this device. Nothing is ever sent anywhere.',
    credit: 'App development: SOYOGI - Care & Support Consultation',
    version: 'Version 1.0',

    introOk: 'Got it',
    intro: 'This room has a hidden feature.\nTap the name "{name}" at the top {n} times in a row\nto open the Memo Room and Settings.\nThis notice will never be shown again.'
  }

};
