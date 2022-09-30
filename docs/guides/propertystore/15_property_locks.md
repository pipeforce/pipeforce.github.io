# Property Locking

## What is a Property Lock?

A lock in PIPEFORCE can be put on any property and hinders a user or a group of users altering this property. This can be useful for example to avoid double-edits with race conditions, for maintenance reasons or in state conditions. Just to name a few examples.

Such a lock in PIPEFORCE can be:

 - exclusive to a **user** = only this particular user can edit this property
 - exclusive to a **role** (permission) = only users with given role / permission can edit
 - exclusive to a **group** = only users which are member of a certain group can edit this property
 - exclusive to a **namespace** = only users within this namespace can edit this property
 - **global** = no one can edit this property (except users with permission `ROLE_SYSTEM`).

A lock can also be generated using a time-to-live (ttl) value in order to remove the lock automatically from the property after this given amount of time has been expired. In case such a ttl is not set, the lock is not released automatically and must be removed manually. A lock can be removed by users, this lock is exclusive to or by the system.

:::info
A user with role `ROLE_SYSTEM` can always alter a property, even if a lock has been set, regardless of its type.
:::

## Create a Property Lock

You can create a lock on a property using the command [`property.lock.create`](/docs/api/commands#propertylockcreate-v1).

Here is an example:

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
```

This will create the default lock of type `user` on a property with key `global/app/myapp/data/mydata`.
This lock will be automatically set as exclusive to the currently logged-in user. 

### Technical Background

What happens in case a lock must be created for a Property in the backend?

1. The property attribute `locked` will be set to true. In case the lock is if type `trash`, additionally the attribute `trashed` will be set to true. See [Property Attributes](docs/propertystore#property-attributes).
2. A new tag with name `property.lock` will be created and assigned to the locked property. The value of the tag will be set to the [lock tag](#getting-a-property-lock) in JSON format.
3. Any write access to a property in the backend will check whether the property is locked or not and if so, whether the lock must take in effect or not. In case the lock is in effect, an exception is thrown.
   
### Lock exclusive to user

A lock exclusive to a user allows only this particular user to alter the property.

You can set the user exclusive lock implicitley, like this:

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
```

This is the default lock. You can also specify the type:

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: user
```

In both cases, the lock will be created exclusively to the currently logged-in user.

In case you would like to set the lock for a different user as the one currently logged-in, you have to specify its uuid. For example:

```yaml
pipeline:
  - iam.user.get:
      username: "someUsername"
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: user
      uuid: "#{body.uuid}"
```

In this example, a user with username `someUsername` is loaded from IAM and then its uuid is used to create a lock for him.

### Lock exclusive to role

A lock exclusive to a role allows only users with this particular role / permission to alter the property.

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: role
      name: ROLE_SUPPORT
```

In this example only users with role `ROLE_SUPPORT` can alter the property.

For details about roles and permission, see [here](/docs/guides/security/permissions).

### Lock exlusive to group

A lock exclusive to a group allows only users which are member of this particular group to alter the property.

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: group
      name: "Sales"
```

In this example only users which are member of custom group *Sales* can alter the property.

For details about groups, see [here](/docs/guides/security/permissions).

### Lock exclusive to namespace

A namespace lock allows only users within the given namespace (realm) to alter the property.

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: namespace
      name: "mynamespace"
```

### Global Lock

A global lock denies alterting a property for all users except those with `ROLE_SYSTEM` assigned.

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: global
```

### Trash Lock

A lock of type `trash` is a special lock, since it not only puts a global lock on a property, it also makes the property invisible from most of the listings in the system. Differently to the other lock types, in case the `ttl` is set: the property will be fully deleted after this time has been expired.

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: trash
      ttl: 864000000 # 10 days in millis
```

In this example, a trash lock has been set which expires after 10 days. Since it is a trash lock, the property will be deleted after these 10 days.

Also see the [Trash Bin](/docs/guides/propertystore/trash_bin).

## Getting a Property Lock

After a lock has been created, the response will return the so called **lock tag** which holds all required information about a lock in JSON format. Such a lock tag can also be loaded using the command [`property.lock.get`](/docs/api/commands#propertylockget-v1):

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

## Remove Property Lock

### Manually

In order to manually remove a lock, use the command [`property.lock.remove`](/docs/api/commands#propertylockremove-v1).

For example:

```yaml
pipeline:
  - property.lock.remove:
      key: "global/app/mydata"
```

### Automatically

In order to automatically release a lock after a certain amount of time, use the parameter `ttl` (ttl = time-to-live) when creating the lock. This parameter defines a time in milliseconds after which to remove the lock. After this time has been expired, the lock will be removed from the property.

```yaml
pipeline:
  - property.lock.create:
      key: "global/app/myapp/data/mydata"
      type: user
      ttl: 60000 # 1 minute
```

In this example, the user exclusive lock will be automatically removed after 1 minute.

:::info 
Since the cleanup job - which removes the locks - runs in intverals of several minutes, locks whith a `tts` of a few seconds or even milliseconds below this time range will probably be listed when querying them even if the `ttl` has already been expired. But when trying to alter a property, the `ttl` is always calculated in real time.
:::

:::warning
In case the lock is of type `trash`, the `ttl` value is used to determine after which time the property assigned with the lock must be deleted. Also see [Trash Lock](#trash-lock).
:::

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::