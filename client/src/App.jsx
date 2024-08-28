import React from "react";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserCard from "./Pages/userCard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user" element={<UserCard/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
