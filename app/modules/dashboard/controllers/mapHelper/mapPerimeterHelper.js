
var totalSets = 0;
// var pathsList = {};

function drawPolylinePerimeter(pointsList, payload) {
  var name = payload[0];
  var polygonLayers = payload[1];
  console.log("Adding perimeter path: " + pointsList);
  var poly = L.polygon(pointsList, {
      type: 'polygon',
      color: 'yellow',
      weight: 5,
      opacity: 0.5,
      smoothFactor: 5,
    });

    var overlay = L.layerGroup([poly]);
    polygonLayers.addOverlay(overlay, name);
}

function processPolylinePerimeter(allPolylinePerimeter, payload) {
  var arrayLength = allPolylinePerimeter.length;
  var polygonLayers = payload;
  console.log("Win ! " + arrayLength);
  var i = 0;
  for (; i < arrayLength; i++) {
      var name = allPolylinePerimeter[i]["name"];
      console.log("PolylinePerimeter #" + i + " (named " + name + ")");
      // console.log(data.resultList[i]);
      // console.log(data.resultList[i]["name"]);

      var points = allPolylinePerimeter[i]["points"];
      console.log("Points UIDs: " + points);

      for (var j = 0; j < points.length ; j++) {
        var uid = points[j];
        readByClass(uid, 'com.dronedb.persistence.scheme.Point', processPoints, [j+1, points.length, i + totalSets, drawPolylinePerimeter, name, polygonLayers]);
      }
  }
  totalSets += i;
}
