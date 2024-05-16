import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  HomeOutlined,
  DeliveredProcedureOutlined,
  UserOutlined,
  ScheduleOutlined,
  InfoCircleOutlined,
  SendOutlined,
  CarOutlined,
  ArrowsAltOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import Book from "./book";
import Package from "./deliverPackage";
import Home from "../home";
import Trips from "./trips";
import Buses from "./buses/buses";
import LostAndFound from "./Lost and found/lostAndFound";

const { Header, Content, Sider } = Layout;

const items = [
  { key: "home", icon: <HomeOutlined />, label: "Home" },
  { key: "book", icon: <CarOutlined />, label: "Book a trip" },
  {
    key: "package",
    icon: <DeliveredProcedureOutlined />,
    label: "Deliver a package",
  },
  { key: "schedules", icon: <ScheduleOutlined />, label: "Buses" },
  {
    key: "lostandFound",
    icon: <InfoCircleOutlined />,
    label: "Lost and found",
  },
  {
    key: "trips",
    icon: <SendOutlined />,
    label: "Manage trips",
    loggedIn: true,
  },
  { key: "logout", icon: <LogoutOutlined />, label: "Logout", loggedIn: true },
];

const UserDisplay = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedKey, setSelectedKey] = useState(""); // State to track selected menu item
  const location = useLocation();
  const isLoggedIn = !!user; // Check if user is logged in

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    // Initialize selected key from local storage or default to home
    const storedKey = localStorage.getItem("selectedKey");
    setSelectedKey(storedKey || "home");
  }, []);

  useEffect(() => {
    // Save selected key to local storage
    localStorage.setItem("selectedKey", selectedKey);
  }, [selectedKey]);

  const handleClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      setSelectedKey(key); // Update selected key
      navigate(key);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ height: "100%" }}>
        <h3 style={{ color: "white", margin: "20px" }}>Tripify</h3>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
        >
          {items.map((item) =>
            (item.loggedIn && isLoggedIn) || !item.loggedIn ? (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ) : null
          )}
        </Menu>
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            backgroundColor: "white",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6>{findLabelByKey(selectedKey)}</h6>
          <div style={{ display: "flex" }}>
            {isLoggedIn ? (
              <h6>{user.email}</h6>
            ) : (
              <Link to="/auth">
                <h6>Login/Register</h6>
              </Link>
            )}
          </div>
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              maxHeight: 600,
              overflowY: "scroll",
              backgroundColor: "#eafefc",
            }}
          >
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="book" element={<Book />} />
              <Route path="package" element={<Package />} />
              <Route path="schedules" element={<Buses />} />
              <Route path="lostandFound" element={<LostAndFound />} />
              <Route path="trips" element={<Trips />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const findLabelByKey = (key) => {
  const foundItem = items.find((item) => item.key === key);
  return foundItem ? foundItem.label : "";
};

export default UserDisplay;
