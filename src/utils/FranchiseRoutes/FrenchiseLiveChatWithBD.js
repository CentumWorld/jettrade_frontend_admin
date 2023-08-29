import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import FrenchiseChatWithBD from '../FranchiseRoutes/FrenchiseChatWithBD';
import '../../../src/components/Admin/css/LiveChat.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import axios from 'axios';
import chatIcon from '../../img/user_profile.png'
import { AiOutlineBell } from 'react-icons/ai';
import baseUrl from '../../baseUrl';

const apiurl = baseUrl.apiUrl
//const socket = io.connect('http://103.149.68.19:8081');
const socket = io.connect('http://localhost:4000');

const FrenchiseLiveChatWithBD = () => {

    const [frenchiseename, setFrenchiseename] = useState(localStorage.getItem('frenchFname'));
    const [room1, setRoom] = useState(localStorage.getItem('frenchiseId'));
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('FRENCH')
    const [chatFrenchisee, setChatFrenchisee] = useState([]);
    const [notification, setNotificaton] = useState('');
    const [frenchiseOwnDetails, setFrenchiseOwnDetails] = useState("");



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
        frenchiseFetchOwnDetails()
        fetchAllUserChat();

        //admin logout
        return () => {
            socket.emit('frenchLogout', room1);
            //socket.disconnect();
        }
    }, [])

    const frenchiseFetchOwnDetails = () => {
        let token = localStorage.getItem('franchiseToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`${apiurl}`+'/franchise/get-own-franchise-details', config)
            .then((result) => {
                  console.log(result.data.data.referralId)
                setFrenchiseOwnDetails(result.data.data.referralId);
                 fetchAllUserChat(result.data.data.referralId)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const fetchAllUserChat = (referralId) => {
        let token = localStorage.getItem('franchiseToken');

        const data = {
            refferedId:referralId
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post(`${apiurl}`+'/frenchise/frenchise/get-business-chat-count-with-frenchise', data,config)
            .then((result) => {
                 console.log(result.data.frenchChatCount,'82')
                 setChatFrenchisee(result.data.frenchChatCount);
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
                        <FrenchiseChatWithBD socket={socket} statename={frenchiseename} room={room1} sendDataToParent={handleDataFromChild} />
                    )}
            </div>

        </>
    )
}

export default FrenchiseLiveChatWithBD