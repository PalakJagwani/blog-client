import { useState, useEffect } from "react";
import homeImage from "../assets/homeimg.jpeg";
import { useForm } from "react-hook-form";
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {API} from '../api.js'
import {useParams} from 'react-router-dom'

const initialPostState = {
    title : '',
    blogText : '',
    picture : '',
    email : '',
    categories : '',
    createdDate : new Date()
}

function Update() {
  const {register,handleSubmit,formState: { errors }, setValue} = useForm();
  const [post, setPost] = useState(initialPostState)
  const [file, setFile] = useState('')
  const location = useLocation()
  const url = post.picture ? post.picture : homeImage
  const navigate = useNavigate()
  const email = useSelector(state => state.email)
  const {id} = useParams()
  const [imgerr, setImgerr] = useState(false);
  const [imgsuccess, setImgsuccess] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await API.getPostData(id);
            
            if(response.isSuccess){
                setPost(response.data.data);
            }
        }
        fetchData()
    }, [])

  useEffect(()=>{
    const getImage = async ()=>{
        if(file){
            const data = new FormData()
            data.append("name", file.name)
            data.append("file", file)
            console.log(file)
            
            const response = await API.uploadFile(data)
            console.log(response)
            response ? setImgerr(false) : setImgerr(true);
            response ? setImgsuccess(true) : setImgsuccess(false);
            post.picture = response.data.data.imageUrl;
            console.log(response.data.data.imageUrl)
          }
    }
    getImage();
    post.categories = location.search?.split('=')[1] || 'General'
    post.email = email
    console.log(post.picture)
   }, [file, url.value, post.picture])  

   const mySubmit = async (data) => {
    console.log(data);
    post.title = data.title
    post.blogText = data.blogText

    let response = await API.updatePost(post)
    console.log(response)
    if(response.isSuccess){
      navigate(`/postview/${id}`)
    }
  };

  return (
    <div className=" text-slate-200 bg-slate-950 h-full pb-20">
      <div className=" md:px-28 px-4 py-4 md:pt-28">
      <div className ={`${imgsuccess ? 'visible' : 'hidden'} text-center p-5 text-green-500`}>Picture Uploaded, click on update to see the updated blog.</div>
        <div className ={`${imgerr ? 'visible' : 'hidden'} text-center p-5 text-red-500`}>Couldn't upload picture, try again later</div>
        <img src={url} className=" md:h-[23rem] w-full h-[13rem]" />
        <div>
          <form action="" onSubmit={handleSubmit(mySubmit)}>
            <div className=" flex-col">
              <div className=" flex justify-between my-2">
                <div>
                  <label htmlFor="file" className=" text-slate-200 font-bold text-2xl cursor-pointer">+</label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className=" hidden p-4"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className=" bg-slate-950 text-xl h-11 block focus-visible: outline-none w-[80vw]"
                    placeholder="Title"
                    defaultValue={post.title}
                    onChange={(e) => setValue("title", e.target.value)}
                  />
                  <p className=" py-1 text-red-500">{errors.title?.message}</p>
                </div>
                <div>
                  <button className=" bg-slate-200 text-slate-950 px-4 py-2 rounded-md">
                    Update
                  </button>
                </div>
              </div>
              <p className=" py-1 text-red-500">{errors.blogText?.message}</p>
              <textarea
                name="blogText"
                id="blogText"
                cols="30"
                className=" w-full bg-slate-950 focus-visible: outline-none"
                placeholder="Begin writing here.."
                defaultValue={post.blogText}
                rows="10"
                onChange={(e) => setValue("blogText", e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
