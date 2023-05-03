import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
const Register = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //    1. prevent page refresh
    event.preventDefault();
    // 2. collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    // 3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const registered = result.user;
        console.log(registered);
      })
      .catch((error) => console.error(error));
  };

  const handleEmailChange = (event) => {
    //   console.log(event.target.value)
    const value = event.target.value;
    setEmail(value);
  };
  const handleChangedPassword = (event) => {
    const value = event.target.value;
    // console.log(value)
    setPassword(value);
  };
  return (
    <div className="text-center">
      <h2 className="text-2xl font-medium mx-4 mt-4">Please Register </h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          className="text-2xl font-medium m-4 border rounded"
          required
        />
        <br />
        <input
          onBlur={handleChangedPassword}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          className="text-2xl font-medium m-4 border rounded "
          required
        />
        <br />
        <input
          type="submit"
          value="Register"
          className="text-2xl font-medium m-4  border rounded-lg px-4 py-2"
        />
      </form>
    </div>
  );
};

export default Register;
