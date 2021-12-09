# Website 

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Prerequisites
Before you can start with working on the documentation pages locally, make sure you have downloaded and installed these tools first:

- [Git](https://github.com/git-guides/install-git)
- [Node](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)

### 1. Checkout
To checkout the documentation sources to your local system, use this command on your terminal:
```
git clone https://github.com/pipeforce/pipeforce.github.io
```

### 2. Installation
Open your terminal and change to the ``pipeforce.github.io`` folder. Then execute:

```
$ npm install
```

### 3. Open the documentation sources in editor

Open Visual Studio Code and then go to ``File -> Open Folder`` and open the folder ``pipeforce.github.io``.


### 4. Start local server

In your terminal change into the ``pipeforce.github.io`` folder and execute this command:

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### 5. Deployment

When you are ready, commit + push your changes into the master branch.
The build will start automatically.

After a while you should see your latest changes deployed to: https://pipeforce.github.io.
