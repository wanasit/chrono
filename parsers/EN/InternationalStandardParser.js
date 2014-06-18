/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})(\W|$)/i;
  
  function InternationalStandardParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var matchedTokens = text.substr(index).match(PATTERN);
  		if(matchedTokens == null){
  			finished = true;
  			return;
  		}

  		var text = matchedTokens[0];
  		text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[4].length);
  		
  		//Impossible Date or Invalid Date
  		var date = moment(text, 'YYYY-MM-DD');
  		if(date.format('YYYY-M-D') != text && date.format('YYYY-MM-DD') != text){
  		  return null;
  		} 
  		
      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          dayOfWeek:date.day()
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.InternationalStandardParser = InternationalStandardParser;
})();

