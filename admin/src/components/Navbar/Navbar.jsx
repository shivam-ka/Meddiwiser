import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from "react-router-dom"
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'

const Navbar = () => {
    const { token, setToken, navigate } = useContext(AdminContext);
    const { setDToken} = useContext(DoctorContext);


    const logout = () => {
        if (token) {
            navigate('/')
            setToken('')
            localStorage.removeItem('token')
        } else {
            navigate('/')
            setDToken('')
            localStorage.removeItem('dToken')
        }
    }


    return (
        <div className='navbar'>
            <Link to={'/'} className='nav-title'>
                <img src={assets.logo} className='' alt="" />
                <h1 className='' >Meddiwiser_{token ? "Admin" : "Doctor"} </h1>
            </Link>

            <button onClick={() => logout()} >  Logout </button>
        </div>
    )
}

export default Navbar