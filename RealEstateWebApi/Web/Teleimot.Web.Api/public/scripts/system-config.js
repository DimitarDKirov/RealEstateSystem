SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    paths: {
        'npm:*': './public/node_modules/*',
        'scripts:*': '/public/scripts/*'
    },
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './public/node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './public/node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './public/node_modules/jquery/dist/jquery.js',
        'handlebars': './public/node_modules/handlebars/dist/handlebars.js',
        'navigo': './public/node_modules/navigo/lib/navigo.js',
        'controller': './public/scripts/controller.js',
        'templateLoader': './public/scripts/templateLoader.js',
        'httpRequester': './public/scripts/httpRequest.js',
        'data': './public/scripts/data.js',
        // app start script
        'app': './public/scripts/app.js'
    }
});