
const scenes=[...document.querySelectorAll('.scene')];
const progress=document.getElementById('progressBar');
const replay=document.getElementById('replay');
const durations=[4200,4500,5600,5000,5000,5200,4200];
let i=0,timer=null;

function resetAnimations(scene){
  const animated = scene.querySelectorAll('*');
  animated.forEach(el=>{
    const a = getComputedStyle(el).animationName;
    if(a && a !== 'none'){
      el.style.animation='none';
      void el.offsetWidth;
      el.style.animation='';
    }
  });
}

function animateBar(ms){
  progress.style.transition='none';
  progress.style.width='0%';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    progress.style.transition=`width ${ms}ms linear`;
    progress.style.width='100%';
  }));
}
function show(n){
  i=n;
  scenes.forEach((s,x)=>s.classList.toggle('active',x===n));
  resetAnimations(scenes[n]);
  clearTimeout(timer);
  animateBar(durations[n]);
  timer=setTimeout(()=>{
    if(n<scenes.length-1) show(n+1);
  },durations[n]);
}
replay.onclick=()=>show(0);
show(0);
