const express = require("express");
const router = express.Router();
const Building = require("../models/building.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// LISTA DE EDIFICIOS
router.get("/buildings", (req, res, next) => {
  Building.find()
    .then(allTheBuildingsFromTheList => {
      //console.log(allTheBuildingsFromTheList);
      res.render("building-list", { building: allTheBuildingsFromTheList });
    })
    .catch(error => {
      console.log("Error while getting the buildings from the DB: ", error);
    });
});

//ADICIONAR EDIFICIOS
router.get("/buildings/add", (req, res, next) => {
  res.render("building-add");
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

//EDITAR EDIFICIOS
router.get('/buildings/edit', (req, res, next) => {
  console.log(req.query.building_id);
  Building.findOne({_id: req.query.building_id})
  .then((building) => {
    res.render("building-edit", {building});
  })
  .catch((error) => {
    console.log(error);
  })
});

router.post('/buildings/edit', (req, res, next) => {
  const { name,
    buildingNif,
    address,
    builder,
    floors,
    numOfApartments,
    yearOfConstruction,
    numOfElevators } = req.body;
  Building.update({_id: req.query.building_id}, { $set: { name,
    buildingNif,
    address,
    builder,
    floors,
    numOfApartments,
    yearOfConstruction,
    numOfElevators}}, { new: true })
  .then((buildings) => {
    res.redirect('/buildings');
  })
  .catch((error) => {
    console.log(error);
  })
});

//ABOUT ROUTE
router.get('/about', (req, res, next) => {
  res.render('about')
})

//CONTACT ROUTE
router.get('/contact', (req, res, next) => {
  res.render('contact')
})

// DETALHES DOS EDIFICIOS
router.get("/buildings/:buildingId", (req, res, next) => {
  Building.findById(req.params.buildingId)
    .then(theBuilding => {
      res.render("building-details", { building: theBuilding });
    })
    .catch(error => {
      console.log("Error while retrieving building details: ", error);
    });
});

module.exports = router;
