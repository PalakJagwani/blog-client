import user from '../assets/user.jpg'
import { useSelector } from 'react-redux'
import {API} from '../api'
import {useState, useEffect} from 'react'

function Comment({comment, setToggle}){
    const email = useSelector(state => state.email)
    
    const removeComment = async() => {
        const response = await API.deleteComment(comment._id)
        if(response.isSuccess){
            setToggle((prevState) => !prevState)
        }
    }
    
    return (
        <div className=' py-4'>
            <div className=' flex-col'>
                <div className=' flex '>
                <img src={user} alt="" className=' h-8 w-8 rounded-3xl' />
                <span className=' px-3 pt-1'>{comment.email}</span>
                </div>
                <div>
                <span className=' m-4 text-slate-600 my-2 md:my-0 px-7'>{new Date(comment.date).toDateString()}</span>
                {
                    email == comment.email ? <div className=' inline-block cursor-pointer float-right pr-3' onClick={()=>removeComment()}><i class="fa-solid fa-trash fa-lg"></i></div> : ""
                }
                </div>
            </div>
            <div className=' pl-10 py-2 border-slate-400 border-2 mt-2'>
                {comment.comment}
            </div>
        </div>
    )
}

export default Comment