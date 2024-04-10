import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import packages from "./packages";
import LostAndFound from "./lostAndFound";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/bookings",
    icon: <CarOutlined />,
    label: "Bookings",
  },
  {
    key: "/packages",
    icon: <GoldOutlined />,
    label: "Packages",
  },
  {
    key: "/finance",
    icon: <DollarOutlined />,
    label: "Finance",
  },
  {
    key: "/edit",
    icon: <EditOutlined />,
    label: "Edit",
  },
  {
    key: "/track",
    icon: <ReconciliationOutlined />,
    label: "Track receipt",
  },
  {
    key: "/lost",
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

const Display = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = React.useState("/");

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
          defaultSelectedKeys={["/"]}
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
            <h6>GLOBAL COACHES</h6>
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
        <Route path="/" element={<Home />}></Route>
        <Route path="/bookings" element={<bookings />}></Route>
        <Route path="/packages" element={<packages />}></Route>
        <Route path="/finance" element={<finance />}></Route>
        <Route path="/edit" element={<edit />}></Route>
        <Route path="/track" element={<track />}></Route>
        <Route path="/lost" element={<LostAndFound />}></Route>
      </Routes>
    </div>
  );
};

export default Display;
