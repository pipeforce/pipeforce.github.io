# Authorization

Before you can call a pipeline or command from remote, you need to authorize ("login") first. This can be done in different ways depending on your requirements.

## HTTP Header Authorization

You can authorize using the HTTP header `authorization`.
This header must be set with any remote call of the pipeline or command API endpoint.

:::note
Since the HTTP header keys are case-**in**sensitive, PIPEFORCE will convert any incoming HTTP header
key to lower case and uses its lower case representation internally. This helps to avoid confusions
with pipeline headers, those keys are case-sensitive. Therefore, the examples here always
use the lower case HTTP key, even if you could also use other case styles if you want.
:::

### Basic Authentication

This authentication method takes the base64 encoded username and password, separated by a colon:

```yaml
authorization: Basic <base64(username:password)>
```

This would look like this example for username `alice` and password `foo`:

```yaml
authorization: Basic YWxpY2U6Zm9v
```

If you're using `curl`, you can specify the `-u` argument so `curl` is handling the base64 encoding and header placement for you:
```bash
curl "https://ns.pipeforce.net/api/v3/command/..." -u "alice:foo"
```

### Bearer Authentication

This authentication type is mostly used as part of OAuth 2.0 authentication flow.

At first you need to obtain the Bearer token from an exchange flow where the login credentials will be exchanged to a Bearer token.

Then you can set the Bearer token like this:

```yaml
authorization: Bearer <token>
```

Here is an example how you can obtain the Bearer access token from PIPEFORCE IAM service:

```bash
export TOKEN_RESPONSE=`curl -X POST --location "https://iam-<ns>.pipeforce.net/auth/realms/<ns>/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password&client_id=pipeforce&username=<username>&password=<password>&scope=pipeforce"`

export PIPEFORCE_ACCESS_TOKEN=`echo $TOKEN_RESPONSE | jq -r '.access_token'`

curl "https://hub-<ns>.pipeforce.net/api/v3/command/..." -H  -H "authorization: Bearer ${PIPEFORCE_ACCESS_TOKEN}" 
```

### RunAs Authentication

This not really an authentication since it switches from an already, successfully authenticated user to another user in case the user has the permission to do so.

:::note
This method works only in case there is already a successfully authenticated user in the current request scope.
:::

```yaml
authorization: RunAs <username>
```

### Refresh Authentication

This authenticates using a refresh token from an OAuth 2.0 flow.


```yaml
authorization: Refresh <token>
```

## IAM Command Authentication

In some cases it is required that authentication takes place inside a pipeline. For this, there are different `iam.*` commands available. See commands reference for details.

:::note
Whenever possible, you should use the HTTP Header Authentication methods and avoid using IAM command authentication. They're intended only for special requirements.
:::

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::