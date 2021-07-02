/**
 * script-loader source, minified version located in index.html.
 * this script is used for loading other application scripts within its own domain.
 * the syntax is compatible with older browsers
 */
(function() {
  var scripts = document.querySelectorAll('html > head > meta[name="app-script"]');

  for (var i = 0; i < scripts.length; i++) {
    var path = scripts[i].getAttribute('content');
    var script = document.createElement('script');
    script.src = path;

    var domain = script.src.substr(0, window.location.origin.length);

    if (domain !== window.location.origin) {
      window.console && console.error('[ScriptLoader] Cannot load ' + path + '.');
    } else {
      document.body.appendChild(script);
    }
  }
})();
