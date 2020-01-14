const express = require("express");
const router = express.Router();

// CHAMAR O SCHEMA DO USER
const User = require("../models/user");
const Professional = require("../models/professional")

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

// SIGN UP ROUTE
router.get("/signup", (req, res, next) => {
  res.render("authentications-views/signup");
});

router.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
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
        firstName,
        lastName,
        email,
        username,
        password: hashPass
      })
        .then(() => {
          res.redirect("/login");
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

//============================================================================

// PROFESSIONAL SIGN UP ROUTE
router.get("/professional-signup", (req, res, next) => {
  res.render("authentications-views/professional-signup");
});

router.post("/professional-signup", (req, res, next) => {
  const companyName = req.body.companyName;
  const nif = req.body.nif;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  if (companyName === "" || password === "" || nif === "" || email === "") {
    res.render("authentications-views/professional-signup", {
      errorMessage: "Please, indicate company name, password, nif and email to sign up"
    });
    return;
  } else if (password !== password2) {
    res.render("authentications-views/professional-signup", {
      errorMessage: "The passwords do not match"
    });
    return;
  }
  Professional.findOne({
    nif: nif
  })
    .then(theCompany => {
      if (theCompany !== null) {
        res.render("authentications-views/signup", {
          errorMessage: "The NIF already exists!"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      console.log("nifff", nif);

      Professional.create({
        companyName,
        email,
        nif,
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


//============================================================================


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

  User.findOne({ username: theUsername })
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
        res.redirect("/console");
      } else {
        res.render("authentications-views/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});


//============================================================================

// PROFESSIONAL LOG IN ROUTE
router.get("/professional-login", (req, res, next) => {
  res.render("authentications-views/professional-login");
});

router.post("/professional-login", (req, res, next) => {
  const theNif = req.body.nif;
  const thePassword = req.body.password;

  if (theNif === "" || thePassword === "") {
    res.render("authentications-views/professional-login", {
      errorMessage: "Please enter both, nif and password to log-in up."
    });
    return;
  }

  Professional.findOne({ nif: theNif })
    .then(professional => {

      if (!professional) {
        res.render("authentications-views/professional-login", {
          errorMessage: "The sadasdsadasdadas doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, professional.password)) {
        // Save the login in the session!
        req.session.currentProfessional = professional;
        res.redirect("/");
      } else {
        res.render("authentications-views/professional-login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});


// LOGOUT ROUTE
router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // cannot access session here
    res.redirect("/");
  });
});

module.exports = router;
