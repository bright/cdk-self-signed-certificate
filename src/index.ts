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


// class SelfSignedCertificateResourceProvider extends Construct {
//   readonly provider: Provider;
//
//   constructor(scope: Construct, id: string) {
//     super(scope, id);
//
//     const onEvent = new NodejsFunction(this, 'OnEventHandler', {
//       runtime: Runtime.NODEJS_20_X,
//       entry: path.join(__dirname, 'self-signed-certificate-lambda', 'lambda.ts'),
//     });
//
//     this.provider = new Provider(this, id, {
//       onEventHandler: 'onEvent',
//
//     });
//   }
//
//   static getOrCreate(scope: Construct) {
//     const id = 'SelfSignedCertificateResourceProvider';
//     return Stack.of(scope).node.tryFindChild(id) ?? new SelfSignedCertificateResourceProvider(scope, id, {});
//   }
// }

const CustomResourceType = 'Custom::SelfSignedCertificate';

export class SelfSignedCertificate extends Construct {
  private provider: CustomResourceProvider;

  constructor(scope: Construct, id: string, props: SelfSignedCertificateProps) {

    super(scope, id);
    const packageDir = path.dirname(require.resolve('@brightinventions/cdk-self-signed-certificate/package.json'));

    this.provider = CustomResourceProvider.getOrCreateProvider(this, CustomResourceType, {
      codeDirectory: path.join(packageDir, 'assets', 'self-signed-certificate-lambda'),
      runtime: CustomResourceProviderRuntime.NODEJS_20_X,
      description: 'Lambda function created by the custom resource provider',
      policyStatements: [{
        Effect: 'Allow',
        Action: 'acm:ImportCertificate',
        Resource: '*',
      }],
    });

    const tags = props.tags ?? {};
    const resourceProps: CustomResourceProps = {
      certificateDetails: props.certificateDetails,
      tags: Object.keys(tags).map((key) => ({ key: key, value: tags[key] })),
    };

    new CustomResource(this, 'resource', {
      serviceToken: this.provider.serviceToken,
      resourceType: CustomResourceType,
      properties: resourceProps,
    });
  }


}
