import User from "../models/user.models.js";

const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname)
    return res.status(400).json({ message: "Fullname is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const newUser = await User.create({
      fullname,
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log("Error occurred", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};



export { signUp };
