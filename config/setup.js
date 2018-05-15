global.chai = require('chai');
global.expect = chai.expect;
global.puppeteer = require('puppeteer')
global.devices = require('puppeteer/DeviceDescriptors');

global.env = process.env.NODE_ENV;
global.baseUrl = 'https://www.ratemyagent.com.au';


global.puppeteer = require('puppeteer');
global.devices = require('puppeteer/DeviceDescriptors');
global.devicesToEmulate = [
	'iPhone 6',
	'iPhone 6 landscape',
	'iPhone 6 Plus',
	'Nexus 5',
	'Nexus 6',
	'iPad Pro'
];

global.visualTestHelpers = require('../utils/visualTestHelpers');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');
global.actualDir = `${rootDir}/images/actual`;
global.baselineDir = `${rootDir}/images/baseline`;
global.diffDir = `${rootDir}/images/diff`;
