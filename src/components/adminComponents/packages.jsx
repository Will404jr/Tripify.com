import React, { useState, useEffect } from "react";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/packages");
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Packages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : packages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Names</th>
                <th>Tell Number</th>
                <th>Recipient's Names</th>
                <th>Recipient's Number</th>
                <th>Destination</th>
                <th>Chosen Bus</th>
                <th>Shipping Date</th>
                <th>Shipping Time</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.packageID}>
                  <td>{pkg.packageID}</td>
                  <td>{pkg.fullNames}</td>
                  <td>{pkg.tellNumber}</td>
                  <td>{pkg.recipientsNames}</td>
                  <td>{pkg.recipientsNumber}</td>
                  <td>{pkg.destination}</td>
                  <td>{pkg.chosenBus}</td>
                  <td>{new Date(pkg.shippingDate).toLocaleDateString()}</td>
                  <td>{pkg.shippingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Packages;
