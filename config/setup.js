global.chai = require('chai');
global.should = chai.should();
global.puppeteer = require('puppeteer')
global.devices = require('puppeteer/DeviceDescriptors');

global.env = process.env.NODE_ENV;
global.baseUrl = 'https://www.ratemyagent.com.au';


