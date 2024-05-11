import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LostsCrud from "./lostsCRUD";

const LostAndFound = () => {
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);
    } else {
      navigate("/auth"); // Redirect to login if token not found
    }
  }, [navigate]);

  // Assuming you have access to the decoded user object
  const decodedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (decodedUser && decodedUser.company) {
      setCompany(decodedUser.company);
    }
  }, [decodedUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "description":
        setDescription(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "contact":
        setContact(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files)); // Convert FileList to an array
  };

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
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={contact}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="images">Images (Optional):</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleImageChange}
        />
        <button type="submit">Submit Lost Item</button>
      </form>
      <LostsCrud />
    </>
  );
};

export default LostAndFound;
