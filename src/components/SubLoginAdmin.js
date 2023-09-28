import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl

function SubAdmin(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setModalVisible(false);
  props.subadminfunc(modalVisible);

  const onFinish = (values) => {
    setModalVisible(false);
    console.log("Form values:", values.name, values.password);

    let data = {
      subAdminId: values.name,
      password: values.password,
    };

    axios
      .post(`${apiurl}` + "/admin/sub-admin-login", data)
      .then((res) => {
        localStorage.setItem("login", true);
        localStorage.setItem("subAdminToken", res.data.subAdmintoken);

        navigate("/admindashboard/dashboard");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
  };


  // -------------
  const titleStyles = {
    color: "#800080",
    fontSize: '20px',
    fontFamily: 'Calibri',

  };
 
  return (
    <>
      <Modal
        title={
          <span style={titleStyles}>Back Office</span>
        }
        open={modalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <Form name="myForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="User ID"
            labelCol={{ span: 24 }} // Set label column to span the full width
            wrapperCol={{ span: 20 }}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your userid!",
              },
            ]}
          >
            <Input placeholder="Enter subadmin Id"
               />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            labelCol={{ span: 24 }} // Set label column to span the full width
            wrapperCol={{ span: 20 }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SubAdmin;
