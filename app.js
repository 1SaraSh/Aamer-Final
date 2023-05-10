const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const ExpertRoutes = require("./routes/ExpertRoutes");
const SeekerRoutes = require("./routes/SeekerRoutes");
const AuthenticationRoutes = require("./routes/AuthenticationRoutes");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const appController = require("./controllers/appController");
const adminRoutes = require("./routes/adminRoutes");
const isAdmin = require("./middleware/isAdmin");

const isAuth = require("./middleware/isAuth");

// import env
const dotenv = require("dotenv").config();


// connect to mongodb
const dbURI ="mongodb+srv://Aamer:Aamer123@se371cluster.dxoemro.mongodb.net/Aamer";

// express app
const app = express();
// register view engine
app.set("view engine", "ejs");
require('dotenv').config();
// const port = 27017;
const port = 5000 || process.env.PORT;

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

let sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'mySessions'
});

// Catch errors
sessionStore.on('error', function(error) {
  console.log(error);
});

// configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
);

app.use((req, res, next) => {
  res.locals.isAuth = req.session.isAuth || false;
  res.locals.role = req.session.role == 'seeker' ? 'seeker' : req.session.role == 'expert' ? 'expert' : req.session.role == 'admin' ? 'admin' : null ;
  next();
});

app.get("/", (req, res) => {
  res.render('Homepage');
});

// Dashboard Page
// app.get('/EditSeekerProfile', (request, response) => {
//   response.render('EditSeekerProfile')});

// app.use('/EditSeekerProfile', AuthenticationRoutes);

app.use(AuthenticationRoutes);

// Expert routes
app.use(SeekerRoutes);
app.use(ExpertRoutes);
app.use('/admin', isAdmin, adminRoutes);
// async function create_admin_account() {
//   const Admin = require("./models/admin");
//   const bcrypt = require("bcryptjs");
//   const hashedPassword = await bcrypt.hash("Admin123123", 12);
//   await Admin.create({email: "admin2@gmail.com", password: hashedPassword})
//   await Admin.create({email: "admin1@gmail.com", password: hashedPassword})
//   await Admin.create({email: "admin3@gmail.com", password: hashedPassword})

//   console.log(hashedPassword);
// }

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`The server is running on port http://localhost:${port}`);
      // create_admin_account()
    });
  })
  .catch((err) => console.log(err));










































