# Groups, Roles, Permissions

Permissions in PIPEFORCE are also called **roles**. With such roles you can define what a user is allowed to do. Roles can be assigned directly to a user or to a group via the webui of the IAM or the `iam.*` commands. Furthermore, there are also roles who define a set of other roles. This is called a composite role.

Since changing permissions is always something which needs to be handled very carefully, feel free to optionally contact our support team to cross-check your permission setup. We’re happy to help you on this, so you have a really secure application.

Note that you need to have to be member of `ROLE_ADMIN` or `ROLE_DEVELOPER` in order to be able to change role permissions as described in this chapter. In case you’re not able to login into IAM or apply the steps described below, please contact your PIPEFORCE admin in your company or feel free to contact our support team to grant you the required permissions and roles.

# Group

A group in PIPEFORCE combines a set of users with a set of roles. Groups are typically created and managed by admins. There can be “factory default” groups and also customer specific groups.

## Default groups

There are some default groups in PIPEFORCE. These groups may not be renamed or deleted by admins or developers, otherwise the system will no longer work as expected. These default groups are:

|                                                                 |     |     |
|-----------------------------------------------------------------| --- | --- |
| **Group name**                                                  | **Description** | **Requires license** |
| `Administrator (Standard)`  <br/>`pipeforce-admin` (since v7.0) | Members of this group can create and manage users and groups but cannot create and develop apps. | Yes |
| `Developer (Standard)`  <br/>`pipeforce-developer`(since v7.0)  | Members of this group can create and manage users and groups an can create and develop apps. | Yes |
| `Employee (Standard)`  <br/>`pipeforce-employee`(since v7.0)    | Members of this group can login into the system and use it, but they cannot create or manage user and they cannot create or develop apps. | Yes |
| `Guest (Standard)`  <br/>`pipeforce-guest`(since v7.0)          | Member this group can login into the system but can see only a very limited set of functionality. These members are typically managed by the system. | No  |
| `Recipient (Standard)`  <br/>`pipeforce-recipient`(since v7.0)  | Members of this group cannot login to the portal but can use a limited set of features of the system. These members are typically managed by the system. | No  |
| `service-workflow-admin`                                        | Members of this group can see and execute tasks from workflow tasks list + they can get additional information about workflows. | Yes |
| `service-workflow-user`                                         | Members of this group can see and execute tasks from workflow tasks list. | Yes |

For any app or process there can be additional groups, depending on the license you are using.

Each group can contain one or more roles which is the core permission entity.

# Role and Permission

In PIPEFORCE there is the concept of roles. A role can be seen as a permission (privilege) for a user to be allowed to do a certain task in the system. A role is a permission: So whenever you see a role, it can also be called a permission and vice versa. These namings are equal. Depending on the usage context it makes sometimes more sense to call it role or permission on the other hand.

Roles can be assigned to a single user or to a group. A user will be granted all roles of all groups he is member of.

Its good practice to assign roles via groups instead of directly to users.

The main difference between roles and groups is that roles cannot be created or deleted by admins. There are “factory default” roles and some roles created by developers.

Roles can also contain other roles, such parent roles are called **Composite Roles**. You probably never require such type of roles, they are mainly used PIPEFORCE internally only.

## Default Roles

These composite roles exist by default in PIPEFORCE and cannot be removed (“factory defaults”). Any user or group which is assigned to such a role has some additional basic set of permissions assigned to fulfill a certain role in PIPEFORCE.

|     |     |
| --- | --- |
| **Role Name** | **Description** |
| `ROLE_GUEST` | Any guest user of PIPEFORCE is assigned to this role. Guest users do not require a license but can only use a subset of functionalities. |
| `ROLE_USER` | Any PIPEFORCE user is assigned to this role. It allows to login. |
| `ROLE_EMPLOYEE` | Any employee of our customers which should see a subset of apps in the portal is assigned to this role. |
| `ROLE_DEVELOPER` | Any user who wants to be able to develop custom apps need to be assigned to this role. |
| `ROLE_SUPPORT` | Special role for our support team. |
| `ROLE_ADMIN` | Any user assigned to this role has the permission to manage users and settings but cannot create apps. |
| `ROLE_SYSTEM` | A system user is assigned to this role. |

**Why are there default composite roles and default groups?**

Since PIPEFORCE is a microservice system, it hosts many different such services. Some of them require groups and some can work with roles. Furthermore, there is also a conceptional difference: Groups can be created and managed by admins, roles not. They can only be assigned and revoked by admins.

## Command Permissions

For any command in PIPEFORCE there is a corresponding role (= permission) which allows the user assigned to this role to execute this command. The role has the format `CAN_PIPE_<command_name>`. Some examples:

|     |     |
| --- | --- |
| **Command Name** | **Permission / Role Name** |
| `drive.read` | `CAN_PIPE_drive.read` |
| `drive.save` | `CAN_PIPE_drive.save` |
| `property.put` | `CAN_PIPE_property.put` |

See `Role Mappings` section for users and groups in IAM for a full list of all available command permissions.

**Wildcard command permission (use with maximum care!)**  
Beside the specific command permission you can also use the wildcard permissions in order to give a permission to all commands or a specific subset. This should not be used for users but is reserved for admins and developers.

Examples:

*   `CAN_PIPE_%` = Grants access to all commands
    
*   `CAN_PIPE_drive.%` = Grants access to all drive commands
    

## App Permissions

Note: Depending on the setup of your PIPEFEORCE system, these steps usually are done by your global corporate admin and cannot be done by developers or default admins. Please ask your global admin or the PIPEFORCE support team to do these steps for you.

By default new applications are shown only to users assigned to the role `ROLE_DEVELOPER` or `ROLE_ADMIN`.

In order to provide your application also to non-developers, you need to do these manual steps:

1.  Login to IAM.
    
2.  Create a new role `CAN_APP_<APPNAME>`
    
3.  Assign this new role to all users or groups who should have access to this app.
    

Note: Make sure to replace `<APPNAME>` by the real name of your app with **all letters upper case**. So lets assume you have created an app `myapp` then you should create a new role `CAN_APP_MYAPP`.

Also make sure that users and groups you want to give access to your app are trustworthy. Furthermore make sure that they have also the permission to access all commands you are using inside your app.

### Automate setup of app permissions

Instead of manually creating and assigning the roles of your app, you can automate these steps by providing a setup pipeline using the `iam.*` commands. To do so, follow these steps:

Create a new pipeline inside the setup folder of your app, for example:

```
global/app/myapp/setup/permissions.pi.yaml
```

Open this pipeline, add this content and then publish + execute it:

```
headers:
  description: "Creates the default users, groups and permissions of myapp"
  onCommandError: "IGNORE"

pipeline:

  - iam.run.as:
      username: systemuser

  # Create the new app role
  - iam.role.create:
      name: "CAN_APP_MYAPP"

  # Assign this role to all employees automatically
  - iam.role.add.composites:
      roleName: "ROLE_EMPLOYEE"
      composites: "CAN_APP_MYAPP"
```

In future, whenever your app is installed on a fresh PIPEFORCE instance, this setup pipeline is executed so any required roles and assignments are created.

In the `headers` section we set special fields:

*   `description` = The description of this pipeline.
    
*   `onCommandError` = Defines what should happen if a command in the pipeline failed. In this case we `IGNORE` such a problem since it would usually mean that the role already exists or was already assigned.
    

For more information about the available default headers see [Pipeline Headers Reference](https://pipeforce.github.io/docs/guides/pipeline-headers) .

In the pipeline section we use these commands:

*   `iam.run.as` = Run the commands as this user.
    
*   `iam.role.create` = Creates a new custom role.
    
*   `iam.role.add.composites` = Adds an existing role as child to another role (to make a combination of roles).
    

For more information about the available `iam.*` commands see the commands dashboard of your instance.

# Anonymous User

In case a user is not logged-in, the system handles this automatically as `anonymousUser` with no roles/permissions and no groups assigned to it. Such a user can only execute a very limited set of public commands.
