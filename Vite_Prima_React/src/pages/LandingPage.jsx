/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeatureCard = ({
  icon,
  title,
  description,
  linkTo,
  linkText,
  color,
  index,
}) => {
  const colorVariants = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      shadow: "shadow-blue-200",
      hoverShadow: "shadow-blue-300",
      border: "border-blue-100",
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      shadow: "shadow-green-200",
      hoverShadow: "shadow-green-300",
      border: "border-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      shadow: "shadow-purple-200",
      hoverShadow: "shadow-purple-300",
      border: "border-purple-100",
    },
  };

  const colorClasses = colorVariants[color] || colorVariants.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{
          y: -10,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        className={`rounded-xl overflow-hidden shadow-lg ${colorClasses.shadow} hover:${colorClasses.hoverShadow} transition-all duration-300 h-full flex flex-col bg-white border ${colorClasses.border}`}
      >
        <div
          className={`h-2 ${
            color === "blue"
              ? "bg-gradient-to-r from-blue-400 to-blue-600"
              : color === "green"
              ? "bg-gradient-to-r from-green-400 to-green-600"
              : "bg-gradient-to-r from-purple-400 to-purple-600"
          }`}
        ></div>
        <div className="flex-grow p-8">
          <div
            className={`w-20 h-20 ${colorClasses.iconBg} rounded-full flex items-center justify-center mb-6 mx-auto`}
          >
            <div className={colorClasses.iconColor}>{icon}</div>
          </div>

          <h3 className="mb-4 text-xl font-bold text-center text-gray-800">
            {title}
          </h3>

          <p className="mb-6 text-center text-gray-600">{description}</p>

          <div className="mt-auto text-center">
            <Link to={linkTo}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 text-white rounded-full ${colorClasses.button} transition-colors shadow-md`}
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

const LandingPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative flex items-center min-h-screen pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full -top-20 -right-20 w-96 h-96 bg-blue-400/20 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-64 h-64 rounded-full top-1/3 left-1/3 bg-sky-300/20 blur-3xl"
          />
        </div>

        {/* Hero content */}
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            ref={heroRef}
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="mb-6 text-5xl font-bold text-white md:text-6xl drop-shadow-lg"
            >
              Selamat Datang di <br />
              <span className="text-yellow-300">PRIMA</span>{" "}
              <span className="text-white">ODOO</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mb-10 text-xl md:text-2xl text-white/90"
            >
              Sistem Pendaftaran Terpadu untuk Guru, Siswa, dan Staf
            </motion.p>

            <motion.div variants={fadeIn}>
              <Link to="/register">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 space-x-2 text-lg font-medium text-blue-600 transition-colors bg-white rounded-full shadow-lg hover:bg-blue-50"
                >
                  <span>Daftar Sekarang</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-1 opacity-50 bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600"></div>
        <div className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-blue-100/30 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 blur-3xl"></div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Layanan Pendaftaran
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-sky-500"></div>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
              Pilih jenis pendaftaran yang sesuai dengan kebutuhan Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-blue-600"
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
              description="Daftar sebagai tenaga pengajar di institusi kami dengan mudah dan cepat. Bergabunglah dengan tim pengajar profesional kami."
              linkTo="/register/guru"
              linkText="Daftar Guru"
              color="blue"
              index={0}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-green-600"
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
              description="Daftar sebagai siswa baru dan mulai perjalanan pendidikan Anda bersama kami. Akses ke berbagai program pendidikan berkualitas."
              linkTo="/register/siswa"
              linkText="Daftar Siswa"
              color="green"
              index={1}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-purple-600"
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
              description="Bergabunglah dengan tim administrasi dan staf pendukung kami. Jadilah bagian dari institusi yang terus berkembang."
              linkTo="/register/staf"
              linkText="Daftar Staf"
              color="purple"
              index={2}
            />
          </div>
        </div>
      </section>
      <section className="relative py-24 overflow-hidden bg-gray-50">
        <div className="absolute rounded-full -top-40 -left-40 w-80 h-80 bg-blue-100/30 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-20 -right-20 w-60 h-60 bg-indigo-100/30 blur-3xl"></div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                Tentang PRIMA ODOO
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-sky-500"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-8 overflow-hidden bg-white shadow-xl rounded-xl md:p-10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600"></div>
              <div className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-blue-50 blur-3xl"></div>

              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                PRIMA ODOO adalah sistem pendaftaran terpadu berbasis Odoo yang
                memudahkan proses pendaftaran guru, siswa, dan staf. Dengan
                antarmuka yang intuitif dan proses yang efisien, kami
                berkomitmen untuk memberikan pengalaman pendaftaran yang lancar
                dan menyenangkan.
              </p>

              <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-5 text-center rounded-lg bg-blue-50"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Cepat & Efisien
                  </h3>
                  <p className="text-gray-600">
                    Proses pendaftaran yang cepat dan efisien tanpa kerumitan
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-5 text-center rounded-lg bg-green-50"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Aman & Terpercaya
                  </h3>
                  <p className="text-gray-600">
                    Data pendaftaran Anda aman dan terlindungi dengan baik
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-5 text-center rounded-lg bg-purple-50"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Dukungan Responsif
                  </h3>
                  <p className="text-gray-600">
                    Tim dukungan kami siap membantu Anda kapan saja
                  </p>
                </motion.div>
              </div>

              <div className="mt-10 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 font-medium text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-xl"
                  >
                    <span>Mulai Pendaftaran</span>
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
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
