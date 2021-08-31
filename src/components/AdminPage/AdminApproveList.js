import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import database from '../../firebase'
import { GlobalContext } from '../../context/GlobalState'
import { GoSearch } from 'react-icons/go'
export default function AdminApproveList() {
  const history = useHistory()
  const [tickets, settickets] = useState([])

  const { isAdmin } = useContext(GlobalContext)

  useEffect(async () => {
    var allTickets = await database
      .collection('tickets')
      .orderBy('timestamp', 'desc')
      .get()
    console.log(isAdmin)
    if (!isAdmin) {
      history.push('/')
      return
    }
    settickets(
      allTickets.docs.map((x) => {
        return {
          id: x.id,
          ticket: x.data(),
        
        }
      })
    )
   
  }, [])
  return (
    <div>
      {tickets.map((x) => (
        <div>
          <ul class="menu p-3 bg-base-200 rounded-xl">
            <li>
              <span data-testid ='spanHeader' class="block px-5 py-1 text-xs text-gray-400 font-bold">
                Başvuru Listesi
              </span>
            </li>
            <li>
              <a class="block px-5 py-3 rounded-lg text-gray-900 hover:bg-gray-200 focus:bg-indigo-500 focus:text-white outline-none cursor-pointer">
                <div className="float-right ">
                  <GoSearch data-testid='alertbutton'
                    onClick={() => history.push('/admin/basvuru/' + x.id)}
                  />
                </div>
                <span className="block px-5 italic   text-l text-gray-400 font-bold">
                  Başvuru Yapan :{' '}
                  <label className="text-red-700  focus:outline-none text-l italic pt-1 leading-3 text-gray-400 ">
                  {x.ticket.ticket.firstname}
                  </label>{' '}
                </span>
                <span className="block px-5 italic   text-l text-gray-400 font-bold">
                  Başvuru Belgesi :{' '}
                  <label className="text-red-700  focus:outline-none text-l italic pt-1 leading-3 text-gray-400 ">
                    {x.id}{' '}
                  </label>{' '}
                </span>  
                <span className="block px-5 italic text-1 text-gray-400 font-bold">
                  Onay Durumu : <label className="text-red-700 focus:outline-none text-l italic pt-1 leading-3 text-gray-400">{x.ticket.ticket.statu}</label>
                </span>
              </a>
            </li>
          </ul>
        </div>
      ))}
    </div>
  )
}
