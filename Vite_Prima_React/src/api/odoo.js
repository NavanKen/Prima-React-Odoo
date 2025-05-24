import axios from "axios";

const api = axios.create({
  // ID
  // isi BaseURL dengan url odoo

  // EN
  // Set baseURL to your Odoo API endpoint

  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const registerGuru = async (data) => {
  try {
    const response = await api.post("/api/guru/create", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error registering guru:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat mendaftar",
    };
  }
};

export const registerSiswa = async (data) => {
  try {
    const response = await api.post("/api/siswa/create", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error registering siswa:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat mendaftar",
    };
  }
};

export const registerStaf = async (data) => {
  try {
    const response = await api.post("/api/staf/create", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error registering staf:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat mendaftar",
    };
  }
};

export default api;
