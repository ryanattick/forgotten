var jsdom = require('jsdom');
var babel = require("babel-register");
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;