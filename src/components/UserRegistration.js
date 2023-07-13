import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
// import UserLogin from './UserLogin';
import '../css/UserRegistration.css';

function UserRegistration() {

    const [userData, setUserData] = useState({
        fname: "", lname: "", email: "", phone: "", address: "", gender: "", dob: "", aadhar_no: "", aadhar_upload: "", pan_no: "", pan_upload: "", invite_code: ""
    })
    const [panError, setPanError] = useState(false);
    const [aadharError, setAadharError] = useState(false);
    const navigate = useNavigate();
    //console.log(userData)
    const userInputs = e => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value })
       
    }

    const aadharUpload = (event) => {
        event.preventDefault();
        setUserData({ ...userData, aadhar_upload: event.target.files[0] })
        // console.log(event.target.files[0]);
    }

    const panUpload = (event) => {
        event.preventDefault();
        setUserData({ ...userData, pan_upload: event.target.files[0] })
    }
    const pan = (e)=>{
        e.preventDefault();
        setUserData({...userData, pan_no: e.target.value})
        let panLength = e.target.value;
        console.log(userData.pan_no);
        if(panLength.length===10){
            setPanError(false);
        }
        else{
            setPanError(true);
        }
    }
    const aadhar = (e)=>{
        setUserData({...userData, aadhar_no: e.target.value})
        let aadharLength = e.target.value;
        if(aadharLength.length===12){
            setAadharError(false);
        }
        else{
            setAadharError(true);
        }
    }
    function home(){
        navigate('/');
    }
    const submit = (e) => {
        e.preventDefault();
        console.log(userData);
        const formData = new FormData();
        formData.append('fname', userData.fname);
        formData.append('lname', userData.lname);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('address', userData.address);
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);
        formData.append('aadhar', userData.aadhar_no);
        formData.append('aadhar_upload', userData.aadhar_upload);
        formData.append('pan', userData.pan_no);
        formData.append('pan_upload', userData.pan_upload);
        formData.append('reffered_id', userData.invite_code);
        console.log(formData, '44');

        axios.post('/user/registration', formData)
            .then((res) => {
                toast.success('User Registered Successfully', {
                    autoClose: 2000,
                    theme: "dark"
                })
                navigate('/paymentpage');
                console.log(res.data)
            }).catch((error) => {
                
                toast.warning('Please fill the all details!')
            })
    }


    return (
        <>
            {/* <div className="userSignupModal modal fade" id="userSignUp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">USER REGISTER</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='form-content'>
                                <form>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="fname ">First Name</label>
                                                <input type="text" name='fname' id='fname' className='form-control'
                                                value={userData.fname}
                                                onChange={userInputs}
                                                 placeholder='Enter first name' />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="lname">Last Name</label>
                                                <input type="text" name='lname' id='lname' className='form-control'
                                                value={userData.lname}
                                                onChange={userInputs}
                                                 placeholder='Enter last name' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="email">Email (Optional)</label>
                                                <input type="email" name='email' id='email' className='form-control'
                                                value={userData.email}
                                                onChange={userInputs}
                                                 placeholder='Email address' />
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="phone">Phone</label>
                                                <input type="text" name='phone' id='phone' className='form-control'
                                                value={userData.phone}
                                                onChange={userInputs}
                                                 placeholder='Phone number' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <label htmlFor="address">Address</label>
                                                <textarea name="address" id="address" className='form-control'
                                                value={userData.address}
                                                onChange={userInputs}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="">Gender</label><br />
                                                <input type="radio" value={'Male'} onChange={userInputs} name="gender" /> Male &nbsp;
                                                <input type="radio" value={'Female'} onChange={userInputs} name="gender" /> Female&nbsp;
                                                <input type="radio" value={'Other'} onChange={userInputs} name="gender" /> Other


                                            </div>

                                        </div>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="dob">DOB</label>
                                                <input type="date" name='dob' id='dob' className='form-control'
                                                value={userData.dob}
                                                onChange={userInputs}
                                                 placeholder='Date of birth' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="aadharno">Aadhar No.</label><br />
                                                <input type="text" name="aadhar_no" className='form-control'
                                                value={userData.aadhar_no}
                                                onChange={userInputs}
                                                 placeholder='Aadhar Number'  />
                                            </div>

                                        </div>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="uploeadAdhar">Upload Aadhar</label>
                                                <input type="file" name='aadhar_upload' id='uploeadAdhar' className='form-control'
                                        
                                                onChange={aadharUpload}
                                                 placeholder='Choose file' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="pan_no">PAN No.</label><br />
                                                <input type="text" name="pan_no" className='form-control'
                                                    value={userData.pan_no}
                                                    onChange={userInputs}
                                                 placeholder='PAN Number'  />
                                            </div>

                                        </div>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label htmlFor="uploadPan">Upload PAN</label>
                                                <input type="file" name='pan_upload' id='uploadPan' className='form-control'
                                                    
                                                    onChange={panUpload}
                                                 placeholder='Choose file' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={submit} className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/> */}
            <div className='registration-page'>
                <div className='registration-body'>
                    <div className='form-content'>
                        <form>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="fname ">First Name</label>
                                        <input type="text" name='fname' id='fname' className='form-control'
                                            value={userData.fname}
                                            onChange={userInputs}
                                            placeholder='Enter first name' />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="lname">Last Name</label>
                                        <input type="text" name='lname' id='lname' className='form-control'
                                            value={userData.lname}
                                            onChange={userInputs}
                                            placeholder='Enter last name' />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="email">Email (Optional)</label>
                                        <input type="email" name='email' id='email' className='form-control'
                                            value={userData.email}
                                            onChange={userInputs}
                                            placeholder='Email address' />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name='phone' id='phone' className='form-control'
                                            value={userData.phone}
                                            onChange={userInputs}
                                            placeholder='Phone number' />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='form-group'>
                                        <label htmlFor="address">Address</label>
                                        <textarea name="address" id="address" className='form-control'
                                            value={userData.address}
                                            onChange={userInputs}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="">Gender</label><br />
                                        <input type="radio" value={'Male'} onChange={userInputs} name="gender" /> Male &nbsp;
                                        <input type="radio" value={'Female'} onChange={userInputs} name="gender" /> Female&nbsp;
                                        <input type="radio" value={'Other'} onChange={userInputs} name="gender" /> Other


                                    </div>

                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="dob">DOB</label>
                                        <input type="date" name='dob' id='dob' className='form-control'
                                            value={userData.dob}
                                            onChange={userInputs}
                                            placeholder='Date of birth' />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="aadharno">Aadhar No.</label><br />
                                        <input type="text" name="aadhar_no" className='form-control' maxLength={12} minLength={12}
                                        
                                            onChange={aadhar}
                                            placeholder='Aadhar Number' />
                                    </div>
                                    {aadharError?<span style={{color:"red"}}>Must be 12 digit.</span>:""}

                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="uploeadAdhar">Upload Aadhar</label>
                                        <input type="file" name='aadhar_upload' id='uploeadAdhar' className='form-control' required

                                            onChange={aadharUpload}
                                            placeholder='Choose file' />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="pan_no">PAN No.</label><br />
                                        <input type="text" name="pan_no" className='form-control' minLength={10} maxLength={10}
                                            
                                            onChange={pan}
                                            placeholder='PAN Number' />
                                    </div>
                                    {panError?<span style={{color:"red"}}>Invalid Pan no.</span>:""}
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor="uploadPan">Upload PAN</label>
                                        <input type="file" name='pan_upload' id='uploadPan' className='form-control'

                                            onChange={panUpload}
                                            placeholder='Choose file' />
                                    </div>
                                </div>
                                <div className='invite-box'>
                                    <div className='form-group'>
                                        <label htmlFor="invite">Reffered ID</label>
                                        <input type="text" name='invite_code' className='form-control'
                                            value={userData.invite_code}
                                            onChange={userInputs}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="submit-footer">

                                <button type="button" onClick={submit} className="btn btn-primary">Register</button>
                                <button className='btn btn-success' onClick={home}>Home</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}

export default UserRegistration