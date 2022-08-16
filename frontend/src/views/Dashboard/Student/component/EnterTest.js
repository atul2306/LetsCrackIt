import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Header from "../../Header/Header";
import style from "../assets/style/entertest.module.css";
import { CircularProgress } from "@material-ui/core";
import { useHttpClient } from "../../../CustomHooks/httpHook";
import { UserContext } from "../../../CustomHooks/reducer/UserContext";
const EnterTest = () => {
  const [check, setcheck] = useState(false);
  const [test, settest] = useState({});
  const { userDetails } = useContext(UserContext);
  const { id } = useParams();
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  useEffect(() => {
    sendRequest(`http://localhost:9000/api/ques/quesbyid/?id=${id}`)
      .then((res) => {
        if (res.ok) {
         // console.log(res.detail);
          settest(res.detail);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [test]);
  const handler = () => {
    const data = {
      Testid: id,
      name: userDetails.name,
      userid: userDetails.id,
      email: userDetails.email,
    };
   // console.log(data);
    sendRequest(
      "http://localhost:9000/api/ques/teststarted",
      "POST",
      JSON.stringify(data),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        if (res.ok) {
          history.push(`/dash/quesdisplay/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.container1}>
          <div className={style.container2}>Name:&nbsp;{userDetails.name} </div>

          <div className={style.container2}>
            Email : &nbsp; {userDetails.email}
          </div>
          <div className={style.container2}>
            Test Name :&nbsp; {test.testName}
          </div>
          <div className={style.container2}>Test Type : {test.testType}</div>

          <div className={style.container2}>
            Test Duration : {test.testDuration * 60} minutes
          </div>
        </div>
        <div className={style.container3}>
          <div className={style.container2} style={{ fontSize: "1.5rem" }}>
            General Instuctions
          </div>
          <ul>
            <li style={{ padding: "6px 6px" }}>
              The examination shall consists of{" "}
              <strong>{test.totalQuestions} Multiple Choice (MCQ), </strong>{" "}
              carring <strong>varying marks </strong> .
            </li>
            <li style={{ padding: "6px 6px" }}>
              Each <strong>MCQ</strong> will have <strong>4 choices</strong> and
              a student shall mark his/her choice of MCQs on the system itself.
            </li>
            <li style={{ padding: "6px 6px" }}>
              Total Test Duration is{" "}
              <strong>{test.testDuration * 60} Minutes.</strong>
            </li>
            <li style={{ padding: "6px 6px" }}>
              There will be <strong>No Negative marking</strong> for any wrong
              answer or non-attempt, and answers will be auto calculated.
            </li>
            <li style={{ padding: "6px 6px" }}>
              You can <strong>Submit</strong> your test whenever you want.
              However, if the test time elapses, the system will automatically{" "}
              <strong>Submit</strong> your test.
            </li>
            <li style={{ padding: "6px 6px" }}>
              <strong>Do not close</strong> any window directly when you are
              taking the test.
            </li>
          </ul>
        </div>
        <div className={style.container3}>
          <div className={style.container2} style={{ fontSize: "1.5rem" }}>
            Navigational Instructions
          </div>
          <ul>
            <li style={{ padding: "6px 6px" }}>
              Select the appropriate answer for each questions. Then click{" "}
              <strong>&quot;Submit&quot;</strong> button to submit that answer.
            </li>
            <li style={{ padding: "6px 6px" }}>
              Click on <strong>&quot;Previous&quot;</strong> button, to move to
              the previous question.
            </li>
            <li style={{ padding: "6px 6px" }}>
              Click on <strong>&quot;SKIP&quot;</strong> button ,to move to the
              next question without submitting.
            </li>
            <li style={{ padding: "6px 6px" }}>
              Every time you submit an answer for a question, Question Number
              Box will turn green in question panel.
            </li>
            <li style={{ padding: "6px 6px" }}>
              Blue color will indicate in which question you are on currently,
              in question panel.
            </li>
          </ul>
        </div>
        <div
          className={style.container3}
          style={{ flexDirection: "row", margin: "18px 18px" }}
        >
          <input
            type="checkbox"
            name="rad"
            value="yes"
            onClick={() => setcheck(!check)}
          />
          &nbsp;
          <i>
            You certify that you are not accepting or utilizing any external
            help to complete the exam, and are the applicable exam taker who is
            responsible for any violation of exam rules. You agree to
            participate in the disciplinary process.
          </i>
        </div>

        <button
          className={style.button}
          style={{ display: check == false ? "none" : "flex" }}
          onClick={handler}
        >
          Ready
        </button>
      </div>
    </>
  );
};

export default EnterTest;
