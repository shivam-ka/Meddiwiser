import React from 'react'
import './Banner.css'

const Banner = ({ img, text1, text2, text3 }) => {
    return (
        <div className='banner'>
            <img src={img} alt="" />
            <h2> {text1}  <br /> {text2} <br /> {text3} </h2>
        </div>
    )
}

export default Banner