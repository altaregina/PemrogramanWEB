import { useState } from "react";
import { addContact } from "../api";

export default function Contact() {
  const [formData, setFormData] = useState({
    nama: "",
    npm: "",
    kelas: "",
    alamat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData); // Debugging
    try {
      const response = await addContact(formData);
      console.log("Response dari backend:", response); // Debugging
      alert("Kontak berhasil ditambahkan!");
      setFormData({ nama: "", npm: "", kelas: "", alamat: "" });
    } catch (error) {
      console.error("Error adding contact:", error);
      alert(`Gagal menambahkan kontak: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-md border-2 border-blue-500">
        <h1 className="text-2xl font-bold text-red-500 text-center mb-6 neon-text">Form Kontak</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nama" className="block text-gray-300 font-medium">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="masukkan nama anda"
              required
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          <div className="form-group">
            <label htmlFor="npm" className="block text-gray-300 font-medium">
              NPM
            </label>
            <input
              type="text"
              id="npm"
              name="npm"
              placeholder="masukkan npm anda"
              required
              value={formData.npm}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          <div className="form-group">
            <label htmlFor="kelas" className="block text-gray-300 font-medium">
              Kelas
            </label>
            <input
              type="text"
              id="kelas"
              name="kelas"
              placeholder="masukkan kelas anda"
              required
              value={formData.kelas}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>
          <div className="form-group">
            <label htmlFor="alamat" className="block text-gray-300 font-medium">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              placeholder="masukkan alamat anda"
              required
              value={formData.alamat}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}