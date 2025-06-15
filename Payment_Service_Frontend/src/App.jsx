import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentForm from './PaymentForm.jsx';
import PaymentSuccess from './PaymentSuccess.jsx';
import PaymentCancel from './PaymentCancel.jsx';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PaymentForm />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;