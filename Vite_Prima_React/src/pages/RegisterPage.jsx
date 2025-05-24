/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const RegistrationCard = ({
    color,
    icon,
    title,
    description,
    linkTo,
    linkText,
    delay,
  }) => {
    const colorVariants = {
      blue: {
        gradient: "from-blue-400 to-blue-600",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
        hoverRing: "hover:ring-blue-300",
      },
      green: {
        gradient: "from-green-400 to-green-600",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        button: "bg-green-600 hover:bg-green-700",
        hoverRing: "hover:ring-green-300",
      },
      purple: {
        gradient: "from-purple-400 to-purple-600",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700",
        hoverRing: "hover:ring-purple-300",
      },
    };

    const colors = colorVariants[color] || colorVariants.blue;

    return (
      <motion.div
        variants={itemVariants}
        transition={{ duration: 0.5, delay }}
        className="h-full"
      >
        <motion.div
          whileHover={{
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          className={`bg-white rounded-xl shadow-lg overflow-hidden h-full hover:ring-4 ${colors.hoverRing} transition-all duration-300`}
        >
          <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
          <div className="p-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center mb-6 mx-auto`}
            >
              <div className={colors.iconColor}>{icon}</div>
            </motion.div>

            <h3 className="mb-3 text-xl font-bold text-center text-gray-800">
              {title}
            </h3>

            <p className="mb-8 text-center text-gray-600">{description}</p>

            <div className="text-center">
              <Link to={linkTo}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full ${colors.button} text-white py-3 px-6 rounded-full font-medium shadow-md hover:shadow-lg transition-all`}
                >
                  {linkText}
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen py-20 overflow-hidden bg-gray-50">
      <div className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-blue-100/30 blur-3xl"></div>
      <div className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 blur-3xl"></div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Portal Pendaftaran
            </h1>
            <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-sky-500"></div>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Silakan pilih jenis pendaftaran yang sesuai dengan kebutuhan Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            <RegistrationCard
              color="blue"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              }
              title="Pendaftaran Guru"
              description="Daftar sebagai tenaga pengajar di institusi kami dan jadilah bagian dari tim pendidik profesional kami"
              linkTo="/register/guru"
              linkText="Daftar Sebagai Guru"
              delay={0.1}
            />

            <RegistrationCard
              color="green"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              title="Pendaftaran Siswa"
              description="Daftar sebagai siswa baru di institusi kami dan mulai perjalanan pendidikan Anda bersama kami"
              linkTo="/register/siswa"
              linkText="Daftar Sebagai Siswa"
              delay={0.2}
            />

            <RegistrationCard
              color="purple"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Pendaftaran Staf"
              description="Bergabunglah dengan tim administrasi dan staf pendukung kami untuk membangun institusi yang lebih baik"
              linkTo="/register/staf"
              linkText="Daftar Sebagai Staf"
              delay={0.3}
            />
          </div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Link to="/">
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
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
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
