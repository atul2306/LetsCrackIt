import React, { useContext } from "react";
import style from "../assets/style/dashboard3.module.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../CustomHooks/reducer/UserContext";
import Header from "../Header/Header";
const Dashboard3 = () => {
  const { userDetails } = useContext(UserContext);
  const id = userDetails.id;
  const history = useHistory();
  const conductTest = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    fetch(`http://localhost:9000/api/conduct/?id1=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formdata)),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          history.push(`/admin/showques/${res.id}`);

          window.alert(res.message);
        } else {
          window.alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checky = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <h1>CONDUCT TEST AND TEST SERIES</h1>
        <form onSubmit={conductTest} className={style.container1}>
          <input
            className={style.container2}
            type="text"
            name="testname"
            placeholder="Test Name"
          />
          <label className={style.container2}>Test Type:</label>
          <div onChange={checky}>
            <input type="radio" value="WEEKLY" name="testtype" />
            <label>WEEKLY</label>
            <input type="radio" value="BIWEEKLY" name="testtype" />
            <label>BIWEEKLY</label>
          </div>
          <div
            className={style.container2}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Start Time</span>
            {/* <input
              style={{ marginRight: "3.7cm" }}
              type="date"
              name="starttime"
            /> */}
            <input
              style={{ marginRight: "3.7cm" }}
              type="datetime-local"
              name="starttime"
            />

            <span>End Time</span>
            <input type="datetime-local" name="endtime" />
          </div>
          <input
            className={style.container2}
            type="number"
            name="testduration"
            placeholder="Test-Duration"
          />
          <input
            className={style.container2}
            type="number"
            name="totalques"
            placeholder="Total-Ques"
          />
          <button className={style.button} style={{ width: "100px" }}>
            <span>Organize </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard3;
