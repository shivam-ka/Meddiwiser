import React, { useContext, useEffect } from 'react'
import './DoctorDashboard.css'
import { assets } from '../../../assets/assets'
import { DoctorContext } from '../../../context/DoctorContext'
import { AppContext } from '../../../context/AppContext'
import { AdminContext } from '../../../context/AdminContext'

const DoctorDashboard = () => {

  const { dToken, getDoctorDash, dashData, setDashData, cancelAppointment, loading } = useContext(DoctorContext);
  const { currency, navigate } = useContext(AdminContext);
  const { calculateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDoctorDash();
  }, [dToken])


  return dashData && (
    <>{loading ? <div className='page-loading'>
      <img src={assets.page_loading} />
    </div> :
      <div className='doctor-dashboard'>
        <div className="dashboard-data">
          <div className='data'>
            <img src={assets.earning_icon} alt="" />
            <div>
              <p className='doctors-list-number'>{currency} {dashData.earning}</p>
              <p>Earning</p>
            </div>

          </div>


          <div onClick={() => navigate('/doctor-appointment')} className='data'>
            <img src={assets.appointments_icon} alt="" />
            <div>
              <p className='doctors-list-number'>{dashData.appointments}</p>
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

                { item.isCompleted? <button style={{ background: "#38c02c", color: 'black' }} > Compelted </button> :
                  (item.cancelled ?
                    <button style={{background:"#fff", color:"red", border:"1px solid red"}} >Cancelled</button>
                    :
                    <button onClick={() => cancelAppointment(item._id)}>Cancel</button>)
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

export default DoctorDashboard