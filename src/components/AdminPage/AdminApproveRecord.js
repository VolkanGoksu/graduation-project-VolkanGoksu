import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import database from '../../firebase'

export default function AdminApproveRecord() {
  var { id } = useParams()

  const [ticket, setticket] = useState({})
  const [answer, setAnswer] = useState({})

  useEffect(async () => {
    var allTickets = await database
      .collection('tickets')
      .orderBy('timestamp', 'desc')
      .get()
    var selectedTicket = allTickets.docs
      .map((doc) => ({ id: doc.id, data: doc.data() }))
      .find((t) => t.id == id)
    if (selectedTicket) setticket(selectedTicket)
  }, [])

  async function handleApprove() {
    var oldTicket = ticket.data.ticket

    await database
      .collection('tickets')
      .doc(ticket.id)
      .update({ ticket: { ...oldTicket, statu: 'approved' } })
  }

  async function handleAnswer() {
    var oldTicket = ticket.data.ticket

    await database
      .collection('tickets')
      .doc(ticket.id)
      .update({ ticket: { ...oldTicket, approveAnswer: answer } })
  }

  return (
    <div className="card m-3">
      <h5 className="text-gray-600 font-medium text-center">
        Admin Onay Panel
      </h5>
      <div className="card-body">
        <div className="form-row w-full max-w-lg m-auto py-10 mt-10 px-10 border">
          <div className="form-group col-5">
            <label className="text-red-700  focus:outline-none text-l italic pt-1 leading-3 text-gray-400">
              Başvuru No: {id}
            </label>
            <br></br>

            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full
              rounded text-gray-700"
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              className="mt-4 bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
              onClick={() => handleAnswer()}
            >
              Cevapla
            </button>
            <button
              className="float-right mt-4 bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
              onClick={() => handleApprove()}
            >
              Başvuru Durumunu Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
// <input onChange={(e) => setAnswer(e.target.value)} type="text" />
