import './App.css'
import { Route, Routes } from 'react-router-dom'
import {About, Appointment, Contact, Doctor, Home, Login, MyAppointment, Profile} from './pages/index.js'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster/>
      <Navbar />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctor />} />
          <Route path='/doctors/:speciality' element={<Doctor />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/my-appointment' element={<MyAppointment />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
