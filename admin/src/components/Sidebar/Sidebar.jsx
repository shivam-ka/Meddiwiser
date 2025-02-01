import React, { useContext } from 'react'
import './Sidebar.css'
import { AdminContext } from '../../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

const Sidebar = () => {

  const { token } = useContext(AdminContext);
  const { dToken } = useContext(AppContext);

  return (
    <div className='sidebar'>
      {
        token ? <ul>
          <NavLink to='/' > <img src={assets.home_icon} alt="" /> <p>Dashboard</p>  </NavLink>
          <NavLink to='/all-appointment' ><img src={assets.appointment_icon} alt="" /> <p>Appointments</p>  </NavLink>
          <NavLink to='/add-doctors' > <img src={assets.add_icon} alt="" /> <p>Add Doctors</p>  </NavLink>
          <NavLink to='/doctorsList' > <img src={assets.people_icon} alt="" /> <p>Doctors List</p>  </NavLink>
        </ul> :
          <ul>
            <NavLink to='/' > <img src={assets.home_icon} alt="" /> <p>Dashboard</p>  </NavLink>
            <NavLink to='/doctor-appointment' ><img src={assets.appointment_icon} alt="" /> <p>Appointments</p>  </NavLink>
            <NavLink to='/doctor-profile' > <img src={assets.people_icon} alt="" /> <p>Profile</p>  </NavLink>
          </ul>

      }

    </div>
  )
}

export default Sidebar