import React from "react";

const ImageList = ({ images, onAdd, onRemove }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <img
            src={image}
            alt={`Image ${index}`}
            style={{
              width: "200px",
              height: "auto",
              marginRight: "10px",
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
        Add Image
      </button>
    </div>
  );
};

export default ImageList;
