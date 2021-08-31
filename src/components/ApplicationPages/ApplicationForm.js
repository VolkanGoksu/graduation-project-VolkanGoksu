import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import database from '../../firebase'
import firebase from 'firebase'
import { Link, useHistory } from 'react-router-dom'

export default function ApplicationForm() {
  const history = useHistory()

  const [input, setinput] = useState('')
  const [values, setvalues] = useState({})
  useEffect(() => {
    database.collection('tickets').onSnapshot(
      (snapshop) =>
        setvalues(
          snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      // {values.map(item=>(<ul><li>{item.data.ticket}</li></ul>))}
    )
  }, [])

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Lütfen isimizi giriniz.'),
    lastName: Yup.string().required('Lütfen soyisminizi giriniz.'),
    age: Yup.number()
      .positive()
      .integer()
      .required('Lütfen yaşınızı giriniz')
      .typeError('Lütfen yaşınızı giriniz')
      .min(18, 'En az 18 yaşında olmalısın')
      .max(99, 'En fazla 99 yaşında olmalısın'),
    email: Yup.string()
      .required('Lütfen e-postanızı giriniz.')
      .email('Geçersiz e-posta'),
    idNo: Yup.string()
      .min(11, 'Kimlik Numaranız 11 hane olmalı')
      .max(11, 'Kimlik Numaranız 11 hane olmalı')
      .required('Lütfen TC No girinizç'),

    description: Yup.string().required('Lütfen açıklamanızı yazınız.'),
    address: Yup.string().required('Lütfen adresinizi giriniz.'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data) {
    console.log(data)

    // console.log(data.doc.id)
    database
      .collection('tickets')
      .add({
        ticket: {
          // id: data.doc.id,
          firstname: data.firstName,
          lastName: data.lastName,
          email: data.email,
          idNo: data.idNo,
          age: data.age,
          // dob: data.dob,
          description: data.description,
          address: data.address,
        },
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        if (res.id) {
          history.push('/basvuru-basarili/' + res.id)
        }
        console.log(res.id)
      })
  }

  console.log(values)
  // console.log(values.map((val) => val.id))
  return (
    <div className="card m-3">
      <h5 className="text-gray-600 font-medium text-center">
        Application Form
      </h5>
      <div className="card-body">
        <form
          className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
          onSubmit={handleSubmit(onSubmit)}
          value={input}
        >
          <div className="form-row">
            <div className="form-group col-5">
              <label className="text-gray-600 font-medium">İsim</label>
              <input
                className="border-solid border-gray-300 border py-2 px-4 w-full
              rounded text-gray-700"
                type="text"
                // value={input}

                onChange={(e) => setinput(e.target.value)}
                {...register('firstName')}
              />

              <div className="mb-3 text-normal text-red-500">
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>
            </div>
            <div className="form-group col-5">
              <label className="text-gray-600 font-medium">Soyisim</label>
              <input
                name="lastName"
                type="text"
                onChange={(e) => setinput(e.target.value)}
                {...register('lastName')}
                className={`border-solid border-gray-300 border py-2 px-4 w-full
                rounded text-gray-700 ${errors.lastName ? 'is-invalid' : ''}`}
              />
              <div className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.lastName?.message}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-gray-600 font-medium">E-Posta</label>
              <input
                name="email"
                type="text"
                onChange={(e) => setinput(e.target.value)}
                {...register('email')}
                className={`border-solid border-gray-300 border py-2 px-4 w-full
              rounded text-gray-700 form-control${
                errors.email ? 'is-invalid' : ''
              }`}
              />
              <div className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.email?.message}
              </div>
            </div>
            <div className="form-group col">
              <label className="text-gray-600 font-medium">
                T.C. Kimlik No
              </label>
              <input
                name="idNo"
                type="string"
                onChange={(e) => setinput(e.target.value)}
                {...register('idNo')}
                className={`border-solid border-gray-300 border py-2 px-4 w-full
              rounded text-gray-700 form-control ${
                errors.idNo ? 'is-invalid' : ''
              }`}
              />
              <div className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.idNo?.message}
              </div>
            </div>
            <div className="form-group col">
              <label className="text-gray-600 font-medium">Yaşınız</label>
              <input
                name="age"
                type="string"
                className="border-solid border-gray-300 border py-2 px-4 w-full
              rounded text-gray-700 form-control"
                onChange={(e) => setinput(e.target.value)}
                {...register('age')}
              />
              <div className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.age?.message}
              </div>
            </div>

            <label className="text-gray-600 font-medium block mt-4">
              Açıklama
            </label>
            <textarea
              name="description"
              onChange={(e) => setinput(e.target.value)}
              type="text"
              {...register('description')}
              className={`border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700 form-control ${
              errors.description ? 'is-invalid' : ''
            }`}
            />
            <div className="mb-3 text-normal text-red-500 invalid-feedback">
              {errors.description?.message}
            </div>
          </div>
          <div className="form-group col">
            <label className="text-gray-600 font-medium block mt-4">
              Adres Bilgisi
            </label>
            <textarea
              name=" address"
              type="text"
              onChange={(e) => setinput(e.target.value)}
              {...register('address')}
              className={`border-solid border-gray-300 border py-2 px-4 w-full
            rounded text-gray-700 form-control ${
              errors.address ? 'is-invalid' : ''
            }`}
            />
            <div className="mb-3 text-normal text-red-500 invalid-feedback">
              {errors.address?.message}
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className=" mt-4 bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
            >
              Send
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="mt-4 bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
