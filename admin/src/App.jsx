import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { AdminContext } from './context/AdminContext'
import './App.css'
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AllApointment from './pages/Admin/AllApointment/AllApointment';
import AddDoctor from './pages/Admin/AddDoctor/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile/DoctorProfile';
import DoctorAppointment from './pages/Doctor/DoctorAppointment/DoctorAppointment';

const App = () => {
  const { token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {token || dToken ?
        <>
          <Navbar />
          <div className='app'>
            <Sidebar />
            <Routes>
              <Route path='/' element={token ? <Dashboard /> : <DoctorDashboard />} />

              {/* Admin Routs  */}
              <Route path='/all-appointment' element={<AllApointment />} />
              <Route path='/add-doctors' element={<AddDoctor />} />
              <Route path='/doctorsList' element={<DoctorsList />} />

              {/* Doctors Routs  */}
              <Route path='/doctor-profile' element={<DoctorProfile />} />
              <Route path='/doctor-appointment' element={<DoctorAppointment />} />
            </Routes>
          </div>
        </>

        :
        <div>
          <Login />
        </div>

      }
    </div>
  )
}

export default App