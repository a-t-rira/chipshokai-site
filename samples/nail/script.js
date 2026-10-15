(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const gallery = document.querySelector('.gallery');
  const stage = document.querySelector('.gallery-stage');
  const win = document.querySelector('.gallery-window');
  const track = document.querySelector('#gallery-track');
  const progress = document.querySelector('.gallery-progress span');
  let distance = 0, top = 0, frame = 0;
  const desktop = () => matchMedia('(min-width: 801px)').matches && !reduce.matches;
  function measure(){
    if(!gallery||!stage||!track||!win)return;
    if(desktop()){
      const styles=getComputedStyle(win);
      const gutters=parseFloat(styles.paddingLeft)+parseFloat(styles.paddingRight);
      distance=Math.max(0,track.scrollWidth+gutters-innerWidth);
      gallery.style.height=(stage.offsetHeight+distance)+'px';
      top=gallery.getBoundingClientRect().top+scrollY;
    }else{
      distance=0;gallery.style.height='';
      track.style.transform='';if(progress)progress.style.transform='scaleX(1)';
    }
    update();
  }
  function update(){
    frame=0;if(!desktop()||!distance)return;
    const moved=Math.max(0,Math.min(distance,scrollY-top));
    const t=moved/distance;
    track.style.transform='translate3d('+(-distance*t)+'px,0,0)';
    if(progress)progress.style.transform='scaleX('+Math.max(.14,t)+')';
  }
  function request(){if(!frame)frame=requestAnimationFrame(update)}
  if(gallery){
    addEventListener('scroll',request,{passive:true});
    addEventListener('resize',measure,{passive:true});
    reduce.addEventListener?.('change',measure);
    if('ResizeObserver'in window)new ResizeObserver(measure).observe(track);
    addEventListener('load',measure,{once:true});
    document.fonts?.ready.then(measure);
    measure();
  }
})();