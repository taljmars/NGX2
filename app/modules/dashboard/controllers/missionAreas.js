/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle missionAreasController page
    Change Log
    s.no      date    author     description


 ===========================================================*/

dashboard.controller("missionAreasController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    var vm = this;

    vm.missionAreas = {};

    vm.missionAreas.missions = [];
    vm.missionAreas.polylinePerimeter = [];
    vm.missionAreas.circlePerimeter = [];

    //missions

    function fillMissions(missions) {
      console.log("fillMissions >>>>");
      if (missions == 0) {
        console.log("Failed to get missions");
        return;
      }
      var missionAmount = missions.length;
      for (var i = 0 ; i < missionAmount ; i++) {
        console.log("TAL " + missions[i]);
        console.log("TAL " + missions[i]["name"]);
        console.log("<<<< fillMissions");

        var date = new Date(null);
        date.setSeconds(missions[i]["creationDate"]); // specify value for SECONDS here
        date.toISOString().substr(11, 8);

        vm.missionAreas.missions.push({
          Software: missions[i]["name"],
          Percentage: missions[i]["missionItemsUids"].length,
          Since: date.toGMTString(),
          theme: "yellow",
          image: "mongodb"
        });
      }
    }

    getAllMissions(fillMissions, null);
}]);
