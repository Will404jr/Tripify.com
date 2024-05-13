import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BusDetailsForm from "./BusDetailsForm";
import ImageList from "./ImageList";
import ScheduleList from "./ScheduleList";
import StationList from "./StationList";
import { Button, message } from "antd";

const EditBusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const match = { params: { id } };
  const [busDetails, setBusDetails] = useState({
    company: "",
    manager: "",
    contact: "",
    courrierPrice: 0,
    images: [],
    schedules: [],
    stations: [],
  });

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/${match.params.id}`
        );
        setBusDetails(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [match.params.id]);

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/editBus/${match.params.id}`,
        busDetails
      );
      message.success("Bus details updated successfully!"); // Display success message
      navigate(-1);
    } catch (error) {
      console.error("Error updating bus details:", error);
      message.error("Failed to update bus details. Please try again."); // Display error message
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Edit Bus Details</h2>
      <BusDetailsForm
        busDetails={busDetails}
        onChange={(newBusDetails) => setBusDetails(newBusDetails)}
      />
      <ImageList
        images={busDetails.images}
        onAdd={(newImage) =>
          setBusDetails((prevDetails) => ({
            ...prevDetails,
            images: [...prevDetails.images, newImage],
          }))
        }
        onRemove={(index) =>
          setBusDetails((prevDetails) => ({
            ...prevDetails,
            images: prevDetails.images.filter((_, i) => i !== index),
          }))
        }
      />
      <ScheduleList
        schedules={busDetails.schedules}
        onAdd={(newSchedule) =>
          setBusDetails((prevDetails) => ({
            ...prevDetails,
            schedules: [...prevDetails.schedules, newSchedule],
          }))
        }
        onRemove={(index) =>
          setBusDetails((prevDetails) => ({
            ...prevDetails,
            schedules: prevDetails.schedules.filter((_, i) => i !== index),
          }))
        }
      />
      <StationList
        stations={busDetails.stations}
        onAdd={(newStation) =>
          setBusDetails((prevDetails) => ({
            ...prevDetails,
            stations: [...prevDetails.stations, newStation],
          }))
        }
        onRemove={(index) =>
          setBusDetails((prevDetails) => ({
            ...prevDetails,
            stations: prevDetails.stations.filter((_, i) => i !== index),
          }))
        }
      />
      <Button
        type="primary"
        onClick={handleSaveChanges}
        style={{ marginTop: "20px" }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default EditBusDetails;
