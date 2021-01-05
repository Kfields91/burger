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
    ["burger_name", "devoured"],
    [req.body.name, req.body.devoured],
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
  let condition = "id = " + req.params.id;

  console.log("id", condition);

  burgers.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
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
  let condition = "id = " + req.params.id;

  burgers.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
