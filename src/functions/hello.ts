export const handle = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "hello word - serverless"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}