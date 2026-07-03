import { motion } from "framer-motion";
import SQAC from "../../assets/LogoSQAC.png";

export default function LandingHero() {
  return (
    <section
      className="
        relative min-h-screen w-full flex items-center justify-center
        px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden
        bg-transparent
      "
    >
      {/* Blurred background circle */}
      <div
        className="
          absolute w-[500px] sm:w-[500px] md:w-[900px]
          h-[600px] sm:h-[800px] md:h-[400px]
          bg-pink-300 dark:bg-[#7A1E2C]
          opacity-20 dark:opacity-15
          rounded-full blur-3xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
        "
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: { opacity: 1, y: 0 },
        }}
        className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-10 sm:gap-14 md:gap-20 text-center lg:text-left"
      >
        {/* Left Side */}
        <div className="flex flex-col items-center lg:items-end space-y-4 mb-6">
          <motion.h1
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
            viewport={{ once: true, amount: 0.5 }}
            className="
              text-[6rem] sm:text-7xl md:text-[155px] lg:text-[100px] xl:text-[160px]
              mt-6 font-extrabold leading-tight
              bg-clip-text text-transparent
              bg-gradient-to-tr
              from-[#951D13] via-[#f34a82] to-[#F0A01F]
              dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39]
            "
          >
            SQAC
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="
              text-base sm:text-xl md:text-[2rem]
              font-semibold px-2
              text-[#bd4110] dark:text-[#F5E1C2]
            "
          >
            "Where Code Meets Quality"
          </motion.p>
        </div>

        {/* Center Logo */}
        <motion.div
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="
            w-[250px] sm:w-[220px] md:w-[370px] lg:w-[350px]
            aspect-square rounded-full
            border-[6px] sm:border-[8px]
            border-[#F18B85] dark:border-[#7A1E2C]
            bg-white/30 dark:bg-black/40
            backdrop-blur-xl shadow-2xl
            flex items-center justify-center
            hover:shadow-[0_0_40px_#F18B85]
            dark:hover:shadow-[0_0_40px_#7A1E2C]
            transition-all duration-300
          "
        >
          <img
            src={SQAC}
            alt="SQAC Logo"
            className="w-40 sm:w-36 md:w-60 lg:w-45"
          />
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-xs sm:max-w-sm md:max-w-md"
        >
          <h2
            className="
              text-3xl sm:text-4xl md:text-4xl lg:text-[44px]
              font-bold leading-tight
              bg-clip-text text-transparent
              bg-gradient-to-tr
              from-[#951D13] via-[#f34a82] to-[#F0A01F]
              dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39]
            "
          >
            Software Quality<br />Assurance Community
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
