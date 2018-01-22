/*==========================================================
    Author      : taljmars
    Date Created: 13 Jan 2018
    Description : Drone logging
    Change Log
    s.no      date    author     description


 ===========================================================*/

dashboard.controller("DroneLogController", ['$rootScope', '$scope', '$state', '$location', '$interval', '$http', 'dashboardService', 'Flash',
  function ($rootScope, $scope, $state, $location, $interval, $http, dashboardService, Flash) {
    var vm = this;

    console.log("coming to DroneLog controller");

    vm.dronelog = [
      {
        level: "INFO",
        entry: "Checking drone module"
      }
    ];

    $interval(function(){
      $http.get('http://localhost:8888/getMessage').
        then(function(response) {
          var resp = response.data;
          var status = response.status;
          if (status != 200 && resp.length != 0) {
            console.log(resp);
            vm.dronelog.unshift({
              level: resp.type,
              entry: resp.message
            });
          }
        });
    },500);
  }
]);
