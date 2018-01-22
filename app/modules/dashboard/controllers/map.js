
dashboard.controller("MapController", ['$rootScope', '$scope', '$state', '$location', '$http', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, $http, dashboardService, Flash) {

  var vm = this;

  // Setting the map
  vm.map = L.map('map1', {
    center: [32.091921, 34.804917],
    zoom: 13,
    // drawControl: true
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(vm.map);

  // Prepere popup
  var popup = L.popup();

  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          // .setContent("You clicked the map at " + e.latlng.toString())
          // .setContent("example.html")
          .openOn(vm.map);
  }
  vm.map.on('contextmenu', onMapClick);


  var polygonsUid = new Map(); // Hold a map of polygon names and their UID in the database
  var missionsUid = new Map(); // Hold a map of mission names and their UID in the database

////////////////////////////////////////
  // Extenaion

  var customControl =  L.Control.extend({

  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    container.style.backgroundColor = 'white';
    container.style.backgroundImage = "url(http://www.quickanddirtytips.com/sites/default/files/styles/insert_small/public/images/4058/asterisk.JPG?itok=8CM1mxm6)";
    container.style.backgroundSize = "27px 27px";
    container.style.width = '30px';
    container.style.height = '30px';

    container.onclick = function(){
      console.log('buttonClicked');
          // console.log(myControl);
          // console.log(inputTags);
          // console.log(inputTags[1].value);
          var newObjectName = inputTags[1].value;
          // console.log(ms._layers);
          if (type == "Missions") {
            function addMissionToMap(data, payload) {
              console.log("WINNNN - Mission");
              missionsUid.set(data['name'], data['keyId']['objId']);
              missionsLayer.addOverlay(new L.FeatureGroup(), data['name']);
            }
            createMission(newObjectName, addMissionToMap, null);
          }
          else if (type == "Perimeters") {
            function addPolygonToMap(data, payload) {
              console.log("WINNNN - Polygon");
              polygonsUid.set(data['name'], data['keyId']['objId']);
              polygonLayers.addOverlay(new L.FeatureGroup(), data['name']);
            }
            createPolygonPerimeter(newObjectName, addPolygonToMap, null);
          }
    }

    return container;
  }
});

vm.map.addControl(new customControl());

var myControl = new L.Control({position: 'topleft'});
myControl.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'myControl');
            this._div.innerHTML = '<input type="text" value="A" />'
            return this._div;
}
myControl.addTo(vm.map);

//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function controlEnter(e) {
    vm.map.dragging.disable();
}
function controlLeave() {
    vm.map.dragging.enable();
}

var inputTags = document.getElementsByTagName("input");


  /*************************************************************
  Build map bar
  *************************************************************/

  var drawnItems = new L.FeatureGroup();
  var missions = new L.FeatureGroup();
  var permiters = new L.FeatureGroup();
  // vm.map.addLayer(drawnItems);
  L.control.layers({'Missions': missions,'Perimeters': permiters},{},{ position: 'topleft', collapsed: false }).addTo(vm.map);

  var polygonLayers = L.control.layers(
  {},
  {
    'pol1': drawnItems,
    'pol2': permiters
  },
  {
    position: 'topleft',
    collapsed: false,
  });

    var missionsLayer = L.control.layers(
    {},
    {
      'ms1': new L.FeatureGroup(),
      'ms2': new L.FeatureGroup()
    },
    {
      position: 'topleft',
      collapsed: false,
    });

  var perimetersControl = new L.Control.Draw({
    edit: {
            featureGroup: permiters,
            poly: {
                allowIntersection: false
            }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        },
        marker: false,
        circlemarker: false
    }
  });

  var missionsControl = new L.Control.Draw({
    // edit: {
    //         featureGroup: missions,
    //         poly: {
    //             allowIntersection: false
    //         }
    // },
    draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false
    }
  });

   vm.map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType;
      var layer = e.layer;
      if (type === 'marker') {
        // Layer also presnt a marker
        console.log(e);
        var latlng = layer._latlng;
        function logMapElements1(value, key, map) {
          console.log(`m[${key}] = ${value}`);
          value.addLayer(layer);
          var uid = missionsUid.get(key);
          // setPointsToPolygon(polygonsUid['${key}'], pointArr);
          addPointToMission(uid, latlng);
        }

        ms_array.forEach(logMapElements1);
      }
      else if (type === 'polygon') {
        // Do marker specific actions
        var pointArr = layer._latlngs[0];
        function logMapElements1(value, key, map) {
          console.log(`m[${key}] = ${value}`);
          value.addLayer(layer);
          var uid = polygonsUid.get(key);
          // setPointsToPolygon(polygonsUid['${key}'], pointArr);
          setPointsToPolygon(uid, pointArr);
        }

        ms_array.forEach(logMapElements1);
      }
      // // Do whatever else you need to. (save to db; add to map etc)
      // console.log("Created ! " + type);
      // function logMapElements1(value, key, map) {
      //   console.log(`m[${key}] = ${value}`);
      //   value.addLayer(layer);
      // }
      //
      // ms_array.forEach(logMapElements1);
  });
   vm.map.on(L.Draw.Event.EDITED, function (e) {
       var layers = e.layers;
       layers.eachLayer(function (layer) {
         console.log("in draw:edited");
           //do whatever you want; most likely save back to db
       });
   });

   var type = "";
   vm.map.on('baselayerchange', function (e) {
       var layer = e.layer;
       console.log(e);
       console.log(layer);
       if (e.name == "Missions") {
         console.log("Handling mission");
         perimetersControl.remove();
         polygonLayers.remove();
         missionsLayer.addTo(vm.map);
         vm.map.addControl(missionsControl);
         type = e.name;
       }
       else if (e.name == "Perimeters") {
         console.log("Handling Poly");
         missionsControl.remove();
         missionsLayer.remove();

         polygonLayers.addTo(vm.map);
         vm.map.addControl(perimetersControl);
         type = e.name;
       }
       else {
         console.log("Handling Something");
         type = "";
       }

   });
   var ms_array = new Map();
   var pol_array = {};
   vm.map.on('overlayadd', function (e) {
       var layer = e.layer;
       // console.log(e['name']);
       // console.log(layer['name']);
       ms_array.set(e['name'], layer);

       function logMapElements(value, key, map) {
         console.log(`->[${key}] = ${value}`);
       }
       ms_array.forEach(logMapElements);
   });
   vm.map.on('overlayremove', function (e) {
       var layer = e.layer;
       // console.log(e['name']);
       // console.log(layer['name']);
       ms_array.delete(e['name']);

       function logMapElements(value, key, map) {
         console.log(`->[${key}] = ${value}`);
       }
       ms_array.forEach(logMapElements);
   });

   vm.map.on(L.Draw.Event.TOOLBAROPENED , function (e) {
       var layers = e.layers;
       console.log("in toolbar opned");
   });

  /*************************************************************
    Showing missions
  *************************************************************/
  getAllMissions(processMission, missionsLayer);

  /*************************************************************
    Showing peremiters
  *************************************************************/
  getAllPolylinePerimeter(processPolylinePerimeter, polygonLayers);

}]);
