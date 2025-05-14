import React from 'react';
import { Link } from 'react-router-dom';
import './VehicleCard.css';

const VehicleCard = ({ car, index }) => {
  const {
    description,
    trim,
    drive,
    transmission,
    colour,
    odometer,
    'List price': price,
    images = [],
  } = car;

  const parsedOdometer = parseInt(odometer || '0').toLocaleString();
const parsedPrice = parseFloat(price?.replace(/[^0-9.]/g, '') || '0').toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });

  return (
    <div className="glass-card text-white mb-4 shadow">
      <Link to={`/inventory/${index + 1}`} className="text-decoration-none text-white">
        {images.length > 0 && (
          <img
            src={images[0]}
            className="card-img-top"
            alt={description}
            style={{ height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
          />
        )}
        <div className="p-3">
          <h5 className="fw-bold">{description} {trim && `- ${trim}`}</h5>
          <p className="mb-1"><strong>Drive:</strong> {drive || 'N/A'}</p>
          <p className="mb-1"><strong>Transmission:</strong> {transmission || 'N/A'}</p>
          <p className="mb-1"><strong>Odometer:</strong> {parsedOdometer} km</p>
          <p className="mb-0"><strong>Price:</strong> <span className="text-success">{parsedPrice}</span></p>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <Link to="/contact" className="btn btn-sm btn-warning w-100 mt-2">Book Test Drive</Link>
      </div>
    </div>
  );
};

export default VehicleCard;
