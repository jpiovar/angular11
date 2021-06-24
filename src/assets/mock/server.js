var version = require("./version.json");
var home = require("./home.json");
var introduction = require("./introduction.json");
var siteStructure = require("./site-structure.json");
var tableData = require("./table-data.json");

module.exports = () => ({
  'version': version,
  home: home,
  introduction: introduction,
  'site-structure': siteStructure,
  tableData: tableData
});
