'use strict';
/* 音まわり: 生成BGM(1パターン「night」のみ)
   ・BGMはWeb Audioでその場生成(音源ファイル無し=軽量・完全オフライン)
   ・ねらい: 夜にひとりで休むための、音量低め・穏やか・暗すぎないローファイ(Am系。ちょっと若者向け)
   ・タップ音は鳴らさない。Sound.tap()は無音のまま、最初のタップでBGMを自然に始めるトリガーだけを担う
     (夜中に開く前提=効果音は出さない)
   ・ブラウザの自動再生制限があるため、音が出るのは最初のタップ以降 */
const Sound = (() => {
  let ctx = null;
  let bgmEnabled = true;       // BGM設定(app.jsの prefs.bgm と同期)
  let playing = false;
  let master = null, filter = null;
  let timer = 0, nextBar = 0, chordIdx = 0;

  /* night パターン(ローファイ・夜・Am系。ゆっくり・低音量・暗すぎない) ※Fable音設計の記載値そのまま */
  const NIGHT = {
    bar: 6.4, vol: 0.028, lp: 560, type: 'sine',
    // Am7(9) → Fmaj7 → Gsus → Em の循環
    chords: [[110, 164.8, 196, 246.9], [87.31, 130.8, 174.6, 220], [98, 146.8, 196, 261.6], [82.41, 123.5, 164.8, 196]],
    // まばらな単音(Aマイナーペンタ)
    scale: [220, 261.6, 293.7, 329.6, 392]
  };

  function ensure(){
    if(!ctx){
      try{ ctx = new (window.AudioContext || window.webkitAudioContext)(); }catch(_){ ctx = null; }
    }
    if(ctx && ctx.state === 'suspended'){ try{ ctx.resume(); }catch(_){} }
  }

  function scheduleBar(t){
    const p = NIGHT;
    const chord = p.chords[chordIdx % p.chords.length];
    chordIdx++;
    // パッド(和音・ゆっくり膨らんでゆっくり消える)
    chord.forEach(f => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = p.type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(p.vol, t + p.bar * 0.35);
      g.gain.linearRampToValueAtTime(0.0001, t + p.bar * 1.35);
      o.connect(g); g.connect(filter);
      o.start(t); o.stop(t + p.bar * 1.4);
    });
    // まばらな単音(1小節に0〜1音・本家より控えめ)
    if(Math.random() < 0.6){
      const nt = t + p.bar * (0.15 + Math.random() * 0.7);
      const f = p.scale[Math.floor(Math.random() * p.scale.length)];
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, nt);
      g.gain.linearRampToValueAtTime(p.vol * 0.55, nt + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, nt + 2.2);
      o.connect(g); g.connect(filter);
      o.start(nt); o.stop(nt + 2.3);
    }
  }

  function startBgm(){
    ensure();
    if(!ctx || playing) return;
    if(ctx.state === 'suspended') return;   // まだ操作前→次のタップで始まる
    master = ctx.createGain(); master.gain.value = 1;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = NIGHT.lp;
    filter.connect(master); master.connect(ctx.destination);
    playing = true; chordIdx = 0;
    nextBar = ctx.currentTime + 0.1;
    scheduleBar(nextBar); nextBar += NIGHT.bar;
    timer = setInterval(() => {
      if(!playing || !ctx) return;
      if(ctx.currentTime > nextBar - 1.2){
        scheduleBar(nextBar);
        nextBar += NIGHT.bar;
      }
    }, 400);
  }

  function stopBgm(){
    if(!playing) return;
    playing = false;
    clearInterval(timer);
    if(master && ctx){
      try{
        master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);   // ゆっくりフェードアウト
        const m = master;
        setTimeout(() => { try{ m.disconnect(); }catch(_){} }, 1600);
      }catch(_){}
    }
    master = null; filter = null;
  }

  function maybeStartBgm(){ if(bgmEnabled && !playing) startBgm(); }

  /* tap(): 音は鳴らさない。最初のタップ=ブラウザが音を許可する瞬間にBGMを始めるトリガー */
  function tap(){
    ensure();
    maybeStartBgm();
  }

  return {
    tap,
    setBgmEnabled(v){ bgmEnabled = !!v; if(bgmEnabled) maybeStartBgm(); else stopBgm(); },
    get bgmEnabled(){ return bgmEnabled; },
    get bgmPlaying(){ return playing; }
  };
})();
