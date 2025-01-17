# AWS CDK Bastion Host Template

This CDK template deploys a secure bastion host (jump box) in your AWS VPC with AWS Systems Manager Session Manager support. The bastion host can be used to securely access resources in private subnets.

## Features

- Linux-based bastion host
- AWS Systems Manager Session Manager integration for secure shell access
- Required VPC endpoints for SSM connectivity
- IAM roles and policies for secure access
- Outbound HTTPS access for package updates
- Optional SSH access (disabled by default in favor of SSM)

## Prerequisites

- AWS CDK CLI installed (`npm install -g aws-cdk`)
- Node.js 14.x or later
- An existing VPC in your AWS account
- AWS credentials configured locally

## Installation

1. Clone this repository:
2. Run `npm install` to install the dependencies
3. Bootstrap your AWS environment (if you haven't already):
   ```bash
   npx cdk bootstrap
   ```
4. Run `npx cdk deploy` to deploy the stack

## Configuration

- Replace the placeholder values in `lib/bastion-stack-props.ts` with your actual VPC ID and AWS account ID.
- Adjust the stack parameters as needed for your environment.

## Usage

- Once deployed, you can access the bastion host using the AWS Systems Manager Session Manager.

IE:

```bash
aws ssm start-session --target i-xxxxxxxxxxxxxxxxx
```


## Cleanup

- Run `npx cdk destroy` to remove the bastion host and associated resources.

## Notes

- This template assumes that the VPC and subnets are already created and configured.
- Adjust the security groups and IAM roles as needed for your environment.
- The bastion host will be deployed in the specified VPC and subnets.
