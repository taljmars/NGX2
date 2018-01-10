

// Gett all PolylinePerimeter :

function getAllPolylinePerimeter(callback, payload) {
  console.log("getAllPolylinePerimeter >>>>");
  var res = [];
  var jqxhr = $.getJSON('http://localhost:8080/runNamedQueryForUser?clz=com.dronedb.persistence.scheme.Perimeter&queryString=GetAllPolygonPerimeters&userName=talma1', function(data,status) {
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
