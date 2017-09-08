const $ = require('jquery');

// Function sends a RESTful api request based on the specified type
// function accepts:
// requestType - 'GET', 'POST', etc. [String]
// url - endpoint to which request should be statement [String]
// dataToBeSent - data object to be sent (doesn't need to be stringified) [Object]
// callback - callback executed upon successful request [Function]
module.exports.get = (url, callback) => {
  $.ajax({
    url: url,
    type: 'GET',
    success: (data) => {
      if (callback) {
        callback(JSON.parse(data));
      }
    },
    error: (error) => {
      throw error;
    }
  });
};

module.exports.post = (url, dataToBeSent, callback) => {
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(dataToBeSent),
    success: (data) => {
      console.log('POST request: success');
      if (callback) {
        callback(JSON.parse(data));
      }
    },
    error: (error) => {
      throw error;
    }
  });
};
