import { useNavigate } from "react-router-dom"

function Logout({setUserAutentication}){
    const navigate = useNavigate()
    return(
        <div className=" bg-slate-950 grid place-content-center h-screen">
            <div className=" bg-slate-500 text-slate-900 px-10 py-8 mb-20">
                <span className=" text-xl font-medium block text-center pb-6 ">Do you wish to logout?</span>
                <div className=" flex justify-evenly">
                <span className=" bg-slate-800 text-slate-200 py-1 px-6 rounded-md cursor-pointer" onClick={() => navigate(-1)}>No</span>
                <span className=" bg-slate-800 text-slate-200 py-1 px-6 rounded-md cursor-pointer" onClick={() => setUserAutentication(false)}>Yes</span>
                </div>
            </div>
        </div>
    )
}

export default Logout