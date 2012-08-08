/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /((this|last|next)\s*)?(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(\W|$)/i;
  var DAYS_OFFSET = { 'sunday': 0, 'monday': 1,'tuesday': 2,'wednesday': 3,'thursday': 4,'friday': 5,'saturday': 6,}
  
  
  /**
   * DayOfWeekParser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser } 
   */
  function DayOfWeekParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var matchedTokens = text.substr(index).match(PATTERN);
  		if(matchedTokens == null){
  			finished = true;
  			return;
  		}

  		var text = matchedTokens[0];
  		text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[4].length);

  		var prefix = matchedTokens[2];
  		var dayOfWeek = matchedTokens[3];
      
      dayOfWeek = dayOfWeek.toLowerCase();
  		var offset = DAYS_OFFSET[dayOfWeek];
      
      if(offset === undefined) return null;
      
  		var date = moment(ref).clone();
  		
  		if(prefix){
  			
  			prefix = prefix.toLowerCase();
  			
  			if(prefix == 'last')
  				date.day(offset - 7)
  			else if(prefix == 'next')
  			  date.day(offset + 7)
  			else if(prefix== 'this')
  			  date.day(offset);
  		}
  		else{
  			date.day(offset);
  		}
  		
      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year()
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.DayOfWeekParser = DayOfWeekParser;
})();

