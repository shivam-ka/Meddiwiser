import React from 'react'
import "./Header.css"
import { assets } from "../../assets/assets"

const Header = ({ img, text1, text2 }) => {
    return (
        <div className='header'>
            <img src={img} alt="" />
            <h2> {text1} <br />{text2} </h2>
        </div>
    )
}

export default Header