import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
  const { token, backendUrl, userData, setUserData, loadUserData } = useContext(AppContext);

  const [btn_loading, setBtn_loading] = useState(false)
  const [image, setImage] = useState(false)


  const updateUserProfile = async (e) => {
    setBtn_loading(true)
    try {
      e.preventDefault()
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', userData.address)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const response = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await loadUserData()
        setImage(false)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    setBtn_loading(false)
  }

  return userData && (

    <div className="profile-page">
      <form onSubmit={(e) => updateUserProfile(e)} className="profile-edit-form" >
        <h2>Edit Profile</h2>

        <div className="form-group ">
          <label htmlFor='profile-page-user-image' >
            <img htmlFor='profile-page-user-image' src={image ? URL.createObjectURL(image) : userData.image} />
          </label>
          <input

            type="file"
            accept="image/*"
            id='profile-page-user-image'
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            value={userData.email}
            type="email"
            disabled
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input

            type="text"
            value={userData.phone}
            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input

            type="date"
            value={userData.dob}
            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea

            value={userData.address}
            onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
            placeholder="Enter your address"
          />
        </div>
        <button type='submit' disabled={btn_loading} >{btn_loading ? <img src={assets.loading} /> : " Save Details"} </button>
      </form>
    </div>

  )
}

export default Profile