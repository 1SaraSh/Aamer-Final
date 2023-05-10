const bcrypt = require("bcryptjs");
const Seeker = require("../models/Seeker");
const Admin = require("../models/admin");

exports.Homepage_get = (req, res) => {
  // Handle the logic for the landing page
  res.render("Homepage");
}; //RIGHT

// Subscription page route
exports.Subscription_get = (req, res) => {
  res.render("Subscription", { title: "Subscription" });
}; //RIGHT

// Seeker subscription route
exports.Subscription_post = (req, res) => {
  const { fullName, email, password } = req.body;

  const newSeeker = new Seeker({
    email: email,
    fullName: fullName,
    password: password,
  });

  newSeeker
    .save()
    .then((result) => {
      res.redirect("/EditSeekerProfile");
    })
    .catch((err) => {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        // Duplicate email error
        const errorMessage = "Email is already registered";
        return res
          .status(400)
          .send(
            `<script>alert('${errorMessage}'); window.location.href = '/SignUp'; </script>`
          );
      }

      console.log(err);
      res
        .status(500)
        .send(
          `<script>alert('An error occurred while saving the Seeker'); window.location.href = '/SignUp';</script>`
        );
    });
};

exports.login_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("login1", { err: error });
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  const isAdmin = await Admin.findOne({ email });

  if (isAdmin) {
    const match = await bcrypt.compare(password, isAdmin.password);

    if (!match) {
      req.session.error = "Password is not correct";
      console.log("password is not correct");
      return res.redirect("/LogIn");
    }

    req.session.isAuth = true;
    req.session.user = isAdmin;
    req.session.role = "admin";
    return res.redirect("/admin/");
  }


  const foundSeeker = await Seeker.findOne({ email });

  if (!foundSeeker) {
    req.session.error = "Seeker was not found";
    console.log("seeker was not found");
    return res.redirect("/LogIn");
  }

  const isMatch = await bcrypt.compare(password, foundSeeker.password);

  if (!isMatch) {
    req.session.error = "Password is not correct";
    console.log("password is not correct");
    return res.redirect("/LogIn");
  }

  req.session.isAuth = true;
  req.session.user = foundSeeker;
  req.session.role = "seeker";
  res.redirect("/EditSeekerProfile");
};

exports.SignUp_get = (req, res) => {
  const error = req.session.error;
  req.session.error = undefined;
  res.render("SignUp", { err: error });
};

exports.SignUp_post = async (req, res) => {
  const { email, fullName, password } = req.body;

  let seeker = await Seeker.findOne({ email });

  if (seeker) {
    req.session.error = "User already exists";
    return res.redirect("/SignUp");
  }

  const hashedPsw = await bcrypt.hash(password, 12);

  seeker = new Seeker({
    email,
    fullName,
    password: hashedPsw,
  });

  await seeker.save();
  req.session.isAuth = true;
  req.session.user = seeker;
  req.session.role = "seeker";
  res.redirect("/Subscription");
};

exports.logout_post = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
