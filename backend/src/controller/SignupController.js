import CategoryModal from "../Modal/Modal.js";
import bcrypt from "bcrypt";

export async function userSignup(req, res, next) {
  try {
    const data = req.body;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await CategoryModal.create({
      email: data.email,
      password: hashedPassword, // ✅ save hashed password
      verified: true, // if required
    });

    res.status(201).json({
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
