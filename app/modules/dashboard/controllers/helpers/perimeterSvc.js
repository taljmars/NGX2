

// Gett all PolylinePerimeter :

function getAllPolylinePerimeter(callback, payload) {
  console.log("getAllPolylinePerimeter >>>>");
  var res = [];
  var jqxhr = $.getJSON('http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/runNamedQueryForUser?clz=com.dronedb.persistence.scheme.Perimeter&queryString=GetAllPolygonPerimeters&userName=talma1', function(data,status) {
      // console.log(data);
      console.log(data.resultList);
      var arrayLength = data.resultList.length;
      console.log("Total amount of perimeters: " + arrayLength);
      console.log(callback);
      // if (arrayLength == 0)
      //   callback(0);
      // else
      //   callback(JSON.stringify(data.resultList));
      callback(data.resultList, payload);
  });
  console.log("<<<< getAllPolylinePerimeter");
  return res;
}

function createPoint(lat, lng, callback, payload) {
  console.log("createPoint >>>>");
  var res = create("com.dronedb.persistence.scheme.Point", callback, payload);
  console.log("<<<< createPoint");
}

/********************************************************/
/************  Polyline creation handling  **************/
/********************************************************/

function createPolygonPerimeter(name, callback, payload) {

  function setNameToPolygon(data, payload) {
    console.log("setNameToPolygon >>>>");
    console.log("Data: " + JSON.stringify(data));
    console.log("payload: " + JSON.stringify(payload));
    var name = payload[0];
    //function callback = payload[1];
    var payload = payload[1];

    data['name'] = name;
    console.log("Updated Data: " + JSON.stringify(data));
    updateForUser(data, callback, payload);
    console.log("<<<< setNameToPolygon");
  }


  console.log("createPolygonPerimeter >>>>");
  console.log("callback: " + callback);
  const newPayload = [name, payload];
  console.log("newPayload: " + JSON.stringify(newPayload));
  var res = create("com.dronedb.persistence.scheme.PolygonPerimeter", setNameToPolygon, newPayload);
  console.log("<<<< createPolygonPerimeter");
}

/*********************************************************************/
/****************** Setting Points to PolygonPerimeter   *************/
/*********************************************************************/

function setPointsOnPolygon(data, payload) {
  console.log("New Point: " + JSON.stringify(data));
  console.log("Finish with all !! " + payload['pointSet']);
  data['points'] = payload;
  console.log("New Point: " + JSON.stringify(data));
  updateForUser(data, null, null);
  console.log("Finish with all !! " + payload['pointSet']);
}

function updatedPointLatLng(data, payload) {
  console.log("Done: " + JSON.stringify(data));
  var index = payload['index'];
  var pointArr = payload['pointArr'];

  payload['pointSet'][index] = data['keyId']['objId'];
  payload['index'] = index + 1;
  if (index < pointArr.length - 1) {
    console.log("Handling point #" + (index + 1));
    create("com.dronedb.persistence.scheme.Point", updateLatLng, payload);
  }
  else {
    console.log("Finish with all !! " + payload['pointSet']);
    readByClass(payload['uid'], "com.dronedb.persistence.scheme.PolygonPerimeter", setPointsOnPolygon, payload['pointSet']);
  }
}

function updatePointLatLng(data, payload) {
  // console.log("New Point: " + JSON.stringify(data));
  var index = payload['index'];
  var pointArr = payload['pointArr'];
  data['lat'] = pointArr[index]['lat'];
  data['lon'] = pointArr[index]['lng'];
  // console.log("newPayload: " + JSON.stringify(data));
  updateForUser(data, updatedPointLatLng, payload);
}

function setPointsToPolygon(uid, pointArr) {
  console.log("setPointsToPolygon >>>>");
  console.log("Polygon " + uid);
  var pointSet = [];

  var index = 0;
  var payload = {index, pointArr, pointSet, uid};
  console.log("Handling point #0");
  create("com.dronedb.persistence.scheme.Point", updatePointLatLng, payload);

  console.log("<<<< setPointsToPolygon");
}
