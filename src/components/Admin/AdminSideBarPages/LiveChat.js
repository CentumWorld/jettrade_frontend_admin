import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from '../AdminSideBarPages/Chat';
import '../css/LiveChat.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import axios from 'axios';
import chatIcon from '../../../img/user_profile.png'
import { AiOutlineBell } from 'react-icons/ai'


const socket = io.connect('http://localhost:4000');

const LiveChat = () => {

    const [username, setUsername] = useState("admin");
    const [room1, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('ADMIN')
    const [chatUser, setChatUser] = useState([]);
    const [notification, setNotificaton] = useState('');



    const handleDataFromChild = (data) => {
        setShowChat(data);
    };
    const joinRoom = (id) => {

        setRoom(id);

        if (username !== "" && room1 !== "") {
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
        return () =>{
            socket.emit('adminLogout', 'admin');
            //socket.disconnect();
        }
        
    }, [])

    const fetchAllUserChat = () => {
        let token = localStorage.getItem('adminToken');
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.get('/admin/fetch-user-chat-count', config)
            .then((result) => {

                setChatUser(result.data.result);

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
                                {chatUser.map((item, index) => (
                                    <div key={index}>
                                        <div className='chat-request-person'
                                            onClick={() => joinRoom(item.userid)}
                                        >
                                            <div><img src={chatIcon} /> &nbsp;{item.userid}</div> 
                                            {notification === item.userid ?<div style={{color:'green'}}><AiOutlineBell /></div> : ''}
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
                        <Chat socket={socket} username={username} room={room1} sendDataToParent={handleDataFromChild} />
                    )}
            </div>

        </>
    )
}

export default LiveChat