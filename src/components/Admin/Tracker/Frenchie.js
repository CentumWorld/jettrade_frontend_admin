import React, { useEffect, useState, useRef } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table, Dropdown, Menu, Modal, message, Select, Form, Input, Checkbox } from "antd";
import FrenchieRegister from "./Register/FrenchieRegister";
import axios from "axios";
import { BsThreeDotsVertical } from 'react-icons/bs';
import aadharFront from '../../../img/aadhar.jpg';
import allState from "./AllStateAndDistrict";
import { DownOutlined } from "@ant-design/icons";
const { Option } = Select;

const Frenchie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [frenchieData, setFrenchieData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [myID, setMyID] = useState('');
  const [uploadButton, setUploadButton] = useState(true);
  const [uploadButtonPan, setUploadButtonPan] = useState(true);
  const [aadharCard, setAadharCard] = useState({
    placeholder: aadharFront,
    file: null
  })
  const [panCard, setPanCard] = useState({
    placeholder: "",
    file: null
  })
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFranchiseData, setFranchiseData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    gender: "",
    state: "",
    city: []
  })

  const closeEditModal = () => {
    setEditModalVisible(false)
  }
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

  const columns = [
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
      title: "Franchise Id",
      dataIndex: "frenchiseId",
      key: "frenchiseId",
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
      title: "Referal Id",
      dataIndex: "referralId",
      key: "referralId",
    },
    {
      title: "Reffered Id",
      dataIndex: "referredId",
      key: "referredId",
    },
    {
      title: "City",
      dataIndex: "franchiseCity",
      key: "franchiseCity",
    },
    {
      title: 'Status', dataIndex: 'isBlocked', render: (isBlocked) => {
        const cellStyle = isBlocked ? { color: 'red' } : { color: 'green' };
        return <span style={cellStyle}>{isBlocked ? 'Blocked' : 'Not Blocked '}</span>;
      },
    },
    {
      title: 'Action', dataIndex: 'action',
      render: (_, record) => (
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <BsThreeDotsVertical size={24} onClick={() => trigerAction(record._id, record.isBlocked)} style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),

    }

  ];

  const token = localStorage.getItem("adminToken");

  const stateToken = localStorage.getItem("stateHandlerToken");
  const stateHandlerRefferalID = localStorage.getItem(
    "stateHandlerRefferalID"
  );
  console.log("===============>", stateToken, stateHandlerRefferalID);

  const fetchFrenchieseDataApi = () => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get("/admin/fetch-all-frenchise", config)
        .then((res) => {
          console.log("Frenchese Data -> ", res.data);
          setFrenchieData(res.data.data);
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
        .post("/state/fetch-all-franchise-in-state", requestData, config)
        .then((res) => {
          console.log("Franchise in state response -----> ", res.data.data[0].adharCard);
          setFrenchieData(res.data.data)

        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };


  // handle action
  const trigerAction = (id, block) => {
    setMyID(id);
    setIsBlock(block);
  }
  const handleMenuClick = (e) => {
    console.log(e.key);

    if (e.key === 'block') {
      blockUnblock(myID);
    } else if (e.key === 'view') {
      setVisible(true)
      openViewModal(myID);
    } else if (e.key === 'edit') {
      setEditModalVisible(true);
      editFranchiseDataFunction(myID);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item key="verify">Verify</Menu.Item> */}
      <Menu.Item key="view">View</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="block">
        {isBlocked ? 'Unblock' : 'Block'}
      </Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );
  const blockUnblock = (id) => {
    const actionText = isBlocked ? 'Unblock' : 'Block'
    Modal.confirm({
      title: `${actionText} Franchise`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this member?`,
      onOk() {
        const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const data = {
          id: id,
          block: !isBlocked
        }
        axios.post("/admin/block-franchise-by-admin", data, config)
          .then((res) => {
            message.success(res.data.message)
            fetchFrenchieseDataApi();
          })
          .catch((err) => {
            message.warning('Something went wrong!')
          })
      },
      onCancel() {
        console.log('Deletion cancelled');
      },
    });
  }

  const openViewModal = (id) => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let data = {
      id: id
    }
    axios.post("/admin/get-one-franchise-details", data, config)
      .then((res) => {

        setAadharCard({ placeholder: res.data.data.adharCard })
        setPanCard({ placeholder: res.data.data.panCard })
      })
      .catch((err => {
        console.log(err.response.data.message)
      }))
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

  const uploadAadhar = () => {
    console.log(aadharCard.file)
    const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const data = new FormData();
    data.append('id', myID);
    data.append('adharCard', aadharCard.file);
    axios.put("/admin/update-adhar-card-franchise", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButton(true);

      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

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
    axios.put("/admin/update-pan-card-franchise", data, config)
      .then((res) => {
        message.success(res.data.message);
        setUploadButtonPan(true);

      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  const editFranchiseDataFunction = (id) => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let data = {
      id: id
    }
    axios.post("/admin/get-one-franchise-details", data, config)
      .then((res) => {
        console.log(res.data)
        setFranchiseData({
          fname: res.data.data.fname,
          lname: res.data.data.lname,
          phone: res.data.data.phone,
          email: res.data.data.email,
          gender: res.data.data.gender,
          state: res.data.data.franchiseState,
          city: []
        })
      })
      .catch((err => {
        console.log(err.response.data.messsage)
      }))
  }

  // const selectStateFromDeopDown = (value) => {
  //   setFranchiseData({ ...editFranchiseData, state: value })
  // }
  const selectStateFromDeopDown = (selectedState) => {
    const selectedStateData = allState.states.find(state => state.state === selectedState);
    if (selectedStateData) {
      setFranchiseData({
        ...editFranchiseData,
        state: selectedState,
        city: [], // Use districts as cities for the selected state
      });
    }
  };

  const handleCitySelectChange = (selectedCities) => {
    console.log("huuu")
    setFranchiseData({
      ...editFranchiseData,
      city: selectedCities,
    });

  };

  return (
    <>
      <FrenchieRegister
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>Frenchie</p>
            <Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add Frenchie
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {token || (stateToken && stateHandlerRefferalID) ?
            <Table
              dataSource={frenchieData}
              columns={columns}
              pagination={{ pageSize: 7 }}
              scroll={{ x: true, y: true }}
              style={{
                flex: 1,
                overflow: "auto",
                maxWidth: "100%",
                marginTop: "1rem",
              }}
            /> : null
          }
        </div>
      </div>


      {/* -----view modal ----- */}
      {
        visible ?
          <Modal
            title="View Document Details"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
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
            <hr />
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
          </Modal> : ""
      }
      {/* edit modal */}
      {
        editModalVisible ?
          <Modal
            title="Edit Details"
            open={editModalVisible}
            onOk={closeEditModal}
            onCancel={closeEditModal}
          >
            <Form.Item label="Fname:">
              <Input placeholder="First name.." type="text" value={editFranchiseData.fname} />
            </Form.Item>
            <Form.Item label="Lname:">
              <Input placeholder="Last name" type="text" value={editFranchiseData.lname} />
            </Form.Item>
            <Form.Item label="Email:">
              <Input placeholder="Email" type="email" value={editFranchiseData.email} />
            </Form.Item>
            <Form.Item label="Phone:">
              <Input placeholder="Phone" type="text" value={editFranchiseData.phone} />
            </Form.Item>
            <Form.Item label="Gender">
              <Select
                value={editFranchiseData.gender}
                style={{ width: 120 }}
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
                {allState.states.map(state => (
                  <Option key={state.state} value={state.state}>
                    {state.state}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="City">
              {editFranchiseData.state && (
                 <Select
                 mode="multiple"
                 style={{ width: 200 }}
                 value={editFranchiseData.city}
                 onChange={handleCitySelectChange}
               >
                 {allState.states
                   .find(state => state.state === editFranchiseData.state)
                   ?.districts.map(city => (
                     <Option key={city} value={city}>
                       {city}
                     </Option>
                   ))}
               </Select>
              )}
            </Form.Item>
          </Modal>
          : ""
      }
    </>
  );
};

export default Frenchie;

