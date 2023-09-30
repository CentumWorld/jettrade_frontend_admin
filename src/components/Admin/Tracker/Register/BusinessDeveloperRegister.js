import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, Checkbox, Dropdown, Menu } from 'antd';
import allState from '../AllStateAndDistrict';
import axios from 'axios';
import { message, Spin } from 'antd';
import baseUrl from '../../../../baseUrl';

const apiurl = baseUrl.apiUrl

const { Option } = Select;

const BusinessDeveloperRegister = (props) => {
    // const navigate = useNavigate();
    const {updateData} = props;
    const [selectedStates, setSelectedStates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);

    const [stateRegisterData, setStateRegisterData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        gender: "",
        state: "",
        stateRegisterId:"",
        password: "",
        referralid: '',
        city:"",
        referredId:localStorage.getItem('franchiseRefferal')
    });
    const [aadharImage, setAadharImage] = useState({
        file: null,
    });
    const [backaadharImage, setBackAadharImage] = useState({
        file: null,
    });
    const [panImage, setPanImage] = useState({
        file: null,
    });
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        const cities = allState.states.find(state => state.state === stateRegisterData.state)?.districts || [];
        setSelectedCities(cities);
    }, [stateRegisterData.state]);

    const handleCheckboxChange = (state) => {
        if (selectedStates.includes(state)) {
            setSelectedStates(selectedStates.filter(selected => selected !== state));
        } else {
            setSelectedStates([...selectedStates, state]);
        }
    };
    const handleCheckboxChangeCity = (city) => {
        if (stateRegisterData.city.includes(city)) {
            setStateRegisterData({
                ...stateRegisterData,
                city: stateRegisterData.city.filter(selectedCity => selectedCity !== city)
            });
        } else {
            setStateRegisterData({
                ...stateRegisterData,
                city: [...stateRegisterData.city, city]
            });
        }
    };



    const stateRegiInputs = (e) => {
        e.preventDefault();
        setStateRegisterData({ ...stateRegisterData, [e.target.name]: e.target.value });
    };


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

    const handleClickBackAadharFrontImage = (e)=>{
        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            //preview shoe
            setBackAadharImage({ file: e.target.files[0] })
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


    const handleFrenchaeRegiSubmit = async (e) => {
        const updateList = "updateData"
        setLoading(true);
        e.preventDefault();
        console.log(stateRegisterData, panImage.file, aadharImage.file, backaadharImage.file);
        const formData = new FormData();
        formData.append("referredId", localStorage.getItem('franchiseRefferal'))
        formData.append("fname", stateRegisterData.fname);
        formData.append("lname", stateRegisterData.lname);
        formData.append("email", stateRegisterData.email);
        formData.append("phone", stateRegisterData.phone);
        formData.append("gender", stateRegisterData.gender);
        formData.append("password", stateRegisterData.password);
        formData.append("businessDeveloperId", stateRegisterData.stateRegisterId);
        formData.append("adhar_front_side", aadharImage.file);
        formData.append("adhar_back_side", backaadharImage.file)
        formData.append("panCard", panImage.file);
        formData.append("buisnessCity", stateRegisterData.city);


        console.log(formData, "44");

        const token = localStorage.getItem('adminToken') || localStorage.getItem("stateHandlerToken") || localStorage.getItem('franchiseToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        axios.post(`${apiurl}`+"/admin/create-business-developer", formData, config)
            .then((res) => {
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
                setAadharImage({ file: null });
                setPanImage({ file: null });
                updateData(updateList)

            })
            .catch(err => {
                setLoading(false);
                message.error(err.response.data.message);
            })

    };
    


    const menu = (
        <Menu>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {selectedCities.map(city => (
                    <Menu.Item key={city}>
                        <Checkbox
                            onChange={() => handleCheckboxChangeCity(city)}
                            checked={stateRegisterData.city && stateRegisterData.city.includes(city)}
                        >
                            {city}
                        </Checkbox>
                    </Menu.Item>
                ))}
            </div>
        </Menu>
    );

    // verify refferal id
    const verifyReferrlID = () => {
        const token = localStorage.getItem('adminToken');
        let data = {
            refferId: stateRegisterData.referredId
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        axios.post(`${apiurl}`+'/admin/verify-buisness-developer-before-registration', data,config)
            .then((res) => {
                message.success("Verify successfully");
                console.log(res.data)
                setCity(res.data.franchieUserCity);
            })
            .catch((err) => {
                message.warning(err.response.data.message)
            })

    }
    // const stataChange = (value) => {
    //     setStateRegisterData((prevData) => ({
    //         ...prevData,
    //         state: value,
    //     }))
    //     console.log(value)
    // }

    useEffect(() => {
        // Set initial cities based on the selected state
        const cities = allState.states.find(state => state.state === stateRegisterData.state)?.districts || [];
        setCity(cities);
    }, [stateRegisterData.state]);


    const handleState = (value) => {
        setStateRegisterData((prevData) => ({
            ...prevData,
            state: value,
        }))
    }

    return (

        <>
            <div>
                <Modal
                    title="Business Developar Register page"
                    open={props.isModalVisible}
                    onCancel={props.closeModal}
                    onOk={handleFrenchaeRegiSubmit}
                    okText={loading ? <Spin /> : 'Submit'}
                >
                    <div className='form-container'>
                        <div className='state-field'>

                            <label>Referral ID</label>
                            <Input
                                placeholder='Enter referral ID'
                                name="referredId"
                                value={localStorage.getItem('franchiseRefferal')}
                                onChange={stateRegiInputs}
                                disabled
                            />
                            {/* <Button onClick={verifyReferrlID}>Verify</Button> */}
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
                        {/* <div className='d-flex justify-content-between' style={{display: 'flex', flexDirection: 'column'}}> */}
                            <div className='state-field'>
                                <label>Gender</label><br />
                                <Select placeholder="Select Gender"
                                    name="gender"
                                    value={stateRegisterData.gender}
                                    onChange={(value) =>
                                        setStateRegisterData((prevData) => ({
                                            ...prevData,
                                            gender: value
                                        }))
                                    }

                                    style={{ width: "100%"}}>
                                    <Option value='Male'>Male</Option>
                                    <Option value='Female'>Female</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                            </div>
                            <div className='state-field'>
                                <label>State</label>
                                <Select
                                    placeholder="Select state"
                                    name="state"
                                    value={stateRegisterData.state}
                                    onChange={handleState}
                                    style={{ width: '100%' }}
                                >
                                    <Option value=''>Select state</Option>
                                    {allState.states.map(state => (
                                        <Option key={state.state} value={state.state}>
                                            {state.state}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='state-field'>
                                <label>City</label><br />
                                <Select
                                    placeholder="Select City"
                                    name="city"
                                    value={stateRegisterData.city}
                                    onChange={(value) =>
                                        setStateRegisterData((prevData) => ({
                                            ...prevData,
                                            city: value,
                                        }))
                                    }
                                    style={{ width: "100%"}}
                                >
                                    {city.map(city => (
                                        <Option key={city} value={city}>
                                            {city}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        <div className='state-field'>
                            <label>Front aadhar card</label>
                            <Input type='file'
                                placeholder='Front aadhar card'
                                name="aadhar"
                                onChange={handleClickAadharFrontImage}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Back aadhar card</label>
                            <Input type='file'
                                placeholder='Back aadhar card'
                                name="backaadhar"
                                onChange={handleClickBackAadharFrontImage}
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
                            <label>Business Developer ID</label>
                            <Input type='text'
                                placeholder='Businesss Developer Id'
                                name="stateRegisterId"
                                value={stateRegisterData.stateRegisterId}
                                onChange={stateRegiInputs}
                            />
                        </div>
                        <div className='state-field'>
                            <label>Password</label>
                            <Input.Password type='password'
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

export default BusinessDeveloperRegister;


