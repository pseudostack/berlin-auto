import React, { useState, useEffect } from 'react';

const FinancingCalculator = ({ price }) => {
const [down, setDown] = useState('');
const [tradeIn, setTradeIn] = useState('');
  const [term, setTerm] = useState(60);
  const [frequency, setFrequency] = useState('biweekly');
  const [creditScore, setCreditScore] = useState('');
  const [rate, setRate] = useState(0);
  const [payment, setPayment] = useState(0);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });

  const determineRandomAPR = (range) => {
    const aprRanges = {
      '781-850': [7.41, 7.67],
      '661-780': [9.63, 9.95],
      '601-660': [14.07, 14.46],
      '501-600': [18.95, 19.38],
      '300-500': [21.55, 21.81],
    };

    const [min, max] = aprRanges[range] || [9.0, 10.0];
    return +(Math.random() * (max - min) + min).toFixed(2);
  };

  useEffect(() => {
    if (!price || !creditScore) return;

    const apr = determineRandomAPR(creditScore);
    setRate(apr);

    const loanAmount = parseFloat(price) - (parseFloat(down || 0) + parseFloat(tradeIn || 0));
    const monthlyRate = apr / 100 / 12;
    const months = parseInt(term);
    const paymentCalc = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const result = frequency === 'biweekly' ? paymentCalc * 12 / 26 : paymentCalc;
    setPayment(result.toFixed(2));
  }, [price, down, tradeIn, term, frequency, creditScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${contact.name}, we will contact you shortly.`);
  };

  return (
    <div className="bg-dark text-white p-4 rounded mt-4 shadow">
      <h5 className="text-warning mb-3">Estimate Your Financing</h5>

      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Down Payment (optional)</label>
<input
  type="number"
  className="form-control"
  value={down}
  onChange={e => setDown(e.target.value)}
/>        </div>
        <div className="col-md-4">
          <label className="form-label">Trade-In Value (optional)</label>
<input
  type="number"
  className="form-control"
  value={tradeIn}
  onChange={e => setTradeIn(e.target.value)}
/>        </div>
        <div className="col-md-4">
          <label className="form-label">Credit Score</label>
          <select className="form-select" value={creditScore} onChange={e => setCreditScore(e.target.value)} required>
            <option value="">Select your credit score range</option>
            <option value="781-850">781–850 (Super Prime)</option>
            <option value="661-780">661–780 (Prime)</option>
            <option value="601-660">601–660 (Nonprime)</option>
            <option value="501-600">501–600 (Subprime)</option>
            <option value="300-500">300–500 (Deep Subprime)</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Loan Term</label>
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
            <input
              className="form-check-input"
              type="radio"
              id="biweekly"
              name="frequency"
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
              id="monthly"
              name="frequency"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={() => setFrequency('monthly')}
            />
            <label className="form-check-label" htmlFor="monthly">Monthly</label>
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <div>
            <p className="mb-0"><strong>Estimated {frequency} payment:</strong></p>
            <h4 className="text-success">${payment}</h4>
            {rate > 0 && (
              <small className="text-muted">{rate.toFixed(2)}% APR (estimated based on your credit score)</small>
            )}
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
