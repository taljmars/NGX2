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

    //missions
    vm.missionAreas.missions = [
        {
            Software: "Mongo DB",
            Percentage: "80",
            theme: "yellow",
            image: "mongodb"
        },
        {
            Software: "Express JS",
            Percentage: "75",
            theme: "aqua",
            image: "express"
        },
        {
            Software: "Angular JS",
            Percentage: "85",
            theme: "green",
            image: "angular"
        },
        {
            Software: "Node JS",
            Percentage: "83",
            theme: "purple",
            image: "node"
        },
        {
            Software: "Javascript",
            Percentage: "80",
            theme: "maroon",
            image: "javascript"
        },
        {
            Software: "Type Script",
            Percentage: "70",
            theme: "teal",
            image: "typescript"
        },
        {
            Software: "jQuery & AJAX",
            Percentage: "80",
            theme: "yellow",
            image: "jquery"
        },
        {
            Software: "Joomla",
            Percentage: "85",
            theme: "red",
            image: "joomla"
        }
    ];

    //Design Stack
    vm.missionAreas.design = [
        {
            Software: "HTML 5",
            Percentage: "90",
            theme: "yellow",
            image: "html5"
        },
        {
            Software: "CSS 3",
            Percentage: "83",
            theme: "aqua",
            image: "css3"
        },
        {
            Software: "SAAS",
            Percentage: "72",
            theme: "green",
            image: "saas-css"
        },
        {
            Software: "Bootstrap",
            Percentage: "85",
            theme: "purple",
            image: "bootstrap"
        },
        {
            Software: "Photo Shop",
            Percentage: "90",
            theme: "maroon",
            image: "Photoshop"
        },
        {
            Software: "Corel Draw",
            Percentage: "95",
            theme: "teal",
            image: "coreldraw"
        },
        {
            Software: "Flash",
            Percentage: "65",
            theme: "yellow",
            image: "flash"
        }
    ];

    //Other Stack
    vm.missionAreas.others = [
        {
            Software: "Java",
            Percentage: "60",
            theme: "aqua",
            image: "java",
        },
        {
            Software: "SQL",
            Percentage: "70",
            theme: "purple",
            image: "sql"
        },
        {
            Software: "Hardware",
            Percentage: "87",
            theme: "maroon",
            image: "hardware"
        },
        {
            Software: "Cloud Computing",
            Percentage: "72",
            theme: "yellow",
            image: "cloud"
        }
    ];

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
