import React, { useState } from "react";
import Axios from "axios";

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImage = () => {
    if (selectedImages.length === 0) {
      console.error("No images selected.");
      return;
    }

    for (const image of selectedImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bbifnh5x");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dzuu1kacl/image/upload",
        formData
      )
        .then((response) => {
          const {
            data: { secure_url },
          } = response; // Destructure to get secure_url
          console.log(`Secure URL: ${secure_url}`);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple // Allow multiple file selection
        onChange={(event) => {
          setSelectedImages([...selectedImages, ...event.target.files]);
        }}
      />
      <button onClick={uploadImage}>Upload Images</button>
    </div>
  );
};

export default ImageUpload;
