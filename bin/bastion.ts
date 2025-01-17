#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BastionStack } from '../lib/bastion-stack';

// read the cloud formation parameters from the file
const cloudFormationParameters = require('../lib/bastion-stack-props.ts');

const app = new cdk.App();
new BastionStack(app, 'BastionStack', {

  env: { account: cloudFormationParameters.account, region: cloudFormationParameters.region },
  vpcId: cloudFormationParameters.vpcId,
});