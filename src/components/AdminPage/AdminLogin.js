import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import database from '../../firebase/firebase'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import LoginSchema from '../../schema/LoginSchema'

export default function Login() {
  // const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })
  const [loginInfo, setLoginInfo] = useState('')

  const history = useHistory()
  const { authAdmin } = useContext(GlobalContext)
  const login = async (data) => {
    var admin = await database
      .collection('admins')
      .where('username', '==', loginInfo.username)
      .get()
    if (
      admin &&
      admin.docs.length &&
      admin.docs[0].data().password == loginInfo.password
    ) {
      authAdmin(true)
      history.push('/admin/basvuru-listesi')
    } else {
      // alert('giriş başarısız')
    }
  }
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  return (
    <div class="w-full h-screen flex flex-col-reveresed">
      <img
        data-testid="img"
        src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        alt="background"
        class="object-cover object-center h-screen w-7/12"
      />

      <div class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg">
        <h1
          data-testid="loginHeader"
          class="text-3xl font-bold text-blue-500 mb-2"
        >
          LOGIN
        </h1>

        <form
          className="w-full max-w-lg  py-10 mt-10 px-10 border"
          onSubmit={handleSubmit(login)}
        >
          <input
            data-testid="username"
            className="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            type="text"
            name="username"
            placeholder="username"
            {...register('username')}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          />

          <div className="mb-3 text-normal text-red-500">
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <input
            data-testid='password'
            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            type="password"
            name="password"
            placeholder="password"
            {...register('password')}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />

          <div className="mb-3 text-normal text-red-500">
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button
            data-testid="loginbutton"
            type="submit"
            className=" mt-4 bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
          >
            Giriş
          </button>
        </form>
      </div>
    </div>
  )
}
