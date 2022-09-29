# Property Locking

## What is a Property Lock?

A lock in PIPEFORCE can be put on any property and hinders a user or a group of users altering this property. This can be useful for example to avoid double-edits with race conditions, for maintenance reasons or in state conditions. Just to name a few examples.

Such a lock in PIPEFORCE can be:

 - exclusive to a user = only this particular user can edit this property
 - exclusive to a role (permission) = only users with given role / permission can edit
 - exclusive to a group = only users which are member of a certain group can edit this property
 - exclusive to a namespace = only users within this namespace can edit this property
 - global = no one can edit this property (except users with permission `ROLE_SYSTEM`).

A lock can also be generated using a time-to-live (ttl) value in order to remove the lock automatically from the property after this given amount of time has been expired. In case such a ttl is not set, the lock is not released automatically and must be removed manually. A lock can be removed by users, this lock is exclusive to or by the system.


## How to create a Property Lock?

You can create a lock on a property using the command [`property.lock.create`](/docs/api/commands#propertylockcreate-v1).

Here is an example:

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
```

This will create the default lock of type `user` on a property with key `global/app/myapp/data/mydata`.
This lock will be automatically set as exclusive to the currently logged-in user. 

### The Lock Tag

After a lock has been created, the response will return the lock tag which holds all required information about a lock in JSON format:

```json
{
  "ts": 1364409740897,
  "ttl": null,
  "type": "user",
  "uuid": "79e08af3-5f16-40c7-8fb1-203e0c85376b",
  "name": "someUsername",
  "details": ""
}
```

- `ts` = The Unix timestamp this lock has been created in milliseconds.
- `ttl` = The time-to-live in milliseconds, after this lock must be removed automatically. If null, the lock will be kept until manually removed.
- `type` = One of `user`, `role`, `group`, `namespace`, `global` or `trash`.
- `uuid` = The uuid of the user this lock is exclusive to. Only set in case the lock type is set to `user`.
- `name` = This value depends on the lock type. If type is `user`, this contains the username of the user, this lock is exclusive to (is automatically set by the backend). If type is one of `role`, `group` or `namespace`, the name must be set to the name of the selected resource, this lock is exclusive to. For example the name of the role, group or namespace. If type is `global` or `trash` the name is typically empty.
- `details` = Some additional, optional information with the lock.

### Lock exclusive to user

A lock exclusive to a user allows only users  this particular user to alter the property.

### Lock exclusive to role

A lock exclusive to a role allows only users with this particular role / permission to alter the property.

### Lock exlusive to group

A lock exclusive to a group allows only users member of this particular group to alter the property.

### Lock exclusive to namespace

A namespace lock allows all users within the given namespace to alter the property.

### Global Lock

A global lock denies alerting a property for all users except those with `ROLE_SYSTEM` assigned.

### Trash Lock

A lock of type `trash` is a special lock, since it not only puts a global lock on a property, it also makes the property invisible from most of the listings in the system. Differently to the other lock types, in case the `ttl` is set: the property will be fully deleted after this time has been expired.

Also see the [Trash Bin](/docs/guides/propertystore/trash_bin).

## How to remove a Property Lock?

### Manually remove a Lock

In order to manually remove a lock, use the command property.lock.remove.

For example:

```yaml
pipeline:
  - property.lock.remove:
      key: "global/app/mydata"
```

### Automatically remove a Lock

In order to automatically remove a lock after a certain amount of time, use the parameter `ttl` when creating the lock. This parameter defines a Unix timestamp in milliseconds after which to remove the lock.

## How to check for a Lock?

TODO

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::