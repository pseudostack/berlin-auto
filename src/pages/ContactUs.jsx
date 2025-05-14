import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
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
          <h1 className="text-warning mb-4">Contact Us</h1>
          <p><strong>Address:</strong> 105 Breithaupt St, Kitchener, Ontario N2H 5G9</p>
          <p><strong>Phone:</strong> <a href="tel:2263367873" className="text-white">226-336-7873</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@berlinautosales.ca" className="text-white">info@berlinautosales.ca</a></p>
          <p><strong>Hours:</strong><br />Monday to Friday: 8 AM – 9 PM<br />Saturday & Sunday: By appointment only</p>
          <p>Please call or book online to schedule your visit outside of standard hours.</p>

          <iframe
            title="Berlin Auto Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.5060679132947!2d-80.49526518477834!3d43.45519587912671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf420b659d0c1%3A0x6bdb240c1ec5eac5!2s105%20Breithaupt%20St%2C%20Kitchener%2C%20ON%20N2H%205G9!5e0!3m2!1sen!2sca!4v1715098527936"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;