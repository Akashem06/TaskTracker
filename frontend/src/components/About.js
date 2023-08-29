import { Link } from 'react-router-dom'

const About = () => {
    return(
        <div className="absolute bottom-[16rem] left-[4rem] overflow-hidden text-center h-[30rem] w-[50rem]">
            <h1 className="text-[8rem] font-bold text-white">Task Tracker</h1>
            <p className="text-[3rem] text-slate-400">Made with Python and React</p>
            <div className="mt-[5rem]">
                <Link to="/Stats">
                    <button className="mr-[1rem] px-14 py-4 rounded-xl bg-blue-500 border-gray-700 hover:bg-sky-400 text-[3rem] font-bold text-white">Stats</button>
                </Link>
                <button className="ml-[2rem] px-14 py-4 rounded-xl bg-blue-500 border-gray-700 hover:bg-sky-400 text-[3rem] font-bold text-white">Download</button>
            </div>
        </div>
    );
}

export default About