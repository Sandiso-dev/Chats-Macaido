import React from 'react'
import {Sidebar} from '../components/Sidebar'
import {Inbox} from '../components/Inbox'

export const Home = () => {
  return (
   <div className="home">
    <div className="container">
      <Sidebar/>
      <Inbox/>
    </div>
   </div>
  )
}
