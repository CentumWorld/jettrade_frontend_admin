import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BusinessChatAdmin from '../AdminSideBarPages/BusinessChatAdmin';
import '../css/LiveChat.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import axios from 'axios';
import chatIcon from '../../../img/user_profile.png'
import { AiOutlineBell } from 'react-icons/ai';
import baseUrl from '../../../baseUrl';

const apiurl = baseUrl.apiUrl
const socket = io.connect('http://localhost:4000');

const BusinessLiveChatAdmin = () => {

    const [businessname, setBusinessname] = useState("admin");
    const [room1, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('ADMIN')
    const [chatBusiness, setChatBusiness] = useState([]);
    const [notification, setNotificaton] = useState('');



    const handleDataFromChild = (data) => {
        setShowChat(data);
    };
    const joinRoom = (id) => {

        setRoom(id);

        if (businessname !== "" && room1 !== "") {
            socket.emit("join_room", room1, type);
            // ---------------------------------
            setShowChat(true);
            setNotificaton('');
        }
    }

    useEffect(() => {
        setNotificaton(localStorage.getItem('noti'))
        fetchAllUserChat();

        //admin logout
        return () => {
            socket.emit('adminLogout', 'admin');
            //socket.disconnect();
        }
    }, [])

    const fetchAllUserChat = () => {
        let token = localStorage.getItem('adminToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('/admin//fetch-business-chat-count', config)
            .then((result) => {

                setChatBusiness(result.data.result);

            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="text-center">
                {!showChat ? (
                    <div className='chat-window'>
                        <div className="chat-header">
                            <p>Chat History</p>
                        </div>
                        <div className='chat-body'>
                            <ScrollToBottom className='message-container'>
                                {chatBusiness.map((item, index) => (
                                    <div key={index}>
                                        <div className='chat-request-person'
                                            onClick={() => joinRoom(item.businessDeveloperId)}
                                        >

                                            <div><img src={chatIcon} /> &nbsp;{item.businessDeveloperId}</div>
                                            {notification === item.businessDeveloperId ? <div style={{ color: 'green' }}><AiOutlineBell /></div> : ''}
                                        </div>
                                    </div>
                                ))}

                            </ScrollToBottom>
                        </div>
                        <div className='chat-footer'>

                        </div>

                    </div>
                )
                    : (
                        <BusinessChatAdmin socket={socket} businessnamename={businessname} room={room1} sendDataToParent={handleDataFromChild} />
                    )}
            </div>

        </>
    )
}

export default BusinessLiveChatAdmin