import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    <div className='container'>
      <h2>Login Page</h2>
      <form>
        <div className="form-outline mb-4">
          <label htmlFor="credential">credential:</label>
          <input
            className="form-control"
            type="text"
            id="credential"
            value={credential}
            onChange={e=>setcredential(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block mb-4" type="button" onClick={handleLogin}>
          Login
        </button>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </form>
    </div>
  );
};

export default LoginFormPage;
