import React, { useState, useEffect } from 'react'
import '../../Admin/css/Refferal.css';
import { Table, Button, Modal, Menu, Dropdown, Row, Col, Input, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import aadharImage from '../../../img/aadhar.jpg';
import aadharBackImage from '../../../img/Aadhaar-back.jpg'
import panImage from '../../../img/pan.jpg';
import { BsThreeDotsVertical } from 'react-icons/bs';

const { Option } = Select;
const { Search } = Input;

const Refferal = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [refferalData, setRefferalData] = useState([]);
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

    const buttonStyle = {
        marginRight: '5px',
        marginBottom: '5px',
    };

    // edit user details -----------
    const [userType, setUserType] = useState('');
    const [isModalVisible, setIsEditModalVisible] = useState(false);
    const [editUserData, setEditUserData] = useState({
        fname: '',
        lname: '',
        phone: '',
        gender: '',
        address: '',
        aadhar: '',
        pan: '',
        Id_No:'',
        dob: null,
    });
    //isBlock
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [isBlocked, setIsBlock] = useState(true);

    // edit modal
    const editModal = () => {
        setIsEditModalVisible(true);
    };


    const handleUserModalEditCancel = () => {
        setIsEditModalVisible(false);
    };

    //   --------------

    // search bar -------------

    const handleSearch = (value) => {
        setSearchText(value);
        // Perform search or other operations based on the search text
        console.log('Performing search for:', value);
    };
    // -------------

    const columns = [
        { title: 'Member ID', dataIndex: 'memberid', key: 'memberid' },
        { title: 'First Name', dataIndex: 'fname', key: 'fname' },
        { title: 'Last Name', dataIndex: 'lname', key: 'lname' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Refferal', dataIndex: 'refferal_id', key: 'refferal_id' },
        {
            title: 'Status', dataIndex: 'isBlocked', render: (isBlocked) => {
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
                    </Button > &nbsp;
                    <Button type="primary" onClick={() => handleViewClick(record._id)}
                        style={buttonStyle}
                    >
                        View
                    </Button > */}
                    <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                        <BsThreeDotsVertical size={24} onClick={() => trigerAction(record._id, record.isBlocked)} style={{ cursor: 'pointer' }} />
                    </Dropdown>

                    {/* <Button type="primary" onClick={showModal}>
                        Open Dialog
                    </Button> */}
                </>
            ),

        }
        // ...more columns
    ];

    // handle action
    const trigerAction = (id, block) => {
        setMyID(id);
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
        if (e.key === 'block') {
            blockUnblock(myID);
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
        </Menu>
    );

    //   ------------------------------

    //call refferal details from api
    useEffect(() => {
        callApiRefferalDetails();
        // fetchUserDetailsForEdit();
    }, [])

    //Handle varify click
    const handleVerifyClick = (id) => {
        console.log(id);
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
        axios.post('/admin/verify-member', data, config)
            .then((res) => {
                message.success('Verify Successfully');
                callApiRefferalDetails();

            }).catch((error) => {

                message.warning('Not verified!')
            })
    }

    //hadle view click
    const handleViewClick = (id) => {
        const token = localStorage.getItem('adminToken');
        console.log(id);
        let data = {
            _id: id
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            },
        };

        axios.post('/admin/fetch-particular-member-details', data, config)
            .then((res) => {
                console.log(res.data.result._id)

                setAadhar(res.data.result.aadhar);
                setPan(res.data.result.pan);
                fetchMemberDocuments(res.data.result._id);

            }).catch((error) => {

                message.warning('Somthing went wrong!')
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

    const fetchMemberDocuments = (id) => {
        console.log(id, '131');
        let token = localStorage.getItem('adminToken');
        let data = {
            _id: id,
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            },
        };

        axios.post('/admin/fetch-particular-member-details', data, config)
            .then((res) => {

                console.log(res.data.result.length)
                // if (res.data.result.length > 0) {
                setLoading(true)
                setAadharFrontImage({ placeholder: res.data.result.aadhar_front_side });
                setAadharBackImage({ placeholder: res.data.result.aadhar_back_side });
                setPanImage({ placeholder: res.data.result.pan_card })
                // } else {
                //     setAadharFrontImage({ placeholder: aadharImage });
                //     setAadharBackImage({ placeholder: aadharBackImage });
                //     setPanImage({ placeholder: panImage });
                //     setLoading(false)
                // }

            })
            .catch((err) => {
                console.log(err)
            })
    }


    const callApiRefferalDetails = async () => {
        const token = localStorage.getItem('adminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
            },
        };
        try {
            const response = await axios.get('/admin/fetch-member-details', config);
            setRefferalData(response.data.result);
            console.log(response);
            //setLength(response.data.result.length);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
        axios.post('/admin/fetch-particular-member-details', data, config)
            .then((result) => {
                setUserType(result.data.result.userType);
                console.log(result.data.result);
                const dateTimeString = result.data.result.dob;
                const date = new Date(dateTimeString);
                const formattedDate = date.toLocaleDateString();
                const parts = formattedDate.split("/");
                const newDateFormat = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
                console.log(newDateFormat)
                console.log(result.data.result.userType);
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
        setEditUserData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleGenderChange = (value) => {
        setEditUserData((prevFormData) => ({
            ...prevFormData,
            gender: value,
        }));

    };

    const handleDobChange = (e) => {
        // setEditUserData((prevFormData) => ({
        //     ...prevFormData,
        //     dob: date,
        // }));
        setEditUserData({ ...editUserData, dob: e.target.value })
    };
    // save edit value
    const editModalSubmit = (e) => {
        console.log(myID)
        e.preventDefault()
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
            const token = localStorage.getItem('adminToken')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
                }
            }
            axios.post('/admin/member-details-edit-admin', data, config)
                .then((res) => {
                    message.success('Updated Successfully');
                    setIsEditModalVisible(false);
                    callApiRefferalDetails();
    
                })
                .catch((err) => {
                    message.warning('Something went wrong!')
                })
        }
        if(userType === 'otherCountry'){
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
            const token = localStorage.getItem('adminToken')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
                }
            }
            axios.post('/admin/member-details-edit-admin', data, config)
                .then((res) => {
                    message.success('Updated Successfully');
                    setIsEditModalVisible(false);
                    callApiRefferalDetails();
    
                })
                .catch((err) => {
                    message.warning('Something went wrong!')
                })
        }
       

    }


    // --------------
    //block  or unblock

    const blockUnblock = (id) => {
        const actionText = isBlocked ? 'Unblock' : 'Block'
        Modal.confirm({
            title: `${actionText} Member`,
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
                axios.post('/admin/block-member', data, config)
                    .then((res) => {
                        message.success(res.data.message)
                        callApiRefferalDetails();
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

    // ---------------

    //serch text
    const searchUser = (value) => {
        setSearchText(value);


        const searchNumber = Number(value); // Convert search value to a Number

        const filteredData = refferalData.filter((record) => {
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


    return (
        <>

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



            <div className='refferral-dashboard'>
                <div className='refferal-dashboard-card'>
                    <div className='refferal-profile-verification-heading'>
                        <h5 style={{ fontFamily: 'Calibri' }}>Refferal Profile Details</h5>
                    </div>

                    <div >
                    <Search
                        placeholder="Enter search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={searchUser}
                        
                      
                    /></div>
                    <div className='user-table'>
                        <Table
                            dataSource={refferalData}
                            columns={columns}
                            scroll={{ x: true }}
                            pagination={{ pageSize: 7 }}
                        />
                    </div>
                </div>
            </div>

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
                                    <Input value={editUserData.phone} name='phone' onChange={editInputChange} placeholder="Enter Phone" />
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
                                    <Input value={editUserData.pan} name='pan' onChange={editInputChange} placeholder="Enter pan no" />
                                </Col>
                            </Row>
                        </div>
                        </> :
                        
                        <div>
                            <Row style={{ marginBottom: '5px' }}>
                                <Col span={12}>
                                    ID No. :
                                </Col>
                                <Col span={12}>
                                    <Input value={editUserData.Id_No} name='Id_No' onChange={editInputChange} placeholder="Enter ID No" />
                                </Col>
                            </Row>
                        </div>  
                        
                        }
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

export default Refferal