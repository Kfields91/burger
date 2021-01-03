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

router.post("/api/burgers", function (req, res) {
  burgers.insertOne(
    ["burgers", "devoured"],
    [req.body.burger, req.body.devoured],
    function (result) {
      // var burgerAdded = {
      // id: req.body.id,
      // burgers: req.body.burger,
      res.json({ id: result.insertId });
    }
  );
  // res.render("index", burgerAdded);
});

router.put("/api/burger/:id", function (req, res) {
  const burgerId = "id = " + res.params.id;

  console.log("id", burgerId);

  burgers.updateOne(
    {
      devoured: req.body.devoured,
    },
    burgerId,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
    }
  );
});

module.exports = router;
