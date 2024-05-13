import React from "react";

const ScheduleList = ({ schedules, onAdd, onRemove }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Schedules</h3>
      {schedules.map((schedule, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={schedule}
            onChange={(e) => onRemove(index)}
            style={{
              padding: "5px",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onAdd("")}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Schedule
      </button>
    </div>
  );
};

export default ScheduleList;
