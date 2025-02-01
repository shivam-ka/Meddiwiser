import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { AppContext } from "../../context/AppContext"
import './Appointment.css'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import axios from 'axios'

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, navigate, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',]

  const [loading, setLoading] = useState(false)
  const [docInfo, setDocInfo] = useState({})
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo =  doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }



  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index 
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(20, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }



        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }


  }

  const bookAppointment = async (e) => {
    e.preventDefault();

    if (!token) {
      toast('Login To Book Appointment', { icon: '⚠️', style: { border: '1px solid #713200', } });
      return navigate('/login')
    }

    if (slotTime === '') {
      return toast.error("Please Select Time")
    }

    setLoading(true)

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = `${day}_${month}_${year}`

      const response = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        getDoctorsData()
        navigate('/my-appointment')

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    setLoading(false)
  }


  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])



  return docInfo && (
    <div className='appointment-page'>

      <div className="appointment-doc-details">

        <img className='doc-img' src={docInfo.image} alt="" />
        <div className="appointment-doc-detail">
          <div className="doc-name">{docInfo.name} <img src={assets.verified_icon} alt="" /> </div>
          <div className='doc-degree'> {docInfo.degree}-{docInfo.speciality}
            <p>{docInfo.experience}</p>
          </div>

          <div className="doc-about">
            <p style={{ fontWeight: 'bold' }}>About <img src={assets.info_icon} alt="" /> </p>
            <p>{docInfo.about}</p>
          </div>

          <div className="doc-fees">
            Appointment Fee:  {currencySymbol}{docInfo.fees}
          </div>

        </div>

      </div>

      <div className="appointment-slot">
        <p className='book-slot'>Book Slots</p>
        <div className='slot-date'>
          {docSlots.length && docSlots.map((item, index) => (
            <p style={slotIndex === index ? { background: "#3d66f8", color: "white" } : {}} key={index} onClick={() => setSlotIndex(index)} >
              {item[0] && item[0].datetime.getDate()} {item[0] && daysOfWeek[item[0].datetime.getDay()]}
            </p>

          ))}
        </div>
        <div className='slot-time'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} style={slotTime === item.time ? { background: "#3d66f8", color: "white" } : {}} key={index} >{item.time.toLowerCase()}</p>
          ))}

        </div>

        <button disabled={loading} onClick={(e) => bookAppointment(e)} > {loading ? <img src={assets.loading} /> : "Book Appointment"} </button>

      </div>

    </div>
  )
}

export default Appointment