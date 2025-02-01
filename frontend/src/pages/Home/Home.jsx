import React from 'react'
import Header from '../../components/Header/Header'
import Specialist from '../../components/Specialist/Specialist'
import TopDoctors from '../../components/TopDoctors/TopDoctors'
import { assets } from '../../assets/assets'
import Banner from '../../components/Banner/Banner'

const Home = () => {
  return (
    <div>
      <Header img={assets.header_img} text1={'we are Always'} text2={'with you !'} />
      <Specialist />
      <TopDoctors />
      <Banner img={assets.header_img_2} text1={'Book a Consultation with '} text2={'100+ Trusted '} text3={'healthcare Experts'} />
    </div>
  )
}

export default Home