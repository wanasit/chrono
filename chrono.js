// Chrono.js
// version : 0.0.5
// author : Wanasit T.
// license : MIT
(function () {
    
    var Chrono = function(){
        for(var attr in Chrono){
            this[attr] = Chrono[attr]
        }

        this.parsers = {}
        for(var p in Chrono.parsers) this.parsers[p] = Chrono.parsers[p];

        this.refiners = {}
        for(var r in Chrono.refiners) this.refiners[r] = Chrono.refiners[r];

        this.timezoneMap = {}
        for(var r in Chrono.timezoneMap) this.timezoneMap[r] = Chrono.timezoneMap[r];
    }

    Chrono.timezoneMap = {};
    Chrono.parsers = {};
    Chrono.refiners = {};
    
    Chrono.parse = function(text, referrenceDate, option) {
        
        option = option || {}

        if(typeof(referrenceDate) === 'string'){
            var _ref = moment(referrenceDate).zone(referrenceDate);
            option.timezoneOffset = _ref.zone();
            referrenceDate        = _ref.toDate();
        }

        var results = this.integratedParse(text, referrenceDate, option);
        var results = this.integratedRefine(text, results, option);
        
        return results;
    }
    
    Chrono.parseDate = function(text, referrenceDate, timezoneOffset) {
        
        var results = this.parse(text, referrenceDate);
        
        if(results.length >= 1) return results[0].start.date(timezoneOffset);
        else return null;
    }
    
    if (typeof module === 'object'){

        //Node JS
        if(typeof moment == 'undefined') eval("var moment = require('./moment');");
        var fs = require('fs');
        
        function loadModuleDirs(dir){
            
            var module_dirs = fs.readdirSync(__dirname+'/'+dir);
            module_dirs = module_dirs.filter(function(name) { return !name.match(/\./ ) })
            for(var i in module_dirs){
                var dirname = module_dirs[i];
                if(typeof(dirname) == 'function') continue;
                var parser_files = fs.readdirSync( __dirname +'/'+dir + '/' + dirname);

                for(var j in parser_files){
                    var filename = parser_files[j];
                    if(typeof(filename) == 'function') continue;
                    if(!filename.match(/\.js$/)) continue;
                    eval(fs.readFileSync(__dirname + '/'+dir+'/'+dirname+'/'+filename)+'');
                }
            }
        }
        
        var chrono = module.exports = Chrono;
        eval(fs.readFileSync(__dirname + '/timezone.js')+'');
        eval(fs.readFileSync(__dirname + '/parsers/ParseResult.js')+'');
        eval(fs.readFileSync(__dirname + '/parsers/Parser.js')+'');
        eval(fs.readFileSync(__dirname + '/parsers/IntegratedParsing.js')+'');
        loadModuleDirs('parsers');
        eval(fs.readFileSync(__dirname + '/refiners/IntegratedRefinement.js')+'');
        loadModuleDirs('refiners');

    } else if (typeof window === 'object'){
        //Browser Code
        moment = moment || window.moment;
        window.chrono = Chrono;
    } else {
        //Something else
        chrono = Chrono;
    }
})();


