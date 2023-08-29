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
      .post(`${apiurl}`+"/admin/sub-admin-login", data)
      .then((res) => {
        console.log(res.data, "\\\\\\\\\\\\\\\\\\");
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

  return (
    <>
      <Modal
        title="Sub Admin"
        visible={modalVisible}
        onCancel={handleClose}
        footer={null}
      >
        <Form name="myForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="User ID"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your userid!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
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
