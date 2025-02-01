import React from 'react'
import './Specialist.css'
import { assets, specialityData } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Specialist = () => {
    return (
        <div className='specialist'>
            <div className='specialist-title'>
                <h2>Our Secialist</h2>
                <img src={assets.arrow_icon} alt="" />
            </div>
            <p className='specialist-desc'>
            Experienced specialist doctor offering expert care, advanced treatments, and personalized solutions for your health and well-being needs.</p>

            <div className='all-specialist'>
                {specialityData.map((item, index) => (
                    <Link key={index} onClick={()=> scrollTo(0,0)} to={`/doctors/${item.speciality}`}>
                        <img src={item.image} alt="" />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Specialist