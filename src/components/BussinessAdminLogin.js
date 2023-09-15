import React, { useContext, useState } from "react";
import { Form, Input, message, Tabs, Select } from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import { MdVerified } from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import baseUrl from "../baseUrl";

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;
const { Option } = Select;

const BussinessAdminLogin = (props) => {
  const [show, setShow] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [city, setCity] = useState([]);
  const [correct, setCorrect] = useState(false)
  const [incorrect, setIncorrect] = useState(false)
  const [bussinessAdmin, setBussinessAdmin] = useState({
    bussinessAdmin_id: "",
    bussinessAdmin_password: "",
  });
  const [registerFranchiseData, setFranchiseRegisterData] = useState({
    referredId: "",

  })
  const mobileNumberRegex = /^[6789]\d{9}$/;

  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });

  const handleClose = () => setShow((prev) => !prev);
  props.bussinessLoginFunc(show);

  const handleInputs = (e) => {
    setBussinessAdmin({ ...bussinessAdmin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios.post(`${apiurl}` + "/admin/business-developer-login", {
      businessDeveloperId: bussinessAdmin.bussinessAdmin_id,
      password: bussinessAdmin.bussinessAdmin_password,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("bussinessAdminToken", response.data.businessDeveloperToken);
        localStorage.setItem("businessId", response.data.businessDeveloperDetails.businessDeveloperId);
        localStorage.setItem("businessFname", response.data.businessDeveloperDetails.fname);
        localStorage.setItem("bussinessRefferalId", response.data.businessDeveloperDetails.referralId)
        setBussinessAdmin({ bussinessAdmin_id: "", bussinessAdmin_password: "" }); // Use setAdmin to reset the state
        navigate("/admindashboard/dashboard");
      })
      .catch((error) => {
        console.log("Not login");
        if (error.response.status === 422) {
          toast.warning(
            "Please Fill all Details!",
            {
              autoClose: 2000,
              theme: "dark",
            },
            1000
          );
          setBussinessAdmin({ bussinessAdmin_id: "", bussinessAdmin_password: "" }); // Use setAdmin to reset the state
        }
        if (error.response.status === 404) {
          toast.warning("Invalid Credential!", {
            autoClose: 2000,
            theme: "dark",
          });
        }
      });
    setShow(false);
  };

  const verifyReferrlID = () => {
    const token = localStorage.getItem('adminToken');
    let data = {
      refferId: registerFranchiseData.referredId
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}` + '/admin/verify-buisness-developer-before-registration', data, config)
      .then((res) => {
        console.log(res.data)
        setCity(res.data.franchieUserCity);
        setCorrect(true);
        setIncorrect(false)
      })
      .catch((err) => {
        setIncorrect(true)
        setCorrect(false);
        setCity([]);
      })

  }
  const handleClickAadharFrontImage = (e) => {

    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
      //preview shoe
      setAadharImage({ file: e.target.files[0] })
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
  const submitBusinessSignUpData = (value)=>{
    console.log( value,registerFranchiseData.referredId, panImage.file, aadharImage.file);
        const formData = new FormData();
        formData.append("referredId", registerFranchiseData.referredId)
        formData.append("fname", value.fname);
        formData.append("lname", value.lname);
        formData.append("email", value.email);
        formData.append("phone", value.mobile);
        formData.append("gender", value.gender);
        formData.append("password", value.password);
        formData.append("businessDeveloperId", value.userId);
        formData.append("adharCard", aadharImage.file);
        formData.append("panCard", panImage.file);
        formData.append("buisnessCity", value.city);

        axios.post(`${apiurl}`+"/admin/create-business-developer", formData)
        .then((res)=>{
          setShow(false)
          message.success(res.data.message)
        })
        .catch((err)=>{
          setShow(false)
          message.error(err.response.data.message)
        })
  }

  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bussiness Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="1">
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
                        value={bussinessAdmin.bussinessAdmin_id}
                        name="bussinessAdmin_id"
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
                        value={bussinessAdmin.bussinessAdmin_password}
                        name="bussinessAdmin_password"
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
            <Form name="basic" onFinish={submitBusinessSignUpData}>
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
                <Input placeholder='Referal ID' onChange={(e) => setFranchiseRegisterData({ referredId: e.target.value })} />
              </Form.Item>
              {/* <Button type="primay" onClick={verifyReferrlID}>Verify</Button> &nbsp;&nbsp;{correct ? <MdVerified style={{ color: "green", fontSize: "20px" }} /> : ""} */}
              <div style={{ display: "flex", justifyContent: 'space-between' }}><Button className="rounded-button" onClick={verifyReferrlID}>Verify</Button>
                  <div>
                    {correct ? <small style={{color:"green"}}><MdVerified style={{ fontSize: "20px" }} />&nbsp; Verify successful</small> : ""}
                    {incorrect ? <small style={{color:"red"}}><ImCross style={{ fontSize: "20px" }} />&nbsp; Invalid referral id</small> : ""}
                  </div>
                </div>
              <hr />
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

              <Form.Item
                label="Select city"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please select city',
                  },
                ]}
              >
                <Select
                  placeholder="Select City"
                  name="city"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                >
                  {city.map(city => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                  label="Upload aadhar Image (JPG/PNG)"
                  name="aadhar"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload aadhar an image',
                    },
                  ]}
                >
                  <Input type='file'
                    placeholder='Aadhar'
                    name="aadhar"
                    onChange={handleClickAadharFrontImage}
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
    </Modal>

  </>;
};

export default BussinessAdminLogin;
