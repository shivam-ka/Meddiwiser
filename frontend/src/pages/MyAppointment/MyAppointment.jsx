import React, { useContext, useEffect, useState } from 'react'
import './MyAppointment.css'
import { assets } from "../../assets/assets"
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const MyAppointment = () => {

  const { backendUrl, token, navigate, getDoctorsData } = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [appointment, setAppointment] = useState([])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]}-${months[Number(dateArray[1]) - 1]}-${dateArray[2]}`

  }

  const getUserAppointment = async () => {
    setLoading(true)
    try {

      const response = await axios.get(`${backendUrl}/api/user/appointment-list`, { headers: { token } })
      if (response.data.success) {
        setAppointment(response.data.appointment.reverse())
      }

    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const cancelAppointment = async (appointmentId) => {
    const confirmResponse = confirm("Want To Cancel Appointment ??")
    if (!confirmResponse) return null;
    setBtnLoading(true)

    try {
      const response = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        getUserAppointment()
        getDoctorsData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setBtnLoading(false)
  }

  useEffect(() => {
    if (token) getUserAppointment();
  }, [token])


  return (
    <>{btnLoading ? <div className='btn-loading'>
      <img src={assets.page_loading} />
    </div> : null}
      <div className='my-appointment'>
        <div className="my-appointment-title">
          <h2>My Appointment</h2>
          <img src={assets.arrow_icon} alt="" />
        </div>


        <div className="my-appointment-contaienr">
          {loading ?
            <div className="appointment-loading">
              <img src={assets.page_loading} alt="" />
            </div>
            :
            (appointment.map((item, index) => (
              <div key={index} className="booked-appointment">

                <div className='doc-details'>
                  <img onClick={() => navigate((`/appointment/${item.docId}`), scrollTo({ top: 0, behavior: 'smooth' }))} src={item.docData.image} alt="" />
                  <div className='doc-detail'>
                    <p className='doc-name'> <span>{item.docData.name}</span> </p>
                    <p>{item.docData.speciality}</p>
                    <p> <span>Address:-</span>  {item.docData.address.line1}</p>
                    <p>{item.docData.address.line2}</p>
                    <p> <span>Date:-</span> {slotDateFormate(item.slotDate)} </p>
                    <p> <span>Time:-</span> {item.slotTime}</p>
                  </div>
                </div>

                <div className="appointment-payment">
                  { item.isCompleted ? <button style={{ background: "#38c02c", color: 'black' }} > Completed </button> :
                    (item.cancelled ?
                      <button > Appointment Cancelled</button>
                      :
                      <>
                        <button onClick={() => toast("Online Payment Unavailable", {
                          icon: "⚠️", style: {
                            border: '1px solid brown',
                          }
                        })} className='pay-btn'>Pay Online</button>
  
                        <button onClick={() => cancelAppointment(item._id)}>
                          Cancel Appointment
                        </button>
                      </>)
                  }
                  
                </div>
              </div>
            )))}
        </div>


      </div>

    </>

  )
}

export default MyAppointment