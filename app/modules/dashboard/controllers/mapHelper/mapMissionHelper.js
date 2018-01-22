

function drawMission(pointsList, layer) {
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
