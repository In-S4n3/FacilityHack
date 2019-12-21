const express = require("express");
const router = express.Router();
const Building = require("../models/building.js");
const Company = require("../models/company.js");
const Issues = require("../models/issues.js");

// router.use((req, res, next) => {
//   res.locals.user = req.session.currentUser
//   next();
// });

/* GET home page */
router.get("/", (req, res, next) => {
  let user = req.session.currentUser;
  res.render("index", {
    user
  });
});

// LISTA DE EDIFICIOS
router.get("/buildings", (req, res, next) => {
  Building.find()
    .then(allTheBuildingsFromTheList => {
      //console.log(allTheBuildingsFromTheList);
      res.render("building-view/building-list", {
        building: allTheBuildingsFromTheList
      });
    })
    .catch(error => {
      console.log("Error while getting the buildings from the DB: ", error);
    });
});

// LISTA DE EMPRESAS
router.get("/companies", (req, res, next) => {
  Company.find()
    .then(allTheCompaniesFromTheList => {
      //console.log(allTheCompaniesFromTheList);
      res.render("company-view/company-list", {
        company: allTheCompaniesFromTheList
      });
    })
    .catch(error => {
      console.log("Error while getting the buildings from the DB: ", error);
    });
});

//===================================================================================

//ADICIONAR EDIFICIOS
router.get("/buildings/add", (req, res, next) => {
  res.render("building-view/building-add");
});

router.post("/buildings/add", (req, res, next) => {
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
  const newBuilding = new Building({
    name,
    buildingNif,
    address,
    builder,
    floors,
    numOfApartments,
    yearOfConstruction,
    numOfElevators
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
  res.render("company-view/company-add");
});

router.post("/companies/add", (req, res, next) => {
  const {
    name,
    companyNif,
    address,
    typeOfServices,
    yearsOfactivity
  } = req.body;
  const newCompany = new Company({
    name,
    companyNif,
    address,
    typeOfServices,
    yearsOfactivity
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
  //console.log(req.query.building_id);
  Building.findOne({ _id: req.query.building_id })
    .then(building => {
      res.render("building-view/building-edit", { building });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/buildings/edit", (req, res, next) => {
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
  Building.update(
    { _id: req.query.building_id },
    {
      $set: {
        name,
        buildingNif,
        address,
        builder,
        floors,
        numOfApartments,
        yearOfConstruction,
        numOfElevators
      }
    },
    { new: true }
  )
    .then(buildings => {
      res.redirect("/buildings");
    })
    .catch(error => {
      console.log(error);
    });
});

// EDITAR EMPRESAS
router.get("/companies/edit", (req, res, next) => {
  //console.log(req.query.company_id);
  Company.findOne({ _id: req.query.company_id })
    .then(company => {
      res.render("company-view/company-edit", { company });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/companies/edit", (req, res, next) => {
  const {
    name,
    companyNif,
    address,
    typeOfServices,
    yearsOfactivity
  } = req.body;
  Company.update(
    { _id: req.query.company_id },
    {
      $set: {
        name,
        companyNif,
        address,
        typeOfServices,
        yearsOfactivity
      }
    },
    { new: true }
  )
    .then(companies => {
      res.redirect("/companies");
    })
    .catch(error => {
      console.log(error);
    });
});

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
  res.render("about");
});

//===================================================================================

//CONTACT ROUTE
router.get("/contact", (req, res, next) => {
  res.render("contact");
});

//===================================================================================

// DETALHES DOS EDIFICIOS E ANOMALIAS
router.get("/buildings/:buildingId", (req, res, next) => {
  Building.findById(req.params.buildingId)
    .then(theBuilding => {
      Issues.find().then(allTheIssuesFromTheList => {
        //console.log(allTheIssuesFromTheList);
        res.render("building-view/building-details", {
          building: theBuilding,
          issue: allTheIssuesFromTheList
        });
      });
    })
    .catch(error => {
      console.log("Error while retrieving building details: ", error);
    });
});



router.get("/buildings/add", (req, res, next) => {
  res.render("building-view/building-add");
});

router.post("/buildings/add", (req, res, next) => {
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
  const newBuilding = new Building({
    name,
    buildingNif,
    address,
    builder,
    floors,
    numOfApartments,
    yearOfConstruction,
    numOfElevators
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

//===================================================================================

// DETALHES DAS EMPRESAS
router.get("/companies/:companyId", (req, res, next) => {
  Company.findById(req.params.companyId)
    .then(theCompany => {
      res.render("company-view/company-details", { company: theCompany });
    })
    .catch(error => {
      console.log("Error while retrieving company details: ", error);
    });
});

module.exports = router;
