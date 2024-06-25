import type { CdkCustomResourceHandler } from 'aws-lambda';
import type { pki } from 'node-forge';
import { generate } from 'selfsigned';
import { ACMClient, ImportCertificateCommand } from '@aws-sdk/client-acm';

const acmClient = new ACMClient({});

export const handler: CdkCustomResourceHandler = async (event) => {
  if (event.RequestType == 'Delete') {
    // TODO: remove from imports?
    return {};
  }

  const certificateDetails = event.ResourceProperties.certificateDetails;
  const certFields: pki.CertificateField[] = Object.keys(certificateDetails).map(key => ({
    name: key,
    value: certificateDetails[key],
  }));

  const generatedCertificate = generate(certFields, {
    days: 365 * 10,
  });

  const importResult = await acmClient.send(new ImportCertificateCommand({
    CertificateArn: event.RequestType == 'Update' ? event.PhysicalResourceId : undefined,
    Certificate: new Uint8Array(Buffer.from(generatedCertificate.cert, 'utf-8')),
    PrivateKey: new Uint8Array(Buffer.from(generatedCertificate.private, 'utf-8')),
    Tags: event.ResourceProperties.tags,
  }));

  console.log('Import result', importResult.CertificateArn);

  return {
    PhysicalResourceId: importResult.CertificateArn,
    Data: {
      PublicKey: generatedCertificate.public,
      Certificate: generatedCertificate.cert,
      CertificateArn: importResult.CertificateArn,
    },
  };
};
