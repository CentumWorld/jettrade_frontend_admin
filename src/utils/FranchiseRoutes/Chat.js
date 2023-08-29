import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineSend } from 'react-icons/ai'
import { message } from 'antd'
import axios from 'axios'
import baseUrl from '../../baseUrl'

const apiurl = baseUrl.apiUrl

const Chat = ({ socket, frenchname, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isFrenchOnline, setIsFrenchOnline] = useState(false);
    const [join, setJoin] = useState('')
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: frenchname,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("frenchMessage", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }

    };

    useEffect(() => {
        joinResponse();
        fetchChatMessage();
        frenchOffline();



        //received message from admin
        socket.on("french_receive_message", (data) => {
            //console.log(data)
            //setMessageList((list) => [...list, data])
            fetchChatMessage();

        });

        // admin online
        // Listen for admin online
        socket.on('frenchOnline', (data)=>{
            frenchOffline();
        })

        // Listen for admin offline
        socket.on('falnaOffline', (data)=>{
            frenchOffline();
        })
        //Clean up on component unmount
        return () => {
            socket.emit('frenchLogout', room);
            //socket.disconnect();
        }


    }, [socket]);

    const joinResponse = () => {

        socket.on("frenchResponse", (data) => {
            message.success(data);


        })
    }

    // message chat
    const fetchChatMessage = () => {
        console.log('77 ')
        let token = localStorage.getItem('franchiseToken')
        let data = {
            room: room
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post(`${apiurl}`+'/franchise/frenchise/fetch-chat-message', data, config)
            .then((result) => {
                console.log(result.data.frenchChatMessage)
                //setMessageList((list) => [...list, result.data.adminChatMessage])
                setMessageList(result.data.frenchChatMessage)
            })
            .catch(err => {
                console.log(err.response)
            })
        //console.log(messageList)

    }

    const frenchOffline = () => {
        let token = localStorage.getItem('franchiseToken')

        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.get(`${apiurl}`+'/franchise/frenchise/admin-online-or-not-french',config)
        .then((res)=>{
            setIsFrenchOnline(res.data.isOnline)
        })
        .catch((err)=>{
            console.log(err.response)
        })

    }

    const statusClass = isFrenchOnline ? 'online' : 'offline';
    return (
        <div className='chat-window'>
            <div className='chat-header'>

                <p>Live Chat &nbsp;<span className={statusClass}>{isFrenchOnline ? 'Online' : 'Offline'}</span></p> 
                
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        return <div key={index} className='message' id={frenchname === messageContent.author ? "you" : "other"}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}><AiOutlineSend /></button>
            </div>
            <div className='chat-footer'>

            </div>
        </div>
    )
}

export default Chat