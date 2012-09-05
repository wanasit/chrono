/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(今日|昨日|明日|([1-9]+)\s*日前)(\W|$)/i;
  
  /**
   * GeneralDateParser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser } 
   */
  function JPGeneralDateParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(full_text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var matchedTokens = full_text.substr(index).match(PATTERN);
  		if(matchedTokens == null){
  			finished = true;
  			return;
  		}

  		var text = matchedTokens[0].toLowerCase();
  		text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[3].length);

  		var date = null;
  		if(text == '今日')
  			date = moment(ref).clone();
  		else if(text == '明日')
  			date = moment(ref).clone().add('d',1);
  		else if(text == '昨日')
  			date = moment(ref).clone().add('d',-1);
  		else {
  		  var days_ago = matchedTokens[2];
  		  days_ago = parseInt(days_ago);
  		  date = moment(ref).clone().add('d',-days_ago);
  		}
  		  
      var result = new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year()
        }
      })
      
      var resultWithTime = parser.extractTime(full_text,result);
      result = resultWithTime || result;      
      return result;
    };
    
  	return parser;
  }
  
  chrono.parsers.JPGeneralDateParser = JPGeneralDateParser;
})();

