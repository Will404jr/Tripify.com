import React from "react";

const BusDetailsForm = ({ busDetails, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <form style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Company:
        <input
          type="text"
          name="company"
          value={busDetails.company}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label style={{ display: "block", marginBottom: "10px" }}>
        Manager:
        <input
          type="text"
          name="manager"
          value={busDetails.manager}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label style={{ display: "block", marginBottom: "10px" }}>
        Contact:
        <input
          type="text"
          name="contact"
          value={busDetails.contact}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label style={{ display: "block", marginBottom: "10px" }}>
        Courrier Price:
        <input
          type="number"
          name="courrierPrice"
          value={busDetails.courrierPrice}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
    </form>
  );
};

export default BusDetailsForm;
