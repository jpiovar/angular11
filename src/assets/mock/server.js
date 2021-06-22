var version = require("./version.json");
var home = require("./home.json");
var introduction = require("./introduction.json");

module.exports = () => ({
  'version': version,
  home: home,
  introduction: introduction
});
