import React, { useState } from "react";
import "./seat.css";

const PrevostX345SeatLayout = () => {
  const seatRows = 12;
  const seatColumns = 4;
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat(seatNumber);
    console.log(`Clicked Seat ${seatNumber}`);
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
        <td key={`${i}-${j}`}>
          <button
            className={`btn btn-outline-secondary seat ${
              isSeatSelected(seatNumber) ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            Seat {seatNumber}
          </button>
        </td>
      );
    }
    seatLayout.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className="container mt-4">
      <table className="table table-bordered prevost-x345-seat-layout">
        <thead>
          <tr>
            <th colSpan={seatColumns}>Bus Front</th>
          </tr>
        </thead>
        <tbody>{seatLayout}</tbody>
        <tfoot>
          <tr>
            <td colSpan={seatColumns}>Bus Rear</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PrevostX345SeatLayout;
