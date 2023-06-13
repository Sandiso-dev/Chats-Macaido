import React, { useContext } from 'react'
import {useState} from 'react'

//firebase imports 
import { collection} from "firebase/firestore";
import {  query,where } from "firebase/firestore";
import { setDoc,doc, getDocs,getDoc} from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";

//from my firebase file
import {db} from '../firebase'
import {AuthContext} from '../contextApi/AuthContext'

export const Search = () => {

  const {currentUser} = useContext(AuthContext)

  const  [userName, setUserName] = useState('')
  const  [user, setUser] = useState(undefined)
  const  [erro, setErro] = useState(false)


  const handleSearch = async () =>{
     const q = query(collection(db, "users"),
     where("displayName", "==", userName)
     );
     
     try{
      
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
 
       //IF THE IS A USER THEN 
       setUser(doc.data())
 });
     }catch(erro){
       setErro(true)
     }

  }

// on key "Enter" trigure the handle search function which uses 
//A firebase method "Query"
  const handleKey = (e) =>{
     e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () =>{
    
    // creating a combiled id with emails for currentUser and the user 
    //if currentUser email is bigger than user then add current + user 
    // if not then add usser + currentUser
    const combiledId =
     currentUser.uid > user.uid? 
     currentUser.uid + user.uid:
     user.uid + currentUser.uid;

     try{

    //check if the Collection("chats" from firebase) exists,
    const res = await getDoc(doc(db,"chats", combiledId));
    
    //used the exists method which comes from firebase
    if(!res.exists()){
      //create the chats collection
      await setDoc(doc(db, "chats", combiledId), {messages:[
        
      ]});

      //create userchats nested objects 
      //with the updateDoc method from firebase
      await updateDoc(doc(db, "userChats", currentUser.uid),{
        [combiledId + ".userInfo"]:{
          uid:user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [combiledId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid),{
        [combiledId + ".userInfo"]:{
          uid:currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [combiledId + ".date"]: serverTimestamp(),
      });

    }
 

     }catch(erro){
      setErro(true)
     }

     //clearing the search bar and the user after a successfu update
     setUser(null);
     setUserName('')

  }
  return (
  <div className="search">

    <div className="searchForm">
      <input type="text"
      placeholder='Search your Bestie here'
      onKeyDown={handleKey}
      onChange={e => setUserName(e.target.value)}
      value={user} />
    </div>

    {erro && <span>Sorry the user is not found</span>}

    {user && <div className="userChat" onClick={handleSelect}>
      <img src={user.photoURL} alt="" />
      <div className="userInfo">
        <span>{user.displayName}</span>
      </div>
    </div>}
    
  </div>
  )
}
