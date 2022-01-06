# Website 

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

You can find the official Docusaurus documentation here: https://docusaurus.io/docs/docs-introduction

## Prerequisites
Before you can start with working on the documentation pages locally, make sure you have downloaded and installed these tools first:

- [Git](https://github.com/git-guides/install-git)
- [Node](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)

## 1. Checkout
To checkout the documentation sources to your local system, use this command on your terminal:
```
git clone https://github.com/pipeforce/pipeforce.github.io
```

## 2. Installation
Open your terminal and change to the ``pipeforce.github.io`` folder. Then execute:

```
$ npm install
```
This will download and install all required packages.

## 3. Open the documentation sources in editor

Open Visual Studio Code and then go to ``File -> Open Folder`` and open the folder ``pipeforce.github.io``.


## 4. Start local server

In your terminal change into the ``pipeforce.github.io`` folder and execute this command:

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## 5. Deployment

When you are ready, commit + push your changes into the master branch.
The build will start automatically.

After a while you should see your latest changes deployed to: https://pipeforce.github.io.


# Markdown (MD)

It's important that you know what Markdown (MD) is. If not, please read this first: https://en.wikipedia.org/wiki/Markdown

## Embedd external links

In order to embedd links into your MD file to external sites, you can place the url directly in it and it will be rendered to a link:

```
http://www.google.com
```
This will be rendered to: http://google.de

Or you add a name to it:

```
[GOOGLE](http://www.google.com)
```
This will be rendered to: [GOOGLE](http://www.google.com) 

## Refer to other documentation pages

In case you'd like to refer to other pages of the documentation, you can also use the link syntax. For example:

```
[Property Store](../guides/propertystore)
```

Note:
 - The path to the target page must be relative to the current directory.
 - The path may not contain a ordering prefix like ``10_`` for example, nor the ``.md`` suffix.


## Embedd an image

In order to embedd images to MD files, you need to follow these steps:

  1. Put the image file into the folder ``docs/img``.
  2. Embedd the image inside the MD file using this syntax: ``![](../img/name-of-your-image.png)``

In order to create screenshots on Mac use Shift + CMD + 4 and use the built-in image viewer to prepare or optionally the tool [Skitch](https://apps.apple.com/de/app/skitch/id425955336).

On Windows you can use the free tool [Greenshot](https://getgreenshot.org/downloads/) to create and edit screenshots.

## Embedd a note, info or warning section

These are called *Admonitions*. See here: https://docusaurus.io/docs/markdown-features/admonitions

## Embedd a table

In order to create a table inside your MD file, use this syntax:

```
Header 1 | Header 2 | Header 2
--- | --- | ---
Content1 | Content 2 | Content 3
```
This will be rendered to:
Header 1 | Header 2 | Header 2
--- | --- | ---
Content 1 | Content 2 | Content 3

## Embedd source code

In order to embedd source code inside your MD file, use this syntax:

````
```json
{"foo": "bar"}
```
````


## Headings

Headings start always with ``#``. Add another ``#`` for each heading level:

```
# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
```

By default the level 1 heading is also used as named for the link in the sidebar menu.

You should *not add more* than 4 heading levels.


For more information about headings see here:
https://docusaurus.io/docs/markdown-features/headings






