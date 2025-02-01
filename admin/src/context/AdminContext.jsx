import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const currency = "₹"
    const [token, setToken] = useState(localStorage.getItem('token'))
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)


    const getDoctortList = async () => {
        setLoading(true)

        try {
            const response = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { token } })

            if (response.data.success) {
                setDoctors(response.data.doctors)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

        setLoading(false)
    }

    const changeAvailablity = async (docId) => {
        try {
            const response = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                getDoctortList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const removeDoctor = async (docId) => {
        try {
            const confirmValue = confirm("Are You Sure")
            if (confirmValue) {
                const response = await axios.post(`${backendUrl}/api/admin/remove`, { docId }, { headers: { token } })
                if (response.data.success) {
                    toast.success(response.data.message)
                    getDoctortList()
                } else {
                    toast.error(response.data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllApointment = async () => {
        setLoading(true)
        try {

            const response = await axios.get(`${backendUrl}/api/admin/all-appointment`, { headers: { token } })
            if (response.data.success) {
                setAppointments(response.data.appointments)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const cancelAppointment = async (appointmentId) => {
        setBtnLoading(true)
        try {
            const confirmResponse = confirm("Want To Cancel Appointment")
            if (!confirmResponse) return null;

            const response = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        setBtnLoading(false)
    }

    const getDashData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { token } })
            if (response.data.success) {
                setDashData(response.data.dashData)
            } else {
                token && toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false)
    }


    const value = {
        token, setToken, backendUrl,
        navigate, doctors, getDoctortList,
        loading, changeAvailablity, removeDoctor,
        getAllApointment, appointments, setAppointments,
        currency, cancelAppointment, btnLoading,
        getDashData, dashData, 
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider