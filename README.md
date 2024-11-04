# My Express App
Pembuatan aplikasi FUWA (Furniture Warehouse) bertujuan untuk mempermudah manajemen laporan arus barang masuk dan keluar di gudang. Proyek ini merupakan tugas akhir dalam program MSIB bersama mitra Stechoq Academy, dalam course bertajuk "Full-Stack Specialist in Industry 4.0 for Manufacturing Industry." Aplikasi ini berhasil diselesaikan dengan predikat excellent.
## Description

A simple Express.js application with JWT-based login connected to a MySQL database.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure database connection in `config/db.js`.

3. Start the application:

   ```bash
   npm start
   ```

4. Access the login page at `http://localhost:3000/login`.

## Endpoints

- `POST /api/auth/login`: Login endpoint.

## ENV structure
JWT_SECRET=
PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_DIALECT=