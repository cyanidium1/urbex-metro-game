const lang = useSelector((state) => state.game.lang);

let plot;
// switch (lang) {
//   case "ru":
//     plot = require("../src/plot/plotru.json");
//     break;
//   case "es":
//     plot = require("../src/plot/plotes.json");
//     break;
//   case "de":
//     plot = require("../src/plot/plotde.json");
//     break;
//   case "fr":
//     plot = require("../src/plot/plotfr.json");
//     break;
//   case "ua":
//     plot = require("../src/plot/plotua.json");
//     break;
//   default:
//     plot = require("../src/plot/plot.json");
//     break;
// }
switch (lang) {
  case "ru":
    plot = require("../../src/plot/plotru.json");
    break;
  case "es":
    plot = require("../../src/plot/plotes.json");
    break;
  case "de":
    plot = require("../../src/plot/plotde.json");
    break;
  case "fr":
    plot = require("../../src/plot/plotfr.json");
    break;
  case "ua":
    plot = require("../../src/plot/plotua.json");
    break;
  default:
    plot = require("../../src/plot/plot.json");
    break;
}
module.exports = {
  plot,
};
