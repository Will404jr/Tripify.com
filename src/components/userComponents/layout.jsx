import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { Layout, Menu, theme } from "antd";
import LostAndFound from "./Lost and found/lostAndFound";
import Book from "./book";
import Package from "./deliverPackage";
import Home from "../home";
// import Schedules from "./schedules";
import Trips from "./trips";
import Buses from "./buses/buses";
import Ongoing from "./ongoingTrip";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/book",
    icon: <CarOutlined />,
    label: "Book a trip",
  },
  {
    key: "/package",
    icon: <DeliveredProcedureOutlined />,
    label: "Deliver a package",
  },
  {
    key: "/schedules",
    icon: <ScheduleOutlined />,
    label: "Buses",
  },
  {
    key: "/lostandFound",
    icon: <InfoCircleOutlined />,
    label: "Lost and found",
  },
  {
    key: "/trips",
    icon: <SendOutlined />,
    label: "Trips",
  },
  {
    key: "/ongoing",
    icon: <ArrowsAltOutlined />,
    label: "Ongoing trip",
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
            <h6>wjr46269@gmail.com</h6>
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
        <Route path="/book" element={<Book />}></Route>
        <Route path="/package" element={<Package />}></Route>
        <Route path="/schedules" element={<Buses />}></Route>
        <Route path="/lostandFound" element={<LostAndFound />}></Route>
        <Route path="/trips" element={<Trips />}></Route>
        <Route path="/ongoing" element={<Ongoing />}></Route>
      </Routes>
    </div>
  );
};

export default Display;
