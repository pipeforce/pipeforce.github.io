# Tutorial 13: Release an app
By default, only users assigned to the role `ROLE_DEVELOPER` or `ROLE_ADMIN` can see the created app initially. With this approach, you can create and test new apps without users and customers even noticing it, since they cannot see or execute them on the portal.

Once your app is stable and you want to “release” it, you need to create and assign all users and groups who should have access to this app to the the custom role `CAN_APP_<APPNAME>`, whereas `<APPNAME>` is the name of your app in upper case letters.

For more details about app permissions and app release, please refer to [Setup Permissions](../guides/permissions) .

**Next tutorial:** [Create a BPMN workflow](../tutorials/create-bpmn-workflow)

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::
