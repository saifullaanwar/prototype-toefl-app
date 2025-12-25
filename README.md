# 🚀 EDUVERITAS - TOEFL Prediction System

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

**EDUVERITAS** adalah aplikasi web simulasi ujian TOEFL ITP (Prototype) yang dirancang untuk membantu pengguna mengukur kemampuan bahasa Inggris mereka melalui pengerjaan soal Listening, Structure, dan Reading secara interaktif.

---

## ✨ Fitur Utama

* **🎯 Real-Time Simulation**: Pengatur waktu (Timer) otomatis yang memastikan pengalaman ujian sesuai durasi aslinya.
* **🎧 Listening Support**: Integrasi pemutar audio untuk soal-soal Listening Section.
* **📖 Reading Passages**: Tampilan bacaan yang nyaman dibaca (Eye-Friendly) dengan tipografi yang jernih.
* **🧭 Smart Navigator**: Panel navigasi soal yang interaktif untuk memantau soal yang sudah atau belum dijawab.
* **📊 Automatic Scoring**: Kalkulasi skor otomatis menggunakan konversi standar TOEFL ITP segera setelah ujian selesai.
* **📱 Responsive Design**: Tampilan yang rapi di berbagai ukuran layar (Desktop & Tablet).

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
| :--- | :--- |
| **Next.js 14** | Framework utama dengan App Router untuk performa kencang. |
| **Tailwind CSS** | Framework CSS untuk desain antarmuka yang modern dan responsif. |
| **Supabase** | Backend as a Service (BaaS) untuk database soal secara real-time. |
| **Lucide React** | Library ikon untuk navigasi yang intuitif. |
| **TypeScript** | Memastikan kode lebih aman dan bebas error logika. |

---

## 🚀 Instalasi Lokal

Ingin menjalankan project ini di komputer Anda? Ikuti langkah berikut:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/saifullaanwar/prototype-toefl-app.git](https://github.com/saifullaanwar/prototype-toefl-app.git)
    cd prototype-toefl-app
    ```

2.  **Install Library**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variable**
    Buat file bernama `.env.local` di root folder, lalu isi dengan kredensial Supabase Anda:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

4.  **Jalankan Aplikasi**
    ```bash
    npm run dev
    ```
    Buka `http://localhost:3000` di browser Anda.

---

## 👷 Architect & Developer

**SAIFUL ANWAR**
*Visionary Engineering & Digital Prototype Development*

> "Membangun sistem edukasi digital yang presisi, baris demi baris."

---

## 📄 Lisensi

Distribusi untuk keperluan portofolio dan edukasi. © 2025 **EDUVERITAS System**.