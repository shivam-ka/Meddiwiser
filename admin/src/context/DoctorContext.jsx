import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast"
import axios from "axios"

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState(false);

    const getAppointments = async () => {
        setLoading(true)
        try {

            const response = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dToken } })
            if (response.data.success) {
                setAppointments(response.data.appointments.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const completeAppointment = async (appointmentId) => {
        const confirmRes = confirm("Are You Sure")
        if (!confirmRes) { return; }
        try {
            const response = await axios.post(`${backendUrl}/api/doctor/complete-appointments`, { appointmentId }, { headers: { dToken } })
            if (response.data.success) {
                toast.success(response.data.message)
                getAppointments()

            } else {
                toast.error(response.data.message)
                console.log(response.data)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        const confirmRes = confirm("Are You Sure")
        if (!confirmRes) { return; }
        try {
            const response = await axios.post(`${backendUrl}/api/doctor/cancel-appointments`, { appointmentId }, { headers: { dToken } })
            if (response.data.success) {
                toast.success(response.data.message)
                getAppointments()
                getDoctorDash()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDoctorDash = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dToken } })
            if (response.data.success) {
                setDashData(response.data.dashData)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const getProfileData = async () => {
        
        try {
            const response = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dToken } })
            if (response.data.success) {
                setProfileData(response.data.docProfile)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
       
    }



    const value = {
        dToken, setDToken, getAppointments,
        appointments, setAppointments, loading,
        completeAppointment, cancelAppointment, getDoctorDash,
        dashData, setDashData, profileData, setProfileData, getProfileData ,backendUrl

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider