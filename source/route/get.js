const handler = require("../handler");

module.exports.post = handler(function*(event) {
  console.log(event);
  return {
    statusCode: 200,
  };
});
