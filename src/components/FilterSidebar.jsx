import React from 'react';

const FilterSidebar = ({ filters, onChange }) => {
  return (
    <div className="bg-dark text-white p-3 rounded shadow">
      <h5 className="text-warning mb-3">Filter Vehicles</h5>

      <div className="mb-3">
        <label htmlFor="year" className="form-label">Year</label>
        <select className="form-select" id="year" value={filters.year} onChange={onChange}>
          <option value="">Any</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="make" className="form-label">Make</label>
        <select className="form-select" id="make" value={filters.make} onChange={onChange}>
          <option value="">Any</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Porsche">Porsche</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Max Price ($)</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={filters.price}
          onChange={onChange}
          placeholder="40000"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="mileage" className="form-label">Max Mileage (km)</label>
        <input
          type="number"
          className="form-control"
          id="mileage"
          name="mileage"
          value={filters.mileage}
          onChange={onChange}
          placeholder="100000"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
