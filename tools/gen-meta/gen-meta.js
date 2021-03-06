var fs = require('fs');
var path = require('path');
var dirname = __dirname;
var root = path.join(dirname, '../../');
var program = require('commander');

program.option('--suffix [suffix]')
    .option('--dir [dir]')
    .option('--output <output>')
    .parse(process.argv);

var suffix = program.suffix || '/meta';
var output = program.output;
var dir = program.dir || path.join(root, 'src/');
var bowerDir = path.join(root, 'bower_components/');
var HEAD = ['modulex.use([\'ua\', \'feature\'], function(UA, Feature){','var mx = modulex;'].join('\n');
var FOOT = '});';
var requireFiles = [];
var jsFiles = [];

function endsWith(str, suffix) {
    var ind = str.length - suffix.length;
    return ind >= 0 && str.indexOf(suffix, ind) === ind;
}

function mix(r, s) {
    for (var i in s) {
        r[i] = s[i];
    }
}

function getFiles(dir, ignoreMeta) {
    dir = dir.replace(/\\/g, '/');
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) {
            continue;
        }
        var file = files[i];
        var name = dir + '/' + file;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, ignoreMeta);
        } else if (ignoreMeta && endsWith(file, 'deps.json')) {
            requireFiles.push(name);
        } else if (endsWith(dir, suffix)) {
            if (endsWith(file, 'deps.json')) {
                requireFiles.push(name);
            } else if (endsWith(file, '.js')) {
                jsFiles.push(name);
            }
        }
    }
}

getFiles(dir);
getFiles(bowerDir, true);

var requires = {};
var jsCode = [''];

requireFiles.forEach(function (r) {
    /*jshint evil:true */
    var content = fs.readFileSync(r, {
        encoding: 'utf-8'
    });
    try {
        mix(requires, eval('(' + content + ')'));
    } catch (e) {
        console.error(r + ': ' + content);
        throw e;
    }
});

requires = require('deps-optimizer').optimize(requires);

jsFiles.forEach(function (r) {
    jsCode.push(fs.readFileSync(r, {
        encoding: 'utf-8'
    }));
});

var code = ['mx.config("requires",' + JSON.stringify(requires, undefined, 4) + ');'];

if (jsCode.length > 1) {
    code = code.concat(['var win = window,',
        '    isTouchGestureSupported = Feature.isTouchGestureSupported(),',
        '    add = mx.add,',
        '    emptyObject = {};',
        '']);
    code = code.concat(['function alias(name, aliasName) {',
        '   var cfg;',
        '   if(typeof name ==="string") {' ,
        '       cfg = {};' ,
        '       cfg[name] = aliasName;',
        '   } else {' ,
        '       cfg = name;',
        '   }',
        '   mx.config("alias", cfg);' ,
        '}']);
    code = code.concat(jsCode);
}

code = ['/*jshint indent:false, quotmark:false*/', HEAD].concat(code).concat(FOOT);

fs.writeFileSync(output, code.join('\n'));
