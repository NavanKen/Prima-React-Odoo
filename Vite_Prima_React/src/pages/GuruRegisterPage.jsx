/* eslint-disable no-unused-vars */
import { useState, useEffect, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerGuru } from "../api/odoo";
import FormInput from "../components/FormInput";

const GuruRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    tanggal_lahir: "",
    umur: "",
    jenis_kelamin: "",
    jurusan: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (formData.tanggal_lahir) {
      const birthDate = new Date(formData.tanggal_lahir);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (formData.umur !== age.toString()) {
        setFormData((prevData) => ({ ...prevData, umur: age.toString() }));
      }
    }
  }, [formData.tanggal_lahir, formData.umur]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Kirim data ke API Odoo
        const result = await registerGuru(formData);

        if (result.success) {
          console.log("Pendaftaran berhasil:", result.data);
          // Navigasi ke halaman sukses
          navigate("/register/success", {
            state: { type: "guru", name: formData.name },
          });
        } else {
          // Navigasi ke halaman error jika gagal
          navigate("/register/error", {
            state: { error: result.error, type: "guru" },
          });
        }
      } catch (error) {
        console.error("Error saat mendaftar:", error);
        // Navigasi ke halaman error jika terjadi exception
        navigate("/register/error", {
          state: {
            error: "Terjadi kesalahan saat menghubungi server",
            type: "guru",
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-16 mt-5 overflow-hidden bg-gray-50">
      <div className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-blue-100/30 blur-3xl"></div>
      <div className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 blur-3xl"></div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="overflow-hidden bg-white shadow-xl rounded-xl"
          >
            <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="p-8">
              <motion.div variants={itemVariants} className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">
                  Pendaftaran Guru
                </h1>
                <p className="text-gray-600">
                  Isi formulir di bawah ini untuk mendaftar sebagai guru
                </p>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Nama"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required={true}
                  errors={errors}
                />
                <FormInput
                  label="NIP"
                  type="text"
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  placeholder="Masukkan NIP"
                  errors={errors}
                />
                <FormInput
                  label="Tanggal Lahir"
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  errors={errors}
                />
                <FormInput
                  label="Umur"
                  type="number"
                  name="umur"
                  value={formData.umur}
                  onChange={handleChange}
                  placeholder="Umur akan dihitung otomatis dari tanggal lahir"
                  readOnly={true}
                  errors={errors}
                />
                <FormInput
                  label="Jenis Kelamin"
                  type="select"
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Pilih Jenis Kelamin" },
                    { value: "laki", label: "Laki-laki" },
                    { value: "perempuan", label: "Perempuan" },
                  ]}
                  errors={errors}
                />
                <FormInput
                  label="Jurusan"
                  type="text"
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  placeholder="Masukkan jurusan"
                  errors={errors}
                />
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center justify-between gap-4 mt-10 sm:flex-row"
                >
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.02, x: -5 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="flex items-center justify-center w-full px-6 py-3 text-blue-600 transition-all border border-blue-600 rounded-full sm:w-auto hover:bg-blue-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Kembali
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center justify-center w-full px-8 py-3 text-white transition-all rounded-full shadow-md sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-2 -ml-1 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        Daftar
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuruRegisterPage;
