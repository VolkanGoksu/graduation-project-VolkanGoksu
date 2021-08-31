import React, { useContext } from 'react'
import { Link} from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalState'


function Navbar() {
  const { isAdmin } = useContext(GlobalContext)

  return (
    <>
      {isAdmin ? null : (
        <nav
          className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono
          "
          role="navigation"
        >
          <Link to="/" className="pl-8">
            Nav
          </Link>
          <div className="px-4 cursor-pointer md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <div className="pr-8 md:block hidden">
            <Link to="/basvuru-olustur" className="px-4">
              Başvuru Oluştur
            </Link>
            <Link to="/basvuru-sorgula" className="px-4">
              Başvuru Sorgula
            </Link>
            <Link to="/admin" className="px-4">
              Giriş
            </Link>
          </div>
        </nav>
      )}
    </>
  )
}
export default Navbar
