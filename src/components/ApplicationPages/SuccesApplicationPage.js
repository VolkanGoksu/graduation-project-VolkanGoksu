import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import database from '../../firebase/firebase'

function SuccesApplicationPage() {
  const [values, setvalues] = useState({})
  var { id } = useParams()
  console.log(id)
  useEffect(async () => {
    var tickets2 = await database
      .collection('tickets')
      .orderBy('timestamp', 'desc')
      .get()
    var selectedTicket = tickets2.docs
      .map((doc) => ({ id: doc.id, data: doc.data() }))
      .find((t) => t.id == id)
    console.log(selectedTicket)
    setvalues(selectedTicket)
  }, [])

  console.log(values)

  return (
    <div class="flex items-center justify-center py-8 px-4">
      <div class="md:w-96 rounded-md shadow-lg py-4 px-5 w-full bg-white dark:bg-gray-800">
        <h2 data-testid='infoheader'
          tabindex="0"
           class="focus:outline-none text-xs leading-3 text-gray-600 dark:text-gray-100"
        >
          Ticket İnfo
        </h2>
        <h1 data-testid = 'infosucces'
          tabindex="0"
          class="focus:outline-none text-lg font-bold text-gray-800 dark:text-gray-100 leading-5 pt-2"
        >
          Başvurunuz başarıyla alındı
        </h1>
        <div class="pt-6 relative">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-purple-400"></div>
              <span
                tabindex="0"
                class="focus:outline-none text-purple-400 text-xs italic font-normal pl-1"
              >
                {values?.data?.ticket?.firstname}
                {values?.data?.ticket?.lastName}
              </span>{' '}
              <br />
            </div>
          </div>
          <p
            tabindex="0"
            class="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
            <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">Email: {values?.data?.ticket?.email}</label>
          </p>
          <p
            tabindex="0"
            class="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
          <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">TC No: {values?.data?.ticket?.idNo}</label>
         
          </p>
          <p
            tabindex="0"
            class="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
          <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">Yaşınız: {values?.data?.ticket?.age}</label>
           
          </p>
          <p
            tabindex="0"
            class="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
          >
          <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">Açıklama: {values?.data?.ticket?.description}</label>
          </p>
          <p
          tabindex="0"
          class="focus:outline-none text-gray-600 dark:text-gray-100 text-sm leading-none pt-2 "
        >
        <label className="focus:outline-none text-xs italic pt-1 leading-3 text-gray-400 ">Adres: {values?.data?.ticket?.address}</label>
          
  

        </p>
          <div class="flex items-center justify-left"></div>
          <div className="flex items-center justify-right">
            <div
              tabindex="0"
              class="focus:outline-none text-red-700 bg-red-100 py-1 px-2 rounded text-xs leading-3 mt-2"
            >
              Belge No: {values?.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SuccesApplicationPage
