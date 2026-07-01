import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined, DashboardOutlined, BgColorsOutlined, UploadOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import EquipmentList from './EquipmentList';
import ImportEquipment from './ImportEquipment';
import { authService } from '../services/auth';

interface AppProps {
  onLogout: () => void;
}

const App: React.FC<AppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'equipment':
        return <EquipmentList />;
      case 'import':
        return <ImportEquipment />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <div style={{ color: 'white', padding: '16px', fontSize: '18px', fontWeight: 'bold' }}>
          📊 Dashboard
        </div>
        <Menu theme="dark" mode="vertical" selectedKeys={[currentPage]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />} onClick={() => setCurrentPage('dashboard')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="equipment" icon={<BgColorsOutlined />} onClick={() => setCurrentPage('equipment')}>
            Equipos
          </Menu.Item>
          <Menu.Item key="import" icon={<UploadOutlined />} onClick={() => setCurrentPage('import')}>
            Importar
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Equipment Management System</h2>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.username}</span>
            </div>
          </Dropdown>
        </Layout.Header>
        <Layout.Content style={{ background: '#f0f2f5', padding: '24px', overflow: 'auto' }}>
          {renderContent()}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
