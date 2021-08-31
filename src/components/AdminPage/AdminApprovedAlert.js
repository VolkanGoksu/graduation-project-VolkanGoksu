import React from 'react'
import {AiOutlineRollback} from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
export default function AdminApprovedAlert() {
    const history = useHistory()
  return (
    <div className="bg-green-100 rounded-md p-3 flex">
      <svg data-testid ='svg'
        className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>

      <div classNameName="text-green-700">
        <div data-testid='succesMessage' className="font-bold text-xl">Başvuruyu Güncellediniz!</div>

        <div>
            Durumu admin/basvuru-listesi sayfasından veya başvuru-sorgula sayfasından kontrol edebilirsiniz
        </div>
        <AiOutlineRollback data-testid='alertbutton' onClick={() => history.push('/admin/basvuru-listesi')} className="cursor-pointer"/>
      </div>
    </div>
  )
}
