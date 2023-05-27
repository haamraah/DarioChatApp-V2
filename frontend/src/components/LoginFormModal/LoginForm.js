import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form>
    <div className="form-outline mb-4">
      <label htmlFor="credential">credential:</label>
      <input
        className="form-control"
        type="text"
        id="credential"
        value={credential}
        onChange={e=>setCredential(e.target.value)}
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
    <button className="btn btn-primary btn-block mb-4" type="button" onClick={handleSubmit}>
      Login
    </button>
    <ul>
      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    </ul>
  </form>
  );
}

export default LoginForm;
