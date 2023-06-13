import React, { useEffect, useRef } from 'react'
import { AuthContext } from '../contextApi/AuthContext'
import { ChatsContext } from '../contextApi/ChatsContext'
import {useContext} from 'react'
import Pic from '../photos/3.jpg'

export const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatsContext)

  
  // using the useref and useEffect hooks to modifie the message view to scroll to the latest message

  const ref  = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  return (
    // user message with his/her profile avatar
    // With a condition for sender messages photo to show which photo at what condition
    <div ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>

     <div className="messageInfo">
        <img src={message.senderId === currentUser.uid?
                  currentUser.photoURL 
                  : data.user.photoURL} alt="" />
        <span>Just now</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt=""  />}
        
      </div> 

    </div>
  )
}
