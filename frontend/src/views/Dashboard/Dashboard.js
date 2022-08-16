import React from 'react'
import style from "./assets/style/dashboard.module.css"
import Footer from "../Authentication/Signup/components/Footer"
import Header from "./Header/Header"
import { NavLink } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className={style.container}>
    <NavLink className={style.container1} style={{textDecoration:"none",color:"black"}} to="/dash/student">STUDENT</NavLink>
        <div className={style.container1}>ORGANIZER</div>
    </div>
    <Footer/>
    </> 
  )
}

export default Dashboard