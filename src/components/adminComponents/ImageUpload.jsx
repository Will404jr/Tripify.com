import React, { useState } from "react";
import Axios from "axios";
import styles from "./ImageUpload.module.css"; // Import styles

const ImageUpload = ({ companyName }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImage = async () => {
    if (selectedImages.length === 0) {
      console.error("No images selected.");
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

    // Send image URLs to server after all uploads are complete
    if (imageUrls.length > 0) {
      try {
        await Axios.post("http://localhost:5000/api/uploadImages", {
          companyName,
          imageUrls,
        });
        console.log("Image URLs sent successfully!");
      } catch (error) {
        console.error("Error sending image URLs:", error);
      }
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <h5>{companyName} - Upload Images</h5> {/* Display company name */}
      <input
        type="file"
        multiple
        className={styles.imageUploadInput}
        onChange={(event) => {
          setSelectedImages([...selectedImages, ...event.target.files]);
        }}
      />
      <button className={styles.imageUploadButton} onClick={uploadImage}>
        Upload Images
      </button>
    </div>
  );
};

export default ImageUpload;
