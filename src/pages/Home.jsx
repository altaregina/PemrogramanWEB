import { useEffect, useState } from "react";
import { getContacts } from "../api"; // Import fungsi getContacts dari api.js

export default function Home() {
  const [contactsCount, setContactsCount] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts(); // Ambil data kontak
        setContactsCount(data.length); // Hitung jumlah kontak
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <div
        className="w-full max-w-4xl text-center py-8 mb-8 rounded-lg border-2 border-blue-500"
        style={{
          backgroundImage: "linear-gradient(to right, purple, blue)",
        }}
      >
        <h1 className="text-4xl font-bold neon-text">Praktikum Pemrograman Web</h1>
        <p className="text-lg mt-2">Futuristik Theme</p>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-400">Nama</h2>
          <p className="text-gray-300 mt-2">Alta Regina Aliyarahmah</p>
        </div>

        {/* NPM */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-red-500">
          <h2 className="text-2xl font-bold text-red-400">NPM</h2>
          <p className="text-gray-300 mt-2">50422177</p>
        </div>

        {/* Tentang Saya */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-green-500">
          <h2 className="text-2xl font-bold text-green-400">Tentang Saya</h2>
          <p className="text-gray-300 mt-2">
            Saya adalah seorang mahasiswa yang sedang mempelajari Pemrograman Web. Saya memiliki minat dalam pengembangan aplikasi web modern dengan teknologi terkini.
          </p>
        </div>

        {/* Hobi */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-400">Hobi</h2>
          <p className="text-gray-300 mt-2">
            Saya suka membaca buku teknologi, menonton film sci-fi, dan mengembangkan proyek-proyek kecil untuk meningkatkan keterampilan pemrograman saya.
          </p>
        </div>

        {/* Motto */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-400">Motto</h2>
          <p className="text-gray-300 mt-2">
            "Belajar adalah kunci untuk mencapai kesuksesan. Jangan pernah berhenti belajar!"
          </p>
        </div>

        {/* Proyek Terbaru */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-pink-500">
          <h2 className="text-2xl font-bold text-pink-400">Proyek Terbaru</h2>
          <p className="text-gray-300 mt-2">
            Saat ini, saya sedang mengerjakan proyek website portofolio menggunakan React.js dan Tailwind CSS. Proyek ini bertujuan untuk menampilkan karya-karya terbaik saya.
          </p>
        </div>

        {/* Jumlah Kontak */}
        <div className="p-6 bg-gray-900 rounded-lg border-2 border-teal-500">
          <h2 className="text-2xl font-bold text-teal-400">Jumlah Kontak</h2>
          <p className="text-gray-300 mt-2">{contactsCount} kontak tersedia.</p>
        </div>
      </div>
    </div>
  );
}