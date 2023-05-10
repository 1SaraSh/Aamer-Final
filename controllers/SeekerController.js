const Seeker = require("../models/Seeker");
const Expert = require("../models/Expert");
const Review = require("../models/review");
// Seeker search route by specialization
exports.SeekerSearch_get = async (req, res) => {
  const Specialization = req.params.Specialization;
  const experts = await Expert.find({ Specialization });

  // console.log(experts);
  res.render("SeekerSearch", {
    title: `SeekerSearch ${Specialization}`,
    Expert: experts,
  });
};

// Seeker profile view route
exports.SeekerSearchId_get = (req, res) => {
  const id = req.params.id;

  Expert.findById(id)
    .then((result) => {
      res.render("ProfileExpert", {
        Expert: result,
        title: "Seeker Information",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.EditSeekerProfile_get = async (req, res) => {
  const user = await Seeker.findById(req.session.user._id);
  res.render("EditSeekerProfile1", { user });
};

exports.EditSeekerProfile_post = async (req, res) => {
  await Seeker.findByIdAndUpdate(req.session.user._id, req.body);
  res.redirect("/EditSeekerProfile");
};

exports.deleteSeeker = async (req, res) => {
  await Seeker.findByIdAndDelete(req.session.user._id);
  req.session.destroy();
  res.redirect("/");
};

exports.addReview = async (req, res) => {
  const review = await Review.create({
    userId: req.session.user._id,
    toId: req.body.toId,
    message: req.body.message,
  });
  res.redirect(req.header("Referer"));
};

exports.ProfileExpert = async (req, res) => {
  const id = req.params.id;
  try {
    const expert = await Expert.findById(id);
    const reviews = await Review.find({ toId: id }).populate("userId");
    console.log(reviews);
    res.render("ProfileExpert", {
      Expert: expert,
      reviews,
      title: "Expert Information",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error Seeker");
  }
};
