document.addEventListener('DOMContentLoaded', ()=>{
  const buttonsArea = document.getElementById('buttonsArea');
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const audio = document.getElementById('proposalAudio');

  function setInitialPositions(){
    const areaRect = buttonsArea.getBoundingClientRect();
    const yesRect = yes.getBoundingClientRect();
    const noRect = no.getBoundingClientRect();
    yes.style.left = (areaRect.width * 0.25 - yesRect.width/2) + 'px';
    yes.style.top  = (areaRect.height/2 - yesRect.height/2) + 'px';
    no.style.left  = (areaRect.width * 0.75 - noRect.width/2) + 'px';
    no.style.top   = (areaRect.height/2 - noRect.height/2) + 'px';
  }

  function moveNoAway(){
    const areaRect = buttonsArea.getBoundingClientRect();
    const yesRect = yes.getBoundingClientRect();
    const btnRect = no.getBoundingClientRect();
    const padding = 8;
    const maxLeft = Math.max(0, areaRect.width - btnRect.width - padding);
    const maxTop  = Math.max(0, areaRect.height - btnRect.height - padding);

    let x, y, attempts = 0;
    do{
      x = Math.random() * maxLeft + padding;
      y = Math.random() * maxTop + padding;
      attempts++;
      const noLeft = areaRect.left + x;
      const noTop = areaRect.top + y;
      if(noLeft + btnRect.width < yesRect.left || noLeft > yesRect.right || noTop + btnRect.height < yesRect.top || noTop > yesRect.bottom){
        break;
      }
    }while(attempts < 60);

    no.style.left = x + 'px';
    no.style.top = y + 'px';
  }

  no.addEventListener('click', (e)=>{ e.preventDefault(); moveNoAway(); });
  no.addEventListener('mouseenter', moveNoAway);
  no.addEventListener('focus', moveNoAway);

  yes.addEventListener('click', ()=>{
    // play celebration audio then navigate (or navigate immediately)
    audio.play().catch(()=>{});
    yes.style.transform = 'scale(0.98)';
    setTimeout(()=> yes.style.transform = '', 140);
    setTimeout(()=> location.href = 'success.html', 1200);
  });
  window.addEventListener('resize', ()=>{ setTimeout(setInitialPositions, 60); });
  setInitialPositions();

  // Attempt to autoplay on page load. If blocked by browser policy,
  // fall back to playing on the first user interaction (click/keydown).
  audio.loop = true;
  audio.play().catch(()=>{
    const playOnInteraction = () => {
      audio.play().catch(()=>{});
      // remove listeners after first attempt
      document.body.removeEventListener('click', playOnInteraction);
      document.body.removeEventListener('keydown', playOnInteraction);
    };
    document.body.addEventListener('click', playOnInteraction, { once: true });
    document.body.addEventListener('keydown', playOnInteraction, { once: true });
  });
});

