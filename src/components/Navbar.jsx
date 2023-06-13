import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from "../contextApi/AuthContext"

//used the sign out method from firebase

export const Navbar = (displayName) => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="navbar">
      <span className="logo">
        CHATS MACAIDO
      </span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}
