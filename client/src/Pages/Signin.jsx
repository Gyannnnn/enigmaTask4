import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../Redux/User/userSlice";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const signin = async () => {
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });
      const data = await res.json();
  
      if (res.ok) {
        dispatch(signInSuccess(data.user));  
        alert("Successfully Signed In");
        navigate("/user");
      } else {
        dispatch(signInFailure("Sign-in failed"));
        alert(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log("Error in Signin", error);
    }
  };
  

  return (
    <div className="h-screen w-full bg-zinc-800 text-white flex items-center justify-center">
      <div className="text-white bg-[#0c0c0c] h-[554px] w-[400px] rounded-md border flex flex-col items-center justify-around max-sm:w-[400px] max-sm:h-[600px]">
        <h1 className="text-2xl">Sign In to Your Account</h1>
        <div className="flex flex-col gap-10">
          <div className="flex gap-2 items-center">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline outline-blue-800 rounded px-1 py-2 w-[300px]"
              type="text"
              placeholder="Enter Your Email"
            />
            <MdOutlineMail className="text-white text-2xl hover:text-blue-600" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex w-[300px] items-center rounded-md border-2 border-blue-600">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none px-1 py-2 w-[250px]"
                type={showPassword ? "text" : "password"}
                placeholder="******"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-white text-2xl"
                />
              ) : (
                <FaRegEye
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-white text-2xl"
                />
              )}
            </div>
            <RiLockPasswordFill className="text-white text-2xl hover:text-blue-600" />
          </div>
          <button
            className="bg-blue-600 w-[300px] px-2 py-2 text-center rounded-md"
            onClick={signin}
            disabled={loading} 
          >
            {loading ? "Signing In..." : "Login"}
          </button>
          {error && <p className="text-red-600">{error}</p>} 
        </div>
        <h2>
          Not a user?{" "}
          <Link to="/" className="text-blue-600">
            Sign Up
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Signin;
