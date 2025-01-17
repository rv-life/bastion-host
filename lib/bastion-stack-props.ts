interface BastionStackConfiguration {
    account: string;
    region: string;
    vpcId: string;
}

const configuration: BastionStackConfiguration = {
    account: '123456789012', // Replace with your AWS account ID
    region: 'us-east-1',     // Replace with your desired region
    vpcId: 'vpc-YOUR_VPC_ID', // Replace with your VPC ID
};

export = configuration; 