# 3. Connectors
<p class="theme-doc-version-badge badge badge--secondary">Since Version: 1.0</p>

## What is a connector?

A **connector** is a component which connects to an external service via an API and can exechange data with such a service.

In PIPEFORCE, connectors are implemented using [Commands](/docs/commands_pipelines). So, a Command can be in a role of a connector.

There are many such built-in connectors. Some examples:

 - `http.*` : This set of commands can connect to any HTTP/S endpoint.
 - `sftp.*` : This set of commands can connect to any SFTP endpoint.
 - `iam.*` : This set of commands can connect to the internal identity and access management system.
 - `drive.*`: This set of commands can connect to the internal data room.
 - `microsoft.teams.send` : This command can send messages to a teams channel.
 - And many more. See the [commands reference](../api/commands) for a list of all available commands.

## HTTP/S connectors

The HTTP/S connectors can be used to connect to HTTP/S endpoints. For example if you would like to make RESTful calls.

Typically such endpoints are secured with username and password or a token. You should never place such sensitive data into your source code. Instead, create a new [Secret](../guides/security/secrets) and refer to it in your pipeline.

Here is an example to access the [GitHub API](https://docs.github.com/en/rest/actions/artifacts) using the command [`http.get`](../api/commands#httpget-v1) and a custom secret, created before:

```yaml
pipeline:
    - http.get:
        url: "https://api.github.com/owner/repo/actions/artifacts"
        credentials: "github-secret"
```

This will return a JSON document like this example, which can be used in the pipeline for further processing:

```json
{
  "total_count": 1,
  "artifacts": [
    {
      "id": 11,
      "node_id": "MDg6QXJ0bbZhY3QxMQ==",
      "name": "Rails",
      "size_in_bytes": 556,
      "url": "https://api.github.com/repos/owner/repo/actions/artifacts/11",
      "archive_download_url": "https://api.github.com/repos/owner/repo/actions/artifacts/11/zip",
      "expired": false,
      "created_at": "2022-01-10T14:59:22Z",
      "expires_at": "2022-03-21T14:59:22Z",
      "updated_at": "2022-02-21T14:59:22Z",
      "workflow_run": {
        "id": 2332928,
        "repository_id": 1296569,
        "head_repository_id": 1296219,
        "head_branch": "main",
        "head_sha": "328faa0536e6fef19903d9d91dc96a9931694ce3"
      }
    }
  ]
}
```

## SFTP Connectors

The SFTP connectors can be used to connect to a SFTP service.

Here is an example to use the [`sftp.list`](../api/commands#sftplist-v1) command in a pipeline:

```yaml
pipeline:
    - sftp.list:
        host: "some.sftpserver.tld"
        path: "/myfolder"
        credentials: "sftp-secret"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::