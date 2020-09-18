import React, { useState, useContext } from "react";
//import {Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  //const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { firstname, lastname, email, password, confirmpassword};
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      alert("Registered Successfully")
      //history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
      <label htmlFor="register-firstname">FirstName</label>
        <input
          id="register-firstname"
          type="text"
          className="form-control-sm"
          onChange={(e) => setFirstName(e.target.value)}
        />

      <label htmlFor="register-lastname">LastName</label>
        <input
          id="register-lastname"
          type="text"
          className="form-control"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="register-password">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}