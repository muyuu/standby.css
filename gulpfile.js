const g = require("gulp");
const connect = require("gulp-connect");
const cleanCSS = require('gulp-clean-css');
const $ = require( 'gulp-load-plugins' )();

const src = "./";
const dist = "./";
const docs = "docs/";
const port = 5555;

s = {
    root: src,
    css: src + "sass/"
};

d = {
    root: dist,
    docs: dist + docs,
    css: dist
};

// local server
g.task('connect', ()=>{
  connect.server({
    root: d.docs,
    port: port,
    livereload: true
  });
});


// css
g.task("css", ()=>{
    g.src([`${s.css}standby.sass`, `${s.css}style.sass`])
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sass({
        outputStyle: 'expanded'
    }))
    .pipe($.autoprefixer([
        'last 3 version',
        'IE 8'
    ]))
    .pipe($.csscomb())
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe($.sourcemaps.write("./"))
    .pipe(g.dest(d.css))
    .pipe(g.dest(d.docs));
});


// watch
g.task("watch", ()=>{
    g.watch(`${s.css}**/*.sass`, ["css"]);
});

// default task
g.task("default", ()=>{
    g.start(["connect", "watch"]);
});

// build task
g.task("pkg", ()=>{
    g.start(["css"]);
});
