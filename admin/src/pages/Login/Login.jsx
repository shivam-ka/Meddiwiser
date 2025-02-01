import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import axios from "axios"
import toast from 'react-hot-toast';
import { DoctorContext } from '../../context/DoctorContext';

const Login = () => {

  const [currentSate, setCurrentSate] = useState('admin')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('admin@meddiwiser.com')
  const [password, setPassword] = useState('meddiwiser@1234')

  const { token, setToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (currentSate === 'admin') {

        const response = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
        if (response.data.success) {
          localStorage.setItem('token', response.data.token)
          setToken(response.data.token)
          toast.success("Login Successfully")
        } else {
          toast.error(response.data.message)
        }

      } else {

        try {
          const response = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
          if (response.data.success) {
            localStorage.setItem("dToken", response.data.token)
            setDToken(response.data.token)
            console.log(dToken)
          }
        } catch (error) {
          toast.error(error.message)
        }

      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='login-page'>
      <form onSubmit={(e) => onSubmitHandler(e)} className="login-container">
        <div className="login-title">
          <h2>{currentSate == 'admin' ? "Admin Login" : "Doctor Login"}</h2>
        </div>
        <div className="login-inputs">
          <div> <p>E-Mail</p> <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required /> </div>
          <div> <p>Password</p> <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required /> </div>
        </div>

        <button type='submit' disabled={loading} className="login-btn"> {loading ? <img src={assets.loading} /> : (currentSate === 'Sign up' ? "Create Account" : "Login")} </button>
        <div className="login-toggle">
          {currentSate == 'admin' ?
            <p> Doctor Login? <span onClick={() => setCurrentSate("doctor")}>Click Here</span> </p> :
            <p> Admin Login?<span onClick={() => setCurrentSate("admin")} >Click Here </span> </p>}
        </div>
      </form>
    </div>
  )
}

export default Login