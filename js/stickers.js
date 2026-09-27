/* =========================================================
   STIKER KUCING ANIMASI — gambar SVG orisinal (bukan karakter berhak cipta)
   Pasangan kucing: Oren (kiri) & Putih berpita (kanan).
   Pose:  "cium"  — si putih mencium pipi si oren, hati muncul
          "peluk" — berpelukan sambil bergoyang, hati melayang
          "lambai"— si oren melambai, si putih mengintip malu-malu
          "kue"   — si oren membawa kue ulang tahun berlilin, si putih bertepuk tangan
   Pemakaian: el.innerHTML = catSticker("cium");
   ========================================================= */
(function () {
  "use strict";
  const INK = "#5b3524";      // garis
  const OREN = "#f6c08a";     // bulu kucing oren
  const OREN_2 = "#e59a5c";   // belang
  const PUTIH = "#fffaf5";
  const PINK = "#ffb1bd";
  const PIPI = "#ff8fa6";
  const HATI = "#ff5c7c";

  const heart = (x, y, s, cls) =>
    // posisi di <g>, animasi CSS di <path> (transform CSS akan menimpa atribut transform)
    `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0 4C0-2 8-4 10 2c2-6 10-4 10 2 0 6-10 12-10 12S0 10 0 4z" fill="${HATI}"/></g>`;

  function catSticker(pose = "cium") {
    const happy = pose === "peluk" || pose === "kue";
    const eyesB = happy
      // mata bahagia (tertutup)
      ? `<path d="M137 114q5-6 10 0M160 112q5-6 10 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`
      : pose === "lambai"
        ? `<g class="cs-blink"><ellipse cx="142" cy="113" rx="4" ry="5" fill="${INK}"/><ellipse cx="165" cy="111" rx="4" ry="5" fill="${INK}"/><circle cx="143.5" cy="111" r="1.4" fill="#fff"/><circle cx="166.5" cy="109" r="1.4" fill="#fff"/></g>`
        // mata terpejam saat mencium
        : `<path d="M135 113q5 4 10 0M158 111q5 4 10 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
    const mouthB = pose === "kue"
      ? `<path d="M149 122q5 9 10 0z" fill="${PIPI}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`
      : pose === "cium"
      ? `<path d="M121 122q-6 2 0 5q-6 2 0 5" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M148 124q3 4 6 0q3 4 6 0" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
    const mouthA = pose === "kue"
      ? `<path d="M80 97q6 11 12 0z" fill="${PIPI}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>`
      : pose === "cium"
      ? `<path class="cs-mouth-o" d="M83 99q4 7 8 0z" fill="${PIPI}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`
      : `<path d="M79 97q4 5 8 0q4 5 8 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;

    return `<svg class="cat-sticker pose-${pose}" viewBox="0 0 220 190" role="img" aria-label="Stiker kucing ${pose}">
  <ellipse cx="112" cy="182" rx="88" ry="7" fill="rgba(0,0,0,.18)"/>
  <!-- Kucing oren -->
  <g class="cs-a">
    <path d="M38 124Q30 182 72 184h50q20-6 12-58z" fill="${OREN}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <g class="cs-ear-a">
      <path d="M36 62 44 16 80 42z" fill="${OREN}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M45 52 49 30 67 43z" fill="${PINK}"/>
    </g>
    <path d="M104 40 136 18 138 64z" fill="${OREN}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M112 43 130 31 131 55z" fill="${PINK}"/>
    <ellipse cx="86" cy="84" rx="62" ry="52" fill="${OREN}" stroke="${INK}" stroke-width="4"/>
    <path d="M76 38q3 10 0 18M87 36v18M98 38q-3 10 0 18" fill="none" stroke="${OREN_2}" stroke-width="4" stroke-linecap="round"/>
    <g class="cs-blink">
      <ellipse cx="66" cy="86" rx="5.5" ry="6.5" fill="${INK}"/>
      <ellipse cx="106" cy="84" rx="5.5" ry="6.5" fill="${INK}"/>
      <circle cx="68" cy="83.5" r="1.8" fill="#fff"/><circle cx="108" cy="81.5" r="1.8" fill="#fff"/>
    </g>
    <ellipse class="cs-blush" cx="54" cy="100" rx="10" ry="5.5" fill="${PIPI}"/>
    <ellipse class="cs-blush" cx="118" cy="98" rx="10" ry="5.5" fill="${PIPI}"/>
    ${mouthA}
    <g class="cs-paw-a"><ellipse cx="116" cy="146" rx="13" ry="10" fill="${OREN}" stroke="${INK}" stroke-width="3.5"/></g>
  </g>
  <!-- Kucing putih berpita -->
  <g class="cs-b">
    <path d="M122 146Q114 184 142 184h42q18-6 8-42z" fill="${PUTIH}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M114 96 116 64 140 82z" fill="${PUTIH}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M120 90 121 74 132 83z" fill="${PINK}"/>
    <path d="M166 78 190 64 192 100z" fill="${PUTIH}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M172 80 186 72 187 93z" fill="${PINK}"/>
    <ellipse cx="153" cy="117" rx="42" ry="36" fill="${PUTIH}" stroke="${INK}" stroke-width="4"/>
    <g class="cs-bow">
      <path d="M172 76l-14-9v17zM172 76l14-9v17z" fill="${HATI}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="172" cy="76" r="4" fill="${HATI}" stroke="${INK}" stroke-width="2.5"/>
    </g>
    ${eyesB}
    <ellipse class="cs-blush" cx="132" cy="126" rx="8" ry="4.5" fill="${PIPI}"/>
    <ellipse class="cs-blush" cx="176" cy="123" rx="8" ry="4.5" fill="${PIPI}"/>
    ${mouthB}
    <g class="cs-paw-b"><ellipse cx="124" cy="152" rx="11" ry="9" fill="${PUTIH}" stroke="${INK}" stroke-width="3.5"/></g>
  </g>
  ${pose === "kue" ? `<!-- Kue ulang tahun dibawa si oren -->
  <g class="cs-cake">
    <ellipse cx="86" cy="176" rx="44" ry="7" fill="#f5d27a" stroke="${INK}" stroke-width="3"/>
    <rect x="56" y="140" width="60" height="34" rx="7" fill="#ffd9e1" stroke="${INK}" stroke-width="3.5"/>
    <path d="M56 150h60v-4q0-6-6-6H62q-6 0-6 6z" fill="#fffaf5"/>
    <path d="M58 150q4 7 8 0q4 8 8 0q4 7 8 0q4 8 8 0q4 7 8 0q4 8 8 0q3 6 6 0" fill="#fffaf5" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <rect x="56" y="140" width="60" height="34" rx="7" fill="none" stroke="${INK}" stroke-width="3.5"/>
    <circle cx="70" cy="163" r="3" fill="${HATI}"/><circle cx="86" cy="165" r="3" fill="#7b4dff"/><circle cx="102" cy="163" r="3" fill="${HATI}"/>
    <rect x="83" y="118" width="6" height="22" rx="2" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
    <path d="M83 124l6-4M83 131l6-4" stroke="${HATI}" stroke-width="2.2"/>
    <path class="cs-flame" d="M86 102q7 8 0 14q-7-6 0-14z" fill="#ffb02e" stroke="#ff7a1a" stroke-width="1.5"/>
    <ellipse class="cs-glow" cx="86" cy="110" rx="12" ry="12" fill="rgba(255,200,80,.35)"/>
    <ellipse cx="52" cy="160" rx="10" ry="9" fill="${OREN}" stroke="${INK}" stroke-width="3.2"/>
    <ellipse cx="120" cy="160" rx="10" ry="9" fill="${OREN}" stroke="${INK}" stroke-width="3.2"/>
  </g>` : ""}
  <!-- Hati -->
  ${heart(112, 52, 1.1, "cs-heart h1")}
  ${heart(150, 36, .8, "cs-heart h2")}
  ${heart(176, 56, .6, "cs-heart h3")}
</svg>`;
  }

  window.catSticker = catSticker;
})();
