import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastRunTimes, setLastRunTimes] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [updateFrequency, setUpdateFrequency] = useState('daily');
  const [newLogo, setNewLogo] = useState(null);
  const [newBackground, setNewBackground] = useState(null);
  const [logoScale, setLogoScale] = useState('1');

  useEffect(() => {
    if (isAuthenticated) {
      setLastRunTimes([
        '2024-06-01 10:00:00',
        '2024-05-31 10:00:00',
        '2024-05-30 10:00:00',
        '2024-05-29 10:00:00',
        '2024-05-28 10:00:00'
      ]);

      fetch('/api/last-inventory-update')
        .then(res => res.json())
        .then(data => setLastUpdated(data.lastUpdate || 'Unknown'))
        .catch(() => setLastUpdated('Error fetching update time'));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@berlinautosales.ca' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSendCommand = async (command) => {
    try {
      const res = await fetch('/api/update-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: command })
      });
      const data = await res.json();
      alert(data.message || 'Command sent');
    } catch (err) {
      alert('Failed to send command');
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('scale', logoScale);

    const res = await fetch('/api/upload-logo', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    alert(result.message || 'Logo uploaded');
  };

  const handleBackgroundUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload-background', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    alert(result.message || 'Background uploaded');
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
          <button className="btn btn-sm btn-light me-2" onClick={() => handleSendCommand('update')}>
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
          <select
            className="form-select w-auto mb-2"
            value={logoScale}
            onChange={(e) => setLogoScale(e.target.value)}
          >
            <option value="1">100%</option>
            <option value="0.8">80%</option>
            <option value="0.6">60%</option>
            <option value="0.4">40%</option>
          </select>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleLogoUpload}
          />
        </div>

        <div className="bg-dark p-4 rounded mt-4">
          <h5>Upload Background Image</h5>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleBackgroundUpload}
          />
        </div>

        <div className="bg-dark p-4 rounded mt-4">
          <h5>Last Inventory Update</h5>
          <p>{lastUpdated}</p>
        </div>

        <div className="bg-dark p-4 rounded mt-4">
          <h5>Recent Inventory Runs</h5>
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
