# Downloads

The CLI can be used to simplify working with PIPEFORCE.

In order to run this tool Java >= Version 8 must be installed.

See here for more details about this CLI tool: [Command Line Interface (CLI)](https://pipeforce.github.io/docs/api/cli)

## Verify and install Java 8

Open your terminal and verify that you have a Java runtime version >= 1.8 installed:

```
$> java -version
```

You should see an output similar to this:

```
java version "1.8"
```

If there is a version number 1.8 or higher shown, then you have installed “Java 8” or higher.

In case you see an output like “command not found” then you probably have no Java environment installed yet. So go to the next step and download and install the environment.

### Install Java

If you have not Java runtime yet, follow these steps to download and install:

1.  Go to [https://www.java.com/de/download/](https://www.java.com/de/download/) and download the latest Java runtime.
    
2.  Install the downloaded package.
    
3.  Open **a new console window** and try out that this command now shows the installed Java version:
    

```
$> java -version
```

## How to download an install the CLI?

After you have made sure that Java is installed and runs correctly, you can download the latest version of the cli tool by clicking this link:

[https://downloads.pipeforce.io/pipeforce-cli/](https://downloads.pipeforce.io/pipeforce-cli/)

Select the jar file with highest version number and download it to your computer.

**Do not download the one with latest in the name since this is for auto-updates only.**

After this, open a new terminal / command line window and change to the folder where you downloaded the file to. Usually this is the Download folder as shown in this example for Mac and could differ for your operating system:

```
$> cd /Users/username/Downloads
```

Now install the cli tool by executing this command:

```
> java -jar pipeforce-cli-VERSION.jar setup
```

Replace `VERSION` by the version number of the downloaded file.

You will then be asked to install the tool. Select `yes`.

Follow the wizard to install the CLI.

## How to update?

To update to the lastest version, simply use this command:

```
pi update
```

It will search for latest versions and automatically download + install it for you.

## Add it to your Windows path

Optionally you can add the pi tool to your path variable in order to simplify the call to:

```
pi status
```

To do so, add the file `pi.bat` inside your `$USER_HOME/pipeforce` folder to the PATH variable on your Windows system.

## Add it to your Mac/\*nix path

Optionally you can add the CLI tool to your path variable in order to simplify the call to:

```
pi status
```

To do so, add the folder `$USER_HOME/pipeforce` to your paths file.

# BPMN Modeler

The BPMN modeler is a free tool to design BPMN diagrams and save the BPMN files. These files then can be deployed to PIPEFORCE using the `workflow.deploy` command.

Note: ENTERPRISE and CORPORATE users can also use the online BPMN editor in the portal.

|     |     |     |
| --- | --- | --- |
| **CVersion** | **Plattform** | **Download** |
| 4.3.0 | Windows 64bit | [bpmn-modeler-4.3.0-win-x…](/wiki/spaces/DEVEX/pages/2151288972/Downloads?preview=%2F2151288972%2F2151288995%2Fbpmn-modeler-4.3.0-win-x64.zip) |
| 4.3.0 | Windows 32bit | [bpmn-modeler-4.3.0-win-i…](/wiki/spaces/DEVEX/pages/2151288972/Downloads?preview=%2F2151288972%2F2151288992%2Fbpmn-modeler-4.3.0-win-ia32.zip) |
| 4.3.0 | Mac OS | [bpmn-modeler-4.3.0-mac.d…](/wiki/spaces/DEVEX/pages/2151288972/Downloads?preview=%2F2151288972%2F2151288989%2Fbpmn-modeler-4.3.0-mac.dmg) |
