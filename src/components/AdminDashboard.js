import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSideBar from './Admin/AdminSideBar/AdminSideBar'
import '../css/AdminDashboard.css';
import io from 'socket.io-client';


const AdminDashboard = () => {

 

  
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admindashboard/dashboard')
    
   
  }, [])

  return (
    <>

      <div className='admin-main-container'>
        <div className='admin_sideBar'>
          <AdminSideBar />
        </div>
        <div className='admin_content_container'>
          <Outlet />
        </div>
      </div>


    </>
  )
}

export default AdminDashboard