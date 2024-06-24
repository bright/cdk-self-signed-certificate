import { awscdk } from 'projen';
import { BundleLogLevel } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Piotr Mionskowski',
  authorAddress: 'piotr@brightinventions.pl',
  cdkVersion: '2.147.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: '@brightinventions/cdk-self-signed-certificate',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/piotr.mionskowski/bright-cdk-self-signed-certificate.git',
  bundledDeps: ['selfsigned'],
  // deps: ,                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['@types/aws-lambda'], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.bundler.addBundle('./src/self-signed-certificate-lambda', {
  logLevel: BundleLogLevel.INFO,
  target: 'node20',
  platform: 'node',
});

project.package.addField('publishConfig', {
  access: 'public', // https://stackoverflow.com/a/59711239
});


project.addGitIgnore('.idea');

project.synth();
