
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DriverList from './pages/DriverList';
import VehicleList from './pages/VehicleList';
import Transfer from './pages/Transfer';
import TransferHistory from './pages/TransferHistory';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'; 

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer/>
      <div className="container">
        <div className="page-content">
          <Routes>
            <Route path="/drivers" element={<DriverList />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/history" element={<TransferHistory />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
