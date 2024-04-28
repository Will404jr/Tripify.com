import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  HomeOutlined,
  DollarOutlined,
  EditOutlined,
  UserOutlined,
  InfoCircleOutlined,
  GoldOutlined,
  ReconciliationOutlined,
  CarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Home from "../home";
import Packages from "./packages";
import LostAndFound from "./lostAndFound";
import Booking from "./bookings";
import Finance from "./finance";
import TravelForm from "./RegisterForm";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "bookings",
    icon: <CarOutlined />,
    label: "Bookings",
  },
  {
    key: "packages",
    icon: <GoldOutlined />,
    label: "Packages",
  },
  {
    key: "finance",
    icon: <DollarOutlined />,
    label: "Finance",
  },
  {
    key: "edit",
    icon: <EditOutlined />,
    label: "Bus Details",
  },
  {
    key: "lost",
    icon: <InfoCircleOutlined />,
    label: "Lost and found",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    danger: true,
  },
];

const AdminDisplay = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedKey, setSelectedKey] = React.useState("/");

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);
    } else {
      navigate("/login"); // Redirect to login if token not found
    }
  }, [navigate]);

  useEffect(() => {
    setSelectedKey(window.location.pathname); // Set selected key based on current path
  }, []);

  const handleClick = ({ key }) => {
    setSelectedKey(key);
    if (key === "logout") {
      localStorage.removeItem("token"); // Remove token from localStorage
      navigate("/login"); // Redirect to login
    } else {
      navigate(key);
    }
  };

  if (!user) return null; // Render nothing until user is loaded

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ height: "100%" }}>
        <h3 style={{ color: "white", margin: "20px" }}>Tripify</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          onClick={handleClick}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
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
            <UserOutlined style={{ marginRight: "20px" }} />
            <h6>{user.email}</h6>
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
            <Content2 />
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

const Content2 = () => {
  return (
    <div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="bookings" element={<Booking />} />
        <Route path="packages" element={<Packages />} />
        <Route path="finance" element={<Finance />} />
        <Route path="edit" element={<TravelForm />} />
        <Route path="lost" element={<LostAndFound />} />
      </Routes>
    </div>
  );
};

export default AdminDisplay;
