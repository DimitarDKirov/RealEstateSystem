var templateLoader = function () {
    cache = {};

    function loadTemplate(name) {
        return new Promise(function (resolve, reject) {
            if (cache[name]) {
                resolve(cache[name]);
                return;
            }

            $.get('./public/templates/' + name + '.html')
                .done((file) => {
                    let template = Handlebars.compile(file);
                    cache[name] = template;
                    resolve(template);
                })
                .fail(reject);
        });
    }
    return {
        loadTemplate
    }
}();


