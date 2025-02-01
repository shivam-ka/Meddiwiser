import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import { AdminContext } from '../../../context/AdminContext'
import { assets } from '../../../assets/assets'
import { AppContext } from '../../../context/AppContext'

const Dashboard = () => {

  const { getDashData, token, cancelAppointment, dashData, navigate, currency, loading } = useContext(AdminContext);
  const { calculateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    getDashData()
  }, [token])


  return dashData && (

    <>
      {loading ? <div className="page-loading">
        <img src={assets.page_loading} alt="" />
      </div>
        :
        <div>
          <div className="dashboard-data">
            <div onClick={() => navigate('/doctorsList')} className='data'>
              <img src={assets.doctor_icon} alt="" />
              <div>
                <p className='doctors-list-number'>{dashData.doctors}</p>
                <p>Doctors</p>
              </div>

            </div>


            <div onClick={() => navigate('/all-appointment')} className='data'>
              <img src={assets.appointments_icon} alt="" />
              <div>
                <p className='doctors-list-number'>{dashData.appointment}</p>
                <p>Appointments</p>
              </div>

            </div>

            <div className='data'>
              <img src={assets.patients_icon} alt="" />
              <div>
                <p className='doctors-list-number'>{dashData.users}</p>
                <p>Users</p>
              </div>

            </div>

          </div>

          <div className="latest-appointment-container">
            <h3 className="title">Latest Appointment</h3>
            <div className='latest-appointment'>
              {dashData.latestAppointments.map((item, index) => {
                return <div key={index} className='appointment'>
                  <div className='patient-details' >
                    <p>#{index + 1}</p>
                    <img className='patient-image' src={item.userData.image} />
                    <div className='patient-detail'>
                      <p> <span>Name -</span>  {item.userData.name}</p>
                      <p> <span>Age - </span>  {calculateAge(item.userData.dob)}</p>
                      <p> <span>Date - </span>  {slotDateFormate(item.slotDate)}</p>
                      <p> <span>Time - </span>  {item.slotTime}</p>
                    </div>
                  </div>

                  <div className='doc-details'>
                    <img className='doc-image' src={item.docData.image} />
                    <div className='doctor-detail'>
                      <p>{item.docData.name}</p>
                    </div>
                  </div>

                  <p> {currency} {item.amount}</p>
                  {
                    item.cancelled ?
                      <button>Cancelled</button>
                      :
                      <button onClick={() => cancelAppointment(item._id)}>Cancel</button>
                  }

                </div>
              })}
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default Dashboard