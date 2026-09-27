/* =========================================================
   KONFIGURASI — ubah isi file ini saja untuk personalisasi
   ========================================================= */
window.BIRTHDAY_CONFIG = {
  // Nama orang yang berulang tahun
  nama: "Sayang",

  // Nama pengirim (kamu)
  dari: "Aku",

  // Umur baru (dipakai untuk jumlah lilin & angka di hero)
  umur: 21,

  // Tanggal lahir (YYYY-MM-DD) — untuk menghitung hari yang sudah dilalui bersama dunia
  tanggalLahir: "2005-09-27",

  // Tanggal & jam ulang tahun (YYYY-MM-DDTHH:MM). Jika masih di masa depan,
  // halaman menampilkan hitung mundur dan kado baru bisa dibuka saat waktunya tiba.
  // Kosongkan untuk langsung bisa dibuka. Tambahkan ?preview di URL untuk melewati hitung mundur.
  tanggalUltah: "",

  // Emoji animasi (Google Noto Animated Emoji). false = pakai emoji biasa.
  emojiAnimasi: true,

  // Musik latar. Taruh file mp3 di assets/music/ lalu isi path-nya.
  // Kalau dikosongkan / file tidak ada, lagu "Happy Birthday" dimainkan otomatis (synth).
  musik: "",

  // Foto galeri 3D. Taruh file di assets/photos/ lalu tulis nama file-nya.
  // Jika file tidak ditemukan, kartu akan menampilkan placeholder elegan.
  foto: [
    { src: "assets/photos/1.jpg", caption: "Senyum favoritku" },
    { src: "assets/photos/2.jpg", caption: "Hari pertama kita" },
    { src: "assets/photos/3.jpg", caption: "Jalan-jalan sore" },
    { src: "assets/photos/4.jpg", caption: "Tawa yang tak terlupa" },
    { src: "assets/photos/5.jpg", caption: "Petualangan kecil" },
    { src: "assets/photos/6.jpg", caption: "Kamu & senja" },
    { src: "assets/photos/7.jpg", caption: "Momen random" },
    { src: "assets/photos/8.jpg", caption: "Selalu cantik" }
  ],

  // Timeline kenangan (foto opsional)
  kenangan: [
    { tanggal: "Awal Cerita", judul: "Pertama Bertemu", teks: "Hari di mana semesta mempertemukan kita, dan semuanya mulai terasa berbeda.", foto: "assets/photos/1.jpg" },
    { tanggal: "Chapter 2", judul: "Kencan Pertama", teks: "Gugup, canggung, tapi jadi salah satu hari paling indah dalam hidupku.", foto: "assets/photos/2.jpg" },
    { tanggal: "Chapter 3", judul: "Petualangan Bersama", teks: "Setiap perjalanan jadi lebih seru karena ada kamu di sampingku.", foto: "assets/photos/3.jpg" },
    { tanggal: "Hari Ini", judul: "Ulang Tahunmu", teks: "Dan hari ini aku ingin merayakan kamu — orang paling berharga buatku.", foto: "assets/photos/4.jpg" }
  ],

  // Video. Taruh file mp4 di assets/videos/ ATAU isi youtube dengan ID video YouTube.
  video: {
    src: "assets/videos/video.mp4",
    poster: "assets/photos/5.jpg",
    youtube: "" // contoh: "dQw4w9WgXcQ" (jika diisi, src diabaikan)
  },

  // Percakapan ala chat (muncul satu per satu seperti sedang mengetik)
  chat: [
    { dari: "aku", teks: "Hai sayang 👋" },
    { dari: "aku", teks: "Tau gak hari ini hari apa? 🤔" },
    { dari: "kamu", teks: "Hari apa emangnya? 🙈" },
    { dari: "aku", teks: "Hari lahirnya orang paling spesial di hidupku 🥰" },
    { dari: "aku", teks: "Aku udah siapin sesuatu buat kamu… scroll terus ya ✨" }
  ],

  // Game pecahkan balon: berapa balon yang harus dipecahkan untuk membuka pesan rahasia
  balonTarget: 10,
  pesanRahasia: "Kamu berhasil! 🎉 Hadiah rahasiamu: satu hari penuh jalan-jalan bareng aku, kamu yang pilih tempatnya 💖",

  // Kuis kecil "Seberapa kenal kamu sama kita?" (jawaban = index pilihan yang benar, mulai 0)
  kuis: [
    { tanya: "Di mana kita pertama kali bertemu?", pilihan: ["Kampus", "Kafe", "Konser", "Online"], jawaban: 1 },
    { tanya: "Makanan favorit kita berdua?", pilihan: ["Bakso", "Sushi", "Martabak", "Seblak"], jawaban: 2 },
    { tanya: "Siapa yang lebih sayang?", pilihan: ["Kamu", "Aku", "Dua-duanya", "Aku lah pokoknya"], jawaban: 3 }
  ],

  // Alasan-alasan (kartu flip)
  alasan: [
    { ikon: "✨", depan: "Senyummu", belakang: "Senyummu bisa mengubah hari terburukku jadi yang terbaik." },
    { ikon: "💖", depan: "Hatimu", belakang: "Hatimu yang tulus dan baik ke semua orang." },
    { ikon: "😍", depan: "Tawamu", belakang: "Tawamu adalah lagu favoritku yang tidak pernah bosan kudengar." },
    { ikon: "🌹", depan: "Perhatianmu", belakang: "Caramu peduli pada hal-hal kecil yang sering aku lupakan." },
    { ikon: "👑", depan: "Kekuatanmu", belakang: "Kamu kuat, bahkan saat kamu merasa tidak." },
    { ikon: "🦋", depan: "Dirimu", belakang: "Karena kamu adalah kamu — dan itu sudah lebih dari cukup." }
  ],

  // Surat (baris baru = paragraf baru)
  surat: `Selamat ulang tahun, sayangku.

Hari ini dunia merayakan hadirnya seseorang yang paling istimewa — kamu. Terima kasih sudah menjadi alasan di balik senyumku, tempatku pulang, dan warna dalam setiap hari-hariku.

Semoga di usia yang baru ini, semua mimpimu perlahan jadi nyata, semua lelahmu terbayar, dan bahagia selalu menemukan jalannya padamu.

Aku akan selalu ada di sini, merayakan setiap langkahmu.

Aku sayang kamu, hari ini dan seterusnya.`,

  // Harapan penutup
  penutup: "Semoga tahun ini menjadi tahun terbaikmu ✨"
};
