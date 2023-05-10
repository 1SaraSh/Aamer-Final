const mongoose=require('mongoose');
const schema=mongoose.Schema;

const expertSchema = new schema({
  First_Name: {
    type: String,
    required: true
  },
  Last_Name: {
    type: String,
    required: true
  },
  Phone_Number: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Specialization: {
    type: String,
    required: true
  },
  Credentials: {
    type: String,
    required: true
  },
  Employment: {
    type: String,
    required: true
  },
  infoTextarea: {
    type: String,
    required: true
  },
  Linkedin: {
    type: String
  },
  Picture: {
    type: String,
    required: true
  },  
  Rating: {
    type: Number,
    default: 1, // Replace 'N/A' with your desired default value
  }
  
}, { timestamps: true });

const Expert = mongoose.model('Expert', expertSchema);
module.exports = Expert;


