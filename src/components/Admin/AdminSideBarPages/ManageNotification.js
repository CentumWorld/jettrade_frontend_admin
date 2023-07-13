import React, { useState } from 'react';
import '../css/ManageNotification.css'
import { Select, Input, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';


const { Option } = Select;

const ManageNotification = () => {

  const [selectedOption, setSelectedOption] = useState('all');
  const [allNotification, setAllNotification] = useState('');
  const [allTraderNotification, setAllTraderNotification] = useState('')
  const [allRefferalNotification, setAllRefferalNotification] = useState('')
  const [particularTraderNotification, setParticularTraderNotification] = useState({
    userid: '',
    message: ''
  })
  const [particularRefferalNotification, setParticularRefferalNotification] = useState({
    memberid: '',
    message: ''
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
    const token = localStorage.getItem('adminToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post('/admin/notification-for-all', data, config)
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
    const token = localStorage.getItem('adminToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post('/admin/notification-for-all-traders', data, config)
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
    const token = localStorage.getItem('adminToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post('/admin/notification-for-all-refferal', data, config)
      .then((result) => {
        setAllRefferalNotification("");
        message.success('Notification sent to all refferals');
      })
      .catch(err => {
        message.warning('Please provided type and message');
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
    const token = localStorage.getItem('adminToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post('/admin/notification-for-particular-trader', data, config)
      .then((result) => {
        setParticularTraderNotification({
          userid: '',
          message: ''
        });
        message.success(result.data.message);
      })
      .catch(err => {
        message.warning('Please provided type and message');
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
    const token = localStorage.getItem('adminToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    axios.post('/admin/notification-for-particular-refferal', data, config)
      .then((result) => {
        message.success(result.data.message);
        setParticularRefferalNotification("");

        console.log(result.data.message);
      })
      .catch(err => {
        message.warning('Please provided type and message');
      })


  }

  return (
    <>
      <div className='manage-notification-page'>
        <div className='manage-notification-card'>
          <div className='manage-notification-heading'>
            <p>Manage Notificaion</p>
          </div>
          <div>
            <Select defaultValue="All" onChange={handleChange} style={{ width: '200px', marginBottom: '10px' }}>
              <Option value="all">All</Option>
              <Option value="alltraders">All Traders</Option>
              <Option value="allrefferals">All Refferals</Option>
              <Option value="particulartrader">Particular Trader</Option>
              <Option value="particularrefferal">Particular Refferal</Option>
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

            {selectedOption === 'alltraders' && (
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
            {selectedOption === 'allrefferals' && (
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
            {selectedOption === 'particulartrader' && (
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
            {selectedOption === 'particularrefferal' && (
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
          </div>
        </div>

      </div>
    </>
  )
}

export default ManageNotification