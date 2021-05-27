import 'dotenv/config';

import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const devOption = {
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_DYNAMO_DB_URL
}

const isOffline = () => {
  return process.env.IS_OFFLINE
}

export const document = isOffline() ? 
  new DynamoDB.DocumentClient(options) : 
  new DynamoDB.DocumentClient(devOption)
