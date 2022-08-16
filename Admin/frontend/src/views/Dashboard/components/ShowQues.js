import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import style from "../assets/style/showques.module.css";
import Header from "../Header/Header";
import { useHttpClient } from "../../CustomHooks/httpHook";
import { toast } from "react-toastify";

const ShowQues = () => {
  const { id } = useParams();
  const { sendRequest, isLoading } = useHttpClient();
  const [details, setdetails] = useState({});
  const [detail, setdetail] = useState([]);
  const [update, setupdate] = useState(false);
  const [check, currcheck] = useState(null);
  const [addquess, curraddques] = useState(false);
  const [ref, setref] = useState(false);
  const [option,correctoption]= useState({});
  const history = useHistory();
 

  useEffect(() => {
    sendRequest(`http://localhost:9000/api/gettestdetail/?id=${id}`)
      .then((res) => {
          console.log(res.detail);
        setdetails(res.detail);
        setdetail(res.detail.questions)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update, ref,addquess]);
  const updateques = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    sendRequest(
      `http://localhost:9000/api/updatedetail/?id=${id}`,
      "POST",
      JSON.stringify(Object.fromEntries(formdata)),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        console.log(update);
        if (res.ok) {
          if (update === true) setupdate(false);
          else setupdate(true);
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((err) => {
        toast.warn("something went wrong please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      });
  };
  const toggle = (key) => {
    if (check === key) {
      return currcheck(null);
    }
    currcheck(key);
  };

  // Add Ques

  const modaladd = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    sendRequest(`http://localhost:9000/api/ques/?id=${id}`, "POST", formdata)
      .then((res) => {
        if (res.ok) {
          history.push(`/admin/showques/${res.all._id}`);
          toast.success(res.message, { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.warn(res.message, { position: toast.POSITION.TOP_RIGHT });
        }
      })
      .catch((err) => {
        toast.warn("something went wrong please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      });
  };

  // find correct option
  // const findCorrectans=(id)=>{
  //    sendRequest(`http://localhost:9000/api/ques/getanswer/?id=${id}`)
  //    .then((res)=>{
  //       if(res.ok){
  //         return res.ans;
  //       }
  //    })
  //    .catch((err)=>{
  //      console.log(err)
  //    })
  // }


  return (
    <>
      <Header style={{ visibility: addquess ? "collapse" : "visible" }} />

      <div className={style.container}>
        {!addquess && (
          <form onSubmit={updateques} className={style.container1}>
            <input
              className={style.container2}
              type="text"
              name="testname"
              placeholder={details.testName}
            />
            <span className={style.container2}>Test Type:</span>
            <div>
              <input type="radio" value="WEEKLY" name="testtype" />
              <span>WEEKLY</span>
              <input type="radio" value="BIWEEKLY" name="testtype" />
              <span>BIWEEKLY</span>
            </div>
            <div
              className={style.container2}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Start Time</span>
              <input
                style={{ marginRight: "3.7cm" }}
                type="date"
                name="starttime"
              />

              <span>End Time</span>
              <input type="date" name="endtime" />
            </div>
            <input
              className={style.container2}
              type="number"
              name="testduration"
              placeholder={details.testDuration}
            />
            <input
              className={style.container2}
              type="number"
              name="totalques"
              placeholder={details.totalQuestions}
            />
            <button className={style.button} style={{ width: "100px" }}>
              <span>UPDATE </span>
            </button>
          </form>
        )}

        <div
          className={style.container3}
          style={{ visibility: addquess ? "collapse" : "visible" }}
        >
          {detail.map((cu, key) => {
           // const ans=findCorrectans(cu._id)
           // console.log(cu._id,ans)
            
            return (
              <div className={style.container4}>
                <div
                  onClick={() => toggle(key)}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <h2>Ques</h2>
                  <h1>{check === key ? "-" : "+"}</h1>
                </div>
                {check === key && (
                  <p style={{ backgroundColor: "#b7d8ed", padding: "2px 2px" }}>
                    <span style={{ color: "orange", fontWeight: "bold" }}>
                     
                      
                       {cu?.passage}
                    </span>
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      <span style={{ color: "black" }}>Explanation:</span>
                     
                       {cu?.solution}
                      
                    </span>
                    
                    
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => curraddques(!addquess)}
          className={style.button}
          style={{
            width: "130px",
            visibility: addquess ? "collapse" : "visible",
          }}
        >
          <span>Add Ques </span>
        </button>
        {addquess && (
          <div
            className={style.container5}
            style={{
              boxShadow: "var(--toastify-color-dark) 0px 5px 15px",
              position: "absolute",
              overflowY: "auto",
              height: "85%",
            }}
          >
            <form onSubmit={modaladd} className={style.container5}>
              <label>Ques Type:</label>
              <select name="quesType">
                <option>MCQ</option>
                <option>One Word</option>
              </select>
              <label>Ques</label>

              <textarea
                name="ques"
                rows="6"
                cols="50"
                style={{ resize: "none" }}
              ></textarea>
              <label>Select images:</label>
              <input type="file" name="image" multiple></input>
              <label>Options:</label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" placeholder="Option1" name="option1" />
                <input type="text" placeholder="Option2" name="option2" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" placeholder="Option3" name="option3" />
                <input type="text" placeholder="Option4" name="option4" />
              </div>
              <input
                style={{ display: "flex", marginTop: "8px" }}
                type="number"
                placeholder="Marks"
                name="marks"
              />
              <input
                style={{ display: "flex", marginTop: "8px" }}
                type="text"
                placeholder="Topic"
                name="topic"
              />
              <input
                style={{ display: "flex", marginTop: "8px" }}
                type="text"
                placeholder="Correct Ans"
                name="correctans"
              />
              <label>Solution</label>

              <textarea
                name="solution"
                rows="6"
                cols="50"
                style={{ resize: "none" }}
              ></textarea>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <button style={{ cursor: "pointer" }} type="submit">
                  Add Ques
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => curraddques(!addquess)}
                  type="reset"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowQues;
