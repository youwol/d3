
export { }
require('./style.css');
/*
// To re-enable when served using py-youwol: dynamic loading of dependencies
// At the same time webpack.config.js should be modified to define externals

let cdn = window['@youwol/cdn-client']

var loadingScreen = new cdn.LoadingScreenView({ container: document.body, mode: 'svg' })
loadingScreen.render()

await cdn.install({
    modules: [
        'lodash',
        '@youwol/flux-view',
        'd3',
        'rxjs'
    ],
    scripts: [],
    css: [
        "bootstrap#4.4.1~bootstrap.min.css",
        "fontawesome#5.12.1~css/all.min.css",
        "@youwol/fv-widgets#latest~dist/assets/styles/style.youwol.css"
    ]
}, window, (event) => {
    loadingScreen.next(event)
})
loadingScreen.done()
*/
await import('./on-load')
