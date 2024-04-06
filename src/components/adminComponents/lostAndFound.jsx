import React, { useState } from "react";
import Axios from "axios";
import styles from "./ImageUpload.module.css"; // Import styles

const LostAndFound = ({ companyName }) => {
  const [description, setDescription] = useState("");
  const [station, setStation] = useState("");
  const [contact, setContact] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadData = async () => {
    if (!description || !station || !contact) {
      console.error("Please fill in all fields.");
      return;
    }

    if (selectedImages.length === 0) {
      console.error("Please select at least one image.");
      return;
    }

    const imageUrls = [];
    for (const image of selectedImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bbifnh5x");

      try {
        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/dzuu1kacl/image/upload",
          formData
        );
        imageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Send data to server after all uploads are complete
    if (imageUrls.length > 0) {
      try {
        await Axios.post("http://localhost:5000/api/lost", {
          description,
          station,
          contact,
          images: imageUrls,
        });
        console.log("Data sent successfully!");
        // Clear form fields after successful submission
        setDescription("");
        setStation("");
        setContact("");
        setSelectedImages([]);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Station:
        <input
          type="text"
          value={station}
          onChange={(e) => setStation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Contact:
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </label>
      <br />
      <input
        type="file"
        multiple
        className={styles.imageUploadInput}
        onChange={(event) => {
          setSelectedImages([...selectedImages, ...event.target.files]);
        }}
      />
      <button className={styles.imageUploadButton} onClick={uploadData}>
        Upload Data
      </button>
    </div>
  );
};

export default LostAndFound;
