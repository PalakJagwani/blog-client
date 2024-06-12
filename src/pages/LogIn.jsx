import {NavLink, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {API} from '../api.js'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { setEmail } from '../slice.js'

function LogIn({ setUserAutentication }) {
  const {register, handleSubmit, formState : {errors}} = useForm()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mySubmitHandler = async (data) => {
    let response = await API.userLogin(data);
    if(response.isSuccess){
      setError('')
      console.log(response)
      sessionStorage.setItem('AccessToken', `Bearer ${response.data.data.accessToken}`)
      sessionStorage.setItem('RefreshToken', `Bearer ${response.data.data.refreshToken}`)
      dispatch(setEmail(response.data.data.email))
      setUserAutentication(true)
      navigate('/')
    }else if(response.isSuccess === false){
      setError(response.data.message)
      console.log(response.data.message);
    }
  }

  return (
    <div className=" w-screen h-screen bg-slate-900 grid place-content-center">
      <div className="">
        <h2 className=" font-bold text-slate-300 text-3xl text-center">Log In</h2>
        <form action="" className=" mt-10" onSubmit={handleSubmit(mySubmitHandler)}>
          <label htmlFor="email" className=" block p-1 text-slate-300 text-xl font-semibold">
            Enter Username
          </label>
          <input
            type="text"
            id="email"
            name='email'
            className=" block p-1 bg-slate-300 outline-none text-slate-900 px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-9 rounded-sm mt-1"
            {...register('email',{
              required : {value : true, message : "Email is required!"},
              pattern : {value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message : "Please enter a valid email."}
            })}
          />
          <p className=" py-1 text-red-500">{errors.email?.message}</p>
          <label htmlFor="password" className=" block p-1 text-slate-300 text-xl font-semibold mt-1">
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            className=" block p-1 text-slate-950 outline-none bg-slate-300 px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-9 rounded-sm mt-1"
            {...register('password',{
              required : {value : true, message : "Password is required!"},
              minLength : {value : 8, message : "Password should be atleast 8 characters long"},
              maxLength : {value : 10, message : "Password should be atmost 10 characters long"}
            })}
          />
          <p className=" py-1 text-red-500">{errors.password?.message}</p>
          <button 
            className=" block p-1 bg-yellow-700 text-gray-200 px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-11 rounded-lg mt-7 text-xl"
          >
            Login
          </button>
        </form>
        <div className=' text-center text-red-500 pt-2'>{error}</div>
        <div className=" mt-3">
            <span className=" text-slate-300">New to Bloggers? </span><NavLink to={'/signup'} className=" underline text-white">SignUp</NavLink>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
