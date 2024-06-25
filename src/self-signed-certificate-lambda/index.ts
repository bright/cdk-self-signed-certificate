import { ACMClient, ImportCertificateCommand } from '@aws-sdk/client-acm';
import type { CdkCustomResourceEvent, CdkCustomResourceHandler } from 'aws-lambda';
import type { pki } from 'node-forge';
import { generate } from 'selfsigned';

const acmClient = new ACMClient({});

export type CustomResourceProps = {
  certificateDetails: { commonName: string; [key: string]: string };
  tags?: { key: string; value: string }[];
};

type ResourceProps = CdkCustomResourceEvent['ResourceProperties'] & CustomResourceProps

export const handler: CdkCustomResourceHandler = async (event) => {
  if (event.RequestType == 'Delete') {
    // TODO: remove from imports?
    return {};
  }

  const resourceProps = event.ResourceProperties as ResourceProps;
  const certificateDetails = resourceProps.certificateDetails;
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
    Tags: resourceProps.tags?.map(({
      key,
      value,
    }) => ({
      Key: key,
      Value: value,
    })),
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
