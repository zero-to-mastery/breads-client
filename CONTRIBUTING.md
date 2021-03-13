# Contributing to Breads Client

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Before you contribute

Our aim is to keep it simple for the developers to contribute to this project. See the folder structure (with concise description)

## How to contribute

1. First up you need to fork (make a copy) of this repo to your Github account.

2. Clone (download) your fork to your computer

3. Set your streams so that you can sync your clone with the original repo (get the latest updates)

```
git remote add upstream https://github.com/zero-to-mastery/breads-client.git
git pull upstream master
```

The above 2 commands will synchronize your forked version of the project with the actual repository.

4. Create a branch `git checkout -b <your_branch_name>`

5. Create a file .env in the root directory:

- `REACT_APP_AXIOS_URL` - backend url (i.e. - 'http://localhost:8080/api')

6. Install the necessary dependencies using `npm` or `yarn`

To install the packages through npm, run the command `npm install`

To install the packages through yarn, run the command `yarn add`

NOTE: In the rest of the documentation, you will come across npm being used for running commands. To use yarn in place of npm for the commands, simply substitute npm for yarn. Example, npm start as yarn start. For more help, checkout [migrating from npm](https://classic.yarnpkg.com/en/docs/migrating-from-npm/).

7. Run `npm install`

8. Run `npm start` and start making your changes.

9. Get a screenshot of your finished work! (if there are any UI changes) Try to crop it so that it looks good as a smallish (preferably squarish) image.

10. Pull from the upstream again before you commit your changes, like you did in step 3. This is to ensure your still have the latest code.

If you see a error like

`Your local changes to the following files would be overwritten by merge. Please commit your changes or stash them before you merge`

on using git pull upstream main use:

```
git stash
git pull upstream master
git stash pop
```

[(for more info)](https://bluecast.tech/blog/git-stash/)

11. Commit and push the code to your fork

12.  In your repo GitHub page, create a pull request to the `development` branch. This will allow us to see changes in a staging environment before merging to `master`. If everything runs correctly, your pull request will be merged into `master`.

## Folder Structure

### We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use Github Flow). We actively welcome your pull requests:

1. Fork the repo and create your branch from main.
2. If you've added code that should be tested, add tests.
3. If your change needs an explaination to the user, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same MIT License that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's issues

We use GitHub issues to track public bugs. Report a bug by opening a new issue; it's that easy!

## Write bug reports with detail, background, and sample code

Great Bug Reports tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)
People love thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style
Observe the coding style of the project and add your code also in the same style. Don't make major changes (Like changing the complete folder structure)

## License
By contributing, you agree that your contributions will be licensed under its MIT License.