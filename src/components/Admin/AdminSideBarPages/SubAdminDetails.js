import React, { useEffect, useState } from 'react';
import "../css/NewRenewal.css";
import { Menu,Modal,Tabs, Table, Input, Button, message,Dropdown } from "antd";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import baseUrl from '../../../baseUrl';

const apiurl = baseUrl.apiUrl


const { TabPane } = Tabs;
const SubAdminDetails = () => {
    const navigate = useNavigate()
    const [subAdminData, setSubAdminData] = useState([]);
    const [isBlocked, setIsBlock] = useState(true);
    const [userStatus, setUserStatus] = useState(false);
    const [myID, setMyID] = useState("");
    const [userId, setUserID] = useState("");
    useEffect(() => {
        callApiFetchSubAdminData()
    }, [])

    const token = localStorage.getItem('adminToken');

    const callApiFetchSubAdminData = () => {
        
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.get(`${apiurl}`+'/admin/fetch-all-sub-admin-details', config)
            .then((res) => {
                console.log("subadmin response -> ", res.data);
                setSubAdminData(res.data.data);
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    const createSubAdmin = ()=> {
        navigate('/admindashboard/signup-sub-admin')
    }
    const columns = [
        {
            title: 'Fname',
            dataIndex: 'fname',
            key: 'fname',
        },
        {
            title: 'Lname',
            dataIndex: 'lname',
            key: 'lname',
        },
        {
            title: 'Sub-Admin ID',
            dataIndex: 'subAdminId',
            key: 'subAdminId',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: "Block Status",
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

    ];
    if (token) {
        columns.push({
          title: "Action",
          dataIndex: "action",
          render: (_, record) => (
            <>
              <Dropdown overlay={token ? menu :null} placement="bottomLeft" trigger={["click"]}>
                <BsThreeDotsVertical
                  size={24}
                  onClick={() =>
                    trigerAction(
                      record._id,
                      record.userid,
                      record.status,
                      record.isBlocked,
                      
                    )
                  }
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            </>
          ),
        })
      }

     

      const trigerAction = (id, userid, status, block, subadmin) => {
        setMyID(id, block);
        setUserStatus(status);
        setIsBlock(block);
        setUserID(userid);
        // setIsSubAdmin(subadmin)
      };

      const handleMenuClick = (e) => {
        console.log(e.key);
        // if (e.key === "edit") {
        //    editModal();
        //    fetchUserDetailsForEdit(myID);
        //   console.log(myID);
        // }
        if (e.key === "block") {
          blockUnblock(myID);
        }
      };


       //block  or unblock

  const blockUnblock = (id) => {
    const actionText = isBlocked ? "Unblock" : "Block";
    Modal.confirm({
      title: `${actionText} User`,
      content: `Are you sure you want to  ${actionText.toLowerCase()} this SubAdmin?`,
      onOk() {
        const token = localStorage.getItem("adminToken");
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
          .post(`${apiurl}` + "/admin/block-subAdmin-by-Admin", data, config)
          .then((res) => {
            message.success(res.data.message);
            callApiFetchSubAdminData()
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
  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item key="edit">Edit</Menu.Item> */}
      <Menu.Item key="block">{isBlocked ? "Unblock" : "Block"}</Menu.Item>
    </Menu>
  );

    return (
        <>
            <div className="new-renewal-container">
                <div className="new-renewal-header">
                    <div className="new-renewal-content">
                        <p>Sub-Admin</p>
                        <Button type="primary " onClick={createSubAdmin} ><AiFillPlusCircle /> &nbsp;&nbsp;Add sub-admin</Button>
                    </div>
                </div>

                <Table dataSource={subAdminData} columns={columns}
                    scroll={{ y: 320, x: true }} pagination={{ pageSize: 7 }} style={{
                        padding: '5px', textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                />


            </div>
        </>
    )
}

export default SubAdminDetails