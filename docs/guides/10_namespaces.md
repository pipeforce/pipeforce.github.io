# 1. Namespaces

## What is a Namespace?

A **namespace** in PIPEFORCE is the unqiue name to access your instance and is similar to a tenant id. So whenever you want to refer / link to your own instance you need to know the namespace to do so. To access your instance via browser use the namespace as subdomain part of your [pipeforce.net](http://pipeforce.net) instance url.

![](../img/image-20210212-104035.png)

If unclear, ask [Support](https://logabit.atlassian.net/servicedesk/customer/portals) for your namespace.

## Service

Each PIPEFORCE namespace contains of multiple services to run your solutions. Depending on your setup, the number and type of these services could differ. 

### Public

Usually these services are by default available within your namespace and can be accessed from the internet. They are therefore called "public" services:

 - **Hub** : This is the core service which manages and executes [Commands & Pipelines](../commands_pipelines). Can be accessed via: `https://mycompany-hub.pipeforce.net`. 
 - **Portal**: A single page application which hosts the user and developer UI. Can be accessed via: `https://mycompany.pipeforce.net`. 
 - **Drive**: A data room application to store, edit and share documents and files. Can be accessed via: `https://mycompany-drive.pipeforce.net`. 
 - **IAM**: An identity and access management system to manage users, groups, permissions and logins. Can be accessed via: `https://mycompany-iam.pipeforce.net`. 
   
### Private

Additionally to the services accessible from outside, there are also default services which can be accessed only from inside the namespace. They are called the "private" services. These services are:

 - **Postgres**: A PostgreSQL database which hosts application data.
 - **Messaging**: A messaging broker which is part of the internal message bus.
 - **Workflow**: A workflow engine in order to manage and execute BPMN workflows.

### Custom

Beside the default services mentioned above, there could be additional, custom services depending on your license / setup. See section [Microservices](../microservices) for more information about custom microservices.

## Staging Tiers

Especially in case you develop custom microservices, you should think about a staging approach.

Typically, the staging process is seperated into at least three tiers: `DEV`, `QA`, `PROD`.

You can learn more about such environments on [this Wiki page](https://en.wikipedia.org/wiki/Deployment_environment).

 In case you do not write custom microservices and use low code and integration, you can implement such a staging process inside a single namespace. User groups, permissions and versioning can help you to show your solution only to a certain group depending on the deployment phases.

 In case you develop custom microservices, you should think about a staging approach using namespaces. You could for example create the three namespaces **dev**, **qa** and **prod** in order to have three independent environments.

 If you need help to decide your staging approach, feel free to contact us.

### `DEV`

In this tier the development happens. It is highly dynamically and can change frequently.

### `QA`
Once development is finished, the solution gets deployed to the `QA` tier. Sometimes also called "Staging". This is the tier where quality assurance tests are done with the system configured as close as possible similar to the production environment.

### `PROD`
In this last tier, the system is operated in production. Once a solution has been tested successfully on the `QA` tier it can be moved to the `PROD` tier.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::

