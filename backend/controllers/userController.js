import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { v2 as cludinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Api For  register User 
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if ([name, email, password].some((field) => field.trim() === "")) {
            return res.json({ success: false, message: "Fill All Details" })
        }
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: "Email Aready in Use " })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter Valid Email" })
        }


        if (password.length < 8) {
            return res.json({ success: false, message: "Enter Strong Password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassowrd = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassowrd
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log("Register User Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api For Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email })

        if (!existingUser) {
            return res.json({ success: false, message: "User Does Not Exist" })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if (isMatch) {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET)
            return res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Enter Valid Password" })
        }



    } catch (error) {
        console.log("Login User Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api For get user Profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log("Get Profile Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api For get update Profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file;

        if ([name, phone, dob, gender].some((field) => field.trim() === "")) {
           return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender })

        // Upload Image on Cludinary
        if (imageFile) {
            const imageUpload = await cludinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log("Update Profile Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// API To Book Appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is Unavailable" })
        }

        let slots_booked = docData.slots_booked

        // Checking for Sloth available
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is Unavailable" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log("bookAppointment Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointment for frontend
const appointmentList = async (req, res) => {
    try {

        const { userId } = req.body;
        const appointment = await appointmentModel.find({ userId })
        res.json({ success: true, appointment })

    } catch (error) {
        console.log("AppointmentList Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api To Cancel Appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        // Checking For appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }

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


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, appointmentList,cancelAppointment }