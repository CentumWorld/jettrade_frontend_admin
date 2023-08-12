import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import {
  Select,
  Input,
  Form,
  Radio,
  DatePicker,
  Button,
  Upload,
  message,
  Switch,
  Spin,
} from "antd";

import {
  MailOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "../css/SubAdminSignupForm.css";
import baseUrl from "../../../baseUrl";
import { UserContext } from "../../../App";

const apiurl = baseUrl.apiUrl;

const { TextArea } = Input;

const { Option } = Select;
export const UseParamContext = createContext();

const SubAdminSignUpForm = () => {
  const { dispatch } = useContext(UserContext);

  const id = useParams();

  // --------------------------------------
  const customDobSuffixIcon = <CalendarOutlined style={{ color: "#5e72e4" }} />;
  const [phone, setPhone] = useState("");
  const [subadminData, setSubadminData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    aadhar_no: "",
    pan_no: "",
    subAdminId: "",
    password: "",
  });
  const [strength, setStrength] = useState(0);

  const [panError, setPanError] = useState(false);
  const [aadharError, setAadharError] = useState(false);

  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [aadharBackImage, setAadharBackImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);

  //console.log(subadminData)
  const userInputs = (e) => {
    e.preventDefault();
    setSubadminData({ ...subadminData, [e.target.name]: e.target.value });
  };

  //handle front aadhar image function
  const handleClickAadharFrontImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setAadharImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      aadharImage.file = null;
    }
  };
  //hadle back aadhar image function
  const handleClickAadharBackImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setAadharBackImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      aadharBackImage.file = null;
    }
  };
  //hadle pan card image function
  const handleClickPanCardImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setPanImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      panImage.file = null;
    }
  };


  const pan = (e) => {
    e.preventDefault();
    setSubadminData({ ...subadminData, pan_no: e.target.value });
    let panLength = e.target.value;
    console.log(subadminData.pan_no);
    if (panLength.length === 10) {
      setPanError(false);
    } else {
      setPanError(true);
    }
  };
  const aadhar = (e) => {
    setSubadminData({ ...subadminData, aadhar_no: e.target.value });
    let aadharLength = e.target.value;
    if (aadharLength.length === 12) {
      setAadharError(false);
    } else {
      setAadharError(true);
    }
  };
  const handleToggle = (checked) => {
    setChecked(checked);
    if (checked === false) {
      setSubadminData({ ...subadminData, subAdminId: "", password: "" });
      //setSubadminData({...userData, password:''})
    }
  };
  const subadminFormSubmit = async (e) => {
     setSpin(true);
    e.preventDefault();
     console.log(subadminData);
    const formData = new FormData();
    formData.append("fname", subadminData.fname);
    formData.append("lname", subadminData.lname);
    formData.append("email", subadminData.email);
    formData.append("phone", subadminData.phone);
    formData.append("gender", subadminData.gender);
    formData.append("dob", subadminData.dob);

    console.log(formData, "44");
    if (subadminData.subAdminId === undefined && subadminData.password === undefined) {
      formData.append("password", "");
      formData.append("subAdminId", "");
    } else {
      formData.append("password", subadminData.password);
      formData.append("subAdminId", subadminData.subAdminId);
    }
    if (countryCode === "91") {
      formData.append("aadhar", subadminData.aadhar_no);
      formData.append("aadhar_front_side", aadharImage.file);
      formData.append("aadhar_back_side", aadharBackImage.file);
      formData.append("pan_card", panImage.file);
      formData.append("pan", subadminData.pan_no);
    } 

    if (countryCode === "91") {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: {
              Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
          }
      }
        const res = await axios.post("/admin/create-sub-admin-inside-admin",formData,config );
        message.success("Registration successful");
        console.log(res.data, "224");
        localStorage.setItem("token", res.data.token);

        dispatch({ type: "USER", payload: true });

        // localStorage.setItem("login", true);
        subadminData.subAdminId = "";
        subadminData.password = "";

        localStorage.setItem("subadmin", res.data._id);
        localStorage.setItem("subAdminId", res.data.subAdminId);
        localStorage.setItem("password", res.data.password);

        localStorage.setItem("subadminfname", res.data.fname);

        navigate("/admindashboard/dashboard");

        setSpin(false);
      } catch (error) {
        message.warning(error.response.data.message);
        setSpin(false);
      }
    } 
  };

  //date of birth
  const handleDateOfBirthChange = (date, dateString) => {
    setSubadminData((userData) => ({
      ...userData,
      dob: dateString,
    }));
  };

  // -----------------

  // const [selectedOption, setSelectedOption] = useState("referral");
  // const [referralId, setReferralId] = useState("");
  // const officialId = "admin@123"; // Replace with your official ID
  const [countryCode, setCountryCode] = useState("");

  // const handleDropdownChange = (value) => {
  //   setSelectedOption(value);
  //   setReferralId("");
  //   setSubadminData({ ...subadminData, invite_code: officialId }); // Reset referral ID when changing options
  // };

  // const hadleRefferalId = (value) => {
  //   setReferralId(value);
  //   setSubadminData({ ...subadminData, invite_code: value });
  // };

  useEffect(() => {
    // const reffer = id.inviteCode;
    // if (reffer) {
    //   setSubadminData({ ...subadminData, invite_code: id.inviteCode });
    //   setReferralId(reffer);
    // }
  }, []);

  const handlePhoneChange = (value) => {
    const str = value;
    const firstTwoLetters = str.substring(0, 2);
    setCountryCode(firstTwoLetters);
    setPhone(value);
    setSubadminData({ ...subadminData, phone: value });
  };

  // valid email
  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      callback(); // Make sure callback is a function
    } else {
      callback("Please enter a valid email");
    }
  };

  //valid strong password
  const calculatePasswordStrength = (password) => {
    // Define your password strength criteria
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password
    );

    // Assign a score based on the criteria
    let score = 0;
    if (length >= 8) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;

    return score;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    //setPassword(newPassword);
    setSubadminData({ ...subadminData, password: newPassword });

    const strength = calculatePasswordStrength(newPassword);
    setStrength(strength);
  };

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "darkgreen";
      default:
        return "";
    }
  };
  return (
    <>
      <div className="registration-page">
        <div className="registration-body">
          <p>Create sub-admin with credentials</p>
          <div className="form-content">
            <form>
              {/* andt firt name */}
              <div className="input_label">
                <p>First Name</p>
                <Input
                  className="custom-placeholder-input"
                  //prefix={<UserOutlined />}
                  placeholder=" Enter first name"
                  name="fname"
                  value={subadminData.fname}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="input_label">
                <p>Last Name</p>
                <Input
                  className="custom-placeholder-input"
                  //prefix={<UserOutlined />}
                  placeholder="Enter last name"
                  name="lname"
                  value={subadminData.lname}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              {/* antd email input */}
              <div className="input_label">
                <p>Email</p>
                <Input
                  className="custom-placeholder-input"
                  prefix={<MailOutlined />}
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={subadminData.email}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              {/* antd phone */}
              <div className="input_label">
                <p>Phone Number</p>

                <PhoneInput
                  defaultCountry="US"
                  placeholder=" Enter phone Number"
                  name="phone"
                  countrySelectProps={{ suffixIcon: <FlagOutlined /> }}
                  inputComponent={Input}
                  value={subadminData.phone}
                  onChange={handlePhoneChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="gender-dob">
                <div className="gender-dob-section">
                  <p>Gender</p>
                  <Radio.Group
                    name="gender"
                    value={subadminData.gender}
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  >
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                  </Radio.Group>
                </div>
                <div className="gender-dob-section">
                  <p>DOB</p>
                  <DatePicker
                    placeholder="Select a date"
                    className="custom-datepicker"
                    onChange={handleDateOfBirthChange}
                    style={{ marginBottom: "10px" }}
                    suffixIcon={customDobSuffixIcon}
                  />
                </div>
              </div>
              <div className="input_label">
                <p>Aadhar No.</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter Aadhar no."
                  type="text"
                  name="aadhar_no"
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="aadhar-front">
                <p>Aadhar Front</p>
                <div>
                  <Input
                    placeholder="Aadhar Front Image"
                    type="file"
                    //style={{ display: 'none' }}
                    onChange={handleClickAadharFrontImage}
                  />
                </div>
              </div>

              <div className="aadhar-back">
                <p>Aadhar Back</p>
                <div>
                  <Input
                    placeholder="Aadhar back Image"
                    type="file"
                    //style={{ display: 'none' }}
                    onChange={handleClickAadharBackImage}
                  />
                </div>
              </div>

              <div className="input_label">
                <p>Pan No.</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder=" Enter Pan no."
                  type="text"
                  name="pan_no"
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                  //style={{ width: '500px', height: '40px' , marginBottom: '10px' }}
                />
              </div>

              <div className="pan_card">
                <p>Pan Card</p>
                <div>
                  <Input
                    placeholder="Pan card"
                    type="file"
                    //style={{ display: 'none' }}
                    onChange={handleClickPanCardImage}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              </div>
              {checked ? (
                <div className="password-input">
                  <p>Sub-Admin ID</p>
                  <Input
                    className="custom-placeholder-input"
                    placeholder="Enter your user ID"
                    value={subadminData.subAdminId}
                    name="subAdminId"
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              ) : (
                ""
              )}

              {checked ? (
                <div className="password-input">
                  <p>Password</p>
                  <Input.Password
                    className="custom-placeholder-input"
                    placeholder="Enter your password"
                    //type="password"
                    value={subadminData.password}
                    name="password"
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="submit-footer">
                <Button type="primary" onClick={subadminFormSubmit}>
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubAdminSignUpForm;
