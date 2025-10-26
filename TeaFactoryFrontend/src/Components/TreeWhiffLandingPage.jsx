import React from 'react';
import './LandingPage.css';

import landingImage from '../assets/img.png';

const TreeWhiffLandingPage = ({ onStartClick }) => {

  const imageSource = landingImage;

  return (
    <div className="landing-container">

      <img
        src={imageSource}
        alt="TreeWhiff Tea Factory Background"
        className="video-background"
      />
      <div className="content-overlay">
              <h1 className="factory-name">TreeWhiff Tea Factory</h1>
              <p className="subtitle">Management System</p>
              <button className="start-button" onClick={onStartClick}>
                Start 🍵
              </button>
            </div>
    </div>
  );
};

export default TreeWhiffLandingPage;