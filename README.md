<div align="center">

# 🚀 Prima Odoo React Integration

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/> <img src="https://img.shields.io/badge/Odoo-714B67?style=for-the-badge&logo=odoo&logoColor=white" alt="Odoo"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>

**Proyek Integrasi React dengan Odoo REST API | React and Odoo REST API Integration Project**

[🇮🇩 Bahasa Indonesia](#bahasa-indonesia) | [🇬🇧 English](#english)

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="70" height="70"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/user-attachments/assets/8c01903a-f64c-4b40-85d1-e0a051edcf4b" alt="odoo 18" width="70" height="70"/>

</div>

---

## 🇮🇩 Bahasa Indonesia

### 📝 Deskripsi

Proyek ini adalah contoh implementasi integrasi antara **React** sebagai frontend dan **Odoo** sebagai backend menggunakan REST API. Aplikasi ini merupakan sistem pendaftaran sederhana untuk Guru, Siswa, dan Staf di sekolah Prima.

### ✨ Fitur

- 🏠 Landing page yang menarik dan responsif
- 📝 Form pendaftaran untuk tiga jenis pengguna (Guru, Siswa, Staf)
- 🔄 Integrasi dengan Odoo REST API untuk penyimpanan data
- ✅ Validasi form dan penanganan error
- 📱 Tampilan responsif untuk berbagai ukuran layar
- 🎨 Desain modern dengan Tailwind CSS dan Framer Motion

### 🛠️ Teknologi yang Digunakan

- **Frontend**:

  - React (dengan Vite sebagai build tool)
  - React Router untuk navigasi
  - Axios untuk HTTP requests
  - Tailwind CSS untuk styling
  - Framer Motion untuk animasi

- **Backend**:
  - Odoo 18 dengan REST API endpoints kustom
  - Endpoints: `/api/guru/create`, `/api/siswa/create`, `/api/staf/create`

### 🚀 Cara Menjalankan Proyek

#### Prasyarat

- Node.js (v14 atau lebih baru)
- NPM atau Yarn
- Server Odoo yang berjalan di `http://localhost:8069` dengan endpoint REST API yang sudah dikonfigurasi

#### Langkah-langkah

1. **Clone repositori**

```bash
git clone https://github.com/username/prima-odoo-react.git
cd prima-odoo-react
```

2. **Install dependensi**

```bash
npm install
# atau
yarn install
```

3. **Jalankan aplikasi dalam mode development**

```bash
npm run dev
# atau
yarn dev
```

4. **Buka aplikasi di browser**

Buka `http://localhost:5173` di browser Anda.

### 📋 Keterbatasan dan Pengembangan Selanjutnya

Proyek ini masih dalam tahap pengembangan awal dan memiliki beberapa keterbatasan:

- Hanya mendukung operasi Create (belum ada Read, Update, Delete)
- Dashboard yang belum menggunakan data asli
- Belum ada sistem autentikasi dan otorisasi
- Belum ada fitur pencarian dan filter data

### 🔮 Rencana Pengembangan Kedepan

- Menambahkan operasi CRUD lengkap
- Implementasi sistem login dan autentikasi
- Dashboard admin untuk manajemen data
- Fitur pencarian dan filter data
- Integrasi dengan lebih banyak modul Odoo

---

## 🇬🇧 English

### 📝 Description

This project is an example implementation of integration between **React** as the frontend and **Odoo** as the backend using REST API. The application is a simple registration system for Teachers, Students, and Staff at Prima school.

### ✨ Features

- 🏠 Attractive and responsive landing page
- 📝 Registration forms for three types of users (Teachers, Students, Staff)
- 🔄 Integration with Odoo REST API for data storage
- ✅ Form validation and error handling
- 📱 Responsive design for various screen sizes
- 🎨 Modern design with Tailwind CSS and Framer Motion

### 🛠️ Technologies Used

- **Frontend**:

  - React (with Vite as the build tool)
  - React Router for navigation
  - Axios for HTTP requests
  - Tailwind CSS for styling
  - Framer Motion for animations

- **Backend**:
  - Odoo 18 with custom REST API endpoints
  - Endpoints: `/api/guru/create`, `/api/siswa/create`, `/api/staf/create`

### 🚀 How to Run the Project

#### Prerequisites

- Node.js (v14 or newer)
- NPM or Yarn
- Odoo server running at `http://localhost:8069` with configured REST API endpoints

#### Steps

1. **Clone the repository**

```bash
git clone https://github.com/username/prima-odoo-react.git
cd prima-odoo-react
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the application in development mode**

```bash
npm run dev
# or
yarn dev
```

4. **Open the application in your browser**

Open `http://localhost:5173` in your browser.

### 📋 Limitations and Future Development

This project is still in early development and has several limitations:

- Only supports Create operations (no Read, Update, Delete yet)
- Dashboard that does not use real data
- No search and filter features

### 🔮 Future Development Plans

- Add complete CRUD operations
- Implement login and authentication system
- Admin dashboard for data management
- Search and filter features
- Integration with more Odoo modules

---

<div align="center">

### 📸 Screenshot Preview

![Prima Odoo React App Preview](https://github-production-user-asset-6210df.s3.amazonaws.com/141917201/447237409-fe0ff8f2-8b25-4362-b237-b538dfccb64f.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250524T100611Z&X-Amz-Expires=300&X-Amz-Signature=9da6cc646544f992bbb5c4546d6379c0b05e2af18096f9677985873a8237c68a&X-Amz-SignedHeaders=host)
![Prima Odoo React App Preview](https://github-production-user-asset-6210df.s3.amazonaws.com/141917201/447237462-c4fbfdf4-aaee-4fd6-b81b-bfd3b8e54bf2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250524T100742Z&X-Amz-Expires=300&X-Amz-Signature=0508c8e7add64d829da7a6235ebcde722dc24d2133f8d24ba8dec9dadf31855f&X-Amz-SignedHeaders=host)

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

### 👨‍💻 Created by

**Naufal** (Lawang) & **Faiz** (Jember)

</div>
