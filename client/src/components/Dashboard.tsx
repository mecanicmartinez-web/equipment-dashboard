import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Select, Button } from 'antd';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyticsService } from '../services/analytics';
import { equipmentService } from '../services/equipment';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const statsResponse = await analyticsService.getStats();
      setStats(statsResponse.data);

      const equipmentResponse = await equipmentService.getAll({
        status: filter === 'all' ? undefined : filter,
      });
      setEquipment(equipmentResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Dashboard de Equipos</h1>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Equipos Totales"
              value={stats?.total_equipment || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="En Mantenimiento"
              value={stats?.in_maintenance || 0}
              valueStyle={{ color: '#ff7a45' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Disponibilidad"
              value={stats?.uptime_percentage || 0}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Costo Últimos 30 días"
              value={stats?.maintenance_cost_30days || 0}
              prefix="$"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Equipos por Categoría">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.equipment_by_category || []}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {(stats?.equipment_by_category || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Mantenimiento por Tipo">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.maintenance_by_type || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="maintenance_type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Equipment Table */}
      <Card title="Equipos" extra={
        <Select
          style={{ width: 150 }}
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'Todos', value: 'all' },
            { label: 'Activos', value: 'active' },
            { label: 'Inactivos', value: 'inactive' },
            { label: 'En Mantenimiento', value: 'maintenance' },
          ]}
        />
      }>
        <Table
          columns={[
            { title: 'Código', dataIndex: 'code', key: 'code' },
            { title: 'Nombre', dataIndex: 'name', key: 'name' },
            { title: 'Marca', dataIndex: 'brand', key: 'brand' },
            { title: 'Modelo', dataIndex: 'model', key: 'model' },
            { title: 'Ubicación', dataIndex: 'location', key: 'location' },
            {
              title: 'Estado',
              dataIndex: 'status',
              key: 'status',
              render: (status: string) => {
                const colors: any = {
                  active: '#52c41a',
                  inactive: '#d9d9d9',
                  maintenance: '#ff7a45',
                };
                return <span style={{ color: colors[status] }}>●</span>;
              },
            },
          ]}
          dataSource={equipment}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
