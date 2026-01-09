import React from 'react';
import { Layout, theme } from 'antd';
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const Homelayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Link to="/admin">Visit Admin</Link>
      </Header>

      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
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
