import React, { useContext } from 'react'
import {ChatsContext} from "../contextApi/ChatsContext"
import Cam from '../photos/cam.png'
import Add from '../photos/add.png'
import { Messages } from './Messages'
import {Input} from './Input'


export const Inbox = () => {

  const {data} = useContext(ChatsContext);
  return (
    <div className='inbox'>

      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <img src={data.user.photoURL} alt="" 
        className='profilePic'/> 
      </div>

      <Messages/>
      <Input/>
    </div>
  )
}
