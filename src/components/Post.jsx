import homeImage from '../assets/homeimg.jpeg'

function Post({post}){
    const picture = post.picture ? post.picture : homeImage

    return(
        <div className='p-6 flex flex-wrap justify-center'>
        <div className=' text-slate-200 shadow-md shadow-slate-500 md:w-72 w-80 bg-transparent p-3 inline-block h-[20rem] overflow-hidden'>
            <img src={picture} alt="" className ="h-[50%] w-[90%] block mx-auto"/>
            <span className=' text-center block text-slate-500 py-1'>{post.categories}</span>
            <h2 className = 'font-medium py-1 truncate'>Title - {post.title}</h2>
            <p className=' truncate'>Blog - {post.blogText}</p>
            <h3 className=' pt-2 text-slate-400 font-thin'>Email : {post.email}</h3>
            <p className=' pt-2 text-slate-400 font-thin'>Uploaded On : {new Date(post.createdDate).toDateString()}</p>
        </div>
        </div>
    )
}

export default Post