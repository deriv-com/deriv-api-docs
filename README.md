# Deriv API

![Prerequisite](https://img.shields.io/badge/node-18.x-blue.svg)
![Prerequisite](https://img.shields.io/badge/npm-10.x-orange.svg)
![Prerequisite](https://img.shields.io/badge/docusaurus-3.x-darkgreen.svg)
![Prerequisite](https://img.shields.io/badge/@deriv/ui-0.8.x-red.svg)

[![Coverage Status](https://coveralls.io/repos/github/deriv-com/deriv-api-docs/badge.svg?branch=master)](https://coveralls.io/github/deriv-com/deriv-api-docs?branch=master)

## Description

Welcome to the official API documentation for Deriv. Here, you will find comprehensive guides and documentation to help you start working with our APIs as quickly as possible, as well as support if you get stuck. Let's jump right in!`

## Quick Access

- [Prerequisite](#Prerequisite)
- [Setup Guide](#Setup-Guide)
  - [Clone](#clone-the-project)
  - [Install Dependencies](#install-dependencies)
  - [Production Build](#build-the-project)
- [How to Contribute](#How-to-Contribute)
  - [Fork Repository](#fork-the-project)
  - [Configure Origin & Upstream](#configure-origin--upstream)
  - [Branching and Pull Request Guidelines](#Branching-and-Pull-Request-Procedure)
- [Project Structure](#Project-Structure)

## Prerequisite

To ensure smooth running and contribution to this project, please make sure you have the following packages installed in your environment:

| Tool | Version   | Reference                                                  |
| ---- | --------- | ---------------------------------------------------------- |
| Node | >=18.20.0 | [Download](https://nodejs.org/en/download/package-manager) |
| npm  | >=10.7.0  | -                                                          |
| Git  | -         | [Download](https://git-scm.com/downloads)                  |

**Note**: Ensure that `node -v` and `sudo node -v` show the same version.

## Setup Guide

### Clone the Project

    git clone git@github.com:[username]-deriv/deriv-api-docs.git

**Note**: Replace `[username]-deriv` with your username to clone the forked repository. Also, to clone the repository, set up SSH on GitHub to authorize your system to clone and perform git operations. Please refer to this [documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Install Dependencies

    npm ci   // To Clean & Install

or

    npm i   // To Install

### Run the Project

After successfully building the project, you can execute or debug it using the Terminal by running the following command.

    npm run start:dev

### Build the Project

    npm run build

## How to Contribute

If you are a developer and want to contribute to the repository, please follow the procedure below.

### Fork the project

To create your own version of the Deriv API application, you need to `fork` the project to your own GitHub repository. Follow these steps to `fork` a repository:

1. Go to the GitHub page of the repository you want to `fork`.
2. Click on the "`Fork`" button at the top right corner of the page.
3. Choose the `GitHub account` where you want to fork the repository.
4. Wait for the forking process to complete. Once done, you will be redirected to your forked repository.

Now you have your own copy of the repository that you can work on and make changes to. Then [Clone](#Clone-the-Project) the repository to start contribution.

### Configure Origin & Upstream

Once you clone the project, before committing any changes, you need to set up a few things for git `email` and `username`. Additionally, if you want to push your code, you need to set up the origin and upstream to connect with the main repository `deriv-api` in `deriv-com`.

To set up the origin, use the following command in the Terminal:

    git remote add origin [origin URL]

Replace `[origin URL]` with the git repository URL of your repository. Now, after setting up the origin, you need to add the `upstream`. To do that, use the following command:

    git remote add upstream [upstream URL]

Replace `[upstream URL]` with the git repository URL for the main [repository](https://github.com/deriv-com/deriv-api-docs.git).

### Branching and Pull Request Procedure

To create a branch from the latest master branch, follow these steps:

1. Switch to the master branch using the command `git checkout master`.
2. Pull the latest changes from the upstream master branch using the command `git pull upstream master`.
3. Create a new branch with your desired branch name using the command `git checkout -b [your_branch_name]`.
4. Push your changes to the origin branch using the command `git push origin [your_branch_name]`.

### Project Structure

This application is developed using `Docusaurus`, which follows a specific project structure to organize and manage documentation websites. The typical project structure includes the following directories and files:

**Example:**

    ├── docs
    |   ├── Code Example
    |   |     ├── Javascript
    |   ├── Core Concepts
    |   |     ├── Web Sockets
    |   ├── Frameworks
    |   ...
    |
    ├── src
    |   ├── components
    |   ├── configs
    |   ├── features
    |   ├── hooks
    |   ├── context
    |   ├── pages
    |   ├── theme
    |   ├── styles
    |   ...
    |
    ├── static
    |   ├── img
    |
    ├── config
    |   ├── v3
    |
    ├── docusaurus.config.js
    ├── readme.md
    ├── package.json
    ...

**_Note_**:

In the root of the project, there is a folder called `Config/v3`. This folder is managed by the `Backend Team` through workflow and contains configurations used in the `API Explorer` page for API request and response values and data. The `Frontend Team` does `not` need to modify this folder.
