import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Modal, Input, Space, Button, message } from "antd";
import axios from "axios";
import baseUrl from "../../../baseUrl";
const apiurl = baseUrl.apiUrl;

const ChangePssword = ({ onCloseModal, onPasswordChange }) => {
  const isFrenchise = localStorage.getItem("franchiseToken");
  const isStateHandler = localStorage.getItem("stateHandlerToken");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [visible, setVisible] = useState(true);
  const handleCancel = () => {
    setVisible(false);
    onCloseModal();
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
  };
  const handleSubmit = () => {
    if (isStateHandler) {
      let data = {
        newpassword: password.newPassword,
        oldpassword: password.oldPassword,
        usertype: "BMM",
        id: localStorage.getItem("stateHandlerId"),
      };
      axios
        .post(`${apiurl}` + "/password/passwordChange/allPasswordChange", data)
        .then((res) => {
          message.success(res.data.message);
          setVisible(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    } else if (isFrenchise) {
      let data = {
        newpassword: password.newPassword,
        oldpassword: password.oldPassword,
        usertype: "FRANCHISE",
        id: localStorage.getItem("frenchiseId"),
      };
      axios
        .post(`${apiurl}` + "/password/passwordChange/allPasswordChange", data)
        .then((res) => {
          message.success(res.data.message);
          setVisible(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }
  };
  return (
    <>
      <Modal
        title="Change password"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Space
          direction="vertical"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Input.Password
            placeholder="Enter old password"
            style={{ width: "100%" }}
            name="oldPassword"
            value={password.oldPassword}
            onChange={handlePassword}
          />
          <Input.Password
            placeholder="Enter new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            name="newPassword"
            value={password.newPassword}
            onChange={handlePassword}
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ChangePssword;
