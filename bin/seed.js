const mongoose = require('mongoose');
const Building = require('../models/building');
const Issues = require('../models/issues');

const dbName = 'facility-hack';
mongoose.connect(`mongodb://localhost/${dbName}`);

const buildings = [
  { 
    name: "Edifício Sol",
    buildingNif: 123456789,
    address: "R. do Junqueiro, lt. 25, Lisboa",
    builder: "Somague",
    floors: 10,
    numOfApartments: 19,
    yearOfConstruction: '1980-08-17',
    numOfElevators: 2,
  }, 
  {
    name: "Edifício Lua",
    buildingNif: 213456789,
    address: "Av. 25 de Abril, nº8, Estoril",
    builder: "Mota-Engil",
    floors: 15,
    numOfApartments: 45,
    yearOfConstruction: '1985-10-01',
    numOfElevators: 2,
  }
]
Building.create(buildings, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${buildings.length} buildings`)
  mongoose.connection.close();
});


const issues = [
  {
    residentName: "Tiago",
    issueType: "cleacning",
    comment: "Alright, alright, alright",
  },
  {
    residentName: "Helder",
    issueType: "Elevator broken",
    comment: "if it's broken, fix it",
  }
]
Issues.create(issues, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${issues.length} issues`)
  mongoose.connection.close();
});