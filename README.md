# Deriv API

![Prerequisite](https://img.shields.io/badge/node-18.x-blue.svg)
![Prerequisite](https://img.shields.io/badge/npm-10.x-orange.svg)
![Prerequisite](https://img.shields.io/badge/docusaurus-3.x-darkgreen.svg)
![Prerequisite](https://img.shields.io/badge/@deriv/ui-0.8.x-red.svg)

[![Coverage Status](https://coveralls.io/repos/github/deriv-com/deriv-api-docs/badge.svg?branch=master)](https://coveralls.io/github/deriv-com/deriv-api-docs?branch=master)

## Description

The Deriv API is a powerful financial trading platform built using modern technologies. It leverages Node.js, Docusaurus, and @deriv/ui for documentation and UI components. Prerequisites include Node.js, npm, Docusaurus, @deriv/ui, and Git. The project structure follows Docusaurus conventions. Jest and Testing-Library are used for testing. WebSockets enable real-time communication. The Deriv API offers a comprehensive experience with cutting-edge technologies and user-friendly interfaces.

## Quick Access

- [Prerequisite](#Prerequisite)
- [Setup Guide](#Setup-Guide)
- [How to Contribute](#How-to-Contribute)
  - [Branching and Pull Request Guidelines](#Branching-and-Pull-Request-Procedure)
- [Packages Used](#Packages-Used)
- [Project Structure](#Project-Structure)

## Prerequisite

To ensure smooth running and contribution to this project, please make sure you have the following packages installed in your environment:

| Tool       | Version   | Reference                                                      |
| ---------- | --------- | -------------------------------------------------------------- |
| Node       | >=18.20.0 | [Download](https://nodejs.org/en/download/package-manager)     |
| npm        | >=10.7.0  | -                                                              |
| Docusaurus | >=3.2.2   | [Documentation](https://docusaurus.io/docs/3.3.2)              |
| @deriv/ui  | >=0.8.0   | [Documentation](https://github.com/deriv-com/deriv-components) |
| Git        | -         | [Download](https://git-scm.com/downloads)                      |

**Note**: Ensure that `node -v` and `sudo node -v` show the same version.

## Setup Guide

### Fork the project

To create your own version of the Deriv API application, you need to `fork` the project to your own GitHub repository. Follow these steps to `fork` a repository:

1. Go to the GitHub page of the repository you want to `fork`.
2. Click on the "`Fork`" button at the top right corner of the page.
3. Choose the `GitHub account` where you want to fork the repository.
4. Wait for the forking process to complete. Once done, you will be redirected to your forked repository.

Now you have your own copy of the repository that you can work on and make changes to.

### Clone Using SSH

    git clone git@github.com:[username]-deriv/deriv-api-docs.git

**Note**: Replace `[username]-deriv` with your username to clone the forked repository. Also, to clone the repository, set up SSH on GitHub to authorize your system to clone and perform git operations. Please refer to this [documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Open Project Directory

Once you clone the repository, open the project using IDE `Visual Studio Code` or `Terminal/Command Prompt`.

    cd deriv-api-docs

### Install Dependencies

    npm ci

### Build the Project

    npm run build

### Run the Project

After successfully building the project, you can execute or debug it using the Terminal by running the following command.

    npm run start:dev

## How to Contribute

If you are a developer and want to contribute to the repository, please follow the procedure below.

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

### Preview Pull Request - Testing/QA Verification

Upon creating a PR, [Vercel](https://vercel.com/) will auto-generate a test link inside the PR. You can use that to preview the test link for the changes you have made.

## Packages Used

In addition to `Node`, `npm`, and `git`, we have utilized various external and internal packages in this project.

#### Docusaurus

Docusaurus is a modern static site generator designed for creating documentation websites. It simplifies the process of building, deploying, and maintaining documentation projects. With Docusaurus, you can organize your documentation, customize the layout and styling, and collaborate seamlessly with version control systems. It offers search functionality, responsive design, and support for multiple languages. Docusaurus is widely used by developers and organizations to create professional and user-friendly documentation websites. Give it a try and experience its power for your documentation needs. For more information, refer to the official [documentation](https://docusaurus.io/docs/3.3.2).

#### @Deriv/ui

The `@deriv/ui` package provides a collection of reusable UI components for building web applications.
It includes a wide range of components such as buttons, forms, modals, and more, that can be easily customized and integrated into your project.

This package follows a modular approach, allowing you to import and use only the components you need, reducing the bundle size and improving performance.

To install the `@deriv/ui` package, you can use npm or yarn:

```shell
npm install @deriv/ui
```

```shell
yarn add @deriv/ui
```

Once installed, you can import the components from the package and start using them in your application.

```typescript
import { Button, Input, Modal } from '@deriv/ui';

// Example usage
const App = () => {
  return (
    <div>
      <Button text='Click me' onClick={() => console.log('Button clicked')} />
      <Input type='text' placeholder='Enter your name' />
      <Modal title='Welcome' content='This is a modal dialog' />
    </div>
  );
};
```

For more information and detailed documentation about the available components and their usage, please refer to the official `@deriv/ui` [documentation](https://github.com/deriv-com/ui).

### Jest

Jest is a popular JavaScript testing framework that is widely used for testing JavaScript code, including React applications. It provides a simple and intuitive API for writing tests and comes with built-in features such as test runners, assertions, and mocking utilities.

With Jest, you can write unit tests, integration tests, and snapshot tests to ensure the correctness and reliability of your code. It supports various testing techniques, including test-driven development (TDD) and behavior-driven development (BDD).

Jest offers a rich set of features, such as code coverage reporting, parallel test execution, and test watch mode. It also integrates seamlessly with other tools and libraries, making it a powerful choice for testing JavaScript applications. For more information, refer to the official [documentation](https://jestjs.io/docs/en/getting-started).

### Testing-Library

Testing-Library is a popular JavaScript testing utility that focuses on testing user interfaces. It promotes writing tests that resemble user interactions and emphasizes accessibility. It is framework-agnostic and integrates well with testing frameworks like Jest. Using Testing-Library leads to more reliable tests, improved code quality, and better user experiences. For more information, refer to the official [documentation](https://testing-library.com/).

### Web Sockets

WebSockets are a communication protocol that enables real-time, bidirectional communication between a client and a server over a single, long-lived connection. Unlike traditional HTTP requests, which are stateless and require a new connection for each request, WebSockets allow for persistent connections, allowing data to be transmitted back and forth between the client and server in real-time.

In the context of the Deriv API, WebSockets are used to provide real-time data updates to clients. By utilizing WebSockets, the Deriv API can push real-time market data, trade updates, and other relevant information to clients, ensuring that they have the most up-to-date information at all times. For more information, refer to the official [documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

### Project Structure

This application is developed using `Docusaurus`, which follows a specific project structure to organize and manage documentation websites. The typical project structure includes the following directories and files:

`docs`: This directory contains all the documentation files written in Markdown format `mdx`. Each Markdown folder/file represents a separate page or section and subsections of the documentation.

**Example:**

    ├── Docs
    |   ├── Code Example
    |   |     ├── Javascript
    |   ├── Core Concepts
    |   |     ├── Web Sockets
    |   |Frameworks

`src`: This directory houses the source code of the Docusaurus project. It encompasses configuration files, theme customization, and additional JavaScript or CSS files. Within the `src` directory, there are several folders that are utilized to optimize the code.

Here are the different directories and their purposes in this project:

- `pages`: Any pages created in this folder will be treated as separate pages and will be visible in the website header as part of the navigation.

**_Note_**: To make the page visible, you need to configure it from `docusaurus.config.js`. Find more [here](https://docusaurus.io/docs/api/docusaurus-config).

- `features`: This folder contains all the code files that are being used inside the `pages` files as module components.

- `components`: This folder contains all the custom components required in this project, including global components like `footer`, `Spinner`, `AccountSwitcher`, etc.

- `hooks`: This folder contains all the custom hooks that are created to fetch data and perform certain operations.

- `contexts`: The `contexts` folder is used for managing the state of the application. It allows for centralized data management using `Context`.

- `theme`: This folder contains the strict type files provided by Docusaurus. These files are injected to add UI components like `Layout` and `Navbar`.

`static`: This directory is used to store static assets such as images, videos, or any other files that need to be included in the documentation.

`sidebar.js`: This file defines the sidebar configuration for the current version of the documentation. It determines the navigation structure and hierarchy of the documentation pages.

`docusaurus.config.js`: This file is an important configuration file in a Docusaurus project. It is located in the root directory of the project and contains various settings and options that define the behavior and appearance of the documentation website.

Here are some key aspects of the `docusaurus.config.js` file:

1. **Site Metadata**: The file includes metadata such as the site title, description, and URL. This information is used to generate the HTML metadata tags and is important for search engine optimization (SEO).

2. **Theme Configuration**: Docusaurus allows you to customize the appearance of your documentation website by specifying a theme. The `docusaurus.config.js` file includes options to configure the theme, such as the theme name, color scheme, and logo.

3. **Plugins**: Docusaurus supports various plugins that extend the functionality of the documentation website. The `docusaurus.config.js` file includes a section where you can configure and enable plugins, such as search functionality, Google Analytics integration, and custom CSS or JavaScript.

4. **Sidebar Configuration**: The sidebar is an important navigation element in a Docusaurus documentation website. The `docusaurus.config.js` file includes a section where you can define the structure and hierarchy of the sidebar. This determines how the documentation pages are organized and displayed in the sidebar.

5. **Versioning**: If your documentation website has multiple versions, the `docusaurus.config.js` file allows you to configure versioning options. You can specify the versions, their URLs, and any additional configuration related to versioning.

6. **Deployment Configuration**: Docusaurus supports various deployment options, such as deploying to GitHub Pages, Netlify, or custom servers. The `docusaurus.config.js` file includes options to configure the deployment settings, such as the target directory, base URL, and custom domain.

By modifying the `docusaurus.config.js` file, you can customize and tailor your Docusaurus documentation website to meet your specific requirements.

`README.md`: This file serves as the landing page for the documentation website. It provides an overview of the project and includes any necessary instructions or guidelines for users.

`package.json`: This file contains the project's metadata and dependencies. It is used by npm to manage the project's dependencies and scripts.

`yarn.lock` or `package-lock.json`: These files are automatically generated by npm or yarn to lock the versions of the project's dependencies.

**_Note_**:

In the root of the project, there is a folder called `Config/v3`. This folder is managed by the `Backend Team` through workflow and contains configurations used in the `API Explorer` page for API request and response values and data. The `Frontend Team` does `not` need to modify this folder.
