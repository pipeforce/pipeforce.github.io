# Low code workspace

The local low-code workspace is a folder on your local machine where you can store and edit all of your low-code configuration files and scripts and then sync them with the PIPEFORCE property store with a single call of `pi publish`.

# How does it work?

In its most raw case you could manage all properties in the property store with the `property.*` commands and the CLI using `pi pipeline`.

This might be useful for small changes. But if you want to develop and customize full business applications, we recommend you to use the local low-code workspace. This way you can track changes more easily and be prepared for a good change management process.

The low-code workspace will mirror the property store properties as a local hierarchy of folders and files. Any configuration and script file created locally inside this workspace can then easily be uploaded to the property store with a single command line. For example:

```bash
pi publish src/global/app/myapp
```

This scans the folder `myapp` inside the workspace and uploads only those resources which have been changed since last upload or have been created since then.

You can also use the short form of the command:

```bash
pi publish 
```

This will publish any new or changes resources inside the `src` folder to the server.

# Prerequisites

To setup your local low-code workspace, at first you need to download and install the CLI as described here: [Downloads](https://pipeforce.github.io/docs/guides/downloads)

Furthermore, we recommend you to download and install the free source code editor Visual Studio Code from here: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

Even if you have a different favorite editor, we recommend you to start with this one, since it is easier to follow all examples. Later, you can switch to a different editor, if you want.

After you did setup the local workspace, you should read the chapter about working with Visual Studio Code to learn how you can optimize your customization steps: [Visual Studio Code](https://pipeforce.github.io/docs/guides/vs-code)

# Creating a new customization workspace

After you have installed the CLI ([Command Line Interface (CLI)](https://pipeforce.github.io/docs/api/cli)), you can create a new workspace by using this command line call:

```bash
pi setup
```

This will ask you a few questions to setup the workspace correctly.

```bash
Namespace [None]:
```

Here, you need to type-in the namespace of your PIPEFORCE instance which is typically the name of your company. If you’re not sure what your namespace is, ask [support@pipeforce.io](mailto:support@pipeforce.io).

Typically the namespace is the **NAMESPACE** part of your instance url (not the full url!):  
https://**NAMESPACE**.pipeforce.net

For example if your instance url is [https://**acme**.pipeforce.net](https://acme.pipeforce.net), then your namespace would be **acme**.

Type this name in an press enter.

```bash
Username [None]:
```

Type-in your username to login into the system.

```bash
Password []:
```

Type-in your password to login into the system.

**Note**: Your password is never stored as such by the CLI for security reasons. Instead, the CLI automatically exchanges this password with an API access token and stores this access token. This token is valid for 30 days. That means: If you did not login into PIPEFORCE for longer than 30 days, you need to re-generate this access token. You can do so by simply calling `pi setup` later which asks again for credentials and creates and stores a new access token for you in case the login was successful.

Congratulations! A new property store workspace was been created for you under  
`$USER_HOME/pipeforce`

**Note**: Replace `$USER_HOME` by the path of your user home folder which differs depending on your current operating system.

*   For Windows this is typically: `C:\Users\YOUR_USERNAME`
    
*   For Mac this is typically: `/Users/YOUR_USERNAME`
    

After you did setup the local workspace, you should read the chapter about working with Visual Studio Code to learn how you can optimize your customization steps: [Visual Studio Code](https://pipeforce.github.io/docs/guides/vs-code)
