import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Register } from './Register';

//firebase methods
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'

export const Login = () => {

  const [erro, setErr] = useState(false);
  const navigate = useNavigate()



  // retieving the input values with this function to get user information to creating a user object data in firebase
  // futher down at first ill use Authentication to create the user and uploading images 
  // use FireStore database for searching for other users
  const handleSubmit = async (event) =>{
    
    event.preventDefault()
    const email = event.target[0].value;
    const password = event.target[1].value;
  



try{
  //sign in with email and password method from firebase
  await signInWithEmailAndPassword(auth, email, password);
  navigate("/")

}catch(erro){
setErr(true)
}

 

  }

  return (
    <div className="formContainer">
    <div className="formWrapper">
        <span className="logo">Don Chats</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
        
            <input type="email" placeholder='Your email besty'/>
            <input type="password" placeholder='then Your Password' />
            <button>Sign in</button>
        </form>
        {erro && <span>Something in what you typed is wrong try again Bestie</span>}
        <p>Yoo're no one of us? <Link to='/register'>Register</Link></p>
    </div>
</div>
  )
}
