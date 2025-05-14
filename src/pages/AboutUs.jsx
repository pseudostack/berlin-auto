// AboutPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
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
          <h1 className="text-warning mb-4">About Berlin Auto Sales</h1>
          <p>Berlin Auto Sales was founded in 2020 as an extension of our established service business, <a href="https://www.eddysauto.ca" className="text-warning" target="_blank" rel="noopener noreferrer">Eddy’s Auto Service</a>. Our specialty lies in servicing German vehicles, but our team has extensive experience with all makes and models.</p>
          <p>At Eddy’s Auto, we use the latest diagnostic software and tools to ensure precise, efficient service. We apply that same standard to Berlin Auto Sales by carefully reconditioning every vehicle with top-quality parts and workmanship we can stand behind.</p>
          <p>Our mission is to provide a no-pressure, customer-first environment. We work closely with each client to understand their needs and help them find the right vehicle — efficiently, transparently, and with integrity.</p>
          <p>We’re proud of the reputation we’ve built in the community and look forward to serving you.</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;