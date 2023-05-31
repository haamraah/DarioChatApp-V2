import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

const SignupFormPage = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);



  if (sessionUser) return (
    <Redirect to="/" />
  );



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const isSignupDisabled = () => {
    return (
      firstname.length < 1 ||
      lastname.length < 1 ||
      username.length < 1 ||
      password.length < 1 ||
      !isChecked
    );
  };
  const handleSignup = (e) => {
    const user = { firstname, lastname, username, email, password }
    console.log('Signup button clicked');
    console.log('user', user);

    e.preventDefault();
    if (password == passwordConfirm) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstname, lastname, username, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      setErrors(['Passwords Dosnt match'])
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="signupPage">

      <div id="signupFormContainer">
        <div >

          <form id="signupForm">
            <div className="form-control bg-primary text-white" id='createAccountLink'>
              <span className=' ml-4' >Already have an account? </span>
              <NavLink className='text-dark mr-4' id='signupButton' to="/login">Login</NavLink>

            </div>
            <input className="form-control" placeholder='First name' type="text" id="firstname" value={firstname} onChange={e =>
              setFirstname(e.target.value)}
            />
            <input className="form-control" placeholder='Last name' type="text" id="lastname" value={lastname} onChange={e =>
              setLastname(e.target.value)}
            />
            <input className="form-control" autoComplete='username' placeholder='Username' type="text" id="username" value={username} onChange={e =>
              setUsername(e.target.value)}
            />
            <input className="form-control" autoComplete='username' placeholder='Email' type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}
            />
            <input className="form-control" autoComplete='new-password' placeholder='Password' type="password" id="password" value={password} onChange={e =>
              setPassword(e.target.value)}
            />
            <input className="form-control" autoComplete='new-password' placeholder='Confirm Password' type="password" id="passwordConfirm" value={passwordConfirm} onChange={e =>
              setPasswordConfirm(e.target.value)}
            />
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {/*        PROFILE PICTURE UPLOAD TODO
*******************************************************    
            <button
              className="btn btn-primary btn-block mb-2 pp"
              type="button"
              onClick={() => {
                document.getElementById("profilePicture").click();
              }}
            >
              Profile Picture
            </button> */}
            <div className="mb-2 form-control input-group">
              <input type="checkbox" id="agreeCheckbox" checked={isChecked} onChange={handleCheckboxChange} />
              <label htmlFor="agreeCheckbox">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              disabled={isSignupDisabled()}
              className="btn btn-primary btn-block mb-2 signup"
              type="button"
              onClick={handleSignup}>
              Signup
            </button>

          </form>
        </div>
        <ul className='errorList'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
      <div className='bgLat'></div>

      <div className="bg-image" id='loginBG'>
        <div id='logan'>
          <p id='logo'>
            DARIO
          </p>
          <p>Fast Simple Reliable</p>
        </div>
      </div>

    </div>
  );
};

export default SignupFormPage;
