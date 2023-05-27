import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SignupFormPage = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);



  if (sessionUser) return (
    <Redirect to="/" />
  );





  const handleSignup = (e) => {
    // Perform login logic here
    // You can use the 'credential' and 'password' state variables
    console.log('Signup button clicked');
    console.log('username:', username);
    console.log('email:', email);
    console.log('Password:', password);
    e.preventDefault();
    if (password == passwordConfirm) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div className='container'>
      <h2>SignUp Page</h2>
      <form>
        <div className="form-outline mb-4">
          <label htmlFor="username">Username:</label>
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="passwordConfirm"> Confirm Password:</label>
          <input
            className="form-control"
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block mb-4" type="button" onClick={handleSignup}>
          Signup
        </button>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </form>
    </div>
  );
};

export default SignupFormPage;
