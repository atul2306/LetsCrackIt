import React from 'react'
import Login1 from "./components/Login1"
import Footer from "./components/Footer"
const Login = () => {
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
    <Login1/>
    <Footer/>
    </div>
  )
}

export default Login