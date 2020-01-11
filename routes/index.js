const express = require("express");
const uploadCloud = require("../config/cloudinary.js");
const router = express.Router();
const Building = require("../models/building.js");
const Company = require("../models/company.js");
const Issue = require("../models/issue.js");

// router.use((req, res, next) => {
//   res.locals.user = req.session.currentUser
//   next();
// });

/* GET home page */
router.get("/", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  res.render("index", {
    user,
    professional
  });
});

//===================================================================================

// PESQUISA
router.get("/buildings/search", (req, res, next) => {
  const name = req.query.name;
  Building.find({
      name: name
    })
    .then(allTheBuildingsFromTheSearch => {
      console.log(allTheBuildingsFromTheSearch);
      res.render("building-view/search", {
        building: allTheBuildingsFromTheSearch
      });
    })
    .catch(error => {
      console.log("there was an error here>>>>", error);
    });
});

//===================================================================================

// LISTA DE EDIFICIOS
router.get("/buildings", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  Building.find()
    .then(allTheBuildingsFromTheList => {
      //console.log(allTheBuildingsFromTheList);
      res.render("building-view/building-list", {
        building: allTheBuildingsFromTheList,
        user,
        professional
      });
    })
    .catch(error => {
      console.log("Error while getting the buildings from the DB: ", error);
    });
});

//===================================================================================

// LISTA DE EMPRESAS
router.get("/companies", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  Company.find()
    .then(allTheCompaniesFromTheList => {
      //console.log(allTheCompaniesFromTheList);
      res.render("company-view/company-list", {
        company: allTheCompaniesFromTheList,
        user,
        professional
      });
    })
    .catch(error => {
      console.log("Error while getting the buildings from the DB: ", error);
    });
});

//===================================================================================

//ADICIONAR EDIFICIOS
router.get("/buildings/add", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  res.render("building-view/building-add", {
    user,
    professional
  });
});

router.post("/buildings/add", uploadCloud.single("photo"), (req, res, next) => {
  const {
    name,
    buildingNif,
    address,
    builder,
    floors,
    numOfApartments,
    yearOfConstruction,
    numOfElevators
  } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newBuilding = new Building({
    name,
    buildingNif,
    address,
    builder,
    floors,
    numOfApartments,
    yearOfConstruction,
    numOfElevators,
    imgPath,
    imgName
  });
  newBuilding
    .save()
    .then(building => {
      res.redirect("/buildings");
    })
    .catch(error => {
      console.log(error);
    });
});

// ADICIONAR EMPRESAS
router.get("/companies/add", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  res.render("company-view/company-add", {
    user,
    professional
  });
});

router.post("/companies/add", uploadCloud.single("photo"), (req, res, next) => {
  const {
    name,
    companyNif,
    address,
    typeOfServices,
    yearsOfactivity
  } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newCompany = new Company({
    name,
    companyNif,
    address,
    typeOfServices,
    yearsOfactivity,
    imgPath,
    imgName
  });
  newCompany
    .save()
    .then(company => {
      res.redirect("/companies");
    })
    .catch(error => {
      console.log(error);
    });
});

//===================================================================================

//EDITAR EDIFICIOS
router.get("/buildings/edit", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  //console.log(req.query.building_id);
  Building.findOne({
      _id: req.query.building_id
    })
    .then(building => {
      res.render("building-view/building-edit", {
        building,
        user,
        professional
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post(
  "/buildings/edit",
  uploadCloud.single("photo"),
  (req, res, next) => {
    const {
      name,
      buildingNif,
      address,
      builder,
      floors,
      numOfApartments,
      yearOfConstruction,
      numOfElevators
    } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    Building.update({
        _id: req.query.building_id
      }, {
        $set: {
          name,
          buildingNif,
          address,
          builder,
          floors,
          numOfApartments,
          yearOfConstruction,
          numOfElevators,
          imgPath,
          imgName
        }
      }, {
        new: true
      })
      .then(buildings => {
        res.redirect("/buildings");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

// EDITAR EMPRESAS
router.get("/companies/edit", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  //console.log(req.query.company_id);
  Company.findOne({
      _id: req.query.company_id
    })
    .then(company => {
      res.render("company-view/company-edit", {
        company,
        user,
        professional
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post(
  "/companies/edit",
  uploadCloud.single("photo"),
  (req, res, next) => {
    const {
      name,
      companyNif,
      address,
      typeOfServices,
      yearsOfactivity
    } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    Company.update({
        _id: req.query.company_id
      }, {
        $set: {
          name,
          companyNif,
          address,
          typeOfServices,
          yearsOfactivity,
          imgPath,
          imgName
        }
      }, {
        new: true
      })
      .then(companies => {
        res.redirect("/companies");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

//===================================================================================

//DELETE ROUTE
router.post("/buildings/:buildingId/delete", (req, res) => {
  console.log("preparing to delete", req.params.buildingId);
  Building.findByIdAndRemove(req.params.buildingId)
    .then(() => {
      res.redirect("/buildings");
    })
    .catch(error => {
      console.log("Error while retrieving book details: ", error);
    });
});

//===================================================================================

//ABOUT ROUTE
router.get("/about", (req, res, next) => {
  let user = req.session.currentUser;
  res.render("about", {
    user
  });
});

//===================================================================================

//CONTACT ROUTE
router.get("/contact", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  res.render("contact", {
    user,
    professional
  });
});

//===================================================================================

// DETALHES DOS EDIFICIOS E ANOMALIAS
router.get("/buildings/:buildingId", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  console.log("user", user);
  console.log("professional", professional);
  Building.findById(req.params.buildingId)
    .then(theBuilding => {
      Issue.find({
        building: theBuilding._id
      }).then(allTheIssuesFromTheList => {
        //console.log(allTheIssuesFromTheList);
        res.render("building-view/building-details", {
          building: theBuilding,
          issue: allTheIssuesFromTheList,
          user,
          professional
        });
      });
    })
    .catch(error => {
      console.log("Error while retrieving building details: ", error);
    });
});

// ROUTE PARA ADICIONAR ANOMALIAS
router.post("/buildings/:buildingId/issues/add", (req, res, next) => {
  let buildingId = req.params.buildingId;
  console.log("buildingid", buildingId);
  const {
    userName,
    floor,
    apartment,
    issueType,
    comment
  } = req.body;
  const newIssue = new Issue({
    building: buildingId,
    userName,
    floor,
    apartment,
    issueType,
    comment
  });
  newIssue
    .save()
    .then(building => {
      res.redirect(`/buildings/${buildingId}`);
    })
    .catch(error => {
      console.log(error);
    });
});

//===================================================================================

//ROUTE PARA EDITAR ANOMALIAS
router.get("/issues/edit", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  Issue.findOne({ _id: req.query.issue_id })
    .then(issue => {
      res.render("issue-view/issue-edit", { issue, user, professional });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/issues/edit", (req, res, next) => {
    const {
      userName,
      floor,
      apartment,
      issueType,
      comment
    } = req.body;
    Issue.update(
      { _id: req.query.issue_id },
      {
        $set: {
          userName,
          floor,
          apartment,
          issueType,
          comment
        }
      },
      { new: true }
    )
      .then(issue => {
        res.redirect("/buildings");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

//===================================================================================

//ROUTE PARA SOLUÇÃO DO PROFESSIONAL
router.get("/issues/solution", (req, res, next) => {
  let user = req.session.currentUser;
  let professional = req.session.currentProfessional;
  Issue.findOne({ _id: req.query.issue_id })
    .then(issue => {
      res.render("solution", { issue, user, professional });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/issues/soluction", (req, res, next) => {
    const {
      userName,
      floor,
      apartment,
      issueType,
      comment
    } = req.body;
    Issue.update(
      { _id: req.query.issue_id },
      {
        $set: {
          userName,
          floor,
          apartment,
          issueType,
          comment
        }
      },
      { new: true }
    )
      .then(issue => {
        res.redirect("/buildings");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

//===================================================================================

// DETALHES DAS EMPRESAS
router.get("/companies/:companyId", (req, res, next) => {
  let user = req.session.currentUser;
  Company.findById(req.params.companyId)
    .then(theCompany => {
      res.render("company-view/company-details", {
        company: theCompany,
        user
      });
    })
    .catch(error => {
      console.log("Error while retrieving company details: ", error);
    });
});

module.exports = router;