# 🎂 Selamat Ulang Tahun, Sayang

Website ucapan ulang tahun yang mewah dan interaktif (tema **Midnight Gold**). Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa library dan tanpa proses build.

## ✨ Fitur

| Bagian | Isi |
|---|---|
| 🎁 **Kotak hadiah** | Pembuka berupa kotak hadiah melayang. Saat dibuka, tutupnya terlempar, muncul ledakan cahaya dan confetti, lalu musik mulai diputar |
| 👑 **Hero** | Judul emas berkilau, nama bercahaya neon, angka umur yang menghitung naik, statistik hari, jam, dan detak jantung, serta cincin orbit yang berputar |
| 🎆 **Efek canvas** | Bintang berkelip, kembang api (sebagian berbentuk hati), confetti, hati melayang, jejak kilau di kursor, dan ledakan kecil setiap kali layar diklik |
| 🎈 **Balon** | Balon mengkilap yang terus naik di latar belakang |
| 🎂 **Kue 3 tingkat** | Lilin dengan api yang bergoyang. Bisa **ditiup lewat mikrofon** atau tombol, lalu muncul asap, kembang api, dan confetti |
| 🖼️ **Galeri 3D** | Karosel foto berputar dengan pantulan. Bisa diseret, dan foto bisa diperbesar (lightbox dengan navigasi keyboard) |
| 📖 **Timeline** | Cerita kenangan dengan foto yang muncul saat halaman digulir |
| 🎬 **Video** | Bingkai emas untuk video mp4 atau YouTube. Musik latar otomatis berhenti saat video diputar |
| 💌 **Kartu alasan** | Kartu 3D yang berbalik saat diketuk |
| ✉️ **Surat** | Amplop dengan segel lilin yang terbuka, kertas surat naik, lalu teks muncul dengan efek mengetik |
| 🎇 **Penutup** | Tulisan "Happy Birthday" dan tombol "Rayakan Lagi" |
| 🎵 **Musik** | Lagu "Happy Birthday" dimainkan oleh synth Web Audio (dengan reverb), jadi tidak perlu file mp3. Bisa juga memakai mp3 sendiri |

Tampilan responsif di HP dan menghormati pengaturan *reduce motion*.

## 🛠️ Cara Personalisasi

Cukup edit **`js/config.js`**:
- `nama`, `dari`, `umur`, `tanggalLahir`
- `foto`: daftar foto galeri. Taruh fotonya di `assets/photos/` (contoh: `1.jpg` sampai `8.jpg`)
- `kenangan`: isi timeline
- `video.src` (taruh di `assets/videos/video.mp4`) **atau** `video.youtube` (ID video YouTube)
- `musik`: path mp3 di `assets/music/` (boleh dikosongkan untuk memakai synth)
- `alasan`, `surat`, `penutup`

Selama foto atau video belum ditambahkan, halaman menampilkan placeholder yang tetap rapi.

> 💡 Foto sebaiknya berorientasi portrait (sekitar 3:4) dan dikompres ke ukuran di bawah 500 KB agar halaman cepat dimuat.

## ▶️ Menjalankan

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

Fitur mikrofon butuh **HTTPS** atau `localhost`. Untuk dibagikan, aktifkan **GitHub Pages** (Settings → Pages → Deploy from branch), lalu kirim link-nya ke dia 💖
