# App Installation

## From GitHub

You can install any PIPEFORCE app directly from a GitHub repository.

Make sure the repository you would like to deploy from has a folder structure like this:

- `src/`
  - `global/`
    - `app/`
      - `yourapp/`
        - *The contents of your app start in this level.*

:::warning
Make sure you install only from trusted sources since installing apps from untrusted sources could harm your system!
:::

### Public repo

Let's assume you have a public GitHub repository with a name like `acme/my-pipeforce-app`, then you can use the `app.install` command to install from this repository like this example shows using a pipeline:

```yaml
pipeline:
  - app.install:
      github: "acme/my-pipeforce-app"
```

Or you can use the CLI:

```
pi command app.install github=acme/my-pipeforce-app
```

:::info
Since GitHub allows only a few requests for non-authenticated API calls, you can install
only very small apps using this public repo approach. If you have to install apps with
many resources, use the private repo approach since this has higher limits for API calls.
:::

### Private repo

In case you would like to install from a private repo, you have to do additional steps:

#### Create a GitHub personal access token

At first you need to create a personal access token in GitHub which allows to read your repo. See [GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) how to do so.

#### Register access token as credentials

Copy the GitHub access token, open the PIPEFORCE portal and go to `LOW CODE -> Credentials` and create a new Credentials of type `header` with a name of your choice, for example `github-token` and as value use this format:

```
Authorization: token COPY_YOUR_TOKEN_HERE
```

Save your new Credentials. 

#### Refer to these credentials in the command

Then you can use it in the `app.install` command like this:

```yaml
pipeline:
  - app.install:
      github: "acme/my-pipeforce-app"
      credentials: "github-token"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::