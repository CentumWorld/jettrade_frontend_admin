import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Checkbox,
  Dropdown,
  Menu,
  DatePicker,
} from "antd";
import allState from "../AllStateAndDistrict";
import axios from "axios";
import { message, Spin } from "antd";
import baseUrl from "../../../../baseUrl";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const apiurl = baseUrl.apiUrl;

const { Option } = Select;

const BusinessDeveloperRegister = (props) => {
  // const navigate = useNavigate();
  const { updateData } = props;
  const [selectedStates, setSelectedStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

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
    city: "",
    aadhar: "",
    dob: "",
    address: "",
    pan_no: "",
    referredId: localStorage.getItem("franchiseRefferal"),
  });
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
    setStateRegisterData({
      ...stateRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setStateRegisterData({ ...stateRegisterData, dob: date });
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
      panImage.file = null;
    }
  };

  const handleClickBackAadharFrontImage = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      //preview shoe
      setBackAadharImage({ file: e.target.files[0] });
    } else {
      message.error("Invalid File !! ");
      panImage.file = null;
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

  const handleFrenchaeRegiSubmit = async (e) => {
    const updateList = "updateData";
    setLoading(true);
    e.preventDefault();
    console.log(
      stateRegisterData,
      panImage.file,
      aadharImage.file,
      backaadharImage.file
    );
    const formData = new FormData();
    formData.append("reffered_id", localStorage.getItem("franchiseRefferal"));
    formData.append("fname", stateRegisterData.fname);
    formData.append("lname", stateRegisterData.lname);
    formData.append("email", stateRegisterData.email);
    formData.append("phone", stateRegisterData.phone);
    formData.append("gender", stateRegisterData.gender);
    formData.append("password", stateRegisterData.password);
    formData.append("memberid", stateRegisterData.stateRegisterId);
    formData.append("aadhar_front_side", aadharImage.file);
    formData.append("aadhar_back_side", backaadharImage.file);
    formData.append("pan_card", panImage.file);
    formData.append("address", stateRegisterData.address);
    formData.append("aadhar", stateRegisterData.aadhar);
    formData.append("dob", stateRegisterData.dob);
    formData.append("pan", stateRegisterData.pan_no);

    console.log(formData, "44");

    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") ||
      localStorage.getItem("franchiseToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiurl}` + "/member/member-registration", formData, config)
      .then((res) => {
        message.success(res.data.message);
        setStateRegisterData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          gender: "",
          stateRegisterId: "",
          password: "",
        });
        setLoading(false);
        setAadharImage({ file: null });
        setPanImage({ file: null });
        updateData(updateList);
        props.closeModal();
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.message);
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
      .post(
        `${apiurl}` + "/admin/verify-buisness-developer-before-registration",
        data,
        config
      )
      .then((res) => {
        message.success("Verify successfully");
        console.log(res.data);
        setCity(res.data.franchieUserCity);
      })
      .catch((err) => {
        message.warning(err.response.data.message);
      });
  };

  useEffect(() => {
    // Set initial cities based on the selected state
    const cities =
      allState.states.find((state) => state.state === stateRegisterData.state)
        ?.districts || [];
    setCity(cities);
  }, [stateRegisterData.state]);

  const handleState = (value) => {
    setStateRegisterData((prevData) => ({
      ...prevData,
      state: value,
    }));
  };

  return (
    <>
      <div>
        <Modal
          title={<span style={{ color: "#1677ff" }}>Member Register</span>}
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
                value={localStorage.getItem("franchiseRefferal")}
                onChange={stateRegiInputs}
                disabled
              />
              {/* <Button onClick={verifyReferrlID}>Verify</Button> */}
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
              <Input
                placeholder="Phone"
                name="phone"
                value={stateRegisterData.phone}
                onChange={stateRegiInputs}
              />
            </div>
            {/* <div className='d-flex justify-content-between' style={{display: 'flex', flexDirection: 'column'}}> */}
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
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </div>
            <div className="state-field">
              <label>Address</label>

              <TextArea
                rows={4}
                name="address"
                value={stateRegisterData.address}
                onChange={stateRegiInputs}
                placeholder="Enter your address"
              />
            </div>
            <div className="state-field">
              <label>DOB</label>
              <br />
              <DatePicker
                name="dob"
                value={
                  stateRegisterData.dob ? moment(stateRegisterData.dob) : null
                }
                onChange={handleDateChange}
              />
            </div>
            <div className="state-field">
              <label>Aadhar no.</label>
              <Input
                placeholder="Aadhar no."
                name="aadhar"
                value={stateRegisterData.aadhar}
                onChange={stateRegiInputs}
              />
            </div>
            <div className="state-field">
              <label>Front aadhar card(JPG/PNG)</label>
              <Input
                type="file"
                placeholder="Front aadhar card"
                name="aadhar"
                accept=".jpg,.jpeg,.png"
                onChange={handleClickAadharFrontImage}
              />
            </div>
            <div className="state-field">
              <label>Back aadhar card(JPG/PNG)</label>
              <Input
                type="file"
                placeholder="Back aadhar card"
                name="backaadhar"
                accept=".jpg,.jpeg,.png"
                onChange={handleClickBackAadharFrontImage}
              />
            </div>
            <div className="state-field">
              <label>Pan(JPG/PNG) </label>
              <Input
                type="file"
                placeholder="Pan"
                name="pan"
                accept=".jpg,.jpeg,.png"
                onChange={handleClickPanCardImage}
              />
            </div>
            <div className="state-field">
              <label>Pan no. </label>
              <Input
                type="text"
                placeholder="Pan no."
                name="pan_no"
                onChange={stateRegiInputs}
              />
            </div>
            <div className="state-field">
              <label>member ID</label>
              <Input
                type="text"
                placeholder="Member ID"
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

export default BusinessDeveloperRegister;
