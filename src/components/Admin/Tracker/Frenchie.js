import React, { useEffect, useState, useRef } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi"
import {
  Button,
  Table,
  Dropdown,
  Menu,
  Modal,
  message,
  Select,
  Form,
  Input,
  Checkbox,
} from "antd";
import FrenchieRegister from "./Register/FrenchieRegister";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import aadharFront from "../../../img/aadhar.jpg";
import allState from "./AllStateAndDistrict";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../baseUrl";

const apiurl = baseUrl.apiUrl;

const { Option } = Select;

const{Search} = Input

const Frenchie = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [frenchieData, setFrenchieData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [isDeleted, setIsDeleted] = useState(true);
  const [myID, setMyID] = useState("");
  const [uploadButton, setUploadButton] = useState(true);
  const [uploadButtonPan, setUploadButtonPan] = useState(true);
  const [frenchiseVerify, setFrenchiseVerify] = useState(false);
  const [aadharCard, setAadharCard] = useState({
    placeholder: aadharFront,
    file: null,
  });
  const [panCard, setPanCard] = useState({
    placeholder: "",
    file: null,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFranchiseData, setFranchiseData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
    state: "",
    city: [],
  });
  const [frenchiseId, setFrenchiseId] = useState("");
  const [filteredDataSource,setFilteredDataSource] = useState([])
  const [searchText, setSearchText] = useState("");


  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  // --------------------------
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchFrenchieseDataApi();
  }, []);

  const adminToken = localStorage.getItem("adminToken");
  const subAdminToken = localStorage.getItem("subAdminToken");

  const columns = [
    {
      title: "Franchise ID",
      dataIndex: "frenchiseId",
      key: "frenchiseId",
    },
    {
      title: "Fname",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Lname",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Referral ID",
      dataIndex: "referralId",
      key: "referralId",
      render: (text) => (
        <span
          style={{ cursor: 'pointer', userSelect: 'all' }}
          onClick={() => {
            navigator.clipboard.writeText(text);
            message.success('Text copied to clipboard: ' + text);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Referred ID",
      dataIndex: "referredId",
      key: "referredId",
    },
    {
      title: "City",
      dataIndex: "franchiseCity",
      key: "franchiseCity",
      render: (franchiseCity) => franchiseCity.join(', '),
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      render: (isBlocked) => {
        const cellStyle = isBlocked ? { color: "red" } : { color: "green" };
        return (
          <span style={cellStyle}>
            {isBlocked ? "Blocked" : "Not Blocked "}
          </span>
        );
      },
    },
    {
      title: "Verify",
      dataIndex: "isVerify",
      render: (isVerify) => {
        const cellStyle = isVerify ? { color: "green" } : { color: "red" };
        return (
          <span style={cellStyle}>{isVerify ? "Verified" : "Not Verify "}</span>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "isDeleted",
      render: (isDeleted) => {
        const cellStyle = isDeleted ? { color: "red" } : { color: "green" };
        return (
          <span style={cellStyle}>
            {isDeleted ? "Deleted" : "Not Deleted "}
          </span>
        );
      },
    },
    {
      title: "P/R",
      dataIndex: "paymentRequestCount",
      key: "paymentRequestCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown overlay={adminToken ? menu : subMenu} placement="bottomLeft" trigger={["click"]}>
          <BsThreeDotsVertical
            size={24}
            onClick={() =>
              trigerAction(
                record._id,
                record.isBlocked,
                record.isDeleted,
                record.frenchiseId,
                record.isVerify
              )
            }
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      ),
    },
  ];

  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("subAdminToken");

  const stateToken = localStorage.getItem("stateHandlerToken");
  const stateHandlerRefferalID = localStorage.getItem("stateHandlerRefferalID");
  console.log("===============>", stateToken, stateHandlerRefferalID);

  const fetchFrenchieseDataApi = () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`${apiurl}` + "/admin/fetch-all-frenchise", config)
        .then((res) => {

          setLoading(true)

          setFrenchieData(res.data.data);
          setFilteredDataSource(res.data.data)
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (stateToken && stateHandlerRefferalID) {
      const requestData = {
        stateReferralId: stateHandlerRefferalID,
      };
      const config = {
        headers: { Authorization: `Bearer ${stateToken}` },
      };
      axios
        .post(
          `${apiurl}` + "/state/fetch-all-franchise-in-state",
          requestData,
          config
        )
        .then((res) => {
          console.log(
            "Franchise in state response -----> ",
            res.data.data[0].adharCard
          );
          setFrenchieData(res.data.data);
          setFilteredDataSource(res.data.data)

        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  // handle action
  const trigerAction = (id, block, franchiseDelete, frenchiseId, verify) => {
    setMyID(id);
    setIsBlock(block);
    setIsDeleted(franchiseDelete);
    setFrenchiseId(frenchiseId);
    setFrenchiseVerify(verify);
  };
  const handleMenuClick = (e) => {
    console.log(e.key);

    if (e.key === "block") {
      blockUnblock(myID);
    } else if (e.key === "view") {
      setVisible(true);
      openViewModal(myID);
    } else if (e.key === "edit") {
      setEditModalVisible(true);
      editFranchiseDataFunction(myID);
    } else if (e.key === "delete") {
      deleteAndRecoverFranchise(myID);
    } else if (e.key === "account") {
      navigate(`/admindashboard/tracker/frenchise-account/${frenchiseId}`);
    } else if (e.key === "verify") {
      callApiToVerifyFrenchise(frenchiseVerify);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={frenchiseVerify}>
        Verify
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
      <Menu.Item key="delete">{isDeleted ? "Recover" : "Delete"}</Menu.Item>
      <Menu.Item key="account">Account</Menu.Item>
    </Menu>
  );

  const subMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={frenchiseVerify}>
        Verify
      </Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
    </Menu>
  );

  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} Franchise`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this member?`,
      onOk() {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("stateHandlerToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const data = {
          id: id,
          block: !isBlocked,
        };
        axios
          .post(`${apiurl}` + "/admin/block-franchise-by-admin", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchFrenchieseDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const openViewModal = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken")||
      localStorage.getItem("subAdminToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: id,
    };
    axios
      .post(`${apiurl}` + "/admin/get-one-franchise-details", data, config)
      .then((res) => {
        setAadharCard({ placeholder: res.data.data.adharCard });
        setPanCard({ placeholder: res.data.data.panCard });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    document.getElementById("adhar-image").click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAadharCard({
            placeholder: reader.result,
            file: selectedFile,
          });
          setUploadButton(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  };

  const uploadAadhar = () => {
    console.log(aadharCard.file);
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken")||
      localStorage.getItem("subAdminToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = new FormData();
    data.append("id", myID);
    data.append("adharCard", aadharCard.file);
    axios
      .put(`${apiurl}` + "/admin/update-adhar-card-franchise", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButton(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleImageChangePan = (e) => {
    e.preventDefault();
    document.getElementById("pan-image").click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPanCard({
            placeholder: reader.result,
            file: selectedFile,
          });
          setUploadButtonPan(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  };

  const uploadPan = () => {
    console.log(panCard.file);
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken")||
      localStorage.getItem("subAdminToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = new FormData();
    data.append("id", myID);
    data.append("panCard", panCard.file);
    axios
      .put(`${apiurl}` + "/admin/update-pan-card-franchise", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButtonPan(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const editFranchiseDataFunction = (id) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: id,
    };
    axios
      .post(`${apiurl}` + "/admin/get-one-franchise-details", data, config)
      .then((res) => {
        console.log(res.data);
        setFranchiseData({
          fname: res.data.data.fname,
          lname: res.data.data.lname,
          phone: res.data.data.phone,
          email: res.data.data.email,
          gender: res.data.data.gender,
          state: res.data.data.franchiseState,
          city: [],
        });
      })
      .catch((err) => {
        console.log(err.response.data.messsage);
      });
  };
  const selectStateFromDeopDown = (selectedState) => {
    const selectedStateData = allState.states.find(
      (state) => state.state === selectedState
    );
    if (selectedStateData) {
      setFranchiseData({
        ...editFranchiseData,
        state: selectedState,
        city: [], // Use districts as cities for the selected state
      });
    }
  };

  const handleCitySelectChange = (selectedCities) => {
    setFranchiseData({
      ...editFranchiseData,
      city: selectedCities,
    });
  };

  const submitEditForm = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: myID,
      fname: editFranchiseData.fname,
      lname: editFranchiseData.lname,
      phone: editFranchiseData.phone,
      email: editFranchiseData.email,
      franchiseState: editFranchiseData.state,
      franchiseCity: editFranchiseData.city,
      gender: editFranchiseData.gender,
    };
    axios
      .put(`${apiurl}` + "/admin/update-franchise", data, config)
      .then((res) => {
        message.success(res.data.message);
        fetchFrenchieseDataApi();
        setEditModalVisible(false);
        setFranchiseData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          state: "",
          city: [],
          gender: "",
        });
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    console.log(editFranchiseData);
  };

  const deleteAndRecoverFranchise = (id) => {
    const actionText = isDeleted ? "Recover" : "Delete";
    console.log(!isDeleted);
    Modal.confirm({
      title: `${actionText} Franchise`,
      content: `Are you sure you want to ${actionText.toLowerCase()} this franchise?`,
      onOk() {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("stateHandlerToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let data = {
          id: id,
          delete: !isDeleted,
        };

        axios
          .post(`${apiurl}` + "/admin/delete-franchise", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchFrenchieseDataApi();
          })
          .catch((err) => {
            message.error(err.response.data.message || "Something went wrong!");
          });
      },
      onCancel() {
        console.log("Deletion/recovery cancelled");
      },
    });
  };

  const inputChangeValue = (event) => {
    const { name, value } = event.target;
    setFranchiseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const genderChange = (name, value) => {
    setFranchiseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const genderChangeValue = (value) => {
    genderChange("gender", value);
  };

  const callApiToVerifyFrenchise = (frenchiseVerify) => {
    console.log(frenchiseVerify);
    Modal.confirm({
      title: "Verify Franchise",
      content: `Are you sure you want to  verify Franchise?`,
      onOk() {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("subAdminToken") ||
           localStorage.getItem('stateHandlerToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const data = {
          id: myID,
          isVerify: frenchiseVerify,
        };
        axios
          .post(`${apiurl}` + "/admin/verify-franchise", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchFrenchieseDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("verify cancelled");
      },
    });
  };

  const getChildUpdate = (childData)=>{
    fetchFrenchieseDataApi();
  }

  const downloadAadharCard = (adharCardImage) => {
    const link = document.createElement("a");
    link.href = adharCardImage;
    link.download = "image.jpg";
    link.click();
  }

  const downloadPanCard = (panCardImage) => {
 
    const link = document.createElement("a");
    link.href = panCardImage;
    link.download = "image.jpg";
    link.click();
  }
  


  const searchUser = (value) => {
    console.log(value, "value");

    setSearchText(value);

    const searchNumber = Number(value); // Convert search value to a Number

    console.log(frenchieData, "franchise data is coming");

    const filteredData = frenchieData.filter((record) => {
      // Search by number field
      if (record.phone === searchNumber) {
        // Replace "numberField" with your actual field name
        return true;
      }

      // Search by other fields
      return Object.values(record).some((recordValue) => {
        if (typeof recordValue === "string") {
          const lowercaseRecordValue = recordValue.toLowerCase();
          return lowercaseRecordValue.includes(value.toLowerCase());
        }
        return false;
      });
    });
    setFilteredDataSource(filteredData);
  };

  return (
    <>
      <FrenchieRegister
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        dataUpdate={getChildUpdate}
      />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <span style={{color:"wheat"}}><BiArrowBack style={{cursor:'pointer'}} onClick={gotoDashboard}/> &nbsp;Franchise</span>

            <Search
              placeholder="Enter search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={searchUser}
              style={{ width: "40%"}}
            />


            {stateToken?<Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add Franchise
            </Button>:""}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Table
            // dataSource={frenchieData}
            dataSource={filteredDataSource}

            columns={columns}
            pagination={{ pageSize: 7 }}
            scroll={{ x: true, y: true }}
            style={{
              flex: 1,
              overflow: "auto",
              maxWidth: "100%",
              marginTop: "1rem",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
        </div>
      </div>

      {/* -----view modal ----- */}
      {visible ? (
        <Modal
          title="View Document Details"
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input
            id="adhar-image"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div className="d-flex">
            <label htmlFor="adhar-image">
              <img
                src={aadharCard.placeholder}
                height={200}
                width={300}
                alt="Selected Image"
                style={{ cursor: "pointer" }}
              />
            </label>
            <Button disabled={uploadButton} onClick={uploadAadhar}>
              Upload
            </Button>

            <Button
                className="id-card"
                type="primary"
                onClick={() =>
                  downloadAadharCard(aadharCard.placeholder)
                }
              >
                download
              </Button>

          </div>
          <hr />
          <input
            id="pan-image"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChangePan}
          />
          <div className="d-flex">
            <label htmlFor="pan-image">
              <img
                src={panCard.placeholder}
                height={200}
                width={300}
                alt="Selected Image"
                style={{ cursor: "pointer" }}
              />
            </label>
            <Button disabled={uploadButtonPan} onClick={uploadPan}>
              Upload
            </Button>

            <Button
                className="id-card"
                type="primary"
                onClick={() =>
                  downloadPanCard(panCard.placeholder)
                }
              >
                download
              </Button>

          </div>
        </Modal>
      ) : (
        ""
      )}
      {/* edit modal */}
      {editModalVisible ? (
        <Modal
          title="Edit Details"
          open={editModalVisible}
          onOk={submitEditForm}
          onCancel={closeEditModal}
        >
          <Form.Item label="Fname:">
            <Input
              placeholder="First name.."
              name="fname"
              onChange={inputChangeValue}
              type="text"
              value={editFranchiseData.fname}
            />
          </Form.Item>
          <Form.Item label="Lname:">
            <Input
              placeholder="Last name"
              name="lname"
              onChange={inputChangeValue}
              type="text"
              value={editFranchiseData.lname}
            />
          </Form.Item>
          <Form.Item label="Email:">
            <Input
              placeholder="Email"
              name="email"
              onChange={inputChangeValue}
              type="email"
              value={editFranchiseData.email}
            />
          </Form.Item>
          <Form.Item label="Phone:">
            <Input
              placeholder="Phone"
              name="phone"
              onChange={inputChangeValue}
              type="text"
              value={editFranchiseData.phone}
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              value={editFranchiseData.gender}
              style={{ width: 120 }}
              onChange={genderChangeValue}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="State">
            <Select
              style={{ width: 200 }}
              value={editFranchiseData.state}
              onChange={selectStateFromDeopDown}
            >
              {allState.states.map((state) => (
                <Option key={state.state} value={state.state}>
                  {state.state}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="City">
            {editFranchiseData.state && (
              <Select
                placeholder="Select city"
                mode="multiple"
                style={{ width: 200 }}
                value={editFranchiseData.city}
                onChange={handleCitySelectChange}
              >
                {allState.states
                  .find((state) => state.state === editFranchiseData.state)
                  ?.districts.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Frenchie;
