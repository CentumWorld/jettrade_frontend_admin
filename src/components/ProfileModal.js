import React, { useState } from "react";
import "../css/profileModal.css";
import { Modal, Form, Input, Button } from "antd";
import { UserOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons";
import { BsFillPencilFill } from "react-icons/bs";

const ProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const isStateHandlerToken = localStorage.getItem("stateHandlerToken");
  const stateHandlerFirstName = localStorage.getItem("stateHandlerFirstName");
  const stateHandlerLastName = localStorage.getItem("stateHandlerLastName");
  const stateHandlerPhoneNumber = localStorage.getItem("stateHandlerPhoneNumber");
  const stateHandlerEmailId = localStorage.getItem("stateHandlerEmailId");

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Handle form submission (e.g., update user profile)
      console.log(values);
    });
  };

  const handleEditClick = () => {
    setEditing(true);
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
      {isStateHandlerToken && (
        <Form form={form} layout="vertical">
        <p className="modal-userName">
          <p className="userName">
            First Name:{' '}
            {editing ? (
              <Form.Item name="username" initialValue={`${stateHandlerFirstName} ${stateHandlerLastName}`}>
                <Input />
              </Form.Item>
            ) : (
              <span>
                {stateHandlerFirstName}
              </span>
            )}{' '}
            {editing && <BsFillPencilFill onClick={handleSave} />}
            {!editing && <BsFillPencilFill onClick={handleEditClick} />}
          </p>
          <p className="userName">
            Last Name:{' '}
            {editing ? (
              <Form.Item name="username" initialValue={`${stateHandlerFirstName} ${stateHandlerLastName}`}>
                <Input />
              </Form.Item>
            ) : (
              <span>
                {stateHandlerLastName}
              </span>
            )}{' '}
            {editing && <BsFillPencilFill onClick={handleSave} />}
            {!editing && <BsFillPencilFill onClick={handleEditClick} />}
          </p>
        </p>
        <p className="modal-phoneNumber">
          <p className="userPhnNumber">
            Phone Number:{' '}
            {editing ? (
              <Form.Item name="phoneNumber" initialValue={stateHandlerPhoneNumber}>
                <Input />
              </Form.Item>
            ) : (
              <span>{stateHandlerPhoneNumber}</span>
            )}{' '}
            {editing && <BsFillPencilFill onClick={handleSave} />}
            {!editing && <BsFillPencilFill onClick={handleEditClick} />}
          </p>
        </p>
        <p className="modalEmailId">
          <p className="userEmail">
            Email Id:{' '}
            {editing ? (
              <Form.Item name="email" initialValue={stateHandlerEmailId}>
                <Input />
              </Form.Item>
            ) : (
              <span>{stateHandlerEmailId}</span>
            )}{' '}
            {editing && <BsFillPencilFill onClick={handleSave} />}
            {!editing && <BsFillPencilFill onClick={handleEditClick} />}
          </p>
        </p>
      </Form>
      )}
    </Modal>
  );
};

export default ProfileModal;
