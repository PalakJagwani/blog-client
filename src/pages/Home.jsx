import {categories} from '../categoryData.js'
import {NavLink, useSearchParams} from 'react-router-dom'
import {Posts} from '../index.js'
import { useState } from 'react'

function Home(){
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <div className=' grid place-content-center md:hidden pt-5'><button className=' bg-slate-500 text-black = px-4 py-2 rounded-md' onClick={() => setToggle(prev => !prev)}>Show</button></div>
            
            <div className='grid md:grid-cols-4 grid-cols-1'>
                {
                    toggle 
                    ? 
                    <div className=' bg-slate-950 w-full p-5 border-slate-200 border-r-2 md:block'> 
                    <NavLink to={`/createBlog?category=${category || ''}`} className=' bg-slate-200 rounded-md md:mb-8 md:mt-5 block text-center py-3 text-slate-950 shadow-black shadow-2xl w-full'>Create Blog</NavLink>
                    <div className=' text-slate-200 '>
                        <NavLink to={`/?category=`}><span className=' block py-3'>All Categories</span></NavLink><hr className=' border-slate-200'/>
                        {categories.map(category => ( 
                            <div key={category.id}>
                                <NavLink className=' py-3 cursor-pointer block' to={`/?category=${category.type}`}>{category.type}</NavLink>
                                <hr className=' border-slate-200'/>
                            </div>
                        ))}
                    </div>
                </div> 
                :
                <div className=' bg-slate-950 w-full p-5 border-slate-200 border-r-2 md:block hidden'> 
                    <NavLink to={`/createBlog?category=${category || ''}`} className=' bg-slate-200 rounded-md mb-8 mt-5 block text-center py-3 text-slate-950 shadow-black shadow-2xl w-full'>Create Blog</NavLink>
                    <div className=' text-slate-200 '>
                        <NavLink to={`/?category=`}><span className=' block py-3'>All Categories</span></NavLink><hr className=' border-slate-200'/>
                        {categories.map(category => ( 
                            <div key={category.id}>
                                <NavLink className=' py-3 cursor-pointer block' to={`/?category=${category.type}`}>{category.type}</NavLink>
                                <hr className=' border-slate-200'/>
                            </div>
                        ))}
                    </div>
                </div>
                }
                <div className='col-span-3 bg-slate-950 text-slate-200 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'><Posts/></div>
            </div>
        </div>
    )
}
export default Home