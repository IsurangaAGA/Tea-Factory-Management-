import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Plant Trees.
              <span className="hero-subtitle">Save Our Planet.</span>
            </h1>
            <p className="hero-description">
              Join TreeWhiff in our global mission to combat climate change through 
              reforestation. Every tree planted brings us closer to a greener, 
              healthier Earth for future generations.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Trees Planted</div>
              </div>
              <div className="stat">
                <div className="stat-number">25+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Volunteers</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <img 
                src="/images/hero-tree.jpg" 
                alt="Beautiful forest with trees"
                className="hero-image"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Impact in Action</h2>
            <p className="section-subtitle">See the difference we're making together.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/gallery-1.jpg" alt="Reforestation project 1" />
            </div>
            <div className="gallery-item">
              <img src="/images/gallery-2.jpg" alt="Reforestation project 2" />
            </div>
            <div className="gallery-item">
              <img src="/images/gallery-3.jpg" alt="Reforestation project 3" />
            </div>
            <div className="gallery-item">
              <img src="/images/gallery-4.jpg" alt="Reforestation project 4" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-image">
              <img src="/images/cta-bg.jpg" alt="Join our mission" />
            </div>
            <div className="cta-text">
              <h2>Ready to Make a Difference?</h2>
              <p>Join our community of environmental champions and start planting trees today.</p>
              <button className="btn btn-primary btn-large">Start Planting Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;