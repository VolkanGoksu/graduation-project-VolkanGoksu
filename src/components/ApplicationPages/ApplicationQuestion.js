import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import database from '../../firebase'
import { useHistory } from 'react-router-dom'

export default function ApplicationQuestion() {
  const history = useHistory()
  const validationSchema = Yup.object().shape({
    FormQuestion: Yup.string().required('Lütfen Başvuru No giriniz'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  async function onSubmit(data) {
    debugger
    var allTickets = await database
      .collection('tickets')
      .orderBy('timestamp', 'desc')
      .get()
    var selectedTicket = allTickets.docs
      .map((doc) => ({ id: doc.id, data: doc.data() }))
      .find((t) => t.id == data.FormQuestion)
    if (!selectedTicket) {
      // alert("404");
      history.push('/basvuru-notfound')
      return
    }
    history.push('/basvuru/' + selectedTicket.id)
  }

  return (
    <div className="card m-3">
      <h5 className="text-gray-600 font-medium text-center"></h5>
      <div className="card-body">
        <form data-testid='alertbutton'
          className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            <div className="form-group col-5">
              <label data-testid='applicationQuestion' className="text-gray-600 font-medium">
                Başvuru Sorgula
              </label>
              <input 
                name="FormQuestion"
                type="text"
                {...register('FormQuestion')}
                className={`border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700 ${errors.FormQuestion ? 'is-invalid' : ''}`}
              />
              <div data-testid='errorDiv' className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.FormQuestion?.message}
              </div>
            </div>
          </div>

          <div className="form-group">
            <button data-testid='applicationQuestionButton'
              type="submit"
              className=" mt-4 bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
            >
              Sorgula
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
