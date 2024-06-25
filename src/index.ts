import * as path from 'node:path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CustomResourceProps } from './self-signed-certificate-lambda';

export interface SelfSignedCertificateProps {
  readonly certificateDetails: {
    commonName: string;
    [key: string]: string;
  };
  readonly tags?: Record<string, string>;
}

const CustomResourceType = 'Custom::SelfSignedCertificate';

export class SelfSignedCertificate extends Construct {
  private provider: CustomResourceProvider;

  private customResource: CustomResource;

  constructor(scope: Construct, id: string, props: SelfSignedCertificateProps) {

    super(scope, id);
    const packageDir = path.dirname(require.resolve('@brightinventions/cdk-self-signed-certificate/package.json'));

    this.provider = CustomResourceProvider.getOrCreateProvider(this, CustomResourceType, {
      codeDirectory: path.join(packageDir, 'assets', 'self-signed-certificate-lambda'),
      runtime: CustomResourceProviderRuntime.NODEJS_20_X,
      description: 'Lambda function created by the custom resource provider',
      policyStatements: [{
        Effect: 'Allow',
        Action: ['acm:ImportCertificate', 'acm:AddTagsToCertificate'],
        Resource: '*',
      }],
    });

    const tags = props.tags ?? {};
    const resourceProps: CustomResourceProps = {
      certificateDetails: props.certificateDetails,
      tags: Object.keys(tags).map((key) => ({
        key: key,
        value: tags[key],
      })),
    };

    this.customResource = new CustomResource(this, 'resource', {
      serviceToken: this.provider.serviceToken,
      resourceType: CustomResourceType,
      properties: resourceProps,
    });
  }

  get certificateArn() {
    return this.customResource.getAttString('CertificateArn');
  }
}
