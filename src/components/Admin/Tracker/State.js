import React, { useEffect, useState } from 'react';
import '../css/NewRenewal.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Button, Table } from 'antd';
import StateRegister from './Register/StateRegister';
import axios from 'axios';

const State = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [stateData, setStateData] = useState([]);



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
        const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken");
        const stateHandlerRefferalID = localStorage.getItem('stateHandlerRefferalID');
    
        if (token) {
            const config = {
                headers: { "Authorization": `Bearer ${token}` }
            };
            axios.get('/admin/fetch-all-state', config)
                .then((res) => {
                    console.log("State response -> ", res.data);
                    setStateData(res.data.data);
                })
                .catch(err => {
                    console.log("error", err);
                });
        } else if (stateHandlerRefferalID) {
            const requestData = {
                stateReferralId: stateHandlerRefferalID
            }
            const config = {
                headers: { "Authorization": `Bearer ${token}` }
            };
            axios.post('/state/fetch-all-franchise-in-state', config, requestData)
                .then((res) => {
                    console.log("Franchise in state response -> ", res);
                })
                .catch(err => {
                    console.log("error", err);
                });
        } else {
            console.log("Neither adminToken nor stateHandlerRefferalID present.");
        }
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
            title: 'stateHandler Id',
            dataIndex: 'stateHandlerId',
            key: 'stateHandlerId',
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
            title: 'Refferal Id',
            dataIndex: 'referralId',
            key: 'referralId',
        },
        {
            title: 'Wallet',
            dataIndex: 'stateHandlerWallet',
            key: 'stateHandlerWallet',
        },
        {
            title: 'State',
            dataIndex: 'selectedState',
            key: 'selectedState',
        },
         
    ];
    return (
        <>
            <StateRegister  isModalVisible={isModalVisible} closeModal={closeModal} />
            <div className="new-renewal-container">
                <div className="new-renewal-header">
                    <div className="new-renewal-content">
                        <p>State</p>
                        <Button type="primary" onClick={showModal}>
                            <AiFillPlusCircle /> &nbsp;&nbsp;Add State
                        </Button>
                    </div>
                </div>
                <div
          style={{display: "flex", flexDirection: "column" }}
        >
          <Table
            dataSource={stateData}
            columns={columns}
            pagination={{ pageSize: 7 }}
            scroll={{x: true, y:true}}
            style={{
              flex: 1,
              overflow: "auto",
              maxWidth: "100%",
              marginTop: "1rem",
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          />
        </div>
            </div>
        </>
    );
};

export default State;
