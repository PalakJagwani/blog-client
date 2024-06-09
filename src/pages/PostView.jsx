import {useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {API} from '../api'
import homeImage from '../assets/homeimg.jpeg'
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import {Comments} from '../index';

const PostView = () => {
    const [postdata, setPostData] = useState({})
    const {id} = useParams();
    const useremail = useSelector(state => state.email)
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false);

    const deleteBlog = async() => {
            let response = await API.deletePost(postdata._id)
            console.log("Deleted")
            if(response.isSuccess){
                navigate('/')
            } 
    }

    useEffect(()=> {
        const fetchData = async() => {
            let response = await API.getPostData(id)
            if(response.isSuccess){
                setPostData(response.data.data)
            }
        }
        fetchData()
    }, [id])
    const picture = postdata.picture ? postdata.picture : homeImage
    return (
        <div className=" bg-slate-950 text-slate-200 h-screen">
            <div className ={`${toggle ? 'visible' : 'hidden'} bg-slate-400 text-red-500 text-center my-4 md:my-1 mx-5 py-3 `}>
                <p className ="my-3">Do you wish to delete the blog?</p>
                <button className ="mx-2 bg-slate-700 px-4 py-2" onClick={deleteBlog}>Yes</button>
                <button className ="mx-2 bg-slate-700 px-4 py-2" onClick = {() => setToggle(false)}>No</button>
            </div>
            <div className=' md:px-24 bg-slate-950 md:pt-24 px-4 pt-4'>
            <img src={picture} className=' w-screen md:h-[23rem] h-[13rem]' />
            {
                (useremail === postdata.email) ? <div className=' float-right py-4'>
                <span onClick={() => setToggle(true)} className=' cursor-pointer md:px-4 px-2'><i className="fa-solid fa-trash fa-lg"></i></span>
                <span className=' pr-2'><NavLink to={`/update/${postdata._id}`}><i className="fa-solid fa-pen fa-lg"></i></NavLink></span>
                </div> : <></>
            }
            </div>
            <div className=' w-full h-full bg-slate-950 md:px-24 px-4'>
            <div className=' py-4 '>
                <span className=' text-md font-normal text-slate-500 md:px-4 block md:inline'>Author : {postdata.email}</span>
                <span className=' text-md font-normal text-slate-500 md:px-4 md:float-right'>{new Date(postdata.createdDate).toDateString()}</span>
                <h1 className=' md:text-2xl py-4 font-bold text-center break-normal md:px-10 pt-8'>{postdata.title}</h1>
                <p className=' text-slate-200 break-normal pb-10'>{postdata.blogText}</p>
                <Comments post ={postdata}/>
            </div>
            </div>
        </div>
    )
}

export default PostView