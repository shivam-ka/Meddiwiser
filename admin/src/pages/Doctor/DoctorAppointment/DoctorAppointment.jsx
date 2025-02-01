import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../../context/DoctorContext'
import './DoctorAppointment.css'
import { AppContext } from '../../../context/AppContext';
import { AdminContext } from '../../../context/AdminContext';
import { assets } from '../../../assets/assets'

const DoctorAppointment = () => {
  const { currency } = useContext(AdminContext);
  const { dToken, appointments, getAppointments, loading, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken])




  return (<>{
    loading ? <div className='page-loading' >
      <img src={assets.page_loading} alt="" />
    </div> :

      <div className='doctor-appointment' >

        <h3>All Appointments</h3>

        {appointments.map((item, index) => (
          <div key={index} className='appointment'>
            <div className='patient-details' >
              <p>#{index + 1}</p>
              <img className='patient-image' src={item.userData.image} />
              <div className='patient-detail'>
                <p> <span>Name -</span>  {item.userData.name}</p>
                <p> <span>Age - </span>  {calculateAge(item.userData.dob)}</p>
                <p> <span>Date - </span>  {slotDateFormate(item.slotDate)}</p>
                <p> <span>Time - </span>  {item.slotTime}</p>
                <p> <span>Phone - </span> <a href={`tel:+91${item.userData.phone}`}>{item.userData.phone}</a> </p>
              </div>
            </div>

            <p className='payment' style={item.payment ? { background: "#73f955", color: "#000" } : {}} > {item.payment ? "Paid" : "Unpaid"} </p>
            <p> {currency} {item.amount}</p>

            {item.isCompleted ? <button style={{ background: "#38c02c", color: 'black' }}>Completed</button> :
              (item.cancelled ? <button style={{background:"#fff", color:"red", border:"1px solid red"}} >Cancelled</button> :
                <div className='action'>
                  <button onClick={() => cancelAppointment(item._id)} >✖</button>
                  <button onClick={() => completeAppointment(item._id)} style={{ background: "#38c02c", color: 'black' }} >✔</button>
                </div>)
            }

          </div>
        ))}
      </div>
  }
  </>

  )
}

export default DoctorAppointment