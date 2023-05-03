import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
function Login() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleSubmit = (event) => {
    // 1. prevent page refresh
    event.preventDefault();
    // Submit the form data to the server
    // 2. collect form data
    setSuccess("");
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    // validate
    // if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
    //   setError("Please add at least two uppercase.");
    //   return;
    // } else if (!/(?=.*[!@#$&*])/.test(password)) {
    //   setError("Please add a special character.");
    //   return;
    // } else if (password.length < 6) {
    //   setError("Password must be 6 characters long");
    //   return;
    // }

    // 3. create user in firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (!loggedUser.emailVerified) {
        }
        setSuccess("User login successful.");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailRef}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              className="px-4 py-2 text-white bg-blue-400 rounded-lg border-black"
            />
          </form>
          
          <p>
            <small>
              Forget Password? Please{" "}
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 text-white bg-blue-400 rounded-lg border-black"
              >
                Reset Password
              </button>
            </small>
          </p>
          <p  className="mt-4">
            <small>
              New to this website? Please sign up <Link to="/signUp"  className="px-4 py-2 border rounded-lg border-black">Register</Link>
            </small>
          </p>
          <p className="text-red-500 text-2xl">{error}</p>
          <p className="text-green-500 text-2xl">{success}</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
