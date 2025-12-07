import CategoryModal from "../Modal/Modal.js";
import bcrypt from "bcrypt"; // ✅ Add this import

export async function Login(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);

    const existUser = await CategoryModal.findOne({ email: data.email });
    console.log("existUser :>> ", existUser);
    if (!existUser) {
      return res.status(400).json({
        message: "user not found",
        status: "failed",
      });
    }

    // ✅ Proper bcrypt compare
    const checkPassword = await bcrypt.compare(
      data.password,
      existUser.password
    );
    console.log("checkPassword", checkPassword);

    if (!checkPassword) {
      return res.status(400).json({
        message: "password not matched",
        status: "Failed",
      });
    }

    res.status(200).json({
      message: "user login successfully",
      email: existUser.email,
      data: existUser,
      status: "Successful",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
