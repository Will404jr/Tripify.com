import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./packages.css";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stationFilter, setStationFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [shippingTimeFilter, setShippingTimeFilter] = useState("");
  const [stationFilterOptions, setStationFilterOptions] = useState([]);
  const [destinationFilterOptions, setDestinationFilterOptions] = useState([]);
  const [shippingTimeFilterOptions, setShippingTimeFilterOptions] = useState(
    []
  );
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [busDetails, setBusDetails] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/auth"); // Redirect to login if token not found
    } else {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/packages"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/buses"
        );
        setBusDetails(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, []);

  useEffect(() => {
    if (busDetails && user && user.company) {
      const companyBusDetails = busDetails.find(
        (bus) => bus.company === user.company
      );
      if (companyBusDetails) {
        const stations = companyBusDetails.stations.map(
          (station) => station.stationName
        );
        setStationFilterOptions(stations);
      }
    }
  }, [busDetails, user]);

  useEffect(() => {
    if (stationFilter && busDetails) {
      const companyBusDetails = busDetails.find(
        (bus) => bus.company === user.company
      );
      if (companyBusDetails) {
        const selectedStation = companyBusDetails.stations.find(
          (station) => station.stationName === stationFilter
        );
        if (selectedStation) {
          const destinations = selectedStation.destinations.map(
            (destination) => destination.name
          );
          setDestinationFilterOptions(destinations);
        }
      }
    }
  }, [stationFilter, busDetails, user]);

  useEffect(() => {
    if (busDetails && user && user.company) {
      const companyBusDetails = busDetails.find(
        (bus) => bus.company === user.company
      );
      if (companyBusDetails) {
        const shippingTimes = companyBusDetails.schedules;
        setShippingTimeFilterOptions(shippingTimes);
      }
    }
  }, [busDetails, user]);

  useEffect(() => {
    let filtered = packages;
    if (user && user.company) {
      filtered = filtered.filter((pkg) => pkg.chosenBus === user.company);
    }
    if (stationFilter) {
      filtered = filtered.filter((pkg) =>
        pkg.destination.startsWith(`${stationFilter} -`)
      );
    }
    if (destinationFilter) {
      filtered = filtered.filter(
        (pkg) => pkg.destination === destinationFilter
      );
    }
    if (shippingTimeFilter) {
      filtered = filtered.filter(
        (pkg) => pkg.shippingTime === shippingTimeFilter
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((pkg) =>
        pkg.packageID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPackages(filtered);
  }, [
    user,
    stationFilter,
    destinationFilter,
    shippingTimeFilter,
    searchTerm,
    packages,
  ]);

  const handleClearPackage = async (_id) => {
    try {
      await axios.patch(
        process.env.REACT_APP_API_URL + "/packages/${_id}/clear"
      );

      // Fetch packages again after clearing
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/packages"
      );
      setPackages(response.data);
    } catch (error) {
      console.error("Error clearing package:", error);
    }
  };

  return (
    <div className="card">
      <h2>Packages</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Package ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={stationFilter}
          onChange={(e) => setStationFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Station</option>
          {stationFilterOptions.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </select>
        <select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Destination</option>
          {destinationFilterOptions.map((destination, index) => (
            <option key={index} value={destination}>
              {destination}
            </option>
          ))}
        </select>
        <select
          value={shippingTimeFilter}
          onChange={(e) => setShippingTimeFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Shipping Time</option>
          {shippingTimeFilterOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table className="ptable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Names</th>
              <th>Tell Number</th>
              <th>Recipient's Names</th>
              <th>Recipient's Number</th>
              <th>Pick up station</th>
              <th>Destination</th>
              <th>Shipping Date</th>
              <th>Shipping Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.packageID}</td>
                <td>{pkg.fullNames}</td>
                <td>{pkg.tellNumber}</td>
                <td>{pkg.recipientsNames}</td>
                <td>{pkg.recipientsNumber}</td>
                <td>{pkg.station}</td>
                <td>{pkg.destination}</td>
                <td>{new Date(pkg.shippingDate).toLocaleDateString()}</td>
                <td>{pkg.shippingTime}</td>
                <td>
                  {!pkg.cleared ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleClearPackage(pkg._id)}
                    >
                      Clear
                    </button>
                  ) : (
                    <span>Cleared</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Packages;
