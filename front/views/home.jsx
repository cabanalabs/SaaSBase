const c = global.Configs;
const React = require('react');
const WelcomeText = require('../components/welcome_text');
const defaultView = function defaultView() {
  return (
    <html>
      <head>
        <meta charSet="utf-8"></meta>
        <title>{c.AppName}</title>
        <link href="/css/common.css" rel="stylesheet" type="text/css" />
        <link href="/css/home.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="app">
          <div id="front_desk">If you are seeing this
            then JavaScript is turned off!
            Turn it back on, and then refresh this page.
          </div>
          <WelcomeText />
        </div>
        <script src="/js/common.js" type="text/javascript"></script>
        <script src="/js/front_desk.js" type="text/javascript"></script>
      </body>
    </html>
  );
};

module.exports = defaultView;
