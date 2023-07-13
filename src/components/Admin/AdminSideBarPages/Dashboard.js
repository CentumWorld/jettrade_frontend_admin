import React, { useState, useEffect } from 'react'
import '../css/Dashboard.css'
import { Table, Button, Modal, Menu, Dropdown, Row, Col, Input, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import aadharImage from '../../../img/aadhar.jpg';
import aadharBackImage from '../../../img/Aadhaar-back.jpg'
import panImage from '../../../img/pan.jpg';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Search } = Input;

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [length, setLength] = useState(null);
    const [visible, setVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [aadhar, setAadhar] = useState('');
    const [pan, setPan] = useState('');
    const [myID, setMyID] = useState('');
    const [aadharFrontImage, setAadharFrontImage] = useState({
        placeholder: aadharImage,
        file: null
    });
    const [aadharBackImageSide, setAadharBackImage] = useState({
        placeholder: aadharBackImage,
        file: null
    });
    const [panImageSide, setPanImage] = useState({
        placeholder: panImage,
        file: null
    });
    // edit user details -----------
    const [isModalVisible, setIsEditModalVisible] = useState(false);
    const [editUserData, setEditUserData] = useState({
        fname: '',
        lname: '',
        phone: '',
        gender: '',
        address: '',
        aadhar: '',
        pan: '',
        Id_No: '',
        dob: null,
    });
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [userStatus, setUserStatus] = useState(false);
    const [userType, setUserType] = useState('');

    //isBlock
    const [isBlocked, setIsBlock] = useState(true);

    // search bar -------------

    const handleSearch = (value) => {
        setSearchText(value);
        // Perform search or other operations based on the search text
        console.log('Performing search for:', value);
    };
    // -------------

    // edit modal
    const editModal = () => {
        setIsEditModalVisible(true);
    };


    const handleUserModalEditCancel = () => {
        setIsEditModalVisible(false);
    };

    //   --------------

    useEffect(() => {
        fetchData();
        //fetchUserDetailsForEdit();

    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/admin/fetch-user-details');

            setData(response.data.result);
            //console.log(typeof(response.data.result[0].phone));
            setFilteredDataSource(response.data.result);
            setLength(response.data.result.length);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // console.log(data);
    const handleVerifyClick = (id) => {
        const token = localStorage.getItem('adminToken');
        let data = {
            id: id,
            status: true
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            },
        };
        axios.post('/admin/verify-user', data, config)
            .then((res) => {
                toast.success('User Verify Successfully', {
                    autoClose: 2000,
                    theme: "dark"
                })
                fetchData();

            }).catch((error) => {

                toast.warning('Not verified!')
            })

    };
    const handleViewClick = (id) => {
        const token = localStorage.getItem('adminToken')
        let data = {
            _id: id
        }
        console.log(id);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            },
        };

        axios.post('/admin/fetch-particular-user-details', data, config)
            .then((res) => {
                console.log(res.data)
                setAadhar(res.data.result.aadhar);
                setPan(res.data.result.pan);
                fetchUserDocuments(res.data.result.userid);

            }).catch((error) => {

                toast.warning('Somthing went wrong!')
            })

        setVisible(true);

    }
    const handleImageError = () => {
        setImageError(true);
    };

    const handleCancel = () => {
        setVisible(false);
        // Perform any action needed when the user clicks Cancel or closes the dialog
    };

    const buttonStyle = {
        marginRight: '5px',
        marginBottom: '5px',
    };

    const columns = [
        { title: 'User ID', dataIndex: 'userid', key: 'userid' },
        { title: 'First Name', dataIndex: 'fname', key: 'fname' },
        { title: 'Last Name', dataIndex: 'lname', key: 'lname' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Reffered ID', dataIndex: 'reffered_id', key: 'reffered_id' },
        {
            title: 'Status', dataIndex: 'status', render: (status) => {
                const cellStyle = status ? { color: 'green' } : { color: 'red' };
                return <span style={cellStyle}>{status ? 'Verified' : 'Not Verified'}</span>;
            },
        },
        {
            title: 'Block/Not Block', dataIndex: 'isBlocked', render: (isBlocked) => {
                const cellStyle = isBlocked ? { color: 'red' } : { color: 'green' };
                return <span style={cellStyle}>{isBlocked ? 'Blocked' : 'Not Blocked '}</span>;
            },
        },
        {
            title: 'Action', dataIndex: 'action',
            render: (_, record) => (

                <>
                    {/* <Button onClick={() => handleVerifyClick(record._id)} disabled={record.status}
                        style={buttonStyle}
                    >
                        Verify
                    </Button >*/}
                    {/* <Button type="primary" onClick={() => handleViewClick(record._id)}
                        style={buttonStyle}
                    >
                        View
                    </Button >  */}
                    <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                        <BsThreeDotsVertical size={24} onClick={() => trigerAction(record._id, record.status, record.isBlocked)} style={{ cursor: 'pointer' }} />
                    </Dropdown>

                </>
            ),

        }
    ];

    // handle action
    const trigerAction = (id, status, block) => {
        setMyID(id, block);
        setUserStatus(status);
        setIsBlock(block);
    }
    const handleMenuClick = (e) => {
        console.log(e.key);
        if (e.key === 'verify') {

            handleVerifyClick(myID)
        }
        if (e.key === 'view') {

            handleViewClick(myID)
        }
        if (e.key === 'edit') {
            editModal()
            fetchUserDetailsForEdit(myID)
            console.log(myID)
        }
        // if (e.key === 'delete') {
        //     confirmDelete(myID);
        // }
        if (e.key === 'block') {
            blockUnblock(myID);
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="verify" disabled={userStatus}>Verify</Menu.Item>
            <Menu.Item key="view">View</Menu.Item>
            <Menu.Item key="edit">Edit</Menu.Item>
            <Menu.Item key="block">
                {isBlocked ? 'Unblock' : 'Block'}
            </Menu.Item>
        </Menu>
    );

    //   ------------------------------
    const fetchUserDocuments = (userid) => {
        //console.log(userid,'131');
        let token = localStorage.getItem('adminToken');
        let data = {
            userid: userid,
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            },
        };

        axios.post('/admin/fetch-user-document-adminside', data, config)
            .then((res) => {

                //console.log(res.data.result)
                if (res.data.result.length > 0) {
                    setLoading(true)
                    setAadharFrontImage({ placeholder: res.data.result[0].aadhar_front_side });
                    setAadharBackImage({ placeholder: res.data.result[0].aadhar_back_side });
                    setPanImage({ placeholder: res.data.result[0].pan_card })
                } else {
                    setAadharFrontImage({ placeholder: aadharImage });
                    setAadharBackImage({ placeholder: aadharBackImage });
                    setPanImage({ placeholder: panImage });
                    setLoading(false)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    //    image download-----

    const downloadAadharFrontImage = (frontImage) => {

        const link = document.createElement('a');
        link.href = frontImage;
        link.download = 'image.jpg';
        link.click();
    };

    //downloadAadharBackImage
    const downloadAadharBackImage = (backImage) => {

        const link = document.createElement('a');
        link.href = backImage;
        link.download = 'image.jpg';
        link.click();
    };
    const downloadPanImage = (panImage) => {

        const link = document.createElement('a');
        link.href = panImage;
        link.download = 'image.jpg';
        link.click();

    };
    //   --------

    //--------- user details Edit section

    const fetchUserDetailsForEdit = (id) => {
        const token = localStorage.getItem('adminToken')
        let data = {
            _id: id,

        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            }
        }
        axios.post('/admin/fetch-particular-user-details', data, config)
            .then((result) => {
                console.log(result.data.result,'327');
                setUserType(result.data.result.userType);
                const dateTimeString = result.data.result.dob;
                const date = new Date(dateTimeString);
                const formattedDate = date.toLocaleDateString();
                const parts = formattedDate.split("/");
                const newDateFormat = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
                console.log(result.data.result.userType)
                if(result.data.result.userType === 'indian'){
                    setEditUserData(
                        {
                            fname: result.data.result.fname,
                            lname: result.data.result.lname,
                            phone: result.data.result.phone,
                            address: result.data.result.address,
                            dob: newDateFormat,
                            aadhar: result.data.result.aadhar,
                            pan: result.data.result.pan,
                            gender: result.data.result.gender,
    
                        })
                }
                if(result.data.result.userType === 'otherCountry'){
                    setEditUserData(
                        {
                            fname: result.data.result.fname,
                            lname: result.data.result.lname,
                            phone: result.data.result.phone,
                            address: result.data.result.address,
                            dob: newDateFormat,
                            Id_No:result.data.result.Id_No,
                            gender: result.data.result.gender,
    
                        })
                }
                

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData((editUserData) => ({
            ...editUserData,
            [name]: value,
        }));
    };

    const handleGenderChange = (value) => {
        setEditUserData((editUserData) => ({
            ...editUserData,
            gender: value,
        }));
    };

    const handleDobChange = (e) => {
        // setEditUserData((editUserData) => ({
        //     ...editUserData,
        //     dob: date,
        // }));]
        console.log(e.target.value)
        setEditUserData({ ...editUserData, dob: e.target.value })
    };
    // save edit value
    const editModalSubmit = (e) => {
        e.preventDefault()
        console.log(myID,userType);
        if(userType === 'indian'){
            const data = {
                userWhat:'indian',
                id: myID,
                fname: editUserData.fname,
                lname: editUserData.lname,
                phone: editUserData.phone,
                address: editUserData.address,
                dob: editUserData.dob,
                aadhar: editUserData.aadhar,
                pan: editUserData.pan,
                gender: editUserData.gender,
            };
            console.log(data);
            const token = localStorage.getItem('adminToken')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
                }
            }
            axios.post('/admin/user-details-edit-admin', data, config)
                .then((res) => {
                    message.success('Updated Successfully');
                    setIsEditModalVisible(false);
                    fetchData();
                })
                .catch((err) => {
                    message.warning('Something went wrong!')
                })
        }if(userType === 'otherCountry'){
            const data = {
                userWhat:'otherCountry',
                id: myID,
                fname: editUserData.fname,
                lname: editUserData.lname,
                phone: editUserData.phone,
                address: editUserData.address,
                dob: editUserData.dob,
                Id_No:editUserData.Id_No,
                gender: editUserData.gender,
            };
            console.log(data);
            const token = localStorage.getItem('adminToken')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
                }
            }
            axios.post('/admin/user-details-edit-admin', data, config)
                .then((res) => {
                    message.success('Updated Successfully');
                    setIsEditModalVisible(false);
                    fetchData();
                })
                .catch((err) => {
                    message.warning('Something went wrong!')
                })
        }
       

    }

    // --------------
    // delete user
    const confirmDelete = (id) => {
        Modal.confirm({
            title: 'Delete Record',
            content: 'Are you sure you want to delete this record?',
            onOk() {

                deleteUser(id)
            },
            onCancel() {

                console.log('Deletion cancelled.');
            },
        });

    }
    const deleteUser = (id) => {
        const token = localStorage.getItem('adminToken')
        const data = {
            id: id
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            }
        }
        axios.post('/admin/delete-user-admin', data, config)
            .then((res) => {
                fetchData();
                message.success('Deleted Successfully');
            })
            .catch((err) => {
                console.log(err)
            })
    }


    //block  or unblock

    const blockUnblock = (id) => {
        const actionText = isBlocked ? 'Unblock' : 'Block'
        Modal.confirm({
            title: `${actionText} User`,
            content: `Are you sure you want to  ${actionText.toLowerCase()} this User?`,
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
                axios.post('/admin/block-user', data, config)
                    .then((res) => {
                        message.success(res.data.message)
                        fetchData();
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

    //serch text
    const searchUser = (value) => {
        setSearchText(value);


        const searchNumber = Number(value); // Convert search value to a Number

        const filteredData = data.filter((record) => {
            // Search by number field
            if (record.phone === searchNumber) { // Replace "numberField" with your actual field name
                return true;
            }

            // Search by other fields
            return Object.values(record).some((recordValue) => {
                if (typeof recordValue === 'string') {
                    const lowercaseRecordValue = recordValue.toLowerCase();
                    return lowercaseRecordValue.includes(value.toLowerCase());
                }
                return false;
            });
        });

        setFilteredDataSource(filteredData);
    };

    // ---------------


    const activeStyle = {
        backgroundColor: '#333333',
        color: '#ffffff',
    };
    const home =()=>{
        navigate('/admindashboard/dashboard')
    }

    return (
        <>
            <div>
                <Button type='primary' onClick={home}>Home</Button>
            </div>
            <Modal className='document_verification'
                title="Documents Verification"
                open={visible}
                onCancel={handleCancel}
                footer={null}

            >
                <>
                    <div>
                        <h6>Aadhar Front Side</h6>
                        <p>Aadhar Number:  <span style={{ fontWeight: 'bold' }}>{aadhar}</span></p>
                        {!imageError ? (
                            <img src={aadharFrontImage.placeholder} width={200} height={100} alt="" onError={handleImageError} />
                        ) : (
                            <p>Error loading image.</p>
                        )}
                        <Button className='aadhar-front' disabled={!loading} type="primary" onClick={() => downloadAadharFrontImage(aadharFrontImage.placeholder)}>
                            Download
                        </Button>
                    </div>
                    <hr />
                    <div>
                        <h6>Aadhar Back Side</h6>
                        {/* <p>Aadhar Number:  <span style={{ fontWeight: 'bold' }}>{aadhar}</span></p> */}
                        {!imageError ? (
                            <img src={aadharBackImageSide.placeholder} width={200} height={100} alt="" onError={handleImageError} />
                        ) : (
                            <p>Error loading image.</p>
                        )}
                        <Button className='aadhar-front' disabled={!loading} type="primary" onClick={() => downloadAadharBackImage(aadharBackImageSide.placeholder)}>
                            Download
                        </Button>

                    </div>
                    <hr />
                    <div>
                        <h6>PAN</h6>
                        <p>PAN Number: <span style={{ fontWeight: 'bold' }}>{pan}</span> </p>
                        <img src={panImageSide.placeholder} width={200} height={100} alt="" />
                        <Button className='aadhar-front' disabled={!loading} type="primary" onClick={() => downloadPanImage(panImageSide.placeholder)}>
                            Download
                        </Button>
                    </div>
                </>
            </Modal>
            <div className='admin-dashboard'>
                <div className='admin-dashboard-card'>
                    <div className='profile-verification-heading'>
                        <h5 style={{ fontFamily: 'Calibri' }}>User Profile Details</h5>

                        <NavLink
                            className='create-user'
                            to="/admindashboard/createuser"
                            exact
                            activeClassName="active"
                            // style={navLinkStyle}
                            activeStyle={activeStyle}
                        >
                            + Crate User
                        </NavLink>
                    </div>
                    <Search
                        placeholder="Enter search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={searchUser}
                    />
                    <div className='user-table'>
                        <Table
                            dataSource={filteredDataSource}
                            // dataSource={data}
                            columns={columns}
                            scroll={{ x: true }}
                            pagination={{ pageSize: 7 }}

                        />
                    </div>
                </div>
            </div>
            <ToastContainer />

            {/* modal */}
            <div>
                <Modal

                    title={<span style={{ color: '#5e72e4', fontFamily: 'Calibri' }}>EDIT INFORMATION</span>}
                    open={isModalVisible}
                    onCancel={handleUserModalEditCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={editModalSubmit}>
                            Submit
                        </Button>,
                    ]}
                //footer={null}
                >
                    <div className='edit-container'>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    First Name :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.fname} name='fname' onChange={editInputChange} placeholder="Enter first name" />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Last Name :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.lname} name='lname' onChange={editInputChange} placeholder="Enter last name" />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Phone:
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.phone} name='phone' onChange={editInputChange} placeholder="Enter phone no" />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Address :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.address} name='address' onChange={editInputChange} placeholder="Enter address" />
                                </Col>
                            </Row>
                        </div>
                        {userType === 'indian'?
                        <>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Aadhar No. :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.aadhar} name='aadhar' onChange={editInputChange} placeholder="Enter aadhar no" />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Pan No. :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.pan} name='pan' onChange={editInputChange} placeholder="Enter Pan no" />
                                </Col>
                            </Row>
                        </div>
                        </>:
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    ID NO. :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.Id_No} name='Id_No' onChange={editInputChange} placeholder="Enter ID No.." />
                                </Col>
                            </Row>
                        </div>}


                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Gender :
                                </Col>
                                <Col span={12}>
                                    <Select
                                        name="gender"
                                        value={editUserData.gender}
                                        onChange={handleGenderChange}
                                        placeholder="Gender"
                                    >
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Col>
                            </Row>

                        </div>
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    Date of Birth :
                                </Col>
                                <Col span={12}>
                                    {/* <DatePicker
                                        name="dob"
                                         value={editUserData.dob ? moment(editUserData.dob) : null}

                                        onChange={handleDobChange}
                                    /> */}
                                    <input type="date" name='dob' value={editUserData.dob} onChange={handleDobChange} />
                                </Col>
                            </Row>
                        </div>

                    </div>

                </Modal>
            </div>
        </>
    )
}

export default Dashboard