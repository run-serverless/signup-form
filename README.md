# Early Access Signup Form

Collection early access signups using a simple form and Serverless backend.

Deploys infrastructure to handle signups including:

- API Gateway to handle REST API calls
- Lambda to validate the signup and save to DynamoDB (using Express.js)
- DynamoDB table is created using Dynamoose

## Prerequisites

- AWS account
- AWS CLI installed and configured with credentials
- A centralised Serverless Framework deployment bucket using the format `<aws-account-id>--serverless-deploys`

Replace `<aws-account-id>` with your AWS account ID.

## Configuration

### Backend

Open the **schema.js** file in **src/backend**, modify the validation schema which uses Joi and the database schema
which uses Dynamoose.

## Usage

### Deploy Infrastructure (dev)

Deploys 
```
npx serverless deploy
```

### Deploy Infrastructure (staging/production)

```
npx serverless deploy --stage production
```

### Deploying Lambda/function updates only

```
npx serverless deploy function -f api
```

Note you can pass other parameters such as the `stage` to deploy to your production version.

### Using a custom table name

Override the default table name. Default is `signups`. If you use a custom table name you must pass this option every
time you run a full deployment.

```
npx serverless deploy --stage live --param="table=users"
```