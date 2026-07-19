(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const particleCanvas = $('#particleField');
  const pctx = particleCanvas.getContext('2d');
  let particles = [];
  function resizeParticles(){
    const dpr = Math.min(devicePixelRatio || 1, 2);
    particleCanvas.width = innerWidth * dpr;
    particleCanvas.height = innerHeight * dpr;
    particleCanvas.style.width = innerWidth + 'px';
    particleCanvas.style.height = innerHeight + 'px';
    pctx.setTransform(dpr,0,0,dpr,0,0);
    particles = Array.from({length: Math.min(90, Math.floor(innerWidth/12))}, () => ({
      x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.3+Math.random()*1.5,v:.08+Math.random()*.35,a:.08+Math.random()*.28
    }));
  }
  function drawParticles(){
    pctx.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach(p=>{p.y-=p.v;if(p.y<-5){p.y=innerHeight+5;p.x=Math.random()*innerWidth}pctx.beginPath();pctx.arc(p.x,p.y,p.r,0,Math.PI*2);pctx.fillStyle=`rgba(112,228,210,${p.a})`;pctx.fill()});
    requestAnimationFrame(drawParticles);
  }
  resizeParticles();drawParticles();addEventListener('resize',resizeParticles,{passive:true});

  const menuButton = $('#menuButton');
  const mobileMenu = $('#mobileMenu');
  menuButton.addEventListener('click',()=>{const open=mobileMenu.hidden;mobileMenu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open))});
  $$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false')}));

  const gate = $('#entryGate');
  const hideGateNext = $('#hideGateNext');
  try{ if(localStorage.getItem('abyssHideIntroGate')==='1') gate.classList.add('hidden'); }catch(e){}
  $('#gateSkip').addEventListener('click',()=>{persistGate();gate.classList.add('hidden')});
  $('#gateWatch').addEventListener('click',()=>{persistGate();gate.classList.add('hidden');openMovie(true)});
  function persistGate(){try{if(hideGateNext.checked)localStorage.setItem('abyssHideIntroGate','1')}catch(e){}}

  const cinematic = $('#cinematic');
  const movieScenes = $$('.movie-scene');
  const progress = $('#movieProgress');
  const movieTime = $('#movieTime');
  const pauseButton = $('#moviePause');
  const soundButton = $('#movieSound');
  const duration = 52;
  let startedAt = 0;
  let pausedAt = 0;
  let paused = false;
  let raf = 0;
  let soundOn = false;
  let audioCtx = null, master = null, drone = null, droneGain = null;

  const cCanvas = $('#cinematicCanvas');
  const cctx = cCanvas.getContext('2d');
  let rings=[];
  function resizeMovieCanvas(){const dpr=Math.min(devicePixelRatio||1,2);cCanvas.width=innerWidth*dpr;cCanvas.height=innerHeight*dpr;cCanvas.style.width=innerWidth+'px';cCanvas.style.height=innerHeight+'px';cctx.setTransform(dpr,0,0,dpr,0,0)}
  resizeMovieCanvas();addEventListener('resize',resizeMovieCanvas,{passive:true});
  function drawMovieFX(t){
    cctx.clearRect(0,0,innerWidth,innerHeight);
    if(Math.floor(t*2)%4===0 && Math.random()>.9) rings.push({x:innerWidth*(.62+Math.random()*.14),y:innerHeight*(.52+Math.random()*.12),r:5,a:.32});
    rings=rings.filter(r=>r.a>.01);rings.forEach(r=>{r.r+=1.4;r.a*=.985;cctx.beginPath();cctx.arc(r.x,r.y,r.r,0,Math.PI*2);cctx.strokeStyle=`rgba(112,228,210,${r.a})`;cctx.lineWidth=1;cctx.stroke()});
    for(let i=0;i<42;i++){const x=(i*83+t*7)%innerWidth;const y=(i*47+t*15)%innerHeight;cctx.fillStyle='rgba(112,228,210,.12)';cctx.fillRect(x,y,1,1)}
  }

  function openMovie(withSound=false){
    cinematic.classList.add('open');cinematic.setAttribute('aria-hidden','false');document.body.classList.add('movie-open');
    paused=false;pausedAt=0;startedAt=performance.now();pauseButton.textContent='PAUSE';cinematic.classList.remove('paused');
    if(withSound) enableSound();
    cancelAnimationFrame(raf);tick();
  }
  function closeMovie(){cinematic.classList.remove('open');cinematic.setAttribute('aria-hidden','true');document.body.classList.remove('movie-open');cancelAnimationFrame(raf);stopSound();try{localStorage.setItem('abyssIntroSeen','1')}catch(e){}}
  function tick(now=performance.now()){
    if(!cinematic.classList.contains('open')) return;
    const t=paused?pausedAt:(now-startedAt)/1000;
    movieScenes.forEach(scene=>{const start=Number(scene.dataset.start),end=Number(scene.dataset.end);scene.classList.toggle('active',t>=start&&t<end)});
    progress.style.width=Math.min(100,t/duration*100)+'%';movieTime.textContent=`${formatTime(t)} / 00:52`;drawMovieFX(t);
    if(t>=duration){paused=true;pausedAt=duration;pauseButton.textContent='REPLAY'}
    raf=requestAnimationFrame(tick);
  }
  function formatTime(t){const n=Math.max(0,Math.min(duration,Math.floor(t)));return `00:${String(n).padStart(2,'0')}`}
  function togglePause(){
    if(paused && pausedAt>=duration){startedAt=performance.now();pausedAt=0;paused=false;pauseButton.textContent='PAUSE';cinematic.classList.remove('paused');return}
    if(!paused){pausedAt=(performance.now()-startedAt)/1000;paused=true;pauseButton.textContent='PLAY';cinematic.classList.add('paused');}
    else{startedAt=performance.now()-pausedAt*1000;paused=false;pauseButton.textContent='PAUSE';cinematic.classList.remove('paused');}
  }
  function enableSound(){
    if(soundOn)return;
    try{
      audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.12;master.connect(audioCtx.destination);drone=audioCtx.createOscillator();drone.type='sine';drone.frequency.value=46;droneGain=audioCtx.createGain();droneGain.gain.value=.4;const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=180;drone.connect(filter);filter.connect(droneGain);droneGain.connect(master);drone.start();soundOn=true;soundButton.textContent='SOUND ON';soundButton.setAttribute('aria-pressed','true');
    }catch(e){soundOn=false}
  }
  function stopSound(){if(drone){try{drone.stop()}catch(e){}drone=null}soundOn=false;soundButton.textContent='SOUND OFF';soundButton.setAttribute('aria-pressed','false')}
  function toggleSound(){soundOn?stopSound():enableSound()}

  $('#watchIntro').addEventListener('click',()=>openMovie(true));
  $('#closeMovie').addEventListener('click',closeMovie);
  $('#replayMovie').addEventListener('click',()=>{startedAt=performance.now();pausedAt=0;paused=false;pauseButton.textContent='PAUSE';cinematic.classList.remove('paused')});
  pauseButton.addEventListener('click',togglePause);
  soundButton.addEventListener('click',toggleSound);
  addEventListener('keydown',e=>{if(e.key==='Escape'&&cinematic.classList.contains('open'))closeMovie();if(e.code==='Space'&&cinematic.classList.contains('open')){e.preventDefault();togglePause()}});
})();
