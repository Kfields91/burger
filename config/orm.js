var connection = require("../config/connection.js");

function ConvertToString(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function ConversionToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  selectAll: (tableName, cb) => {
    const queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function (err, result) {
      if (err) throw err;

      cb(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += ConvertToString(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += ConversionToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  delete: function (table, condition, cd) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

module.exports = orm;
