const handler = require("../handler");
const DynamoDB = require("../lib/dynamodb");

module.exports.delete = handler(function*(event) {
  let resBody, resStatus;
  try {
    yield DynamoDB.delete({
      TableName: "recipes",
      Key: { id: parseInt(event.pathParameters.id) },
    }).promise();
    resStatus = 200;
    resBody = { message: "Recipe successfully removed!" };
  } catch (e) {
    resStatus = 400;
    resBody = { message: "No Recipe found" };
  }

  return {
    statusCode: resStatus,
    body: resBody,
  };
});
