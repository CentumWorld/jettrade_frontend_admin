import React, { useState } from 'react';
import '../css/ManageNotification.css'
import { Select, Input, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import baseUrl from '../../../baseUrl';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const apiurl = baseUrl.apiUrl
const { Option } = Select;

const ManageNotification = () => {  

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('all');
  const [allNotification, setAllNotification] = useState('');
  const [allTraderNotification, setAllTraderNotification] = useState('')
  const [allRefferalNotification, setAllRefferalNotification] = useState('')
  const [allShoNotification, setAllShoNotification] = useState('');
  const [allFranchiseNotification, setAllFranchiseNotification] = useState('');
  const [allBusinessDevNotification, setAllBusinessDevNotification] = useState('');
  const [particularTraderNotification, setParticularTraderNotification] = useState({
    userid: '',
    message: ''
  })
  const [particularRefferalNotification, setParticularRefferalNotification] = useState({
    memberid: '',
    message: ''
  })
  const [particularShoNotification, setParticularShoNotification] = useState({
    stateHandlerId:'',
    message :''
  })
  const [particularFranchiseNotification, setParticularFranchiseNotification] = useState({
    frenchiseId:'',
    message:''
  })
  const [particularBusinessDevNotification,setParticularBusinessDevNotification]=useState({
    businessDeveloperId:'',
    message:''
  })

  const handleChange = (value) => {
    setSelectedOption(value);
  };
  // all notification
  const allnotification = (e) => {

    setAllNotification(e.target.value);
  }
  const allNotificationSubmit = () => {
    console.log(allNotification)
    const data = {
      message: allNotification,
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-all", data, config)
      .then((result) => {
        setAllNotification("");
        message.success('Notification sent to all');
      })
      .catch(err => {
        message.warning('Please provided message');
      })
  }

  // all trader sent notification
  const handleAllTraderNotificationChange = (e) => {
    setAllTraderNotification(e.target.value)
  }
  const submitAllTraderNotification = () => {
    const data = {
      message: allTraderNotification,
      investerType: "allTrader",
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-all-traders", data, config)
      .then((result) => {
        setAllTraderNotification("");
        message.success('Notification sent to all traders');
      })
      .catch(err => {
        message.warning('Please provided type and message');
      })


  }

  // ------All refferal notification
  const handleAllRefferalNotificationChange = (e) => {
    setAllRefferalNotification(e.target.value)
  }
  const submitAllRefferalNotification = () => {
    const data = {
      message: allRefferalNotification,
      investerType: "allRefferal",
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-all-refferal", data, config)
      .then((result) => {
        setAllRefferalNotification("");
        message.success('Notification sent to all refferals');
      })
      .catch(err => {
        message.warning('Please provided type and message');
      })


  }

   // ------All SHO notification
   const handleAllShoNotificationChange = (e) => {
    setAllShoNotification(e.target.value)
  }
  const submitAllShoNotification = () => {
    const data = {
      message: allShoNotification,
      investerType: "allSho",
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-all-sho-notification", data, config)
      .then((result) => {
        setAllShoNotification("");
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })
  }

   // ------All Franchise notification
   const handleAllFranchiseNotificationChange = (e) => {
    setAllFranchiseNotification(e.target.value)
  }
  const submitAllFranchiseNotification = () => {
    const data = {
      message: allFranchiseNotification,
      investerType: "allFranchise",
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-all-franchise", data, config)
      .then((result) => {
        setAllFranchiseNotification("");
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })

  }

   // ------All Franchise notification
   const handleAllBusinessDevNotificationChange = (e) => {
    setAllBusinessDevNotification(e.target.value)
  }
  const submitAllBusinessDevNotification = () => {
    const data = {
      message: allBusinessDevNotification,
      investerType: "allBusinessDev",
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-all-business-dev", data, config)
      .then((result) => {
        setAllBusinessDevNotification("");
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })
  }


  // ------Particular trader notification
  const handleParticularTraderNotificationChange = (e) => {
    setParticularTraderNotification({ ...particularTraderNotification, [e.target.name]: e.target.value })
  }
  const submitParticularTraderNotification = () => {
    const data = {
      message: particularTraderNotification.message,
      userid: particularTraderNotification.userid
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-particular-trader", data, config)
      .then((result) => {
        setParticularTraderNotification({
          userid: '',
          message: ''
        });
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })


  }

  // ------Particular refferal notification
  const handleParticularRefferalNotificationChange = (e) => {
    setParticularRefferalNotification({ ...particularRefferalNotification, [e.target.name]: e.target.value })
  }
  const submitParticularRefferalNotification = () => {
    const data = {
      message: particularRefferalNotification.message,
      memberid: particularRefferalNotification.memberid
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-particular-refferal", data, config)
      .then((result) => {
        message.success(result.data.message);
        setParticularRefferalNotification("");

        console.log(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })

  }

   // ------Particular SHO notification
   const handleParticularShoNotificationChange = (e) => {
    setParticularShoNotification({ ...particularShoNotification, [e.target.name]: e.target.value })
  }
  const submitParticularShoNotification = () => {
    const data = {
      message: particularShoNotification.message,
      stateHandlerId: particularShoNotification.stateHandlerId
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-particular-sho", data, config)
      .then((result) => {
        setParticularShoNotification({
          stateHandlerId: '',
          message: ''
        });
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })


  }

   // ------Particular Franchise notification

   const handleParticularFranchiseNotificationChange = (e) => {
    setParticularFranchiseNotification({ ...particularFranchiseNotification, [e.target.name]: e.target.value })
  }
  const submitParticularFranchiseNotification = () => {
    const data = {
      message: particularFranchiseNotification.message,
      frenchiseId: particularFranchiseNotification.frenchiseId
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post(`${apiurl}`+"/admin/notification-for-particular-franchise", data, config)
      .then((result) => {
        setParticularFranchiseNotification({
          frenchiseId: '',
          message: ''
        });
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning(err.response.data.message);
      })

  }

    // ------Particular Business Dev notification

    const handleParticularBusinessDevNotificationChange = (e) => {
      setParticularBusinessDevNotification({ ...particularBusinessDevNotification, [e.target.name]: e.target.value })
    }
    const submitParticularBusinessDevNotification = () => {
      const data = {
        message: particularBusinessDevNotification.message,
        businessDeveloperId: particularBusinessDevNotification.businessDeveloperId
      }
      const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      axios.post(`${apiurl}`+"/admin/notification-for-particular-business-dev", data, config)
        .then((result) => {
          setParticularBusinessDevNotification({
            businessDeveloperId: '',
            message: ''
          });
          message.success(result.data.message);
        })
        .catch(err => {
          message.warning(err.response.data.message);
        })
  
  
    }

    const gotoHome = () => {
      navigate('/admindashboard')
    }
  return (
    <>
      <div className='manage-notification-page'>
        <div className='manage-notification-card'>
          <div className='manage-notification-heading'>
            <p><BiArrowBack onClick={gotoHome} style={{cursor:"pointer"}}/> &nbsp;Manage Notificaion</p>
          </div>
          <div>
            <Select defaultValue="All" onChange={handleChange} style={{ width: '200px', marginBottom: '10px' }}>
              <Option value="all">All</Option>
              <Option value="allTraders">All Traders</Option>
              <Option value="allReferrals">All Members</Option>
              <Option value="allSho">All BMM</Option>
              <Option value="allFranchise">All Franchise</Option>
              <Option value="particularTrader">Particular Trader</Option>
              <Option value="particularReferral">Particular Member</Option>
              <Option value="particularSho">Particular BMM</Option>
              <Option value="particularFranchise">Particular Franchise</Option>
            </Select>

            {selectedOption === 'all' && (
              <>
                <div className='notification-area'>
                  <div className='notification-field'>
                    <TextArea placeholder="Enter Notification" value={allNotification} onChange={allnotification} rows={4}
                      className='notification-text-area' /><br />
                    <Button type='primary' className='push-notification-button' style={{ marginTop: '5px' }} onClick={allNotificationSubmit}>Submit</Button>
                  </div>
                </div>
              </>
            )}

            {selectedOption === 'allTraders' && (
              <div className='notification-area'>
                <div className='notification-field'>
                  <TextArea placeholder="Enter Notification" value={allTraderNotification}
                    onChange={handleAllTraderNotificationChange}
                    rows={4}

                    className='notification-text-area' /><br />
                  <Button type='primary' className='push-notification-button' onClick={submitAllTraderNotification} style={{ marginTop: '5px' }}>Submit</Button>
                </div>
              </div>
            )}
            {selectedOption === 'allReferrals' && (
              <div className='notification-area'>
                <div className='notification-field'>
                  <TextArea placeholder="Enter Notification for all refferal"
                    value={allRefferalNotification}
                    onChange={handleAllRefferalNotificationChange}
                    rows={4}
                    className='notification-text-area' /><br />
                  <Button type='primary' className='push-notification-button' onClick={submitAllRefferalNotification} style={{ marginTop: '5px' }}>Submit</Button>
                </div>
              </div>
            )}
            {selectedOption === 'allBusinessDev' && (
              <div className='notification-area'>
                <div className='notification-field'>
                  <TextArea placeholder="Enter Notification" value={allBusinessDevNotification}
                    onChange={handleAllBusinessDevNotificationChange}
                    rows={4}

                    className='notification-text-area' /><br />
                  <Button type='primary' className='push-notification-button' onClick={submitAllBusinessDevNotification} style={{ marginTop: '5px' }}>Submit</Button>
                </div>
              </div>
            )}
            {selectedOption === 'allSho' && (
              <div className='notification-area'>
                <div className='notification-field'>
                  <TextArea placeholder="Enter Notification" value={allShoNotification}
                    onChange={handleAllShoNotificationChange}
                    rows={4}

                    className='notification-text-area' /><br />
                  <Button type='primary' className='push-notification-button' onClick={submitAllShoNotification} style={{ marginTop: '5px' }}>Submit</Button>
                </div>
              </div>
            )}
            {selectedOption === 'allFranchise' && (
              <div className='notification-area'>
                <div className='notification-field'>
                  <TextArea placeholder="Enter Notification" value={allFranchiseNotification}
                    onChange={handleAllFranchiseNotificationChange}
                    rows={4}

                    className='notification-text-area' /><br />
                  <Button type='primary' className='push-notification-button' onClick={submitAllFranchiseNotification} style={{ marginTop: '5px' }}>Submit</Button>
                </div>
              </div>
            )}
            {selectedOption === 'particularTrader' && (
              <>
                <div className='notification-area'>
                  <div className='notification-field'>
                    <Input size="large" style={{ marginBottom: '5px' }}
                      placeholder='Enter trader id'
                      name='userid'
                      value={particularTraderNotification.userid}
                      onChange={handleParticularTraderNotificationChange}
                      className='notification-text-area' /><br />
                    <TextArea placeholder="Enter Notification" name='message'
                      onChange={handleParticularTraderNotificationChange}
                      value={particularTraderNotification.message} rows={4}
                      className='notification-text-area' /><br />
                    <Button type='primary' className='push-notification-button' onClick={submitParticularTraderNotification} style={{ marginTop: '5px' }}>Submit</Button>
                  </div>
                </div>
              </>

            )}
            {selectedOption === 'particularReferral' && (
              <div className='notification-area'>
                <div className='notification-field'>
                  <Input size="large" style={{ marginBottom: '5px' }}
                    placeholder='Enter refferal user ID'
                    name='memberid'
                    value={particularRefferalNotification.memberid}
                    onChange={handleParticularRefferalNotificationChange}
                    className='notification-text-area' /><br />
                  <TextArea placeholder="Enter Notification"
                    name='message'
                    onChange={handleParticularRefferalNotificationChange}
                    value={particularRefferalNotification.message}
                    rows={4}
                    className='notification-text-area' /><br />
                  <Button type='primary' className='push-notification-button' onClick={submitParticularRefferalNotification} style={{ marginTop: '5px' }}>Submit</Button>
                </div>
              </div>
            )}

            {selectedOption === 'particularSho' && (
              <>
                <div className='notification-area'>
                  <div className='notification-field'>
                    <Input size="large" style={{ marginBottom: '5px' }}
                      placeholder='Enter SHO ID'
                      name='stateHandlerId'
                      value={particularShoNotification.stateHandlerId}
                      onChange={handleParticularShoNotificationChange}
                      className='notification-text-area' /><br />
                    <TextArea placeholder="Enter Notification" name='message'
                      onChange={handleParticularShoNotificationChange}
                      value={particularShoNotification.message} rows={4}
                      className='notification-text-area' /><br />
                    <Button type='primary' className='push-notification-button' onClick={submitParticularShoNotification} style={{ marginTop: '5px' }}>Submit</Button>
                  </div>
                </div>
              </>

            )}

            {selectedOption === 'particularFranchise' && (
              <>
                <div className='notification-area'>
                  <div className='notification-field'>
                    <Input size="large" style={{ marginBottom: '5px' }}
                      placeholder='Enter Franchise ID'
                      name='frenchiseId'
                      value={particularFranchiseNotification.frenchiseId}
                      onChange={handleParticularFranchiseNotificationChange}
                      className='notification-text-area' /><br />
                    <TextArea placeholder="Enter Notification" name='message'
                      onChange={handleParticularFranchiseNotificationChange}
                      value={particularFranchiseNotification.message} rows={4}
                      className='notification-text-area' /><br />
                    <Button type='primary' className='push-notification-button' onClick={submitParticularFranchiseNotification} style={{ marginTop: '5px' }}>Submit</Button>
                  </div>
                </div>
              </>

            )}

            {selectedOption === 'particularBusinessDev' && (
              <>
                <div className='notification-area'>
                  <div className='notification-field'>
                    <Input size="large" style={{ marginBottom: '5px' }}
                      placeholder='Enter BusinessDev ID'
                      name='businessDeveloperId'
                      value={particularBusinessDevNotification.businessDeveloperId}
                      onChange={handleParticularBusinessDevNotificationChange}
                      className='notification-text-area' /><br />
                    <TextArea placeholder="Enter Notification" name='message'
                      onChange={handleParticularBusinessDevNotificationChange}
                      value={particularBusinessDevNotification.message} rows={4}
                      className='notification-text-area' /><br />
                    <Button type='primary' className='push-notification-button' onClick={submitParticularBusinessDevNotification} style={{ marginTop: '5px' }}>Submit</Button>
                  </div>
                </div>
              </>

            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default ManageNotification