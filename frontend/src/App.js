// frontend/src/App.js
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Connect from "./components/Connect";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  let sessionLinks
  if (sessionUser) {
    sessionLinks = (
      <Connect isLoaded={isLoaded} />
    );
  }
  return (
    <>
      {sessionLinks}
      {isLoaded && (

        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <LoginFormPage />

          </Route>
          <Route path="/connect">


          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
