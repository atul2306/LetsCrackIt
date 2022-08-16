import React from "react";
import Dashboard from "./views/Dashboard/Dashboard";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard3 from "./views/Dashboard/components/Dashboard3";

import Login from "./views/Authentication/Login/Login";
import Google from "./views/Authentication/Google Login/Google";
import ShowQues from "./views/Dashboard/components/ShowQues";
import { useAuth } from "./views/CustomHooks/authHook";
import { UserContext } from "./views/CustomHooks/reducer/UserContext";
import GetallTest from "./views/Dashboard/components/GetallTest";
import { Route, Switch, Redirect } from "react-router-dom";
const App = () => {
  const auth = useAuth();
  const authContextVal = {
    login: auth.login,
    userDetails: auth.userDetails,
    token: auth.token,
    logout: auth.logout,
  };

  return (
    <>
      <ToastContainer
        theme="theme"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        transition={Flip}
        toastStyle={{
          backgroundColor: "#1a1a1d",
          color: "white",
          border: "2px solid #c3073f",
        }}
      />
      <UserContext.Provider value={authContextVal}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/auth/:id">
            <Google />
          </Route>
          <Route exact path="/admin/dash" component={Dashboard} />
          <Route exact path="/admin/dash3" component={Dashboard3} />

          <Route exact path="/admin/getAllTest" component={GetallTest} />
          <Route exact path="/admin/showques/:id" component={ShowQues} />
          <Redirect to="/" />
        </Switch>
      </UserContext.Provider>
    </>
  );
};

export default App;
