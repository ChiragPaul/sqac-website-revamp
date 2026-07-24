import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TeamPic from "../../assets/SQAC_Team.jpg";

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className="
        h-screen px-4 sm:px-6 pt-4 pb-6 z-10
        flex justify-center items-center
        bg-gradient-to-b
        from-pink-200 to-orange-200
        dark:from-[#0f0a1a] dark:via-[#1b0b2e] dark:to-[#12081f]
      "
    >
      <div
        ref={ref}
        className="flex flex-col justify-center items-center text-center max-w-6xl mx-auto z-3"
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            pt-[30px] mt-11 mb-6
            text-5xl sm:text-6xl font-extrabold
            text-transparent bg-clip-text
            bg-gradient-to-r from-pink-600 to-orange-500
            dark:from-pink-400 dark:to-orange-400
            font-poppins hover:scale-105 transition-transform
          "
        >
          ABOUT US
        </motion.h1>

        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="
            w-full max-w-3xl mx-auto mt-1
            p-4 sm:p-8 rounded-3xl
            backdrop-blur-lg shadow-xl
            bg-gradient-to-tr
            from-white/40 via-orange-100/30 to-pink-100/40
            dark:from-white/5 dark:via-white/10 dark:to-white/5
            border border-orange-200 dark:border-white/10
            hover:shadow-2xl transition-all duration-300
          "
        >
          <div className="rounded-xl overflow-hidden mb-4 max-h-[45vh]">
            <img
              src="/About Us/1.jpeg"
              alt="SQAC Team"
              className="w-full max-w-[1000px] h-auto mx-auto object-cover rounded-xl shadow-lg"
            />
          </div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="
              text-sm sm:text-base leading-relaxed font-medium font-poppins
              text-orange-700
              dark:text-zinc-300
            "
          >
            At{" "}
            <strong className="text-pink-600 dark:text-pink-400 font-semibold">
              SQAC
            </strong>
            , we’re a student-led community passionate about clean code,
            real-world projects, and collaborative learning. We host hands-on
            sessions, testing workshops, and build future-ready developers.
          </motion.p>

          <motion.blockquote
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="
              mt-6 text-lg italic font-semibold text-center
              text-orange-600
              dark:text-orange-300
            "
          >
            “Where code meets perfection — and you're part of it.”
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
