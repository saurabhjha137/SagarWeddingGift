document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('playEnter');
  const audio = document.getElementById('landingAudio');

  // Attempt to autoplay on load; fall back to first interaction if blocked.
  audio.loop = true;
  // Try muted autoplay first (allowed by many browsers), then unmute on interaction
  audio.muted = true;
  audio.play().catch(()=>{});

  const unmuteAndPlay = () => {
    try{ audio.muted = false; audio.volume = 1; audio.play().catch(()=>{}); }catch(e){}
    document.body.removeEventListener('click', unmuteAndPlay);
    document.body.removeEventListener('keydown', unmuteAndPlay);
  };

  document.body.addEventListener('click', unmuteAndPlay, { once: true });
  document.body.addEventListener('keydown', unmuteAndPlay, { once: true });

  btn.addEventListener('click', ()=>{
    // Ensure audio is audible when user clicks Play & Enter
    audio.muted = false;
    audio.play().catch(()=>{});
    setTimeout(()=> location.href = 'proposal.html', 1800);
    audio.onended = ()=> { location.href = 'proposal.html'; };
  });
});

