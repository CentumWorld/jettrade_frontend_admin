import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { Switch } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/CreateUserInAdmin.css";
import { Select, Input, Radio, DatePicker, Button, message, Spin } from "antd";
import {
  MailOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import baseUrl from "../../../baseUrl";

const apiurl = baseUrl.apiUrl;
const { Option } = Select;

const CreateReferralInAdmin = () => {
  const [loading, setLoading] = useState(false);
  const customDobSuffixIcon = <CalendarOutlined style={{ color: "#5e72e4" }} />;

  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);

  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    aadhar_no: "",
    pan_no: "",
    invite_code: "",
    memberid: "",
    password: "",
  });

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

  const navigate = useNavigate();
  //console.log(userData)
  const userInputs = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
    setUserData({ ...userData, pan_no: e.target.value });
    let panLength = e.target.value;
    console.log(userData.pan_no);
    if (panLength.length === 10) {
      setPanError(false);
    } else {
      setPanError(true);
    }
  };
  const aadhar = (e) => {
    setUserData({ ...userData, aadhar_no: e.target.value });
    let aadharLength = e.target.value;
    if (aadharLength.length === 12) {
      setAadharError(false);
    } else {
      setAadharError(true);
    }
  };
  function home() {
    navigate("/");
  }
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userData);
    const formData = new FormData();
    formData.append("fname", userData.fname);
    formData.append("lname", userData.lname);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("address", userData.address);
    formData.append("gender", userData.gender);
    formData.append("dob", userData.dob);
    formData.append("aadhar", userData.aadhar_no);
    formData.append("aadhar_front_side", aadharImage.file);
    formData.append("aadhar_back_side", aadharBackImage.file);
    formData.append("pan_card", panImage.file);
    formData.append("pan", userData.pan_no);

    formData.append("reffered_id", userData.invite_code);
    console.log(formData.memberid, "44");
    if (userData.memberid === undefined && userData.password === undefined) {
      formData.append("password", "");
      formData.append("memberid", "");
    } else {
      formData.append("password", userData.password);
      formData.append("memberid", userData.memberid);
    }
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
      },
    };
    axios
      .post(`${apiurl}` + "/member/member-registration", formData)
      .then((res) => {
        setLoading(false);
        message.success("Registration successful");
        navigate("/admindashboard/refferal");
      })
      .catch((error) => {
        //console.log(error.response.data)
        setLoading(false);
        message.warning(error.response.data.message);
      });
  };
  //date of birth
  const handleDateOfBirthChange = (date, dateString) => {
    setUserData((userData) => ({
      ...userData,
      dob: dateString,
    }));
  };

  // -----------------

  const [selectedOption, setSelectedOption] = useState("referral");
  const [referralId, setReferralId] = useState("");
  const officialId = "admin@123"; // Replace with your official ID

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    setReferralId("");
    setUserData({ ...userData, invite_code: officialId }); // Reset referral ID when changing options
  };

  const hadleRefferalId = (value) => {
    setReferralId(value);
    setUserData({ ...userData, invite_code: value });
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setUserData({ ...userData, phone: value });
  };

  const handleToggle = (checked) => {
    setChecked(checked);
    if (checked === false) {
      setUserData({ ...userData, memberid: "", password: "" });
      //setUserData({...userData, password:''})
    }
  };

  return (
    <>
      <div className="registration-page">
        <div className="registration-body">
          <p>Create Member with credentials</p>
          <div className="form-content">
            <form>
              {/* Dropdown and input box for referral */}
              <div className="d-flex">
                <Select value={selectedOption} onChange={handleDropdownChange}>
                  <Select.Option value="official">Official ID</Select.Option>
                  <Select.Option value="referral">
                    Put Referral ID
                  </Select.Option>
                </Select>

                {selectedOption === "official" && (
                  <div>
                    <Input
                      type="text"
                      id="official-id"
                      value={officialId}
                      style={{ marginBottom: "10px", width: "100%" }}
                      disabled
                    />
                  </div>
                )}

                {selectedOption === "referral" && (
                  <div>
                    <Input
                      className="custom-placeholder-input"
                      type="text"
                      id="referral-id"
                      value={referralId}
                      name="invite_code"
                      onChange={(e) => hadleRefferalId(e.target.value)}
                      placeholder="Enter referral ID"
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                )}
              </div>
              {/* --------------------- */}
              {/* First name */}
              <div className="input_label">
                <p>First Name</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter first name"
                  name="fname"
                  value={userData.fname}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              <div className="input_label">
                <p>Last Name</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter last name"
                  name="lname"
                  value={userData.lname}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              {/* Email input */}
              <div className="input_label">
                <p>Email</p>
                <Input
                  className="custom-placeholder-input"
                  prefix={<MailOutlined />}
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>
              {/* Phone */}
              <div className="input_label">
                <p>Phone Number</p>
                <PhoneInput
                  defaultCountry="US"
                  placeholder="Enter phone Number"
                  name="phone"
                  countrySelectProps={{ suffixIcon: <FlagOutlined /> }}
                  inputComponent={Input}
                  value={userData.phone}
                  onChange={handlePhoneChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="input_label">
                <p>Address</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter Address"
                  name="address"
                  value={userData.address}
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="gender-dob">
                <div className="gender-dob-section">
                  <p>Gender</p>
                  <Radio.Group
                    name="gender"
                    value={userData.gender}
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
                    onChange={handleClickAadharBackImage}
                  />
                </div>
              </div>

              <div className="input_label">
                <p>Pan No.</p>
                <Input
                  className="custom-placeholder-input"
                  placeholder="Enter Pan no."
                  type="text"
                  name="pan_no"
                  onChange={userInputs}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div className="pan_card">
                <p>Pan Card</p>
                <div>
                  <Input
                    placeholder="Pan card"
                    type="file"
                    onChange={handleClickPanCardImage}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              </div>

              <div className="password-input">
                <div className="input_label">
                  <p>Member ID</p>
                  <Input
                    className="custom-placeholder-input"
                    placeholder="Enter your Member ID"
                    value={userData.memberid}
                    name="memberid"
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  />
                </div>

                <div className="input_label">
                  <p>Password</p>
                  <Input.Password
                    className="custom-placeholder-input"
                    placeholder="Enter your password"
                    value={userData.password}
                    name="password"
                    onChange={userInputs}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              </div>

              <div className="submit-footer">
                <Button type="primary" onClick={submit}>
                  {loading ? <Spin /> : "Create"}
                </Button>
                <NavLink className="back-to-list" to="/admindashboard/user">
                  Back to List
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReferralInAdmin;
