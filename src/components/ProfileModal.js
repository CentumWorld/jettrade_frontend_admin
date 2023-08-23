import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';

const ProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      // Handle form submission (e.g., update user profile)
      console.log(values);
    });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Profile"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="Username">
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile Phone">
          <Input prefix={<MobileOutlined />} placeholder="Mobile Phone" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;