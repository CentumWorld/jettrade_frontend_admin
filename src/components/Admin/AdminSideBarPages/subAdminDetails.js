import React, { useEffect, useState } from 'react';
import "../css/NewRenewal.css";
import { Menu, Tabs, Table, Input, Button, message } from "antd";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const SubAdminDetails = () => {

    const navigate = useNavigate()

    const [subAdminData, setSubAdminData] = useState([]);

    useEffect(() => {
        callApiFetchSubAdminData()
    }, [])


    const callApiFetchSubAdminData = () => {
        const token = localStorage.getItem('adminToken');
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        axios.get('/admin/fetch-all-sub-admin-details', config)
            .then((res) => {
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
            title: 'SubAdminId',
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


    ];

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