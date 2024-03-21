import React from "react";

const tripsData = [
  {
    bus: "Bus 1 (Luxury)",
    from: "City A",
    to: "City B",
    departureTime: "09:00 AM",
    arrivalTime: "01:00 PM",
    date: "2024-03-25", // Sample date
  },
  {
    bus: "Bus 2 (Standard)",
    from: "City B",
    to: "City C",
    departureTime: "11:00 AM",
    arrivalTime: "04:00 PM",
    date: "2024-03-26", // Sample date
  },
  // ... Add 8 more dummy data objects with "date" property
  {
    bus: "Bus X (Express)",
    from: "City Z",
    to: "City A",
    departureTime: "07:00 PM",
    arrivalTime: "10:00 PM",
    date: "2024-03-27", // Sample date
  },
];

const Trips = () => {
  return (
    <div className="container">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Bus</th>
            <th scope="col">Date</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {tripsData.map((trip, index) => (
            <tr key={index}>
              <td>{trip.bus}</td>
              <td>{trip.date}</td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.departureTime}</td>
              <td>{trip.arrivalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trips;
