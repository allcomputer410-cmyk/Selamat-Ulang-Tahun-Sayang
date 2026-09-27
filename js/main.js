(() => {
  "use strict";
  const C = window.BIRTHDAY_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1. FX ENGINE — bintang, kembang api, confetti, sparkle
     ========================================================= */
  const canvas = $("#fx");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  const stars = [], particles = [], rockets = [];
  const GOLD = ["#fff3c4", "#f5d27a", "#d4a24c", "#ffffff"];
  const PARTY = ["#f5d27a", "#ff6f9c", "#7b4dff", "#4dd8ff", "#ffffff", "#ff9f43", "#6bffb8"];

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    stars.length = 0;
    const n = Math.round((W * H) / 9000);
    for (let i = 0; i < n; i++) stars.push({ x: rand(0, W), y: rand(0, H), r: rand(.3, 1.4), p: rand(0, Math.PI * 2), s: rand(.01, .04) });
  }
  window.addEventListener("resize", resize);
  resize();

  class P {
    constructor(o) { Object.assign(this, { x: 0, y: 0, vx: 0, vy: 0, g: .05, drag: .985, life: 1, decay: .012, size: 2, color: "#fff", type: "spark", rot: 0, vr: 0, trail: [] }, o); }
    update() {
      if (this.type === "spark") { this.trail.push([this.x, this.y]); if (this.trail.length > 5) this.trail.shift(); }
      this.vx *= this.drag; this.vy *= this.drag; this.vy += this.g;
      this.x += this.vx; this.y += this.vy; this.rot += this.vr; this.life -= this.decay;
      if (this.type === "confetti") this.x += Math.sin(this.y / 30 + this.rot) * .6;
    }
    draw() {
      ctx.globalAlpha = Math.max(this.life, 0);
      if (this.type === "confetti") {
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rot);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2 * Math.abs(Math.cos(this.rot * 2)) + 1);
        ctx.restore();
      } else if (this.type === "heart") {
        ctx.fillStyle = this.color; ctx.font = `${this.size}px serif`; ctx.fillText("❤", this.x, this.y);
      } else {
        ctx.strokeStyle = this.color; ctx.lineWidth = this.size; ctx.lineCap = "round";
        ctx.beginPath();
        const t = this.trail[0] || [this.x, this.y];
        ctx.moveTo(t[0], t[1]); ctx.lineTo(this.x, this.y); ctx.stroke();
      }
    }
  }

  function explode(x, y, palette = PARTY, count = 90) {
    const base = palette[(Math.random() * palette.length) | 0];
    const shape = Math.random();
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count;
      let sp = rand(2, 6);
      let vx = Math.cos(a) * sp, vy = Math.sin(a) * sp;
      if (shape < .25) { // bentuk hati
        const t = a;
        vx = 16 * Math.pow(Math.sin(t), 3) * .28;
        vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * .28;
      }
      particles.push(new P({ x, y, vx, vy, g: .04, drag: .975, decay: rand(.008, .016), size: rand(1.5, 2.8), color: Math.random() < .7 ? base : "#fff" }));
    }
    // glitter
    for (let i = 0; i < 30; i++) particles.push(new P({ x, y, vx: rand(-2, 2), vy: rand(-2, 2), g: .02, decay: .01, size: 1, color: "#fff3c4" }));
  }

  function launch(x = rand(W * .15, W * .85), palette) {
    rockets.push({ x, y: H, vx: rand(-1, 1), vy: -rand(9, 13), ty: rand(H * .12, H * .4), palette });
  }

  function confetti(n = 160, fromTop = false) {
    for (let i = 0; i < n; i++) {
      particles.push(new P({
        type: "confetti",
        x: fromTop ? rand(0, W) : W / 2 + rand(-40, 40),
        y: fromTop ? rand(-200, -10) : H * .6,
        vx: fromTop ? rand(-1, 1) : rand(-10, 10), vy: fromTop ? rand(1, 3) : rand(-16, -6),
        g: .12, drag: .99, decay: .004, size: rand(6, 11), color: PARTY[(Math.random() * PARTY.length) | 0],
        rot: rand(0, 6), vr: rand(-.2, .2)
      }));
    }
  }

  function hearts(n = 30) {
    for (let i = 0; i < n; i++) particles.push(new P({ type: "heart", x: rand(0, W), y: H + 20, vx: rand(-.5, .5), vy: -rand(1.5, 4), g: -.005, drag: 1, decay: .005, size: rand(14, 30), color: ["#ff6f9c", "#f5d27a", "#ff9fc0"][i % 3] }));
  }

  function show(times = 8, interval = 350) {
    for (let i = 0; i < times; i++) setTimeout(() => launch(), i * interval);
  }

  let mouse = { x: -999, y: -999 };
  function loop() {
    ctx.clearRect(0, 0, W, H);
    // bintang
    for (const s of stars) {
      s.p += s.s;
      ctx.globalAlpha = .3 + Math.sin(s.p) * .35 + .35;
      ctx.fillStyle = "#fff6dc";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    // roket
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.x += r.vx; r.y += r.vy; r.vy += .12;
      particles.push(new P({ x: r.x, y: r.y, vx: rand(-.3, .3), vy: rand(0, 1), g: 0, decay: .04, size: 1.5, color: "#ffd98a" }));
      if (r.vy >= -1 || r.y <= r.ty) { explode(r.x, r.y, r.palette); rockets.splice(i, 1); }
    }
    ctx.globalCompositeOperation = "lighter";
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.type !== "spark") continue;
      p.update(); p.draw();
      if (p.life <= 0) particles.splice(i, 1);
    }
    ctx.globalCompositeOperation = "source-over";
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.type === "spark") continue;
      p.update(); p.draw();
      if (p.life <= 0 || p.y > H + 50 || p.y < -80) particles.splice(i, 1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Sparkle trail kursor
  const glow = $("#cursor-glow");
  let lastSpark = 0;
  window.addEventListener("pointermove", e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
    const now = performance.now();
    if (now - lastSpark > 30 && !reduceMotion) {
      lastSpark = now;
      particles.push(new P({ x: e.clientX, y: e.clientY, vx: rand(-.8, .8), vy: rand(-.8, .5), g: .03, decay: .03, size: rand(1, 2.2), color: GOLD[(Math.random() * GOLD.length) | 0] }));
    }
  });
  // Klik di mana saja = ledakan kecil
  window.addEventListener("click", e => {
    if (e.target.closest("button, a, .photo-card, .flip, .envelope, #lightbox, .gift")) return;
    if (document.body.classList.contains("locked")) return;
    explode(e.clientX, e.clientY, PARTY, 50);
  });

  /* =========================================================
     2. MUSIK — file mp3 atau synth "Happy Birthday"
     ========================================================= */
  const Music = (() => {
    let actx, master, playing = false, audioEl = null, timer = null, nextTime = 0, idx = 0;
    const NOTE = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
    const BEAT = .42;
    const SONG = [
      ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
      ["G4", .75], ["G4", .25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
      ["G4", .75], ["G4", .25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
      ["F5", .75], ["F5", .25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 3], [null, 2]
    ];
    const BASS = { G4: 98, A4: 110, B4: 123.47, C5: 130.81, D5: 146.83, E5: 164.81, F5: 174.61, G5: 196 };

    function tone(freq, t, dur, type, vol) {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + .02);
      g.gain.exponentialRampToValueAtTime(.0008, t + dur);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur + .05);
    }
    function schedule() {
      while (nextTime < actx.currentTime + .6) {
        const [n, beats] = SONG[idx];
        const dur = beats * BEAT;
        if (n) {
          tone(NOTE[n], nextTime, dur * 1.6, "triangle", .22);        // melodi
          tone(NOTE[n] * 2, nextTime, dur * .9, "sine", .05);         // kilau
          tone(NOTE[n] * 3.01, nextTime, .35, "sine", .025);          // bel
          if (beats >= 1) tone(BASS[n], nextTime, dur * 1.2, "sine", .12);
        }
        nextTime += dur; idx = (idx + 1) % SONG.length;
      }
    }
    function makeReverb() {
      const len = actx.sampleRate * 2.2, buf = actx.createBuffer(2, len, actx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
      }
      const conv = actx.createConvolver(); conv.buffer = buf; return conv;
    }
    function initSynth() {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      master = actx.createGain(); master.gain.value = .8;
      const rev = makeReverb(), wet = actx.createGain(); wet.gain.value = .35;
      master.connect(actx.destination); master.connect(rev); rev.connect(wet); wet.connect(actx.destination);
    }
    async function start() {
      if (C.musik) {
        audioEl = audioEl || Object.assign(new Audio(C.musik), { loop: true, volume: .7 });
        try { await audioEl.play(); playing = true; return; } catch (e) { audioEl = null; }
      }
      if (!actx) initSynth();
      await actx.resume();
      nextTime = actx.currentTime + .1;
      clearInterval(timer); timer = setInterval(schedule, 150); schedule();
      playing = true;
    }
    function stop() {
      if (audioEl) audioEl.pause();
      clearInterval(timer);
      if (actx) actx.suspend();
      playing = false;
    }
    async function resume() {
      if (audioEl) { await audioEl.play(); playing = true; return; }
      if (!actx) return start();
      await actx.resume(); nextTime = actx.currentTime + .1;
      clearInterval(timer); timer = setInterval(schedule, 150); playing = true;
    }
    return { start, stop, resume, get playing() { return playing; } };
  })();

  const musicBtn = $("#musicBtn");
  musicBtn.addEventListener("click", () => {
    if (Music.playing) { Music.stop(); musicBtn.classList.add("paused"); }
    else { Music.resume(); musicBtn.classList.remove("paused"); }
  });

  /* =========================================================
     3. ISI KONTEN DARI CONFIG
     ========================================================= */
  const nama = C.nama || "Sayang";
  $("#heroName").textContent = nama;
  $("#letterTo").textContent = nama;
  $("#letterFrom").textContent = C.dari || "Aku";
  $("#creditName").textContent = nama;
  $("#finaleText").textContent = C.penutup || "";
  document.title = `Selamat Ulang Tahun, ${nama} ✨`;

  function placeholder(i, label) {
    const hues = [[330, 270], [280, 220], [20, 330], [45, 10], [200, 280], [300, 20]];
    const [a, b] = hues[i % hues.length];
    return `<div class="placeholder" style="background:linear-gradient(135deg,hsl(${a} 60% 30%),hsl(${b} 55% 14%))">
      <b>${i + 1}</b><span>${label || "Foto"}</span><small>tambahkan foto di assets/photos</small></div>`;
  }
  function imgWithFallback(src, alt, i) {
    const img = new Image();
    img.alt = alt || ""; img.loading = "lazy"; img.decoding = "async";
    img.onerror = () => { const d = document.createElement("div"); d.innerHTML = placeholder(i, alt); img.replaceWith(d.firstElementChild); };
    img.src = src;
    return img;
  }

  // Galeri
  const photos = C.foto || [];
  const carousel = $("#carousel");
  photos.forEach((p, i) => {
    const fig = document.createElement("figure");
    fig.className = "photo-card"; fig.dataset.i = i;
    fig.appendChild(imgWithFallback(p.src, p.caption, i));
    const cap = document.createElement("figcaption"); cap.textContent = p.caption || ""; fig.appendChild(cap);
    carousel.appendChild(fig);
  });

  // Timeline
  const tl = $("#timeline");
  (C.kenangan || []).forEach((k, i) => {
    const item = document.createElement("div");
    item.className = "tl-item"; item.setAttribute("data-reveal", "");
    item.innerHTML = `<div class="tl-card">${k.foto ? '<div class="tl-photo"></div>' : ""}
      <div class="tl-body"><div class="tl-date"></div><h3></h3><p></p></div></div>`;
    if (k.foto) $(".tl-photo", item).appendChild(imgWithFallback(k.foto, k.judul, i + 2));
    $(".tl-date", item).textContent = k.tanggal || "";
    $("h3", item).textContent = k.judul || "";
    $("p", item).textContent = k.teks || "";
    tl.appendChild(item);
  });

  // Video
  const vi = $("#videoInner"), V = C.video || {};
  const videoEmpty = () => {
    vi.innerHTML = `<div class="video-empty"><div class="play">▶</div><p>Taruh videomu di <code>${V.src || "assets/videos/video.mp4"}</code></p><p>atau isi <code>video.youtube</code> di js/config.js</p></div>`;
  };
  if (V.youtube) {
    vi.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(V.youtube)}?rel=0" title="Video ulang tahun" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (V.src) {
    const v = document.createElement("video");
    v.controls = true; v.playsInline = true; v.preload = "metadata";
    if (V.poster) v.poster = V.poster;
    v.onerror = videoEmpty;
    const s = document.createElement("source"); s.src = V.src; s.onerror = videoEmpty; v.appendChild(s);
    // saat video diputar, kecilkan musik latar
    v.addEventListener("play", () => { if (Music.playing) { Music.stop(); musicBtn.classList.add("paused"); } });
    vi.appendChild(v);
  } else videoEmpty();

  // Kartu alasan
  const cards = $("#cards");
  (C.alasan || []).forEach((a, i) => {
    const el = document.createElement("div");
    el.className = "flip"; el.setAttribute("data-reveal", ""); el.style.transitionDelay = `${i * .08}s`;
    el.tabIndex = 0; el.setAttribute("role", "button");
    el.innerHTML = `<div class="flip-inner"><div class="flip-face flip-front"><div class="ic"></div><h4></h4><small>ketuk aku</small></div><div class="flip-face flip-back"><p></p></div></div>`;
    $(".ic", el).textContent = a.ikon || "✨";
    $("h4", el).textContent = a.depan || "";
    $(".flip-back p", el).textContent = a.belakang || "";
    const flip = () => {
      el.classList.toggle("flipped");
      const r = el.getBoundingClientRect();
      explode(r.left + r.width / 2, r.top + r.height / 2, ["#ff6f9c", "#f5d27a", "#fff"], 40);
    };
    el.addEventListener("click", flip);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
    cards.appendChild(el);
  });

  /* =========================================================
     4. GERBANG / BUKA HADIAH
     ========================================================= */
  const gate = $("#gate"), gift = $("#gift"), main = $("#main");
  let opened = false;
  function openGift() {
    if (opened) return; opened = true;
    gift.classList.add("open");
    Music.start().catch(() => {});
    musicBtn.classList.add("visible");
    setTimeout(() => { confetti(220); explode(W / 2, H / 2, GOLD, 140); }, 500);
    setTimeout(() => {
      gate.classList.add("gone");
      document.body.classList.remove("locked");
      main.classList.add("show"); main.setAttribute("aria-hidden", "false");
      show(6, 400);
      startBalloons();
      countAge();
    }, 1300);
  }
  gift.addEventListener("click", openGift);
  gift.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openGift(); });
  $("#openBtn").addEventListener("click", openGift);

  /* =========================================================
     5. HERO — hitung umur & statistik
     ========================================================= */
  function countUp(el, to, dur = 2200) {
    const t0 = performance.now();
    const step = now => {
      const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(to * e).toLocaleString("id-ID");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function countAge() {
    countUp($("#ageNum"), C.umur || 0, 2500);
    const born = new Date(C.tanggalLahir || Date.now());
    const ms = Math.max(Date.now() - born.getTime(), 0);
    countUp($("#statDays"), Math.floor(ms / 864e5), 3000);
    countUp($("#statHours"), Math.floor(ms / 36e5), 3000);
    countUp($("#statBeats"), Math.floor(ms / 6e4) * 75, 3200);
  }

  /* =========================================================
     6. BALON
     ========================================================= */
  const balloonBox = $("#balloons");
  const BCOL = ["#f5d27a", "#ff6f9c", "#c2185b", "#7b4dff", "#ffffff", "#d4a24c"];
  function spawnBalloon() {
    const b = document.createElement("div");
    const c = BCOL[(Math.random() * BCOL.length) | 0];
    const s = rand(.6, 1.15);
    b.className = "balloon";
    b.style.left = rand(0, 95) + "vw";
    b.style.background = `radial-gradient(circle at 35% 30%, #fff8, ${c} 40%, ${c})`;
    b.style.width = 60 * s + "px"; b.style.height = 76 * s + "px";
    b.style.animationDuration = rand(12, 22) + "s";
    b.style.opacity = rand(.45, .85);
    b.addEventListener("animationend", () => b.remove());
    balloonBox.appendChild(b);
  }
  function startBalloons() {
    if (reduceMotion) return;
    for (let i = 0; i < 8; i++) setTimeout(spawnBalloon, i * 500);
    setInterval(() => { if (!document.hidden && balloonBox.childElementCount < 14) spawnBalloon(); }, 2200);
  }

  /* =========================================================
     7. KUE & LILIN
     ========================================================= */
  const candleBox = $("#candles");
  const nCandles = Math.min(Math.max(C.umur || 5, 1), 9); // maks 9 lilin agar rapi
  for (let i = 0; i < nCandles; i++) {
    const c = document.createElement("div");
    c.className = "candle";
    const x = nCandles === 1 ? 56 : (i / (nCandles - 1)) * 112;
    c.style.left = x + "px";
    c.style.bottom = Math.sin((i / Math.max(nCandles - 1, 1)) * Math.PI) * 8 + "px";
    c.innerHTML = '<div class="flame"></div>';
    candleBox.appendChild(c);
  }
  let blown = false;
  function blowOut() {
    if (blown) return; blown = true;
    $$(".candle", candleBox).forEach((c, i) => setTimeout(() => {
      c.classList.add("out");
      const sm = document.createElement("div"); sm.className = "smoke"; c.appendChild(sm);
    }, i * 90));
    setTimeout(() => {
      $("#wishDone").classList.add("show");
      confetti(260); show(12, 250); hearts(40);
      $("#blowBtn span").textContent = "🕯️ Nyalakan Lagi";
    }, nCandles * 90 + 300);
    stopMic();
  }
  function relight() {
    blown = false;
    $$(".candle", candleBox).forEach(c => { c.classList.remove("out"); $$(".smoke", c).forEach(s => s.remove()); });
    $("#wishDone").classList.remove("show");
    $("#blowBtn span").textContent = "🎂 Tiup Lilin";
  }
  $("#blowBtn").addEventListener("click", () => (blown ? relight() : blowOut()));

  let micStream = null, micRaf = 0;
  const micBtn = $("#micBtn");
  async function startMic() {
    if (!navigator.mediaDevices?.getUserMedia) { micBtn.textContent = "Mikrofon tidak didukung"; return; }
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const a = new (window.AudioContext || window.webkitAudioContext)();
      const src = a.createMediaStreamSource(micStream), an = a.createAnalyser();
      an.fftSize = 512; src.connect(an);
      const data = new Uint8Array(an.frequencyBinCount);
      let loud = 0;
      micBtn.classList.add("listening"); micBtn.textContent = "🎤 Tiup sekarang…";
      const tick = () => {
        an.getByteFrequencyData(data);
        let sum = 0; for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length;
        loud = avg > 55 ? loud + 1 : Math.max(loud - 1, 0);
        if (loud > 12) { blowOut(); a.close(); return; }
        micRaf = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) { micBtn.textContent = "Izin mikrofon ditolak"; }
  }
  function stopMic() {
    cancelAnimationFrame(micRaf);
    if (micStream) micStream.getTracks().forEach(t => t.stop());
    micStream = null; micBtn.classList.remove("listening"); micBtn.textContent = "🎤 Pakai Mikrofon";
  }
  micBtn.addEventListener("click", () => {
    if (micStream) return stopMic();
    if (blown) relight();
    startMic();
  });

  /* =========================================================
     8. KAROSEL 3D + LIGHTBOX
     ========================================================= */
  const scene = $("#scene");
  const cardsEl = $$(".photo-card", carousel);
  let angle = 0, vel = .15, dragging = false, lastX = 0, moved = 0;
  function layoutCarousel() {
    const n = cardsEl.length || 1, w = carousel.offsetWidth;
    const radius = Math.round((w / 2) / Math.tan(Math.PI / n)) + 40;
    cardsEl.forEach((c, i) => { c.style.transform = `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`; });
    carousel.dataset.r = radius;
  }
  layoutCarousel(); window.addEventListener("resize", layoutCarousel);
  (function spin() {
    if (!dragging) { angle += vel; vel += (.15 - vel) * .02; }
    carousel.style.transform = `translateZ(-${carousel.dataset.r}px) rotateX(-6deg) rotateY(${angle}deg)`;
    requestAnimationFrame(spin);
  })();
  scene.addEventListener("pointerdown", e => { dragging = true; lastX = e.clientX; moved = 0; scene.setPointerCapture(e.pointerId); });
  scene.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
    angle += dx * .3; vel = dx * .3;
  });
  const endDrag = e => {
    if (!dragging) return; dragging = false;
    if (moved < 6) {
      const hit = document.elementsFromPoint(e.clientX, e.clientY).find(el => el.classList?.contains("photo-card"));
      if (hit) openLB(+hit.dataset.i);
    }
  };
  scene.addEventListener("pointerup", endDrag);
  scene.addEventListener("pointercancel", () => (dragging = false));

  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let lbI = 0;
  function openLB(i) {
    lbI = (i + photos.length) % photos.length;
    const p = photos[lbI];
    lbImg.onerror = () => { lbImg.removeAttribute("src"); lbImg.alt = "Foto belum ditambahkan"; };
    lbImg.src = p.src; lbImg.alt = p.caption || "";
    lbCap.textContent = p.caption || "";
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  }
  const closeLB = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
  $(".lb-close").addEventListener("click", closeLB);
  $(".lb-prev").addEventListener("click", () => openLB(lbI - 1));
  $(".lb-next").addEventListener("click", () => openLB(lbI + 1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
  window.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") openLB(lbI - 1);
    if (e.key === "ArrowRight") openLB(lbI + 1);
  });

  /* =========================================================
     9. SURAT — amplop + efek mengetik
     ========================================================= */
  const env = $("#envelope"), letterText = $("#letterText");
  let letterOpen = false;
  function openLetter() {
    if (letterOpen) return; letterOpen = true;
    env.classList.add("open"); $("#envHint").style.visibility = "hidden";
    hearts(25);
    const text = C.surat || "";
    let i = 0;
    letterText.classList.add("typing");
    setTimeout(function type() {
      letterText.textContent = text.slice(0, ++i);
      const pi = $(".paper-inner"); pi.scrollTop = pi.scrollHeight;
      if (i < text.length) setTimeout(type, text[i - 1] === "\n" ? 260 : /[.,!?]/.test(text[i - 1]) ? 180 : 32);
      else letterText.classList.remove("typing");
    }, 1700);
  }
  env.addEventListener("click", openLetter);
  env.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openLetter(); });

  /* =========================================================
     10. PENUTUP
     ========================================================= */
  $("#celebrateBtn").addEventListener("click", () => { show(16, 200); confetti(200, true); hearts(40); });

  /* =========================================================
     11. SCROLL REVEAL, PROGRESS, AUTO-FX PER SECTION
     ========================================================= */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: .15 });
  $$("[data-reveal]").forEach(el => io.observe(el));

  const fired = new Set();
  const secIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting || fired.has(en.target.id)) return;
      fired.add(en.target.id);
      if (en.target.id === "finale") { show(10, 300); confetti(150, true); }
      if (en.target.id === "reasons") hearts(20);
    });
  }, { threshold: .4 });
  $$(".section").forEach(s => secIO.observe(s));

  const bar = $("#progress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  }, { passive: true });
})();
