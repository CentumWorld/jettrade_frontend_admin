import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button, Table, message } from "antd";
import StateRegister from "./Register/StateRegister";
import axios from "axios";
import { Menu, Dropdown, Modal } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs';
import baseUrl from "../../../baseUrl";

const apiurl = baseUrl.apiUrl

const State = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [isBlocked, setIsBlock] = useState(true);
  const [isDeleted, setIsDeleted] = useState(true);
  const [myID, setMyID] = useState('');
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)

  useEffect(() => {
    fetchStateDataApi();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const fetchStateDataApi = () => {
    const token = localStorage.getItem("adminToken");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${apiurl}`+"/admin/fetch-all-state", config)
      .then((res) => {
        console.log("State response -> ", res.data);
        setStateData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

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
      title: "stateHandler Id",
      dataIndex: "stateHandlerId",
      key: "stateHandlerId",
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
      title: "Refferal Id",
      dataIndex: "referralId",
      key: "referralId",
    },
    {
      title: "Wallet",
      dataIndex: "stateHandlerWallet",
      key: "stateHandlerWallet",
    },
    {
      title: "State",
      dataIndex: "selectedState",
      key: "selectedState",
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
          <BsThreeDotsVertical size={24} onClick={() => trigerAction(record._id, record.isBlocked, record.isDeleted)} style={{ cursor: 'pointer' }} />
        </Dropdown>
      ),

    }
  ];

  // handle action
  const trigerAction = (id, block,stateDelete) => {
    setMyID(id);
    setIsBlock(block);
    setIsDeleted(stateDelete)
  }
  const handleMenuClick = (e) => {
    console.log(e.key);
   
    if (e.key === 'block') {
      blockUnblock(myID);
    }else if(e.key === 'delete'){
      deleteAndRecoverState(myID)
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
      <Menu.Item key="delete">{isDeleted ? 'Recover' : 'Delete'}</Menu.Item>
    </Menu>
  );

  const blockUnblock = (id) =>{
    const actionText = isBlocked ? 'Unblock' : 'Block'
        Modal.confirm({
            title: `${actionText} State handler`,
            content: `Are you sure you want to  ${actionText.toLowerCase()} this member?`,
            onOk() {
                const token = localStorage.getItem('adminToken')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = {
                    id: id,
                    block: !isBlocked
                }
                axios.post(`${apiurl}`+"/admin/block-state-by-admin", data, config)
                    .then((res) => {
                        message.success(res.data.message)
                        fetchStateDataApi();
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

  const deleteAndRecoverState = (id) =>{
    const actionText = isDeleted ? 'Recover' : 'Delete'
        Modal.confirm({
            title: `${actionText} State handler`,
            content: `Are you sure you want to  ${actionText.toLowerCase()} this state?`,
            onOk() {
                const token = localStorage.getItem('adminToken')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = {
                    id: id,
                    delete: !isDeleted
                }
                axios.post(`${apiurl}`+"/admin/delete-state", data, config)
                    .then((res) => {
                        message.success(res.data.message)
                        fetchStateDataApi();
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
  
  return (
    <>
      <StateRegister isModalVisible={isModalVisible} closeModal={closeModal} />
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>State</p>
            <Button type="primary" onClick={showModal}>
              <AiFillPlusCircle /> &nbsp;&nbsp;Add State
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Table
            dataSource={stateData}
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
    </>
  );
};

export default State;
