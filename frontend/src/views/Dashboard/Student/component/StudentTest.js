import React, { useEffect, useState } from 'react'
import style from "../assets/style/studenttest.module.css"
import { useHttpClient } from '../../../CustomHooks/httpHook'
import { NavLink } from 'react-router-dom'
import moment from "moment"
const StudentTest = () => {
  const {sendRequest,isLoading} = useHttpClient()
  const [test,settestType]=useState([])
   useEffect(()=>{
      sendRequest(`http://localhost:9000/api/ques/alltest`)
      .then((res)=>{
        console.log(res)
        settestType(res.alltest);
      })
      .catch((err)=>{
        console.log(err)
      })
   },[])
  return (
    <div className={style.container}>
        <h1>CONTEST AND TEST SERIES</h1>
        {
          test.map((curTest,id)=>{
             return (
              <div className={style.container1}>
            <h4>Join this {curTest.testDuration * 60} min contest</h4>
            <span><i>{curTest.testName}</i></span>
            <h2><b>{curTest.testType} TEST {id+1}</b></h2>
            <h4>Join at  <b>{moment(curTest.startTime).format('MMMM Do YYYY')}</b> between</h4>
            <b>{moment(curTest.startTime).format('h:mm a')} - {moment(curTest.endTime).format('h:mm a')}</b>
            
            <button  className={style.button} >
            <NavLink style={{color:"black"}}  to={curTest.resultPublish?`/dash/checkResult/${curTest._id}`:`/dash/entertest/${curTest._id}`}><span>{curTest.resultPublish?"Check Your Result":"Enter the Test"} </span></NavLink>
              
            </button>
        </div> 
             );
          })
        }
        
        
    </div>
  )
}

export default StudentTest