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

    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "障害のある家族がいるとき",
      "srcLabel": "出典：",
      "srcLang": "",
      "copied": "コピーしました",
      "copyFail": "コピーできませんでした",
      "why": {
        "title": "どうしてそうなるの？（理由の例）",
        "cards": [
          {
            "title": "音や、さわられる感じ",
            "body": "障害のある人の中には、ほかの人には気にならない音や、体のある部分にさわられることを、とても苦手に感じる人がいます。がまんや努力だけで慣れるものではない、と説明されています。"
          },
          {
            "title": "予定が変わると、不安が強くなることがある",
            "body": "この先どうなるかが分からないと、不安が一気に強くなる人がいます。いつもと同じやり方にこだわるのも、不安が強いときに起きやすい、と説明されています。"
          },
          {
            "title": "言葉のかわりに、行動で伝えていることがある",
            "body": "言葉でうまく伝えられないとき、自分なりの行動で気持ちを伝えようとすることがある、と説明されています。大きな声などの行動の中にも、伝えたいことがかくれている場合があります。"
          },
          {
            "title": "「わかった」が、わかったとは限らない",
            "body": "よく分かっていなくても「はい」「分かった」と返事をすることがある、と説明されています。言ったのに伝わっていなかったときは、この場合もあります。"
          },
          {
            "title": "本人には、本当のことに感じられている",
            "body": "幻覚や妄想は、本人にはまるで現実のように感じられている、と説明されています。まわりから見て分かりにくい言葉や行動にも、本人なりの理由があります。"
          }
        ]
      },
      "talk": {
        "title": "話すときの例",
        "hint": "タップすると、その文をコピーできます",
        "cards": [
          {
            "title": "友だちに話すなら",
            "lines": [
              "家のことで、放課後すぐ帰る日があるんだ。",
              "急に行けなくなることがあるけど、行きたくないわけじゃないよ。",
              "くわしくは言えないけど、いま家のことでちょっと大変なんだ。",
              "話を聞いてくれるだけで、助かる。"
            ]
          },
          {
            "title": "先生に話すなら",
            "lines": [
              "家族の事情で、宿題が間に合わない日があります。",
              "家のことで、夜あまり眠れない日があります。",
              "くわしい話はまだしたくないのですが、知っておいてほしくて。",
              "困ったときに相談できる人を、教えてください。"
            ],
            "note": "学校に相談すると、スクールソーシャルワーカーなどを通して、必要な支援につないでもらえることがある、と説明されています。"
          }
        ]
      },
      "things": {
        "title": "勉強や物の工夫",
        "cards": [
          {
            "title": "勉強する場所",
            "body": "家で集中しにくいときは、学校の図書室・地域の図書館・自習室など、家の外で勉強する方法もあります。耳せんやイヤーマフで、まわりの音を小さくする人もいます。"
          },
          {
            "title": "大事な物をしまう場所",
            "body": "大切な物や、こわされたくない物は、手の届きにくい場所や、ふた・鍵のついた箱にしまっておく方法があります。"
          },
          {
            "title": "家族のための支援は、兄弟姉妹にも",
            "body": "障害のある家族の支援では、兄弟姉妹や祖父母も「家族支援」の対象に含まれる、とされています。兄弟姉妹として育った人が話を聞く場（ピアサポート）を用意している自治体もあります。"
          }
        ]
      },
      "src": {
        "nise1": "国立特別支援教育総合研究所 発達障害教育推進センター「感覚過敏に対する指導・支援」",
        "rehab1": "国立障害者リハビリテーションセンター 発達障害情報・支援センター「発達障害児の家族への助言に関わる医師及び市町村担当者等への情報」",
        "mext14": "文部科学省「障害のある幼児と共に育つ生活の理解と指導」令和5年3月（自閉症などの項）",
        "nise2": "国立特別支援教育総合研究所 発達障害教育推進センター「こだわりに対する指導・支援」",
        "tokyoKyoiku": "東京都教育委員会「強度行動障害のある児童・生徒への効果的な指導の在り方」令和6年2月",
        "mext9": "文部科学省「障害のある幼児と共に育つ生活の理解と指導」令和5年3月（知的障害の項）",
        "ncnp": "国立精神・神経医療研究センター こころの情報サイト「統合失調症」",
        "hokkaido": "北海道教育庁「ヤングケアラーについて」",
        "cfa": "こども家庭庁「放課後等デイサービスガイドライン」令和6年7月",
        "nerima": "東京都練馬区「きょうだい児支援事業」（ピアサポーターによる相談）"
      }
    },
    /* ---- /v1.6 family ---- */
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
    askUnsaved: 'ほぞんしないで とじますか?',
    askYes: 'はい',
    askNo: 'いいえ',
    setTapsLabel: 'メモを ひらく タップの 回数',
    tapUnit: '回',
    setTapsNote: '画面の いちばん上の なまえを、この 回数 だけ つづけて タップすると、メモの部屋が ひらきます',
    music: 'おんがく',
    musicOn: 'ながす',
    musicOff: 'ながさない',
    looksOpen: 'みため(いろ と もじ)',
    looksTitle: 'みための せってい',
    looksColor: 'がめんの いろ',
    themeNight: 'よる',
    themeLight: 'しろ',
    themeCream: 'クリーム',
    themeBlack: 'くろ(はっきり)',
    looksText: 'もじの 大きさ',
    fsNormal: 'ふつう',
    fsLarge: '大きい',
    fsXL: 'とくだい',
    privacyNote: '記録はこの端末の中だけ。どこにも送信されません',
    credit: 'アプリ開発：介護と支援の相談どころ　そよぎ',
    version: 'バージョン 1.10',

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

    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "When a family member has a disability",
      "srcLabel": "Source: ",
      "srcLang": "(in Japanese)",
      "copied": "Copied",
      "copyFail": "Could not copy",
      "why": {
        "title": "Why does this happen? (possible reasons)",
        "cards": [
          {
            "title": "Sounds, and being touched",
            "body": "Some people with disabilities find certain sounds, or being touched on certain parts of the body, very hard to bear, even when others hardly notice. Public materials in Japan explain that this is not something a person can get used to through patience or effort alone."
          },
          {
            "title": "A change of plans can bring strong anxiety",
            "body": "For some people, not knowing what will happen next makes anxiety rise very quickly. Public materials in Japan explain that insisting on doing things the same way also tends to happen when anxiety is high."
          },
          {
            "title": "Sometimes actions speak instead of words",
            "body": "Public materials in Japan explain that when words do not come easily, a person may try to show their feelings through their own kind of action. Even behind something like a loud voice, there may be something the person is trying to say."
          },
          {
            "title": "\"Okay\" does not always mean understood",
            "body": "Public materials in Japan explain that a person may answer \"yes\" or \"okay\" without really understanding. When something was said but did not get through, this may be the reason."
          },
          {
            "title": "To the person, it feels real",
            "body": "Public materials in Japan explain that hallucinations and delusions feel just like reality to the person experiencing them. Words and actions that are hard to understand from the outside still have reasons of their own for that person."
          }
        ]
      },
      "talk": {
        "title": "Examples of what to say",
        "hint": "Tap a sentence to copy it.",
        "cards": [
          {
            "title": "To a friend",
            "lines": [
              "Some days I have to go straight home after school because of stuff at home.",
              "Sometimes I have to cancel at the last minute, but it's not that I don't want to come.",
              "I can't really go into details, but things at home are a bit hard right now.",
              "Just having someone listen really helps."
            ]
          },
          {
            "title": "To a teacher",
            "lines": [
              "Because of family circumstances, there are days when I can't finish my homework on time.",
              "Because of things at home, there are nights when I don't sleep well.",
              "I'm not ready to talk about the details yet, but I wanted to let you know.",
              "Could you tell me who I can talk to when I'm having a hard time?"
            ],
            "note": "Public materials in Japan explain that when a school hears about the situation, it may be able to connect the student with the support they need, for example through a school social worker."
          }
        ]
      },
      "things": {
        "title": "Study and belongings",
        "cards": [
          {
            "title": "A place to study",
            "body": "When it is hard to concentrate at home, studying somewhere else is also an option: a school library, a public library, or a study room. Some people use earplugs or earmuffs to turn down the noise around them."
          },
          {
            "title": "A place for important things",
            "body": "Important things, or things that should not get broken, can be kept somewhere hard to reach, or in a box with a lid or a lock."
          },
          {
            "title": "Family support includes brothers and sisters",
            "body": "In Japan, public guidelines say that \"family support\" around a family member with a disability also includes brothers, sisters, and grandparents. Some local governments offer places where people who grew up as brothers or sisters of someone with a disability listen and talk (peer support)."
          }
        ]
      },
      "src": {
        "nise1": "National Institute of Special Needs Education (Japan), \"Support for sensory hypersensitivity\"",
        "rehab1": "National Rehabilitation Center for Persons with Disabilities (Japan), information for doctors and local officials who advise families",
        "mext14": "Ministry of Education, Culture, Sports, Science and Technology (Japan), teaching guide, March 2023 (section on autism)",
        "nise2": "National Institute of Special Needs Education (Japan), \"Support for insistence on sameness\"",
        "tokyoKyoiku": "Tokyo Metropolitan Board of Education, guide on teaching students with severe behavioral challenges, February 2024",
        "mext9": "Ministry of Education, Culture, Sports, Science and Technology (Japan), teaching guide, March 2023 (section on intellectual disability)",
        "ncnp": "National Center of Neurology and Psychiatry (Japan), mental health information site, \"Schizophrenia\"",
        "hokkaido": "Hokkaido Board of Education (Japan), \"About young carers\"",
        "cfa": "Children and Families Agency (Japan), guidelines for after-school day services, July 2024",
        "nerima": "Nerima City, Tokyo, support program for siblings (talks with peer supporters)"
      }
    },
    /* ---- /v1.6 family ---- */
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
    askUnsaved: 'Close without saving?',
    askYes: 'Yes',
    askNo: 'No',
    setTapsLabel: 'Taps to open the Memo Room',
    tapUnit: '',
    setTapsNote: 'Tap the name at the top of the screen this many times in a row to open the Memo Room.',
    music: 'Music',
    musicOn: 'Play',
    musicOff: 'Off',
    looksOpen: 'Display (colors & text)',
    looksTitle: 'Display settings',
    looksColor: 'Screen colors',
    themeNight: 'Night',
    themeLight: 'White',
    themeCream: 'Cream',
    themeBlack: 'Black (high contrast)',
    looksText: 'Text size',
    fsNormal: 'Normal',
    fsLarge: 'Large',
    fsXL: 'Extra large',
    privacyNote: 'Everything stays on this device. Nothing is ever sent anywhere.',
    credit: 'App development: SOYOGI - Care & Support Consultation',
    version: 'Version 1.10',

    introOk: 'Got it',
    intro: 'This room has a hidden feature.\nTap the name "{name}" at the top {n} times in a row\nto open the Memo Room and Settings.\nThis notice will never be shown again.'
  },

  de: {
    appName: "Teen Info Room",
    close: "× Schließen",
    langTitle: "Sprache / Language",
    tab: { hitoiki: "Atmen", onaji: "Daten", shitte: "Basiswissen", madoguchi: "Anlaufstellen" },
    breathIn: "Einatmen…",
    breathOut: "Ausatmen…",
    onelines: [
      "Langsames Atmen kann den Herzschlag beruhigen.",
      "Schon drei tiefe Atemzüge können etwas bewirken.",
      "Zeit, in der man nichts tut, gilt als notwendige Erholung für das Gehirn.",
      "Ausruhen und Faulenzen gelten als zwei verschiedene Dinge."
    ],
    onajiNote: "Die Zahlen beruhen auf Japans landesweiten Befragungen (2020-2021) und den genannten Quellen anderer Länder.",
    shitte: [
      { title: "Das Wort „Young Carer\"", body: "Kinder und Jugendliche, die regelmäßig Familienmitglieder versorgen oder den Haushalt führen, nennt man „Young Carers\". Zum Beispiel: keine Zeit für Hausaufgaben oder Hobbys wegen Pflege und Haushalt, Verabredungen oft absagen, nachts für ein Familienmitglied aufstehen. Wenn solche Tage andauern, ist genau das gemeint." },
      { title: "Über die Leistung", body: "Haushalt und die Versorgung eines Familienmitglieds sind harte Arbeit, selbst für Erwachsene. Fachleute beschreiben Jugendliche, die das leisten, als bemerkenswert. Bekannt ist auch: Die Betroffenen selbst halten es oft für „nichts Besonderes\"." },
      { title: "Wie man über die Ursache denken kann", body: "Pflege- und Familienprobleme entstehen, wenn vieles zusammenkommt: Krankheit, Geld, fehlende Hände. Fachleute sagen, dass niemand allein dafür verantwortlich gemacht werden kann. Es gibt keinen Grund, nach einem Schuldigen zu suchen." },
      { title: "Wie Anlaufstellen funktionieren", body: "Manche Anlaufstellen fragen nicht nach dem Namen. Was gesagt wird und wie viel, entscheidet die Person selbst. Manche Stellen hören auch einfach nur zu." },
      { title: "Beides kann zählen", body: "Sich um die Familie zu sorgen und sich um die eigene Zeit und Zukunft zu kümmern, kann zusammengehen. Das ist der Grundgedanke der Jugendhilfe, und entsprechende Angebote wachsen langsam." },
      { title: "Über das Um-Hilfe-Bitten", body: "Sich auf Erwachsene oder Hilfsangebote zu stützen ist kein Schummeln und kein Verrat an der Familie. Es gilt als ein Weg, die junge Person und die Familie zugleich zu schützen." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "Wenn ein Familienmitglied eine Behinderung hat",
      "srcLabel": "Quelle: ",
      "srcLang": "(auf Japanisch)",
      "copied": "Kopiert",
      "copyFail": "Konnte nicht kopiert werden",
      "why": {
        "title": "Warum ist das so? (mögliche Gründe)",
        "cards": [
          {
            "title": "Geräusche und Berührungen",
            "body": "Für manche Menschen mit Behinderung sind Geräusche, die andere kaum stören, oder Berührungen an bestimmten Körperstellen sehr schwer auszuhalten. Öffentliche Stellen in Japan erklären, dass man sich daran nicht allein durch Zusammenreißen oder Anstrengung gewöhnen kann."
          },
          {
            "title": "Wenn sich Pläne ändern, kann starke Angst aufkommen",
            "body": "Bei manchen Menschen steigt die Angst schlagartig an, wenn unklar ist, was als Nächstes passiert. Öffentliche Stellen in Japan erklären, dass auch das Festhalten an gewohnten Abläufen oft dann vorkommt, wenn die Angst groß ist."
          },
          {
            "title": "Manchmal spricht das Verhalten anstelle von Worten",
            "body": "Öffentliche Stellen in Japan erklären: Wenn es schwerfällt, etwas in Worte zu fassen, versucht eine Person manchmal, ihre Gefühle auf ihre eigene Art durch Verhalten zu zeigen. Auch hinter Verhalten wie lautem Rufen kann etwas stecken, das die Person mitteilen möchte."
          },
          {
            "title": "„Alles klar\" heißt nicht immer, dass etwas verstanden wurde",
            "body": "Öffentliche Stellen in Japan erklären, dass eine Person manchmal mit „Ja\" oder „Alles klar\" antwortet, ohne es wirklich verstanden zu haben. Wenn etwas gesagt wurde und trotzdem nicht angekommen ist, kann auch das der Grund sein."
          },
          {
            "title": "Für die Person selbst fühlt es sich real an",
            "body": "Öffentliche Stellen in Japan erklären, dass sich Halluzinationen und Wahnvorstellungen für die betroffene Person so anfühlen, als wären sie Wirklichkeit. Auch Worte und Verhalten, die von außen schwer zu verstehen sind, haben für diese Person ihre eigenen Gründe."
          }
        ]
      },
      "talk": {
        "title": "Beispielsätze für Gespräche",
        "hint": "Einen Satz antippen, um ihn zu kopieren.",
        "cards": [
          {
            "title": "Mit Freunden sprechen",
            "lines": [
              "Wegen Sachen zu Hause muss ich an manchen Tagen nach der Schule direkt heim.",
              "Manchmal muss ich kurzfristig absagen, aber nicht, weil ich keine Lust hab.",
              "Ich kann nicht genau erzählen, was los ist, aber zu Hause ist es gerade ein bisschen schwierig.",
              "Es hilft mir schon, wenn du einfach zuhörst."
            ]
          },
          {
            "title": "Mit Lehrkräften sprechen",
            "lines": [
              "Aus familiären Gründen schaffe ich die Hausaufgaben an manchen Tagen nicht rechtzeitig.",
              "Wegen der Situation zu Hause kann ich in manchen Nächten nicht gut schlafen.",
              "Ich möchte noch nicht ins Detail gehen, aber ich wollte, dass Sie Bescheid wissen.",
              "Können Sie mir sagen, an wen ich mich wenden kann, wenn ich nicht weiterweiß?"
            ],
            "note": "Öffentliche Stellen in Japan erklären: Wenn man sich an die Schule wendet, kann sie manchmal den Kontakt zur nötigen Unterstützung herstellen, zum Beispiel über die Schulsozialarbeit."
          }
        ]
      },
      "things": {
        "title": "Ideen fürs Lernen und für eigene Sachen",
        "cards": [
          {
            "title": "Ein Ort zum Lernen",
            "body": "Wenn es zu Hause schwerfällt, sich zu konzentrieren, ist Lernen außer Haus auch eine Möglichkeit, zum Beispiel in der Schulbibliothek, in einer öffentlichen Bibliothek oder in einem Lernraum. Manche nutzen Ohrstöpsel oder einen Gehörschutz, um die Geräusche um sich herum leiser zu machen."
          },
          {
            "title": "Ein Ort für wichtige Dinge",
            "body": "Wichtige Dinge und alles, was nicht kaputtgehen soll, kann man an einem schwer erreichbaren Ort oder in einer Kiste mit Deckel oder Schloss aufbewahren."
          },
          {
            "title": "Unterstützung für die Familie schließt auch Geschwister ein",
            "body": "In Japan heißt es in öffentlichen Leitlinien, dass die „Familienunterstützung\" rund um ein Familienmitglied mit Behinderung auch Geschwister und Großeltern einschließt. Manche Kommunen haben Gesprächsangebote, bei denen Menschen zuhören, die selbst als Geschwister eines Menschen mit Behinderung aufgewachsen sind (Peer-Support)."
          }
        ]
      },
      "src": {
        "nise1": "Nationales Institut für sonderpädagogische Förderung (Japan), „Unterstützung bei sensorischer Überempfindlichkeit\"",
        "rehab1": "Nationales Rehabilitationszentrum für Menschen mit Behinderungen (Japan), Informationen für Ärztinnen und Ärzte sowie kommunale Fachkräfte, die Familien beraten",
        "mext14": "Ministerium für Bildung, Kultur, Sport, Wissenschaft und Technologie (Japan), Leitfaden für den Unterricht, März 2023 (Abschnitt zu Autismus)",
        "nise2": "Nationales Institut für sonderpädagogische Förderung (Japan), „Unterstützung bei starkem Festhalten an Routinen\"",
        "tokyoKyoiku": "Bildungsbehörde der Präfektur Tokio (Japan), Leitfaden zum Unterricht für Schülerinnen und Schüler mit stark herausforderndem Verhalten, Februar 2024",
        "mext9": "Ministerium für Bildung, Kultur, Sport, Wissenschaft und Technologie (Japan), Leitfaden für den Unterricht, März 2023 (Abschnitt zu geistiger Behinderung)",
        "ncnp": "Nationales Zentrum für Neurologie und Psychiatrie (Japan), Informationsseite zur psychischen Gesundheit, „Schizophrenie\"",
        "hokkaido": "Bildungsbehörde von Hokkaido (Japan), „Über Young Carers\"",
        "cfa": "Behörde für Kinder und Familien (Japan), Leitlinien für Tagesangebote nach der Schule, Juli 2024",
        "nerima": "Bezirk Nerima, Tokio (Japan), Unterstützungsprogramm für Geschwister (Gespräche mit Peer-Supportern)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Ob man mit jemandem spricht, entscheidet jede Person selbst. Diese Seite zeigt nur, dass es solche Orte gibt.",
    memoRoomTitle: "Das Memozimmer",
    memoSave: "Leise verwahren",
    memoSaved: "Leise verwahrt ✓",
    memoEmpty: "Noch nichts hier.",
    close2: "Schließen",
    deleteConfirm: "Löschen?",
    settings: "Einstellungen",
    setExitLabel: "Seite, die „× Schließen\" öffnet",
    setExitNote: "Bleibt dies leer, öffnet sich Google.",
    save: "Speichern",
    savedPref: "Gespeichert",
    askUnsaved: "Schließen, ohne zu speichern?",
    askYes: "Ja",
    askNo: "Nein",
    setTapsLabel: "Tipps zum Öffnen des Memozimmers",
    tapUnit: "",
    setTapsNote: "Den Namen oben so oft hintereinander antippen, dann öffnet sich das Memozimmer.",
    music: "Musik",
    musicOn: "An",
    musicOff: "Aus",
    looksOpen: "Anzeige (Farben & Schrift)",
    looksTitle: "Anzeige-Einstellungen",
    looksColor: "Farben des Bildschirms",
    themeNight: "Nacht",
    themeLight: "Weiß",
    themeCream: "Creme",
    themeBlack: "Schwarz (starker Kontrast)",
    looksText: "Schriftgröße",
    fsNormal: "Normal",
    fsLarge: "Groß",
    fsXL: "Sehr groß",
    privacyNote: "Alles bleibt auf diesem Gerät. Nichts wird jemals irgendwohin gesendet.",
    credit: "App-Entwicklung: SOYOGI - Beratungsstelle für Pflege und Unterstützung",
    version: "Version 1.10",
    introOk: "Verstanden",
    intro: "Dieses Zimmer hat eine verborgene Funktion.\nOben den Namen „{name}\" {n} Mal hintereinander antippen,\ndann öffnen sich Memozimmer und Einstellungen.\nDieser Hinweis wird nie wieder angezeigt."
  },

  fr: {
    appName: "Teen Info Room",
    close: "× Fermer",
    langTitle: "Langue / Language",
    tab: { hitoiki: "Respirer", onaji: "Données", shitte: "Repères", madoguchi: "Contacts" },
    breathIn: "Inspire…",
    breathOut: "Expire…",
    onelines: [
      "Une respiration lente aide le cœur à se calmer.",
      "Même trois grandes respirations peuvent faire une différence.",
      "Le temps passé à ne rien faire est considéré comme un repos nécessaire pour le cerveau.",
      "Se reposer et paresser sont considérés comme deux choses différentes."
    ],
    onajiNote: "Les chiffres reposent sur les enquêtes nationales du Japon (2020-2021) et sur les sources citées pour les autres pays.",
    shitte: [
      { title: "Les mots « jeune aidant »", body: "On appelle « jeunes aidants » les enfants et adolescents qui s'occupent régulièrement d'un proche ou tiennent la maison. Par exemple : pas de temps pour les devoirs ou les loisirs à cause des soins et des tâches, des sorties souvent refusées, des réveils la nuit pour un proche. Quand ces journées se répètent, c'est de cela qu'il s'agit." },
      { title: "Sur l'effort fourni", body: "Tenir une maison et s'occuper d'un proche est un travail dur, même pour un adulte. Les professionnels de l'aide décrivent les adolescents qui le font comme accomplissant quelque chose de remarquable. On sait aussi que les intéressés eux-mêmes ont tendance à trouver cela « normal »." },
      { title: "Comment penser la cause", body: "Les difficultés de soin et de famille arrivent quand beaucoup de choses s'accumulent : la maladie, l'argent, le manque de bras. Les professionnels disent que ce n'est la faute de personne en particulier. Il n'y a pas besoin de chercher un coupable." },
      { title: "Comment fonctionnent les lignes d'écoute", body: "Certaines lignes ne demandent pas de nom. Ce qui est dit, et jusqu'où, c'est la personne qui appelle qui en décide. Certaines lignes se contentent d'écouter." },
      { title: "Les deux peuvent compter", body: "Tenir à sa famille et tenir à son propre temps et à son avenir peuvent aller ensemble. C'est l'idée de base de l'aide à la jeunesse, et les services pour cela grandissent peu à peu." },
      { title: "Sur le fait de demander de l'aide", body: "S'appuyer sur des adultes ou sur des services d'aide, ce n'est ni tricher, ni trahir sa famille. C'est considéré comme un moyen de protéger à la fois le jeune et sa famille." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "Quand un membre de la famille a un handicap",
      "srcLabel": "Source : ",
      "srcLang": "(en japonais)",
      "copied": "Copié",
      "copyFail": "Impossible de copier",
      "why": {
        "title": "Pourquoi cela arrive-t-il ? (raisons possibles)",
        "cards": [
          {
            "title": "Les sons et le fait d'être touché",
            "body": "Certaines personnes en situation de handicap supportent très mal des sons que d'autres remarquent à peine, ou le fait d'être touchées sur certaines parties du corps. Au Japon, des documents publics expliquent qu'on ne s'y habitue pas simplement à force de patience ou d'efforts."
          },
          {
            "title": "Un changement de programme peut faire monter l'anxiété",
            "body": "Chez certaines personnes, ne pas savoir ce qui va se passer ensuite fait monter l'anxiété très vite. Au Japon, des documents publics expliquent que le fait de tenir absolument à faire les choses de la même façon que d'habitude a aussi tendance à apparaître quand l'anxiété est forte."
          },
          {
            "title": "Parfois, le comportement parle à la place des mots",
            "body": "Au Japon, des documents publics expliquent que, lorsqu'elle n'arrive pas à bien s'exprimer avec des mots, une personne peut chercher à faire passer ce qu'elle ressent par sa propre façon d'agir. Même derrière un comportement comme parler très fort, il peut y avoir quelque chose que la personne cherche à dire."
          },
          {
            "title": "« D'accord » ne veut pas toujours dire « compris »",
            "body": "Au Japon, des documents publics expliquent qu'une personne peut répondre « oui » ou « d'accord » sans avoir vraiment compris. Quand quelque chose a été dit mais que le message n'est pas passé, cela peut aussi venir de là."
          },
          {
            "title": "Pour la personne, cela paraît réel",
            "body": "Au Japon, des documents publics expliquent que la personne qui vit des hallucinations ou des idées délirantes les ressent exactement comme la réalité. Même des paroles ou des comportements difficiles à comprendre de l'extérieur ont leurs raisons pour cette personne."
          }
        ]
      },
      "talk": {
        "title": "Exemples de phrases pour en parler",
        "hint": "Toucher une phrase permet de la copier.",
        "cards": [
          {
            "title": "À un ami ou une amie",
            "lines": [
              "Il y a des jours où je dois rentrer tout de suite après les cours, à cause de trucs à la maison.",
              "Parfois je dois annuler au dernier moment, mais c'est pas que j'ai pas envie de venir.",
              "Je peux pas trop entrer dans les détails, mais en ce moment c'est un peu dur à la maison.",
              "Rien que le fait que tu m'écoutes, ça m'aide vraiment."
            ]
          },
          {
            "title": "À un professeur",
            "lines": [
              "Pour des raisons familiales, il y a des jours où je n'arrive pas à finir mes devoirs à temps.",
              "À cause de la situation à la maison, il y a des nuits où je dors mal.",
              "Je n'ai pas encore envie d'en parler en détail, mais je voulais que vous soyez au courant.",
              "Est-ce que vous pourriez me dire à qui je peux parler quand je suis en difficulté ?"
            ],
            "note": "Au Japon, des documents publics expliquent que l'école, une fois informée de la situation, peut parfois orienter l'élève vers l'aide nécessaire, par exemple par l'intermédiaire d'un assistant social scolaire."
          }
        ]
      },
      "things": {
        "title": "Étudier et protéger ses affaires",
        "cards": [
          {
            "title": "Un endroit pour étudier",
            "body": "Quand il est difficile de se concentrer à la maison, il est aussi possible d'étudier ailleurs : à la bibliothèque de l'école, dans une bibliothèque publique ou dans une salle d'étude. Certaines personnes utilisent des bouchons d'oreilles ou un casque antibruit pour atténuer les bruits autour d'elles."
          },
          {
            "title": "Où ranger les objets importants",
            "body": "Les objets importants, ou ceux que l'on ne veut pas voir abîmés, peuvent être rangés dans un endroit difficile à atteindre, ou dans une boîte qui se ferme avec un couvercle ou à clé."
          },
          {
            "title": "Le soutien aux familles concerne aussi les frères et sœurs",
            "body": "Au Japon, des lignes directrices officielles indiquent que, dans l'accompagnement d'un membre de la famille en situation de handicap, les frères et sœurs et les grands-parents sont aussi concernés par le « soutien aux familles ». Certaines collectivités locales proposent des lieux où des personnes qui ont elles-mêmes grandi avec un frère ou une sœur en situation de handicap sont à l'écoute (soutien par les pairs)."
          }
        ]
      },
      "src": {
        "nise1": "Institut national de l'éducation spécialisée (Japon), « Soutien face à l'hypersensibilité sensorielle »",
        "rehab1": "Centre national de réadaptation pour les personnes handicapées (Japon), informations pour les médecins et les responsables locaux qui conseillent les familles",
        "mext14": "Ministère de l'Éducation, de la Culture, des Sports, des Sciences et de la Technologie (Japon), guide pédagogique, mars 2023 (partie sur l'autisme)",
        "nise2": "Institut national de l'éducation spécialisée (Japon), « Soutien face à l'attachement aux routines »",
        "tokyoKyoiku": "Conseil de l'éducation de la métropole de Tokyo, guide sur l'accompagnement des élèves présentant des troubles sévères du comportement, février 2024",
        "mext9": "Ministère de l'Éducation, de la Culture, des Sports, des Sciences et de la Technologie (Japon), guide pédagogique, mars 2023 (partie sur la déficience intellectuelle)",
        "ncnp": "Centre national de neurologie et de psychiatrie (Japon), site d'information sur la santé mentale, « Schizophrénie »",
        "hokkaido": "Conseil de l'éducation de Hokkaido (Japon), « À propos des jeunes aidants »",
        "cfa": "Agence de l'enfance et des familles (Japon), lignes directrices pour les services d'accueil de jour après l'école, juillet 2024",
        "nerima": "Arrondissement de Nerima, Tokyo, programme de soutien aux frères et sœurs (échanges avec des pairs aidants)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Parler ou non à quelqu'un, chacun en décide. Cette page indique simplement que ces endroits existent.",
    memoRoomTitle: "La pièce aux mémos",
    memoSave: "Ranger doucement",
    memoSaved: "Rangé doucement ✓",
    memoEmpty: "Rien ici pour l'instant.",
    close2: "Fermer",
    deleteConfirm: "Effacer ?",
    settings: "Réglages",
    setExitLabel: "Page ouverte par « × Fermer »",
    setExitNote: "Si ce champ est vide, Google s'ouvre.",
    save: "Enregistrer",
    savedPref: "Enregistré",
    askUnsaved: "Fermer sans enregistrer ?",
    askYes: "Oui",
    askNo: "Non",
    setTapsLabel: "Nombre de touches pour ouvrir la pièce aux mémos",
    tapUnit: "",
    setTapsNote: "Toucher le nom en haut de l'écran ce nombre de fois d'affilée ouvre la pièce aux mémos.",
    music: "Musique",
    musicOn: "Activée",
    musicOff: "Coupée",
    looksOpen: "Affichage (couleurs et texte)",
    looksTitle: "Réglages d’affichage",
    looksColor: "Couleurs de l’écran",
    themeNight: "Nuit",
    themeLight: "Blanc",
    themeCream: "Crème",
    themeBlack: "Noir (contraste élevé)",
    looksText: "Taille du texte",
    fsNormal: "Normale",
    fsLarge: "Grande",
    fsXL: "Très grande",
    privacyNote: "Tout reste sur cet appareil. Rien n'est jamais envoyé nulle part.",
    credit: "Développement de l'application : SOYOGI - Lieu de conseil en soins et soutien",
    version: "Version 1.10",
    introOk: "Compris",
    intro: "Cette pièce a une fonction cachée.\nToucher le nom « {name} » en haut {n} fois d'affilée\nouvre la pièce aux mémos et les réglages.\nCe message ne s'affichera plus jamais."
  },

  es: {
    appName: "Teen Info Room",
    close: "× Cerrar",
    langTitle: "Idioma / Language",
    tab: { hitoiki: "Respirar", onaji: "Datos", shitte: "Claves", madoguchi: "Contactos" },
    breathIn: "Inhala…",
    breathOut: "Exhala…",
    onelines: [
      "Respirar despacio ayuda a calmar el ritmo del corazón.",
      "Incluso tres respiraciones profundas pueden marcar una diferencia.",
      "El tiempo sin hacer nada se considera un descanso necesario para el cerebro.",
      "Descansar y holgazanear se consideran cosas distintas."
    ],
    onajiNote: "Las cifras se basan en las encuestas nacionales de Japón (2020-2021) y en las fuentes citadas para otros países.",
    shitte: [
      { title: "Las palabras \"joven cuidador\"", body: "A los niños y adolescentes que cuidan con regularidad de un familiar o llevan la casa se les llama \"jóvenes cuidadores\". Por ejemplo: sin tiempo para deberes o aficiones por los cuidados y las tareas, rechazar a menudo los planes con amigos, levantarse de noche por un familiar. Cuando esos días se repiten, a eso se refiere el término." },
      { title: "Sobre el esfuerzo", body: "Llevar una casa y cuidar de un familiar es un trabajo duro, incluso para una persona adulta. Los profesionales del apoyo describen a los adolescentes que lo hacen como personas que logran algo notable. También se sabe que ellos mismos tienden a sentir que \"no es nada especial\"." },
      { title: "Cómo pensar en la causa", body: "Los problemas de cuidados y de familia surgen cuando se acumulan muchas cosas: enfermedad, dinero, falta de manos. Los profesionales dicen que no es culpa de una sola persona. No hace falta buscar a quién culpar." },
      { title: "Cómo funcionan las líneas de ayuda", body: "Algunas líneas no piden el nombre. Qué contar, y hasta dónde, lo decide quien llama. Algunas líneas simplemente escuchan." },
      { title: "Las dos cosas pueden importar", body: "Querer a la familia y cuidar del propio tiempo y del propio futuro pueden ir juntos. Esa es la idea básica del apoyo a la juventud, y los servicios para ello crecen poco a poco." },
      { title: "Sobre pedir ayuda", body: "Apoyarse en personas adultas o en servicios de ayuda no es hacer trampa ni traicionar a la familia. Se considera una forma de proteger a la vez al joven y a su familia." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "Cuando un familiar tiene una discapacidad",
      "srcLabel": "Fuente: ",
      "srcLang": "(en japonés)",
      "copied": "Copiado",
      "copyFail": "No se pudo copiar",
      "why": {
        "title": "¿Por qué pasa esto? (posibles razones)",
        "cards": [
          {
            "title": "Los sonidos y el contacto físico",
            "body": "A algunas personas con discapacidad les resulta muy difícil soportar ciertos sonidos que a otras personas no les molestan, o el contacto en ciertas partes del cuerpo. En materiales públicos de Japón se explica que no es algo a lo que alguien pueda acostumbrarse solo con paciencia o esfuerzo."
          },
          {
            "title": "Cuando cambian los planes, la ansiedad puede aumentar mucho",
            "body": "En algunas personas, no saber qué va a pasar hace que la ansiedad aumente de golpe. En materiales públicos de Japón se explica que la insistencia en hacer las cosas siempre de la misma manera también suele aparecer cuando la ansiedad es alta."
          },
          {
            "title": "A veces la persona se expresa con acciones en lugar de con palabras",
            "body": "En materiales públicos de Japón se explica que, cuando a una persona le cuesta expresarse con palabras, puede intentar mostrar lo que siente con su propia forma de actuar. Incluso detrás de conductas como alzar mucho la voz puede esconderse algo que la persona quiere transmitir."
          },
          {
            "title": "Decir \"entendido\" no siempre significa haber entendido",
            "body": "En materiales públicos de Japón se explica que una persona puede responder \"sí\" o \"entendido\" aunque no haya comprendido bien. Cuando se dijo algo pero el mensaje no llegó, esta puede ser la razón."
          },
          {
            "title": "Para la persona, se siente como algo real",
            "body": "En materiales públicos de Japón se explica que las alucinaciones y los delirios se sienten como si fueran reales para la persona que los vive. Incluso las palabras y acciones difíciles de entender desde fuera tienen, para esa persona, sus propias razones."
          }
        ]
      },
      "talk": {
        "title": "Ejemplos de qué decir",
        "hint": "Al tocar una frase, se copia.",
        "cards": [
          {
            "title": "A un amigo o amiga",
            "lines": [
              "Hay días en que tengo que irme a casa justo al salir de clase, por cosas de familia.",
              "A veces tengo que cancelar a última hora, pero no es porque no quiera ir.",
              "No puedo contarte mucho, pero ahora mismo las cosas en casa están un poco complicadas.",
              "Solo con que me escuches, ya me ayudas un montón."
            ]
          },
          {
            "title": "A un profesor o profesora",
            "lines": [
              "Por motivos familiares, hay días en que no puedo terminar los deberes a tiempo.",
              "Por la situación en casa, hay noches en que no puedo dormir bien.",
              "Todavía no quiero hablar de los detalles, pero quería que lo supiera.",
              "¿Me podría decir con quién puedo hablar cuando lo esté pasando mal?"
            ],
            "note": "En materiales públicos de Japón se explica que, cuando se habla con el centro escolar sobre la situación, este puede ayudar a conectar al estudiante con el apoyo que necesita, por ejemplo a través de un trabajador social escolar."
          }
        ]
      },
      "things": {
        "title": "Ideas para estudiar y guardar las cosas",
        "cards": [
          {
            "title": "Un lugar para estudiar",
            "body": "Cuando cuesta concentrarse en casa, también existe la opción de estudiar fuera: en la biblioteca del centro escolar, en una biblioteca pública o en una sala de estudio. Algunas personas usan tapones para los oídos u orejeras antirruido para reducir el ruido de alrededor."
          },
          {
            "title": "Un lugar para las cosas importantes",
            "body": "Las cosas importantes, o las que no deben romperse, se pueden guardar en un lugar difícil de alcanzar, o en una caja con tapa o con cerradura."
          },
          {
            "title": "El apoyo a la familia también incluye a hermanos y hermanas",
            "body": "En Japón, las directrices públicas indican que el \"apoyo a la familia\" de una persona con discapacidad también incluye a hermanos, hermanas, abuelos y abuelas. Algunos gobiernos locales ofrecen espacios donde personas que crecieron como hermanos o hermanas de alguien con discapacidad escuchan y conversan (apoyo entre pares)."
          }
        ]
      },
      "src": {
        "nise1": "Instituto Nacional de Educación para Necesidades Especiales (Japón), \"Apoyo ante la hipersensibilidad sensorial\"",
        "rehab1": "Centro Nacional de Rehabilitación para Personas con Discapacidad (Japón), información para médicos y personal municipal que asesora a las familias",
        "mext14": "Ministerio de Educación, Cultura, Deportes, Ciencia y Tecnología (Japón), guía didáctica, marzo de 2023 (apartado sobre el autismo)",
        "nise2": "Instituto Nacional de Educación para Necesidades Especiales (Japón), \"Apoyo ante la insistencia en que todo sea igual\"",
        "tokyoKyoiku": "Junta de Educación del Gobierno Metropolitano de Tokio (Japón), guía sobre la enseñanza a estudiantes con conductas desafiantes graves, febrero de 2024",
        "mext9": "Ministerio de Educación, Cultura, Deportes, Ciencia y Tecnología (Japón), guía didáctica, marzo de 2023 (apartado sobre la discapacidad intelectual)",
        "ncnp": "Centro Nacional de Neurología y Psiquiatría (Japón), sitio de información sobre salud mental, \"Esquizofrenia\"",
        "hokkaido": "Junta de Educación de Hokkaido (Japón), \"Sobre los jóvenes cuidadores\"",
        "cfa": "Agencia de la Infancia y la Familia (Japón), directrices para los servicios de día después del horario escolar, julio de 2024",
        "nerima": "Distrito de Nerima, Tokio, programa de apoyo a hermanos y hermanas (conversaciones con personas que dan apoyo entre pares)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Hablar o no con alguien es decisión de cada persona. Esta página solo muestra que estos lugares existen.",
    memoRoomTitle: "El cuarto de las notas",
    memoSave: "Guardar en silencio",
    memoSaved: "Guardado en silencio ✓",
    memoEmpty: "Aún no hay nada.",
    close2: "Cerrar",
    deleteConfirm: "¿Borrar?",
    settings: "Ajustes",
    setExitLabel: "Página que abre \"× Cerrar\"",
    setExitNote: "Si se deja vacío, se abre Google.",
    save: "Guardar",
    savedPref: "Guardado",
    askUnsaved: "¿Cerrar sin guardar?",
    askYes: "Sí",
    askNo: "No",
    setTapsLabel: "Toques para abrir el cuarto de las notas",
    tapUnit: "",
    setTapsNote: "Tocar el nombre de arriba este número de veces seguidas abre el cuarto de las notas.",
    music: "Música",
    musicOn: "Con música",
    musicOff: "Sin música",
    looksOpen: "Pantalla (colores y texto)",
    looksTitle: "Ajustes de pantalla",
    looksColor: "Colores de la pantalla",
    themeNight: "Noche",
    themeLight: "Blanco",
    themeCream: "Crema",
    themeBlack: "Negro (contraste alto)",
    looksText: "Tamaño del texto",
    fsNormal: "Normal",
    fsLarge: "Grande",
    fsXL: "Muy grande",
    privacyNote: "Todo se queda en este dispositivo. Nunca se envía nada a ninguna parte.",
    credit: "Desarrollo de la aplicación: SOYOGI - Centro de consultas de cuidados y apoyo",
    version: "Versión 1.10",
    introOk: "Entendido",
    intro: "Este cuarto tiene una función oculta.\nTocar el nombre \"{name}\" de arriba {n} veces seguidas\nabre el cuarto de las notas y los ajustes.\nEste aviso no volverá a mostrarse nunca."
  },

  it: {
    appName: "Teen Info Room",
    close: "× Chiudi",
    langTitle: "Lingua / Language",
    tab: { hitoiki: "Respira", onaji: "Dati", shitte: "Basi", madoguchi: "Contatti" },
    breathIn: "Inspira…",
    breathOut: "Espira…",
    onelines: [
      "Respirare lentamente aiuta a calmare il battito del cuore.",
      "Anche tre respiri profondi possono fare la differenza.",
      "Il tempo passato senza fare nulla è considerato un riposo necessario per il cervello.",
      "Riposare e oziare sono considerate due cose diverse."
    ],
    onajiNote: "I numeri si basano sulle indagini nazionali del Giappone (2020-2021) e sulle fonti citate per gli altri paesi.",
    shitte: [
      { title: "Le parole \"giovane caregiver\"", body: "I bambini e i ragazzi che si prendono cura regolarmente di un familiare o mandano avanti la casa vengono chiamati \"giovani caregiver\". Per esempio: niente tempo per compiti o passioni a causa di cura e faccende, inviti degli amici rifiutati spesso, alzarsi di notte per un familiare. Quando giornate così continuano, è questo che si intende." },
      { title: "Sull'impegno", body: "Mandare avanti una casa e prendersi cura di un familiare è un lavoro duro, anche per un adulto. Chi lavora nel sostegno descrive i ragazzi che lo fanno come persone che compiono qualcosa di notevole. Si sa anche che proprio loro tendono a sentirlo come \"niente di speciale\"." },
      { title: "Come pensare alla causa", body: "I problemi di cura e di famiglia nascono quando tante cose si accumulano: malattia, soldi, mani che mancano. Chi lavora nel sostegno dice che non è colpa di una sola persona. Non serve cercare un colpevole." },
      { title: "Come funzionano le linee di ascolto", body: "Alcune linee non chiedono il nome. Cosa dire, e quanto, lo decide chi chiama. Alcune linee semplicemente ascoltano." },
      { title: "Possono contare entrambe", body: "Tenere alla famiglia e tenere al proprio tempo e al proprio futuro possono andare insieme. È l'idea di base del sostegno ai giovani, e i servizi per questo crescono poco a poco." },
      { title: "Sul chiedere aiuto", body: "Appoggiarsi agli adulti o ai servizi di aiuto non è barare, né tradire la famiglia. È considerato un modo per proteggere insieme il ragazzo e la famiglia." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "Quando un familiare ha una disabilità",
      "srcLabel": "Fonte: ",
      "srcLang": "(in giapponese)",
      "copied": "Copiato",
      "copyFail": "Impossibile copiare",
      "why": {
        "title": "Perché succede? (alcuni possibili motivi)",
        "cards": [
          {
            "title": "I suoni e la sensazione di essere toccati",
            "body": "Alcune persone con disabilità trovano molto difficile sopportare certi suoni, o essere toccate in alcune parti del corpo, anche quando gli altri quasi non ci fanno caso. Documenti pubblici giapponesi spiegano che non è qualcosa a cui una persona possa abituarsi solo con la pazienza o l'impegno."
          },
          {
            "title": "Quando i programmi cambiano, l'ansia può diventare forte",
            "body": "Per alcune persone, non sapere cosa succederà dopo fa salire l'ansia molto in fretta. Documenti pubblici giapponesi spiegano che anche il bisogno di fare le cose sempre allo stesso modo tende a manifestarsi quando l'ansia è forte."
          },
          {
            "title": "A volte le azioni parlano al posto delle parole",
            "body": "Documenti pubblici giapponesi spiegano che, quando è difficile esprimersi a parole, una persona può cercare di comunicare ciò che prova a modo suo, attraverso le azioni. Anche dietro comportamenti come alzare molto la voce può nascondersi qualcosa che la persona vuole dire."
          },
          {
            "title": "\"Ho capito\" non sempre vuol dire aver capito",
            "body": "Documenti pubblici giapponesi spiegano che una persona può rispondere \"sì\" o \"ho capito\" anche senza aver capito davvero. Quando una cosa è stata detta ma non è arrivata, il motivo può essere questo."
          },
          {
            "title": "Per la persona, sembra reale",
            "body": "Documenti pubblici giapponesi spiegano che allucinazioni e deliri sembrano del tutto reali a chi li vive. Anche parole e comportamenti difficili da capire dall'esterno hanno, per quella persona, le loro ragioni."
          }
        ]
      },
      "talk": {
        "title": "Esempi di cosa dire",
        "hint": "Toccare una frase per copiarla.",
        "cards": [
          {
            "title": "Con un amico o un'amica",
            "lines": [
              "Certi giorni devo tornare a casa subito dopo scuola, per cose di famiglia.",
              "A volte all'ultimo momento non riesco a venire, ma non è che non ne ho voglia.",
              "Non posso spiegarti tutto, ma in questo periodo a casa è un po' dura.",
              "Anche solo il fatto che mi ascolti mi aiuta un sacco."
            ]
          },
          {
            "title": "Con un insegnante",
            "lines": [
              "Per motivi familiari, ci sono giorni in cui non riesco a finire i compiti in tempo.",
              "Per questioni di casa, ci sono notti in cui non riesco a dormire bene.",
              "Per ora preferirei non entrare nei dettagli, ma volevo che lo sapesse.",
              "Mi potrebbe dire a chi posso rivolgermi quando sono in difficoltà?"
            ],
            "note": "Documenti pubblici giapponesi spiegano che, quando la scuola viene a conoscenza della situazione, a volte può aiutare lo studente a ricevere il sostegno di cui ha bisogno, per esempio tramite un assistente sociale scolastico."
          }
        ]
      },
      "things": {
        "title": "Studio e oggetti personali",
        "cards": [
          {
            "title": "Un posto per studiare",
            "body": "Quando a casa è difficile concentrarsi, si può anche studiare altrove: nella biblioteca della scuola, in una biblioteca pubblica o in un'aula studio. Alcune persone usano tappi per le orecchie o cuffie antirumore per attenuare i rumori intorno."
          },
          {
            "title": "Un posto per le cose importanti",
            "body": "Le cose importanti, o quelle che si vogliono proteggere perché non si rompano, si possono tenere in un posto difficile da raggiungere, oppure in una scatola con coperchio o con serratura."
          },
          {
            "title": "Il sostegno alla famiglia riguarda anche fratelli e sorelle",
            "body": "In Giappone, le linee guida pubbliche indicano che il \"sostegno alla famiglia\" quando un familiare ha una disabilità comprende anche fratelli, sorelle e nonni. Alcuni enti locali offrono spazi di ascolto e confronto con persone che sono cresciute con un fratello o una sorella con disabilità (supporto tra pari)."
          }
        ]
      },
      "src": {
        "nise1": "Istituto nazionale per l'educazione speciale (Giappone), \"Sostegno per l'ipersensibilità sensoriale\"",
        "rehab1": "Centro nazionale di riabilitazione per le persone con disabilità (Giappone), informazioni per medici e funzionari locali che danno consigli alle famiglie",
        "mext14": "Ministero dell'Istruzione, della Cultura, dello Sport, della Scienza e della Tecnologia (Giappone), guida didattica, marzo 2023 (sezione sull'autismo)",
        "nise2": "Istituto nazionale per l'educazione speciale (Giappone), \"Sostegno per il bisogno di fare le cose sempre allo stesso modo\"",
        "tokyoKyoiku": "Ufficio scolastico metropolitano di Tokyo, guida all'insegnamento per alunni con gravi difficoltà di comportamento, febbraio 2024",
        "mext9": "Ministero dell'Istruzione, della Cultura, dello Sport, della Scienza e della Tecnologia (Giappone), guida didattica, marzo 2023 (sezione sulla disabilità intellettiva)",
        "ncnp": "Centro nazionale di neurologia e psichiatria (Giappone), sito di informazione sulla salute mentale, \"Schizofrenia\"",
        "hokkaido": "Ufficio scolastico dell'Hokkaido (Giappone), \"Sui giovani caregiver\"",
        "cfa": "Agenzia per l'infanzia e la famiglia (Giappone), linee guida per i servizi diurni doposcuola, luglio 2024",
        "nerima": "Città di Nerima, Tokyo, programma di sostegno per fratelli e sorelle (colloqui di supporto tra pari)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Parlare o no con qualcuno è una scelta di ognuno. Questa pagina mostra soltanto che questi luoghi esistono.",
    memoRoomTitle: "La stanza degli appunti",
    memoSave: "Riporre in silenzio",
    memoSaved: "Riposto in silenzio ✓",
    memoEmpty: "Ancora niente qui.",
    close2: "Chiudi",
    deleteConfirm: "Eliminare?",
    settings: "Impostazioni",
    setExitLabel: "Pagina aperta da \"× Chiudi\"",
    setExitNote: "Se resta vuoto, si apre Google.",
    save: "Salva",
    savedPref: "Salvato",
    askUnsaved: "Chiudere senza salvare?",
    askYes: "Sì",
    askNo: "No",
    setTapsLabel: "Tocchi per aprire la stanza degli appunti",
    tapUnit: "",
    setTapsNote: "Toccare il nome in alto questo numero di volte di fila apre la stanza degli appunti.",
    music: "Musica",
    musicOn: "Sì",
    musicOff: "No",
    looksOpen: "Schermo (colori e testo)",
    looksTitle: "Impostazioni dello schermo",
    looksColor: "Colori dello schermo",
    themeNight: "Notte",
    themeLight: "Bianco",
    themeCream: "Crema",
    themeBlack: "Nero (contrasto alto)",
    looksText: "Dimensione del testo",
    fsNormal: "Normale",
    fsLarge: "Grande",
    fsXL: "Molto grande",
    privacyNote: "Tutto resta su questo dispositivo. Niente viene mai inviato da nessuna parte.",
    credit: "Sviluppo dell'app: SOYOGI - Sportello di consulenza per cura e sostegno",
    version: "Versione 1.10",
    introOk: "Capito",
    intro: "Questa stanza ha una funzione nascosta.\nToccare il nome \"{name}\" in alto {n} volte di fila\napre la stanza degli appunti e le impostazioni.\nQuesto avviso non verrà mai più mostrato."
  },

  pt: {
    appName: "Teen Info Room",
    close: "× Fechar",
    langTitle: "Idioma / Language",
    tab: { hitoiki: "Respirar", onaji: "Dados", shitte: "Noções", madoguchi: "Contatos" },
    breathIn: "Inspire…",
    breathOut: "Expire…",
    onelines: [
      "Respirar devagar ajuda a acalmar o ritmo do coração.",
      "Até três respirações profundas podem fazer diferença.",
      "O tempo sem fazer nada é considerado um descanso necessário para o cérebro.",
      "Descansar e vadiar são consideradas coisas diferentes."
    ],
    onajiNote: "Os números se baseiam nas pesquisas nacionais do Japão (2020-2021) e nas fontes citadas para os outros países.",
    shitte: [
      { title: "As palavras \"jovem cuidador\"", body: "Crianças e adolescentes que cuidam regularmente de um familiar ou tocam a casa são chamados de \"jovens cuidadores\". Por exemplo: sem tempo para dever de casa ou hobbies por causa dos cuidados e das tarefas, recusar muitas vezes os convites dos amigos, levantar de noite por um familiar. Quando dias assim continuam, é disso que o termo fala." },
      { title: "Sobre o esforço", body: "Tocar uma casa e cuidar de um familiar é trabalho pesado, até para adultos. Profissionais do apoio descrevem os adolescentes que fazem isso como pessoas que realizam algo notável. Também se sabe que eles mesmos tendem a achar que \"não é nada de mais\"." },
      { title: "Como pensar na causa", body: "Problemas de cuidado e de família surgem quando muitas coisas se acumulam: doença, dinheiro, falta de braços. Profissionais dizem que não é culpa de uma pessoa só. Não é preciso procurar um culpado." },
      { title: "Como funcionam as linhas de apoio", body: "Algumas linhas não pedem nome. O que contar, e até onde, é quem liga que decide. Algumas linhas simplesmente escutam." },
      { title: "As duas coisas podem importar", body: "Gostar da família e cuidar do próprio tempo e do próprio futuro podem andar juntos. Essa é a ideia básica do apoio à juventude, e os serviços para isso crescem aos poucos." },
      { title: "Sobre pedir ajuda", body: "Apoiar-se em adultos ou em serviços de ajuda não é trapaça, nem traição à família. É considerado um jeito de proteger o jovem e a família ao mesmo tempo." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "Quando alguém da família tem deficiência",
      "srcLabel": "Fonte: ",
      "srcLang": "(em japonês)",
      "copied": "Copiado",
      "copyFail": "Não foi possível copiar",
      "why": {
        "title": "Por que isso acontece? (possíveis motivos)",
        "cards": [
          {
            "title": "Sons e a sensação do toque",
            "body": "Algumas pessoas com deficiência acham muito difícil suportar sons que não incomodam as outras pessoas, ou ser tocadas em certas partes do corpo. Materiais públicos do Japão explicam que isso não é algo a que a pessoa se acostume só com paciência ou esforço."
          },
          {
            "title": "Uma mudança de planos pode trazer muita ansiedade",
            "body": "Para algumas pessoas, não saber o que vai acontecer em seguida faz a ansiedade subir muito rápido. Materiais públicos do Japão explicam que a insistência em fazer as coisas sempre do mesmo jeito também costuma aparecer quando a ansiedade está alta."
          },
          {
            "title": "Às vezes, as ações falam no lugar das palavras",
            "body": "Materiais públicos do Japão explicam que, quando as palavras não saem com facilidade, a pessoa pode tentar mostrar o que sente por meio de ações, do seu próprio jeito. Mesmo por trás de comportamentos como falar muito alto, pode haver algo que a pessoa está tentando dizer."
          },
          {
            "title": "Nem sempre \"entendi\" quer dizer que entendeu",
            "body": "Materiais públicos do Japão explicam que a pessoa pode responder \"sim\" ou \"entendi\" sem ter entendido de verdade. Quando algo foi dito, mas mesmo assim não foi compreendido, pode ser esse o caso."
          },
          {
            "title": "Para a própria pessoa, aquilo parece real",
            "body": "Materiais públicos do Japão explicam que alucinações e delírios parecem totalmente reais para a pessoa que passa por isso. Mesmo palavras e ações que, de fora, são difíceis de entender têm motivos próprios para essa pessoa."
          }
        ]
      },
      "talk": {
        "title": "Exemplos de como falar",
        "hint": "Ao tocar em uma frase, ela é copiada.",
        "cards": [
          {
            "title": "Para falar com amigos",
            "lines": [
              "Por causa de umas coisas lá de casa, tem dia que eu preciso ir embora logo depois da aula.",
              "Às vezes eu tenho que desmarcar em cima da hora, mas não é porque eu não quero ir, tá?",
              "Não dá pra contar os detalhes, mas as coisas em casa estão meio difíceis agora.",
              "Só de você me ouvir já ajuda muito."
            ]
          },
          {
            "title": "Para falar com professores",
            "lines": [
              "Por causa de uma situação na minha família, tem dias em que não consigo fazer o dever de casa a tempo.",
              "Por causa de algumas coisas em casa, tem noites em que não consigo dormir bem.",
              "Ainda não quero entrar em detalhes, mas achei importante avisar.",
              "Poderia me dizer com quem eu posso conversar quando estiver passando por dificuldades?"
            ],
            "note": "Materiais públicos do Japão explicam que, ao conversar com a escola, o estudante pode ser encaminhado ao apoio de que precisa, por exemplo por meio de um assistente social escolar."
          }
        ]
      },
      "things": {
        "title": "Ideias para estudar e guardar as coisas",
        "cards": [
          {
            "title": "Um lugar para estudar",
            "body": "Quando é difícil se concentrar em casa, estudar em outro lugar também é uma opção: a biblioteca da escola, uma biblioteca pública ou uma sala de estudos. Algumas pessoas usam tampões de ouvido ou abafadores de ruído para diminuir o barulho ao redor."
          },
          {
            "title": "Um lugar para as coisas importantes",
            "body": "Coisas importantes, ou que não podem correr o risco de quebrar, podem ser guardadas em um lugar difícil de alcançar, ou em uma caixa com tampa ou com chave."
          },
          {
            "title": "O apoio à família também é para os irmãos",
            "body": "No Japão, diretrizes públicas dizem que o \"apoio à família\" de uma pessoa com deficiência também inclui irmãos e avós. Alguns governos locais oferecem espaços onde pessoas que cresceram com um irmão ou irmã com deficiência escutam quem quer conversar (apoio entre pares)."
          }
        ]
      },
      "src": {
        "nise1": "Instituto Nacional de Educação Especial (Japão), \"Apoio diante da hipersensibilidade sensorial\"",
        "rehab1": "Centro Nacional de Reabilitação para Pessoas com Deficiência (Japão), informações para médicos e servidores municipais que orientam famílias",
        "mext14": "Ministério da Educação, Cultura, Esportes, Ciência e Tecnologia (Japão), guia pedagógico, março de 2023 (seção sobre autismo)",
        "nise2": "Instituto Nacional de Educação Especial (Japão), \"Apoio diante da insistência nas mesmas coisas\"",
        "tokyoKyoiku": "Conselho de Educação da Metrópole de Tóquio, guia para o ensino de alunos com comportamentos desafiadores graves, fevereiro de 2024",
        "mext9": "Ministério da Educação, Cultura, Esportes, Ciência e Tecnologia (Japão), guia pedagógico, março de 2023 (seção sobre deficiência intelectual)",
        "ncnp": "Centro Nacional de Neurologia e Psiquiatria (Japão), site de informações sobre saúde mental, \"Esquizofrenia\"",
        "hokkaido": "Conselho de Educação de Hokkaido (Japão), \"Sobre os jovens cuidadores\"",
        "cfa": "Agência da Criança e da Família (Japão), diretrizes para os serviços de contraturno escolar, julho de 2024",
        "nerima": "Distrito de Nerima, Tóquio, programa de apoio a irmãos (conversas de apoio entre pares)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Falar ou não com alguém é decisão de cada um. Esta página apenas mostra que esses lugares existem.",
    memoRoomTitle: "O quarto das notas",
    memoSave: "Guardar em silêncio",
    memoSaved: "Guardado em silêncio ✓",
    memoEmpty: "Nada aqui ainda.",
    close2: "Fechar",
    deleteConfirm: "Apagar?",
    settings: "Configurações",
    setExitLabel: "Página aberta por \"× Fechar\"",
    setExitNote: "Se ficar vazio, abre o Google.",
    save: "Salvar",
    savedPref: "Salvo",
    askUnsaved: "Fechar sem salvar?",
    askYes: "Sim",
    askNo: "Não",
    setTapsLabel: "Toques para abrir o quarto das notas",
    tapUnit: "",
    setTapsNote: "Tocar o nome lá em cima esse número de vezes seguidas abre o quarto das notas.",
    music: "Música",
    musicOn: "Ligada",
    musicOff: "Desligada",
    looksOpen: "Tela (cores e texto)",
    looksTitle: "Ajustes de tela",
    looksColor: "Cores da tela",
    themeNight: "Noite",
    themeLight: "Branco",
    themeCream: "Creme",
    themeBlack: "Preto (alto contraste)",
    looksText: "Tamanho do texto",
    fsNormal: "Normal",
    fsLarge: "Grande",
    fsXL: "Muito grande",
    privacyNote: "Tudo fica neste aparelho. Nada é enviado para lugar nenhum.",
    credit: "Desenvolvimento do app: SOYOGI - Centro de consultas de cuidado e apoio",
    version: "Versão 1.10",
    introOk: "Entendi",
    intro: "Este quarto tem uma função escondida.\nTocar o nome \"{name}\" lá em cima {n} vezes seguidas\nabre o quarto das notas e as configurações.\nEste aviso nunca mais será mostrado."
  },

  nl: {
    appName: "Teen Info Room",
    close: "× Sluiten",
    langTitle: "Taal / Language",
    tab: { hitoiki: "Ademen", onaji: "Cijfers", shitte: "Basis", madoguchi: "Contact" },
    breathIn: "Adem in…",
    breathOut: "Adem uit…",
    onelines: [
      "Langzaam ademen helpt het hart tot rust te komen.",
      "Zelfs drie keer diep ademhalen kan al verschil maken.",
      "Tijd waarin je niets doet, geldt als noodzakelijke rust voor de hersenen.",
      "Uitrusten en luieren worden als twee verschillende dingen gezien."
    ],
    onajiNote: "De cijfers zijn gebaseerd op de landelijke onderzoeken van Japan (2020-2021) en op de genoemde bronnen voor andere landen.",
    shitte: [
      { title: "De woorden \"jonge mantelzorger\"", body: "Kinderen en jongeren die regelmatig voor een familielid zorgen of het huishouden draaiende houden, worden \"jonge mantelzorgers\" genoemd. Bijvoorbeeld: geen tijd voor huiswerk of hobby's door zorg en taken, afspraken met vrienden vaak afzeggen, 's nachts opstaan voor een familielid. Als zulke dagen aanhouden, is dat wat de term betekent." },
      { title: "Over de inzet", body: "Een huishouden draaien en voor een familielid zorgen is zwaar werk, zelfs voor volwassenen. Hulpverleners beschrijven jongeren die dit doen als mensen die iets bijzonders presteren. Ook is bekend dat juist zij zelf vaak vinden dat het \"niets bijzonders\" is." },
      { title: "Hoe je over de oorzaak kunt denken", body: "Zorg- en gezinsproblemen ontstaan als veel dingen samenkomen: ziekte, geld, te weinig handen. Hulpverleners zeggen dat niemand daar alleen de schuld van draagt. Er hoeft geen schuldige gezocht te worden." },
      { title: "Hoe hulplijnen werken", body: "Sommige hulplijnen vragen niet naar een naam. Wat er wordt verteld, en hoeveel, bepaalt de beller zelf. Sommige lijnen luisteren alleen maar." },
      { title: "Allebei mogen tellen", body: "Om je gezin geven en om je eigen tijd en toekomst geven, kan samengaan. Dat is de basisgedachte van jeugdhulp, en de voorzieningen daarvoor groeien langzaam." },
      { title: "Over hulp vragen", body: "Steunen op volwassenen of op hulpdiensten is geen valsspelen en geen verraad aan het gezin. Het geldt als een manier om de jongere én het gezin te beschermen." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "Als een familielid een beperking heeft",
      "srcLabel": "Bron: ",
      "srcLang": "(in het Japans)",
      "copied": "Gekopieerd",
      "copyFail": "Kopiëren is niet gelukt",
      "why": {
        "title": "Hoe komt dat? (mogelijke redenen)",
        "cards": [
          {
            "title": "Geluiden en aangeraakt worden",
            "body": "Sommige mensen met een beperking kunnen heel slecht tegen geluiden waar anderen nauwelijks last van hebben, of tegen aanraking op bepaalde plekken van het lichaam. Openbare bronnen in Japan leggen uit dat alleen geduld of inspanning niet genoeg is om hieraan te wennen."
          },
          {
            "title": "Als plannen veranderen, kan iemand heel onrustig worden",
            "body": "Voor sommige mensen neemt de onrust heel snel toe als ze niet weten wat er gaat gebeuren. Openbare bronnen in Japan leggen uit dat vasthouden aan steeds dezelfde manier van doen ook vaak voorkomt als de onrust groot is."
          },
          {
            "title": "Soms vertelt iemand iets met gedrag in plaats van met woorden",
            "body": "Openbare bronnen in Japan leggen uit dat iemand die iets niet goed in woorden kan zeggen, soms op een eigen manier met gedrag probeert te laten merken hoe hij of zij zich voelt. Ook achter gedrag zoals hard roepen kan iets zitten wat iemand wil vertellen."
          },
          {
            "title": "\"Oké\" betekent niet altijd dat iets begrepen is",
            "body": "Openbare bronnen in Japan leggen uit dat iemand soms \"ja\" of \"oké\" antwoordt zonder het echt te begrijpen. Als iets wel gezegd is maar niet is overgekomen, kan dit de reden zijn."
          },
          {
            "title": "Voor de persoon zelf voelt het echt",
            "body": "Openbare bronnen in Japan leggen uit dat hallucinaties en waanideeën voor de persoon zelf aanvoelen alsof ze echt zijn. Ook woorden en gedrag die van buitenaf moeilijk te begrijpen zijn, hebben voor die persoon een eigen reden."
          }
        ]
      },
      "talk": {
        "title": "Voorbeeldzinnen voor een gesprek",
        "hint": "Met een tik wordt een zin gekopieerd.",
        "cards": [
          {
            "title": "Tegen een vriend of vriendin",
            "lines": [
              "Sommige dagen moet ik na school meteen naar huis, vanwege dingen thuis.",
              "Soms moet ik ineens afzeggen, maar dat is niet omdat ik geen zin heb.",
              "Ik kan er niet echt veel over vertellen, maar thuis is het nu een beetje zwaar.",
              "Het helpt al als je gewoon even luistert."
            ]
          },
          {
            "title": "Tegen een docent",
            "lines": [
              "Door omstandigheden in mijn gezin lukt het me sommige dagen niet om mijn huiswerk op tijd af te hebben.",
              "Door de situatie thuis slaap ik sommige nachten niet zo goed.",
              "Ik wil er nog niet in detail over praten, maar ik wilde het u wel laten weten.",
              "Kunt u me vertellen bij wie ik terechtkan als ik het moeilijk heb?"
            ],
            "note": "Openbare bronnen in Japan leggen uit dat de school een leerling die daar over de situatie vertelt, soms kan doorverwijzen naar de hulp die nodig is, bijvoorbeeld via een schoolmaatschappelijk werker."
          }
        ]
      },
      "things": {
        "title": "Ideeën voor leren en spullen",
        "cards": [
          {
            "title": "Een plek om te leren",
            "body": "Als concentreren thuis moeilijk gaat, is leren buiten de deur ook een mogelijkheid, bijvoorbeeld in de schoolbibliotheek, de openbare bibliotheek of een studieruimte. Sommigen gebruiken oordopjes of gehoorkappen om het geluid om zich heen te dempen."
          },
          {
            "title": "Een plek voor belangrijke spullen",
            "body": "Belangrijke spullen, of spullen die niet kapot mogen gaan, kunnen worden opgeborgen op een plek die moeilijk te bereiken is, of in een doos met een deksel of een slot."
          },
          {
            "title": "Gezinsondersteuning is er ook voor broers en zussen",
            "body": "Volgens openbare richtlijnen in Japan vallen bij de ondersteuning van een familielid met een beperking ook broers, zussen en grootouders onder \"gezinsondersteuning\". Sommige Japanse gemeenten hebben plekken waar mensen die zelf zijn opgegroeid als broer of zus van iemand met een beperking, een luisterend oor bieden (steun door ervaringsdeskundigen)."
          }
        ]
      },
      "src": {
        "nise1": "Nationaal Instituut voor Speciaal Onderwijs (Japan), \"Begeleiding bij zintuiglijke overgevoeligheid\"",
        "rehab1": "Nationaal Revalidatiecentrum voor Personen met een Beperking (Japan), informatie voor artsen en gemeenteambtenaren die gezinnen adviseren",
        "mext14": "Ministerie van Onderwijs, Cultuur, Sport, Wetenschap en Technologie (Japan), onderwijshandleiding, maart 2023 (deel over autisme)",
        "nise2": "Nationaal Instituut voor Speciaal Onderwijs (Japan), \"Begeleiding bij vasthouden aan vaste patronen\"",
        "tokyoKyoiku": "Onderwijsbestuur van de metropool Tokio (Japan), handleiding over lesgeven aan leerlingen met ernstig moeilijk verstaanbaar gedrag, februari 2024",
        "mext9": "Ministerie van Onderwijs, Cultuur, Sport, Wetenschap en Technologie (Japan), onderwijshandleiding, maart 2023 (deel over verstandelijke beperking)",
        "ncnp": "Nationaal Centrum voor Neurologie en Psychiatrie (Japan), informatiesite over mentale gezondheid, \"Schizofrenie\"",
        "hokkaido": "Onderwijsbestuur van Hokkaido (Japan), \"Over jonge mantelzorgers\"",
        "cfa": "Agentschap voor Kinderen en Gezinnen (Japan), richtlijnen voor naschoolse dagbesteding, juli 2024",
        "nerima": "Stadsdeel Nerima, Tokio (Japan), ondersteuningsprogramma voor broers en zussen (gesprekken met ervaringsdeskundigen)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Of je met iemand praat, beslist ieder voor zich. Deze pagina laat alleen zien dat deze plekken bestaan.",
    memoRoomTitle: "De memokamer",
    memoSave: "Stil opbergen",
    memoSaved: "Stil opgeborgen ✓",
    memoEmpty: "Nog niets hier.",
    close2: "Sluiten",
    deleteConfirm: "Wissen?",
    settings: "Instellingen",
    setExitLabel: "Pagina die \"× Sluiten\" opent",
    setExitNote: "Als dit leeg blijft, opent Google.",
    save: "Opslaan",
    savedPref: "Opgeslagen",
    askUnsaved: "Sluiten zonder op te slaan?",
    askYes: "Ja",
    askNo: "Nee",
    setTapsLabel: "Tikken om de memokamer te openen",
    tapUnit: "",
    setTapsNote: "Tik zo vaak achter elkaar op de naam bovenaan, dan opent de memokamer.",
    music: "Muziek",
    musicOn: "Aan",
    musicOff: "Uit",
    looksOpen: "Weergave (kleuren en tekst)",
    looksTitle: "Weergave-instellingen",
    looksColor: "Kleuren van het scherm",
    themeNight: "Nacht",
    themeLight: "Wit",
    themeCream: "Crème",
    themeBlack: "Zwart (hoog contrast)",
    looksText: "Tekstgrootte",
    fsNormal: "Normaal",
    fsLarge: "Groot",
    fsXL: "Extra groot",
    privacyNote: "Alles blijft op dit apparaat. Er wordt nooit iets ergens naartoe gestuurd.",
    credit: "App-ontwikkeling: SOYOGI - Adviespunt voor zorg en ondersteuning",
    version: "Versie 1.10",
    introOk: "Begrepen",
    intro: "Deze kamer heeft een verborgen functie.\nTik {n} keer achter elkaar op de naam \"{name}\" bovenaan,\ndan openen de memokamer en de instellingen.\nDeze melding wordt nooit meer getoond."
  },

  sv: {
    appName: "Teen Info Room",
    close: "× Stäng",
    langTitle: "Språk / Language",
    tab: { hitoiki: "Andas", onaji: "Siffror", shitte: "Grunder", madoguchi: "Kontakter" },
    breathIn: "Andas in…",
    breathOut: "Andas ut…",
    onelines: [
      "Långsam andning hjälper hjärtat att lugna sig.",
      "Redan tre djupa andetag kan göra skillnad.",
      "Tid då man inte gör någonting räknas som nödvändig vila för hjärnan.",
      "Att vila och att lata sig räknas som två olika saker."
    ],
    onajiNote: "Siffrorna bygger på Japans nationella undersökningar (2020-2021) och på angivna källor för andra länder.",
    shitte: [
      { title: "Orden \"ung omsorgsgivare\"", body: "Barn och unga som regelbundet tar hand om en familjemedlem eller sköter hemmet kallas \"unga omsorgsgivare\". Till exempel: ingen tid för läxor eller fritid på grund av omsorg och sysslor, ofta tacka nej till kompisar, gå upp på natten för en familjemedlem. När sådana dagar fortsätter är det just det ordet betyder." },
      { title: "Om insatsen", body: "Att sköta ett hem och ta hand om en familjemedlem är hårt arbete, även för vuxna. De som arbetar med stöd beskriver unga som gör detta som personer som gör något anmärkningsvärt. Det är också känt att de själva ofta tycker att det \"inte är något särskilt\"." },
      { title: "Hur man kan tänka kring orsaken", body: "Omsorgs- och familjeproblem uppstår när mycket hopar sig: sjukdom, pengar, för få händer. De som arbetar med stöd säger att ingen ensam kan lastas för det. Man behöver inte leta efter någon att skylla på." },
      { title: "Hur stödlinjer fungerar", body: "Vissa stödlinjer frågar inte efter namn. Vad som sägs, och hur mycket, bestämmer den som hör av sig. Vissa linjer bara lyssnar." },
      { title: "Båda kan få räknas", body: "Att bry sig om sin familj och att bry sig om sin egen tid och framtid kan gå ihop. Det är grundtanken i stödet till unga, och tjänsterna för det växer sakta." },
      { title: "Om att be om hjälp", body: "Att luta sig mot vuxna eller mot stödtjänster är inte att fuska, och inte att svika familjen. Det räknas som ett sätt att skydda både den unga och familjen." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "När en familjemedlem har en funktionsnedsättning",
      "srcLabel": "Källa: ",
      "srcLang": "(på japanska)",
      "copied": "Kopierat",
      "copyFail": "Kunde inte kopiera",
      "why": {
        "title": "Varför blir det så? (exempel på orsaker)",
        "cards": [
          {
            "title": "Ljud och beröring",
            "body": "En del personer med funktionsnedsättning har mycket svårt för vissa ljud, eller för att bli vidrörda på vissa delar av kroppen, även när andra knappt märker något. Offentligt material i Japan förklarar att det inte är något en person kan vänja sig vid enbart genom tålamod eller ansträngning."
          },
          {
            "title": "När planer ändras kan oron bli stark",
            "body": "En del personer blir snabbt väldigt oroliga när de inte vet vad som ska hända härnäst. Offentligt material i Japan förklarar att ett starkt behov av att göra saker på samma sätt som vanligt också ofta uppstår när oron är stor."
          },
          {
            "title": "Ibland talar handlingar i stället för ord",
            "body": "Offentligt material i Japan förklarar att när orden inte räcker till kan en person försöka visa sina känslor genom sina handlingar, på sitt eget sätt. Även bakom till exempel en hög röst kan det finnas något som personen vill säga."
          },
          {
            "title": "\"Okej\" betyder inte alltid att man har förstått",
            "body": "Offentligt material i Japan förklarar att en person kan svara \"ja\" eller \"okej\" utan att riktigt ha förstått. När något har sagts men ändå inte gått fram kan detta vara orsaken."
          },
          {
            "title": "För personen känns det verkligt",
            "body": "Offentligt material i Japan förklarar att hallucinationer och vanföreställningar känns precis som verkligheten för den som upplever dem. Även ord och handlingar som omgivningen har svårt att förstå har sina skäl för personen själv."
          }
        ]
      },
      "talk": {
        "title": "Exempel på vad man kan säga",
        "hint": "Meningarna kan kopieras med ett tryck.",
        "cards": [
          {
            "title": "Till en kompis",
            "lines": [
              "Vissa dagar måste jag hem direkt efter skolan, för det är lite grejer hemma.",
              "Ibland måste jag ställa in i sista sekunden, men det är inte för att jag inte vill komma.",
              "Jag kan inte säga så mycket, men det är lite tufft hemma just nu.",
              "Bara att du lyssnar hjälper verkligen."
            ]
          },
          {
            "title": "Till en lärare",
            "lines": [
              "Det finns dagar då jag inte hinner göra klart läxorna i tid, på grund av min familjesituation.",
              "Det är vissa nätter jag inte sover så bra, på grund av saker hemma.",
              "Jag vill inte gå in på detaljer än, men jag ville att du skulle känna till det.",
              "Skulle du kunna berätta vem jag kan prata med om det blir jobbigt?"
            ],
            "note": "Offentligt material i Japan förklarar att när skolan får veta hur situationen ser ut kan den ibland hjälpa eleven vidare till det stöd som behövs, till exempel genom en skolsocialarbetare."
          }
        ]
      },
      "things": {
        "title": "Idéer för studier och ägodelar",
        "cards": [
          {
            "title": "Ett ställe att plugga på",
            "body": "När det är svårt att koncentrera sig hemma går det också att plugga någon annanstans, till exempel i skolbiblioteket, på det lokala biblioteket eller i ett studierum. En del använder öronproppar eller hörselkåpor för att dämpa ljuden runt omkring."
          },
          {
            "title": "Ett ställe för viktiga saker",
            "body": "Ett sätt är att förvara viktiga saker, eller saker som man inte vill ska gå sönder, på ett ställe som är svårt att nå, eller i en låda med lock eller lås."
          },
          {
            "title": "Stöd till familjen gäller även syskon",
            "body": "I Japan säger offentliga riktlinjer att \"familjestöd\" kring en familjemedlem med funktionsnedsättning även omfattar syskon och mor- och farföräldrar. Vissa kommuner erbjuder mötesplatser där personer som själva har vuxit upp som syskon till någon med funktionsnedsättning lyssnar och samtalar (kamratstöd)."
          }
        ]
      },
      "src": {
        "nise1": "Nationella institutet för specialpedagogik (Japan), \"Stöd vid sensorisk överkänslighet\"",
        "rehab1": "Nationella rehabiliteringscentret för personer med funktionsnedsättning (Japan), information till läkare och kommunala tjänstemän som ger råd till familjer",
        "mext14": "Ministeriet för utbildning, kultur, idrott, vetenskap och teknik (Japan), undervisningshandledning, mars 2023 (avsnittet om autism)",
        "nise2": "Nationella institutet för specialpedagogik (Japan), \"Stöd kring behovet av att saker ska vara som vanligt\"",
        "tokyoKyoiku": "Utbildningsnämnden i Tokyo (Japan), vägledning om undervisning av elever med svåra utmanande beteenden, februari 2024",
        "mext9": "Ministeriet för utbildning, kultur, idrott, vetenskap och teknik (Japan), undervisningshandledning, mars 2023 (avsnittet om intellektuell funktionsnedsättning)",
        "ncnp": "Nationella centret för neurologi och psykiatri (Japan), informationssajt om psykisk hälsa, \"Schizofreni\"",
        "hokkaido": "Hokkaidos utbildningsnämnd (Japan), \"Om unga omsorgsgivare\"",
        "cfa": "Myndigheten för barn och familjer (Japan), riktlinjer för dagverksamhet efter skoltid, juli 2024",
        "nerima": "Stadsdelen Nerima i Tokyo, stödprogram för syskon (samtal med kamratstödjare)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "Om man vill prata med någon avgör var och en själv. Den här sidan visar bara att sådana platser finns.",
    memoRoomTitle: "Anteckningsrummet",
    memoSave: "Lägg undan tyst",
    memoSaved: "Undanlagt tyst ✓",
    memoEmpty: "Inget här ännu.",
    close2: "Stäng",
    deleteConfirm: "Radera?",
    settings: "Inställningar",
    setExitLabel: "Sida som \"× Stäng\" öppnar",
    setExitNote: "Om detta lämnas tomt öppnas Google.",
    save: "Spara",
    savedPref: "Sparat",
    askUnsaved: "Stänga utan att spara?",
    askYes: "Ja",
    askNo: "Nej",
    setTapsLabel: "Tryck för att öppna anteckningsrummet",
    tapUnit: "",
    setTapsNote: "Tryck på namnet högst upp så här många gånger i rad, så öppnas anteckningsrummet.",
    music: "Musik",
    musicOn: "På",
    musicOff: "Av",
    looksOpen: "Visning (färger och text)",
    looksTitle: "Visningsinställningar",
    looksColor: "Skärmens färger",
    themeNight: "Natt",
    themeLight: "Vit",
    themeCream: "Gräddvit",
    themeBlack: "Svart (hög kontrast)",
    looksText: "Textstorlek",
    fsNormal: "Normal",
    fsLarge: "Stor",
    fsXL: "Extra stor",
    privacyNote: "Allt stannar på den här enheten. Ingenting skickas någonsin någonstans.",
    credit: "Apputveckling: SOYOGI - Rådgivning för omsorg och stöd",
    version: "Version 1.10",
    introOk: "Förstått",
    intro: "Det här rummet har en dold funktion.\nTryck på namnet \"{name}\" högst upp {n} gånger i rad,\nså öppnas anteckningsrummet och inställningarna.\nDet här meddelandet visas aldrig igen."
  },

  ko: {
    appName: "Teen Info Room",
    close: "× 닫기",
    langTitle: "언어 / Language",
    tab: { hitoiki: "숨쉬기", onaji: "데이터", shitte: "알아두기", madoguchi: "창구" },
    breathIn: "들이쉬고…",
    breathOut: "내쉬고…",
    onelines: [
      "천천히 숨을 쉬면 심장 박동이 차분해지는 것으로 알려져 있습니다.",
      "깊은 숨 세 번만으로도 달라진다고 합니다.",
      "아무것도 하지 않는 시간은 뇌에 필요한 휴식으로 여겨집니다.",
      "쉬는 것과 게으름은 서로 다른 것으로 여겨집니다."
    ],
    onajiNote: "숫자는 일본의 전국 조사(2020-2021)와 각 나라별로 표기된 출처에 근거합니다.",
    shitte: [
      { title: "'영 케어러'라는 말", body: "가족을 돌보거나 집안일을 도맡아 하는 어린이·청소년을 '영 케어러'라고 부릅니다. 예를 들어 돌봄과 집안일 때문에 숙제나 동아리 시간이 없다, 친구의 제안을 자주 거절한다, 밤중에 가족 때문에 일어난다. 이런 날들이 계속되는 상태를 가리키는 말입니다." },
      { title: "노력에 대한 평가", body: "집안일과 가족 돌봄은 어른에게도 힘든 일입니다. 이를 해내는 10대에 대해 지원 현장에서는 \"대단한 일을 하고 있다\"고 평가합니다. 정작 본인일수록 \"별것 아니다\"라고 느끼기 쉽다는 것도 알려져 있습니다." },
      { title: "원인을 바라보는 방법", body: "돌봄과 가족의 문제는 병, 돈, 일손 부족 등 여러 사정이 겹쳐서 일어납니다. 누구 한 사람의 탓이라고 할 수 없다는 것이 지원 현장의 생각입니다. 탓할 사람을 찾을 필요는 없다는 뜻입니다." },
      { title: "상담 창구의 규칙", body: "이름을 말하지 않아도 되는 창구가 있습니다. 무엇을 어디까지 이야기할지는 거는 사람이 정합니다. 그냥 들어주기만 하는 창구도 있습니다." },
      { title: "둘 다 소중히 해도 된다", body: "가족을 소중히 하는 것과 자신의 시간과 미래를 소중히 하는 것은 함께할 수 있다는 것이 청소년 지원의 기본 생각입니다. 이를 위한 제도와 서비스도 조금씩 늘고 있습니다." },
      { title: "기대는 것의 의미", body: "어른이나 지원 제도에 기대는 것은 반칙도, 가족을 배신하는 것도 아닙니다. 본인과 가족을 함께 지키는 방법의 하나로 여겨집니다." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "장애가 있는 가족이 있을 때",
      "srcLabel": "출처: ",
      "srcLang": "(일본어)",
      "copied": "복사했습니다",
      "copyFail": "복사하지 못했습니다",
      "why": {
        "title": "왜 그럴까요? (생각해 볼 수 있는 이유)",
        "cards": [
          {
            "title": "소리나, 몸에 닿는 느낌",
            "body": "장애가 있는 사람 중에는 다른 사람은 별로 신경 쓰지 않는 소리나, 몸의 특정 부분을 누가 만지는 것을 무척 힘들어하는 사람이 있습니다. 일본 공공기관의 자료에서는 이것이 참거나 노력하는 것만으로 익숙해질 수 있는 일이 아니라고 설명합니다."
          },
          {
            "title": "일정이 바뀌면 불안이 커질 때가 있다",
            "body": "앞으로 어떻게 될지 알 수 없으면 불안이 순식간에 커지는 사람이 있습니다. 일본 공공기관의 자료에서는 늘 같은 방식을 고집하는 것도 불안이 클 때 나타나기 쉽다고 설명합니다."
          },
          {
            "title": "말 대신 행동으로 마음을 전할 때가 있다",
            "body": "일본 공공기관의 자료에서는 말로 잘 전하지 못할 때 자기 나름의 행동으로 마음을 전하려고 하기도 한다고 설명합니다. 큰 소리를 내는 등의 행동 속에도 전하고 싶은 것이 숨어 있는 경우가 있습니다."
          },
          {
            "title": "\"알았어\"가 꼭 이해했다는 뜻은 아니다",
            "body": "일본 공공기관의 자료에서는 잘 이해하지 못했는데도 \"네\", \"알았어\"라고 대답할 때가 있다고 설명합니다. 말했는데 전해지지 않았을 때는 이런 경우일 수도 있습니다."
          },
          {
            "title": "본인에게는 정말 있는 일처럼 느껴진다",
            "body": "일본 공공기관의 자료에서는 환각이나 망상이 본인에게는 마치 현실처럼 느껴진다고 설명합니다. 주변에서 보기에 이해하기 어려운 말이나 행동에도 본인 나름의 이유가 있습니다."
          }
        ]
      },
      "talk": {
        "title": "말할 때 쓸 수 있는 예문",
        "hint": "문장을 탭하면 복사할 수 있습니다.",
        "cards": [
          {
            "title": "친구에게 말한다면",
            "lines": [
              "집안 사정 때문에 학교 끝나고 바로 집에 가야 하는 날이 있어.",
              "갑자기 못 가게 될 때가 있는데, 가기 싫어서 그러는 건 아니야.",
              "자세히는 말 못 하는데, 요즘 집에 좀 힘든 일이 있어.",
              "그냥 얘기 들어 주기만 해도 도움이 돼."
            ]
          },
          {
            "title": "선생님께 말한다면",
            "lines": [
              "가족 사정으로 숙제를 제때 못 끝내는 날이 있어요.",
              "집에 일이 있어서 밤에 잠을 잘 못 자는 날이 있어요.",
              "자세한 이야기는 아직 하고 싶지 않지만, 알고 계셨으면 해서요.",
              "힘들 때 상담할 수 있는 분을 알려 주세요."
            ],
            "note": "일본 공공기관의 자료에서는 학교에 사정을 이야기하면 스쿨 소셜워커(학교사회복지사) 등을 통해 필요한 지원으로 연결될 수 있다고 설명합니다."
          }
        ]
      },
      "things": {
        "title": "공부와 물건 관리 요령",
        "cards": [
          {
            "title": "공부할 장소",
            "body": "집에서 집중하기 어려울 때는 학교 도서실·공공 도서관·자습실 등 집 밖에서 공부하는 방법도 있습니다. 귀마개나 귀덮개(이어머프)로 주변 소리를 줄이는 사람도 있습니다."
          },
          {
            "title": "소중한 물건을 두는 곳",
            "body": "소중한 물건이나 망가지지 않았으면 하는 물건은 손이 잘 닿지 않는 곳에 두거나, 뚜껑이나 자물쇠가 달린 상자에 넣어 두는 방법이 있습니다."
          },
          {
            "title": "가족을 위한 지원은 형제자매에게도",
            "body": "일본 공공기관의 지침에는 장애가 있는 가족을 지원할 때 형제자매나 조부모도 '가족 지원'의 대상에 포함된다고 되어 있습니다. 장애가 있는 형제자매와 함께 자란 사람이 이야기를 들어 주는 자리(피어 서포트)를 마련한 지방자치단체도 있습니다."
          }
        ]
      },
      "src": {
        "nise1": "국립특별지원교육종합연구소(일본), \"감각 과민에 대한 지도·지원\"",
        "rehab1": "국립장애인재활센터(일본) 발달장애 정보·지원센터, 가족에게 조언하는 의사와 지자체 담당자를 위한 정보",
        "mext14": "문부과학성(일본), 교사용 지도 자료, 2023년 3월(자폐증 등 항목)",
        "nise2": "국립특별지원교육종합연구소(일본), \"동일성 고집에 대한 지도·지원\"",
        "tokyoKyoiku": "도쿄도 교육위원회(일본), 행동상의 어려움이 심한 학생 지도에 관한 안내, 2024년 2월",
        "mext9": "문부과학성(일본), 교사용 지도 자료, 2023년 3월(지적장애 항목)",
        "ncnp": "국립정신·신경의료연구센터(일본), 마음 건강 정보 사이트 \"조현병\"",
        "hokkaido": "홋카이도 교육청(일본), \"영 케어러에 대하여\"",
        "cfa": "어린이가정청(일본), 방과 후 데이 서비스 가이드라인, 2024년 7월",
        "nerima": "도쿄도 네리마구(일본), 형제자매 지원 사업(피어 서포터와의 상담)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "이야기할지 말지는 본인이 정해도 되는 일입니다. 이 페이지는 그런 곳이 있다는 안내일 뿐입니다.",
    memoRoomTitle: "메모의 방",
    memoSave: "조용히 넣어두기",
    memoSaved: "조용히 넣어두었습니다 ✓",
    memoEmpty: "아직 아무것도 없습니다.",
    close2: "닫기",
    deleteConfirm: "지울까요?",
    settings: "설정",
    setExitLabel: "\"× 닫기\"로 열리는 페이지",
    setExitNote: "비워 두면 Google이 열립니다.",
    save: "저장",
    savedPref: "저장했습니다",
    askUnsaved: "저장하지 않고 닫을까요?",
    askYes: "예",
    askNo: "아니요",
    setTapsLabel: "메모의 방을 여는 탭 횟수",
    tapUnit: "",
    setTapsNote: "화면 맨 위의 이름을 이 횟수만큼 연달아 탭하면 메모의 방이 열립니다.",
    music: "음악",
    musicOn: "켜기",
    musicOff: "끄기",
    looksOpen: "화면 보기(색·글자)",
    looksTitle: "화면 보기 설정",
    looksColor: "화면 색",
    themeNight: "밤",
    themeLight: "흰색",
    themeCream: "크림색",
    themeBlack: "검정(고대비)",
    looksText: "글자 크기",
    fsNormal: "보통",
    fsLarge: "크게",
    fsXL: "아주 크게",
    privacyNote: "기록은 이 기기 안에만 있습니다. 어디에도 전송되지 않습니다.",
    credit: "앱 개발: SOYOGI - 돌봄과 지원 상담소",
    version: "버전 1.10",
    introOk: "알겠어요",
    intro: "이 방에는 숨겨진 기능이 있습니다.\n맨 위의 \"{name}\" 이름을 {n}번 연달아 탭하면\n메모의 방과 설정이 열립니다.\n이 안내는 두 번 다시 표시되지 않습니다."
  },

  zh: {
    appName: "Teen Info Room",
    close: "× 关闭",
    langTitle: "语言 / Language",
    tab: { hitoiki: "呼吸", onaji: "数据", shitte: "常识", madoguchi: "窗口" },
    breathIn: "吸气…",
    breathOut: "呼气…",
    onelines: [
      "缓慢的呼吸有助于让心跳平静下来。",
      "据说哪怕三次深呼吸也会有帮助。",
      "什么都不做的时间,被认为是大脑必需的休息。",
      "休息和偷懒,被认为是两回事。"
    ],
    onajiNote: "数字基于日本的全国调查(2020-2021)以及各国注明的出处。",
    shitte: [
      { title: "\"年轻照顾者\"这个词", body: "经常照顾家人或操持家务的儿童和青少年,被称为\"年轻照顾者\"。例如:因为照顾和家务没有时间做作业或参加社团;经常拒绝朋友的邀请;半夜为家人起床。当这样的日子持续下去,就是这个词所指的状态。" },
      { title: "关于付出的评价", body: "家务和照顾家人,即使对大人来说也是辛苦的工作。对于承担这些的青少年,支援一线的评价是\"在做了不起的事\"。同时也众所周知,越是本人越容易觉得\"没什么大不了\"。" },
      { title: "如何看待原因", body: "照顾和家庭的问题,是疾病、金钱、人手不足等多种情况叠加造成的。支援一线认为,这不能归咎于某一个人。也就是说,不需要去寻找该责怪的人。" },
      { title: "咨询窗口的规则", body: "有些窗口不需要说出名字。说什么、说到哪里,都由打电话的人自己决定。也有只是倾听的窗口。" },
      { title: "两者可以兼顾", body: "珍惜家人和珍惜自己的时间与未来,这两件事可以并存。这是青少年支援的基本理念,相关的制度和服务也在慢慢增加。" },
      { title: "关于寻求帮助", body: "依靠大人或支援服务,既不是耍赖,也不是背叛家人。它被认为是同时保护本人和家人的方法之一。" }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "当家人有残障时",
      "srcLabel": "出处: ",
      "srcLang": "(日文)",
      "copied": "已复制",
      "copyFail": "无法复制",
      "why": {
        "title": "为什么会这样? (可能的原因)",
        "cards": [
          {
            "title": "声音,以及被触碰的感觉",
            "body": "在有残障的人当中,有些人对别人并不在意的声音,或是身体某些部位被触碰,会感到非常难受。日本的公开资料指出,这并不是单靠忍耐或努力就能习惯的。"
          },
          {
            "title": "计划一变,有时会变得特别不安",
            "body": "有些人一旦不知道接下来会发生什么,不安就会一下子加剧。日本的公开资料指出,执着于和平常一样的做法,也容易出现在不安感很强的时候。"
          },
          {
            "title": "有时是用行动代替语言来表达",
            "body": "日本的公开资料指出,当无法用语言好好表达时,有的人会用自己的方式,通过行动来传达心情。即使是发出很大声音之类的行为,背后也可能藏着本人想表达的意思。"
          },
          {
            "title": "\"知道了\"不一定是真的明白",
            "body": "日本的公开资料指出,有的人即使没有真正理解,也会回答\"好\"或\"知道了\"。说过的话却没有传达到时,也可能是这个原因。"
          },
          {
            "title": "在本人看来,那是真实的",
            "body": "日本的公开资料指出,幻觉和妄想对本人来说,就像现实一样真实。即使是旁人难以理解的话语和行为,也有本人自己的理由。"
          }
        ]
      },
      "talk": {
        "title": "说话时的例句",
        "hint": "点按句子即可复制。",
        "cards": [
          {
            "title": "对朋友说的话",
            "lines": [
              "因为家里的事,有时候一放学我就得赶紧回家。",
              "有时候我会突然去不了,但真的不是不想去哦。",
              "具体的不太方便说,不过我家最近有点事,挺不容易的。",
              "你能听我说说,就已经帮到我了。"
            ]
          },
          {
            "title": "对老师说的话",
            "lines": [
              "因为家里的情况,有些日子我没办法按时完成作业。",
              "因为家里的事,有些晚上我睡不太好。",
              "具体情况我现在还不太想说,但想先让您知道一下。",
              "能请您告诉我,遇到困难时可以找谁商量吗?"
            ],
            "note": "日本的公开资料指出,找学校商量后,学校有时可以通过学校社会工作者等,帮学生联系到需要的支援。"
          }
        ]
      },
      "things": {
        "title": "学习与物品的小办法",
        "cards": [
          {
            "title": "学习的地方",
            "body": "在家很难集中注意力时,也可以去家以外的地方学习,比如学校图书室、附近的公共图书馆或自习室。也有人会用耳塞或隔音耳罩,来减弱周围的声音。"
          },
          {
            "title": "存放重要物品的地方",
            "body": "重要的东西,或不希望被弄坏的东西,可以放在不容易够到的地方,或者收进带盖子或带锁的箱子里。"
          },
          {
            "title": "家庭支援也包括兄弟姐妹",
            "body": "在日本,公共指南中提到,在支援有残障的家人时,兄弟姐妹和祖父母也属于\"家庭支援\"的对象。也有一些地方政府设有这样的场所:在有残障的兄弟姐妹身边长大的人,会在那里倾听和交流(同伴支持)。"
          }
        ]
      },
      "src": {
        "nise1": "日本国立特别支援教育综合研究所 发育障碍教育推进中心《针对感觉过敏的指导与支援》",
        "rehab1": "日本国立残障者康复中心 发育障碍信息与支援中心《面向为发育障碍儿童家庭提供建议的医生及地方政府负责人的信息》",
        "mext14": "日本文部科学省《与残障幼儿一起成长的生活:理解与指导》2023年3月(自闭症等相关部分)",
        "nise2": "日本国立特别支援教育综合研究所 发育障碍教育推进中心《针对刻板行为的指导与支援》",
        "tokyoKyoiku": "日本东京都教育委员会《针对有严重行为障碍的中小学生的有效指导方式》2024年2月",
        "mext9": "日本文部科学省《与残障幼儿一起成长的生活:理解与指导》2023年3月(智力障碍相关部分)",
        "ncnp": "日本国立精神·神经医疗研究中心 心理健康信息网站《精神分裂症》",
        "hokkaido": "日本北海道教育厅《关于年轻照顾者》",
        "cfa": "日本儿童家庭厅《课后等日间服务指南》2024年7月",
        "nerima": "日本东京都练马区\"兄弟姐妹支援项目\"(由同伴支持者提供咨询)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "要不要和别人谈,由本人决定。这个页面只是告诉你,这样的地方是存在的。",
    memoRoomTitle: "便签的房间",
    memoSave: "悄悄收起来",
    memoSaved: "悄悄收起来了 ✓",
    memoEmpty: "这里还什么都没有。",
    close2: "关闭",
    deleteConfirm: "删除?",
    settings: "设置",
    setExitLabel: "\"× 关闭\"打开的页面",
    setExitNote: "留空则打开 Google。",
    save: "保存",
    savedPref: "已保存",
    askUnsaved: "不保存就关闭吗?",
    askYes: "是",
    askNo: "否",
    setTapsLabel: "打开便签房间的点按次数",
    tapUnit: "",
    setTapsNote: "连续点按屏幕最上方的名字这个次数,便签的房间就会打开。",
    music: "音乐",
    musicOn: "开",
    musicOff: "关",
    looksOpen: "显示（颜色与文字）",
    looksTitle: "显示设置",
    looksColor: "屏幕颜色",
    themeNight: "夜间",
    themeLight: "白色",
    themeCream: "奶油色",
    themeBlack: "黑色（高对比）",
    looksText: "文字大小",
    fsNormal: "标准",
    fsLarge: "大",
    fsXL: "特大",
    privacyNote: "记录只保存在这台设备里,不会发送到任何地方。",
    credit: "应用开发: SOYOGI - 照护与支援咨询处",
    version: "版本 1.10",
    introOk: "知道了",
    intro: "这个房间有一个隐藏功能。\n连续点按最上方的名字\"{name}\" {n}次,\n便签的房间和设置就会打开。\n这条提示不会再次显示。"
  },

  ar: {
    appName: "Teen Info Room",
    close: "× إغلاق",
    langTitle: "اللغة / Language",
    tab: { hitoiki: "تنفّس", onaji: "أرقام", shitte: "أساسيات", madoguchi: "جهات" },
    breathIn: "شهيق…",
    breathOut: "زفير…",
    onelines: [
      "التنفّس البطيء يساعد على تهدئة ضربات القلب.",
      "حتى ثلاثة أنفاس عميقة يمكن أن تُحدث فرقًا.",
      "الوقت الذي لا نفعل فيه شيئًا يُعتبر راحة ضرورية للدماغ.",
      "الراحة والكسل يُعتبران شيئين مختلفين."
    ],
    onajiNote: "تستند الأرقام إلى المسوح الوطنية اليابانية (2020-2021) وإلى المصادر المذكورة للبلدان الأخرى.",
    shitte: [
      { title: "كلمة «مقدم رعاية يافع»", body: "يُطلق اسم «مقدمي الرعاية اليافعين» على الأطفال والمراهقين الذين يعتنون بانتظام بأحد أفراد الأسرة أو يديرون شؤون البيت. مثلًا: لا وقت للواجبات أو الهوايات بسبب الرعاية والأعمال المنزلية، ورفض دعوات الأصدقاء كثيرًا، والاستيقاظ ليلًا من أجل أحد أفراد الأسرة. حين تستمر أيام كهذه، فهذا ما تعنيه الكلمة." },
      { title: "عن تقدير الجهد", body: "الأعمال المنزلية ورعاية أحد أفراد الأسرة عمل شاق حتى على الكبار. والعاملون في مجال الدعم يصفون اليافعين الذين يقومون بذلك بأنهم يفعلون شيئًا رائعًا. ومن المعروف أيضًا أن أصحاب الشأن أنفسهم يميلون إلى الشعور بأنه «شيء عادي»." },
      { title: "كيف ننظر إلى السبب", body: "مشكلات الرعاية والأسرة تحدث حين تتراكم أمور كثيرة: المرض، والمال، وقلة الأيدي. ويقول العاملون في الدعم إنه لا يمكن تحميل شخص واحد المسؤولية. أي لا حاجة للبحث عن أحد نلومه." },
      { title: "قواعد جهات الاستماع", body: "بعض الجهات لا تسأل عن الاسم. وما يُقال ومقداره يقرره المتصل بنفسه. وبعض الخطوط تكتفي بالاستماع." },
      { title: "يمكن أن يهمّ الاثنان معًا", body: "الاهتمام بالأسرة والاهتمام بوقتك ومستقبلك يمكن أن يجتمعا. هذه هي الفكرة الأساسية في دعم اليافعين، والخدمات لذلك تنمو شيئًا فشيئًا." },
      { title: "عن طلب المساعدة", body: "الاستناد إلى الكبار أو إلى خدمات الدعم ليس غشًا ولا خيانة للأسرة. بل يُعتبر وسيلة لحماية اليافع والأسرة معًا." }
    ],
    /* ---- v1.6 family(store/_i18n_v16 から merge.js で差し込み) ---- */
    family: {
      "head": "حين يكون لأحد أفراد الأسرة إعاقة",
      "srcLabel": "المصدر: ",
      "srcLang": "(باللغة اليابانية)",
      "copied": "تم النسخ",
      "copyFail": "تعذّر النسخ",
      "why": {
        "title": "لماذا يحدث هذا؟ (أمثلة على الأسباب)",
        "cards": [
          {
            "title": "الأصوات، والإحساس باللمس",
            "body": "بعض الأشخاص من ذوي الإعاقة يجدون صعوبة كبيرة في تحمّل أصوات لا تزعج الآخرين، أو في أن تُلمَس أجزاء معيّنة من أجسامهم. وتوضح مواد صادرة عن جهات عامة في اليابان أن هذا ليس شيئًا يمكن التعوّد عليه بالصبر أو الجهد وحدهما."
          },
          {
            "title": "حين تتغيّر الخطط، قد يشتدّ القلق",
            "body": "بعض الأشخاص يشتدّ قلقهم فجأة حين لا يعرفون ما الذي سيحدث لاحقًا. وتوضح مواد صادرة عن جهات عامة في اليابان أن التمسّك بفعل الأشياء بالطريقة المعتادة نفسها يكثر أيضًا حين يشتدّ القلق."
          },
          {
            "title": "أحيانًا يكون السلوك بديلًا عن الكلام",
            "body": "توضح مواد صادرة عن جهات عامة في اليابان أن الشخص حين لا يستطيع التعبير بالكلمات جيدًا، قد يحاول إيصال مشاعره بسلوك خاص به. وحتى وراء تصرّف مثل رفع الصوت، قد يكمن شيء يريد الشخص أن يقوله."
          },
          {
            "title": "قول «فهمت» لا يعني دائمًا الفهم",
            "body": "توضح مواد صادرة عن جهات عامة في اليابان أن الشخص قد يجيب بـ«نعم» أو «فهمت» دون أن يفهم فعلًا. فحين يُقال شيء ولا يصل معناه، قد يكون هذا هو السبب."
          },
          {
            "title": "بالنسبة إلى الشخص نفسه، يبدو الأمر حقيقيًا",
            "body": "توضح مواد صادرة عن جهات عامة في اليابان أن الهلوسة والأوهام تبدو للشخص الذي يعيشها كأنها الواقع تمامًا. والكلمات والتصرفات التي يصعب على المحيطين فهمها لها هي أيضًا أسبابها عند الشخص نفسه."
          }
        ]
      },
      "talk": {
        "title": "أمثلة على ما يمكن قوله",
        "hint": "يمكن نسخ الجملة بالنقر عليها.",
        "cards": [
          {
            "title": "عند الحديث مع صديق",
            "lines": [
              "في بعض الأيام أرجع إلى البيت مباشرة بعد المدرسة، بسبب أمور عائلية.",
              "أحيانًا أعتذر في آخر لحظة، لكن ليس لأني لا أريد المجيء.",
              "لا أستطيع أن أشرح التفاصيل، لكن الأمور في البيت صعبة بعض الشيء هذه الأيام.",
              "مجرد استماعك لي يساعدني كثيرًا."
            ]
          },
          {
            "title": "عند الحديث مع معلّم",
            "lines": [
              "بسبب ظروف عائلية، هناك أيام لا أستطيع فيها إنهاء واجباتي في الوقت المحدد.",
              "بسبب أمور في البيت، هناك ليالٍ لا أنام فيها جيدًا.",
              "لا أودّ الحديث عن التفاصيل حاليًا، لكنني أردت أن تكون على علم بالأمر.",
              "هل يمكنك أن تخبرني بمن يمكنني أن أتحدث إليه حين أواجه صعوبة؟"
            ],
            "note": "توضح مواد صادرة عن جهات عامة في اليابان أن المدرسة، حين تعلم بالوضع، قد تتمكن من ربط الطالب بالدعم الذي يحتاجه، مثلًا عن طريق الأخصائي الاجتماعي المدرسي."
          }
        ]
      },
      "things": {
        "title": "أفكار للدراسة وللأغراض الشخصية",
        "cards": [
          {
            "title": "مكان للدراسة",
            "body": "حين يصعب التركيز في البيت، يمكن أيضًا الدراسة خارجه، في أماكن مثل مكتبة المدرسة، أو المكتبة العامة، أو قاعات المذاكرة. وبعض الناس يستخدمون سدادات الأذن أو أغطية الأذن العازلة لتخفيف الأصوات من حولهم."
          },
          {
            "title": "مكان للأشياء المهمة",
            "body": "يمكن حفظ الأشياء المهمة، أو الأشياء التي يُخشى عليها من الكسر، في مكان يصعب الوصول إليه، أو في صندوق له غطاء أو قفل."
          },
          {
            "title": "دعم الأسرة يشمل الإخوة والأخوات أيضًا",
            "body": "في اليابان، تنص إرشادات عامة على أن الإخوة والأخوات والأجداد مشمولون أيضًا بـ«دعم الأسرة» حين يكون أحد أفرادها من ذوي الإعاقة. وتوفّر بعض الحكومات المحلية أماكن للحديث يستمع فيها أشخاصٌ نشؤوا هم أنفسهم إخوةً أو أخواتٍ لشخص من ذوي الإعاقة (دعم الأقران)."
          }
        ]
      },
      "src": {
        "nise1": "المعهد الوطني لتعليم ذوي الاحتياجات الخاصة (اليابان)، «الدعم في حالات فرط الحساسية الحسية»",
        "rehab1": "المركز الوطني لإعادة تأهيل الأشخاص ذوي الإعاقة (اليابان)، معلومات للأطباء والمسؤولين المحليين الذين يقدّمون المشورة للأسر",
        "mext14": "وزارة التعليم والثقافة والرياضة والعلوم والتكنولوجيا (اليابان)، دليل تعليمي، مارس 2023 (قسم التوحّد)",
        "nise2": "المعهد الوطني لتعليم ذوي الاحتياجات الخاصة (اليابان)، «الدعم في حالات التمسّك بالروتين»",
        "tokyoKyoiku": "مجلس التعليم في طوكيو (اليابان)، دليل لتعليم الطلاب ذوي التحديات السلوكية الشديدة، فبراير 2024",
        "mext9": "وزارة التعليم والثقافة والرياضة والعلوم والتكنولوجيا (اليابان)، دليل تعليمي، مارس 2023 (قسم الإعاقة الذهنية)",
        "ncnp": "المركز الوطني لطب الأعصاب والطب النفسي (اليابان)، موقع معلومات الصحة النفسية، «الفصام»",
        "hokkaido": "مجلس التعليم في هوكايدو (اليابان)، «عن مقدمي الرعاية اليافعين»",
        "cfa": "وكالة الأطفال والأسرة (اليابان)، إرشادات خدمات الرعاية النهارية بعد المدرسة، يوليو 2024",
        "nerima": "حي نيريما، طوكيو (اليابان)، برنامج دعم الإخوة والأخوات (استشارات يقدّمها داعمون من الأقران)"
      }
    },
    /* ---- /v1.6 family ---- */
    madoIntro: "التحدث مع أحد أو عدمه قرار يعود لكل شخص. هذه الصفحة تخبر فقط بأن هذه الأماكن موجودة.",
    memoRoomTitle: "غرفة المذكرات",
    memoSave: "احفظ بهدوء",
    memoSaved: "حُفظ بهدوء ✓",
    memoEmpty: "لا شيء هنا بعد.",
    close2: "إغلاق",
    deleteConfirm: "حذف؟",
    settings: "الإعدادات",
    setExitLabel: "الصفحة التي يفتحها «× إغلاق»",
    setExitNote: "إذا تُرك فارغًا يُفتح Google.",
    save: "حفظ",
    savedPref: "تم الحفظ",
    askUnsaved: "إغلاق دون حفظ؟",
    askYes: "نعم",
    askNo: "لا",
    setTapsLabel: "عدد النقرات لفتح غرفة المذكرات",
    tapUnit: "",
    setTapsNote: "انقر على الاسم في أعلى الشاشة هذا العدد من المرات متتاليةً فتُفتح غرفة المذكرات.",
    music: "الموسيقى",
    musicOn: "تشغيل",
    musicOff: "إيقاف",
    looksOpen: "العرض (الألوان والنص)",
    looksTitle: "إعدادات العرض",
    looksColor: "ألوان الشاشة",
    themeNight: "ليلي",
    themeLight: "أبيض",
    themeCream: "كريمي",
    themeBlack: "أسود (تباين عالٍ)",
    looksText: "حجم النص",
    fsNormal: "عادي",
    fsLarge: "كبير",
    fsXL: "كبير جدًا",
    privacyNote: "كل شيء يبقى على هذا الجهاز. لا يُرسل أي شيء إلى أي مكان أبدًا.",
    credit: "تطوير التطبيق: SOYOGI - مركز استشارات الرعاية والدعم",
    version: "الإصدار 1.10",
    introOk: "فهمت",
    intro: "لهذه الغرفة خاصية مخفية.\nانقر على الاسم «{name}» في الأعلى {n} مرات متتالية\nفتُفتح غرفة المذكرات والإعدادات.\nلن يظهر هذا التنبيه مرة أخرى أبدًا."
  }

};
