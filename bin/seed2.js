const mongoose = require("mongoose");
const Company = require("../models/company");

const dbName = "facility-hack";
mongoose.connect(`mongodb://localhost/${dbName}`);

const companies = [
  {
    name: "Construction Hack" ,
    companyNif: 123654789,
    address: "Avenue of the Sun, 145, Boston",
    typeOfServices: "Construction & Project",
    yearsOfactivity: 25
  },
  {
    name: "Iron Maintenance" ,
    companyNif: 321789456,
    address: "Street of the Moon, 66, NY",
    typeOfServices: "Structural Evaluation and Maintenance",
    yearsOfactivity: 10
  }
];

Company.create(companies, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${companies.length} companies`);
  mongoose.connection.close();
});
