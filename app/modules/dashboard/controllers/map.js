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
    center: [51.505, -0.09],
    zoom: 13
  });

  // var map = L.map('map', {
  //   center: [51.505, -0.09],
  //   zoom: 13
  // });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(vm.map);

  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(vm.map);

  function showMarkers(data) {
    L.marker([data["lat"], data["lon"]]).addTo(vm.map);
  }

  function processMission(allMission) {
    var arrayLength = allMission.length;
    console.log("Win ! " + arrayLength);
    for (var i = 0; i < arrayLength; i++) {
        var name = allMission[i]["name"];
        console.log("Mission #" + i + " (named " + name + ")");
        // console.log(data.resultList[i]);
        // console.log(data.resultList[i]["name"]);

        console.log(allMission[i]["missionItemsUids"]);
        var missionItems = allMission[i]["missionItemsUids"];
        for (var j = 0; j < missionItems.length ; j++) {
          var uid = missionItems[j];
          readByClass(uid, 'com.dronedb.persistence.scheme.MissionItem', showMarkers);
        }
    }
  }

  getAllMissions(processMission);

}]);
