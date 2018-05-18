const handler = require("../handler");
const DynamoDB = require("../lib/dynamodb");

module.exports.get = handler(function*(event) {
  const { Items } = yield DynamoDB.scan({
    TableName: "recipes",
  }).promise();
  console.log(Items);

  return {
    statusCode: 200,
    body: { recipes: Items },
  };
});
