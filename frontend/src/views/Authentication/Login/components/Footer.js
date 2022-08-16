import React from 'react'
import style from "../assets/style/footer.module.css"
import { useHttpClient } from "../../../CustomHooks/httpHook";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
const Footer = () => {
    const { sendRequest, isLoading } = useHttpClient();
  
 
    const feedbackSubmit = (e) => {
      e.preventDefault();
      const formdata = new FormData(e.target);
            
      
      sendRequest(
        "http://localhost:9000/api/auth/feedback",
        "POST",
        JSON.stringify(Object.fromEntries(formdata)),
        {
          "Content-Type": "application/json",
        }
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
          console.log(err)
          toast.warn("something went wrong please try again", { position: toast.POSITION.TOP_RIGHT });
      })
    };
    return (
      <div className={style.container}>
        <div className={style.container1}>
          <div style={{display:"flex"}}>
            LetsCrackIt{" "}
            <img
              style={{ alignItem: "baseline", flexDirection: "row" }}
              src="https://img.icons8.com/material-rounded/24/000000/copyright.png"
            />
            2021
          </div>
          <span>Design Developed and Maintained</span>
          by Atul
          <div
            style={{
              display: "flex",
              width: "100px",
              justifyContent: "space-evenly",
            }}
          >
            <a href="ranjanatul73@gmail.com">
              <img src="https://img.icons8.com/material-outlined/24/000000/gmail-new.png" />
            </a>
            <a href="https://www.instagram.com/atul_ranjan.23/">
              <img src="https://img.icons8.com/material-outlined/24/000000/instagram-new--v1.png" />
            </a>
            <a href="https://www.linkedin.com/in/atul-ranjan-250760195/">
              <img src="https://img.icons8.com/material-outlined/24/000000/linkedin--v1.png" />
            </a>
          </div>
        </div>
        <div className={style.container2}>
          SEND US A MESSAGE
          <form onSubmit={feedbackSubmit} className={style.container3}>
            <input
              className={style.container4}
              type="text"
              name="description"
              placeholder="DESCRIPTION"
            />
            <input
              className={style.container4}
              type="email"
              name="email"
              placeholder="EMAIL"
            />
            <textarea
              name="message"
              rows="5"
              cols="48"
              style={{
                resize: "none",
                padding: "5px 5px",
                color: "white",
                backgroundColor: "#1a1a1dc1",
                marginBottom: "4px",
              }}
              placeholder="MESSAGE"
            />
            <div>
            {isLoading && <CircularProgress style={{width:"25px" ,height:"25px"}}/> }
            <button type="submit" style={{ cursor: "pointer" }}>
              SEND
            </button>
            </div>
            
          </form>
        </div>
      </div>
    );
}

export default Footer