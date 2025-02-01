import React, { useContext } from 'react'
import './TopDoctors.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const TopDoctors = () => {

    const { loading, doctors, navigate } = useContext(AppContext);

    const onClickHandler = (id) => {
        navigate(`/appointment/${id}`)
        scrollTo({ top: 0, behavior: 'smooth' })
    }


    return (
        <div className='top-doctors-page'>
            <div className="top-doctors-title">
                <h2>Top Doctors</h2>
                <img src={assets.arrow_icon} alt="" />
            </div>
            <p className='top-doctors-desc'>Top doctors providing exceptional care, advanced treatments, and personalized solutions to ensure the best health outcomes for you.</p>

            {loading ? <div className='top-doctor-loading'>
                <img src={assets.page_loading} alt="" />
            </div> :
                <div className='top-doctors-container'>

                    {doctors.slice(0, 10).map((item, index) => (
                        <div key={index}
                            style={item.available ? {} : { background: "#fc7d7d", borderColor: "#f8312f" }}
                            className='doctor'
                            onClick={() => onClickHandler(item._id)}>

                            <img src={item.image} />

                            <div className='doctor-details'>
                                <p>{item.available ? "🟢Available" : "🔴Not Available"}</p>
                                <p >{item.name}</p>
                                <p className='doctor-speciality' >{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default TopDoctors