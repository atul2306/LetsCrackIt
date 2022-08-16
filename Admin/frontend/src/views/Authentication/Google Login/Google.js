import React, { useContext, useEffect } from 'react'
import { useParams , useHistory} from 'react-router-dom'
import { useHttpClient } from '../../CustomHooks/httpHook'
import { UserContext } from '../../CustomHooks/reducer/UserContext'
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
const Google = () => {
    const {id}= useParams();
    const history= useHistory()
    const {login}= useContext(UserContext)
    const {sendRequest, isLoading}= useHttpClient()
    useEffect(()=>{
       sendRequest(
        `http://localhost:9000/api/auth/getDetailsbyid/?id1=${id}`
       )
       .then((res)=>{
        if(res.ok){
         console.log(res.det,res.token)
            login(res.det,res.token);
            toast.success("Loggedin Successfully 😎😎",{ position: toast.POSITION.TOP_RIGHT })
            history.push("/admin/dash");
        }
        else{
           toast.warn(res.message,{ position: toast.POSITION.TOP_RIGHT })
        }
           
       })
       .catch((err)=>{
        toast.warn("something went wrong please try again", { position: toast.POSITION.TOP_RIGHT });
        console.log(err)
       })
    },[])
  return (
    <>
    <div style={{display:"flex",alignItem:"center",justifyContent:"center"}}>
    { isLoading && <CircularProgress style={{color:"blueviolet"}}/>}
    </div>
       
    </>
  )
}

export default Google
