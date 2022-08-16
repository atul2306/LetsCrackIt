import React from "react";
import style from "../assets/style/dashboard1.module.css";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useHttpClient } from "../../CustomHooks/httpHook";
const Dashboard1 = () => {
  const { id } = useParams();
  const {sendRequest,isLoading}=  useHttpClient()
  const submitQues = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

   // console.log(id);
   sendRequest(`http://localhost:9000/api/ques/?id=${id}`,
     "POST",
     formdata
   ).then((res) => {
        if (res.ok) {
          window.alert(res.message);
          console.log(res.allQuestions);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Header/>
      <div className={style.container}>
        <div className={style.container1}>
          <h1>ADD QUES NOW</h1>
          <form onSubmit={submitQues} className={style.container2}>
            <label>Ques Type:</label>
            <select name="quesType">
              <option>MCQ</option>
              <option>One Word</option>
            </select>
            <label>Ques</label>

            <textarea
              className={style.container3}
              name="ques"
              rows="6"
              cols="50"
              style={{ resize: "none" }}
            ></textarea>
            <label>Select images:</label>
            <input
              className={style.container3}
              type="file"
              name="image"
              multiple
            ></input>
            <label>Options:</label>
            <input type="text" placeholder="Option1" name="option1" />
            <input type="text" placeholder="Option2" name="option2" />
            <input type="text" placeholder="Option3" name="option3" />
            <input
              className={style.container3}
              type="text"
              placeholder="Option4"
              name="option4"
            />
            <input
              className={style.container3}
              type="number"
              placeholder="Marks"
              name="marks"
            />
            <input
              className={style.container3}
              type="text"
              placeholder="Topic"
              name="topic"
            />
            <input
              className={style.container3}
              type="text"
              placeholder="Correct Ans"
              name="correctans"
            />
            <label>Solution</label>

            <textarea
              className={style.container3}
              name="solution"
              rows="6"
              cols="50"
              style={{ resize: "none" }}
            ></textarea>
            <div>
              <input className={style.container3} type="submit"></input>
              <input className={style.container3} type="reset"></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard1;
