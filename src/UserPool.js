import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-2_QYsP0bmqJ",
  ClientId: "v2jmd1601r4ael8pgnog0lq4j",
};

export default new CognitoUserPool(poolData);
