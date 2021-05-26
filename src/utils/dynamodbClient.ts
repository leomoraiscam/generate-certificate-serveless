import 'dotenv/config';

import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const devOption = {
  region: 'us-east-1',
  endpoint: `https://dynamodb.us-east-1.amazonaws.com/`
}

const isOffline = () => {
  return false
}

export const document = isOffline() ? 
  new DynamoDB.DocumentClient(options) : 
  new DynamoDB.DocumentClient(devOption)
