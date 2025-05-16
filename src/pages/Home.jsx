import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const heroStyle = {
  background: "url('/background.jpg') no-repeat center center fixed",
  backgroundSize: 'cover',
  padding: '100px 20px 60px',
  color: 'white',
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '50px',
  borderRadius: '10px',
};

const cardStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '30px',
  borderRadius: '10px',
  color: 'white',
  height: '100%'
};

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero with View Inventory CTA */}
      <section style={heroStyle}>
        <div className="container text-center" style={overlayStyle}>
          <h1 className="display-4">Welcome to Berlin Auto Sales</h1>
          <p className="lead">Your trusted source for quality vehicles in Kitchener-Waterloo</p>
          <a href="/inventory" className="btn btn-warning mt-3">View Inventory</a>
        </div>
      </section>

      {/* Financing + Test Drive Cards */}
      <section style={{ ...heroStyle, padding: '20px 20px 40px' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div style={cardStyle} className="text-center h-100">
                <h3 className="text-warning mb-3">Apply for Financing</h3>
                <p>Fast approval with trusted lenders. Submit your application online.</p>
                <a href="/financing" className="btn btn-outline-light">Start Application</a>
              </div>
            </div>
            <div className="col-md-6">
              <div style={cardStyle} className="text-center h-100">
                <h3 className="text-warning mb-3">Book a Test Drive</h3>
                <p>Experience your next car in person. Choose a time that works for you.</p>
<Link to="/book-test-drive" className="btn btn-outline-light">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
