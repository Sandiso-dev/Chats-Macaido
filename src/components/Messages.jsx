import React from 'react'
import { ChatsContext } from '../contextApi/ChatsContext'
import {useState, useContext,useEffect} from 'react'
import {Message} from './Message'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export const Messages = () => {

  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatsContext);

  useEffect(()=>{
    //fetching data from the chats collects in firebase
    const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unsub()
    }
  },[data.chatId])

  return (
    <div className='messages'>
      {messages.map(m=>(
         <Message message={m} key={m.id}/>
      ))}
       
    </div>
  )
}
