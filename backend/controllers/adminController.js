import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API For adding Doctor 
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking All Details are Not Empty
        if ([name, email, password, speciality, degree, experience, about, fees, address].some((field) => field?.trim() === "")) {
            console.log("All Fields are Required")
            return res.json({ success: false, message: "All Fields are Required" })

        }

        // Validating Email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter Valid Email" })
        }

        // Validating Password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter Strong Password" })
        }

        // Hasing Doctor Password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassowrd = await bcrypt.hash(password, salt)

        // Upload image on Cloudinary 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassowrd,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()


        res.json({ success: true, message: "Doctor Added" })

    } catch (error) {
        console.log("addDoctor Error in adminController: ", error)
        res.json({ success: false, message: error.message })
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Enter Valid Details" })
        }

    } catch (error) {
        console.log("adminLogin Error in adminController: ", error)
        res.json({ success: false, message: error.message })
    }
}

const allDoctor = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log("All Doctor Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

const removeDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        await doctorModel.findByIdAndDelete(docId)
        res.json({ success: true, message: "Doctor Remove" })

    } catch (error) {
        console.log("Remove Doctor Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api to get all Appointment List 

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log("Appointments Admin Error: ", error)
    }
}

// Api To Cancel Appointment
const cancelAppointmentAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Checking For appointment user 

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // Removing Slot Time and Date
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log("cancel Appointment Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api --> Dashboard Data for Admin
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            users: users.length,
            appointment: appointment.length,
            latestAppointments: appointment.slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log("Admin Dashboard Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, adminLogin, allDoctor, removeDoctor, appointmentsAdmin, cancelAppointmentAdmin, adminDashboard }