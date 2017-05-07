export function loadTemplate(name) {
    return new Promise(function (resolve, reject) {
        $.get('/templates/' + name + '.html')
            .done((file) => {
                let template = Handlebars.compile(file);
                resolve(template);
            })
            .fail(reject);
    });
}
