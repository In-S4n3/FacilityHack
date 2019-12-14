const express = require("express");
const router = express.Router();
const Building = require('../models/building.js');

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

//CRIAR AQUI AS ROUTES SEGUINTES

// DETALHES DOS EDIFICIOS
router.get('/buildings/:buildingId', (req, res, next) => {
  Building.findById(req.params.buildingId)
    .then(theBuilding => {
      res.render("building-details", { building: theBuilding });
    })
    .catch(error => {
      console.log("Error while retrieving building details: ", error);
    });
})

module.exports = router;
