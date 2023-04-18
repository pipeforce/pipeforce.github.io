---
id: basics

title: Microservices
sidebar_label: Basics
slug: /microservices
---

<p class="theme-doc-version-badge badge badge--secondary">Since Version: 7.0</p>

In PIPEFORCE, you have two main possibilities to write a business application:

 - Using low code inside an app.
 - Using a microservice.

Depending on the requirements you should select the right approach for your implementation.

In the table below you can see the pros and cons about the two approaches:

Implementation | Pros | Cons | Main purpose
--- | --- | --- | ---
App & Low Code | Easy to learn. No developer skills required. Very fast results possible. No compilation and build steps required. Huge set of out-of-the-box toolings like forms, lists, reports and utils available. | Limited to its main purposes. | For simple data mappings, workflow tasks and system connections. Building frontend apps with forms, listings and basic reports.
Microservice | Very flexible: You can use any programming language and libraries of your choice and you can develop any business complexity you like. | Requires developer skills and somebody who manages the architecture of the microservice. Requires a build process. | For complex business logics, running mainly as background services.

It's also possible to combine apps and microservices in order to implement a single business solution.

## Design a microservice

Typically a microservice is small application which has the responsibility about a concrete and well-defined part of an overall business process. How you slice the microservices depends on your requirements.

So before you start, you should be very clear, which parts should go into which microservices and which not at all.

See here for a good introduction how to design microservices: https://martinfowler.com/articles/break-monolith-into-microservices.html

## Develop a microservice

Developing a microservice typically means, developing a business application in the programming language of your choice.

As long as you can build and run the application inside a (Docker) container, you can also run it inside PIPEFORCE as microservice.

We suggest you to write your microservices in one of these languages since they are widely used, having a huge community and being well documented:

 1. **Python**. For example using one of the official Docker images: https://hub.docker.com/_/python
 2. **Java**. For example using one of the frameworks Spring, Quarkus or Helidon and one of the official Docker images: https://hub.docker.com/_/java
 3. **NodeJS**. For example using Typescript, ExpressJS and/or NestJS and one of the offcial Docker images: https://hub.docker.com/_/node 

In our experience, Python is often a very good joice for a microservice language. Since it has the best trade-off between complexity and flexibility. But as always, it depends on your concrete requirements.

If you would like to start a microservice in Python, you can fork our template from GitHub and start coding it: https://github.com/logabit/pipeforce-service-template-python 

In order to allow your microservice to communicate with others, there are two common ways you can implement this:

 - **Sync** communication - Typically used with RESTful services inside PIPEFORCE.
 - **Async** communication - Typically used with RabbitMQ and **messaging** inside PIPEFORCE (preferred way).
 
## Deploy a microservice

The development and deployment cycle of a microservice in PIPEFORCE is always an 4-step task:

1. Develop the microservice locally using the IDE and programming language of your choice.
2. Build a (Docker) container image from the sources of your microservice.
3. Upload the container image to a container registry which is supported by PIPEFORCE.
4. Deploy the image from this registry into your PIPEFORCE namespace by using the command `service.start`.

Step 2-4 are typically automated by using a CI/CD tool like Jenkins, CircleCI, Travis or similar.

Furthermore, we suggest managing your source code using GitHub and connect your CI/CD tool, so it starts to build, test
and deploy automatically every time, a new push to GitHub happened (or on other triggers like merging or tagging).

### Implicit Environment Variables

Every time a service is started using the `service.start` command, also some implicit variables will be automatically passed to this container and can be accessed via the environment variables inside the container.

These implicit variables are:

- `PIPEFORCE_DOMAIN` = The domain name used for the PIPEFORCE instance. For example `customer.pipeforce.net`.
- `PIPEFORCE_HUB_URL` = The cluster internal url of the hub service.
- `PIPEFORCE_NAMESPACE` = The namespace of the instance this services runs inside.
- `PIPEFORCE_SERVICE` = The name of this custom service inside PIPEFORCE. 
- `PIPEFORCE_MESSAGING_HOST` = The messaging host to connect to in order to register a RabbitMQ listener.
- `PIPEFORCE_MESSAGING_PORT` = The messaging host to connect to in order to register a RabbitMQ listener.
- `PIPEFORCE_MESSAGING_DEFAULT_DLQ` = The default dead letter queue used for RabbitMQ messaging.
- `PIPEFORCE_MESSAGING_DEFAULT_TOPIC` = The default messaging topic used for RabbitMQ messaging.

Additionally to these default environment variables, you can also set your custom ones by using the parameter `env` on the command `service.start`:

```yaml
pipeline:
  - service.start:
      name: myservice
      image: myimage
      env:
        MY_ENV: "myCustomValue"
```

#### Passing secrets as ENV

In case you would like to set secret values to environment variables, you should create such secrets in the secret store inside PIPEFORCE and refer to them, using the custom uri prefix `$uri:secret:`. For example:

```yaml
pipeline:
  - service.start:
      name: myservice
      image: myimage
      env:
        MY_SECRET_ENV: "$uri:secret:MY_SECRET"
```

On startup of the service, the secret with name `MY_SECRET` will be read from the secret store and passed to the container as environment variable `MY_SECRET_ENV`. This way it is not required to store the secret in code.

:::caution
Since the secret is stored in the environment variable in plain text, make sure to pass secrets only along to trustworthy microservices which belong to your stack!
:::

You can also define a default value for a secret. In case the secret could not be found in the secret store, the given default value will be used and passed as ENV variable value instead:

```
$uri:secret:MY_SECRET:someDefaultValue
```

## Logging a microservice

Everything you log into the standard output of your microservice container can be later viewed by using 
the command [log.list](https://pipeforce.github.io/docs/api/commands#loglist-v1) and specifying the name under 
which you have deployed the service. Example:

```yaml
pipeline:
  - log.list:
      service: "my-service"
      lines: "100"
```

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::

