import React, { useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { API } from "../api.js";
import {useDispatch} from 'react-redux'
import { setEmail } from "../slice.js";

function SignUp({ setUserAutentication }){
  const {register, handleSubmit, formState : {errors}, getValues} = useForm()
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const mySubmitHandler = async (data) => {
    let email = data.email;
    let password = data.password
    let response = await API.userSignup({email, password})
    if(response.isSuccess){
      setError('');
      sessionStorage.setItem('AccessToken', `Bearer ${response.data.data.accessToken}`)
      sessionStorage.setItem('RefreshToken', `Bearer ${response.data.data.refreshToken}`)
      setUserAutentication(true)
      dispatch(setEmail(response.data.data.currentuser))
      navigate('/');
    }
    console.log(response)
  }

    return (
        <div className=" w-screen h-screen bg-slate-900 grid place-content-center">
          <div className="">
            <h2 className=" font-bold text-slate-300 text-3xl text-center">Sign Up</h2>
            <form action="" className=" mt-10" onSubmit={handleSubmit(mySubmitHandler)}>
              <label htmlFor="email" className=" block p-1 text-gray-200 text-xl">
                Enter Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className=" block p-1 bg-slate-300 outline-none text-slate-950 px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-9 rounded-sm mt-1"
                {...register('email',{
                  required : {value : true, message : "Email is required!"},
                  pattern : {value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message : "Enter a valid email"}
                })}
              />
              <p className=" py-1 text-red-500">{errors.email?.message}</p>
              <label htmlFor="password" className=" block p-1 text-gray-200 text-xl mt-1">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className=" block p-1 bg-slate-300 outline-none text-slate-900 px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-9 rounded-sm mt-1"
                {...register('password',{
                  required : {value : true, message : "Password is required!"},
                  minLength : {value : 8, message : "Password should be atleast 8 characters long"},
                  maxlength : {value : 10, message : "Password should be atmost 10 characters long"}
                })}
              />
              <p className=" py-1 text-red-500">{errors.password?.message}</p>
              <label htmlFor="password" className=" block p-1 text-slate-200 text-xl mt-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className=" block p-1 bg-slate-300 text-slate-950 outline-none px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-9 rounded-sm mt-1"
                {...register('confirmPassword',{
                  required : {value : true, message : "Confirm your Password"},
                  validate : (v) => {
                    return v === getValues('password') || "Passwords don't match"
                  }
                })}
              />
              <p className=" py-1 text-red-500">{errors.confirmPassword?.message}</p>
              <button 
                className=" block p-1 bg-yellow-700 text-gray-200 px-2 w-[20rem] md:w-[26rem] lg:w-[30rem] h-11 rounded-lg mt-7 text-xl"
              >
                SignUp
              </button>
            </form>
            <div className=' text-center text-red-500 pt-2'>{error}</div>
            <div className=" mt-3">
                <span className=" text-slate-300">Have an account? </span><NavLink to={'/login'} className=" underline text-white">Login</NavLink>
            </div>
          </div>
        </div>
      );
}

export default SignUp