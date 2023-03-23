# 18. Encryption

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 9.0</p>

The crypto engines of PIPEFORCE allow to encrypt and decrypt data very effectively so workflows can be implemented in an very secure way.


## Keystore

If you're using PIPEFORCE as a cloud service, a random secure keystore is automatically provided to your instance. This keystore is generated in an encrypted wallet oustide the PIPEFORCE cloud and is never persisted somewhere else. The keystore will also take part on key rotations which will take place in order to change the keys from time to time. So all setup for you by default in a most secure way.

:::note Zero Knowledge
If you would like to, you can provide your own keystore. In this case, please contact the support so they will provide you with instructions how you can add your own keystore at runtime.
If you provide your own keystore, the system switches to zero knowledge. Meaning, the PIPEFORCE support team has no possibility to access your encrypted data even if it is stored in the cloud. But this also means from that time on, you have to manage these keys for yourself. The instance will no longer
be part of recurring key rotations done for all keystores managed by PIPEFORCE and if you lost your keystore, you can no longer access your data. 
:::

In case an error occurs during execution of a command, the execution of the command and/or the according pipeline stops by default and an error message is sent back to the caller. You have different options to adjust this default behaviour.

## Auto-encrypting properties

In order to store property values only in encrypted format in the property store, you have to set the parameter `encrypted` to `true` when you create the property schema using the command `property.schema.put`. For example:

```yaml
pipeline:
  - property.schema.put:
      path: "global/app/myapp/data/secret"
      encrypted: true
```

When storing value to this property later using the command `property.put` this value is automatically encrypted using AES-256 with CBC mode before it gets stored to the database using the default access key of the platform. So you can be sure that the data is encrypted at rest.

:::caution
Encrypting the value of a property this way increases security but also has some drawbacks you have to be aware of:

- You can no longer apply in-database JSON queries on encrypted property values.
- Events with the properties as payload (for example `property.created` or `property.updated`) will send the payload in messages also encrypted. So listeners to these events do have limited access to this property.
- In lists where a set of properties is returned, the encrypted property stays encrypted. So you could have a mixture of plain text and encrypted properties for example. You have to make sure to handle this in your application accordingly.
- Once a property was set to `encrypted:true` it cannot be switched back to plain text.
:::

## Auto-decrypting properties

Once a property has been stored encrypted in the property store you can load and decrypt its value using the command `property.value.get` with parameter `decrypt` set to `true`. For example:

```yaml
pipeline:
  - property.value.get:
      path: "global/app/myapp/data/secret"
      decrypt: true
```

In this case the property will be automatically decrypted using the default access key of the platform and then returned.

:::info Note
This is the only way to decrypt the value of the property. For performance and security reasons it is not possible to "mass-decrypt" properties returned in a list. For example by using the command `property.get` with a path pattern.
:::

## Custom encryption and decryption

You can also encrypt and decrypt data in PIPEFORCE using AES-256 in CBC mode by providing your own encryption key. For this see the command `data.encrypt` and `data.decrypt` where you can set your custom key.

:::info Note
When using custom encryption and decryption you have to make sure by your own to manage the encryption keys securely.
:::

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::