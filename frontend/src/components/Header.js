import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <header>
            <div className="block p-8">
                <Link to="/">
                    <h1 className="relative ml-8 text-5xl font-bold text-white">Task Tracker</h1>
                </Link>
            </div>
        </header>
    );
}

export default Header