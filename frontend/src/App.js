import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Invoices from './Invoices';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invoices" element={<Invoices />} />
    </Routes>
  </Router>
);

export default App;
