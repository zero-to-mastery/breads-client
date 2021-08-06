# Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Before you contribute

Our aim is to keep it simple for the developers to contribute to this project. See the [folder structure](https://github.com/zero-to-mastery/breads-client/blob/master/CONTRIBUTING.md#folder-structure) (with concise description)

## How to contribute

1. First, fork (make a copy of) this repo to your Github account

2. Clone (download) your fork to your computer

3. Keep your clone in sync with the original repo (get the latest updates)

  HTTPS
  ```
  git remote add upstream https://github.com/zero-to-mastery/breads-client.git
  git pull upstream master
  ```

  SSH
  ```
  git remote add upstream git@github.com:zero-to-mastery/breads-client.git
  git pull upstream master
  ```
  ([For more info](https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/))

4. Install packages

  - Run `npm install`

5. Set up your local environment variables

  Create a `.env` file  in the root directory:

  - `REACT_APP_AXIOS_URL` - backend url (i.e. - 'http://localhost:8080/api')

  **To run the frontend without setting up a local backend, set `REACT_APP_AXIOS_URL=https://staging-breads-server.herokuapp.com/api`

6. Run `npm start` and confirm the app is running 

7. Create a new branch `git checkout -b <your_branch_name>`

8. Start making your changes.

9. Get a screenshot/gif of your finished work (if there are any UI changes). Try to crop it so that it looks good as a smallish (preferably squarish) image

10. Pull from the upstream again (step 3) before you commit your changes to ensure your still have the latest code

If you see an error similar to `Your local changes to the following files would be overwritten by merge. Please commit your changes or stash them before you merge` on using `git pull upstream master` use:

  ```
  git stash
  git pull upstream master
  git stash pop
  ```

([For more info](https://bluecast.tech/blog/git-stash/))

11. Commit and push the code to your fork

12. In your repo GitHub page, create a pull request to the `development` branch. This will allow us to see changes in a staging environment before merging to `master`. If everything runs correctly, your pull request will be merged into `master`.

([For more info](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow))

## Folder Structure

```
├── ...                 
├── /src
│ ├── ...
│ ├── /app
│ │ ├── App.tsx                   # top-level component
│ │ ├── Routes.tsx                # houses the routes of the application
│ │ ├── store.ts                  # creates the Redux store instance
│ ├── /common                     # components used throughout codebase
│ │ ├── /services                 # Axios fetch wrapper and normalizr schemas
│ │ ├── ...
│ ├── /features                   # UI and logic grouped by features
│ │ ├── /exampleFeature
│ │ │ ├── /components             # contains relevant components for this feature
│ │ │ ├── actions.ts              # user "events" that trigger state updates
│ │ │ ├── constants.ts            # used in root reducer and selectors
│ │ │ ├── index.ts                # feature's public API
│ │ │ ├── reducer.ts              # "event listeners" that handle state updates
│ │ │ ├── selectors.ts            # functions that extract specific info from state values
│ │ │ ├── types.ts                # action and reducer types
│ │ ├── ...
├── fontawesome.js                # imports icons
├── index.js                      # application starting point
├── infima.css                    # app styles
└── ...
```

## This project uses the  Creative Commons Attribution 4.0 International License

When you submit code changes, your submissions are understood to be under the same CC License that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's issues

We use GitHub issues to track public bugs. Report a bug by opening a new issue; it's that easy!

## Write bug reports with detail, background, and sample code

Great Bug Reports tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happened
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People love thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style
Observe the coding style of the project and add your code also in the same style. Don't make major changes (Like changing the complete folder structure)
