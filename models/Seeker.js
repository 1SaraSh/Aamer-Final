const mongoose=require('mongoose');
const schema=mongoose.Schema;

const seekerSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Seeker = mongoose.model('Seeker', seekerSchema);
module.exports = Seeker;