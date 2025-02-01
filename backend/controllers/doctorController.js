import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary"

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availablity Changed" })

    } catch (error) {
        console.log("changeAvailablity Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log("doctorList Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// API For Doctor Login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Enter Valid Email" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Enter Valid Password" })
        }

    } catch (error) {
        console.log("doctorLogin Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

//API To Get Doctor Appointment
const doctorAppointments = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log("doctorAppointments Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

//API To Complete Appointment
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId,
                {
                    $set: {
                        isCompleted: true,
                        payment: true,
                    }
                })
            console.log("yes")
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            res.json({ success: false, message: "Mark Faild" })
        }

    } catch (error) {
        console.log("appointmentComplete Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

//API To Cancel Appointment
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                $set: {
                    cancelled: true,
                    isCompleted: false,
                    payment: false,
                }

            });

            return res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.json({ success: false, message: "Cancelled Failed" })
        }
    } catch (error) {
        console.log("appointment Cancel Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

// Api to get Doctor Dashboard 
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await appointmentModel.find({ docId })
        let earning = 0;

        appointments.map((item, index) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount
            }
        })

        let users = [];
        appointments.map((item, index) => {
            if (!users.includes(item.userId)) {
                users.push(item.userId)
            }
        })


        const dashData = {
            earning,
            appointments: appointments.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData });

    } catch (error) {
        console.log("doctorDashboard Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const docProfile = await doctorModel.findById(docId).select("-password")

        res.json({ success: true, docProfile })

    } catch (error) {
        console.log("Doctor Profile Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

const upadteDoctorProfile = async (req, res) => {
    try {
        const { docId, name, fees, available, experience, Degree } = req.body;

        if ([name, fees, available, experience, Degree].some((field) => field && field === "")) {
            return res.json({ success: false, message: "Details Missing" })
        }

        await doctorModel.findByIdAndUpdate(docId, { name, fees, available, experience, Degree })
        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log("Update Doctor Profile Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailablity, doctorList, doctorLogin, doctorAppointments, appointmentCancel,
    appointmentComplete, doctorDashboard, doctorProfile, upadteDoctorProfile
}