import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/locale/es_ES';
import Login from './components/Login';
import App from './App';
import './index.css';

const Root: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ConfigProvider locale={es_ES}>
      {isAuthenticated ? (
        <App onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </ConfigProvider>
  );
};

export default Root;
