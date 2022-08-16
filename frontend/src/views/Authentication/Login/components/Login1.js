import React, { useContext } from 'react'
import { NavLink , useHistory } from 'react-router-dom';
import style from "../assets/style/login.module.css"
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { useHttpClient } from '../../../CustomHooks/httpHook';
import { UserContext } from '../../../CustomHooks/reducer/UserContext';
const Login1 = () => {
    const history= useHistory();
    const {login}= useContext(UserContext)
    const {sendRequest,isLoading}= useHttpClient()
    const loginNow=(e)=>{
        e.preventDefault();
        const formdata= new FormData(e.target)
      sendRequest(
      "http://localhost:9000/api/auth/login",
      "POST",
      JSON.stringify(Object.fromEntries(formdata)),
      {
        "Content-Type": "application/json",
      })
      .then((res)=>{
         if(res.ok){
            login(res.udetail,res.token);
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
           
           history.push("/dash/home");
         }
         else{
          toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
         }
      })
      .catch((err)=>{
         console.log(err)
         toast.warn("something went wrong please try again", { position: toast.POSITION.TOP_RIGHT });
      })
    }
  return (
    <div className={style.container}>
      <div className={style.container1}>
      <h1>Let'sCrack It</h1>
        <h2>Show Case Your Talent</h2>
        <form onSubmit={loginNow}  className={style.container2}>
          <input className={style.container3}  type="email" name="email" placeholder="Email" />
         
          <input className={style.container3} type="password" name="password" placeholder="Password" />
          <div>
          {isLoading && <CircularProgress style={{width:"25px" ,height:"25px"}}/> }
          <button value="submit" className={style.container3} style={{width:"15%",cursor:"pointer",backgroundColor: "#f4511e"}} >Signin</button>
          </div>
          
        </form>
        <div>
          Not Registered? <NavLink style={{ textDecoration: "none" }} to="/auth/register">Register</NavLink>
        </div>
        <div className={style.container4}>
            OR
        </div>

        <h3 style={{display:"flex"}}><img
              style={{ width: "23px" }}
              src="https://img.icons8.com/color/50/000000/google-logo.png"
            />{" "} <a href="http://localhost:9000/auth/google" style={{textDecoration:"none",color: "#b46868"}}>Login with Google</a></h3>
      </div>
    </div>
  );
  
}

export default Login1