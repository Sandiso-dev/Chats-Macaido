import React from 'react'
import { AuthContext } from '../contextApi/AuthContext'
import { ChatsContext } from '../contextApi/ChatsContext'
import {useState, useContext,useEffect} from 'react'
import Add from '../photos/addAvatar.png'
import Attach from '../photos/attach.png'
import { async } from '@firebase/util'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const Input = () => {

  const [text,setText] = useState('')
  const [img, setImg] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatsContext);


  const handleSend = async () =>{

    //here i will use the array union form firebase to update messase array i n firebase
    if(img){

      
    //storing the user file
    const storageRef = ref(storage,uuid());
    //uploding it to firebse
    const uploadTask = uploadBytesResumable(storageRef, img);

    
uploadTask.on(
  (error) => {
    // Handle unsuccessful uploads using my erro state above
   // setErr(true);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //then update the profile with the below async function 
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateDoc(doc(db, "chats", data.chatId),{
          messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img:downloadURL,
        }),
      });
    });
  }
);


    } else{
      await updateDoc(doc( db,"chats",data.chatId),{
        messages : arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }

    //Also updating the userchats collection in firebase with adding the 
    //latest messages and sender id to be able to display the messages in chats 

    //updating the current user collection database
    await updateDoc(doc(db,"userChats", currentUser.uid),{
      [data.chatId + ".lastMessages"]:{text},
      [data.chatId + ".date"]:serverTimestamp(),
    })

    //updating the other user's database colllection
    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId + ".lastMessages"]:{text},
      [data.chatId + ".data"]: serverTimestamp(),
    })

    setImg(null)
    setText("")
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Dm your Bestie...'
      onChange={(e)=>setText(e.target.value)}
      value={text}/>

      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" id='file' style={{display:'none'}}
        onChange={e=>setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Add} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
