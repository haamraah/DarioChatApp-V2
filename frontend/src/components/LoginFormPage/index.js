import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

const LoginFormPage = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setcredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);



  if (sessionUser) return (
    <Redirect to="/" />
  );


  const handleLogin = (e) => {

    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="loginPage">

      <div id="loginFormContainer">
        <div id="loginForm">
          <form>
            <div className="form-outline mb-2">
              <input placeholder='Username' autoComplete='username' className="form-control" type="text" id="credential" value={credential}
                onChange={e => setcredential(e.target.value)}
              />
            </div>
            <div className="form-outline mb-2">
              <input placeholder='Password' autoComplete='current-password' className="form-control" type="password" id="password" value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-block login" type="button" onClick={handleLogin}>
              Login
            </button>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </form>
        </div >
        <div>
          <span>Don't you have an account yet?</span>

          <NavLink id='signupButton' to="/signup">Create an account</NavLink>
        </div>
      </div>
<div className='bgLat'></div>
      <div className="bg-image" id='loginBG'>
        <div id='logan'>
          <p id='logo'>
            DARIO
          </p>
          <p>Fast   Simple  Reliable</p>
        </div>
      </div>

    </div>
  );
};

export default LoginFormPage;
