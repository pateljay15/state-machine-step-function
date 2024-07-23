# Serverless Computing with AWS

Welcome to the Serverless Computing with AWS repository. This professional project showcases the implementation of a serverless architecture using Amazon Web Services (AWS). Through this repository, we explore the world of serverless computing, API Gateway integration, and AWS Lambda, creating a robust serverless solution.

---

## Overview

Dive into the realm of serverless applications with the Serverless Computing with AWS repository. This project exemplifies the use of AWS Step Functions, AWS Lambda, and API Gateway to develop and deploy a powerful serverless application. From state machine workflows to secure hashing operations, this project covers it all.

### Learning Outcomes

This repository embodies the mastery of the following concepts:

- Serverless computing with AWS Lambda
- Building and configuring state machines using AWS Step Functions
- Creating REST APIs with AWS API Gateway
- Implementing common encryption algorithms in a serverless environment
- Managing API requests and responses through API Gateway
- Automating workflows with state machines

### Key Requirements

1. **State Machine Development:** Develop a state machine using AWS Step Functions, configured with API Gateway to handle JSON inputs and invoke Lambda functions based on specified choices.

2. **Lambda Functions:** Implement Lambda functions to perform hashing operations (SHA-256, MD5, Bcrypt) on provided input data. Ensure the correct algorithms and encoding are used.

3. **API Gateway Integration:** Expose the state machine and Lambda functions as REST APIs using AWS API Gateway. Ensure seamless interaction between the APIs and the state machine.

4. **Encryption Algorithms:** Perform specific hashing operations using SHA-256, MD5, and Bcrypt algorithms with proper encoding and configurations.

5. **Automated Workflows:** Utilize AWS Step Functions to automate the workflow based on input data and selected actions, triggering the appropriate Lambda functions.

### Repository Contents

This repository includes:

- Lambda function source code for SHA-256, MD5, and Bcrypt hashing operations
- AWS Step Functions state machine definition
- Step Function Deployment scripts/configuration files
- Detailed documentation outlining the project's architecture, design principles, and instructions for setup and execution

![AWS Step Function Workflow](https://github.com/pateljay15/state-machine-step-function/blob/main/state-machine-workflow.png)  <!-- Replace with the actual path to your image -->

---

## AWS Step Functions

AWS Step Functions allow you to coordinate multiple AWS services into serverless workflows so you can build and update apps quickly. Using Step Functions, you can design and run workflows that stitch together services such as AWS Lambda and Amazon ECS into feature-rich applications.

### State Machine Definition

In this project, the state machine is designed to process JSON inputs and select an appropriate action based on the provided data. The state machine consists of choice states and task states, allowing it to branch into different Lambda functions for performing SHA-256, MD5, or Bcrypt hashing operations.

The state machine starts with an API Gateway endpoint, `/hashing/select`, which triggers the workflow. Based on the action specified in the input, the state machine routes the request to the corresponding Lambda function. The state machine's choice state evaluates the input and directs the workflow accordingly.

### Example State Machine Workflow

1. **Start**: The workflow is initiated by an API Gateway request to the `/hashing/select` endpoint.
2. **Choice State**: Evaluates the `action` parameter from the input to determine which hashing function to invoke.
   - **SHA-256**: Routes to the SHA-256 Lambda function.
   - **MD5**: Routes to the MD5 Lambda function.
   - **Bcrypt**: Routes to the Bcrypt Lambda function.
3. **Task State**: Invokes the selected Lambda function to perform the hashing operation.
4. **End**: The Lambda function processes the input data, performs the hashing operation, and sends the result back through a specified endpoint.

### Example Input JSON

```json
{
  "input": {
    "course_uri": "https://your-api-endpoint/serverless/end",
    "action": "sha256",
    "value": "exampledata"
  },
  "stateMachineArn": "your-state-machine-arn"
}
