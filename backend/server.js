const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
    host: "localhost", // Ganti dengan host MySQL Anda
    user: "root",      // Username MySQL (default: root)
    password: "",      // Password MySQL (kosongkan jika tidak ada password)
    database: "crud_db", // Nama database Anda
});

// Cek koneksi
db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal:", err);
    } else {
        console.log("Berhasil terhubung ke database.");
    }
});

// Route: Ambil semua kontak
app.get("/contacts", (req, res) => {
    const query = "SELECT * FROM contacts";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Gagal mengambil data", details: err.message });
        } else {
            res.json(results);
        }
    });
});

// Route: Tambah kontak baru
app.post("/contacts", (req, res) => {
    const { nama, npm, kelas, alamat } = req.body;

    // Validasi data
    if (!nama || !npm || !kelas || !alamat) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const query = "INSERT INTO contacts (nama, npm, kelas, alamat) VALUES (?, ?, ?, ?)";
    db.query(query, [nama, npm, kelas, alamat], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Gagal menambahkan data", details: err.message });
        } else {
            res.json({ message: "Kontak berhasil ditambahkan", id: results.insertId });
        }
    });
});

// Route: Update kontak
app.put("/contacts/:id", (req, res) => {
    const { id } = req.params;
    const { nama, npm, kelas, alamat } = req.body; // Ganti "name" menjadi "nama"
    const query = "UPDATE contacts SET nama = ?, npm = ?, kelas = ?, alamat = ? WHERE id = ?";
    db.query(query, [nama, npm, kelas, alamat, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Gagal mengupdate data", details: err.message });
        } else {
            res.json({ message: "Kontak berhasil diupdate" });
        }
    });
});

// Route: Hapus kontak
app.delete("/contacts/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM contacts WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Gagal menghapus data", details: err.message });
        } else {
            res.json({ message: "Kontak berhasil dihapus" });
        }
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});