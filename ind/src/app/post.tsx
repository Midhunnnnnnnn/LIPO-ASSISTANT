import React, { useState } from 'react';

const PincodeForm: React.FC = () => {
  const [postalCode, setPostalCode] = useState('');
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
            <hr>
            <h3>Name: ${postOffice.Name}</h3>
            <h3>Postal Code: ${postOffice.Pincode}</h3>
            <h3>City: ${postOffice.Name}</h3>
            <h3>District: ${postOffice.District}</h3>
            <h3>Division: ${postOffice.Division}</h3>
            <h3>Delivery Status: ${postOffice.DeliveryStatus}</h3>
            <h3>State: ${postOffice.State}</h3>
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

  return (
    <div>
      <form id="pincodeForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter postal code"
        />
        <button type="submit">Search</button>
      </form>
      <div id="pincode" dangerouslySetInnerHTML={{ __html: pincodeData || '' }} />
      <div id="ip-address">
        {ipAddress ? <strong>Your IP address:</strong> + ipAddress : null}
      </div>
      <button onClick={showIpAddress}>Show IP Address</button>
    </div>
  );
};

export default PincodeForm;