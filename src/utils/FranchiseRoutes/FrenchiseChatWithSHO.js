import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineSend } from 'react-icons/ai'
import { message } from 'antd'
import axios from 'axios'
import baseUrl from '../../baseUrl'

const apiurl = baseUrl.apiUrl

const FrenchiseChatWithSHO = ({ socket, frenchname, room }) => {

    // const [currentMessage, setCurrentMessage] = useState("");
    // const [messageList, setMessageList] = useState([]);
    // const [isFrenchOnline, setIsFrenchOnline] = useState(false);
    // const [frenchOwnDetails,setFrenchOwnDetails] = useState("")
    // const [join, setJoin] = useState('')
    // const sendMessage = async () => {
    //     if (currentMessage !== "") {
    //         const messageData = {
    //             room: room,
    //             author: frenchname,
    //             message: currentMessage,
    //             time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    //             referredId:frenchOwnDetails    
    //         };
    //         await socket.emit("frenchWithSHOMessage", messageData);
    //         setMessageList((list) => [...list, messageData]);
    //         setCurrentMessage("");
    //     }

    // };

    // useEffect(() => {
    //     joinResponse();
    //     frenchiseFetchOwnDetails();
    //     fetchChatMessage();
       
        
    //     //received message from admin
    //     socket.on("french_receive_message", (data) => {
    //         //console.log(data)
    //         //setMessageList((list) => [...list, data])
    //         fetchChatMessage();

    //     });

    //     // admin online
    //     // Listen for admin online
    //     socket.on('frenchWithSHOOnline', (data)=>{
    //         frenchOffline();
    //     })

    //     // Listen for admin offline
    //     socket.on('falnaOffline', (data)=>{
    //         setIsFrenchOnline();
    //     })
    //     //Clean up on component unmount
    //     return () => {
    //         socket.emit('frenchLogout', room);
    //         //socket.disconnect();
    //     }


    // }, [socket]);

    // const joinResponse = () => {

    //     socket.on("frenchResponse", (data) => {
    //         message.success(data);


    //     })
    // }

    // // frenchiseFetchOwnDetails

    //     const frenchiseFetchOwnDetails = () => {
    //         let token = localStorage.getItem('franchiseToken')
    //         // let data1 = {
    //         //     frenchiseId:room
    //         // }
    //         const config = {
    //             headers: { 'Authorization': `Bearer ${token}` }
    //         };
    //         axios.get(`${apiurl}`+'/franchise/get-own-franchise-details',config)
    //         .then((result) => {
    //             console.log(result.data.data.referredId)
    //             setFrenchOwnDetails(result.data.data.referredId)
    //             frenchOffline(result.data.data.frenchiseId);
    //         })
    //         .catch(err => {
    //             console.log(err.response);
    //         })
    //     }


    // // message chat
    // const fetchChatMessage = () => {
    //     let token = localStorage.getItem('franchiseToken')
    //     let data = {
    //         room: room
    //     }
    //     console.log(room,'99 ')
    //     const config = {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     };
    //     axios.post(`${apiurl}`+'/frenchise/frenchise/fetch-chat-with-SHO-message', data, config)
    //         .then((result) => {
    //             const data = {
    //                 frnchise :frenchOwnDetails.frenchiseId
    //             }
              
    //                 console.log(data)
    //             // console.log(result.data.frenchChatMessageWithSHO)
    //             //setMessageList((list) => [...list, result.data.adminChatMessage])
    //             setMessageList(result.data.frenchChatMessageWithSHO)
    //         })
    //         .catch(err => {
    //             console.log(err.response)
    //         })
    //     //console.log(messageList)

    // }

    // const frenchOffline = (id) => {
    //     let token = localStorage.getItem('franchiseToken')
    //     let data = {
    //         frenchiseId:id
    //     }
    //     console.log(id,'121');
    //     const config = {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     };

    //     axios.post(`${apiurl}`+'/frenchise/frenchise/SHO-online-or-not-french',data,config)
    //     .then((res)=>{
    //         setIsFrenchOnline(res.data.isSHOonline)
    //         console.log(res.data.isSHOonline)
    //     })
    //     .catch((err)=>{
    //         console.log(err.response)
    //     })

    // }

    // const statusClass = isFrenchOnline ? 'online' : 'offline';
    // return (
    //     <div className='chat-window'>
    //         <div className='chat-header'>

    //             <p>Live Chat &nbsp;<span className={statusClass}>{isFrenchOnline ? 'Online' : 'Offline'}</span></p> 
                
    //         </div>
    //         <div className='chat-body'>
    //             <ScrollToBottom className='message-container'>
    //                 {messageList.map((messageContent, index) => {
    //                     return <div key={index} className='message' id={frenchname === messageContent.author ? "you" : "other"}>
    //                         <div>
    //                             <div className='message-content'>
    //                                 <p>{messageContent.message}</p>
    //                             </div>
    //                             <div className='message-meta'>
    //                                 <p id="time">{messageContent.time}</p>
    //                                 <p id="author">{messageContent.author}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 })}
    //             </ScrollToBottom>
    //         </div>
    //         <div className='chat-footer'>
    //             <input
    //                 type="text"
    //                 value={currentMessage}
    //                 placeholder='Hey...'
    //                 onChange={(event) => {
    //                     setCurrentMessage(event.target.value);
    //                 }}
    //                 onKeyPress={(event) => {
    //                     event.key === "Enter" && sendMessage();
    //                 }}
    //             />
    //             <button onClick={sendMessage}><AiOutlineSend /></button>
    //         </div>
    //         <div className='chat-footer'>

    //         </div>
    //     </div>
    // )
}

export default FrenchiseChatWithSHO