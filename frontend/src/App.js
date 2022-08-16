import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./views/Authentication/Signup/Signup";
import Login from "./views/Authentication/Login/Login";
import OtpConfirm from "./views/Authentication/Signup/components/OtpConfirm";
import Student from "./views/Dashboard/Student/Student";
import Google from "./views/Authentication/Google Login/Google";
import Dashboard from "./views/Dashboard/Dashboard";
import EnterTest from "./views/Dashboard/Student/component/EnterTest";
import CheckResult from "./views/Dashboard/Student/component/CheckResult";
import QuesDisplay from "./views/Dashboard/Student/component/QuesDisplay";
import { useAuth } from "./views/CustomHooks/authHook";
import { UserContext } from "./views/CustomHooks/reducer/UserContext";
const App = () => {
  const auth = useAuth();
  const [routes, setroutes] = useState(null);
  const authContextVal = {
    login: auth.login,
    userDetails: auth.userDetails,
    token: auth.token,
    logout: auth.logout,
  };

  useEffect(() => {
    let route = null;
    if (auth.token) {
      route = (
        <Switch>
          <Route exact path="/dash/home">
            <Dashboard />
          </Route>
          <Route exact path="/dash/student">
            <Student />
          </Route>
          <Route exact path="/dash/entertest/:id">
            <EnterTest />
          </Route>
          <Route exact path="/dash/checkResult/:id">
            <CheckResult />
          </Route>
          <Route exact path="/dash/quesdisplay/:id">
            <QuesDisplay />
          </Route>
          <Redirect to="/dash/home"></Redirect>
        </Switch>
      );
    } else {
      route = (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/auth/register">
            <Signup />
          </Route>
          <Route exact path="/auth/confirmotp/:id">
            <OtpConfirm />
          </Route>

          <Route exact path="/auth/:id">
            <Google />
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }
    setroutes(route);
  }, [auth.token]);
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
        <Router>{routes}</Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
