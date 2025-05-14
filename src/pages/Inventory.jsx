import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import VehicleCard from '../components/VehicleCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    make: '',
    price: '',
    mileage: '',
    showMore: false
  });

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
              images: car.images?.split(',').map(i => i.trim()) || [],
            }));
            setCars(parsed);
          }
        });
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({ year: '', make: '', price: '', mileage: '', showMore: false });
  };

  const toggleMoreFilters = () => {
    setFilters(prev => ({ ...prev, showMore: !prev.showMore }));
  };

  const filteredCars = cars.filter(car => {
    const yearMatch = filters.year ? car.description.includes(filters.year) : true;
    const makeMatch = filters.make ? car.description.toLowerCase().includes(filters.make.toLowerCase()) : true;
    const priceMatch = filters.price ? car.price <= parseFloat(filters.price) : true;
    const mileageMatch = filters.mileage ? parseFloat(car.odometer?.replace(/[^0-9]/g, '') || 0) <= parseFloat(filters.mileage) : true;
    return yearMatch && makeMatch && priceMatch && mileageMatch;
  });

  return (
    <>
      <Navbar />
      <div style={{ background: "url('/background.jpg') no-repeat center center fixed", backgroundSize: 'cover' }}>
        <div className="container py-5 text-white">
          <h1 className="text-warning mb-4">Available Vehicles</h1>

          {/* Filters Inline */}
          <div className="bg-dark p-3 rounded mb-4">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Year</label>
                <select name="year" className="form-select" value={filters.year} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Make</label>
                <select name="make" className="form-select" value={filters.make} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  <option value="BMW">BMW</option>
                  <option value="Audi">Audi</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Porsche">Porsche</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Max Price</label>
                <input name="price" type="number" className="form-control" value={filters.price} onChange={handleFilterChange} placeholder="$40,000" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Max Mileage</label>
                <input name="mileage" type="number" className="form-control" value={filters.mileage} onChange={handleFilterChange} placeholder="100,000" />
              </div>
            </div>

            {/* Expandable Filters */}
            {filters.showMore && (
              <div className="row g-3 mt-3">
                {/* Additional filters coming soon */}
              </div>
            )}

            <div className="mt-3 d-flex justify-content-between">
              <button className="btn btn-sm btn-outline-light" onClick={handleClearFilters}>Clear Filters</button>
              <button className="btn btn-sm btn-warning" onClick={toggleMoreFilters}>
                {filters.showMore ? 'Hide Additional Filters' : 'More Filters'}
              </button>
            </div>
          </div>

          {/* Vehicle Cards */}
          <div className="row">
            {filteredCars.length === 0 ? (
              <p className="text-white">No vehicles match your filters.</p>
            ) : (
              filteredCars.map((car, i) => (
                <div className="col-md-6 col-lg-4" key={i}>
                  <VehicleCard car={car} index={i} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inventory;
