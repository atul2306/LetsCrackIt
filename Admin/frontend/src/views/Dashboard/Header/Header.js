import React, { useContext } from 'react'
import style from "./header.module.css"
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../CustomHooks/reducer/UserContext'
const Header = () => {
    const {logout}= useContext(UserContext)
  return (
    <div className={style.container}>
        <div className={style.container1}>
            <div><NavLink to="/admin/getAllTest" style={{textDecoration:"none",color:"black"}}>All Tests</NavLink></div>
            
            <div onClick={logout}><NavLink to="/" style={{textDecoration:"none",color:"black"}} >Logout</NavLink></div>
        </div>
        
    </div>
  )
}

export default Header