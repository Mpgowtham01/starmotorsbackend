import CategoryModal from "../Modal/Modal.js";

export async function Login(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);
    const existUser = await CategoryModal.findOne({
      email: data.email,
    });
    if (existUser) {
      compare(data.password, existUser.password).then((checkPassword) => {
        console.log("checkPassword", checkPassword);
        if (checkPassword) {
          if (existUser.verified === true) {
            res.status(200).json({
              message: "user login successfully",
              email: existUser.email,
              data: existUser,
              status: "Successful",
            });
          } else {
            res.status(400).json({
              message: "check mail",
              status: "Failed",
            });
          }
        } else {
          res.status(400).json({
            message: "password not matched",
            status: "Failed",
          });
        }
      });
    } else {
      res.status(400).json({
        message: "user not found",
        status: "failed",
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
