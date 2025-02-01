import React, { useContext } from 'react'
import "./AllApointment.css"
import { AdminContext } from '../../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';
import { assets } from '../../../assets/assets';

const AllApointment = () => {
  const { token, getAllApointment,
    appointments, currency, cancelAppointment, btnLoading } = useContext(AdminContext);
  const { calculateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (token) getAllApointment();
  }, [token])

  return (

    <>
      {btnLoading ? <div className='btn-loading'>
        <img src={assets.page_loading} alt="" />
      </div> : null}
      <div className='all-appointment'>
        {
          appointments.map((item, index) => (
            <div key={index} className='appointment'>
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
          ))
        }
      </div>
    </>
  )
}

export default AllApointment