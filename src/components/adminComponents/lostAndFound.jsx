import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { message } from "antd";

import LostsCrud from "./lostsCRUD";

const LostAndFound = () => {
  const navigate = useNavigate();

  // Initialize state variables
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [station, setStation] = useState("");
  const [contact, setContact] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  // Get the decoded user object from local storage
  const decodedUser = jwtDecode(localStorage.getItem("token"));

  // Initialize user state variable
  const [user, setUser] = useState(null);

  // Set the user state variable when the component mounts
  useEffect(() => {
    if (decodedUser) {
      setUser(decodedUser);
    } else {
      navigate("/auth"); // Redirect to login if token not found
    }
  }, [decodedUser, navigate]);

  // Set the company state variable when the user state variable changes
  useEffect(() => {
    if (user && user.company) {
      setCompany(user.company);
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "description":
        setDescription(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "station":
        setStation(value);
        break;
      case "contact":
        setContact(value);
        break;
      default:
        break;
    }
  };

  // Handle image changes
  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files)); // Convert FileList to an array
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handle image uploads to Cloudinary
    const imageUrls = [];
    for (const image of selectedImages) {
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("upload_preset", "bbifnh5x");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzuu1kacl/image/upload",
          imageFormData
        );
        imageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Construct a single data object with all form values
    const dataObject = {
      description: description,
      company: company,
      station: station,
      contact: contact,
      images: imageUrls, // Assuming imageUrls is an array of image URLs
    };

    console.log("Data object:", dataObject);

    // Send the data object to the server
    try {
      await axios.post("http://localhost:5000/api/lost", dataObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Display success message
      message.success("Lost item has been successfully posted");
      console.log("Data sent successfully!");

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={handleInputChange}
          required
          disabled // Disable the company input field since it's already set
        />
        <br />
        <input
          type="text"
          id="station"
          name="station"
          placeholder="Station"
          value={station}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Contact"
          value={contact}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleImageChange}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit Lost Item
        </button>
      </form>
      <LostsCrud />
    </>
  );
};

export default LostAndFound;
