# Anvil

[![CircleCI](https://circleci.com/gh/Financial-Times/anvil/tree/master.svg?style=svg&circle-token=2149091698510f3908776e16620b30494fdca26c)](https://circleci.com/gh/Financial-Times/anvil/tree/master)

<p align="center">
  <img src="https://media.giphy.com/media/CtGZtZklB1yCs/giphy-downsized.gif" alt="3 fellas hammering it out">
</p>

The aim of this project is to provide a high quality, well tested, and thoroughly documented, modern asset pipeline and application shell for Node.js applications based upon the latest industry standards.

---

- [Scope](#scope)
- [FAQ](#faq)
- [Development](#development)
  - [Running Storybook](#running-storybook)

---


## Scope

### CLI

The CLI tool provides a suite of actions which can be extended via plugins. To begin with we are working on the `build` action which can be used to assemble the static assets for your application. By default this action includes only a barebones Webpack configuration but capabilities to transpile JS2018, TypeScript, CSS, Sass, and more can be added to extend this basic functionality.

### Server-side

This suite of modules will help your application to render user interfaces. These provide a wide range of functionality such as template rendering, hook your app up to external data sources (such as polling feature flags), and middleware to decorate request and response data.

### Application shell

The application shell provides the basic UI components for your application. This includes templates and layouts, feature detection and loading of assets, and shared client-side functionality such as analytics.


## FAQ

### What is an asset pipeline?

An asset pipeline is a set of tools and processes used to compile and optimise source code into a set of static JavaScript and CSS assets for use by a web browser. This may include [transpiling], [bundling], and [minification] steps.

[transpiling]: https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them
[bundling]: https://nolanlawson.com/2017/05/22/a-brief-and-incomplete-history-of-javascript-bundlers/
[minification]: https://blog.stackpath.com/glossary/minification/

### What is an application shell?

The application shell provides the tools required to locate and load the static assets generated by the asset pipeline and provide them to the browser. This includes the loading of JavaScript, stylesheets, fonts, and a minimal HTML document.

### Why are you doing this?

All of the user facing applications that together make up FT.com use a module called [n-ui]. This module currently provides:- an asset pipeline; an application shell; template loading and configuration; shared header and footer UI; navigation; tracking and analytics setup; global messaging components; and several other features. Although we rely on this module heavily it is not well understood by the current team and is tightly coupled to technical decisions that were made several years ago.

We plan to split these functions into a suite of tightly defined, loosely coupled modules based upon the current best standards. The aim is to provide a foundation which enables teams to work efficiently with the technologies best suited to solving the problems they have.

See the [original pitch document] for more information.

[n-ui]: https://github.com/Financial-Times/n-ui
[original pitch document]: https://docs.google.com/document/d/1UNRbX-BpPESA4-wSfCb6DRYIijyOUhBJh99iUE95cU0/edit?usp=sharing

### Does this replace n-ui?

The intention of this project is to gain in-depth knowledge about the features and usage of n-ui and to use this knowledge to help create a new suite of tools. If we are successful then we will help and encourage developers to migrate from n-ui to them.

### How does this relate to Origami?

This project does not include any visual changes to the FT.com application UI so the relationship between FT.com and Origami will remain unchanged.

### Will this target non-FT.com teams?

It is our aim to build a core set of modules which should be considered usable by the wider JavaScript community. On top of this core we will build FT specific modules. We hope that by introducing this conceptual divide we can make fewer assumptions, encourage contributions, and more effectively manage opinionated parts of the codebase.

## Development
### Using Storybook

To start storybook, first build the packages using the command:

```
npm run build
```

or `npm run dev` to build in watch mode. Once the files have been built, run the command: 

```
npm run storybook
```

The storybook interface should then automatically open in your default browser. Nothing else is needed. The storybook installation is configured to automatically find stories whose file name ends with `stories.tsx`, and that live in a package whose name starts with `anvil-ui-`.

Note that the storybook `config.js` file is automatically generated from the template located at `./.storybook/config.template.js`. As such, anything that needs to be added to the `config.js` file will have to be instead placed in the `./.storybook/config.template.js`. Remember though that you don't have to manually add stories to the `config.js` file as they are automatically discovered
