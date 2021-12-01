
# Two Factor

Security related actions such as **resetting password** or **logging** **in** can be made more secure by setting up 2-factor authentification. It is switched off be default, but all users are allowed to switch it on for theirselves easily. The user is required to follow these steps:

# Setup 2FA

1.  Login to https://**NAMESACE**.pipeforce.net
    
2.  Click on “My Profile”
    

![](https://logabit.atlassian.net/wiki/download/attachments/2151288801/image-20201103-122730.png?api=v2)

3\. Click on “Authentification” (in German: Multiauthentifizierung)

![](https://logabit.atlassian.net/wiki/download/attachments/2151288801/image-20201103-135639.png?api=v2)

4\. Follow the steps written there. When you have downloaded Google Authenticator, scanned the QR-Code and entered the OTP (One-Time-Password) you will see this success result:

![](https://logabit.atlassian.net/wiki/download/attachments/2151288801/image-20201103-135806.png?api=v2)

# Log-in with 2FA

When the user is entering both his username and password for login, another form will appear:

![](https://logabit.atlassian.net/wiki/download/attachments/2151288801/image-20201103-134700.png?api=v2)

When seeing this, the user needs to open his Google Authentificator App and lookup the one-time password for his setup account. Note that this code is changing every 30 seconds. If you miss to enter in that time-window you can simply use the next 30 second time window.

# Reset password with 2FA
 
Use “Forgot password” function in the login form:

![](https://logabit.atlassian.net/wiki/download/attachments/2151288801/image-20201103-135108.png?api=v2)

1.  Wait for the reset link sent to your account email. Click on it.
    
2.  Authenticator Setup is showing - there you need to copy the QR code again to reconfigure 2 factor authentification. **Attention**: Google Authenticator App will ask you to overwrite your former configuration. You need to confirm it.
