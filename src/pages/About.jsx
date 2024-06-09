import Intro from '../assets/homeimg.jpeg'

function About(){
    return(
        <div className=" bg-slate-950 h-full text-slate-200 pb-20">
            <div>
                <div className=' p-4 md:pt-24 md:px-24'>
                    <img src={Intro} alt="" className=' w-screen md:h-[25rem] h-[13rem]'/>
                </div>
                <div className=' p-10'>
                    <span className=' block text-xl py-3'>Hello, Welcome to bloggers!</span>
                    <span className=' font-medium py-2 block'>
                    Hello! I'm Palak, a passionate student full stack developer with a love for crafting intuitive and impactful digital experiences. With a strong foundation in both front-end and back-end development, I thrive on bringing ideas to life through code.
                    </span>
                    <br />
                    <span><u>bloggers</u> is a blogging website to write blogs and read other's blogs. One can write blogs on various topics like technology, fashion, music, etc.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About