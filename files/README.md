# Repository UM/MULOK (Prototype Akademik)

Prototype website interaktif untuk tugas Analisis dan Perancangan Sistem Informasi Perpustakaan.
Ini **bukan sistem resmi** Repository Universitas Negeri Malang. Seluruh data karya ilmiah adalah **data fiktif** untuk demonstrasi.

## Fitur
- Login simulasi (NIM dan kata sandi tidak diverifikasi; hanya NIM disimpan di `sessionStorage`, kata sandi tidak disimpan).
- Dashboard dengan pencarian cepat dan ringkasan koleksi.
- Pencarian berdasarkan judul, penulis, atau subjek (tidak membedakan huruf besar/kecil).
- Detail karya ilmiah dan empat kondisi akses full text: tersedia, akses terbatas (formulir permohonan simulasi), tidak tersedia, dan tautan bermasalah (dengan opsi alternatif).
- Pratinjau dokumen simulasi.
- Simulasi sesi berakhir.
- Peta User Flow berupa diagram SVG dengan node yang dapat diklik.
- Tampilan responsif untuk desktop, tablet, dan smartphone.

## Struktur folder
```
repository-um-prototype/
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    └── favicon.svg
```

## Menjalankan secara lokal
1. Buka folder proyek di VS Code.
2. Pasang ekstensi **Live Server** (Ritwick Dey).
3. Klik kanan `index.html`, pilih **Open with Live Server**.

`index.html` juga dapat dibuka langsung di browser karena tidak memerlukan server atau backend.

## Menerbitkan dengan GitHub Pages
1. Buat repositori baru di GitHub, misalnya `repository-um-prototype`.
2. Unggah **isi** folder proyek ke root repositori (`index.html` harus berada di root, bukan di dalam subfolder).
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
5. Tunggu beberapa menit. Alamat situs: `https://USERNAME.github.io/repository-um-prototype/`

Seluruh file dihubungkan dengan relative path (`./style.css`, `./script.js`, `./assets/...`), sehingga aman dipakai pada Project Site.

## Keterbatasan
Tanpa backend, permohonan akses tidak tersimpan, dan status login hilang ketika tab ditutup.
