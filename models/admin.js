const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;