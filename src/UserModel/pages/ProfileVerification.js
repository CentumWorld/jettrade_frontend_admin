import React from 'react'
import '../../css/ProfileVerification.css';
import verification_photo from '../../img/verification_instruction.JPG' 
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {RxCrossCircled} from 'react-icons/rx'
import {CiMedicalCross} from 'react-icons/ci'
import {AiOutlinePlus} from 'react-icons/ai'

function ProfileVerification() {
    return (
        <>
            <div className='profile_verification'>
                <div className='verification_card'>
                    <div className='row'>
                        <div className='verification_heading col-md-12'>
                            <p>Verification request</p>

                        </div>

                    </div>
                    <div className='row'>
                        <div className='upload_id'>
                            <p>1. Upload your ID</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='verification_select_and_para'>
                            <div className='verificatin_box col-md-6'>
                                <div class="selectWrapper">
                                    <select class="selectBox">
                                     <option value="<FaRegIdCard/>" >Aadhar Card</option>
                                       
                                    </select>
                                </div>
                            </div>
                            <div className='verification_para col-md-6'>
                                <p>The document you are providing must be valid at least 30 days and contain all of the following details:</p>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='verification_file_area'>
                            <div className='verification_file_select col-md-6'>
                                <div className='aadhar_front_div col-md-6'>
                                    <div className='aadhar_front'>
                                        <div className='plus_icon'>
                                            <label htmlFor="add_aadhar_front"><AiOutlinePlus/></label>
                                            <input type="file" id='add_aadhar_front' />
                                        </div>                 
                                    </div>
                                    <div className='aadhar_front_heading'>
                                       
                                        <span>Front side</span>
                                        <p>Provide files in <strong>JPG</strong> <br /> format, <strong>2MB</strong> <br /> maximum</p>
                                    </div>
                                </div>
                                
                                <div className='aadhar_back_div col-md-6'>
                                    <div className='aadhar_back'>
                                        <div className='plus_icon'>
                                            <label htmlFor="add_aadhar_back"><AiOutlinePlus/></label>
                                            <input type="file" id='add_aadhar_back' />
                                        </div>                 
                                    </div>
                                    <div className='aadhar_front_heading'>
                                        <span>Reverse side</span>
                                        <p>Provide files in <strong>JPG</strong> <br /> format, <strong>2MB</strong> <br /> maximum</p>
                                    </div>
                                </div>
                            </div>
                            <div className='verification_image col-md-6'>
                                <img src={verification_photo} alt="" />
                                
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='verification_footer row'>
                        <div className='check'>
                            <span><BsFillCheckCircleFill/></span>&nbsp;<strong>Upload a colourful full-size (4 sides visible) photo of the document.</strong>
                        </div>
                       <div className='uncheck'>
                        <span><RxCrossCircled/></span>&nbsp;<strong>Do not upload selfies, screenshots and do not modify the images in graphic editors.</strong>
                       </div>
                        
                    </div>
                    <div className='verification_submit_button '>
                        <button className='btn btn-primary'>Submit request</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileVerification