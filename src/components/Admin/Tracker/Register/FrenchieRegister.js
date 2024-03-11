import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Checkbox, Dropdown, Menu } from "antd";
import allState from "../AllStateAndDistrict";
import axios from "axios";
import { message, Spin } from "antd";
import baseUrl from "../../../../baseUrl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const mobileNumberRegex = /^(\+\d{1,4}[-.●\s]?)?\(?\d{1,4}\)?[-.●\s]?\d{1,10}$/;

const apiurl = baseUrl.apiUrl;
const { Option } = Select;

const FrenchieRegister = (props) => {
  // const navigate = useNavigate();
  const { dataUpdate } = props;
  const [selectedStates, setSelectedStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [verifyReferralID, setVerifyReferralID] = useState(false);

  const [stateRegisterData, setStateRegisterData] = useState({
    fname: "",
    lname: "",
    email: "",
    // phone: "",
    gender: "",
    state: "",
    stateRegisterId: "",
    password: "",
    referralid: "",
    city: [],
    referredId: localStorage.getItem("stateHandlerRefferalID"),
  });
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [aadharImage, setAadharImage] = useState({
    file: null,
  });
  const [backaadharImage, setBackAadharImage] = useState({
    file: null,
  });
  const [panImage, setPanImage] = useState({
    file: null,
  });
  const [spin, setSpin] = useState(false);
  const [adharerror,setAddharError] = useState("");
  const [adharbackerror,setAddharbackError] = useState("");
  const [panerror,setPanError] = useState("")

  useEffect(() => {
    const cities =
      allState.states.find((state) => state.state === stateRegisterData.state)
        ?.districts || [];
    setSelectedCities(cities);
  }, [stateRegisterData.state]);

  const handleCheckboxChange = (state) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(
        selectedStates.filter((selected) => selected !== state)
      );
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };
  const handleCheckboxChangeCity = (city) => {
    if (stateRegisterData.city.includes(city)) {
      setStateRegisterData({
        ...stateRegisterData,
        city: stateRegisterData.city.filter(
          (selectedCity) => selectedCity !== city
        ),
      });
    } else {
      setStateRegisterData({
        ...stateRegisterData,
        city: [...stateRegisterData.city, city],
      });
    }
  };

  const stateRegiInputs = (e) => {
    e.preventDefault();
    setStateRegisterData({
      ...stateRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  //handle front aadhar image function
  const handleClickAadharFrontImage = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
  if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setAddharError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setAadharImage({ file: null });
      } else {
        setAddharError("");
        setAadharImage({ file: selectedFile });
      }
    }
  };
  
  // handle addhar back side
  const handleClickBackAadharFrontImage = (e) => {
    const selectedFile = e.target.files[0]
    console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setAddharbackError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setBackAadharImage({ file: null });
      } else {
        setAddharbackError("");
        setBackAadharImage({ file: selectedFile });
      }
    }
  };

  //hadle pan card image function
  const handleClickPanCardImage = (e) => {
    const selectedFile = e.target.files[0]
   console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile.size >= 2 * 1024 * 1024) {
        setPanError("File size is more than 2MB");
        // Handle the case when the file size is more than 2MB
        setPanImage({ file: null });
      } else {
        setPanError("");
        setPanImage({ file: selectedFile });
      }
    }
  };

  const handleFrenchaeRegiSubmit = async (e) => {
    console.log(phoneNumber, 131);
    const frenchData = "update";
    setLoading(true);
    e.preventDefault();
    console.log(stateRegisterData, selectedStates, backaadharImage.file);
    const formData = new FormData();
    formData.append(
      "referredId",
      localStorage.getItem("stateHandlerRefferalID")
    );
    formData.append("fname", stateRegisterData.fname);
    formData.append("lname", stateRegisterData.lname);
    formData.append("email", stateRegisterData.email);
    formData.append("phone",'+' + phoneNumber);
    formData.append("gender", stateRegisterData.gender);
    formData.append("password", stateRegisterData.password);
    formData.append("frenchiseId", stateRegisterData.stateRegisterId);
    formData.append("adhar_front_side", aadharImage.file);
    formData.append("adhar_back_side", backaadharImage.file);
    formData.append("panCard", panImage.file);
    formData.append("franchiseState", stateRegisterData.state);
    formData.append("franchiseCity", stateRegisterData.city);
    console.log(formData, "44");

    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/admin/create-frenchise", formData, config)
      .then((res) => {
        message.success(res.data.message);
        setStateRegisterData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          gender: "",
          state: "",
          password: "",
          state: "",
        });
        setLoading(false);
        setAadharImage({ file: null });
        setPanImage({ file: null });
        dataUpdate(frenchData);
        props.closeModal();
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err.response.data.message);
      });
  };

  const menu = (
    <Menu>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {selectedCities.map((city) => (
          <Menu.Item key={city}>
            <Checkbox
              onChange={() => handleCheckboxChangeCity(city)}
              checked={
                stateRegisterData.city && stateRegisterData.city.includes(city)
              }
            >
              {city}
            </Checkbox>
          </Menu.Item>
        ))}
      </div>
    </Menu>
  );

  // verify refferal id
  const verifyReferrlID = () => {
    const token = localStorage.getItem("adminToken");
    let data = {
      refferId: stateRegisterData.referredId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/admin/verify-franchie-before-registration", data)
      .then((res) => {
        message.success("Verify successfully");
        console.log(res.data);
        setState(res.data.stateUserState);
        setVerifyReferralID(true);
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };

  const handleState = (value) => {
    setStateRegisterData({ city: [] });
    console.log(value);
    setStateRegisterData((prevData) => ({
      ...prevData,
      state: value,
    }));
  };

  const phoneChange = (value)=>{
    setPhoneNumber(value)
    // console.log(value)
  }
  return (
    <>
      <div>
        <Modal
          title={<span style={{ color: "#1677ff" }}>Franchise Register</span>}
          open={props.isModalVisible}
          onCancel={props.closeModal}
          onOk={handleFrenchaeRegiSubmit}
          okText={loading ? <Spin /> : "Submit"}
        >
          <div className="form-container">
            <div className="state-field">
              <label>Referral ID</label>
              <Input
                placeholder="Enter referral ID"
                name="referredId"
                value={localStorage.getItem("stateHandlerRefferalID")}
                onChange={stateRegiInputs}
                disabled
              />
            </div>
            <div className="state-field">
              <label>First Name</label>
              <Input
                placeholder="First Name"
                name="fname"
                value={stateRegisterData.fname}
                onChange={stateRegiInputs}
              />
            </div>
            <div className="state-field">
              <label>Last Name</label>
              <Input
                placeholder="Last Name"
                name="lname"
                value={stateRegisterData.lname}
                onChange={stateRegiInputs}
              />
            </div>
            <div className="state-field">
              <label>Email</label>
              <Input
                placeholder="Email"
                name="email"
                value={stateRegisterData.email}
                onChange={stateRegiInputs}
              />
            </div>
            <div className="state-field">
              <label>Phone</label>
              {/* <Input
                placeholder="Phone"
                name="phone"
                value={stateRegisterData.phone}
                onChange={stateRegiInputs}
              /> */}
              <PhoneInput
                name="phone"
                value={stateRegisterData.phone}
                onChange={(e) => phoneChange(e)}
                country={"in"}
                placeholder="Mobile no"
              />
            </div>
            {/* <div className='d-flex justify-content-between' style={{ display: 'flex', flexDirection: 'column' }}> */}
            <div className="state-field">
              <label>Gender</label>
              <br />
              <Select
                placeholder="Select Gender"
                name="gender"
                value={stateRegisterData.gender}
                onChange={(value) =>
                  setStateRegisterData((prevData) => ({
                    ...prevData,
                    gender: value,
                  }))
                }
                style={{ width: "100%" }}
              >
                <Option value="">Gender</Option>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </div>
            <div className="state-field">
              <label>State</label>
              <br />

              <Select
                placeholder="Select state"
                name="state"
                value={stateRegisterData.state}
                onChange={handleState}
                style={{ width: "100%" }}
              >
                <Option value="">Select state</Option>
                {allState.states.map((state) => (
                  <Option key={state.state} value={state.state}>
                    {state.state}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="state-field">
              <label>City</label>
              <br />
              <Dropdown
                overlay={menu}
                name="state"
                value={stateRegisterData.city}
                onChange={stateRegiInputs}
                trigger={["click"]}
                style={{ width: "100%" }}
              >
                <Button style={{ width: "100%" }}>Select city</Button>
              </Dropdown>
              <div>
                <ul>
                  {stateRegisterData.city &&
                    stateRegisterData.city.map((city) => (
                      <li key={city}>{city}</li>
                    ))}
                </ul>
              </div>
            </div>
            {/* </div> */}
            <div className="state-field">
              <label>Front side Aadhaar(JPG/PNG)</label>
              <Input
                type="file"
                placeholder="Front side aadhar"
                name="aadhar"
                accept=".jpg, .jpeg, .png"
                onChange={handleClickAadharFrontImage}
              />
            <p style={{color:"red"}}>{adharerror}</p>
            </div>
            <div className="state-field">
              <label>Back side Aadhaar(JPG/PNG)</label>
              <Input
                type="file"
                placeholder="Back side aadhar"
                name="backaadhar"
                accept=".jpg, .jpeg, .png"
                onChange={handleClickBackAadharFrontImage}
              />
               <p style={{color:"red"}}>{adharbackerror}</p>
            </div>
            <div className="state-field">
              <label>Pan Card(JPG/PNG) </label>
              <Input
                type="file"
                placeholder="Pan"
                name="pan"
                accept=".jpg, .jpeg, .png"
                onChange={handleClickPanCardImage}
              />
               <p style={{color:"red"}}>{panerror}</p>
            </div>
            <div className="state-field">
              <label>Franchise ID</label>
              <Input
                type="text"
                placeholder="Frenchise Id"
                name="stateRegisterId"
                value={stateRegisterData.stateRegisterId}
                onChange={stateRegiInputs}
              />
            </div>
            <div className="state-field">
              <label>Password</label>
              <Input.Password
                type="password"
                placeholder="Password"
                name="password"
                value={stateRegisterData.password}
                onChange={stateRegiInputs}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default FrenchieRegister;

//FrenchieRegister
