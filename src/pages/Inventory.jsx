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
            const parsed = cleaned.map((car, index) => {
              const [year, make, ...modelParts] = car.description.split(' ');
              return {
                ...car,
                id: car['stock #'] || index + 1,
                year,
                make,
                model: modelParts.join(' '),
                price: parseFloat(car['List price']?.replace(/[^0-9.]/g, '')) || 0,
                mileage: parseFloat(car.odometer?.replace(/[^0-9]/g, '')) || 0,
                images: car.images ? car.images.split(',').map(i => i.trim()).filter(i => i !== '') : [],
                status: car.status?.trim().toLowerCase() || 'coming soon'
              };
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

  const filteredCars = cars
    .filter(car =>
      (!filters.year || car.year === filters.year) &&
      (!filters.make || car.make === filters.make) &&
      (!filters.model || car.model === filters.model) &&
      (!filters.transmission || car.transmission === filters.transmission) &&
      (!filters.cylinders || car.cylinders === filters.cylinders) &&
      (!filters.colour || car.colour === filters.colour) &&
      (!filters.price || car.price <= parseFloat(filters.price)) &&
      (!filters.mileage || car.mileage <= parseFloat(filters.mileage))
    )
.sort((a, b) => {
  const statusA = (a.status || '').trim().toLowerCase();
  const statusB = (b.status || '').trim().toLowerCase();

  const hasImageA = a.images && a.images.length > 0;
  const hasImageB = b.images && b.images.length > 0;

  const effectiveStatusA = statusA === 'in stock' && !hasImageA ? 'coming soon' : statusA;
  const effectiveStatusB = statusB === 'in stock' && !hasImageB ? 'coming soon' : statusB;

  if (effectiveStatusA === 'in stock' && effectiveStatusB !== 'in stock') return -1;
  if (effectiveStatusA !== 'in stock' && effectiveStatusB === 'in stock') return 1;
  return 0;
});
console.log('Sorted filtered cars:', filteredCars.map(c => ({
  status: c.status,
  name: c.description
})));

  return (
    <>
      <Navbar />
      <div style={{ background: "url('/background.jpg') no-repeat center center fixed", backgroundSize: 'cover' }}>
        <div className="container py-5 text-white">
          <h1 className="text-warning mb-4">Available Vehicles</h1>

          {/* Filter UI omitted for brevity */}

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