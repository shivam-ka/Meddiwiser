import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';

const About = () => {
  return (
    <div className="about">
      <div className="about-title">
        <h1>About Meddiwiser</h1>
      </div>

      <div className="about-section">

        <img className="about-image" src={assets.about_image}  />

        <div className="about-description">
          <h2>Meddiwiser</h2>
          <p>
            Meddiwiser is a highly experienced physician with over 15 years of experience in providing excellent healthcare.
            Specializing in cardiology, Dr. Doe has helped countless patients improve their heart health and lead fulfilling lives.
          </p>
          <p>
            Passionate about patient care, Dr. Doe continuously updates skills through professional training and education.
            A leader in the medical field, he believes in personalized healthcare tailored to each patient's needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
