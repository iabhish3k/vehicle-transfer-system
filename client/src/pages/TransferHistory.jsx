import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransferHistory() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInitialTransferHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/transfers`);
      console.log(res.data.data);
      setTransfers(res.data.data);
    } catch (error) {
      console.log(error);
    }finally{
    setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  useEffect(() => {
    getInitialTransferHistory();
  }, []);

  return (
    <div className="table-container">
      <h1>Transfer History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>From Driver ID</th>
              <th>To Driver ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.vehicle_number}</td>
                <td>
                  <div>
                    <img src={`http://localhost:3000/api/v1/${transfer?.fromDriver?.profile_photo}`} alt={transfer?.fromDriver?.name} style={{ width: '25px', height: '25px', borderRadius: '25%' }} />
                    <span>{transfer?.fromDriver?.name}</span>
                  </div>
                </td>
                <td>
                  <div>
                    <img src={`http://localhost:3000/api/v1/${transfer?.toDriver?.profile_photo}`} alt={transfer?.toDriver?.name} style={{ width: '25px', height: '25px', borderRadius: '25%' }} />
                    <span>{transfer?.toDriver?.name}</span>
                  </div>
                </td>
                <td>{formatDate(transfer.transfer_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransferHistory;
