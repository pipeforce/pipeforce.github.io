# Identity and Access (IAM)

PIPEFORCE comes with a powerful identity and access management service (IAM). With this service, you can:

*   Create and manage users, groups, and roles
    
*   Define user credentials
    
*   Select required user actions (for example, verification or password reset requests)
    
*   Connect to external LDAP services, like Active Directory
    
*   OAuth2 authentication
    
*   2-Factor Authentication (2FA)
    
*   Social Login
    
*   Kerberos Broker
    
*   Single Sign-On
    
*   User Self-Registration
    

If you have sufficient permissions, you can reach the service via this url:

```yaml
https://iam-<NAMESPACE>.pipeforce.net
```

Or by clicking IAM on the portal menu:

![](../../img/image-20211030-022903.png)


## 2-Factor Authentication

Security related actions such as **resetting password** or **logging** **in** can be made more secure by setting up 2-factor authentification. It is switched off be default, but all users are allowed to switch it on by themselves easily. The user is required to follow these steps:

### Setup 2FA

1.  Login to https://**NAMESACE**.pipeforce.net
    
2.  Click on “My Profile”
    

![](../../img/my-profile.png)

3\. Click on “Authentification” (in German: Multiauthentifizierung)

![](../../img/auth.png)

4\. Follow the steps written there. When you have downloaded Google Authenticator, scanned the QR-Code, and entered the OTP (One-Time-Password), you will see this success result:

![](../../img/authe.png)

### Log-in with 2FA

When the user is entering both his username and password for login, another form will appear:

![](../../img/one-time-code.png)

When seeing this, the user needs to open his Google Authentificator App and lookup the one-time password for his setup account. Note that this code is changing every 30 seconds. If you miss to enter in that time-window, you can simply use the next 30 second time window with a new code.

### Reset password with 2FA
 
Use “Forgot password” function in the login form:

![](../../img/login.png)

1.  Wait for the reset link to be sent to your account email. Click on it.
    
2.  Authenticator Setup is showing - there you need to copy the QR code again to reconfigure 2-factor authentification. 
**Attention**: Google Authenticator App will ask you to overwrite your former configuration. You need to confirm it.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::

