import React from "react";
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
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            padding: "10px 20px",
            background: colorBgContainer,
            display: "flex", // Added display: 'flex'
            justifyContent: "flex-end", // Added justifyContent: 'flex-end'
            alignItems: "center",
          }}
        >
          <UserOutlined style={{ marginRight: "20px" }} />
          <p>wjr46269@gmail.com</p>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Tripify ©{new Date().getFullYear()} Created by Group 8
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Display;
