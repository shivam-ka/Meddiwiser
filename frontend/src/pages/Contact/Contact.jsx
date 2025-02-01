import React from 'react'
import './Contact.css'
import { assets } from '../../assets/assets';

const Contact = () => {
  return (
    <>
      <div className='contact-title'>
        
          <h1>Contact Us</h1>
        
      </div>

      <div className="contact-container">
        <img src={assets.contact_image} alt="" />
        <div class="contact-info">
          <div class="container">
            <h2>We're Here to Help!</h2>
            <p>Whether you have questions about our services, need to schedule an appointment, or want to know more about our practice, we're happy to assist you.</p>

            <div class="info">
              <div class="contact-item">
                <h3>Phone</h3>
                <p>📞 Call us at: +91 9876543210</p>
                <p>*Available Monday to Sunday, 10:00 AM - 8:00 PM</p>
              </div>

              <div class="contact-item">
                <h3>Email</h3>
                <p>📧 Email us at: contact@doctorwebsite.com</p>
                <p>*Our team will get back to you within 24 hours.*</p>
              </div>

              <div class="contact-item">
                <h3>Address</h3>
                <p>123 Meddiwiser</p>
                <p>delhi, 110053</p>
              </div>
            </div>
          </div>
        </div>
      </div>





    </>
  )
}

export default Contact