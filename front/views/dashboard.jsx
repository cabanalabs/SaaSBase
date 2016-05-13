const c = global.Configs;
const React = require('react');
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
        <div id="app">If you are seeing this
          then JavaScript is turned off!
          Turn it back on, and then refresh this page.
        </div>
        <script src="/js/common.js" type="text/javascript"></script>
        <script src="/js/dashboard.js" type="text/javascript"></script>
      </body>
    </html>
  );
};

module.exports = defaultView;
