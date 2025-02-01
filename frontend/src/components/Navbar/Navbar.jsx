import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AppContext } from '../../context/AppContext'

const Navbar = () => {
    const { token, setToken, navigate, userData } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showProMenu, setShowProMenu] = useState(false);

    const showMenufunction = () => {
        setShowProMenu(!showProMenu)
        setShowLogout(false)
    }

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }



    return (
        <div className='navbar'>
            <Link to={'/'} className='nav-title'>
                <img src={assets.logo} className='' alt="" />
                <h1 className='' >Meddiwiser</h1>
            </Link>

            <ul style={showMenu ? { right: "0" } : { right: "-110vw" }} className='nav-menu'>
                <NavLink onClick={() => setShowMenu(false)} to='/' >Home <img className='nav-img' src={assets.arrow_right} alt="" /></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to={'doctors'} >All Doctors <img className='nav-img' src={assets.arrow_right} alt="" /></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to={'about'} >About <img className='nav-img' src={assets.arrow_right} alt="" /></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to={'/contact'} >Contact <img className='nav-img' src={assets.arrow_right} alt="" /></NavLink>
                <button>Admin Panel</button>
                <img onClick={() => setShowMenu(false)} className='menu_close' src={assets.cross_icon} alt="" />
            </ul>
            {token ?
                <div className='nav-profile'>
                    <img onClick={() => showMenufunction()} src={userData.image} alt="" />
                    <img onClick={() => showMenufunction()} className='nav-profile-dropdown' src={assets.dropdown_icon} alt="" />


                    <div style={showProMenu ? { display: 'flex' } : { display: 'none' }} className='profile-menu' >
                        <p onClick={() => (navigate('/profile'), setShowProMenu(false))}>Profile</p>
                        <p onClick={() => (navigate('/my-appointment'), setShowProMenu(false))} >My Appointment</p>
                        <p onClick={() => setShowLogout(!showLogout)}  >Logout</p>


                        <div style={showLogout ? { display: 'flex' } : { display: 'none' }} className='logout-confirm'>
                            <p>Logout Confirm ?</p>
                            <div >
                                <button onClick={() => logout()} >Yes</button>
                                <button onClick={() => setShowLogout(false)} >No</button>
                            </div>

                        </div>
                    </div>



                </div>
                :
                <button className="create-acc-btn" onClick={() => navigate('/login')}>
                    Create Account
                </button>
            }

            <img onClick={() => setShowMenu(true)} className='menu_open' src={assets.menu_icon} alt="" />
        </div>
    )
}

export default Navbar