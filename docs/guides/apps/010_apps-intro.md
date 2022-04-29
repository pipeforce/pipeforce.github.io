---
id: basics

title: Apps
sidebar_label: App Basics
slug: /apps
---

In PIPEFORCE, an app groups together resources like scripts, templates, configurations and others to solve a certain business task. Any pipeline, form or workflow etc. are part of exactly one app.

For each app, certain access rules can be specified. Apps can be installed, uninstalled, exported and imported. Furthermore, it is also possible to use staging and versioning for apps. They can be developed online using the workbench or offline using source code files and the [CLI](../api/cli). You can think of apps also like “plug-ins” for PIPEFORCE.

Typically, all apps reside in the property store under the key path `global/app/<appname>`, for example `global/app/myapp`.

Also see [this tutorial](../docs/tutorials/create-app) to learn how to create an app in PIPEFORCE.

