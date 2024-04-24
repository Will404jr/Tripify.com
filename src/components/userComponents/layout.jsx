import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
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
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "book",
    icon: <CarOutlined />,
    label: "Book a trip",
  },
  {
    key: "package",
    icon: <DeliveredProcedureOutlined />,
    label: "Deliver a package",
  },
  {
    key: "schedules",
    icon: <ScheduleOutlined />,
    label: "Buses",
  },
  {
    key: "lostandFound",
    icon: <InfoCircleOutlined />,
    label: "Lost and found",
  },
  {
    key: "trips",
    icon: <SendOutlined />,
    label: "Manage trips",
    loggedIn: true, // New property to indicate it's displayed when logged in
  },
];

const UserDisplay = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  const handleClick = ({ key }) => {
    setSelectedKey(key);
    if (key === "logout") {
      // Implement logout feature
    } else {
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
          defaultSelectedKeys={["home"]} // Default selected key
          onClick={handleClick}
        >
          {items.map((item) =>
            // Conditionally render menu item based on authentication status
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
            {!isLoggedIn && ( // Display login link if not logged in
              <Link to="/auth">
                <h6
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    ":hover": { transform: "scale(3.3)" },
                  }}
                >
                  Login/Register
                </h6>
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
  return foundItem ? foundItem.label : ""; // Return label or empty string
};

export default UserDisplay;
