# Website Bengkel Sunda

Sebuah website pemesanan layanan sepeda motor yang dibangun dengan **React** + **Vite** untuk frontend dan **Express** + **MongoDB** untuk backend. Website ini bertujuan digitalisasi dan memudahkan dari sisi pengguna untuk membuat booking terhadap Bengkel Sunda dengan cara yang lebih praktis.


## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal yang berikut:

- **Node.js** (v16 atau lebih tinggi)
- **npm** atau **yarn**
- **MongoDB**

## Instalasi & Pengaturan

### 1. Kloning Repositori

```bash
git clone https://github.com/yourusername/bengkel-sunda.git 
cd bengkel-sunda
```

### 2. Siapkan Backend

- Navigasikan ke direktori backend:

```bash
cd backend
```

- Instal dependensi:

```bash
npm install
```

- Buat file `.env` dan konfigurasikan variabel lingkungan:

```bash
cp .env.example .env
```

- Tambahkan yang berikut ke file `.env` Anda:

```
PORT=5002
MONGODB="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
```

### 3. Siapkan Frontend

- Navigasikan ke direktori frontend:

```bash
cd frontend
```

- Instal dependensi:

```bash
npm install
```

- Buat file `.env` untuk konfigurasi EmailJS:

```bash
cp .env.example .env
```

- Tambahkan kredensial EmailJS Anda ke `.env`:

```
VITE_SERVICE_NAME="your_service_id"
VITE_TEMPLATE_NAME="your_template_id"
VITE_CONTACT_TEMPLATE="your_contact_template_id"
VITE_PUBLIC_KEY="your_public_key"
```

## Menjalankan Aplikasi

### 1. Mulai Server Backend

- Di direktori backend, jalankan:

```bash
npm start
```

- Server backend akan dimulai di `http://localhost:5002`.

### 2. Mulai Server Pengembangan Frontend

- Di direktori frontend, jalankan:

```bash
npm run dev
```

- Frontend akan dimulai di `http://localhost:5173`.