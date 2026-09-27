# 🎂 Selamat Ulang Tahun, Sayang

Website ucapan ulang tahun yang mewah dan interaktif (tema **Midnight Gold**). Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa library dan tanpa proses build.

## ✨ Fitur

| Bagian | Isi |
|---|---|
| ⏳ **Hitung mundur** | Opsional. Jika `tanggalUltah` diisi, kado terkunci sampai hari-H dan waktunya dihitung mundur (tambahkan `?preview` di URL untuk melihat lebih dulu) |
| 🎁 **Kotak hadiah** | Pembuka berupa kotak hadiah melayang. Saat dibuka, tutupnya terlempar, muncul ledakan cahaya dan confetti, lalu musik mulai diputar |
| 👑 **Hero** | Judul emas berkilau, nama bercahaya neon, angka umur yang menghitung naik, statistik hari, jam, dan detak jantung, serta cincin orbit yang berputar |
| 💬 **Pesan masuk** | Tampilan ponsel ala WhatsApp dengan indikator "sedang mengetik…", lalu pesan muncul satu per satu |
| 🎆 **Efek canvas** | Bintang berkelip, kembang api (sebagian berbentuk hati), confetti, hati melayang, jejak kilau di kursor, dan ledakan kecil setiap kali layar diklik |
| 🎈 **Balon** | Balon mengkilap yang terus naik di latar belakang |
| 🎂 **Kue 3 tingkat** | Lilin dengan api yang bergoyang. Bisa **ditiup lewat mikrofon** atau tombol, lalu muncul asap, kembang api, dan confetti |
| 🖼️ **Galeri 3D** | Karosel foto berputar dengan pantulan. Bisa diseret, dan foto bisa diperbesar (lightbox dengan navigasi keyboard) |
| 📖 **Timeline** | Cerita kenangan dengan foto yang muncul saat halaman digulir |
| 🎈 **Game pecahkan balon** | Pecahkan balon (ada bunyi *pop* dan ledakan emoji) untuk membuka **pesan rahasia** |
| 🤔 **Kuis** | "Seberapa kenal kamu?" dengan jawaban benar/salah, skor akhir, dan hujan emoji |
| 🎬 **Video** | Bingkai emas untuk video mp4 atau YouTube. Musik latar otomatis berhenti saat video diputar |
| 💌 **Kartu alasan** | Kartu 3D yang berbalik saat diketuk |
| ✉️ **Surat** | Amplop dengan segel lilin yang terbuka, kertas surat naik, lalu teks muncul dengan efek mengetik |
| 🎇 **Penutup** | Tulisan "Happy Birthday" dan tombol "Rayakan Lagi" |
| 🎵 **Musik** | Lagu "Happy Birthday" dimainkan oleh synth Web Audio (dengan reverb), jadi tidak perlu file mp3. Bisa juga memakai mp3 sendiri |
| 🐱 **Stiker kucing animasi** | Pasangan kucing orisinal (SVG) yang bergerak: **cium**, **peluk**, dan **lambai**. Muncul di pembuka, chat, surat, dan penutup. Ada juga teman kucing di pojok yang bisa diketuk untuk ganti pose dan mengucapkan kalimat manis. Bisa diganti GIF milikmu sendiri |
| 😍 **Emoji animasi** | Lebih dari 25 emoji animasi dari Google Noto: mengorbit kado, melayang di hero, di atas setiap judul, di dalam chat, kartu, tombol, dan **hujan emoji** di setiap momen perayaan |
| 🧭 **Dock navigasi** | Dock ikon ala macOS (ikon SVG) untuk berpindah bagian, dengan penanda bagian yang sedang aktif |

Tampilan responsif di HP dan menghormati pengaturan *reduce motion*.

## 🛠️ Cara Personalisasi

### Cara mudah: pakai editor (tanpa coding)

Buka **`editor.html`** (misalnya `http://localhost:8000/editor.html` atau `https://<username>.github.io/<repo>/editor.html`):

1. Isi semua bagian: nama, foto, cerita, chat, kuis, surat, stiker, dan lainnya. **Pratinjau langsung** di sampingnya ikut berubah.
2. Foto, video, dan stiker bisa dipilih langsung dari perangkat untuk pratinjau.
3. Klik **Unduh config.js**, lalu ganti file `js/config.js` di GitHub dengan file itu.
4. Upload foto ke `assets/photos/`, video ke `assets/videos/`, dan stiker ke `assets/stickers/` dengan **nama file yang sama** seperti di editor.

Isian editor tersimpan otomatis di browser, jadi aman kalau tab tertutup.

### Cara manual

Edit **`js/config.js`**:
- `nama`, `dari`, `umur`, `tanggalLahir`
- `foto`: daftar foto galeri. Taruh fotonya di `assets/photos/` (contoh: `1.jpg` sampai `8.jpg`)
- `kenangan`: isi timeline
- `video.src` (taruh di `assets/videos/video.mp4`) **atau** `video.youtube` (ID video YouTube)
- `musik`: path mp3 di `assets/music/` (boleh dikosongkan untuk memakai synth)
- `alasan`, `surat`, `penutup`
- `chat`: isi percakapan (`dari: "aku"` di kanan, `dari: "kamu"` di kiri; emoji di teks otomatis jadi animasi)
- `balonTarget`, `pesanRahasia`: pengaturan game balon
- `kuis`: pertanyaan, pilihan, dan index jawaban benar
- `tanggalUltah`: untuk hitung mundur (kosongkan jika tidak dipakai)
- `stiker`: path GIF/WebP/PNG milikmu per lokasi (`gerbang`, `chat`, `surat`, `penutup`, `teman`). Kosongkan untuk memakai kucing bawaan
- `kataTeman`: kalimat si teman kucing saat diketuk
- `emojiAnimasi`: `false` untuk memakai emoji biasa
- `emojiCDN`: `false` untuk hanya memakai emoji yang tersimpan di `assets/emoji/`

### Emoji animasi tersimpan lokal

Semua emoji yang dipakai sudah tersimpan di `assets/emoji/` (sekitar 30 file, total ±2,5 MB) dalam versi yang **diperkecil**, sehingga lebih ringan sekitar 3 kali lipat dan tetap tampil tanpa server Google. Kalau kamu menambah emoji baru di config:

```bash
pip install pillow
python3 tools/emoji.py
```

Emoji yang belum tersimpan lokal tetap otomatis diambil dari CDN Google.

Selama foto atau video belum ditambahkan, halaman menampilkan placeholder yang tetap rapi.

> 💡 Foto sebaiknya berorientasi portrait (sekitar 3:4) dan dikompres ke ukuran di bawah 500 KB agar halaman cepat dimuat.

## ▶️ Menjalankan

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

Fitur mikrofon butuh **HTTPS** atau `localhost`.

## 🌐 Online-kan dengan GitHub Pages

Repo ini sudah punya workflow `.github/workflows/pages.yml` yang men-deploy otomatis setiap ada push ke `main`.

1. Merge perubahan ke branch `main`.
2. Buka **Settings → Pages → Build and deployment → Source**, pilih **GitHub Actions** (cukup sekali).
3. Tunggu tab **Actions** selesai, lalu buka `https://<username>.github.io/<nama-repo>/` dan kirim link-nya ke dia 💖

> ⚠️ Repo publik berarti foto dan isi surat bisa dilihat siapa pun yang punya link-nya.

## 🙏 Kredit & Inspirasi

- Stiker kucing: gambar SVG orisinal buatan sendiri (bukan karakter berhak cipta), bebas dipakai di proyek ini.
- Emoji animasi: [Google Noto Animated Emoji](https://googlefonts.github.io/noto-emoji-animation/) (CC BY 4.0), dimuat dari CDN `fonts.gstatic.com`. Jika gagal dimuat, otomatis diganti emoji biasa.
- Ide fitur terinspirasi dari repo open-source populer (tanpa menyalin kodenya):
  - [faahim/happy-birthday](https://github.com/faahim/happy-birthday) (MIT, ±1.5k ⭐): alur ucapan yang muncul bertahap seperti chat
  - [Ruturaj998/Birthday-web](https://github.com/Ruturaj998/Birthday-web) (MIT): hitung mundur, game pecahkan balon, kuis
  - Topik GitHub [happy-birthday-website](https://github.com/topics/happy-birthday-website) untuk referensi lainnya
