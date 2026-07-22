import React from 'react'
import Navbar from '../HomePage/Navbar'
import AboutUsHero from './AboutUsHero'
import DomainsSwatchBook from './DomainsSwatchBook'
import './aboutus.css'

const Aboutus = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-pink-100 to-orange-100 dark:from-[#0a0014] dark:to-black overflow-x-hidden font-head aboutus-container transition-colors duration-500">

      {/* Floating orbs background (adapted for new warm/dark aesthetic) */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-pink-300 dark:bg-[#7A1E2C] rounded-full opacity-30 dark:opacity-20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-1/4 right-20 w-72 h-72 bg-orange-300 dark:bg-[#951D13] rounded-full opacity-30 dark:opacity-20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#f3d8ad] dark:bg-[#2d1b69] rounded-full opacity-30 dark:opacity-20 blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <div>
          <AboutUsHero />
          <DomainsSwatchBook />
        </div>
      </div>
    </div>
  )
}

export default Aboutus
