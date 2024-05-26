import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Transfer() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [fromDriverId, setFromDriverId] = useState('');
  const [toDriverId, setToDriverId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);


  const fetchVehicleOptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/vehicles');
      const options = response.data.data.map(vehicle => ({
        value: vehicle.vehicle_number,
        label: vehicle.vehicle_number
      }));
      setVehicleOptions(options);
    } catch (error) {
      console.error('Error fetching vehicle options', error);
    }
  };

  const fetchDriverOptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/drivers');
      console.log(response.data.data);
      const options = response.data.data.map(driver => ({
        value: driver.id,
        label: driver.name
      }));
      setDriverOptions(options);
    } catch (error) {
      console.error('Error fetching driver options', error);
    }
  };

  const handleTransfer = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3000/api/v1/transfers', {
        vehicle_number: vehicleNumber,
        from_driver_id: fromDriverId,
        to_driver_id: toDriverId
      });
      setVehicleNumber("")
      setFromDriverId("")
      setToDriverId("")
      toast.success('Transfers added successfully!');

    } catch (error) {
      console.error('Transfer error', error);
      setError('Error transferring vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleOptions();
    fetchDriverOptions();
  }, []);

  return (
    <div>
      <h1>Transfer Vehicle</h1>
      {error && <p>{error}</p>}
      <form onSubmit={e => { e.preventDefault(); handleTransfer(); }}>
        <div>
          <label>Vehicle Number</label>
          <select value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} required>
            <option value="">Select Vehicle Number</option>
            {vehicleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label>From Driver ID</label>
          <select value={fromDriverId} onChange={e => setFromDriverId(e.target.value)} required>
            <option value="">Select From Driver</option>
            {driverOptions.map(option => (
              <option key={option.value} value={option.value}>{option.value}-{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label>To Driver ID</label>
          <select value={toDriverId} onChange={e => setToDriverId(e.target.value)} required>
            <option value="">Select To Driver</option>
            {driverOptions.map(option => (
              <option key={option.value} value={option.value}>{option.value}-{option.label}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Transferring...' : 'Transfer'}</button>
      </form>
    </div>
  );
}

export default Transfer;
