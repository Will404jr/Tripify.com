import React from "react";
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
            className="seat-button"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "12px",
              border: "1px solid #ccc",
              background: isSeatSelected(seatNumber)
                ? "#007bff"
                : "transparent",
              color: isSeatSelected(seatNumber) ? "#fff" : "#000",
              borderRadius: "5px",
            }}
            onClick={() => handleSeatClick(seatNumber)}
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
    <div className="card" style={{ height: "30%", width: "30%" }}>
      <table className="prevost-x345-seat-layout">
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
