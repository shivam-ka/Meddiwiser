import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../../context/AdminContext';
import './DoctorsList.css'
import { assets } from "../../../assets/assets"

const DoctorsList = () => {


  const { token, doctors, getDoctortList, loading, changeAvailablity, removeDoctor } = useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getDoctortList()
    }

  }, [token])


  return (
    <>
      {loading ?
        <div className='loading'>
          <img src={assets.page_loading} alt="" />
        </div> :
        <div className='all-doctors-page'>
          <h2>All Doctors</h2>
          <div className='all-doctors'>
            {
              doctors.map((item, index) => (
                <div className='doctor' key={index}>

                  <img src={item.image} />

                  <div className='doctor-details'>
                    <p className='doc-name' >{item.name}</p>
                    <p className='doctor-speciality' >{item.speciality}</p>
                    <p> <input onChange={() => changeAvailablity(item._id)} type="checkbox" checked={item.available} /> Available</p>
                    <button onClick={() => removeDoctor(item._id)} className='remove-btn'>Remove</button>
                  </div>

                </div>
              ))
            }
          </div>

        </div>
      }

    </>
  )
}

export default DoctorsList