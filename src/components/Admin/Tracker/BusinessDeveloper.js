import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table, Menu, Dropdown, Modal, message, Select, Form, Input } from "antd";
import BusinessDeveloperRegister from "./Register/BusinessDeveloperRegister";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import baseUrl from "../../../baseUrl";
import { Navigate, useNavigate } from "react-router-dom";

const apiurl = baseUrl.apiUrl

const { Option } = Select;

const BusinessDeveloper = () => {
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bussinessData, setbussinessData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [isDeleted, setIsDeleted] = useState(true);
  const [myID, setMyID] = useState("");
  const [closeEditModalPopup, setCloseEditModalPopup] = useState(false);
  const [franchiseCity, setFranchiseCity] = useState([])
  const [openViewModal, setOpenViewModal] = useState(false);
  const [uploadButton, setUploadButton] = useState(true);
  const [uploadButtonPan, setUploadButtonPan] = useState(true);
  const [businessId, setbussinessId] = useState("");
  const [bdVerify , setBdVerify] = useState(false);
  const [aadharCard, setAadharCard] = useState({
    placeholder:"",
    file:null
  })
  const [panCard, setPanCard] = useState({
    placeholder:"",
    file:null
  })
  const [editBusinessDeveloperData, setEditBusinessDeveloperData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    city: ""
  })

  const [reffralid, setRefferedID] = useState('');

  useEffect(() => {
    fetchBussinesDeveloperDataApi();
  }, []);

  const closeEditModal = () => {
    setCloseEditModalPopup(false)
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeViewModal = ()=>{
    setOpenViewModal(false)
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "BussinessId",
      dataIndex: "businessDeveloperId",
      key: "businessDeveloperId",
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
      title: "Reffered Id",
      dataIndex: "referredId",
      key: "referredId",
    },
    {
      title: "Refferal Id",
      dataIndex: "referralId",
      key: "referralId",
    },
    {
      title: "City",
      dataIndex: "buisnessCity",
      key: "buisnessCity",
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
      title: 'Verify', dataIndex: 'isVerify', render: (isVerify) => {
        const cellStyle = isVerify ? { color: 'green' } : { color: 'red' };
        return <span style={cellStyle}>{isVerify ? 'Verified' : 'Not Verify '}</span>;
      },
    },
    {
      title: 'Delete', dataIndex: 'isDeleted', render: (isDeleted) => {
        const cellStyle = isDeleted ? { color: 'red' } : { color: 'green' };
        return <span style={cellStyle}>{isDeleted ? 'Deleted' : 'Not Delete'}</span>;
      },
    },
    {
      title:"P/R",
      dataIndex:"paymentRequestCount",
      key:"paymentRequestCount"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
          <BsThreeDotsVertical
            size={24}
            onClick={() => trigerAction(record._id, record.isBlocked, record.referredId, record.isDeleted,record.businessDeveloperId, record.isVerify)}
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      ),
    },
  ];
  //token
  const token = localStorage.getItem("adminToken")|| localStorage.getItem("subAdminToken")
  const stateToken = localStorage.getItem("stateHandlerToken");
  const frenchiseToken = localStorage.getItem("franchiseToken");
  //referralId
  const stateHandlerRefferalID = localStorage.getItem("stateHandlerRefferalID");
  const franchiseRefferal = localStorage.getItem("franchiseRefferal");

  console.log("statedata=====>", stateToken, stateHandlerRefferalID);

  const fetchBussinesDeveloperDataApi = () => {

    if (token) {

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`${apiurl}`+"/admin/fetch-all-businessDeveloper", config)
        .then((res) => {
          console.log("Bussiness respone -> ", res.data);
          setbussinessData(res.data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else if (stateToken && stateHandlerRefferalID) {
      const config = {
        headers: { Authorization: `Bearer ${stateToken}` },
      };

      const requestData = {
        stateReferralId: stateHandlerRefferalID,
      };
      axios
        .post(`${apiurl}`+"/state/fetch-all-business-developers-in-state", requestData, config)
        .then((res) => {
          console.log("Bussiness responebhejo -> ", res.data);
          setbussinessData(res.data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });

    } else if (frenchiseToken && franchiseRefferal) {
      const config = {
        headers: { Authorization: `Bearer ${frenchiseToken}` },
      };

      const requestData = {
        franchiseReferralId: franchiseRefferal,
      };
      axios
        .post(`${apiurl}`+"/franchise/get-all-business-developer-in-franchise", requestData, config)
        .then((res) => {
          console.log("Bussiness responebhejo -> ", res.data);
          setbussinessData(res.data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  // handle action
  const trigerAction = (id, block, refferalid, businessDeveloperDelete,bussinessId, verify) => {
    setMyID(id);
    setIsBlock(block);
    setRefferedID(refferalid)
    setIsDeleted(businessDeveloperDelete)
    setbussinessId(bussinessId)
    setBdVerify(verify)
  };
  const handleMenuClick = (e) => {
    console.log(e.key);

    if (e.key === "block") {
      blockUnblock(myID);
    } else if (e.key === "edit") {
      setCloseEditModalPopup(true)
      callApiToFranchiseCity()
      callApiToGetIndividualBusinessDeveloperData();
    }else if(e.key === "view"){
      setOpenViewModal(true);
      callApiToFetchDocument();
    }else if (e.key === "delete"){
      deleteAndRecoverBusinessDeveloper(myID)
 
    }else if(e.key === 'account'){
      navigate(`/admindashboard/tracker/business-account/${businessId}`)
    }else if(e.key === "verify"){
      callApiToVerifyBD(bdVerify)
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verify" disabled={bdVerify}>Verify</Menu.Item>
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
      <Menu.Item key="delete">{isDeleted?'Recover':'Delete'}</Menu.Item>
      <Menu.Item key="account">Account</Menu.Item>
    </Menu>
  );

  const deleteAndRecoverBusinessDeveloper = (id) => {
    const actionText = isDeleted ? "Recover" : "Delete";
    Modal.confirm({
      title: `${actionText} Business Developer`,
      content: `Are you sure you want to ${actionText.toLowerCase()} this Business Developer`,
      onOk() {
        const token = localStorage.getItem("adminToken") ||
          localStorage.getItem("stateHandlerToken") ||
          localStorage.getItem("franchiseToken");
        
        const endpoint = isDeleted ? "recover-business-developer" : "delete-business-developer";
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const data = {
          id: id,
          delete: !isDeleted,
        };
  
        axios
          .post(`${apiurl}/admin/delete-business-developer`, data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchBussinesDeveloperDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("Action cancelled");
      },
    });
  };
  
  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} Business Developer`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this member?`,
      onOk() {
        const token = localStorage.getItem("adminToken") ||
          localStorage.getItem("stateHandlerToken") ||
          localStorage.getItem("franchiseToken");
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
          .post(`${apiurl}`+"/admin/block-business-developer-by-admin", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchBussinesDeveloperDataApi();
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


  const callApiToFranchiseCity = () => {
    const token = localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") || localStorage.getItem("franchiseToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      franchiseReferralId: reffralid
    }

    axios.post(`${apiurl}`+"/admin/fetch-city-by-referralid-in-franchise", data, config)
      .then((res) => {
        console.log(res.data)
        setFranchiseCity(res.data.CityList)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  const callApiToGetIndividualBusinessDeveloperData = () => {
    const token = localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken") || localStorage.getItem("franchiseToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: myID
    }

    axios.post(`${apiurl}`+'/admin/get-one-business-developer-details', data, config)
      .then((res) => {
        setEditBusinessDeveloperData({
          fname: res.data.data.fname,
          lname: res.data.data.lname,
          email: res.data.data.email,
          phone: res.data.data.phone,
          gender: res.data.data.gender
        })
      })
      .catch((err) => {
        message.error(err.response.data.message)
      })
  }

  const inputChangeValue = (event) => {
    const { name, value } = event.target;
    setEditBusinessDeveloperData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const genderChange = (name, value) => {
    setEditBusinessDeveloperData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputGenderChange = (value)=>{
    genderChange('gender',value)
  }
  const inputCityChange = (value)=>{
    genderChange('city', value)
  }

  const submitData = () => {
    console.log(editBusinessDeveloperData);
    const token = localStorage.getItem("adminToken") ||
      localStorage.getItem("stateHandlerToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      id: myID,
      fname:editBusinessDeveloperData.fname,
      lname:editBusinessDeveloperData.lname,
      email:editBusinessDeveloperData.email,
      phone:editBusinessDeveloperData.phone,
      gender:editBusinessDeveloperData.gender,
      buisnessCity:editBusinessDeveloperData.city
    }
    axios.put(`${apiurl}`+"/admin/update-business-developer", data, config)
    .then((res)=>{
      message.success(res.data.message)
      fetchBussinesDeveloperDataApi();
      setCloseEditModalPopup(false)
    })
    .catch((err)=>{
      message.error(err.response.data.message)
    })

  }

  const callApiToFetchDocument = () =>{
    const token = localStorage.getItem("adminToken") || localStorage.getItem("stateHandlerToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data={
      id:myID
    }
    axios.post(`${apiurl}`+"/admin/get-one-business-developer-details", data, config)
    .then((res)=>{
      console.log(res.data)
      setAadharCard({placeholder:res.data.data.adharCard})
      setPanCard({placeholder:res.data.data.panCard})
    })
    .catch((err)=>{
      message.error(err.response.data.message)
    })

  };
  const handleImageChange = (e) => {
    e.preventDefault();
    document.getElementById('adhar-image').click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAadharCard({
            placeholder: reader.result,
            file: selectedFile
          });
          setUploadButton(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  };
  const handleImageChangePan = (e) => {
    e.preventDefault();
    document.getElementById('pan-image').click();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPanCard({
            placeholder: reader.result,
            file: selectedFile
          });
          setUploadButtonPan(false);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        message.error("Invalid File !!");
      }
    }
  }
  const uploadAadhar = () => {
    console.log(aadharCard.file)
    const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken")
    ||  localStorage.getItem("franchiseToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const data = new FormData();
    data.append('id', myID);
    data.append('adharCard', aadharCard.file);
    axios.put(`${apiurl}`+"/admin/update-adhar-card-business-developer", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButton(true);

      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }
  
  const uploadPan = () => {
    console.log(panCard.file)
    const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const data = new FormData();
    data.append('id', myID);
    data.append('panCard', panCard.file);
    axios.put(`${apiurl}`+"/admin/update-pan-card-business-developer", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButtonPan(true);

      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  const callApiToVerifyBD = (bdVerify) =>{
    Modal.confirm({
      title: "Verify Business Developer",
      content: `Are you sure you want to  verify Business Developer?`,
      onOk() {
        const token = localStorage.getItem("adminToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const data = {
          id: myID,
          isVerify: bdVerify,
        };
        axios
          .post(`${apiurl}` + "/admin/verify-business-developer", data, config)
          .then((res) => {
            message.success(res.data.message);
            fetchBussinesDeveloperDataApi();
          })
          .catch((err) => {
            message.warning("Something went wrong!");
          });
      },
      onCancel() {
        console.log("verify cancelled");
      },
    });
  }

  return (
    <>
      <BusinessDeveloperRegister
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>Business Developer</p>
            <Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add Business Developer
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
            <Table
              dataSource={bussinessData}
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
      {/* edit business developer data */}
      <Modal
        title="Edit Details"
        open={closeEditModalPopup}
        onOk={submitData}
        onCancel={closeEditModal}
      >
        <Form.Item label="Fname:">
          <Input placeholder="First name.." name="fname" onChange={inputChangeValue} type="text" value={editBusinessDeveloperData.fname} />
        </Form.Item>
        <Form.Item label="Lname:">
          <Input placeholder="Last name" name="lname" onChange={inputChangeValue}  type="text" value={editBusinessDeveloperData.lname} />
        </Form.Item>
        <Form.Item label="Email:">
          <Input placeholder="Email" name="email" onChange={inputChangeValue}  type="email" value={editBusinessDeveloperData.email} />
        </Form.Item>
        <Form.Item label="Phone:">
          <Input placeholder="Phone" name="phone" onChange={inputChangeValue}  type="text" value={editBusinessDeveloperData.phone} />
        </Form.Item>
        <Form.Item label="Gender">
          <Select
            value={editBusinessDeveloperData.gender}
            style={{ width: 120 }}
            onChange={inputGenderChange}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="City">
          <Select style={{ width: 200 }}
          value={editBusinessDeveloperData.city}
            placeholder="Select city"
            onChange={inputCityChange}
          >
            {franchiseCity.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
      {/* view modal */}
      <Modal
        title="View Documents"
        open={openViewModal}
        onOk={closeViewModal}
        onCancel={closeViewModal}
      >
         <input
              id="adhar-image"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <div className="d-flex">
              <label htmlFor="adhar-image">
                <img src={aadharCard.placeholder} height={200} width={300} alt="Selected Image"
                  style={{ cursor: 'pointer' }} />
              </label>
              <Button disabled={uploadButton} onClick={uploadAadhar}>Upload</Button>
            </div>
        <hr/>
        
        <input
              id="pan-image"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChangePan}
            />
            <div className="d-flex">
              <label htmlFor="pan-image">
                <img src={panCard.placeholder} height={200} width={300} alt="Selected Image"
                  style={{ cursor: 'pointer' }} />
              </label>
              <Button disabled={uploadButtonPan} onClick={uploadPan}>Upload</Button>
            </div>
      </Modal>
    </>
  );
};

export default BusinessDeveloper;
