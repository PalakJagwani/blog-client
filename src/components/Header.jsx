import { useState } from "react"
import { NavLink } from "react-router-dom"

function Header(){
    const [toggle, setToggle] = useState(false);
    return(
        toggle 
        ?
        <div className=" bg-slate-200 text-slate-950 text-xl font-semibold">
            <div className=" md:hidden py-4">
                <span className=" px-4">bloggers</span>
                <span className="px-3 inline-block pl-52 cursor-pointer" onClick={() => setToggle(prev => !prev)}><i class="fa-solid fa-bars"></i></span>
            </div>
            <nav className="md:flex md:py-6 md:px-10 justify-between py-4">
                <NavLink className=" hidden md:inline-block">bloggers</NavLink>
                <div>
                <NavLink className="px-4  block md:inline-block" to={'/'}>Home</NavLink>
                <NavLink className="px-4  block md:inline-block" to={'/about'}>About</NavLink>
                <NavLink className="px-4  block md:inline-block" to={'/contact'}>Contact</NavLink>
                <NavLink to={'/logout'} className="px-4">Logout</NavLink>
                </div>
            </nav>
        </div>
        :
        <div className=" bg-slate-200 text-slate-950 text-xl font-semibold">
            <div className=" md:hidden py-4">
                <span className=" px-4">bloggers</span>
                <span className="px-3 inline-block pl-52 cursor-pointer" onClick={() => setToggle(prev => !prev)}><i class="fa-solid fa-bars"></i></span>
            </div>
            <nav className="md:flex md:py-6 md:px-10 justify-between py-4 hidden">
                <NavLink className=" hidden md:inline-block">bloggers</NavLink>
                <div>
                <NavLink className="px-4  block md:inline-block" to={'/'}>Home</NavLink>
                <NavLink className="px-4  block md:inline-block" to={'/about'}>About</NavLink>
                <NavLink className="px-4  block md:inline-block" to={'/contact'}>Contact</NavLink>
                <NavLink to={'/logout'} className="px-4">Logout</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Header