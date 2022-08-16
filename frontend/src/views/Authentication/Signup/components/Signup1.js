import React from "react";
import { useHttpClient } from "../../../CustomHooks/httpHook";
import { CircularProgress } from "@material-ui/core";
import style from "../assets/signup.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const Signup1 = () => {
   const history= useHistory()
  const {sendRequest,isLoading}= useHttpClient()
   const RegisterData=(e)=>{
    
     e.preventDefault();
     const formdata= new FormData(e.target)
     console.log(formdata)
      sendRequest(
      "http://localhost:9000/api/auth/signup",
      "POST",
      JSON.stringify(Object.fromEntries(formdata)),
      {
        "Content-Type": "application/json",
      })
      .then((res)=>{
        console.log(res)
         if(res.ok){
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
           history.push(`/auth/confirmotp/${res.id}`);
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
      <h1>Let's Crack It</h1>
        <h2>Show Case Your Talent</h2>
        <form onSubmit={RegisterData} className={style.container2}>
          <input className={style.container3}  type="email" name="email" placeholder="Email" />
          <input className={style.container3} type="text" name="name" placeholder="Name" />
          <input className={style.container3} type="password" name="password" placeholder="Password" />
          <div>
          {isLoading && <CircularProgress style={{width:"25px" ,height:"25px"}}/> }
          <button value="submit" className={style.container3} style={{width:"15%",cursor:"pointer",backgroundColor: "#f4511e"}} >Register</button>
          </div>
          
        </form>
        <div>
          Already Registered? <NavLink style={{ textDecoration: "none"}} to="/">Login</NavLink>
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
};

export default Signup1;
