import React, { useContext, useEffect, useState } from 'react'
import './Doctor.css'
import { useParams, Link } from "react-router-dom"
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Doctor = () => {
  const { doctors, navigate } = useContext(AppContext);

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  const onClickHandler = (id) => {
    navigate(`/appointment/${id}`)
    scrollTo({ top: 0, behavior: 'smooth' })
  }


  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])




  return (
    <>
      {loading ?
        <div className='doctor-page-loading'>
          <img src={assets.page_loading} alt="" />
        </div> : <div className='doctor-page'>

          <p className='doctor-page-desc'>Meet our expert doctors, dedicated to providing compassionate care and personalized treatments for your health and wellness.</p>

          <div className='all-doctors-container' >
            <div className="all-doctors-filters">
              <div onClick={() => setShowFilter(!showFilter)} className='all-doctors-filters-btn'>
                <p >Filter</p> {showFilter ? <p>+</p> : <p>-</p>}
              </div>
              <div style={showFilter ? { display: 'none' } : { display: 'flex' }} className='all-doctors-filter'>

                <p style={speciality === "General physician" ? { background: "#bf9cfe" } : {}} onClick={() => { speciality === "General physician" ? navigate('/doctors') : navigate('/doctors/General physician') }} >General physician</p>

                <p style={speciality === "Gynecologist" ? { background: "#bf9cfe" } : {}} onClick={() => { speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist') }}>Gynecologist</p>

                <p style={speciality === "Dermato-logist" ? { background: "#bf9cfe" } : {}} onClick={() => { speciality === "Dermato-logist" ? navigate('/doctors') : navigate('/doctors/Dermato-logist') }}>Dermato-logist</p>

                <p style={speciality === "Pediatricians" ? { background: "#bf9cfe" } : {}} onClick={() => { speciality === "Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians') }}>Pediatricians</p>

                <p style={speciality === "Neurologist" ? { background: "#bf9cfe" } : {}} onClick={() => { speciality === "Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist') }}>Neurologist</p>

                <p style={speciality === "Gastroenterologist" ? { background: "#bf9cfe" } : {}} onClick={() => { speciality === "Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }}>Gastroenterologist</p>

              </div>

            </div>

            <div className="all-donctors">
              {filterDoc.map((item, index) => (
                <div key={index} style={item.available ? {} : { background: "#fc7d7d", borderColor: "#f8312f" }} className='doctor' onClick={() => onClickHandler(item._id)}>

                  <img src={item.image} alt="" />

                  <div className='doctor-details'>
                    <p>{item.available ? "🟢Available" : "🔴Not Available"}</p>
                    <p >{item.name}</p>
                    <p className='doctor-speciality' >{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>

        </div>}

    </>

  )
}

export default Doctor