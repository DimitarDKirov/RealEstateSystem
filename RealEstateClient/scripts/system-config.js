SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    paths: {
        'npm:*': './node_modules/*',
        'scripts:*': '/scripts/*'
    },
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './node_modules/jquery/dist/jquery.js',
        'handlebars': './node_modules/handlebars/dist/handlebars.js',
        'navigo': './node_modules/navigo/lib/navigo.js',
        'controller': './scripts/controller.js',
        'templateLoader': './scripts/templateLoader.js',
        'httpRequester': './scripts/httpRequest.js',
        'data': './scripts/data.js',
        // app start script
        'app': './scripts/app.js'
    }
});