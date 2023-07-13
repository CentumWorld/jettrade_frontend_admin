import React, { useEffect, useState } from 'react';
import '../css/ManageSubscription.css'
import axios from 'axios';
import { Table, Modal, Row, Col, Menu, Dropdown, message } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ManageSubscription = () => {
  const [data, setData] = useState([]);
  const [myID, setMyID] = useState('');
  const [userStatus, setUserStatus] = useState(false);

  //isBlock
  const [isBlocked, setIsBlock] = useState(true);

  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/admin/fetch-user-details');
      setData(response.data.result);
      console.log(response.data.result);
      // setFilteredDataSource(response.data.result);
      // setLength(response.data.result.length);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  const columns = [
    { title: 'User ID', dataIndex: 'userid', key: 'userid' },
    { title: 'First Name', dataIndex: 'fname', key: 'fname' },
    { title: 'Last Name', dataIndex: 'lname', key: 'lname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'DOJ(mm/dd/yy)', dataIndex: 'doj', render: (doj) => {
        const formattedDate = new Date(doj).toLocaleDateString();
        return <span>{formattedDate}</span>;
      }
    },
    {
      title: 'Expiry(mm/dd/yy)', dataIndex: 'doj', render: (doj) => {
        const formattedDate = new Date(doj)
        const addYear = formattedDate.setFullYear(formattedDate.getFullYear() + 1);
        const finalYear = new Date(addYear).toLocaleDateString();
        return <span>{finalYear}</span>;
      }
    },
    //  { title: 'Subscription', dataIndex: 'paymentStatus', key: 'paymentStatus' },
    {
      title: 'Subscription', dataIndex: 'paymentStatus', render: (paymentStatus) => {
        const cellStyle = paymentStatus ? { color: 'green' } : { color: 'red' };
        return <span style={cellStyle}>{paymentStatus ? 'Running' : 'Expired'} </span>
      }
    },
    // { title: 'Reffered ID', dataIndex: 'reffered_id', key: 'reffered_id' },
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
    // if (e.key === 'view') {

    //     handleViewClick(myID)
    // }
    // if (e.key === 'edit') {
    //     editModal()
    //     fetchUserDetailsForEdit(myID)
    //     console.log(myID)
    // }
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
      {/* <Menu.Item key="view">View</Menu.Item> */}
      {/* <Menu.Item key="edit">Edit</Menu.Item> */}
      <Menu.Item key="block">
        {isBlocked ? 'Unblock' : 'Block'}
      </Menu.Item>
    </Menu>
  );


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

  return (
    <>
      <div className='manage-subscription-page'>
        <div className='manage-subscription-card'>
          <div className='manage-subscription-heading'>
            <p> Manage Subscription</p>
            <div className='user-subscription-table'>
              <Table
                // dataSource={filteredDataSource}
                dataSource={data}
                columns={columns}
                scroll={{ x: true }}
                pagination={{ pageSize: 7 }}

              />
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default ManageSubscription