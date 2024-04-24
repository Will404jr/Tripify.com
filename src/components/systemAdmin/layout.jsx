import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  AndroidOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Home from "../home";
import UsersComponent from "./users";
import AdminsComponent from "./admins";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "admins",
    icon: <AndroidOutlined />,
    label: "Bus Admins",
  },
  {
    key: "users",
    icon: <UserOutlined />,
    label: "Users",
  },
  //   {
  //     key: "/addAdmin",
  //     icon: <UserAddOutlined />,
  //     label: "Add admin",
  //   },
  //   {
  //     key: "/lostandFound",
  //     icon: <InfoCircleOutlined />,
  //     label: "Lost and found",
  //   },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    danger: true,
  },
];

const SystemAdminDisplay = () => {
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
            <h6>ADMINISTRATOR</h6>
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
              <Route path="users" element={<UsersComponent />} />
              <Route path="admins" element={<AdminsComponent />} />
              {/* <Route path="/addAdmin" element={<Buses />} /> */}
              {/* <Route path="/trips" element={<Trips />} /> */}
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

export default SystemAdminDisplay;
