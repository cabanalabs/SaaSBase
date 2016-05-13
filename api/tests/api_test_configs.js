global.Configs = require('../../configs');
const c = global.Configs;
c.test = require('tape');
const helpersDir = `${__dirname}/../../helpers`;
c.db = require(`${helpersDir}/db`);
const routes = require('../routes');
c.server = require(`${helpersDir}/hapiServer`)(c.testPort, routes);
