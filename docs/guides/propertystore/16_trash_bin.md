# Trash Bin

## What is a Trash Bin?

Before deleting a property, it can be moved to a trash bin, similar as it is for files in most operating systems.

In case property has been moved to the trash bin, it will be hidden from most listings.

Furthermore, a property moved to the trash bin can no longer be edited since a lock of type `trash` has been set on it. For internals of how the locking works, see [Property Locks](/docs/guides/propertystore/property_locks).

After a certain amount of time (the time-to-live = ttl) the property will be fully deleted from the system.

## How to move a property to the bin?

There are two options to do so. The first one is by setting a `trash` lock on the property using the [`property.lock.create`](/docs/api/commands#propertylockcreate-v1). See [Property Locks](/docs/guides/propertystore/property_locks#trash-lock) for more details.

The second option is by using the command [`property.delete`](/docs/api/commands#propertydelete-v1) with parameter `trashBin` set to true. For example:

```yaml
pipeline:
  - property.delete:
      pattern: "global/app/myapp/data/mydata"
      trashBin: true
```
The advantage of this command is, that it can be applied to a pattern of properties. So you can for example also delete all properties inside a given folder, recursively. Here is an example to do so:

```yaml
pipeline:
  - property.delete:
      pattern: "global/app/myapp/**"
      trashBin: true
```

This example will move all properties inside the app `myapp` to the trash bin.

Additionally you can set the parameter `trashBinTimeToLive` which must be a time in milliseconds after the property will fully deleted. In case this parameter is not set, the system defaults / admin settings will be used to finally cleanup the bin and delete trashed properties.

## How to remove a property from the bin?

You can do so by removing the `trash` lock from it using the command  [`property.lock.remove`](/docs/api/commands#propertylockremove-v1). See here for more details: [Property Locks](/docs/guides/propertystore/property_locks). 

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::