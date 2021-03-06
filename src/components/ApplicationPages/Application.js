import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import database from '../../firebase/firebase'

export default function Application() {
  const [values, setvalues] = useState({})

  const { id } = useParams()

  useEffect(async () => {
    var tickets = await database
      .collection('tickets')
      .orderBy('timestamp', 'desc')
      .get()
    var selectedTicket = tickets.docs
      .map((doc) => ({ id: doc.id, data: doc.data() }))
      .find((t) => t.id == id)
    setvalues(selectedTicket)
  }, [])

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="md:w-96 rounded-md shadow-lg py-4 px-5 w-full bg-white dark:bg-gray-800">
        <h2 data-testid='applicationTitle'
          tabindex="0"
          className="focus:outline-none text-xs leading-3 text-gray-600 dark:text-gray-100"
        >
          Sorgu Bilgisi
        </h2>
        <div className="pt-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span
                tabindex="0"
                className="focus:outline-none text-purple-400 text-xs italic font-normal pl-1"
              >
                {values?.data?.ticket?.firstname}
                {values?.data?.ticket?.lastName}
              </span>{' '}
              <br />
            </div>
          </div>
          <p
            tabindex="0"
            className="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
            <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">
              Email: {values?.data?.ticket?.email}
            </label>
          </p>

        
          <p
            tabindex="0"
            className="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
            <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">
              TC No: {values?.data?.ticket?.idNo}
            </label>
          </p>
          <p
            tabindex="0"
            className="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
            <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">
              Ya??: {values?.data?.ticket?.age}
            </label>
          </p>
          <p
            tabindex="0"
            className="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
            <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">
              A????klama: {values?.data?.ticket?.description}
            </label>
          </p>
          <p
            tabindex="0"
            className="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
            <label className=" text-purple-400  focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">
              Adres: {values?.data?.ticket?.address}
            </label>
          </p>
          <div className="flex items-center justify-left">
            <div
              tabindex="0"
              className="focus:outline-none text-green-700 bg-green-100 py-1 px-2 rounded text-xs leading-3 mt-2"
            >
               Belge Numaran??z: {values?.id}
            </div>
          </div>
          <div className="flex items-center justify-right">
            <div
              tabindex="0"
              className={
                values?.data?.ticket?.statu === 'unapproved'
                  ? 'focus:outline-none text-red-700 bg-red-100 py-1 px-2 rounded text-xs leading-3 mt-2'
                  : 'focus:outline-none text-green-700 bg-green-100 py-1 px-2 rounded text-xs leading-3 mt-2'
              }
            >
              Durum: {values?.data?.ticket?.statu}
            </div>
          </div>

          <div className="flex items-center justify-right">
            <div
              tabindex="0"
              className={
                values?.data?.ticket?.statu === 'unapproved'
                  ? 'focus:outline-none text-red-700 bg-red-100 py-1 px-2 rounded text-xs leading-3 mt-2'
                  : 'focus:outline-none text-green-700 bg-green-100 py-1 px-2 rounded text-xs leading-3 mt-2'
              }
            >
              Cevap: {values?.data?.ticket?.approveAnswer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
