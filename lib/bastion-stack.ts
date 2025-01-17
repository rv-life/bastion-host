import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';


interface BastionStackProps extends cdk.StackProps {
  vpcId: string;
}

export class BastionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BastionStackProps) {
    super(scope, id, props);
    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      vpcId: props.vpcId,
    });
    const host = new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc: vpc,
    });

    // Attach an IAM role with SSM permissions
    const ssmRole = new iam.Role(this, 'SSMRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    ssmRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    host.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    // Optionally, you can remove SSH access if you want to rely solely on SSM
    // host.allowSshAccessFrom(ec2.Peer.ipv4('99.18.36.250/32'));

    // Allow outbound traffic on port 443 (HTTPS)
    host.connections.allowToAnyIpv4(ec2.Port.tcp(443), 'Allow outbound HTTPS traffic');

    // Add VPC Endpoints for Systems Manager
    vpc.addInterfaceEndpoint('SSM', {
      service: ec2.InterfaceVpcEndpointAwsService.SSM,
    });

    vpc.addInterfaceEndpoint('EC2Messages', {
      service: ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES,
    });

    vpc.addInterfaceEndpoint('SSMMessages', {
      service: ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES,
    });
  }
}
