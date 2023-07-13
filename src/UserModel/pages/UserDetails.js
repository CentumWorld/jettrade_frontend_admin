import React from 'react'
import { NavLink } from 'react-router-dom';
import '../../css/UserDetails.css';
import profile from '../../img/user_profile.png'

const UserDetails = () => {
  return (
    <>
      <div className='user_details'>
        <div className='user_card'>
          
          <div className='row'>
            <div className='user_details_heading'>
              <div className='user_main_heading'>
                <p>Your personal information</p>
              </div>
               <div className='user_main_heading_paragraph'>
                  <p>Here you can view and change your personal information on our platform. Please note that the details should be correct and up-to-date.</p>
               </div>
            </div>
          </div>
          <div className='user_deatails_main_div row'>
            <div className='user_details_content col-md-8'>
              <div className='row'>
                  <div className='row_content'>
                    <div className='user_head'>
                      <h6>Email</h6>
                    </div>
                    <div className='user_head_data'>
                      <h6>badalmandal@gmail.com</h6>
                      <span><NavLink to={''}>change</NavLink></span>
                    </div>
                  </div>   
              </div>
              <hr />
              <div className='row'>
                  <div className='row_content'>
                    <div className='user_head'>
                      <h7>Phone</h7>
                    </div>
                    <div className='user_head_data'>
                      <h6>+8956235478</h6>
                      <span><NavLink to={''}>change</NavLink></span>
                    </div>
                  </div>   
              </div>
              <hr />
              <div className='row'>
                  <div className='row_content'>
                    <div className='user_head'>
                      <h6>Name</h6>
                    </div>
                    <div className='user_head_data'>
                      <h6>Badal Mandal</h6>
                    </div>
                  </div>   
              </div>
              <hr />
              <div className='row'>
                  <div className='row_content'>
                    <div className='user_head'>
                      <h6>Birthdate</h6>
                    </div>
                    <div className='user_head_data'>
                      <h6>May 8, 1996</h6>
                    </div>
                  </div>   
              </div>
              <hr />
              <div className='row'>
                  <div className='row_content'>
                    <div className='user_head'>
                      <h6>Country</h6>
                    </div>
                    <div className='user_head_data'>
                      <h6>IND</h6>
                      
                    </div>
                  </div>   
              </div>
              <hr />
              <div className='row'>
                  <div className='row_content'>
                    <div className='user_head'>
                      <h6>Verification status</h6>
                    </div>
                    <div className=''>
                      <h6>Not verify</h6>
                      <span><NavLink to={''}>Get Verified</NavLink></span>
                    </div>
                  </div>   
              </div>
              <hr />
             
            </div>
            <div className='user_profile col-md-4'>
              <div className='pic'>
                <img src={profile} alt="" width={150} height={150} />
                <div class=" upload_file d-grid mx-auto">
                  <button class="btn btn-primary" type="button">Upload file</button>
                  
                </div>
              </div>
             
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default UserDetails