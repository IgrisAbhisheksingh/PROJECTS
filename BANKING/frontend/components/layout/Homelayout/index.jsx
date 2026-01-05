import React from "react";
import { Link } from "react-router-dom";
import { Layout, theme } from "antd";

const { Header, Content } = Layout;

const Homelayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
    
      <Header
        style={{
          background: colorBgContainer,
          paddingLeft: 24,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/admin"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Admin
        </Link>
      </Header>

     
      <Content
        style={{
          margin: "24px",
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default Homelayout;
