const handler = require("../handler");
const DynamoDB = require("../lib/dynamodb");

module.exports.get = handler(function*(event) {
  console.log(event);
  const { Item } = yield DynamoDB.get({
    TableName: "recipes",
    Key: { id: parseInt(event.pathParameters.id) },
  }).promise();
  return {
    statusCode: 200,
    body: {
      message: "Recipe details by id",
      recipe: [Item],
    },
  };
});
