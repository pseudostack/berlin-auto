import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookTestDrive = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    vehicle: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    callTime: '',
    notes: ''
  });

  // Limit date options to next 3 days
  const getDateOptions = () => {
    const options = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      options.push(date.toISOString().split('T')[0]);
    }
    return options;
  };

  useEffect(() => {
    fetch('/inventory.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data }) => {
            const cleaned = data.filter(car => car.description && car['List price']);
            const parsed = cleaned.map((car, index) => ({
              ...car,
              id: index + 1,
              name: `${car.description} ${car.trim ? `- ${car.trim}` : ''}`.trim(),
            }));
            setCars(parsed);
            setForm(f => ({ ...f, vehicle: parsed[0]?.name || '' }));
          }
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailto = `mailto:info@berlinautosales.ca?subject=Test Drive Request&body=${encodeURIComponent(
      `Vehicle: ${form.vehicle}
Preferred Date: ${form.date}
Preferred Time: ${form.time}
First Name: ${form.firstName}
Last Name: ${form.lastName}
Phone: ${form.phone}
Email: ${form.email || 'N/A'}
Best Time to Call: ${form.callTime || 'N/A'}
Notes: ${form.notes || 'N/A'}`
    )}`;

    window.location.href = mailto;
  };

  const dateOptions = getDateOptions();
  const timeOptions = Array.from({ length: 10 }, (_, i) => `${9 + i}:00`);

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
        <div className="container bg-dark p-4 rounded shadow">
          <h1 className="text-warning mb-4">Book a Test Drive</h1>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Select Vehicle</label>
                <select name="vehicle" value={form.vehicle} onChange={handleChange} className="form-select" required>
                  {cars.map((car, idx) => (
                    <option key={idx} value={car.name}>{car.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Preferred Date</label>
                <select name="date" value={form.date} onChange={handleChange} className="form-select" required>
                  <option value="">Select</option>
                  {dateOptions.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Preferred Time</label>
                <select name="time" value={form.time} onChange={handleChange} className="form-select" required>
                  <option value="">Select</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <input type="text" className="form-control" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <input type="tel" className="form-control" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <input type="email" className="form-control" name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <input type="text" className="form-control" name="callTime" placeholder="Best Time to Call (optional)" value={form.callTime} onChange={handleChange} />
              </div>

              <div className="col-12">
                <textarea name="notes" rows="4" className="form-control" placeholder="Any additional notes or requests?" value={form.notes} onChange={handleChange}></textarea>
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-warning px-4">Request Test Drive</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BookTestDrive;
