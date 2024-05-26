import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    profile_photo: ''
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const fileValue = name === 'profile_photo' ? files[0] : value;
    setFormData({ ...formData, [name]: fileValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObject = new FormData();
      formDataObject.append('name', formData.name);
      formDataObject.append('phone_number', formData.phone_number);
      formDataObject.append('profile_photo', formData.profile_photo);
      
      const res =await axios.post('http://localhost:3000/api/v1/drivers', formDataObject);
      console.log(res);
      getInitialDriverList();
      setFormData({});
      toast.success('Drivers added successfully!');
    } catch (error) {
      console.log(error);
    } 
  };

  const getInitialDriverList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/drivers`);
      setDrivers(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialDriverList();
  }, []);

  return (
    <>
    <div>
    <div className="form-container">
        <h2>Add New Driver</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData?.name || ""} onChange={handleInputChange} required />
          <label>Phone Number:</label>
          <input type="text" name="phone_number" value={formData?.phone_number || ""} onChange={handleInputChange} required />
          <label>Profile Photo:</label>
          <input type="file" name="profile_photo" onChange={handleInputChange} required />
          <button type="submit">Add Driver</button>

        </form>
      </div>
    </div>

     <div className="table-container">
      <h1>Driver List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile Photo</th>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(drivers) && drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>
                  <img src={`http://localhost:3000/api/v1/${driver?.profile_photo}`} alt={driver?.name || ""} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </td>
                <td>{driver?.name || ""}</td>
                <td>{driver?.phone_number || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
   
  );
}

export default DriverList;
