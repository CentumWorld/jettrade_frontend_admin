import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import FrenchiseeChatAdmin from '../AdminSideBarPages/FrenchiseeChatAdmin';
import '../css/LiveChat.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import axios from 'axios';
import chatIcon from '../../../img/user_profile.png'
import { AiOutlineBell } from 'react-icons/ai';
import baseUrl from '../../../baseUrl';

const apiurl = baseUrl.apiUrl
const socket = io.connect('http://103.149.68.19:8081');
// const socket = io.connect('http://localhost:4000');

const FrenchiseeLiveChatAdmin = () => {

    const [frenchiseename, setFrenchiseename] = useState("admin");
    const [room1, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('ADMIN')
    const [chatFrenchisee, setChatFrenchisee] = useState([]);
    const [notification, setNotificaton] = useState('');



    const handleDataFromChild = (data) => {
        setShowChat(data);
    };
    const joinRoom = (id) => {

        setRoom(id);

        if (frenchiseename !== "" && room1 !== "") {
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

        axios.get(`${apiurl}`+'/admin/fetch-frenchise-chat-count', config)
            .then((result) => {

                setChatFrenchisee(result.data.result);

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
                                {chatFrenchisee.map((item, index) => (
                                    <div key={index}>
                                        <div className='chat-request-person'
                                            onClick={() => joinRoom(item.frenchiseId)}
                                        >

                                            <div><img src={chatIcon} /> &nbsp;{item.frenchiseId}</div>
                                            {notification === item.frenchiseId ? <div style={{ color: 'green' }}><AiOutlineBell /></div> : ''}
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
                        <FrenchiseeChatAdmin socket={socket} frenchiseename={frenchiseename} room={room1} sendDataToParent={handleDataFromChild} />
                    )}
            </div>

        </>
    )
}

export default FrenchiseeLiveChatAdmin