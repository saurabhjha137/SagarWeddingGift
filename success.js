document.addEventListener('DOMContentLoaded', ()=>{
  const audio = document.getElementById('successAudio');
  const btn = document.getElementById('playCelebrate');
  // Attempt autoplay on load, fall back to first interaction if blocked
  audio.loop = true;
  audio.play().catch(()=>{
    const playOnInteraction = () => { audio.play().catch(()=>{}); };
    document.body.addEventListener('click', playOnInteraction, { once: true });
    document.body.addEventListener('keydown', playOnInteraction, { once: true });
  });

  btn.addEventListener('click', ()=> audio.play().catch(()=>{}));
});

