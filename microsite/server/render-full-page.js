
export default function renderFullPage(html, initialState = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <title>Sidecar - Gitter</title>

      <link id="favicon" rel="shortcut icon" href="images/favicon-normal.ico">

      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,700italic,400italic" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
      <link href="css/all.css" rel="stylesheet">
    </head>
    <body>
      <div class="microsite-app-entry-point">${html || '...'}</div>


      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="js/build.js"></script>


      <script>
        ((window.gitter = {}).chat = {}).options = {
          room: 'gitterHQ/sidecar'
        };
      </script>
      <script src="https://sidecar.gitter.im/dist/sidecar.v0.js" async defer></script>

      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-45918290-12', 'auto');
        ga('send', 'pageview');
      </script>
    </body>
    </html>
  `;
}
