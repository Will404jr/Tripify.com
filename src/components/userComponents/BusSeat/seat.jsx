import React, { useState } from "react";
import "./seat.css";

const PrevostX345SeatLayout = ({ selectedSeat, handleChange }) => {
  const seatRows = 12;
  const seatColumns = 4;

  const handleSeatClick = (seatNumber) => {
    handleChange({ target: { name: "selectedSeat", value: seatNumber } });
  };

  const isSeatSelected = (seatNumber) => {
    return seatNumber === selectedSeat;
  };

  const seatLayout = [];

  for (let i = 0; i < seatRows; i++) {
    const row = [];
    for (let j = 0; j < seatColumns; j++) {
      const seatNumber = i * seatColumns + j + 1;
      row.push(
        <td key={`${i}-${j}`} style={{ padding: "5px" }}>
          <button
            className={`btn btn-outline-secondary seat ${
              isSeatSelected(seatNumber) ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(seatNumber)}
            style={{ width: "40px", height: "40px", fontSize: "12px" }}
          >
            {seatNumber}
          </button>
        </td>
      );
      // Add a gap after every two columns
      if ((j + 1) % 2 === 0 && j < seatColumns - 1) {
        row.push(<td key={`gap-${i}-${j}`} style={{ width: "50px" }}></td>);
      }
    }
    seatLayout.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className="container mt-4">
      <table className="table table-borderless table-sm prevost-x345-seat-layout">
        <thead className="table-dark">
          <tr>
            <th colSpan={seatColumns}>Bus Front</th>
          </tr>
        </thead>
        <tbody>{seatLayout}</tbody>
        <tfoot className="table-dark">
          <tr>
            <td colSpan={seatColumns}>Bus Rear</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PrevostX345SeatLayout;
