import React, { useState, useEffect } from 'react';

const FinancingCalculator = ({ price }) => {
  const [down, setDown] = useState(0);
  const [rate, setRate] = useState(7.49);
  const [term, setTerm] = useState(60); // months
  const [frequency, setFrequency] = useState('biweekly');
  const [payment, setPayment] = useState(0);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    if (!price) return;
    const loanAmount = parseFloat(price) - down;
    const monthlyRate = rate / 100 / 12;
    const months = parseInt(term);
    const paymentCalc = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const result = frequency === 'biweekly' ? paymentCalc * 12 / 26 : paymentCalc;
    setPayment(result.toFixed(2));
  }, [price, down, rate, term, frequency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${contact.name}, we will contact you shortly.`);
    // Optionally send to a backend or mailer service here
  };

  return (
    <div className="bg-dark text-white p-4 rounded mt-4 shadow">
      <h5 className="text-warning mb-3">Estimate Your Financing</h5>

      <div className="row g-3">
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
        <div className="col-md-6">
          <label className="form-label">Payment Frequency</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="frequency"
              id="biweekly"
              value="biweekly"
              checked={frequency === 'biweekly'}
              onChange={() => setFrequency('biweekly')}
            />
            <label className="form-check-label" htmlFor="biweekly">Biweekly</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="frequency"
              id="monthly"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={() => setFrequency('monthly')}
            />
            <label className="form-check-label" htmlFor="monthly">Monthly</label>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <div>
            <p className="mb-0"><strong>Estimated {frequency} payment:</strong></p>
            <h4 className="text-success">${payment}</h4>
          </div>
        </div>
      </div>

      <hr className="bg-light my-4" />

      <form onSubmit={handleSubmit}>
        <h6 className="text-warning mb-3">Request a Callback</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={contact.name}
              onChange={e => setContact({ ...contact, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              value={contact.phone}
              onChange={e => setContact({ ...contact, phone: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-warning">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinancingCalculator;
