import React from 'react';
import { Layout, Menu, Avatar, Dropdown, theme } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  BankOutlined,
  FileTextOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const FinanceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const menuItems = [
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: '财务统计',
    },
    {
      key: 'settlement',
      icon: <BankOutlined />,
      label: '门店结算',
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: '自定义报表',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/finance/${e.key}`);
  };

  const handleUserMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px', 
        background: token.colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          color: token.colorPrimary,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <DashboardOutlined />
          财务管理中心
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
            <Avatar style={{ cursor: 'pointer', backgroundColor: token.colorPrimary }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: token.colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['statistics']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{
            padding: 24,
            margin: 0,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
            minHeight: 280,
          }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FinanceLayout; 