const express = require("express");

var router = express.Router();

const burgers = require("../models/burger");

router.get("/", function (req, res) {
  burgers.selectAll(function (data) {
    var burgerObject = {
      burgers: data,
    };
    console.log(burgerObject);
    res.render("index", burgerObject);
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

router.put("/api/burgers/:id", function (req, res) {
  let burgerId = "id = " + req.params.id;

  console.log("id", burgerId);

  burgers.updateOne(
    {
      devoured: req.body.devoured,
    },
    burgerId,
    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  let burgerId = "id = " + req.params.id;

  burgers.delete(burgerId, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
