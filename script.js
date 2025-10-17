
document.addEventListener('DOMContentLoaded', ()=>{
  // Music control
  const music = document.getElementById('bgMusic');
  const control = document.getElementById('musicControl');
  let playing = false;

  // Try to set start time to 35s when metadata loaded
  music.addEventListener('loadedmetadata', ()=>{
    try{ music.currentTime = 35; }catch(e){}
  });

  // Autoplay attempt
  music.play().then(()=>{ playing=true; control.innerText='⏸'; }).catch(()=>{ playing=false; control.innerText='▶'; });

  control.addEventListener('click', ()=>{
    if(music.paused){ music.play(); control.innerText='⏸'; }
    else { music.pause(); control.innerText='▶'; }
  });

  // Countdown
  const countdownEl = document.getElementById('countdown');
  // Event date: Nov 23, 2025 21:30 (local)
  const eventTime = new Date('2025-11-23T21:30:00').getTime();

  function updateCountdown(){
    const now = Date.now();
    let diff = eventTime - now;
    if(diff <= 0){
      countdownEl.innerHTML = '<div class="item">🎉 Hoy es el cumple</div>';
      clearInterval(interval);
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * (1000*60);
    const seconds = Math.floor(diff / 1000);

    countdownEl.innerHTML = [
      {v: days, label: 'd'},
      {v: hours, label: 'h'},
      {v: minutes, label: 'm'},
      {v: seconds, label: 's'}
    ].map(x=>`<div class="item">${x.v}${x.label}</div>`).join('');
  }

  updateCountdown();
  const interval = setInterval(updateCountdown,1000);
});
