import * as path from 'node:path';
import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface SelfSignedCertificateProps {
  readonly certificateDetails: {
    commonName: string;
    [key: string]: string;
  };
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
    const packageDir = path.dirname(require.resolve('@brightinventions/cdk-self-signed-certificate'));
    this.provider = CustomResourceProvider.getOrCreateProvider(this, CustomResourceType, {
      codeDirectory: path.join(packageDir, 'assets', 'self-signed-certificate-lambda'),
      runtime: CustomResourceProviderRuntime.NODEJS_20_X,
      description: 'Lambda function created by the custom resource provider',
    });

    new CustomResource(this, 'resource', {
      serviceToken: this.provider.serviceToken,
      resourceType: CustomResourceType,
      properties: props,
    });
  }


}
