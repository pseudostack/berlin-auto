import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Financing from './pages/Financing';
import Inventory from './pages/Inventory';
import CarDetail from './pages/CarDetail';
import Warranty from './pages/WarrantyPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BookTestDrive from './pages/BookTestDrive';

const App = () => {
  return (
    <Router>

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/inventory" element={<Inventory />} />
  <Route path="/inventory/:id" element={<CarDetail />} />
  <Route path="/financing" element={<Financing />} />
    <Route path="/warranty" element={<Warranty />} />
    <Route path="/book-test-drive" element={<BookTestDrive />} />

  <Route path="/about" element={<AboutUs />} />
  <Route path="/contact" element={<ContactUs />} />

</Routes>

    </Router>
  );
};

export default App;
