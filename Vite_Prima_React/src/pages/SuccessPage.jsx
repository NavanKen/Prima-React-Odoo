/* eslint-disable no-unused-vars */
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const location = useLocation();
  const { type, name } = location.state || { type: "pendaftar", name: "Anda" };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getTypeInfo = () => {
    switch (type) {
      case "guru":
        return {
          label: "Guru",
          color: "blue",
          gradient: "from-blue-400 to-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        };
      case "siswa":
        return {
          label: "Siswa",
          color: "green",
          gradient: "from-green-400 to-green-600",
          buttonColor: "bg-green-600 hover:bg-green-700",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        };
      case "staf":
        return {
          label: "Staf",
          color: "purple",
          gradient: "from-purple-400 to-purple-600",
          buttonColor: "bg-purple-600 hover:bg-purple-700",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
        };
      default:
        return {
          label: "Pendaftar",
          color: "blue",
          gradient: "from-blue-400 to-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <div className="relative flex items-center justify-center min-h-screen py-12 overflow-hidden bg-gray-50">
      <div className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-blue-100/30 blur-3xl"></div>
      <div className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 blur-3xl"></div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="max-w-md mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="overflow-hidden bg-white shadow-xl rounded-xl"
            variants={itemVariants}
          >
            <div className={`h-2 bg-gradient-to-r ${typeInfo.gradient}`}></div>

            <div className="p-8 text-center">
              <motion.div
                className={`w-24 h-24 ${typeInfo.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 ${typeInfo.iconColor}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              <motion.h1
                className="mb-4 text-3xl font-bold text-gray-800"
                variants={itemVariants}
              >
                Pendaftaran Berhasil!
              </motion.h1>

              <motion.div
                className="mb-8 text-lg text-gray-600"
                variants={itemVariants}
              >
                <p>
                  Selamat <span className="font-semibold">{name}</span>,
                  pendaftaran Anda sebagai{" "}
                  <span className={`font-semibold ${typeInfo.iconColor}`}>
                    {typeInfo.label}
                  </span>{" "}
                  telah berhasil dikirim.
                </p>
                <p className="mt-2">
                  Tim kami akan memverifikasi data Anda dan akan menghubungi
                  Anda segera.
                </p>
              </motion.div>

              <motion.div
                className="p-6 mb-8 rounded-lg bg-gray-50"
                variants={itemVariants}
              >
                <p className="text-gray-700">
                  Status pendaftaran Anda saat ini:
                </p>
                <div className="flex items-center justify-center mt-2">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    <span className="w-2 h-2 mr-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    Menunggu Verifikasi
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link to="/">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-6 py-3 ${typeInfo.buttonColor} text-white rounded-full font-medium transition-all shadow-md`}
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
                    Kembali ke Beranda
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-sm text-center text-gray-500"
            variants={itemVariants}
          >
            <p>
              Butuh bantuan?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Hubungi kami
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
