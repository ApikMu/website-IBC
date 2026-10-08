# IKOPIN Badminton Club

Situs statis UKM IKOPIN Badminton Club. Berkas sumber tetap berada di folder
proyek; hasil untuk dipublikasikan dibuat terpisah di `dist/`.

## Build situs

Persyaratan: Node.js 18 atau lebih baru.

```sh
npm install
npm run build
```

Perintah build mengompilasi Tailwind CSS dan menyalin halaman beserta aset yang
digunakan ke `dist/`. Untuk hosting statis, unggah isi folder `dist/` sebagai
folder publik situs. Folder lingkungan Python, dependensi, dan berkas sumber
build tidak disertakan.
Konfigurasi Vercel di `vercel.json` menetapkan `dist` sebagai output directory.

Situs menggunakan `index.html` sebagai halaman induk dan 14 subfolder sebagai
halaman anak. Setiap subfolder berisi HTML serta CSS bernama sama; CSS anak
mengimpor `style.css` sebagai stylesheet induk. Interaksi dan konten
dokumentasi dirender oleh `app.js`; kelas Tailwind dikompilasi ke
`assets/css/site.css`.

```text
website_IBC/
├── index.html
├── style.css
├── pengurus/
│   ├── pengurus.html
│   └── pengurus.css
├── pendaftaran/
│   ├── pendaftaran.html
│   └── pendaftaran.css
├── turnamen_eksternal/
│   ├── turnamen_eksternal.html
│   └── turnamen_eksternal.css
├── pengukuhan/
│   ├── pengukuhan.html
│   └── pengukuhan.css
├── musyawarah_Anggota/
│   ├── musyawarah_Anggota.html
│   └── musyawarah_Anggota.css
├── bukber/
│   ├── bukber.html
│   └── bukber.css
├── gathering/
│   ├── gathering.html
│   └── gathering.css
├── latihan_rutin/
│   ├── latihan_rutin.html
│   └── latihan_rutin.css
├── persahabatan/
│   ├── persahabatan.html
│   └── persahabatan.css
├── sparing_rangking/
│   ├── sparing_rangking.html
│   └── sparing_rangking.css
├── turnamen_internal/
│   ├── turnamen_internal.html
│   └── turnamen_internal.css
├── demo_unc/
│   ├── demo_unc.html
│   └── demo_unc.css
├── anniversarry/
│   ├── anniversarry.html
│   └── anniversarry.css
└── endgrading/
    ├── endgrading.html
    └── endgrading.css
```

## Pengembangan

```sh
npm run dev
```

Perintah ini memantau berkas HTML dan memperbarui `assets/css/site.css` saat
kelas Tailwind berubah. Jalankan kembali `npm run build` sebelum membuat hasil
publikasi.

## Aset gambar

Semua gambar situs disimpan di dalam `Image/`, dikelompokkan berdasarkan
kegunaan:

```text
Image/
├── Background/
├── Dokumentasi/
├── Logo/
│   ├── Kampus/
│   └── Organisasi/
├── Struktur/
└── Tampilan/
```

Foto tersedia dalam WebP dengan versi JPEG fallback berukuran maksimal 2560 px
untuk browser lama. Halaman menggunakan elemen `<picture>` agar browser yang
mendukung WebP tetap mengunduh format yang lebih ringan.
