

function readByClass(uid, clz, callback, payload) {
  console.log("readByClass >>>>");
  console.log("Sending: " + 'http://localhost:8080/readByClass?objId=' + uid + '&clz=' + clz + '&userName=talma1');

  $.getJSON('http://localhost:8080/readByClass?objId=' + uid + '&clz=' + clz + '&userName=talma1', function(data, status) {
    // console.log(data);
    // console.log(callback);
    // if (arrayLength == 0)
    //   callback(0);
    // else
    //   callback(JSON.stringify(data.resultList));
    callback(data, payload);
  });
  console.log("<<<< readByClass");
}
