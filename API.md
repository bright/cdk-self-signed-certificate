# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SelfSignedCertificate <a name="SelfSignedCertificate" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate"></a>

#### Initializers <a name="Initializers" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer"></a>

```typescript
import { SelfSignedCertificate } from '@brightinventions/cdk-self-signed-certificate'

new SelfSignedCertificate(scope: Construct, id: string, props: SelfSignedCertificateProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer.parameter.props">props</a></code> | <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificateProps">SelfSignedCertificateProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.Initializer.parameter.props"></a>

- *Type:* <a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificateProps">SelfSignedCertificateProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.isConstruct"></a>

```typescript
import { SelfSignedCertificate } from '@brightinventions/cdk-self-signed-certificate'

SelfSignedCertificate.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificate.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### SelfSignedCertificateProps <a name="SelfSignedCertificateProps" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificateProps"></a>

#### Initializer <a name="Initializer" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificateProps.Initializer"></a>

```typescript
import { SelfSignedCertificateProps } from '@brightinventions/cdk-self-signed-certificate'

const selfSignedCertificateProps: SelfSignedCertificateProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@brightinventions/cdk-self-signed-certificate.SelfSignedCertificateProps.property.certificateDetails">certificateDetails</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `certificateDetails`<sup>Required</sup> <a name="certificateDetails" id="@brightinventions/cdk-self-signed-certificate.SelfSignedCertificateProps.property.certificateDetails"></a>

```typescript
public readonly certificateDetails: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---



