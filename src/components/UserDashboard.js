import React from 'react'
import { Outlet } from 'react-router-dom'
import '../css/UserDashboard.css'
import UserSidebar from './UserSidebar';

function UserDashboard() {

   
  
  return (
    <>
  
      <div className='main_container'>
        <div className='user_sideBar'>
          <UserSidebar/>
        </div>
        <div className='user_content_container'>
            <Outlet/>
        </div>
      </div>
      
      
    </>
    
    
  )
}

export default UserDashboard