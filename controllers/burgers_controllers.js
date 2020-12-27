const express = require("express");
const burgers = require("../models/burger");

var router = express.Router();

router.get("/", function (req, res) {
  burgers.selectAll(function (data) {
    var burgerObject = {
      burgers: data,
    };
    res.render("index", burgerObject);
    console.log(burgerObject);
  });
});

module.exports = router;
