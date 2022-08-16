import React, { useContext, useEffect, useState } from "react";
import style from "../assets/style/getallTest.module.css";
import Header from "../Header/Header";
import { useHttpClient } from "../../CustomHooks/httpHook";
import { UserContext } from "../../CustomHooks/reducer/UserContext";
import { NavLink } from "react-router-dom";
import moment from "moment"
const GetallTest = () => {
  const { sendRequest, isloading } = useHttpClient();
  const { userDetails } = useContext(UserContext);
  const [currques, allques] = useState([]);
  const id = userDetails.id;
  useEffect(async () => {
    sendRequest(`http://localhost:9000/api/getalltest/?id=${id}`)
      .then((res) => {
        allques(res.detail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, currques]);

  return (
    <>
      <Header />
      <div className={style.container}>
        {currques.map((curques) => {
          return (
            <div className={style.container1}>
              <h3>{curques.testType}</h3>
              <h3><i>Created At</i> {moment(curques.startTime).format('MMMM Do YYYY, h:mm:ss a')}</h3>
              <NavLink to={`/admin/showques/${curques._id}`}>
                <button className={style.button} style={{ width: "100px" }}>
                  <span>Manage </span>
                </button>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GetallTest;
