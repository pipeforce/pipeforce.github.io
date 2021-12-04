# Tutorial 13: Release an app
By default, only users assigned to the role `ROLE_DEVELOPER` or `ROLE_ADMIN` can see the created app initially. With this approach you can create and test new apps without users and customers even notice it since they cannot see them on the portal or execute them.

Once your app is stable and you want to “release” it, you need to create and assign all users and groups who should have access to this app to the the custom role `CAN_APP_<APPNAME>` whereas `<APPNAME>` is the name of your app in upper case letters.

For more details about app permissions and app release, please refer to [Setup Permissions](../guides/permissions) .

**Next tutorial:** [Create a BPMN workflow](../tutorials/beginner/create-BPMN-workflow)
