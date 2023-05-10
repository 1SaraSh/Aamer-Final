const Expert = require("../models/Expert");
const Review = require("../models/review");
const bcrypt = require("bcryptjs");

const Expert_index = (req, res) => {
  Expert.find({})
    .then((result) => {
      res.render("SeekerSearch", { title: "All Experts", Expert: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.FormExpert = (req, res) => {
  res.render("FormExpert", { title: "FormExpert" });
};

exports.FormExpert_post = async (req, res) => {
  const {
    First_Name,
    Last_Name,
    Phone_Number,
    Email,
    password,
    Specialization,
    Credentials,
    Employment,
    infoTextarea,
    Linkedin,
    Picture,
  } = req.body;

  // Check if the email already exists in the database
  const existingExpert = await Expert.findOne({ Email });

  if (existingExpert) {
    // Email already exists
    const errorMessage =
      "Email already exists. Please choose a different email.";
    return res
      .status(400)
      .send(
        `<script>alert('${errorMessage}'); window.location.href = '/FormExpert';</script>`
      );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create a new expert
    console.log(req.file);
    const newExpert = new Expert({
      First_Name,
      Last_Name,
      Phone_Number,
      Email,
      password: hashedPassword,
      Specialization,
      Credentials,
      Employment,
      infoTextarea,
      Linkedin,
      Picture: req.file.filename,
    });
    await newExpert.save();
    req.session.user = newExpert;
    req.session.isAuth = true;
    req.session.role = "expert";
    // Successful seeker creation
    const successMessage = "Expert registration successful";
    return res.status(200).redirect("/ProfileExpertView");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error Expert");
  }
};

exports.loginExperts = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("LogInExpert", { title: "LogInExpert", err: error });
};

exports.loginExperts_post = async (req, res) => {
  const { email, password } = req.body;

  const foundExport = await Expert.findOne({ Email: email });

  if (!foundExport) {
    req.session.error = "Expert was not found";
    console.log("Expert was not found");
    return res.redirect("/LogInExpert");
  }

  const isMatch = await bcrypt.compare(password, foundExport.password);

  if (!isMatch) {
    req.session.error = "password is not correct";
    console.log("password is not correct");
    return res.redirect("/LogInExpert");
  }

  req.session.isAuth = true;
  req.session.user = foundExport;
  req.session.role = "expert";
  res.redirect("/ProfileExpertView");
};

exports.ProfileExpertView = async (req, res) => {
  const experts = await Expert.findById(req.session.user._id);
  const reviews = await Review.find({toId: req.session.user._id}).populate("userId");
  res.render("ProfileExpertView", {
    title: "ProfileExpertView",
    Expert: experts,
    reviews,
  });
};

exports.updateExpert = async (req, res) => {
  await Expert.findByIdAndUpdate(req.session.user._id, req.body);
  res.redirect("/ProfileExpertView");
};

exports.deleteExpert = async (req, res) => {
  await Expert.findByIdAndDelete(req.session.user._id);
  req.session.destroy();
  res.redirect("/");
};
