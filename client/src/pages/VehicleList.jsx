import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_number: '',
    vehicle_type: '',
  });
  const pucCertificateRef = useRef(null);
  const insuranceCertificateRef = useRef(null);

  const getInitialVehicleList = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/v1/vehicles');
      setVehicles(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialVehicleList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const fileValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: fileValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('vehicle_number', formData.vehicle_number);
    data.append('vehicle_type', formData.vehicle_type);
    data.append('puc_certificate', formData.puc_certificate);
    data.append('insurance_certificate', formData.insurance_certificate);

    try {
      await axios.post('http://localhost:3000/api/v1/vehicles', data);
      toast.success('Vehicles added successfully!');

      getInitialVehicleList();
      setFormData({
        vehicle_number: '',
        vehicle_type: '',
      });
      if (pucCertificateRef.current) pucCertificateRef.current.value = '';
      if (insuranceCertificateRef.current) insuranceCertificateRef.current.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Add New Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Vehicle Number:</label>
            <input
              type="text"
              name="vehicle_number"
              value={formData.vehicle_number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Vehicle Type:</label>
            <input
              type="text"
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>PUC Certificate:</label>
            <input
              type="file"
              name="puc_certificate"
              ref={pucCertificateRef}
              onChange={handleInputChange}
              // required
            />
          </div>
          <div>
            <label>Insurance Certificate:</label>
            <input
              type="file"
              name="insurance_certificate"
              ref={insuranceCertificateRef}
              onChange={handleInputChange}
              // required
            />
          </div>
          <button type="submit">Add Vehicle</button>
        </form>
      </div>

      <div className="table-container">
        <h1>Vehicle List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vehicle_number}>
                  <td>{vehicle.vehicle_number}</td>
                  <td>{vehicle.vehicle_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default VehicleList;
