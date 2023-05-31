import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink,useHistory  } from 'react-router-dom';

const LoginFormPage = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setcredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();



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

        history.push('/connect');

      });
  };

  return (
    <div className="loginPage">

      <div id="loginFormContainer">
        <div >
          <form id="loginForm">

            <input placeholder='Username' autoComplete='username' className="form-control" type="text" id="credential" value={credential}
              onChange={e => setcredential(e.target.value)}
            />


            <input placeholder='Password' autoComplete='current-password' className="form-control" type="password" id="password" value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="btn btn-primary btn-block login" type="button" onClick={handleLogin}>
              Login
            </button>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </form>
        </div >
        <div id='createAccountLink'>
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
