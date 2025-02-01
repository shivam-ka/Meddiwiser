import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast"

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    const currencySymbol = "₹"
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/api/doctor/list`)
            if (response.data.success) {
                setDoctors(response.data.doctors)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }

    const loadUserData = async () => {

        try {
            const response = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } })
            if (response.data.success) {
                setUserData(response.data.userData)

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserData()
        } else {
            setUserData(false)
        }
    }, [token])


    const value = {
        doctors, loading, navigate, currencySymbol,
        token, setToken, backendUrl, userData, setUserData,
        loadUserData, getDoctorsData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider