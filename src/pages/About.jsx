// About.jsx
import { useState, useEffect } from "react";
import { getContacts, updateContact, deleteContact } from "../api";

export default function About() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error("Data yang diterima bukan array:", data);
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts(); // Panggil saat komponen dimuat
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentContact(null);
  };

  const handleUpdate = async (updatedContact) => {
    try {
      await updateContact(updatedContact.id, updatedContact);
      setContacts(contacts.map((contact) => 
        contact.id === updatedContact.id ? updatedContact : contact
      ));
      handleCloseModal();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const Modal = ({ contact, onClose, onSave }) => {
    const [formData, setFormData] = useState(contact);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-900 p-6 rounded-lg shadow-md border-2 border-blue-500 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Edit Kontak</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">NPM</label>
              <input
                type="text"
                name="npm"
                value={formData.npm}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Kelas</label>
              <input
                type="text"
                name="kelas"
                value={formData.kelas}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Alamat</label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white shadow-md rounded-lg border-2 border-blue-500">
      <h1 className="text-2xl font-bold text-center mb-6 neon-text">Daftar Kontak</h1>
      <table className="w-full border-collapse border border-gray-700 text-sm">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 px-4 py-2 text-left">Nama</th>
            <th className="border border-gray-700 px-4 py-2 text-left">NPM</th>
            <th className="border border-gray-700 px-4 py-2 text-left">Kelas</th>
            <th className="border border-gray-700 px-4 py-2 text-left">Alamat</th>
            <th className="border border-gray-700 px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="even:bg-gray-800 hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2">{contact.nama}</td>
              <td className="border border-gray-700 px-4 py-2">{contact.npm}</td>
              <td className="border border-gray-700 px-4 py-2">{contact.kelas}</td>
              <td className="border border-gray-700 px-4 py-2">{contact.alamat}</td>
              <td className="border border-gray-700 px-4 py-2 text-center">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tampilkan modal jika showModal true */}
      {showModal && (
        <Modal
          contact={currentContact}
          onClose={handleCloseModal}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
