# qts-styleguide

[![GitHub license](https://img.shields.io/github/license/nthompson777/ng-font-qts.svg)](https://github.com/nthompson777/ng-font-qts/blob/master/LICENSE) 


## Table of contents
1. [Getting Started](#getting-started)
2. [Installation Instructions](#installation-instructions)
3. [License](#license)


## Getting started

The QTS Style Guide uses the Foundation for Sites framework (SCSS and jQuery), is built with Gulp, and templating using Handlebars. 

Gulp was set up to include the following automated tasks when saving applicable files:

- .hbs page files automatically generate HTML files to the /dist folder and refresh the browser via BrowserSync on localhost:3000
- .scss files are automatically run through PostCSS Autoprefixer and MQpacker, minified, and then compiled to CSS files in /dist
- .js files are concantenated, uglified and minified
- BrowserSync refreshes the browser after each save of the above file types


## Installation instructions

cd to your desired install directory then run: `git clone https://github.com/nthompson777/qts-styleguide`

Next run `yarn` or `npm i` to install dependencies.

Start your build with  
```bash
yarn start
OR
gulp
```

### License

MIT
