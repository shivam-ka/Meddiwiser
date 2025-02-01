import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../../context/DoctorContext';
import { AppContext } from '../../../context/AppContext';
import { assets } from '../../../assets/assets';
import './DoctorProfile.css'
import toast from 'react-hot-toast';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [btn_Loading, setBtn_Loading] = useState(false);


  useEffect(() => {

    if (dToken) getProfileData();

  }, [dToken])


  const updateUserProfile = async (e) => {
    e.preventDefault()
    setBtn_Loading(true)
    try {
      const updateData = {
        name: profileData.name,
        fees: profileData.fees,
        available: profileData.available,
        experience: profileData.experience,
        degree: profileData.Degree,
      }

      const response = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } })
      if (response.data.success) {
        toast.success(response.data.message)
        await getProfileData()
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    setBtn_Loading(false)
  }

  return profileData && (
    <div className='doctor-profile-page'>
      <form onSubmit={(e) => updateUserProfile(e)} className="profile-edit-form" >
        
          <img className='doctor-image' src={profileData.image} alt="" />

        <div className="form-group">
          <label>Name</label>
          <input onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} value={profileData.name} type="text" placeholder="Enter Your Name" />
        </div>

        <div className="form-group">
          <label>Aavailable</label>
          <input className='checkbox' onChange={(e) => setProfileData(prev => ({ ...prev, available: !profileData.available }))} checked={profileData.available} type='checkbox' placeholder='Fees' />
        </div>


        <div className="form-group">
          <label>About</label>
          <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} value={profileData.about} placeholder="About" />
        </div>

        <div className="form-group">
          <label>Degree</label>
          <input onChange={(e) => setProfileData(prev => ({ ...prev, degree: e.target.value }))} value={profileData.degree}
            placeholder='Enter Your Degree' type="text" required />
        </div>


        <div className="form-group">
          <label>Experience</label>
          <select onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))} value={profileData.experience} >
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
          <label>Fees</label>
          <input onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} type='number' placeholder='Fees' />
        </div>



        <button disabled={btn_Loading} type="submit">
          {btn_Loading ? <img src={assets.loading} /> : "Update Profile"}
        </button>
      </form>
    </div>
  )
}

export default DoctorProfile