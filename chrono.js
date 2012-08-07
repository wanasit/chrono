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
    
    module.exports = chrono;
  }
  
  
  
  chrono.parse = function() {
      
  }
  
  chrono.parseDate = function() {
    
  }
  
})();

