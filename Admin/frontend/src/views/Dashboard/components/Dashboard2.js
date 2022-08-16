import React from 'react'
import style from "../assets/style/dashboard2.module.css"
import { NavLink } from 'react-router-dom'

const Dashboard2 = () => {
  return (
    <div className={style.container}>
     <NavLink style={{textDecoration:"none"}} to="/admin/dash3"> <div className={style.container1}> CONDUCT TEST</div></NavLink>
    </div>
  )
}

export default Dashboard2