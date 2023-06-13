import React, { useState } from 'react'
import Add from '../photos/addAvatar.png'
import {useNavigate, Link} from 'react-router-dom'
import { Home } from './Home'

//imports for authentication and userCreation from firebase
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {auth, storage,db} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc} from "firebase/firestore";


export const Register = () => {
  const [erro, setErr] = useState(false);
  const navigate = useNavigate()



  // retieving the input values with this function to get user information to creating a user object data in firebase
  // futher down at first ill use Authentication to create the user and uploading images 
  // use FireStore database for searching for other users
  const handleSubmit = async (event) =>{
    
    event.preventDefault()
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];



try{
  
  //creating a user with the method from firebase docs
  const ress = await createUserWithEmailAndPassword(auth, email, password);

  //console.log(ress)

  //storing the user file
const storageRef = ref(storage, displayName);
//uploding it to firebse
const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on(
  (error) => {
    // Handle unsuccessful uploads using my erro state above
    setErr(true);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //then update the profile with the below async function 
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(ress.user,{
        displayName,
        photoURL: downloadURL,
      });

      //Creating a document/account
      //with this i intend to create a feature where users can search other users
      //Using the fireStore database with setdocs method 

      //this doc is for creating a user with their userCredentials
      await setDoc(doc(db,"users",ress.user.uid),{
        uid: ress.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
        
      })

      //this doc is for user chats 
      await setDoc(doc(db, "userChats", ress.user.uid),{});

      //after successful registration send the user to home page
      navigate('/')
    });
  }
);

}catch(erro){
setErr(true)
}

 

  }
  return (
<div className="formContainer">
    <div className="formWrapper">
        <span className="logo">Don Chats</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' id='text'/>
            <input type="email" placeholder='Your Email' id='email'/>
            <input type="password" placeholder='then Your Password' id='password' />
            <input style={{display:'none'}} type="file" id='file'/>
            <label htmlFor="file">
                <img src={Add} alt="your avatar" />
                <span>Add your Avatar</span>
            </label>
            <button>Sign up</button>
            {erro && <span>Something fishy is going on please re-type your Logins Bestie</span>}
        </form>
        <p>Yoo're one of us? <Link to='/login'>Login</Link></p>
    </div>
</div>
  )
}
