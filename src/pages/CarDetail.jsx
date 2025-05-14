import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FinancingCalculator from '../components/FinancingCalculator';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch('/inventory.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data }) => {
            const selected = data[parseInt(id) - 1];
            if (selected) {
              setCar({
                ...selected,
                images: selected.images?.split(',').map(url => url.trim()) || [],
              });
            }
          }
        });
      });
  }, [id]);

  if (!car) return <p className="text-white text-center mt-5">Loading car details...</p>;

  const {
    description,
    trim,
    drive,
    transmission,
    cylinders,
    colour,
    odometer,
    'cert/as-is': certified,
    status,
    'List price': rawPrice
  } = car;

  const parsedPrice = parseFloat(rawPrice?.replace(/[^0-9.]/g, '')) || 0;
  const parsedOdometer = parseInt(odometer?.replace(/[^0-9]/g, '') || '0').toLocaleString();

  return (
    <>
      <Navbar />

      <section style={{
        background: "url('/background.jpg') no-repeat center center fixed",
        backgroundSize: 'cover',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div className="container" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          padding: '40px'
        }}>
          <Link to="/inventory" className="btn btn-outline-light mb-4">← Back to Inventory</Link>

          <div className="row">
            <div className="col-lg-6">
              {car.images.length > 0 ? (
                <Carousel showThumbs={false} infiniteLoop autoPlay>
                  {car.images.map((src, i) => (
                    <div key={i}>
                      <img
                        src={src}
                        alt={`Photo ${i + 1}`}
                        style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <p>No images available.</p>
              )}
            </div>

            <div className="col-lg-6">
              <h2 className="text-warning">{description} {trim && `- ${trim}`}</h2>
              <hr className="bg-light" />
              <ul className="list-unstyled">
                <li><strong>Drive:</strong> {drive || 'N/A'}</li>
                <li><strong>Transmission:</strong> {transmission || 'N/A'}</li>
                <li><strong>Engine:</strong> {cylinders ? `${cylinders}-Cyl` : 'N/A'}</li>
                <li><strong>Color:</strong> {colour || 'N/A'}</li>
                <li><strong>Odometer:</strong> {parsedOdometer} km</li>
                <li><strong>Status:</strong> {status}</li>
                <li><strong>Certified:</strong> {certified}</li>
                <li><strong>List Price:</strong> <span className="text-success fw-bold">${parsedPrice.toLocaleString()}</span></li>
              </ul>

              <div className="mt-3">
                <Link to="/contact" className="btn btn-outline-light">Book a Test Drive</Link>
              </div>
            </div>
          </div>

          {/* Financing Calculator Below */}
          <FinancingCalculator price={parsedPrice} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CarDetail;
