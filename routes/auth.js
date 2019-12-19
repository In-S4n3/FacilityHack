const express = require("express");
const router = express.Router();
// CHAMAR O SCHEMA DO USER
const User           = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;



// SIGN UP ROUTE
router.get("/signup", (req, res, next) => {
  res.render("authentications-views/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  if (username === "" || password === "") {
    res.render("authentications-views/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  } else if (password !== password2) {
    res.render("authentications-views/signup", {
      errorMessage: "The passwords do not match"
    });
    return;
  }
  User.findOne({
    username: username
  })
    .then(user => {
      if (user !== null) {
        res.render("authentications-views/signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      User.create({
        username,
        password: hashPass
      })
        .then(() => {
          res.redirect("/");
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      next(error);
    });
});


// LOG IN ROUTE
router.get("/login", (req, res, next) => {
  res.render("authentications-views/login");
});

router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("authentications-views/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
  .then(user => {
      if (!user) {
        res.render("authentications-views/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("authentications-views/login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});

// LOGOUT ROUTE
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/");
  });
});

module.exports = router;
