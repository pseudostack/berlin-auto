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
    links // 👈 Grab the Carfax link directly from car object
  } = car;

  const parsedOdometer = Number((odometer || '0').replace(/,/g, '')).toLocaleString();
  const parsedPrice = parseFloat(price?.replace(/[^0-9.]/g, '') || '0').toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="glass-card text-white mb-4 shadow h-100 d-flex flex-column">
      <Link to={`/inventory/${car.id}`} className="text-decoration-none text-white d-flex flex-column flex-grow-1">
        <div className="position-relative">
          <img
            src={images.length > 0 ? images[0] : '/coming-soon.png'}
            className="card-img-top vehicle-img coming-soon"
            alt="Coming Soon"
          />

          {/* Overlay title on image */}
          <div className="image-overlay-title px-2 py-1">
            <div className="model-text">{description}</div>
            {trim && <div className="trim-text">{trim}</div>}
          </div>
        </div>

        {/* Specs with background */}
        <div className="vehicle-specs-bg p-3 d-flex flex-column flex-grow-1">
          <p className="text-uppercase text-warning fw-bold mb-2" style={{ fontSize: '0.9rem' }}>
            Vehicle Specs:
          </p>
          <p className="mb-1"><strong>Drive:</strong> {drive || 'N/A'}</p>
          <p className="mb-1"><strong>Transmission:</strong> {transmission || 'N/A'}</p>
          <p className="mb-1"><strong>Colour:</strong> {colour || 'N/A'}</p>
          <p className="mb-1"><strong>Odometer:</strong> {parsedOdometer} km</p>
          <p className="mb-0"><strong>Price:</strong> <span className="text-success">{parsedPrice}</span></p>
        </div>
      </Link>

      <div className="px-3 pb-3 d-flex flex-column gap-2">
        <Link
          to={`/book-test-drive?vehicle=${encodeURIComponent(`${car.description}${car.trim ? ` - ${car.trim}` : ''}`)}`}
          className="btn btn-sm btn-warning w-100"
        >
          Book Test Drive
        </Link>

        {/* Carfax badge */}
        {links && links.trim() !== '' && (
          <a
            href={links}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex justify-content-center"
          >
            <img
              src="/carfax-logo.svg" // Make sure this image exists in your public/static folder!
              alt="View Carfax"
              style={{ width: '100px', height: 'auto' }}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
