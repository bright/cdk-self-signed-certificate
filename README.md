# CDK Construct to create a self-signed certificate

## Security warning ‼️

Self-signed certificates are usually used only in development environments or applications deployed internally to an
organization. Certificates of this type are generally not trusted by client software such as web browsers. Therefore
clients are likely to generate trust warnings when connecting to a server that has a self-signed certificate.

## Use cases

Secure communication between CloudFront and e.g. Application Load Balancer when the ALB can't have a regular publicly
trusted certificate. 
