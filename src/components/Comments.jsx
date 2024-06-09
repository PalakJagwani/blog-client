import { useEffect, useState } from 'react'
import user from '../assets/user.jpg'
import {useSelector} from 'react-redux'
import {API} from '../api'
import {Comment} from '../index'

const initialState = {
    email : "",
    comment : "",
    date : new Date(),
    postId : ""
}

function Comments({post}){
    const email = useSelector(state => state.email)
    const [comment, setComment] = useState(initialState)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false);

    const handleValues = (e) => {
        console.log(post._id)
        setComment({
            ...comment,
            email : email,
            comment : e.target.value,
            postId : post._id
        })
    }

    useEffect(()=>{
        const getData = async() => {
            const response = await API.getAllComments(post._id)
            if(response.isSuccess){
                setComments(response.data.data)
            }
        }
        getData()
    }, [post, toggle])

    const mySubmit = async (e) => {
        e.preventDefault();
        const response = await API.newComment(comment)
        if(response.isSuccess){
            setComment(initialState)
            setToggle((prevstate) => !prevstate);
        }
    }

    return(
        <div>
            <div className=' flex '>
                <img src={user} alt="" className=' h-10 w-10 rounded-3xl my-2'/>
                <form className=' flex'>
                    <textarea name="comment" id="" cols="150" rows="1" placeholder='Enter your comment...' className=' bg-slate-700 p-2 m-2 md:w-[100%] w-[80%]'
                    value={comment.comment}
                    onChange={(e) => handleValues(e)}
                    ></textarea>
                    <button className=' px-5 bg-slate-400 text-black my-2' onClick={(e) => mySubmit(e)}>Post</button>
                </form>
            </div>
            <hr className=' border-slate-200 m-9'/>
            <div className=' h-full bg-slate-950'>
                {
                    comments && comments.length > 0 && comments.slice(0).reverse().map(comment => (
                        <Comment comment = {comment} setToggle = {setToggle} key={comment._id}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Comments