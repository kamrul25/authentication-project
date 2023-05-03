import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    //    1. prevent page refresh
    event.preventDefault();
    // 2. collect form data
    setSuccess("");
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log(name, email, password);
    // 3. create user in firebase

    // validate
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please add at least two numbers");
      return;
    } else if (password.length < 6) {
      setError("Please add at least 6 characters in your password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const registered = result.user;
        console.log(registered);
        setError("");
        event.target.reset();
        setSuccess("User has been create successfully!!");
        sendVerificationEmail(registered)
        updateUserData (registered, name)
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
   
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert('Please verify your email address')
        })
}
const updateUserData = (user, name) => {
  updateProfile(user, {
      displayName: name
  })
      .then(() => {
          console.log('user name updated')
      })
      .catch(error => {
          setError(error.message);
      })
}

  const handleEmailChange = (event) => {
    //   console.log(event.target.value)
    const value = event.target.value;
  };
  const handleChangedPassword = (event) => {
    const value = event.target.value;
    // console.log(value)
  };
  return (
    <div className="text-center">
      <h2 className="text-2xl font-medium mx-4 mt-4">Please Register </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          className="text-2xl font-medium m-4 border rounded"
          required
        />
        <br />
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
      <h2 className="text-2xl text-red-600 font-medium mt-5">{error}</h2>
      <h2 className="text-2xl text-green-500 font-medium mt-5">{success}</h2>
    </div>
  );
};

export default Register;
