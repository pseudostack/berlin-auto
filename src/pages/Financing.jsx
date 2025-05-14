import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Financing = () => {
  const [amount, setAmount] = useState(25000);
  const [down, setDown] = useState(0);
  const [rate, setRate] = useState(7.49);
  const [term, setTerm] = useState(60);
  const [frequency, setFrequency] = useState('biweekly');
  const [payment, setPayment] = useState(0);
  const [contact, setContact] = useState({ name: '', phone: '' });

  useEffect(() => {
    const loanAmount = amount - down;
    const monthlyRate = rate / 100 / 12;
    const months = parseInt(term);
    const paymentCalc = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const result = frequency === 'biweekly' ? paymentCalc * 12 / 26 : paymentCalc;
    setPayment(result.toFixed(2));
  }, [amount, down, rate, term, frequency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${contact.name}, we will call you back at ${contact.phone}.`);
  };

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
          <h1 className="text-warning mb-4">Financing Calculator</h1>

          <div className="row g-4">
            <div className="col-md-4">
              <label className="form-label">Vehicle Price ($)</label>
              <input type="number" className="form-control" value={amount} onChange={e => setAmount(+e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Down Payment ($)</label>
              <input type="number" className="form-control" value={down} onChange={e => setDown(+e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Interest Rate (%)</label>
              <select className="form-select" value={rate} onChange={e => setRate(+e.target.value)}>
                <option value="6.99">6.99%</option>
                <option value="7.49">7.49%</option>
                <option value="7.99">7.99%</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Term</label>
              <select className="form-select" value={term} onChange={e => setTerm(+e.target.value)}>
                <option value="12">1 Year</option>
                <option value="24">2 Years</option>
                <option value="36">3 Years</option>
                <option value="48">4 Years</option>
                <option value="60">5 Years</option>
                <option value="72">6 Years</option>
                <option value="84">7 Years</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Payment Frequency</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="frequency" id="biweekly" value="biweekly" checked={frequency === 'biweekly'} onChange={() => setFrequency('biweekly')} />
                <label className="form-check-label" htmlFor="biweekly">Biweekly</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="frequency" id="monthly" value="monthly" checked={frequency === 'monthly'} onChange={() => setFrequency('monthly')} />
                <label className="form-check-label" htmlFor="monthly">Monthly</label>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <div>
                <p className="mb-0"><strong>Estimated {frequency} payment:</strong></p>
                <h4 className="text-success">${payment}</h4>
              </div>
            </div>
          </div>

          <hr className="bg-light my-4" />

          <form onSubmit={handleSubmit}>
            <h5 className="text-warning mb-3">Request a Callback</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Full Name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <input type="tel" className="form-control" placeholder="Phone Number" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} required />
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-warning">Submit Request</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Financing;
