import React, { useCallback, useContext, useState } from "react";
import {
  Form,
  Input,
  message,
  Tabs,
  Select,
} from "antd";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import { ToastContainer } from "react-toastify";
import baseUrl from "../baseUrl";
import allState from "./Admin/Tracker/AllStateAndDistrict";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const apiurl = baseUrl.apiUrl;
const { TabPane } = Tabs;
const { Option } = Select;

const MAX_FILE_SIZE_MB = 2;

const FranchiseAdminLogin = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [franchiseAdmin, setFranchiseAdmin] = useState({
    franchiseAdmin_id: "",
    franchiseAdmin_password: "",
  });
  const mobileNumberRegex =
    /^(\+\d{1,4}[-.●\s]?)?\(?\d{1,4}\)?[-.●\s]?\d{1,10}$/;
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
    referralid: "",
    city: [],
    referredId: "",
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

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const [officialId, setOfficialId] = useState("BMM-BMM1653");
  const [selectedOption, setSelectedOption] = useState("referral");
  const [aadharImageSizeError, setAadharImageSizeError] = useState(null);
  const [backAadharImageSizeError, setBackAadharImageSizeError] = useState(null);
  const [panImageSizeError, setPanImageSizeError] = useState(null);
  const [setCorrect, setSetCorrect] = useState(false);
const [setIncorrect, setSetIncorrect] = useState(false);


  const handleFileUpload = (e, setImageState, setImageSizeError) => {
    const file = e.target.files[0];

    if (file) {
      if (!beforeUpload(file, setImageSizeError)) {
        setImageState({ file: null });
        return;
      }

      setImageState({ file });

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setImageSizeError(`File size exceeds ${MAX_FILE_SIZE_MB} MB`);
      } else {
        setImageSizeError(null);
      }
    }
  };

  const beforeUpload = (file, setImageSizeError) => {
    if (!isFileTypeAllowed(file)) {
      setImageSizeError('Only JPG and PNG files are allowed!');
      return false;
    }
  
    if (!isFileSizeAllowed(file, 2)) {
      setImageSizeError(`File size must be less than 2MB`);
      return false;
    }
  
    return true;
  };

  const isFileTypeAllowed = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(file.type);
  };
  
  const isFileSizeAllowed = (file, maxSize) => {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB
    return fileSizeInMB <= maxSize;
  };

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    if (value === "official") {
      setStateRegisterData({ ...stateRegisterData, referredId: officialId });
    } else {
      setStateRegisterData({ ...stateRegisterData, referredId: "" });
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleClose = () => setShow((prev) => !prev);
  props.franchiseLoginFunc(show);

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleInputs = (e) => {
    setFranchiseAdmin({ ...franchiseAdmin, [e.target.name]: e.target.value });
  };

  const adminLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${apiurl}` + "/admin/frenchise-login", {
        frenchiseId: franchiseAdmin.franchiseAdmin_id,
        password: franchiseAdmin.franchiseAdmin_password,
      })
      .then((response) => {
        dispatch({ type: "USER", payload: true });
        localStorage.setItem("login", true);
        localStorage.setItem("franchiseToken", response.data.frenchiseToken);
        localStorage.setItem(
          "frenchiseId",
          response.data.frenchiseDetails.frenchiseId
        );
        localStorage.setItem(
          "frenchFname",
          response.data.frenchiseDetails.fname
        );
        localStorage.setItem(
          "franchiseRefferal",
          response.data.frenchiseDetails.referralId
        );
        setFranchiseAdmin({ stateAdmin_id: "", stateAdmin_password: "" });
        navigate("/admindashboard/dashboard");
      })
      .catch((error) => {
        message.warning(error.response.data.message);
      });
    setShow(false);
  };

  const switchTab = useCallback((appKey) => {
    if (appKey === "2") {
      setIsModalVisible(true);
    }
  }, []);

  const verifyReferralID = () => {
    let data = {
      refferId: stateRegisterData.referredId,
    };

    axios
      .post(`${apiurl}` + "/admin/verify-franchie-before-registration", data)
      .then((res) => {
        setCorrect(true);
        setIncorrect(false);
        setStateFrenchise(res.data.stateUserState);
      })
      .catch((err) => {
        setCorrect(false);
        setIncorrect(true);
        setStateFrenchise([]);
      });
  };
  const handleStateChange = (value) => {
    setSelectedCities([]);
    setStateRegisterData({ ...stateRegisterData, state: value });

    const selectedState = allState.states.find(
      (stateItem) => stateItem.state === value
    );

    if (selectedState) {
      setSelectedCities(selectedState.districts);
    } else {
      setSelectedCities([]);
    }
  };

  const handleClickAadharFrontImage = (e) => {
    handleFileUpload(e, setAadharImage, setAadharImageSizeError);
  };

  const handleClickBackAadharFrontImage = (e) => {
    handleFileUpload(e, setBackAadharImage, setBackAadharImageSizeError);
  };

  const handleClickPanCardImage = (e) => {
    handleFileUpload(e, setPanImage, setPanImageSizeError);
  };

  const franchiseRegister = (value) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("referredId", stateRegisterData.referredId);
    formData.append("fname", value.fname);
    formData.append("lname", value.lname);
    formData.append("email", value.email);
    formData.append("phone", "+" + value.mobile);
    formData.append("gender", value.gender);
    formData.append("password", value.password);
    formData.append("frenchiseId", value.userId);
    formData.append("adhar_front_side", aadharImage.file);
    formData.append("adhar_back_side", aadharBackImage.file);
    formData.append("panCard", panImage.file);
    formData.append("franchiseState", value.state);
    formData.append("franchiseCity", value.city);

    axios
      .post(`${apiurl}` + "/admin/create-frenchise", formData)
      .then((res) => {
        setShow(false);
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
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Calibri", fontSize: "20px" }}>
            {activeTab === "1" ? "Franchise Login" : "Registration"}
          </Modal.Title>
        </Modal.Header>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <Modal.Body>
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={handleTabChange}
          >
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
                <Form.Item label="Select">
                  <Select
                    value={selectedOption}
                    onChange={handleDropdownChange}
                  >
                    <Option value="official">Official ID</Option>
                    <Option value="referral"> Put Referral ID</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Referral Id"
                  name="referralId"
                >
                  {selectedOption === "official" && (
                    <Input
                      placeholder="Referal ID"
                      value={officialId}
                      disabled
                    />
                  )}
                  {selectedOption === "referral" && (
                    <Input
                      placeholder="Referal ID"
                      onChange={(e) =>
                        setStateRegisterData({ referredId: e.target.value })
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="First name"
                  name="fname"
                  rules={[
                    {
                      required: true,
                      message: "Please enter first name",
                    },
                  ]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lname"
                  rules={[
                    {
                      required: true,
                      message: "Please enter last name",
                    },
                  ]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
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
                      message: "Please enter your mobile number",
                    },
                    {
                      pattern: mobileNumberRegex,
                      message: "Please enter a valid Indian mobile number",
                    },
                  ]}
                >
                  <PhoneInput country={"in"} placeholder="Mobile no" />
                </Form.Item>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select your gender",
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
                      message: "Please select a state",
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
                      message: "Please select city",
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
                  label="Back aadhar image (JPG/PNG)"
                  name="backaadhar"
                  help={backAadharImageSizeError}
                  validateStatus={backAadharImageSizeError ? "error" : ""}
                  rules={[
                    {
                      required: true,
                      message: "Please upload back aadhar an image",
                    },
                  ]}
                >
                  <Input
                    type="file"
                    placeholder="Back aadhar"
                    name="backaadhar"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleClickBackAadharFrontImage}
                  />
                </Form.Item>
                <Form.Item
                  label="Upload Pan Image (JPG/PNG)"
                  name="pan"
                  help={panImageSizeError}
                  validateStatus={panImageSizeError ? "error" : ""}
                >
                  <Input
                    type="file"
                    placeholder="Pan"
                    name="pan"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleClickPanCardImage}
                  />
                </Form.Item>
                <Form.Item
                  label="User ID"
                  name="userId"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your user ID",
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
                      message: "Please enter your password",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ float: "right" }}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FranchiseAdminLogin;