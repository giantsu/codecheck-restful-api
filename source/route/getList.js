const handler = require("../handler");

module.exports.get = handler(function*(event) {
  console.log(event);
  return {
    statusCode: 200,
  };
});
