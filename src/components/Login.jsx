import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleLoginButtonClick = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(result?.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err?.response?.data);
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body flex-justify-center">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label my-2">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email Id"
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label my-2">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{errorMessage}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={handleLoginButtonClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
