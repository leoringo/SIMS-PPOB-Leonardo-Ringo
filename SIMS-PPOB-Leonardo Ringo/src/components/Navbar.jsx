import '../styles/navbar.css'
import Logo from '../assets/Logo.png'
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div>
                <NavLink to={"/"} className="navbar-logo">
                    <img src={Logo} alt="logo.png" />
                    <p>SIMS PPOB</p>
                </NavLink>
            </div>
            <div className="navbar-menu">
                <NavLink to={"/top-up"} className={({ isActive }) => isActive ? "menu-active" : ""}>Top Up</NavLink>
                <NavLink to={"/transaction"} className={({ isActive }) => isActive ? "menu-active" : ""} >Transaction</NavLink>
                <NavLink to={"/profile"} className={({ isActive }) => isActive ? "menu-active" : ""}>Akun</NavLink>
            </div>
        </nav>
    )
}

export default Navbar