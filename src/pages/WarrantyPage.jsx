// WarrantyPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WarrantyPage = () => {
  return (
    <>
      <Navbar />
      <section style={{
        background: "url('/background.jpg') no-repeat center center fixed",
        backgroundSize: 'cover',
        padding: '60px 20px',
        color: 'white',
        minHeight: '100vh'
      }}>
        <div className="container" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          padding: '40px'
        }}>
          <h1 className="text-warning mb-4">Warranty Coverage</h1>
          <p>At Berlin Auto Sales, we are proud to offer extended warranty coverage through <strong>Global Warranty</strong> — one of Canada's most trusted vehicle protection providers.</p>
          <p>Global Warranty offers a range of flexible protection plans designed to give you peace of mind, including:</p>
          <ul>
            <li>Comprehensive Powertrain and Electrical Coverage</li>
            <li>Protection for Modern Vehicle Electronics</li>
            <li>Emergency Roadside Assistance & Rental Services</li>
            <li>Multiple coverage tiers and terms to suit your needs</li>
          </ul>
          <p>You can explore coverage options and brochures on their official site below:</p>
          <a href="https://www.globalwarranty.com" className="btn btn-outline-light mt-3" target="_blank" rel="noopener noreferrer">Visit Global Warranty</a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WarrantyPage;