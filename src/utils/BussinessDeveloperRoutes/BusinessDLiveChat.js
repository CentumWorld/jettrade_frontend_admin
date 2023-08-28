import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../../../src/components/Admin/css/LiveChat.css'
import { Input } from 'antd';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import BusinessDChat from './BusinessDChat';


const apiurl = baseUrl.apiUrl

const socket = io.connect('http://localhost:4000');

const BusinessDLiveChat = () => {
    const businessFname = localStorage.getItem('businessFname');
    const businessId = localStorage.getItem('businessId');

    const [businessname, setBusinessname] = useState(businessFname);
    const [room, setRoom] = useState(businessId );
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('BUSINESS');

    const joinRoom = () => {
        if (businessname !== "" && room !== "") {
            socket.emit("join_room", room, type);
            setShowChat(true);
        }
    }

    useEffect(() => {
        exitChatBusiness();
    }, [])

    const exitChatBusiness = () => {
        let token = localStorage.getItem('bussinessAdminToken')
        let data = {
            businessDeveloperId :localStorage.getItem('businessId')
        }

        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post(`${apiurl}`+'/businessDeveloper/businessDeveloper/fetch-chat-details-business', data, config)
            .then((result) => {
                const length = result.data.businessChatDetails.length;
                console.log(length);
                if (length > 0) {
                    joinRoom()
                    setShowChat(true)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <>
            <div className="text-center">
                {!showChat ? (
                    <div className='joinChatContainer'>
                <h3 >Join a Chat</h3>
                <Input
                    type="text"
                    value={businessname}
                    placeholder='Join......'
                    onChange={(event) => { setBusinessname(event.target.value) }
                    }
                    disabled={true}
                     />
                <Input
                    type="text"
                    value={room}
                    placeholder='Room Id...'
                    onChange={(event) => { setRoom(event.target.value) }
                    }
                    disabled={true} />

                    <button className='btn btn-primary' onClick={joinRoom} style={{fontFamily:'Calibri'}} >Join Chat</button>
                </div>

            )
            : (
            <BusinessDChat socket={socket} businessname={businessname} room={room} />
                )}
        </div >

        </>
    )
}

export default BusinessDLiveChat