import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import database from '../../firebase'
import firebase from 'firebase'
import { Link, useHistory } from 'react-router-dom'


export default function ApplicationForm() {

  const history = useHistory();

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
    firstName: Yup.string().required(),
    lastName: Yup.string().required('Last name is required'),
    dob: Yup.string()
      .required('Date of Birth is required')
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        'Date of Birth must be a valid date in the format YYYY-MM-DD'
      ),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    idNo: Yup.string().min(11).max(11).required('Only 11 Number'),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data) {
    // console.log(data.doc.id)
    database.collection('tickets').add({
      ticket: {
        // id: data.doc.id,
        firstname: data.firstName,
        lastName: data.lastName,
        email: data.email,
        idNo: data.idNo,
        dob: data.dob,
        description: data.description,
        address: data.address,
      },
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(res=>{
      if(res.id){
        history.push("/basvuru-basarili/"+res.id);
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
              <label className="text-gray-600 font-medium">First Name</label>
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
              <label className="text-gray-600 font-medium">Last Name</label>
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
              <label className="text-gray-600 font-medium">Email</label>
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
              <label className="text-gray-600 font-medium">TC</label>
              <input
                name="idNo"
                type="text"
                onChange={(e) => setinput(e.target.value)}
                {...register('idNo')}
                className={`border-solid border-gray-300 border py-2 px-4 w-full
              rounded text-gray-700 form-control ${
                errors.dob ? 'is-invalid' : ''
              }`}
              />
              <div className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.idNo?.message}
              </div>
            </div>
            <div className="form-group col">
              <label className="text-gray-600 font-medium">Date of Birth</label>
              <input
                name="dob"
                type="date"
                onChange={(e) => setinput(e.target.value)}
                {...register('dob')}
                className={`border-solid border-gray-300 border py-2 px-4 w-full
                rounded text-gray-700 form-control ${
                  errors.dob ? 'is-invalid' : ''
                }`}
              />
              <div className="mb-3 text-normal text-red-500 invalid-feedback">
                {errors.dob?.message}
              </div>
            </div>
            <label className="text-gray-600 font-medium block mt-4">
              Description
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
          <div className="form-group">
            <label className="text-gray-600 font-medium block mt-4">
              Address
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
