import React from 'react'
import Navbar from '../HomePage/Navbar'
import AboutUsHero from './AboutUsHero'
import FacultyMentors from './FacultyMentors'
import DomainsSwatchBook from './DomainsSwatchBook'
import './aboutus.css'

const Aboutus = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#f3d79e] via-[#f3d8ad] to-red-300 dark:bg-black dark:bg-none overflow-x-hidden font-head aboutus-container transition-colors duration-500">
      <div className="relative z-10">
        <Navbar />
        <div>
          <AboutUsHero />
          <FacultyMentors />
          <DomainsSwatchBook />
        </div>
      </div>
    </div>
  )
}

export default Aboutus
