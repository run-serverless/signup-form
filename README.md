# Early Access Signup Form

Collection early access signups using a simple form and Serverless backend.

Deploys infrastructure to handle signups including:

- API Gateway to handle REST API calls
- Lambda to validate the signup and save to DynamoDB (using Express.js)
- DynamoDB table is created using [Dynamoose](https://dynamoosejs.com)
- Backend validation using [Joi](https://joi.dev/)

## Prerequisites

- AWS account
- AWS CLI installed and configured with credentials
- A centralised Serverless Framework deployment bucket using the format `<aws-account-id>--serverless-deploys`

Replace `<aws-account-id>` with your AWS account ID.

## Configuration

Open the **[schema.js](./src/backend/schema.js)** file in **src/backend**, modify the validation schema which uses Joi
and the database schema which uses Dynamoose.

## Usage

### Deploy Infrastructure (dev)

Deploys all the infrastructure and appends **-dev** to resource names.

```
npx serverless deploy
```

### Deploy Infrastructure (staging/production)

Deploy infrastructure with a specific stage name appended to resource names. In the example below resources will have
**-production** appended to them.

```
npx serverless deploy --stage production
```

### Deploying Lambda/Function Updates Only

If you are only updating the Lambda code/application you can skip infrastructure deployment and only update the Lambda.

```
npx serverless deploy function -f api
```

Note you can pass other parameters such as the `stage` to deploy to your production version.

### Using a Custom Table Name

Override the default table name. Default is `signups`. If you use a custom table name you must pass this option every
time you run a deployment.

```
npx serverless deploy --stage live --param="table=users"
```

## Calling the API

Once deployed you should see an output listing the service details, similar to:

```
service: signup-form
stage: live
region: us-east-1
stack: signup-form-live
endpoint: ANY - https://ft342p99e7.execute-api.us-east-1.amazonaws.com
functions:
  api: signup-form-live-api
```

You can call the API using the endpoint URL, **/signup** resource and JSON payload.

Here is a cURL example:

```
curl --location 'https://ft342p99e7.execute-api.us-east-1.amazonaws.com/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "bob@domain.com",
    "name": "Bob"
}'
```

## Sample HTML Form

There is a **[sample form](./src/frontend/index.html)** you can use as a starting point in the **src/frontend** folder.
The form POST's the form data to the endpoint URL created during the infrastructure deployment.

Update the endpoint URL, form fields and JavaScript to match the field names you expect to receive and process in the
Lambda. The example form handles `email` and `name` which matches the `email` and name in the backend.
