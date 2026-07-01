import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Card, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { equipmentService, Equipment } from '../services/equipment';

const EquipmentList: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const response = await equipmentService.getAll();
      setEquipment(response.data);
    } catch (error) {
      message.error('Error loading equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Equipment) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this equipment?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await equipmentService.delete(id);
          message.success('Equipment deleted');
          loadEquipment();
        } catch (error) {
          message.error('Error deleting equipment');
        }
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingId) {
        await equipmentService.update(editingId, values);
        message.success('Equipment updated');
      } else {
        await equipmentService.create(values);
        message.success('Equipment created');
      }
      setIsModalVisible(false);
      loadEquipment();
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Error saving equipment');
    }
  };

  return (
    <Card title="Equipment List" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Equipment</Button>}>
      <Table
        columns={[
          { title: 'Code', dataIndex: 'code', key: 'code' },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Brand', dataIndex: 'brand', key: 'brand' },
          { title: 'Model', dataIndex: 'model', key: 'model' },
          { title: 'Location', dataIndex: 'location', key: 'location' },
          {
            title: 'Actions',
            key: 'actions',
            render: (text, record: Equipment) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
              </Space>
            ),
          },
        ]}
        dataSource={equipment}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? 'Edit Equipment' : 'Add Equipment'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Code" name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Input />
          </Form.Item>
          <Form.Item label="Model" name="model">
            <Input />
          </Form.Item>
          <Form.Item label="Serial Number" name="serial_number">
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Maintenance', value: 'maintenance' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default EquipmentList;
