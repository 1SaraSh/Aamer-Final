const express = require("express");
const router = express.Router();

const Expert = require("../models/Expert");
const ExpertController = require("../controllers/ExpertController");
const SeekerController = require("../controllers/SeekerController");

const upload = require('../uploadImages')

router.get("/FormExpert", ExpertController.FormExpert);
router.post("/FormExpert", upload.single('Picture'), ExpertController.FormExpert_post);

// router.get("/LogInExpert", ExpertController.loginExperts);
// router.post("/LogInExpert", ExpertController.loginExperts_post);
router.get("/LoginExpert", ExpertController.loginExperts);
router.post("/LoginExpert", ExpertController.loginExperts_post);

router.get("/ProfileExpertView", ExpertController.ProfileExpertView);

router.post("/updateExpert", ExpertController.updateExpert);

router.get("/deleteExpert", ExpertController.deleteExpert);

router.get("/ProfileExpert/:id", SeekerController.ProfileExpert);


// router.get("/Experts", (req, res) => {
//   Expert.find()
//     .then((result) => {
//       res.render("SeekerSearch", { title: "All Experts", Expert: result });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     });
// });

// router.get("/ProfileExpert", (req, res) => {
//   res.render("ProfileExpert", { expert: {}, title: "Expert Information" });
// });

// router.get("/allExperts", (req, res) => {
//   Expert.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     });
// });

// router.get("/single-Expert", (req, res) => {
//   Expert.findById("645666c8fdd2c26d48cca5ac")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     });
// });


router.get("/AboutExpert", (req, res) => {
  res.render("AboutExpert", { title: "About" });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Expert = require('../models/Expert');
// // const ExpertController = require('../controllers/ExpertController');

// router.get("/LogInExpert", (req, res) => {
//   res.render("LogInExpert", { title: "LogInExpert" });
// });

// router.get('/Experts',(req,res)=>{
//     Expert.find()
//     .then((result) =>{
//         res.render('SeekerSearch',{title:'All Experts',Expert:result});
//         })
//         .catch((err) =>{
//             console.log(err);
//             });
//   });
// // router.get('/Experts', ExpertController.Expert_index);
// //   router.get('/ExpertJoin',(req,res) =>{
// //     // res.send('<p>hi</p>');
// //     res.render('ExpertJoin',{title: 'ExpertJoin'});

// //   });

//   router.get('/ProfileExpert', (req, res) => {
//     res.render('ProfileExpert', { expert: {}, title: 'Expert Information' });
//   });

// //Adding An expert
// router.get('/addExpert', (req, res) => {
//     const newExpert = new Expert({
//       First_Name: 'John2',
//       Last_Name: 'Doe',
//       Phone_Number: '123456789',
//       Email: 'johndoe@example.com',
//       password: 'password1234',
//       Specialization: 'Tech',
//       Credentials: 'UI/UX Designer',
//       Employment: 'Company ABC',
//       infoTextarea: 'Lorem ipsum dolor sit amet',
//       Linkedin: 'https://www.linkedin.com/in/johndoe/',
//     Picture: 'profile.jpg'
//     });

//     newExpert
//       .save()
//       .then((result) => {
//         res.send(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

//   //Display All Experts
//   router.get('/allExperts',(req,res)=>{
//     Expert.find()
//     .then((result) =>{
//         res.send(result);
//         })
//         .catch((err) =>{
//             console.log(err);
//             });
//   })

//   router.get('/single-Expert',(req,res)=>{
//     Expert.findById('645666c8fdd2c26d48cca5ac')
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     });
//   })

//   router.get('/ProfileExpert/:id', (req, res) => {
//     const id = req.params.id;
//     Expert.findById(id)
//       .then(result => {
//         res.render('ProfileExpert', { Expert: result, title: 'Expert Information' });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });

//   // -------------------------------About Expert------------------------------------------

//   router.get('/AboutExpert',(req,res) =>{
//     // res.send('<p>about</p>');
//     res.render('AboutExpert',{title: 'About'});
// });
// // -------------------------------Form Expert------------------------------------------
// router.post('/FormExpert', (req, res) => {
//     const { First_Name, Last_Name, Phone_Number, Email, password, Specialization, Credentials, Employment, infoTextarea, Linkedin, Picture } = req.body;

//     // Check if the email already exists in the database
//     Expert.findOne({ Email })
//       .then((existingExpert) => {
//         if (existingExpert) {
//           // Email already exists
//           const errorMessage = 'Email already exists. Please choose a different email.';
//           return res.status(400).send(`<script>alert('${errorMessage}'); window.location.href = '/FormExpert';</script>`);
//         }

//         // Create a new expert
//         const newExpert = new Expert({
//           First_Name,
//           Last_Name,
//           Phone_Number,
//           Email,
//           password,
//           Specialization,
//           Credentials,
//           Employment,
//           infoTextarea,
//           Linkedin,
//           Picture
//         });

//         // Save the new seeker to the database
//         newExpert.save()
//           .then(() => {
//             // Successful seeker creation
//             const successMessage = 'Expert registration successful';
//             return res.status(200).send(`<script>alert('${successMessage}'); window.location.href = '/';</script>`);
//           })
//           .catch((err) => {
//             // Error while saving the new seeker
//             res.status(500).json({ message: 'Internal server error' });
//           });
//       })
//       .catch((err) => {
//         // Error while querying the database
//         res.status(500).json({ message: 'Internal server error' });
//       });
//   });
//   router.get('/FormExpert',(req,res) =>{
//     // res.send('<p>hi</p>');
//     res.render('FormExpert',{title: 'FormExpert'});

//   });

// // -------------------------------Profile View------------------------------------------

// router.get('/ProfileExpertView',(req,res) =>{
//     // res.send('<p>hi</p>');
//     res.render('ProfileExpertView',{title: 'ProfileExpertView'});

//   });
//   router.get('/ProfileExpertView',(req,res) =>{
//     // res.send('<p>about</p>');
//     res.render('ProfileExpertView',{title: 'ProfileExpertView'});
//   });

//   module.exports = router;
