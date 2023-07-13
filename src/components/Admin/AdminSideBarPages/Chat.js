import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineSend } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'

const Chat = ({ socket ,username, room, sendDataToParent }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userOnline, setUserOnline] = useState(false);
    
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("adminMessgae", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }

    };
    const handleClick = () => {
        const data = false;
        sendDataToParent(data);
        localStorage.removeItem('noti')
      };

    useEffect(() => {
        fetchChatMessage();
        
        //user online or not
        userOnlineOrNOt(room)
        socket.on('userOnline', (userId) =>{
            userOnlineOrNOt(userId)
        })
        

        //admin received message from user
        socket.on("admin_receive_message", (data) => {
            fetchChatMessage();
             //setMessageList((list) => [...list, data])
             console.log(data,'48')
             localStorage.setItem('noti',data.room)

        });



        //Listen for user offline event
        socket.on('userOffline', (userId)=>{
            userOnlineOrNOt(userId)
        })

        
        

        
    }, [socket]);


    const fetchChatMessage = () =>{
        let token = localStorage.getItem('adminToken')
        console.log(room,'40');
        let data = {
            room:room
        }
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
          };
        axios.post('/admin/fetch-chat-message-admin',data,config)
        .then((result)=>{
            console.log(result.data.adminChatMessage)
            //setMessageList((list) => [...list, result.data.adminChatMessage])
            setMessageList(result.data.adminChatMessage)
        })
        .catch(err=>{
            console.log(err.response)
        })
        //console.log(messageList)

    }

    // user online or not
    const userOnlineOrNOt = (data) =>{
        console.log(data);
        const data1 = {
            userid : data
        }
        let token = localStorage.getItem('adminToken');
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post('/admin/user-online-or-not',data1,config)
        .then((res)=>{
            setUserOnline(res.data.isOnline)
        })
        .catch((err)=>{
            console.log(err.response)
        })


    }
    const statusClass = userOnline ? 'online' : 'offline';
    
    return (
        <div className='chat-window'>
            <div className="chat-header1">
                <div className="left-item" onClick={handleClick}><BiArrowBack/></div>
                <div className="centered-item">Live Chat &nbsp; <span className={statusClass}>{userOnline ? 'Online' : 'Offline'}</span></div>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent,index) => {
                        return <div key={index} className='message' id={username === messageContent.author ? "you" : "other"}>
                            <div >
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