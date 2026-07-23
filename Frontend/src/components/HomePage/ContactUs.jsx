import React, { useState } from "react";
import { motion } from "framer-motion";

// API config — loaded from environment variables
const getKey = () => import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const getEndpoint = () => import.meta.env.VITE_WEB3FORMS_URL || "https://api.web3forms.com/submit";

function ContactUs() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("access_key", getKey());

    const response = await fetch(getEndpoint(), {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccess(true);
      e.target.reset();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12
      bg-gradient-to-br
      from-cyan-200 via-purple-200 to-pink-200
      dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          backdrop-blur-md
          bg-white/30 dark:bg-zinc-900/40
          border border-white/20 dark:border-white/10
          rounded-xl p-8 max-w-md w-full
          shadow-2xl
        "
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-purple-300">
          Get in Touch
        </h2>

        {success && (
          <div className="text-green-700 dark:text-green-400 text-center mb-4">
            Thank you! Your message has been sent.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-purple-900 dark:text-purple-200 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="
                w-full px-4 py-2 rounded-lg
                border border-white/30 dark:border-white/10
                bg-white/20 dark:bg-zinc-800/50
                text-purple-900 dark:text-gray-200
                placeholder-purple-800 dark:placeholder-gray-400
                focus:outline-none focus:ring-2
                focus:ring-purple-400 dark:focus:ring-purple-500
              "
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-purple-900 dark:text-purple-200 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="
                w-full px-4 py-2 rounded-lg
                border border-white/30 dark:border-white/10
                bg-white/20 dark:bg-zinc-800/50
                text-purple-900 dark:text-gray-200
                placeholder-purple-800 dark:placeholder-gray-400
                focus:outline-none focus:ring-2
                focus:ring-purple-400 dark:focus:ring-purple-500
              "
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-purple-900 dark:text-purple-200 font-semibold mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              className="
                w-full px-4 py-2 rounded-lg
                border border-white/30 dark:border-white/10
                bg-white/20 dark:bg-zinc-800/50
                text-purple-900 dark:text-gray-200
                placeholder-purple-800 dark:placeholder-gray-400
                focus:outline-none focus:ring-2
                focus:ring-purple-400 dark:focus:ring-purple-500
              "
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="
              w-full bg-gradient-to-r
              from-purple-400 to-pink-400
              dark:from-purple-500 dark:to-pink-500
              text-white font-bold py-3 rounded-lg
              hover:scale-105 transition transform duration-300
            "
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactUs;