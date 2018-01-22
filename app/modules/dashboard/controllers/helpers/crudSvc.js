

function readByClass(uid, clz, callback, payload) {
  console.log("readByClass >>>>");
  console.log("Sending: " + 'http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/readByClass?objId=' + uid + '&clz=' + clz + '&userName=talma1');

  $.getJSON('http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/readByClass?objId=' + uid + '&clz=' + clz + '&userName=talma1', function(data, status) {
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

function create(clz, callback, payload) {
  console.log("create >>>>");
  console.log("Sending: " + 'http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/createForUser?clz=' + clz + '&userName=talma1');

  $.getJSON('http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/createForUser?clz=' + clz + '&userName=talma1', function(data, status) {
      // console.log(data);
      callback(data, payload);
  });

  console.log("<<<< create");
}

function updateForUser(obj, callback, payload) {
  console.log("updateForUser >>>>");
  console.log("Sending: " + 'http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/updateForUser?userName=talma1');
  // console.log("Data " + obj);

  var postData = JSON.stringify(obj);
  // console.log("TAL " + postData);
  $.ajax({
    type: 'POST',
    url: 'http://' + SERVERIP + ':8081/ServerCore-1.5.9.RELEASE/updateForUser?userName=talma1',
    data: postData,
    contentType: "application/json",
    dataType: 'json',
    success: function (response, status) {
      // console.log(JSON.stringify(response));
      if (callback != null)
        callback(response, payload);
    },
    error: function(response, status) {
        console.log(JSON.stringify(response));
    }
  });

  console.log("<<<< updateForUser");
}
