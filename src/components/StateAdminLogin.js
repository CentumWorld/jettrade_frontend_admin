import React, { useContext, useState } from "react";
import { Form, Input, message, Tabs, Select, Upload } from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import baseUrl from "../baseUrl";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import allState from "./Admin/Tracker/AllStateAndDistrict";
import "../css/BmmLoginSingup.css";

const apiurl = baseUrl.apiUrl;
const { TabPane } = Tabs;
const mobileNumberRegex = /^(\+\d{1,4}[-.●\s]?)?\(?\d{1,4}\)?[-.●\s]?\d{1,10}$/;
const { Option } = Select;

const StateAdminLogin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [stateAdmin, setStateAdmin] = useState({
    stateAdmin_id: "",
    stateAdmin_password: "",
  });
  const [stateRefferalId, setStateRefferalId] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  props.stateLoginFunc(show);

  const handleInputs = (e) => {
    setStateAdmin({ ...stateAdmin, [e.target.name]: e.target.value });
  };

  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [backAadharImage, setBackAadharImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [aadharImageSizeError, setAadharImageSizeError] = useState(null);
  const [backAadharImageSizeError, setBackAadharImageSizeError] = useState(null);
  const [panImageSizeError, setPanImageSizeError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const isFileTypeAllowed = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  const isFileSizeAllowed = (file, maxSize) => {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB
    return fileSizeInMB <= maxSize;
  };

  const beforeUpload = (file, setImageSizeError) => {
    if (!isFileTypeAllowed(file)) {
      message.error('Only JPG and PNG files are allowed!');
      return false;
    }

    if (!isFileSizeAllowed(file, 2)) {
      setImageSizeError(`File size must be less than 2MB`);
      return false;
    }

    return true;
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 1000);
  };

  const handleClickAadharFrontImage = (e) => {
    const file = e.target.files[0];

    if (beforeUpload(file, setAadharImageSizeError)) {
      setAadharImageSizeError(null);
      setAadharImage({ file });
    }
  };

  const handleClickBackAadharFrontImage = (e) => {
    const file = e.target.files[0];

    if (beforeUpload(file, setBackAadharImageSizeError)) {
      setBackAadharImageSizeError(null);
      setBackAadharImage({ file });
    }
  };

  const handleClickPanCardImage = (e) => {
    const file = e.target.files[0];

    if (beforeUpload(file, setPanImageSizeError)) {
      setPanImageSizeError(null);
      setPanImage({ file });
    }
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios.post(`${apiurl}` + "/admin/state-handler-login", {
      stateHandlerId: stateAdmin.stateAdmin_id,
      password: stateAdmin.stateAdmin_password,
    })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("stateHandlerToken", response.data.statehandlerToken);
        localStorage.setItem("stateHandlerRefferalID", response.data.stateHandlerDetails.referralId);
        localStorage.setItem("stateHandlerName", response.data.stateHandlerDetails.fname)
        localStorage.setItem("stateHandlerId", response.data.stateHandlerDetails.stateHandlerId)
        setStateAdmin({ stateAdmin_id: "", stateAdmin_password: "" });
        navigate("/admindashboard/dashboard");
      })
      .catch((error) => {
        message.warning(error.response.data.message);
      });
    setShow(false);
  };

  const stateRegister = (value) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("fname", value.fname);
    formData.append("lname", value.lname);
    formData.append("email", value.email);
    formData.append("phone", '+' + value.mobile);
    formData.append("gender", value.gender);
    formData.append("password", value.password);
    formData.append("stateHandlerId", value.userId);
    formData.append("adhar_front_side", aadharImage.file);
    formData.append("adhar_back_side", backAadharImage.file);
    formData.append("panCard", panImage.file);
    formData.append("selectedState", value.state);
    formData.append("referredId", "admin@123");

    axios.post(`${apiurl}` + "/admin/create_State_Handler", formData)
      .then((res) => {
        handleClose();
        message.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: 'Calibri', fontSize: '20px' }}> {activeTab === "1" ? "BMM Login" : "Registration"}</Modal.Title>
        </Modal.Header>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <Modal.Body>
          <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Sign In" key="1">
              <div className="form-content">
                <form onSubmit={adminLogin} autoComplete="off">
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="loginid"> LOGIN ID</label>
                        <Input
                          placeholder="Enter login ID "
                          prefix={<UserOutlined />}
                          value={stateAdmin.stateAdmin_id}
                          name="stateAdmin_id"
                          allowClear
                          onChange={handleInputs}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="password">PASSWORD</label>
                        <Input.Password
                          placeholder="Enter your password"
                          type="password"
                          prefix={<UnlockOutlined />}
                          value={stateAdmin.stateAdmin_password}
                          name="stateAdmin_password"
                          onChange={handleInputs}
                        />
                      </div>
                    </div>
                  </div>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="success" type="submit">
                      Login
                    </Button>
                  </Modal.Footer>
                </form>
              </div>
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <div className="state-register">
                <Form name="basic" onFinish={stateRegister}>
                  <Form.Item
                    label="Referred ID"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter official id',
                      },
                    ]}
                  >
                    <Input value={"admin@123"} disabled />
                  </Form.Item>
                  <Form.Item
                    label="First Name"
                    name="fname"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter first name',
                      },
                    ]}
                  >
                    <Input placeholder='First name' />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lname"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter last name',
                      },
                    ]}
                  >
                    <Input placeholder='Last name' />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email',
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address',
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your mobile number',
                      },
                      {
                        pattern: mobileNumberRegex,
                        message: 'Please enter a valid Indian mobile number',
                      },
                    ]}
                  >
                    <PhoneInput country={'in'} placeholder="Mobile no" />
                  </Form.Item>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your gender',
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select gender"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Select a State"
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a state',
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a state"
                      mode="multiple"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    >
                      {allState.states.map((stateObj, index) => (
                        <Option key={index} value={stateObj.state}>
                          {stateObj.state}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Front Aadhar Image (JPG/PNG)"
                    name="aadhar"
                    help={aadharImageSizeError}
                    validateStatus={aadharImageSizeError ? "error" : ""}
                    rules={[
                      {
                        required: true,
                        message: 'Please upload front Aadhar image',
                      },
                    ]}
                  >
                    <Input type='file'
                      placeholder='Front Aadhar'
                      name="aadhar"
                      accept=".jpg,.png,.jpeg"
                      onChange={handleClickAadharFrontImage}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Back Aadhar Image (JPG/PNG)"
                    name="backaadhar"
                    help={backAadharImageSizeError}
                    validateStatus={backAadharImageSizeError ? "error" : ""}
                    rules={[
                      {
                        required: true,
                        message: 'Please upload back Aadhar image',
                      },
                    ]}
                  >
                    <Input type='file'
                      placeholder='Back Aadhar'
                      name="Back Aadhar"
                      accept=".jpg,.png,.jpeg"
                      onChange={handleClickBackAadharFrontImage}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Upload Pan Image (JPG/PNG)"
                    name="pan"
                    help={panImageSizeError}
                    validateStatus={panImageSizeError ? "error" : ""}
                    rules={[
                      {
                        required: true,
                        message: 'Please upload Pan image',
                      },
                    ]}
                  >
                    <Input type='file'
                      placeholder='Pan'
                      name="pan"
                      accept=".jpg,.png,.jpeg"
                      onChange={handleClickPanCardImage}
                    />
                  </Form.Item>
                  <Form.Item
                    label="User ID"
                    name="userId"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your user ID',
                      },
                    ]}
                  >
                    <Input placeholder="User ID" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your password',
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ float: "right" }}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StateAdminLogin;
