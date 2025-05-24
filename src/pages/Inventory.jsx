import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import VehicleCard from '../components/VehicleCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({
    years: [],
    makes: [],
    models: [],
    transmissions: [],
    cylinders: [],
    colors: []
  });
  const [filters, setFilters] = useState({
    year: '',
    make: '',
    model: '',
    transmission: '',
    cylinders: '',
    colour: '',
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
   const parsed = cleaned
  .map((car, index) => {
    const [year, make, ...modelParts] = car.description.split(' ');
    return {
      ...car,
      id: index + 1,
      year,
      make,
      model: modelParts.join(' '),
      price: parseFloat(car['List price']?.replace(/[^0-9.]/g, '')) || 0,
      mileage: parseFloat(car.odometer?.replace(/[^0-9]/g, '')) || 0,
      images: car.images
        ? car.images.split(',').map(i => i.trim()).filter(i => i !== '')
        : []
    };
  })
  .sort((a, b) => {
    if (a.status === 'In Stock' && b.status !== 'In Stock') return -1;
    if (a.status !== 'In Stock' && b.status === 'In Stock') return 1;
    return 0;
  });

            setCars(parsed);

            const getUnique = key => [...new Set(parsed.map(car => car[key]).filter(Boolean))];
            setAvailableFilters({
              years: getUnique('year'),
              makes: getUnique('make'),
              models: getUnique('model'),
              transmissions: getUnique('transmission'),
              cylinders: getUnique('cylinders'),
              colors: getUnique('colour')
            });
          }
        });
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      year: '',
      make: '',
      model: '',
      transmission: '',
      cylinders: '',
      colour: '',
      price: '',
      mileage: '',
      showMore: false
    });
  };

  const toggleMoreFilters = () => {
    setFilters(prev => ({ ...prev, showMore: !prev.showMore }));
  };

  const filteredCars = cars.filter(car =>
    (!filters.year || car.year === filters.year) &&
    (!filters.make || car.make === filters.make) &&
    (!filters.model || car.model === filters.model) &&
    (!filters.transmission || car.transmission === filters.transmission) &&
    (!filters.cylinders || car.cylinders === filters.cylinders) &&
    (!filters.colour || car.colour === filters.colour) &&
    (!filters.price || car.price <= parseFloat(filters.price)) &&
    (!filters.mileage || car.mileage <= parseFloat(filters.mileage))
  );

  return (
    <>
      <Navbar />
      <div style={{ background: "url('/background.jpg') no-repeat center center fixed", backgroundSize: 'cover' }}>
        <div className="container py-5 text-white">
          <h1 className="text-warning mb-4">Available Vehicles</h1>

          {/* Filters */}
          <div className="bg-dark p-3 rounded mb-4">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Year</label>
                <select name="year" className="form-select" value={filters.year} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  {availableFilters.years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Make</label>
                <select name="make" className="form-select" value={filters.make} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  {availableFilters.makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Model</label>
                <select name="model" className="form-select" value={filters.model} onChange={handleFilterChange}>
                  <option value="">Any</option>
                  {availableFilters.models
                    .filter(model => {
                      const matchCar = cars.find(car =>
                        (!filters.make || car.make === filters.make) &&
                        (!filters.year || car.year === filters.year) &&
                        car.model === model
                      );
                      return !!matchCar;
                    })
                    .map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* More Filters */}
            {filters.showMore && (
              <div className="row g-3 mt-3">
                <div className="col-md-4">
                  <label className="form-label">Transmission</label>
                  <select name="transmission" className="form-select" value={filters.transmission} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    {availableFilters.transmissions.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Cylinders</label>
                  <select name="cylinders" className="form-select" value={filters.cylinders} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    {availableFilters.cylinders.map(cyl => (
                      <option key={cyl} value={cyl}>{cyl}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Colour</label>
                  <select name="colour" className="form-select" value={filters.colour} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    {availableFilters.colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Max Price</label>
                  <input name="price" type="number" className="form-control" value={filters.price} onChange={handleFilterChange} placeholder="e.g. 25000" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Max Mileage</label>
                  <input name="mileage" type="number" className="form-control" value={filters.mileage} onChange={handleFilterChange} placeholder="e.g. 100000" />
                </div>
              </div>
            )}

            {/* Actions */}
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
