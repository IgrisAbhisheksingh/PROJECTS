import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const Adminlayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    { key: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/admin/new-employee', icon: <UserOutlined />, label: 'New Employee' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
     
      <Sider trigger={null} collapsible collapsed={collapsed}>
  
  <Menu
    theme="dark"
    mode="inline"
    selectedKeys={[location.pathname]}
    onClick={({ key }) => navigate(key)}
    items={items}
    className="custom-menu"
  />
</Sider>


       
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
          <div style={{ marginLeft: 16, fontWeight: 'bold' }}>Admin</div>
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

       
      <style>
        {`
           
          .custom-menu .ant-menu-item:hover {
            background-color: #1890ff !important;
            color: white !important;
          }

            
          .custom-menu .ant-menu-item-selected {
            background-color: #1890ff !important;
            color: white !important;
          }

           
          .custom-menu .ant-menu-item {
            transition: all 0.3s;
          }
        `}
      </style>
    </Layout>
  );
};

export default Adminlayout;
