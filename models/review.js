const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewSchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seeker",
      required: true,
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seeker",
        required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
