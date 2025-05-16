import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FinancingCalculator from '../components/FinancingCalculator';

const Financing = () => {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);

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
              price: parseFloat(car['List price']?.replace(/[^0-9.]/g, '')) || 0,
              display: `${car.description} ${car.trim ? `- ${car.trim}` : ''}`.trim(),
            }));
            setCars(parsed);
            setSelectedCarId(parsed[0]?.id); // select first car by default
          }
        });
      });
  }, []);

  const selectedCar = cars.find(car => car.id === selectedCarId);

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

          {/* Vehicle Selector */}
          <div className="mb-4">
            <label className="form-label text-white">Select a Vehicle</label>
            <select
              className="form-select"
              value={selectedCarId || ''}
              onChange={e => setSelectedCarId(Number(e.target.value))}
            >
              {cars.map(car => (
                <option key={car.id} value={car.id}>
                  {car.display} – ${car.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Show Financing Calculator if car is selected */}
          {selectedCar && <FinancingCalculator price={selectedCar.price} />}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Financing;
