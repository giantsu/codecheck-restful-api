const handler = require("../handler");

module.exports.patch = handler(function*(event) {
  console.log(event);
  return {
    statusCode: 200,
  };
});
