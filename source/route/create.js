const handler = require("../handler");
const DynamoDB = require("../lib/dynamodb");
const moment = require("moment");

module.exports.post = handler(function*(event) {
  const json = JSON.parse(event.body);
  let resBody, resStatus;
  try {
    yield DynamoDB.put({
      TableName: "recipes",
      Item: {
        id: 3,
        title: json.title,
        making_time: json.making_time,
        serves: json.serves,
        ingredients: json.ingredients,
        cost: json.cost,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    }).promise();

    resBody = {
      message: "Recipe successfully created!",
      recipe: [json],
    };
    resStatus = 200;
  } catch (e) {
    resBody = {
      message: "Recipe creation failed!",
      required: "title, making_time, serves, ingredients, cost",
    };
    resStatus = 400;
  }

  return {
    statusCode: resStatus,
    body: resBody,
  };
});
