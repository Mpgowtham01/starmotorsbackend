import Category from "../Modal/Modal.js";

export async function userSignup(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);
    const details = {
      email: data.email,
      password: data.password,
    };
    const createCategory = await Category.create(details);

    res.status(201).json({
      message: "Category Created Successfully",
      data: createCategory,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
