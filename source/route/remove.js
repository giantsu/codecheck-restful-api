const handler = require("../handler");

module.exports.delete = handler(function*(event) {
  console.log(event);
  return {
    statusCode: 200,
  };
});
