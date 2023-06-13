import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState ,useContext} from 'react'

import { db } from '../firebase';
import { AuthContext } from '../contextApi/AuthContext';
import {ChatsContext} from "../contextApi/ChatsContext"

export const Chats = () => {

  
  const [chats, setChats] = useState([])

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatsContext)

  useEffect(()=>{

    const getChats = () =>{

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
     });
   
     return () =>{
       unsub();
     };
    }

    currentUser.uid && getChats();
    
  },[currentUser.uid]);

   const handleSelect = (u)=>{
    dispatch({type: "CHANGE_USER", payload: u});
   }


  return (
    // mapping through the chats collection and showing the latest 
    // messsaages using the sort method from arrays
    <div className='chats'>
      {Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat)=>(


<div className="userChat" key={chat[0]} 
  onClick={()=>handleSelect(chat[1].userInfo)}>
    
      <img src={chat[1].userInfo.photoURL}  />
      <div className="userInfo">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessages?.text}</p>
      </div>
    </div>

      ))}
    

      
</div>
  )
}
