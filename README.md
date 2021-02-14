# Vanhack Calendar

This repository contains the Vanhack Calendar Web project. A project that allows administrators to manage their interview schedules.

## Development

### Essential tools

You should install the following tools:

- [node](https://nodejs.org/en/) >= 10.13.0
- [yarn](https://yarnpkg.com/lang/en/) >= 1.13.0

If you have other project that requires a different version of node, consider using `nvm`, `avn` or any other
version manager (the project only contains .nvmrc and .node-version files).

### Project structure

We are taking an approach similar to group by feature ([https://reactjs.org/docs/faq-structure.html](https://reactjs.org/docs/faq-structure.html)).

### Running the project

This project is intended to run on a browser.

Before starting anything else, you must run `yarn install` at the root of the project.

To run Vanhack Calendar on a browser, you can simply run `yarn start` (this will automatically point to the QA environment).
It will be available at [http://localhost:3000](http://localhost:3000).

## Documentation

To make sure we don't repeat component implementation, we installed [react-styleguidist](https://github.com/styleguidist/react-styleguidist)
which allows us to create a component showcase. To start the component showcase
(in development mode, i.e. use this while you're creating documentation or if you just want to quickly check the component guide locally)
run `yarn styleguide`.

For examples of how to create component documentation within our project, check the components in _src/common/components/elements_.
Notice the _docs_ folder.