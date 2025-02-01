import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {

  const { token, setToken, backendUrl, navigate } = useContext(AppContext)

  const [currentSate, setCurrentSate] = useState('Sign up')
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (currentSate === 'Sign up') {

        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (response.data.success) {
          localStorage.setItem('token', response.data.token)
          setToken(response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (response.data.success) {
          localStorage.setItem('token', response.data.token)
          setToken(response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


  return (
    <div className='login-page'>
      <form onSubmit={(e) => onSubmitHandler(e)} className="login-container">
        <div className="login-title">
          <h2>{currentSate == 'Sign up' ? "Create Account" : "Login"}</h2>
        </div>
        <div className="login-inputs">
          {currentSate === 'Sign up' ? <div> <p>Full Name</p> <input onChange={(e) => setName(e.target.value)} value={name} type="text" required /></div> : <></>}

          <div> <p>E-Mail</p> <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required /> </div>
          <div> <p>Password</p> <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required /> </div>

        </div>
        <button type='submit' disabled={loading} className="login-btn"> {loading ? <img src={assets.loading} /> : (currentSate === 'Sign up' ? "Create Account" : "Login")} </button>
        <div className="login-toggle">
          {currentSate == 'Sign up' ?
            <p> Already Have An Account ? <span onClick={() => setCurrentSate("Login")}>Login</span> </p> :
            <p> New To App ? <span onClick={() => setCurrentSate("Sign up")} >Create Account   </span> </p>}
        </div>
      </form>
    </div>
  )
}

export default Login