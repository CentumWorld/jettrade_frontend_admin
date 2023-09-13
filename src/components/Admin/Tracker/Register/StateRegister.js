import React, { useState } from 'react';
import { Modal, Button, Input, Select, Checkbox, Dropdown, Menu, Table } from 'antd';
import allState from '../AllStateAndDistrict';
import axios from 'axios';
import { message,Spin } from 'antd';
import baseUrl from '../../../../baseUrl';

const apiurl = baseUrl.apiUrl

const { Option } = Select;

const StateRegister = (props) => {
    // const navigate = useNavigate();
    
    const [selectedStates, setSelectedStates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stateRegisterData, setStateRegisterData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        gender: "",
        state: '',
        stateRegisterId: "",
        password: "",
        referredId: "admin@123", // Add the new field here

    });
    const [aadharImage, setAadharImage] = useState({
        file: null,
    });
    const [panImage, setPanImage] = useState({
        file: null,
    });
    const [spin, setSpin] = useState(false);
    const handleCheckboxChange = (state) => {
        if (selectedStates.includes(state)) {
            setSelectedStates(selectedStates.filter(selected => selected !== state));
        } else {
            setSelectedStates([...selectedStates, state]);
        }
    };
    const stateRegiInputs = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        // Handle all fields except referredId
        if (name !== 'referredId') {
            setStateRegisterData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }
    

    //handle front aadhar image function
    const handleClickAadharFrontImage = (e) => {

        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setAadharImage({ file: e.target.files[0] })
        } else {
            message.error("Invalid File !! ");
            panImage.file = null;
        }
    }

    //hadle pan card image function
    const handleClickPanCardImage = (e) => {

        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setPanImage({ file: e.target.files[0] })
        } else {
            message.error("Invalid File !! ");
            panImage.file = null;
        }
    }


    const handleStateRegiSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(stateRegisterData, selectedStates,aadharImage.file);
        const formData = new FormData();
        formData.append("fname", stateRegisterData.fname);
        formData.append("lname", stateRegisterData.lname);
        formData.append("email", stateRegisterData.email);
        formData.append("phone", stateRegisterData.phone);
        formData.append("gender", stateRegisterData.gender);
        formData.append("password", stateRegisterData.password);
        formData.append("stateHandlerId", stateRegisterData.stateRegisterId);
        formData.append("adharCard", aadharImage.file);
        formData.append("panCard", panImage.file);
        formData.append("selectedState",selectedStates);
        formData.append("referredId", stateRegisterData.referredId);


        console.log(formData, "44");

            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the 'Authorization' header with the token
                }
            }
            axios.post(`${apiurl}`+"/admin/create_State_Handler",formData,config)
            .then((res)=>{
                message.success(res.data.message)
                setStateRegisterData({
                    fname: "",
                    lname: "",
                    email: "",
                    phone: "",
                    gender: "",
                    state: '',
                    stateRegisterId: "",
                    password: "",
                });
                setLoading(false);
                setSelectedStates([]);
                setAadharImage({ file: null });
                setPanImage({ file: null });


            })
            .catch(err=>{
                message.error(err.response.data.message);
            })

    };


    const menu = (
        <Menu>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {allState.states.map(state => (
                    <Menu.Item key={state.state}>
                        <Checkbox
                            onChange={() => handleCheckboxChange(state.state)}
                            checked={selectedStates.includes(state.state)}
                        >
                            {state.state}
                        </Checkbox>
                    </Menu.Item>
                ))}
            </div>
        </Menu>
    );

    



    return (
        <>  
            <div>
                <Modal
                    title="State Register"
                    open={props.isModalVisible}
                    onCancel={props.closeModal}
                    onOk={handleStateRegiSubmit}
                    okText={loading?<Spin/> : 'Submit'}
                >
                    <div className='form-container'>
                        <div className='state-field'>
                            <label>Referred ID</label>
                            <Input
                                placeholder='Referred ID'
                                name="referredId"
                                value={stateRegisterData.referredId}
                                onChange={stateRegiInputs}
                                disabled
                                style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: '1px solid #ccc',
                                }}                        
                                    />
                        </div>
                        <div className='state-field'>

                            <label>First Name</label>
                            <Input
                                placeholder='First Name'
                                name="fname"
                                value={stateRegisterData.fname}
                                onChange={stateRegiInputs}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Last Name</label>
                            <Input
                                placeholder='Last Name'
                                name="lname"
                                value={stateRegisterData.lname}
                                onChange={stateRegiInputs}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Email</label>
                            <Input
                                placeholder='Email'
                                name="email"
                                value={stateRegisterData.email}
                                onChange={stateRegiInputs}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Phone</label>
                            <Input
                                placeholder='Phone'
                                name="phone"
                                value={stateRegisterData.phone}
                                onChange={stateRegiInputs}
                            />
                        </div>
                      


                        <div className='d-flex justify-content-between'>
                            <div className='state-field'>
                                <label>Gender</label><br />
                                <Select placeholder="Select Gender"
                                    name="gender"
                                    value={stateRegisterData.gender}
                                    onChange={(value)=>
                                        setStateRegisterData((prevData)=>({
                                            ...prevData,
                                            gender:value
                                        }))
                                    }

                                    style={{ width: 150 }}>
                                    <Option value='Male'>Male</Option>
                                    <Option value='Female'>Female</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                            </div>
                            <div className='state-field'>
                                <label>State</label><br />
                                <Dropdown overlay={menu}
                                    name="state"
                                    value={stateRegisterData.state}
                                    onChange={stateRegiInputs}
                                    trigger={['click']}

                                >
                                    <Button>Select state</Button>
                                </Dropdown>
                                <div>
                                    <strong>Selected States:</strong>
                                    <ul>
                                        {selectedStates.map(state => (
                                            <li key={state}>{state}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='state-field'>
                            <label>Aadhar</label>
                            <Input type='file'
                                placeholder='Aadhar'
                                name="aadhar"
                                onChange={handleClickAadharFrontImage}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Pan </label>
                            <Input type='file'
                                placeholder='Pan'
                                name="pan"
                                onChange={handleClickPanCardImage}

                            />
                        </div>
                        <div className='state-field'>
                            <label> User ID</label>
                            <Input type='text'
                                placeholder='State Handler Id'
                                name="stateRegisterId"
                                value={stateRegisterData.stateRegisterId}
                                onChange={stateRegiInputs}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Password</label>
                            <Input type='password'
                                placeholder='Password'
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

export default StateRegister;
