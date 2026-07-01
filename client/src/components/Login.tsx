import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Divider, Space } from 'antd';
import { authService } from '../services/auth';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      if (isLogin) {
        const response = await authService.login(values.email, values.password);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        message.success('Logged in successfully');
        onLoginSuccess();
      } else {
        await authService.register(values.email, values.username, values.password, values.fullName);
        message.success('Registered successfully, please login');
        setIsLogin(true);
      }
    } catch (error: any) {
      message.error(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400 }} title={isLogin ? 'Login' : 'Register'}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input type="email" />
          </Form.Item>

          {!isLogin && (
            <>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please enter username' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Full Name"
                name="fullName"
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form>

        <Divider />

        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <Button type="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
