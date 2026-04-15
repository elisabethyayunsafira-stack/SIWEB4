# SIWEB Task Workspace

Workspace ini dipakai untuk:

- mengekspor setiap halaman `SIWEB.pdf` menjadi gambar PNG,
- menyimpan hasilnya di `public/reference/pages/`,
- menampilkan galeri hasil ekstraksi memakai Next.js + TypeScript + CSS.

## Menjalankan

```bash
pnpm install
pnpm extract:pages
pnpm dev
```

Lalu buka `http://localhost:3000`.

## Override Lokasi PDF

Secara default script membaca:

```text
C:\Users\ADVAN WORKPLUS\Downloads\SIWEB.pdf
```

Kalau perlu ganti, pakai environment variable `SOURCE_PDF`.

Contoh PowerShell:

```powershell
$env:SOURCE_PDF="D:\folder-lain\SIWEB.pdf"
pnpm extract:pages
```

## Output

Setelah ekstraksi berhasil, folder berikut akan terisi:

```text
public/reference/pages/
```

Isinya:

- `page-01.png` sampai `page-10.png`
- `manifest.json`
