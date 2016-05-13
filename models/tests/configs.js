const test = require('tape');
const helpersDir = `${__dirname}/../../helpers`;
const db = require(`${helpersDir}/db`);

module.exports = {
  db,
  test,
};
