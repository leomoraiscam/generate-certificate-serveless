import 'dotenv/config';

import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const devOption = {
  region: process.env.AWS_REGION,
  endpoint: `https://dynamodb.${process.env.AWS_REGION}.amazonaws.com/`
}

const isOffline = () => {
  return false
}

export const document = isOffline() ? 
  new DynamoDB.DocumentClient(options) : 
  new DynamoDB.DocumentClient(devOption)
