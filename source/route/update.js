const handler = require("../handler");
const DynamoDB = require("../lib/dynamodb");
const moment = require("moment");

module.exports.patch = handler(function*(event) {
  const json = JSON.parse(event.body);
  yield DynamoDB.update({
    TableName: "recipes",
    Key: { id: parseInt(event.pathParameters.id) },
    UpdateExpression:
      "set #t = :title, #m = :making_time, #s = :serves, #i = :ingredients, #c = :cost, #u = :updated_at",
    ExpressionAttributeValues: {
      ":title": json.title,
      ":making_time": json.making_time,
      ":serves": json.serves,
      ":ingredients": json.ingredients,
      ":cost": json.cost,
      ":updated_at": moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    ExpressionAttributeNames: {
      "#t": "title",
      "#m": "making_time",
      "#s": "serves",
      "#i": "ingredients",
      "#c": "cost",
      "#u": "updated_at",
    },
  }).promise();

  return {
    statusCode: 200,
    body: {
      message: "Recipe successfully updated!",
      recipe: [json],
    },
  };
});
