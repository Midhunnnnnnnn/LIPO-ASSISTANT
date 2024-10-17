import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have a CSS file for styling

const PostalCodeDetails: React.FC = () => {
  const [postalCode, setPostalCode] = useState<string>('');
  const [pincodeData, setPincodeData] = useState<string | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const apiUrl = `https://api.postalpincode.in/pincode/${postalCode}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        const postOffices = data[0].PostOffice;
        let pincodeHtml = '';
        for (const postOffice of postOffices) {
          pincodeHtml += `
            <div class="post-office">
              <h3>Name: ${postOffice.Name}</h3>
              <p>Postal Code: ${postOffice.Pincode}</p>
              <p>City: ${postOffice.Name}</p>
              <p>District: ${postOffice.District}</p>
              <p>Division: ${postOffice.Division}</p>
              <p>Delivery Status: ${postOffice.DeliveryStatus}</p>
              <p>State: ${postOffice.State}</p>
            </div>
            <hr />
          `;
        }
        setPincodeData(pincodeHtml);
      } else {
        setPincodeData("<p>No data available</p>");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showIpAddress();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>{ipAddress ? `Your IP Address: ${ipAddress}` : 'Fetching IP...'}</h1>
        <h2>Indian Postal Code Details</h2>
      </header>
      <form id="pincodeForm" onSubmit={handleSubmit}>
        <input
          type="search"
          id="search"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Search By Pincode"
          required
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div id="pincode" className="results" dangerouslySetInnerHTML={{ __html: pincodeData || '' }} />
    </div>
  );
};

export default PostalCodeDetails;