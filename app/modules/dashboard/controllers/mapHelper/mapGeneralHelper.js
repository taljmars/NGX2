
var pathsList = {};

function processPoints(data, payload) {
  var finalPayload = payload;

  var order = payload[0];
  finalPayload.shift();

  var pointAmount = payload[0];
  finalPayload.shift();

  var setIndex = payload[0];
  finalPayload.shift();

  var drawMethod = payload[0];
  finalPayload.shift();


  var lat = data["lat"];
  var lon = data["lon"];
  if (pathsList[setIndex] == null) {
    console.log("Set Items for #" + setIndex + " doesn't exist");
    pathsList[setIndex] = [];
    pathsList[setIndex][0] = 0;
  }
  pathsList[setIndex][order] = new L.LatLng(lat, lon);
  pathsList[setIndex][0]++;

  if (pathsList[setIndex][0] == pointAmount) {
    console.log("Reached last point");
    console.log("Set has the following points corner " + pathsList[setIndex]);
    pathsList[setIndex] = pathsList[setIndex].slice(1);
    drawMethod(pathsList[setIndex], finalPayload);
    console.log("The whole pathlist: " + pathsList);
  }
}
