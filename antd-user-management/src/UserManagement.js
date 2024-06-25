// UserManagement.js

import React, { useState } from 'react';
import { Table, Button, Input, Form, Space, Popconfirm, message } from 'antd';
import 'antd/dist/antd.css';
import './UserManagement.css';

const UserManagement = () => {
  // State for user data and form
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  // Columns configuration for Ant Design Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handler for form submission
  const onFinish = (values) => {
    const newUser = {
      key: Date.now(),
      name: values.name,
      email: values.email,
    };
    setUsers([...users, newUser]);
    form.resetFields();
    message.success('User added successfully!');
  };

  // Handler for delete user
  const handleDelete = (key) => {
    const filteredUsers = users.filter((user) => user.key !== key);
    setUsers(filteredUsers);
    message.success('User deleted successfully!');
  };

  // Handler for edit user
  const handleEdit = (record) => {
    // You can implement edit functionality here if needed
    message.info('Edit functionality will be implemented.');
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      
      {/* Form for adding new user */}
      <Form form={form} onFinish={onFinish} className="add-user-form">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
      
      {/* Table displaying users */}
      <Table columns={columns} dataSource={users} />

    </div>
  );
};

export default UserManagement;