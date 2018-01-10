/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Home page
    Change Log
    s.no      date    author     description


 ===========================================================*/

dashboard.controller("MapController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {

  var vm = this;

  // vm.map = {};

  vm.map = L.map('map1', {
    // center: [51.505, -0.09],
    center: [32.091921, 34.804917],
    zoom: 13
  });

  var popup = L.popup().setContent('<p>Hello world!<br />This is a nice popup.</p>');
  vm.map.on('contextmenu',function(){
    popup.openOn(vm.map);
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(vm.map);

  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(vm.map);

  var pathsList = {};
  var totalSets = 0;

  function processPoints(data, payload) {
    var drawMethod = payload[3];
    var setIndex = payload[2];
    var pointAmount = payload[1];
    var order = payload[0];

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
      drawMethod(pathsList[setIndex]);
      console.log("The whole pathlist: " + pathsList);
    }
  }

  /*************************************************************
    Showing missions
  *************************************************************/

  function drawMission(pointsList) {
    console.log("Adding mission path: " + pointsList);
    for (var i = 0 ; i < pointsList.length ; i++) {
      var lat = pointsList[i].lat;
      var lng = pointsList[i].lng;
      L.marker([lat, lng]).addTo(vm.map);
    }
    L.polyline(pointsList, {
        color: 'blue',
        weight: 5,
        opacity: 0.5,
        smoothFactor: 5,
      }).addTo(vm.map);
  }

  function processMission(allMission, payload) {
    var arrayLength = allMission.length;
    console.log("Win ! " + arrayLength);
    var i = 0;
    for (; i < arrayLength; i++) {
        var name = allMission[i]["name"];
        console.log("Mission #" + i + " (named " + name + ")");
        // console.log(data.resultList[i]);
        // console.log(data.resultList[i]["name"]);

        var missionItems = allMission[i]["missionItemsUids"];
        console.log("Mission Item UIDs: " + missionItems);

        for (var j = 0; j < missionItems.length ; j++) {
          var uid = missionItems[j];
          readByClass(uid, 'com.dronedb.persistence.scheme.MissionItem', processPoints, [j+1, missionItems.length, i + totalSets, drawMission]);
        }
    }
    totalSets += i;
  }

  getAllMissions(processMission, null);


  /*************************************************************
    Showing peremiters
  *************************************************************/

// polygon: {
//                    type: "polygon",
//                    latlngs: [ europeCapitals.London, europeCapitals.Lisbon , europeCapitals.Madrid, europeCapitals.Paris ]
//                 },

  function drawPolylinePerimeter(pointsList) {
    console.log("Adding perimeter path: " + pointsList);
    L.polyline(pointsList, {
        color: 'yellow',
        weight: 5,
        opacity: 0.5,
        smoothFactor: 5,
      }).addTo(vm.map);
  }

  function processPolylinePerimeter(allPolylinePerimeter, payload) {
    var arrayLength = allPolylinePerimeter.length;
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
          readByClass(uid, 'com.dronedb.persistence.scheme.Point', processPoints, [j+1, points.length, i + totalSets, drawPolylinePerimeter]);
        }
    }
    totalSets += i;
  }

  getAllPolylinePerimeter(processPolylinePerimeter, null);

}]);
