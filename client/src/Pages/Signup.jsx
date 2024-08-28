import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const emailChange = (val) => {
    if (val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailError(false);
      setEmail(val);
    } else {
      setEmailError(true);
    }
  };

  const passwordChange = (val) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (passwordRegex.test(val)) {
      setPasswordError(false);
      setPassword(val);
    } else {
      setPasswordError(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Signed Up Successfully");
        navigate("/signin");
      } else {
        console.error('Sign up failed');
        alert('Sign up failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='h-screen w-full bg-zinc-800 text-white flex items-center justify-center'>
      <div className="text-white bg-[#0c0c0c] h-[554px] w-[480px] rounded-md border flex flex-col items-center justify-around max-sm:w-[400px] max-sm:h-[600px]">
        <h1 className="text-4xl">Create Account</h1>
        <div className="flex flex-col gap-10">
          <div className="flex gap-2 items-center">
            <input
              className="bg-transparent outline outline-blue-800 rounded px-1 py-2 w-[300px]"
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <CiUser className="text-white text-2xl hover:text-blue-600" />
          </div>
          <div className="flex gap-2 items-center">
            <input
              onChange={(e) => emailChange(e.target.value)}
              className={`bg-transparent outline ${
                emailError ? "outline-red-800" : "outline-blue-800"
              } rounded px-1 py-2 w-[300px]`}
              type="text"
              placeholder="Enter Your Email"
            />
            <MdOutlineMail className="text-white text-2xl hover:text-blue-600" />
          </div>
          <div className="flex gap-2 items-center">
            <div
              className={`flex w-[300px] items-center rounded-md border-2 ${
                passwordError ? "border-red-800" : "border-blue-600"
              }`}
            >
              <input
                onChange={(e) => passwordChange(e.target.value)}
                className="bg-transparent outline-none px-1 py-2 w-[250px]"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
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
            onClick={handleSubmit}
            className="bg-blue-600 w-[300px] px-2 py-2 text-center rounded-md"
          >
            Sign-up
          </button>
        </div>
        <h2>
          Already a User?{" "}
          <Link to="/signin" className="text-blue-600">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Signup;
