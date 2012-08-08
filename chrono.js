// chrono.js
// version : 0.0.1
// author : Wanasit T.
// license : MIT
(function () {
  
  var chrono = {}
  
  chrono.parsers = {};
  chrono.importantdays = {};
  
  if(typeof exports == 'undefined'){
    //Browser Code
    var moment = window.moment;
    window.chrono = chrono;
  }
  else{
    //Node JS
    var fs = require('fs');
    var moment = require('moment');
    
    eval(fs.readFileSync(__dirname + '/parsers/ParseResult.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/Parser.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/IntegratedParser.js')+'');
    
    var parser_dirs = fs.readdirSync('./parsers');
    parser_dirs = parser_dirs.filter(function(name) { return !name.match(/\./ ) })
    for(var i in parser_dirs){
      var dirname = parser_dirs[i];
      var parser_files = fs.readdirSync('./parsers/'+dirname);
      
      for(var j in parser_files){
        var filename = parser_files[j];
        
        eval(fs.readFileSync(__dirname + '/parsers/'+dirname+'/'+filename)+'');
      }
    }
    
    module.exports = chrono;
  }
  
  chrono.parse = function() {
      
  }
  
  chrono.parseDate = function() {
    
  }
  
})();

