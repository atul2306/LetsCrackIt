import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import style from "../assets/style/quesdisplay.module.css";
import op1 from "../assets/images/1.jpeg";
import op2 from "../assets/images/2.jpg";
import { toast } from "react-toastify";
import moment from "moment";
import { useHttpClient } from "../../../CustomHooks/httpHook";
import { UserContext } from "../../../CustomHooks/reducer/UserContext";
const QuesDisplay = () => {
  const { id } = useParams();
  const { userDetails } = useContext(UserContext);
  const [quesdtails, currquesdtails] = useState({});
  const [state, currstate] = useState(false);
  const { sendRequest, isLoading } = useHttpClient();
  const [ques, displayques] = useState([]);
  const [submitted, currsubmitted] = useState(null);
  const [subm, currsub] = useState(false);
  const [markques, currmarkques] = useState(null);
  const [display,setdisplay]= useState([])
  useEffect(() => {
    sendRequest(`http://localhost:9000/api/ques/quesbyid/?id=${id}`)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          console.log(res.detail);
          currquesdtails(res.detail);
          displayques(res?.detail?.questions);
        } else {
          toast.warn(res.message, { position: "top-right" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  //  add ans

  const toggle = (option, quesno, optionno, quesid) => {
    if (submitted == optionno && markques == quesno) {
      currsubmitted(null);
      currmarkques(null);
    } else {
      currsubmitted(optionno);
      currmarkques(quesno);
    }
    const share = {
      option,
      quesid,
      userid: userDetails.id,
      Testid: id,
    };
    sendRequest(
      "http://localhost:9000/api/ques/submitans",
      "POST",
      JSON.stringify(share),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
          if(res.ok){
            setdisplay(res.testdetail.questions)
            currsub(res.val)
           //  console.log(res.testdetail)
          }
          else{
             console.log("kuch dikkt hai ")
          }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // set ques

  let timer;

  useEffect(() => {
    timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer);
  });
 

  // 
  const setall=(quesid,option)=>{
     
      for(let i=0;i<display.length;i++){
        if(display[i].questionId==quesid && display[i].attemptedAns==option){
           return display[i].attempted
        }
      }
      return false
  }


  return (
    <div className={style.container}>
      <div style={{ display: "flex" }}>
        <div className={style.container1}>10:00</div>{" "}
        <NavLink className={style.container5} to="">
          EndTest
        </NavLink>
      </div>
      {ques.map((currques, id) => {
        return (
          <div key={id} className={style.container2}>
            <div className={style.container3}>
              {id + 1}. {currques.passage}
            </div>
            <div
              key={id}
              className={style.container3}
              style={{ justifyContent: "space-evenly" }}
            >
              {currques?.images?.map((currimages, id1) => {
                return (
                  <img
                    style={{
                      display: "flex",
                      width: "6cm",
                      height: "4cm",
                      padding: "30px 30px",
                    }}
                    src={currimages}
                  />
                );
              })}
            </div>
            <div className={style.container4}>
              {currques?.options?.map((curroption, ide) => {
                return (
                  <div
                    className={style.container6}
                    style={{
                      display: "flex",
                      padding: "8px 8px",
                      margin: "8px 8px",
                      border: "solid",
                      borderRadius: "1rem",
                      color: "#808080f5",
                      cursor: "pointer",
                      backgroundColor:
                       subm && submitted == ide && markques == id
                          ? "#90ee9066"
                          : "white",
                      
                    }}
                    onClick={() =>
                      toggle(
                        curroption.option,
                        id,
                        ide,
                        currques._id,
                       
                      )
                    }
                  >
                    {curroption.option}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuesDisplay;
