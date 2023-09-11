import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, DatePicker, Space } from "antd";
import {
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl

const { Option } = Select;

const ProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [editingField, setEditingField] = useState(null);
  const stateAdmintoken = localStorage.getItem("stateHandlerToken");
  const franchiseToken = localStorage.getItem("franchiseToken");
  const bussinessToken = localStorage.getItem("bussinessAdminToken");
  const isSubAdminToken = localStorage.getItem("subAdminToken");
  const [fieldValue, setFieldValue] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    async function fetchStateDetails() {
      try {
        const response = await fetch(`${apiurl}`+"/state/get-own-state-details", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${stateAdmintoken}`,
          },
        });
        const data = await response.json();
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    // franchise details api
    async function fetchFranchiseDetails() {
      try {
        const response = await fetch(`${apiurl}`+"/franchise/get-own-franchise-details", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${franchiseToken}`,
          },
        });
        const data = await response.json();
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    // bussiness details API
    async function fetchBussinessDetails() {
      try {
        const response = await fetch(
          `${apiurl}`+"/businessDeveloper/get-own-business-developer-details",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bussinessToken}`,
            },
          }
        );
        const data = await response.json();
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    async function fetchSubAdminDetails() {
      try {
        const response = await fetch(`${apiurl}`+"/subAdmin/get-own-sub-admin-details", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${isSubAdminToken}`,
          },
        });
        const data = await response.json();
        setFieldValue(data.data);
      } catch (error) {
        console.error("Error fetching state details", error);
      }
    }

    if (stateAdmintoken) {
      fetchStateDetails();
    } else if (franchiseToken) {
      fetchFranchiseDetails();
    } else if (bussinessToken) {
      fetchBussinessDetails();
    } else if (isSubAdminToken) {
      fetchSubAdminDetails();
    }
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleFieldEdit = (fieldName, newValue) => {
    setFieldValue((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const handleSaveClick = async () => {
    if (stateAdmintoken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}`+"/state/update-state-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${stateAdmintoken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (error) {
        console.error("Error updating state details", error);
      }
    } else if (franchiseToken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}`+"/franchise/update-franchise-own-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${franchiseToken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (err) {
        console.error("Error", err.message);
      }
    } else if (bussinessToken) {
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}`+"/businessDeveloper/update-own-business-developer-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${bussinessToken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (err) {
        console.error("Error", err.message);
      }
    }else if (isSubAdminToken){
      try {
        console.log("Sending Payload:", {
          [editingField]: fieldValue[editingField],
        });
        const response = await axios.put(
          `${apiurl}`+"/subAdmin/update-own-sub-admin-details",
          fieldValue,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${isSubAdminToken}`,
            },
          }
        );
        console.log("API Response:", response.data);

        setFieldValue((prevValues) => ({
          ...prevValues,
          [editingField]: response.data[editingField],
        }));

        setEditingField(null);
      } catch (err) {
        console.error("Error", err.message);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      title="Profile Modal"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        editingField !== null && (
          <Button key="submit" type="primary" onClick={handleSaveClick}>
            Save
          </Button>
        ),
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="First name" initialValue={fieldValue.fname}>
          <Input
            prefix={<UserOutlined />}
            value={fieldValue.fname}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, fname: e.target.value })
            }
            disabled={editingField !== "username"} // Disable input if not in editing mode for this field
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick("username")} // Enable editing for this field
          >
            Edit
          </Button>
        </Form.Item>
        <Form.Item label="Last name" initialValue={fieldValue.lname}>
          <Input
            prefix={<UserOutlined />}
            value={fieldValue.lname}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, lname: e.target.value })
            }
            disabled={editingField !== "lastname"} // Disable input if not in editing mode for this field
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick("lastname")} // Enable editing for this field
          >
            Edit
          </Button>
        </Form.Item>
        <Form.Item label="Mobile Phone" initialValue={fieldValue.phone}>
          <Input
            prefix={<MobileOutlined />}
            value={fieldValue.phone}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, phone: e.target.value })
            }
            disabled={editingField !== "mobile"} // Disable input if not in editing mode for this field
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick("mobile")} // Enable editing for this field
          >
            Edit
          </Button>
        </Form.Item>
        <Form.Item label="Email" initialValue={fieldValue.email}>
          <Input
            prefix={<MailOutlined />}
            value={fieldValue.email}
            onChange={(e) =>
              setFieldValue({ ...fieldValue, email: e.target.value })
            }
            disabled={editingField !== "email"} // Disable input if not in editing mode for this field
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick("email")} // Enable editing for this field
          >
            Edit
          </Button>
        </Form.Item>
        <Form.Item label="Gender" initialValue={fieldValue.gender}>
          <Select
            value={fieldValue.gender}
            onChange={(value) => handleFieldEdit("gender", value)}
            disabled={editingField !== "gender"} // Disable select if not in editing mode for this field
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick("gender")} // Enable editing for this field
          >
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
