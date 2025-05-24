import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastRunTimes, setLastRunTimes] = useState([]);
  const [updateFrequency, setUpdateFrequency] = useState('daily');
  const [newLogo, setNewLogo] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Placeholder: fetch last run times from backend
      setLastRunTimes([
        '2024-06-01 10:00:00',
        '2024-05-31 10:00:00',
        '2024-05-30 10:00:00',
        '2024-05-29 10:00:00',
        '2024-05-28 10:00:00'
      ]);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder auth
    if (email === 'admin@berlinautosales.ca' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSendCommand = (command) => {
    alert(`Email would be sent to backend with subject: "${command}"`);
    // Backend will handle parsing and actioning based on email content
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setNewLogo(file);
    alert('Email with logo image would be sent to backend.');
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-white">
        <Navbar />
        <h2 className="mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="bg-dark p-4 rounded">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">Login</button>
        </form>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5 text-white">
        <h2 className="text-warning">Admin Panel</h2>

        <div className="bg-dark p-4 rounded mt-4">
          <h5>Inventory Controls</h5>
          <button className="btn btn-sm btn-light me-2" onClick={() => handleSendCommand('update inventory')}>
            Trigger Inventory Update
          </button>
          <select
            className="form-select d-inline w-auto ms-2"
            value={updateFrequency}
            onChange={(e) => {
              setUpdateFrequency(e.target.value);
              handleSendCommand(`set frequency ${e.target.value}`);
            }}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="bg-dark p-4 rounded mt-4">
          <h5>Upload New Logo</h5>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleLogoUpload}
          />
        </div>

        <div className="bg-dark p-4 rounded mt-4">
          <h5>Recent Inventory Updates</h5>
          <ul className="list-unstyled">
            {lastRunTimes.map((time, index) => (
              <li key={index}>&#x2022; {time}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
