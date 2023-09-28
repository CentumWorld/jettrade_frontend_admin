import React, { useCallback, useContext, useState, useEffect } from "react";
import { Form, Input, message, Tabs, Select, Checkbox, Menu, Dropdown } from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import baseUrl from "../baseUrl";
import FrenchieRegister from "./Admin/Tracker/Register/FrenchieRegister";
import allState from "./Admin/Tracker/AllStateAndDistrict";
import { MdVerified } from 'react-icons/md'
import {ImCross} from 'react-icons/im'


const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;
const { Option } = Select;

const FranchiseAdminLogin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false)
  const [franchiseAdmin, setFranchiseAdmin] = useState({
    franchiseAdmin_id: "",
    franchiseAdmin_password: "",
  });
  const mobileNumberRegex = /^[6789]\d{9}$/;
  const [stateFrenchise, setStateFrenchise] = useState([]);
  const [stateRegisterData, setStateRegisterData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    stateRegisterId: "",
    password: "",
    referralid: '',
    city: [],
    referredId: ""
  });
  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [aadharBackImage, setBackAadharImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });
  const [selectedCities, setSelectedCities] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  props.franchiseLoginFunc(show);

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleInputs = (e) => {
    setFranchiseAdmin({ ...franchiseAdmin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };


  const adminLogin = (e) => {
    e.preventDefault();
    axios.post(`${apiurl}` + "/admin/frenchise-login", {
      frenchiseId: franchiseAdmin.franchiseAdmin_id,
      password: franchiseAdmin.franchiseAdmin_password,
    })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("franchiseToken", response.data.frenchiseToken);
        console.log(response.data);
        localStorage.setItem("frenchiseId", response.data.frenchiseDetails.frenchiseId);
        localStorage.setItem("frenchFname", response.data.frenchiseDetails.fname);
        localStorage.setItem("franchiseRefferal", response.data.frenchiseDetails.referralId);
        setFranchiseAdmin({ stateAdmin_id: "", stateAdmin_password: "" });
        navigate("/admindashboard/dashboard");
      })
      .catch((error) => {
        message.warning(error.response.data.message)
      });
    setShow(false);
  };

  const switchTab = useCallback((appKey) => {
    if (appKey === '2') {
      setIsModalVisible(true);
    }
  }, [])

  const verifyReferralID = () => {
    console.log(stateRegisterData.referredId)
    let data = {
      refferId: stateRegisterData.referredId
    }

    axios.post(`${apiurl}` + '/admin/verify-franchie-before-registration', data)
      .then((res) => {
        setCorrect(true);
        setIncorrect(false)
        console.log(res.data)
        setStateFrenchise(res.data.stateUserState);

      })
      .catch((err) => {
        setCorrect(false);
        setIncorrect(true);
        setStateFrenchise([]);
      })
  }
  const handleStateChange = (value) => {
    // Update the selected state in stateRegisterData
    setSelectedCities([]);
    setStateRegisterData({ ...stateRegisterData, state: value });

    const selectedState = allState.states.find((stateItem) => stateItem.state === value);

    console.log(selectedState.districts)
    if (selectedState) {
      setSelectedCities(selectedState.districts);
    } else {
      setSelectedCities([]);
    }
  };

  const handleClickAadharFrontImage = (e) => {

    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      //preview shoe
      setAadharImage({ file: e.target.files[0] })
    } else {
      message.error("Invalid File !! ");
      aadharImage.file = null;
    }
  }

  const handleClickBackAadharFrontImage = (e)=>{
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      //preview shoe
      setBackAadharImage({ file: e.target.files[0] })
    } else {
      message.error("Invalid File !! ");
      aadharImage.file = null;
    }
  }
  const handleClickPanCardImage = (e) => {

    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      //preview shoe
      setPanImage({ file: e.target.files[0] })
    } else {
      message.error("Invalid File !! ");
      panImage.file = null;
    }
  }

  const franchiseRegister = (value) => {
    console.log(value, aadharImage.file, panImage.file, stateRegisterData.referredId)
    const formData = new FormData();
    formData.append("referredId", stateRegisterData.referredId)
    formData.append("fname", value.fname);
    formData.append("lname", value.lname);
    formData.append("email", value.email);
    formData.append("phone", value.mobile);
    formData.append("gender", value.gender);
    formData.append("password", value.password);
    formData.append("frenchiseId", value.userId);
    formData.append("adhar_front_side", aadharImage.file);
    formData.append("adhar_back_side", aadharBackImage.file);
    formData.append("panCard", panImage.file);
    formData.append("franchiseState", value.state);
    formData.append("franchiseCity", value.city);

    axios.post(`${apiurl}` + "/admin/create-frenchise", formData)
      .then((res) => {
        setShow(false)
        message.success(res.data.message);
      })
      .catch((err) => {
        setShow(false)
        message.warning(err.response.data.message);
      })
  }



  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily:'Calibri',fontSize:'20px'}}>Franchise Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="1" onChange={switchTab}>
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
                          value={franchiseAdmin.franchiseAdmin_id}
                          name="franchiseAdmin_id"
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
                          value={franchiseAdmin.franchiseAdmin_password}
                          name="franchiseAdmin_password"
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
              <Form name="basic" onFinish={franchiseRegister}>
                <Form.Item
                  label="Referral Id"
                  name="referralId"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter referal ID',
                    },
                  ]}
                >
                  <Input placeholder='Referal ID' onChange={(e) => setStateRegisterData({ referredId: e.target.value })} />
                </Form.Item>
                {/* <div style={{ display: "flex", justifyContent: 'space-between' }}><Button className="rounded-button" onClick={verifyReferralID}>Verify</Button>
                  <div>
                    {correct ? <small style={{color:"green"}}><MdVerified style={{ fontSize: "20px" }} />&nbsp; Verify successful</small> : ""}
                    {incorrect ? <small style={{color:"red"}}><ImCross style={{ fontSize: "20px" }} />&nbsp; Invalid referral id</small> : ""}
                  </div>
                </div> */}
                
                <Form.Item
                  label="First name"
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
                  label="Last name"
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
                  <Input placeholder="Mobile no" />
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
                {/* <Form.Item
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
                    placeholder="Select State"
                    value={stateRegisterData.state}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    onChange={handleStateChange}
                  >
                    {stateFrenchise.map(stateItem => (
                      <Option key={stateItem} value={stateItem}>
                        {stateItem}
                      </Option>
                    ))}
                  </Select>
                </Form.Item> */}
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
                    placeholder="Select State"
                    value={stateRegisterData.state}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    onChange={handleStateChange}
                  >
                    {allState.states.map((stateObj, index) => (
                        <Option key={index} value={stateObj.state}>
                          {stateObj.state}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Please select city',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select city"
                    mode="multiple"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {selectedCities.map((stateObj, index) => (
                      <Option key={index} value={stateObj}>
                        {stateObj}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Front aadhar image (JPG/PNG)"
                  name="aadhar"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload front aadhar an image',
                    },
                  ]}
                >
                  <Input type='file'
                    placeholder='Front aadhar'
                    name="aadhar"
                    onChange={handleClickAadharFrontImage}
                  />
                </Form.Item>
                <Form.Item
                  label="Back aadhar image (JPG/PNG)"
                  name="backaadhar"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload back aadhar an image',
                    },
                  ]}
                >
                  <Input type='file'
                    placeholder='Back aadhar'
                    name="backaadhar"
                    onChange={handleClickBackAadharFrontImage}
                  />
                </Form.Item>
                <Form.Item
                  label="Upload Pan Image (JPG/PNG)"
                  name="pan"
                >
                  <Input type='file'
                    placeholder='Pan'
                    name="pan"
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

                {/* Password */}
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
                  <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>

        </Modal.Body>
      </Modal></>
  )
}

export default FranchiseAdminLogin