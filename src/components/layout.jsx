import React, { useState } from "react";
import {
  HomeOutlined,
  DeliveredProcedureOutlined,
  UserOutlined,
  ScheduleOutlined,
  InfoCircleOutlined,
  SendOutlined,
  CarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
// Import your package component (replace with your actual path)
import Package from "./deliverPackage";
import Buses from "./buses/buses"; // Import your Buses component
import LostAndFound from "./Lost and found/lostAndFound"; // Import your LostAndFound component
import Book from "./book";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "2",
    icon: <CarOutlined />,
    label: "Book a trip",
  },
  {
    key: "3",
    icon: <DeliveredProcedureOutlined />,
    label: "Deliver a package",
  },
  {
    key: "4",
    icon: <ScheduleOutlined />,
    label: "Bus schedules",
  },
  {
    key: "5",
    icon: <InfoCircleOutlined />,
    label: "Lost and found",
  },
  {
    key: "6",
    icon: <SendOutlined />,
    label: "Trips",
  },
  {
    key: "7",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

const Display = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Move the state management inside the component
  const [selectedKey, setSelectedKey] = useState("1"); // Default selected key

  const handleClick = (key) => {
    setSelectedKey(key);
  };

  const componentsMap = {
    2: Book,
    3: Package,
    4: Buses,
    5: LostAndFound,
  }; // Map selected key to corresponding component

  const renderContent = (key) => {
    const Component = componentsMap[key]; // Get component based on key
    return Component ? <Component /> : null; // Render component if it exists
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ height: "100%" }}
      >
        <h1 style={{ color: "white", margin: "20px" }}>Tripify</h1>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          // Use the selectedKey state directly
          selectedKeys={[selectedKey]}
          items={items}
          onClick={handleClick} // Pass handleClick function to Menu
        />
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            padding: "10px 20px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <UserOutlined style={{ marginRight: "20px" }} />
          <p>wjr46269@gmail.com</p>
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              maxHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: "scroll",
            }}
          >
            {renderContent(selectedKey)}{" "}
            {/* Call renderContent with updated state */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Display;
