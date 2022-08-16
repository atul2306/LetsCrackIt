import React, { useContext, useEffect, useState } from 'react'
import style from "../assets/otpconfirm.module.css"
import { useHttpClient } from '../../../CustomHooks/httpHook'
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom';

const OtpConfirm = () => {
     const {id}= useParams()
     console.log(id)
      const [detail,setdetail]=useState({})
     const history= useHistory()
    const {sendRequest,isLoading}= useHttpClient()
    useEffect(()=>{
       sendRequest(
        `http://localhost:9000/api/auth/getDetailsbyid/?id1=${id}`
       )
       .then((res)=>{
           console.log(res.det)
           setdetail(res.det)
       })
       .catch((err)=>{
        console.log(err)
        toast.warn("something went wrong please try again", { position: toast.POSITION.TOP_RIGHT });
       })
    
    },[id])
    const otpVeri=(e)=>{
       e.preventDefault();
       const formdata= new FormData(e.target)
       sendRequest(
        "http://localhost:9000/api/auth/confirm",
        "POST",
        JSON.stringify(Object.fromEntries(formdata)),
        {
            "Content-Type":"application/json"
        }
       )
       .then((res)=>{
          if(res.ok){
            toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });  
            history.push("/");
          }
          else{
            toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
          }
       })
       .catch((err)=>{
          console.log(err);
          toast.warn("something went wrong please try again", { position: toast.POSITION.TOP_RIGHT });
       })
    }
    const resentOtp=(e)=>{
        e.preventDefault();
        sendRequest(
            `http://localhost:9000/api/auth/requestOtp/?id=${id}`
        )
        .then((res)=>{
            if(res.ok){
                toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });  
            }
            else{
                toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
            }
        })
        .catch((err)=>{
            console.log(err);
            toast.warn("something went wrong please try again", { position: toast.POSITION.TOP_RIGHT });
        })
    }
  return (
    <div className={style.container}>
    
    <h1>Please enter the One-Time Password to verify your account</h1>
       <h3>A one-Time Password has been sent to {detail?.email}</h3>
         <form onSubmit={otpVeri} className={style.container1}>
         <input style={{display:"flex",marginBottom:"38px",padding:"25px 25px",border:"none",boxShadow: "rgb(0 0 0) 0px 5px 15px"}} type="text" name="otp" placeholder="OTP"/>
        
         
         <button className={style.button} style={{width:"100px"}}>
              <span>Validate </span>
            </button>
         
         
         </form>
         
         
            <button className={style.button} onClick={resentOtp}>
              <span>Resend OneTime Password </span>
            </button>
         
         {isLoading && <CircularProgress style={{width:"25px" ,height:"25px"}}/> }
    </div>
  )
}

export default OtpConfirm