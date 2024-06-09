import { useEffect, useState } from "react"
import {API} from '../api'
import {Post} from "../index"
import { useSearchParams } from 'react-router-dom'
import { NavLink } from "react-router-dom"


function Posts(){
    const [posts, setPosts] = useState([])
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    useEffect(() => {
        const fetchPostData = async()=>{
            const response = await API.getAllPosts({category : category || ''})
            if(response.isSuccess){
                setPosts(response.data.data)
            }
        }
        fetchPostData()
    }, [category])
    return (
        <>
            {
                posts && posts.length > 0 ? posts.slice(0).reverse().map(post => (
                    <NavLink to={`/postview/${post._id}`} key={post._id}><Post post={post} /></NavLink>
                )) : <div>No posts available</div>
            }
        </>
    )
}

export default Posts