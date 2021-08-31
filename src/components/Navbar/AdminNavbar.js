import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'

function AdminNavbar() {
  const { isAdmin, authAdmin } = useContext(GlobalContext)
  const history = useHistory()

  function handleLogout() {
    authAdmin(false)
    history.push('/admin')
  }
  return (
    <>
      {isAdmin ? (
        <nav
          className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono
        "
          role="navigation"
        >
          <Link to="/" className="pl-8">
            Nav
          </Link>
          <div className="px-4 cursor-pointer md:hidden">
            <svg data-testid='svg'
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
            <Link to="/admin/basvuru-listesi" className="px-4">
              Başvuru Listesi
            </Link>
            <Link
              onClick={() => {
                handleLogout()
              }}
              className="px-4"
            >
              Çıkış yap
            </Link>
          </div>
        </nav>
      ) : null}
    </>
  )
}
export default AdminNavbar
