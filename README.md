# [Breads](https://www.breads.io/)

Keep track of what you read online, and see what your friends are reading. See [Breads API](https://github.com/aTmb405/breads-server) for back end.

![Breads User Profile](https://i.ibb.co/bL4cDmt/Screen-Shot-2020-11-17-at-7-31-56-PM.png)

## Features

* Save articles you've read online
* See a summary and simple stats of your reading activity
* Tag and favorite articles
* Follow friends to see what they've read, favorited, and tagged
* Global feed to see what is being read by everyone on Breads
* Search for articles and users

### Near Future

* Save other media content like videos, PDFs, and podcasts
* Browser extension
* RSS Feed
* Pocket-like read later feature
* Newsletter that summarizes trends, your friend's readings, etc.

## Table of Contents
* [Contributing](https://github.com/aTmb405/breads-client/blob/master/README.md#Contributing)
  * [Style Guide](https://github.com/aTmb405/breads-client/blob/master/README.md#Style-Guide)
* [Installing](https://github.com/aTmb405/breads-client/blob/master/README.md#Installing)
* [Running](https://github.com/aTmb405/breads-client/blob/master/README.md#Running)
* [Testing](https://github.com/aTmb405/breads-client/blob/master/README.md#Testing)
* [Deploying](https://github.com/aTmb405/breads-client/blob/master/README.md#Deploying)
* [Technologies](https://github.com/aTmb405/breads-client/blob/master/README.md#Technologies)

## Contributing

Before you contribute, there are some things you need to know: what to do first, where to find tasks, any additional questions, and notes provided for contributors. You can begin **here**

### Style Guide

## Installing

After you have forked the project and downloaded the code, install the necessary dependencies using [npm](https://docs.npmjs.com/about-npm/) or [yarn](https://yarnpkg.com/getting-started).

To install the packages through npm, run the command `npm install`

To install the packages through yarn, run the command `yarn add`

NOTE: In the rest of the documentation, you will come across npm being used for running commands. To use yarn in place of npm for the commands, simply substitute npm for yarn. Example, npm start as yarn start. For more help, checkout [migrating from npm](https://classic.yarnpkg.com/en/docs/migrating-from-npm/).

## Running

NOTE: The backend code should be running in order for the front end to behave correctly. See [Breads API](https://github.com/aTmb405/breads-server).

Make sure the necessary dependencies are installed and type the command `npm start`

## Testing

Before committing your changes, run the command `npm test`

## Deploying

After confirming the tests have passed, create a pull request on the development branch - `git push origin development`. CircleCI will run a test suite and deploy the changes to a Heroku site for staging. If everything passed, your changes will be merged into main.

## Technologies

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
