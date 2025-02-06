import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; 

import "./Styles.css";

const Header = () => {
    const { handleLogout } = useContext(AuthContext);

    return (
        <nav className="head">
            <p>AssureSeat</p>
            <div className="head">
                <Link className="link" to="/"><p className="home">Home</p></Link>
                <Link className="link" to="/login" onClick={handleLogout}><p className="home">Logout</p></Link>
            </div>
        </nav>
    );
}

export default Header;