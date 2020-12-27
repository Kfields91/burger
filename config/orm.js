var connection = require("../config/connection.js");

var orm = {
  selectAll: (tableName, cb) => {
    const queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      //   currently only console logging the result. Is this why it's not showing up in the browser?
      cb(result);
    });
  },
  //   insertOne: () => {},

  //   updateOne: () => {},
};

module.exports = orm;
