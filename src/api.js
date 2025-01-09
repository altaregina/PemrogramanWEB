import axios from "axios";

// Ganti URL ini dengan URL endpoint API Anda
const API_URL = "http://localhost:5001/contacts"; // Pastikan port sesuai dengan backend

// Membuat instance Axios
const api = axios.create({
    baseURL: API_URL,
});

// Fungsi CRUD
export const getContacts = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const addContact = async (data) => {
  try {
    const response = await api.post("/", data); // Kirim data ke endpoint yang benar
    return response.data;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error; // Lempar error agar bisa ditangkap di komponen
  }
};

export const updateContact = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

export default api;