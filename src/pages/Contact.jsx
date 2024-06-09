import Intro from '../assets/homeimg.jpeg'

function Contact(){
    return(
        <div className=" bg-slate-950 h-screen text-slate-200 md:pb-20">
            <div>
                <div className=' p-4 md:pt-24 md:px-24'>
                    <img src={Intro} alt="" className='  w-screen md:h-[25rem] h-[13rem]'/>
                </div>
                <div className=' p-10'>
                    <span className=' block text-xl py-3'>Hello, Welcome to bloggers!</span>
                    <span className=' font-medium py-2 block'>My name is Palak, I am an aspiring full stack developer.</span>
                    <br />
                    <span className=' text-slate-400 pb-2 block'>Connect with me :</span>
                    <span className=' block my-2'>E-mail : <a href="mailto:jagwanipalak02@gmail.com">jagwanipalak02@gmail.com</a></span>
                    <span className=' block my-2'>Github : <a href="https://www.linkedin.com/in/palak-jagwani-60a7bb270/">https://www.linkedin.com/in/palak-jagwani-60a7bb270/</a></span>
                    <span className=' block my-2'>Linkedin : <a href="https://github.com/PalakJagwani">https://github.com/PalakJagwani</a></span>
                </div>
            </div>
        </div>
    )
}

export default Contact