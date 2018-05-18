const co = require("co");

module.exports = function(handleFn) {
  return (event, context, callback) => {
    co(function*() {
      const result = yield handleFn(event, context);
      const response = {
        statusCode: result.statusCode || 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(result.body),
      };
      callback(null, response);
    }).catch(err => {
      callback(err);
    });
  };
};
