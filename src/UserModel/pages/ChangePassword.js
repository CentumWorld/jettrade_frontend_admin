import React, { useEffect, useState } from 'react'
import '../../css/ChangePassword.css'

function ChangePassword() {
  const [selectDiv, setSelectDiv] = useState('');

  function onChangeValue(event) {
    setSelectDiv(event.target.value);
    console.log(event.target.value);
  }
  return (
    <>

      <div className='change_password'>
        <div className='change_password_card'>
          <div className='row'>
            <div className='change_password_heading '>
              <p>Password Management</p>

            </div>
            <div className='change_password_para'>
              <p>Here you can change and reset your JettradeFX PIN, Personal Area password, and passwords for all your trading accounts.</p>
            </div>

          </div>
          <div className='change_password_label '>
            <p>Change Password</p>
            <hr />
          </div>
          <div className='select_password_type_info'>
            <p>Select a password or PIN</p>

            <div className='password_radio_select'>
              <div onChange={onChangeValue}>
                <input type="radio" name="pin" value="FXPIN" />&nbsp;
                <label htmlFor="html">JettradeFX PIN </label>
              </div>
              <div onChange={onChangeValue}>
                <input type="radio" name="pin" value="PERSONALPIN" />&nbsp;
                <label htmlFor="html">Personal area Pin</label>
              </div>

            </div>
          </div>
          {selectDiv === 'FXPIN' ?
            <div className='fx_pin'>
              <div className='password_form'>
                <div className='newpassword form-group'>
                  <label htmlFor="new_password">New</label>
                  <input type="text" className='form-control' placeholder='New password' />
                </div>
                <div className='password_form'>
                  <div className='newpassword form-group'>
                    <label htmlFor="new_password">Repeat</label>
                    <input type="text" className='form-control' placeholder='Repeat password' />
                  </div>
                </div>
                <div className='change_password_submit'>
                  <button className='btn btn-primary'>Change</button>
                </div>
              </div>

            </div>
            :
            <div className='fx_pin'>
              <div className='password_form'>
                <div className='newpassword form-group'>
                  <label htmlFor="new_password">New</label>
                  <input type="text" className='form-control' placeholder='New password' />
                </div>
                <div className='password_form'>
                  <div className='newpassword form-group'>
                    <label htmlFor="new_password">Repeat</label>
                    <input type="text" className='form-control' placeholder='Repeat password' />
                  </div>
                </div>
                <div className='change_password_submit'>
                  <button className='btn btn-primary'>Change</button>
                </div>
              </div>

            </div>

          }

        </div>

      </div>


    </>
  )
}

export default ChangePassword