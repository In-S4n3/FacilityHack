const mongoose = require('mongoose');
const Building = require('../models/building');

const dbName = 'facility-hack';
mongoose.connect(`mongodb://localhost/${dbName}`);

const buildings = [
  { 
    name: "Edifício Sol",
    address: "R. do Junqueiro, lt. 25, Lisboa",
    builder: "Somague",
    floors: 10,
    numOfApartments: 19,
    yearOfConstruction: Date('1980-08-17'),
    numOfElevators: 2,
  }, 
  {
    name: "Edifício Lua",
    address: "Av. 25 de Abril, nº8, Estoril",
    builder: "Mota-Engil",
    floors: 15,
    numOfApartments: 45,
    yearOfConstruction: Date('1985-10-01'),
    numOfElevators: 2,
  }
]

Building.create(buildings, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${buildings.length} buildings`)
  mongoose.connection.close();
});