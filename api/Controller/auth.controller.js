const bcryptjs = require("bcryptjs");
const User = require("../Model/Auth.js");
const jwt = require("jsonwebtoken");

const hello = (req, res) => {
  res.json({
    message: "Hello from Routes And Controller",
  });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signed Up Successfully",
      user: { username, email }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  try {
    const validUser = await User.findOne({ email });
    
    if (!validUser) {
      return res.status(404).json({ message: "User Not Found. Try to Sign Up." });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET || "yoowfiuebdouivburowuvdefbuiobrfvbovbufi",
      { expiresIn: "1h" }
    );

    // Safely exclude password from the user object
    const { password: removedPassword, ...user } = validUser._doc;

    res.status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "Signin successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};



module.exports = { hello, signup, signin };
