import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      <div className="container">

        {/* Footer Top: Contact Info & Hours */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-warning">Contact Us</h5>
            <p><strong>Berlin Auto Sales</strong></p>
            <p>105 Breithaupt St<br />Kitchener, Ontario N2H 5G9</p>
            <p><strong>Phone:</strong> <a className="text-white" href="tel:2263367873">226-336-7873</a></p>
            <p><strong>Email:</strong> <a className="text-white" href="mailto:info@berlinautosales.ca">info@berlinautosales.ca</a></p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="text-warning">Business Hours</h5>
            <p>
            <strong>Mon–Fri:</strong> 9 AM – 6 PM<br />
            <strong>Sat:</strong> 9 AM – 2 PM<br />
            <em className="text-warning">All visits by appointment only.<br />Appointments required after 5 PM and on Saturdays.</em>
          </p>

            <p>Call or <Link to="/book-test-drive">Book Now</Link> to schedule your visit.</p>

          </div>

          <div className="col-md-4 mb-4">
            <h5 className="text-warning">Find Us</h5>
            <iframe
              title="Berlin Auto Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.5060679132947!2d-80.49526518477834!3d43.45519587912671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf420b659d0c1%3A0x6bdb240c1ec5eac5!2s105%20Breithaupt%20St%2C%20Kitchener%2C%20ON%20N2H%205G9!5e0!3m2!1sen!2sca!4v1715098527936"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-top border-secondary pt-3 mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} Berlin Auto Sales. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
