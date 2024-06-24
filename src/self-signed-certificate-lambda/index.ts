import type { CdkCustomResourceHandler } from 'aws-lambda';
import type { pki } from 'node-forge';
import { generate } from 'selfsigned';


export const handler: CdkCustomResourceHandler = async (event) => {
  if (event.RequestType == 'Delete') {
    // TODO: remove from imports
    return {
    };
  }

  const certificateDetails = event.ResourceProperties.certificateDetails;
  const certFields: pki.CertificateField[] = Object.keys(certificateDetails).map(key => ({
    name: key,
    value: certificateDetails[key],
  }));

  const generatedCertificate = generate(certFields, {
    days: 365 * 10,
  });

  return {
    Data: {
      public: generatedCertificate.public,
      cert: generatedCertificate.cert,
    },
  };
};
