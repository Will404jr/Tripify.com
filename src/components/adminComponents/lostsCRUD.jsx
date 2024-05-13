import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

const LostsCrud = () => {
  const [lostItems, setLostItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (user && user.company) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await axios.get("http://localhost:5000/api/lost");
          // Filter lost items based on company name in decoded JWT token
          const filteredItems = response.data.filter(
            (item) => item.company === user.company
          );
          setLostItems(filteredItems);
        } catch (error) {
          console.error("Error fetching lost items:");
          setError(error.message || "An error occurred while fetching data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lost/${id}`);
      message.success("Item deleted successfully");
      setLostItems(lostItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item");
    }
  };

  return (
    <div className="lost-items-grid">
      {isLoading && <p>Loading lost items...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading &&
        lostItems.length > 0 &&
        lostItems.map((lostItem) => (
          <div key={lostItem._id} className="lost-item-card">
            {lostItem.images.length > 0 && (
              <figure>
                <img
                  src={lostItem.images[0]}
                  alt={lostItem.description}
                  className="lost-item-image"
                />
              </figure>
            )}
            <div className="lost-item-details">
              <h6 className="lost-item-title">
                Description: {lostItem.description}
              </h6>
              <h6 className="lost-item-info">
                Bus company: {lostItem.company}
              </h6>
              <h6 className="lost-item-info">Contact: {lostItem.contact}</h6>
            </div>
            <div
              className="delete-icon"
              onClick={() => handleDelete(lostItem._id)}
              style={{
                padding: "5px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "40%",
              }}
            >
              <p>
                <DeleteOutlined /> Delete
              </p>
            </div>
          </div>
        ))}
      {!isLoading && lostItems.length === 0 && <p>No lost items found.</p>}
    </div>
  );
};

export default LostsCrud;
