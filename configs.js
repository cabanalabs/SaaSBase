module.exports = {
  AppName: 'SaaSApp',
  JWTSecret: process.env.JWT_SECRET || 'YOSECRETISMYSECRETSODUNFOGETDIS',
  mainDB: process.env.MAIN_DB || 'mongodb://localhost:27017/MainDeeBee',
  mainPort: process.env.MAIN_PORT || 3000,
  testDB: process.env.TEST_DB || 'mongodb://localhost:27017/TestDeeBee',
  testPort: process.env.MAIN_PORT || 8000,
};
