import express from "express"
import { addDoctor, adminDashboard, adminLogin, allDoctor, appointmentsAdmin, cancelAppointmentAdmin, removeDoctor } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailablity } from "../controllers/doctorController.js"

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/all-doctors', authAdmin, allDoctor)
adminRouter.post('/change-availability', authAdmin, changeAvailablity)
adminRouter.post('/remove', authAdmin, removeDoctor)
adminRouter.get('/all-appointment', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointmentAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter