/* =========================================================
   KONFIGURASI — ubah isi file ini saja untuk personalisasi
   (atau pakai editor.html untuk mengisinya tanpa coding)
   ========================================================= */
window.BIRTHDAY_CONFIG = {
  // Nama orang yang berulang tahun
  nama: "Sayangku",

  // Nama pengirim (kamu)
  dari: "Alwin",

  // Umur baru (dipakai untuk jumlah lilin & angka di hero)
  umur: 24,

  // Tanggal lahir (YYYY-MM-DD) — untuk menghitung hari yang sudah dilalui bersama dunia
  tanggalLahir: "2002-09-28",

  // Tanggal & jam ulang tahun (YYYY-MM-DDTHH:MM, mengikuti jam di HP/laptop yang membuka).
  // Jika masih di masa depan, halaman menampilkan hitung mundur dan kado baru bisa dibuka saat waktunya tiba.
  // Kosongkan untuk langsung bisa dibuka. Tambahkan ?preview di URL untuk melewati hitung mundur.
  tanggalUltah: "", // SEMENTARA DIBUKA untuk testing — isi lagi "2026-09-28T00:00:00+07:00" untuk mengunci sampai 00.00 WIB
  zonaWaktu: "Asia/Jakarta",
  labelZona: "WIB",

  // Emoji animasi (Google Noto Animated Emoji). false = pakai emoji biasa.
  // Emoji diambil dari assets/emoji/ (jalankan tools/emoji.py setelah menambah emoji baru);
  // yang belum tersimpan lokal diambil dari CDN Google. emojiCDN: false = hanya pakai file lokal.
  emojiAnimasi: true,
  emojiCDN: true,

  // Musik latar. Taruh file mp3 di assets/music/ lalu isi path-nya.
  // Kalau dikosongkan / file tidak ada, lagu "Happy Birthday" dimainkan otomatis (synth).
  musik: "",

  // Foto galeri 3D. Taruh file di assets/photos/ lalu tulis nama file-nya.
  // Jika file tidak ditemukan, kartu akan menampilkan placeholder elegan.
  foto: [
    { src: "assets/photos/1.jpg", caption: "Kelas IX-2, masa MTsN 🌹" },
    { src: "assets/photos/2.jpg", caption: "Malam yang hangat" },
    { src: "assets/photos/3.jpg", caption: "Petualangan kita" },
    { src: "assets/photos/4.jpg", caption: "Kita sekarang ✨" },
    { src: "assets/photos/5.jpg", caption: "Senyum di balik cahaya" },
    { src: "assets/photos/6.jpg", caption: "Dua sisi, satu cerita" },
    { src: "assets/photos/7.jpg", caption: "Steady as it goes 🤍" },
    { src: "assets/photos/8.jpg", caption: "Momen santai bareng" },
    { src: "assets/photos/9.jpg", caption: "Selalu cantik 💖" }
  ],

  // Timeline kenangan (foto opsional)
  kenangan: [
    { tanggal: "Masa MTsN", judul: "Pertama Bertemu", teks: "Semua berawal di MTsN. Siapa sangka pertemuan sederhana di sekolah itu jadi salah satu cerita paling berharga dalam hidupku.", foto: "assets/photos/1.jpg" },
    { tanggal: "Cerita Kita", judul: "Kita Pernah Bersama", teks: "Kita pernah saling menjaga, berbagi cerita, tawa, dan juga air mata. Masa-masa itu selalu aku simpan baik-baik.", foto: "assets/photos/2.jpg" },
    { tanggal: "Sebuah Pelajaran", judul: "Jalan yang Berbeda", teks: "Kita sempat berpisah, dan aku sadar banyak salah yang pernah aku buat. Dari situ aku belajar untuk jadi orang yang lebih baik.", foto: "assets/photos/3.jpg" },
    { tanggal: "28 September", judul: "Ulang Tahunmu yang ke-24", teks: "Hari ini aku cuma ingin bilang tiga hal: maaf, terima kasih, dan selamat ulang tahun. Semoga bahagia selalu menemanimu.", foto: "assets/photos/4.jpg" }
  ],

  // Video. Taruh file mp4 di assets/videos/ ATAU isi youtube dengan ID/link video YouTube.
  // Video tegak (dari HP) otomatis ditampilkan dengan bingkai tegak.
  video: {
    src: "", // video kedua (kosong = bagian ini disembunyikan)
    poster: "",
    tegak: true, // video potret dari HP (terdeteksi otomatis juga)
    youtube: "" // ID atau link YouTube, contoh: "https://youtu.be/dQw4w9WgXcQ" (jika diisi, src diabaikan)
  },

  // Stiker. Kosongkan ("") untuk memakai stiker kucing animasi bawaan,
  // atau isi path GIF/WebP/PNG milikmu sendiri, mis. "assets/stickers/cium.gif".
  stiker: {
    gerbang: "",  // di samping kado pembuka
    chat: "",     // stiker terakhir di percakapan
    kue: "",      // di samping kue ulang tahun
    surat: "",    // di bawah surat
    penutup: "",  // di atas tulisan Happy Birthday
    teman: ""     // teman kecil di pojok kiri bawah (bisa diketuk)
  },

  // Kalimat si teman kucing saat diketuk
  kataTeman: ["Selamat ulang tahun ke-24! 🎂", "Maafin Alwin ya 🥺", "Makasih buat semuanya 💖", "Semoga bahagia selalu ✨", "Barakallah fii umrik 🙏"],

  // Percakapan ala chat (muncul satu per satu seperti sedang mengetik)
  chat: [
    { dari: "aku", teks: "Hai Sayangku 👋" },
    { dari: "aku", teks: "Udah jam 12 nih… tau gak hari ini hari apa? 🤔" },
    { dari: "kamu", teks: "Hari apa emangnya? 🙈" },
    { dari: "aku", teks: "Hari lahirnya orang yang selalu punya tempat spesial di hatiku 🥰" },
    { dari: "aku", teks: "Selamat ulang tahun yang ke-24 ya 🎂" },
    { dari: "aku", teks: "Aku udah siapin sesuatu buat kamu… scroll pelan-pelan ya ✨" }
  ],

  // Game pecahkan balon: berapa balon yang harus dipecahkan untuk membuka pesan rahasia
  balonTarget: 10,
  pesanRahasia: "Kamu berhasil! 🎉 Satu langkah lagi: jawab kuis di bawah dengan benar untuk membuka ucapan spesial dari Iput 🎁💖",

  // Video hadiah dari Iput: punya bagian sendiri setelah kuis, TERKUNCI sampai game balon selesai
  // dan semua jawaban kuis benar, lalu otomatis diputar saat digulir ke bagiannya.
  videoRahasia: "assets/videos/video.mp4",
  posterRahasia: "assets/photos/video-poster.jpg",

  // Kuis kecil (jawaban = index pilihan yang benar, mulai 0 → A=0, B=1, C=2, D=3)
  judulKuis: "Seberapa Kenal Kamu Sama Aku?",
  kuis: [
    { tanya: "Apa yang paling aku suka?", pilihan: ["Makan 🍜", "Tidur 😴", "Main HP 📱", "Kamu 🥰"], jawaban: 3 },
    { tanya: "Apa yang paling gak aku suka?", pilihan: ["Hujan 🌧️", "Lihat kamu dekat sama orang lain, baik cowok atau cewek 😤", "Nunggu lama ⏳", "Macet 🚗"], jawaban: 1 },
    { tanya: "Apa yang paling bikin aku nyaman?", pilihan: ["Kasur 🛏️", "Dengerin musik 🎶", "Peluk kamu dan dekat sama kamu 🤗", "Ngopi ☕"], jawaban: 2 }
  ],

  // Kartu flip
  judulAlasan: "Terima Kasih Untukmu",
  alasan: [
    { ikon: "🙏", depan: "Doamu", belakang: "Terima kasih untuk setiap doa yang mungkin diam-diam kamu titipkan untukku." },
    { ikon: "💪", depan: "Dukunganmu", belakang: "Terima kasih sudah selalu mendukungku, bahkan saat aku sendiri ragu." },
    { ikon: "🌹", depan: "Kesabaranmu", belakang: "Terima kasih sudah sabar menghadapi sifat dan kesalahan-kesalahanku." },
    { ikon: "📸", depan: "Kenangan Kita", belakang: "Terima kasih untuk semua kenangan, sejak pertama kita bertemu di MTsN." },
    { ikon: "😊", depan: "Senyummu", belakang: "Terima kasih untuk senyum yang selalu bikin hariku terasa lebih ringan." },
    { ikon: "🦋", depan: "Dirimu", belakang: "Terima kasih sudah jadi dirimu sendiri, dan pernah hadir dalam hidupku." }
  ],

  // Surat (baris baru = paragraf baru)
  surat: `Selamat ulang tahun yang ke-24, Sayangku.

Di hari spesialmu ini, aku ingin menuliskan sesuatu yang sudah lama ingin aku sampaikan.

Semua berawal dari MTsN. Dari pertemuan sederhana itu, kita pernah berjalan bersama, berbagi cerita, tawa, dan juga luka. Meskipun akhirnya kita sempat memilih jalan yang berbeda, kenangan itu tetap aku simpan dengan baik.

Aku mau minta maaf. Maaf untuk semua kesalahan yang pernah aku buat — untuk kata-kata yang mungkin pernah menyakitimu, untuk sikapku yang kadang egois, dan untuk saat-saat aku tidak ada ketika kamu butuh. Aku sadar aku belum sempurna, dan aku terus belajar untuk jadi lebih baik.

Aku juga mau berterima kasih. Terima kasih untuk setiap dukungan yang kamu berikan, untuk setiap doa yang kamu titipkan untukku, dan untuk semua kebaikanmu selama ini. Semua itu sangat berarti buatku, lebih dari yang bisa aku ucapkan.

Di usia 24 ini, semoga Allah selalu melimpahkan kesehatan, kebahagiaan, dan rezeki yang berkah untukmu. Semoga setiap langkahmu dimudahkan, semua impianmu tercapai, dan kamu selalu dikelilingi orang-orang yang tulus menyayangimu.

Barakallahu fii umrik. Semoga bahagia selalu.`,

  // Harapan penutup
  penutup: "Barakallahu fii umrik, Sayangku. Semoga bahagia selalu ✨"
};
