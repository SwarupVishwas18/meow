import logo from '../assets/logo.png'
import Navbar from './Navbar';

function HomeHeader() {
    return (
        <div className="home-header">
            <Navbar />
            <div className="header-content">
                <div className="logo-img"><img src={logo} alt="logo" /></div>
                <div className="search-form"><input type="text" /><button>Search</button></div>
            </div>
        </div>
    )
}

export default HomeHeader;