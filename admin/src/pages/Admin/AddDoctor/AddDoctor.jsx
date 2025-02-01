import React, { useContext, useState } from 'react'
import './AddDoctor.css'
import { assets } from '../../../assets/assets'
import { AdminContext } from '../../../context/AdminContext'
import toast from "react-hot-toast"
import axios from "axios"


const AddDoctor = () => {

  const { token, backendUrl, navigate } = useContext(AdminContext);

  const [loading, setLoading] = useState(false)

  const [docImage, setDocImage] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('0-1 Year')
  const [address_line_1, setAddress_line_1] = useState('Meddiwiser Health Center,')
  const [address_line_2, setAddress_line_2] = useState('New Delhi - 110075')
  const [fees, setFees] = useState('')

  const onSubmitHander = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      if (!docImage) {
        toast.error("Please Select Image")
      }

      const formData = new FormData()

      formData.append('image', docImage)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('experience', experience)
      formData.append('address', JSON.stringify({ line1: address_line_1, line2: address_line_2 }))
      formData.append('fees', Number(fees))


      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { token } })

      if (response.data.success) {
        toast.success("Doctor Added", { style: { border: '1px solid #713200', } })

        setDocImage(false)
        setName('')
        setEmail('')
        setPassword('')
        setAbout('')
        setExperience('0-1 Year')
        setDegree('')
        setAddress_line_1('')
        setAddress_line_2('')
        setSpeciality('General physician')
        setFees('')

      } else {
        toast.error(response.data.message, { style: { border: '1px solid #713200', } })
        console.log(response.data)
      }

    } catch (error) {
      console.log("Add Doctor Error: ", error)
      toast.error(error.message)
    }

    setLoading(false)

  }


  return (
    <div className="add-doctor-page">
      <form onSubmit={onSubmitHander} className="profile-edit-form" >

        <div className="form-group doctor-image">
          <label htmlFor='add-doctor-image' >
            <img src={docImage ? (URL.createObjectURL(docImage)) : assets.upload_area} />
          </label>
          <input onChange={(e) => setDocImage(e.target.files[0])} type="file" accept="image/*" id='add-doctor-image' />
        </div>

        <div className="form-group">
          <label>Doctor Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter Doctor Name" />
        </div>


        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)} value={email}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)} value={password}
            placeholder="Enter your Passowrd"
          />
        </div>

        <div className="form-group">
          <label>About</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="About" />
        </div>

        <div className="form-group">
          <label>Speciality</label>
          <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} >
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermato-logist">Dermato-logist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>

        <div className="form-group">
          <label>Degree</label>
          <input onChange={(e) => setDegree(e.target.value)} value={degree}
            placeholder='Enter Your Degree' type="text" required />
        </div>


        <div className="form-group">
          <label>Experience</label>
          <select onChange={(e) => setExperience(e.target.value)} value={experience} >
            <option value="0-1 Year">0-1 Year</option>
            <option value="1-3 Year">1-3 Year</option>
            <option value="3-6 Year">3-6 Year</option>
            <option value="6-10 Year">6-10 Year</option>
            <option value="10-12 Year">10-12 Year</option>
            <option value="12-15 Year">12-15 Year</option>
            <option value="15-20 Year">15-20 Year</option>
            <option value="20-25 Year">20-25 Year</option>

          </select>
        </div>

        <div className="form-group">
          <label>Address line 1</label>
          <input
            onChange={(e) => setAddress_line_1(e.target.value)} value={address_line_1}
            type="text" placeholder='Address line 1' />
        </div>

        <div className="form-group">
          <label>Address line 2 </label>
          <input
            onChange={(e) => setAddress_line_2(e.target.value)} value={address_line_2}
            type="text" placeholder='Address line 2' />
        </div>




        <div className="form-group">
          <label>Fees</label>
          <input onChange={(e) => setFees(e.target.value)} value={fees} type='number' placeholder='Fees' />
        </div>



        <button disabled={loading} type="submit">
          {loading ? <img src={assets.loading} /> : "Add Doctor"}
        </button>
      </form>
    </div>
  )
}

export default AddDoctor