# [Breads](https://www.breads.io)

Keep track of what you read online, and see what your friends are reading. See [breads-server](https://github.com/aTmb405/breads-server) for back end code.

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
* [Installing](https://github.com/aTmb405/breads-client/blob/master/README.md#Installing)
* [Running](https://github.com/aTmb405/breads-client/blob/master/README.md#Running)
* [Testing](https://github.com/aTmb405/breads-client/blob/master/README.md#Testing)
* [Deploying](https://github.com/aTmb405/breads-client/blob/master/README.md#Deploying)
* [Technologies](https://github.com/aTmb405/breads-client/blob/master/README.md#Technologies)

## Installing

After you have forked the project and downloaded the code, install the necessary dependencies using [npm](https://docs.npmjs.com/about-npm/) or [yarn](https://yarnpkg.com/getting-started).

To install the packages through npm, run the command `npm install`

To install the packages through yarn, run the command `yarn add`

NOTE: In the rest of the documentation, you will come across npm being used for running commands. To use yarn in place of npm for the commands, simply substitute npm for yarn. Example, npm start as yarn start. For more help, checkout [migrating from npm](https://classic.yarnpkg.com/en/docs/migrating-from-npm/).

## Running

NOTE: The backend code should be running in order for the front end to behave correctly. See [Breads API](https://github.com/aTmb405/breads-server).

Make sure the necessary dependencies are installed, add environment variables, and type the command `npm start`

### Environment Variables
  
  **Axios**  
  `REACT_APP_AXIOS_URL` - backend url (i.e. - 'http://localhost:8080/api')

## Testing

~~Before committing your changes, run the command `npm test`~~

Tests are not up to date. (This would be a great way to contribute!)

## Deploying

~~After confirming the tests have passed~~ - see above

1. [Keep your fork in sync](https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/) with this repository ([how to merge conflicts](https://opensource.com/article/20/4/git-merge-conflict)):

```
# Add a new remote upstream repository
git remote add upstream https://github.com/zero-to-mastery/breads-client.git

# Sync your fork
git fetch upstream
git checkout master
git merge upstream/master
```

2. Push changes to your repo:

`git push origin master`

3. In your repo GitHub page, create a pull request to the `development` branch. This will allow us to see changes in a staging environment before merging to `master`.

4. If everything runs correctly, your pull request will be merged into `master`.

## Technologies

* [React](https://reactjs.org/) ([Create React App](https://create-react-app.dev/))
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Near Future

* [CircleCI](https://circleci.com/)
* [Prettier](https://prettier.io/)
* [ESLint](https://eslint.org/)
