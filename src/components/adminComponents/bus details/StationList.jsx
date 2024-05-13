import React from "react";

const StationList = ({ stations, onAdd, onRemove }) => {
  const handleAddDestination = (stationIndex) => {
    const newStation = {
      ...stations[stationIndex],
      destinations: [
        ...stations[stationIndex].destinations,
        { name: "", price: 0 },
      ],
    };
    onAdd(newStation);
  };

  const handleRemoveStation = (index) => {
    const newStations = [...stations];
    newStations.splice(index, 1);
    onRemove(index);
  };

  const handleRemoveDestination = (stationIndex, destinationIndex) => {
    const newStations = [...stations];
    newStations[stationIndex].destinations.splice(destinationIndex, 1);
    onAdd(newStations);
  };

  return (
    <div>
      {stations.map((station, stationIndex) => (
        <div key={stationIndex} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={station.stationName}
            onChange={(e) => onRemove(stationIndex)}
            style={{
              padding: "5px",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            type="button"
            onClick={() => handleRemoveStation(stationIndex)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove Station
          </button>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {station.destinations.map((destination, destinationIndex) => (
              <li key={destinationIndex} style={{ marginBottom: "5px" }}>
                <input
                  type="text"
                  value={destination.name}
                  onChange={(e) =>
                    handleRemoveDestination(stationIndex, destinationIndex)
                  }
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
                <input
                  type="number"
                  value={destination.price}
                  onChange={(e) =>
                    handleRemoveDestination(stationIndex, destinationIndex)
                  }
                  style={{
                    padding: "5px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveDestination(stationIndex, destinationIndex)
                  }
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove Destination
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => handleAddDestination(stationIndex)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Destination
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onAdd({ stationName: "", destinations: [{ name: "", price: 0 }] })
        }
        style={{
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Station
      </button>
    </div>
  );
};

export default StationList;
