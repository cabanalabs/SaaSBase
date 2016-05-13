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
        <div id="dashboard">
          <h1>Logged Out</h1>
          <p>Bad or expired credentials. Sorry about that. Please,&nbsp;
            <a href={c.server.info.uri}>Go back to {c.server.info.uri}</a> and login again.</p>
        </div>
        <script src="/js/common.js" type="text/javascript"></script>
        <script src="/js/dashboard.js" type="text/javascript"></script>
      </body>
    </html>
  );
};

module.exports = defaultView;
