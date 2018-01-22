

// Gett all missions:

function getAllMissions(callback, payload) {
  console.log("getAllMissions >>>>");
  var res = [];
  var jqxhr = $.getJSON('http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/runNamedQueryForUser?clz=com.dronedb.persistence.scheme.Mission&queryString=GetAllMissions&userName=talma1', function(data,status) {
      // console.log(data);
      console.log(data.resultList);
      var arrayLength = data.resultList.length;
      console.log("Total amount of missions: " + arrayLength);
      console.log(callback);
      // if (arrayLength == 0)
      //   callback(0);
      // else
      //   callback(JSON.stringify(data.resultList));
      callback(data.resultList, payload);
  });
  console.log("<<<< getAllMissions");
  return res;
}

/********************************************************/
/************  Mission creation handling  **************/
/********************************************************/

function createMission(name, callback, payload) {

  function setNameToMission(data, payload) {
    console.log("setNameToMission >>>>");
    console.log("Data: " + JSON.stringify(data));
    console.log("payload: " + JSON.stringify(payload));
    var name = payload[0];
    //function callback = payload[1];
    var payload = payload[1];

    data['name'] = name;
    console.log("Updated Data: " + JSON.stringify(data));
    updateForUser(data, callback, payload);
    console.log("<<<< setNameToMission");
  }


  console.log("createMission >>>>");
  console.log("callback: " + callback);
  const newPayload = [name, payload];
  console.log("newPayload: " + JSON.stringify(newPayload));
  var res = create("com.dronedb.persistence.scheme.Mission", setNameToMission, newPayload);
  console.log("<<<< createMission");
}

/*********************************************************************/
/********************* Setting Points to Mission   *******************/
/*********************************************************************/

function setPointsOnMission(data, payload) {
  console.log("New Point: " + JSON.stringify(data));
  console.log("Finish with all !! " + payload);
  data['missionItemsUids'].push(payload);
  console.log("New Point: " + JSON.stringify(data));
  updateForUser(data, null, null);
  console.log("Finish with all !! ");
}

function updatedMissionItemLatLng(data, payload) {
  console.log("Done: " + JSON.stringify(data));
  console.log("Finish with all !!");
  readByClass(payload['uid'], "com.dronedb.persistence.scheme.Mission", setPointsOnMission, data['keyId']['objId']);
}

function updateMissionItemLatLng(data, payload) {
  // console.log("New Point: " + JSON.stringify(data));
  var latlng = payload['latlng'];
  data['lat'] = latlng['lat'];
  data['lon'] = latlng['lng'];
  // console.log("newPayload: " + JSON.stringify(data));
  updateForUser(data, updatedMissionItemLatLng, payload);
}

function addPointToMission(uid, latlng) {
  console.log("addPointToMission >>>>");
  console.log("Mission " + uid);

  var payload = {latlng, uid};
  console.log("Handling waypoint");
  create("com.dronedb.persistence.scheme.Waypoint", updateMissionItemLatLng, payload);

  console.log("<<<< addPointToMission");
}
