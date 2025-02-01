import express from "express"
import { appointmentCancel, appointmentComplete, doctorAppointments, doctorDashboard, doctorList, doctorLogin, doctorProfile, upadteDoctorProfile } from "../controllers/doctorController.js"
import authDoctor from "../middleware/authDoctor.js"
import upload from "../middleware/multer.js"

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/appointments', authDoctor, doctorAppointments)
doctorRouter.post('/cancel-appointments', authDoctor, appointmentCancel)
doctorRouter.post('/complete-appointments', authDoctor, appointmentComplete)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', upload.single('image'), authDoctor, upadteDoctorProfile)

export default doctorRouter