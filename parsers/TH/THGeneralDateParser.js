/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(วันนี้|พรุ่งนี้|เมื่อวาน|เมื่อคืน|([1-9]+)\s*(วัน|คืน)(ก่อน|ที่แล้ว))(\W|$)/i;
  
  /**
   * GeneralDateParser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser } 
   */
  function THGeneralDateParser(text, ref, opt){
    
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
  		text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[5].length);

  		var date = null;
  		if(text == 'วันนี้')
  			date = moment(ref).clone();
  		else if(text == 'พรุ่งนี้')
  			date = moment(ref).clone().add('d',1);
  		else if(text == 'เมื่อวาน')
  			date = moment(ref).clone().add('d',-1);
      else if(text == 'เมื่อคืน')
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

      if(text.match('คืน')){
        
        if(!resultWithTime){ // Midnight
          
          result.start.day = date.date() + 1;
          result.start.hour = 0;
          result.start.minute = 0;
          result.start.second = 0;
          result = new chrono.ParseResult(result);
          
        }else if(resultWithTime.start.hour < 12){ //Today's 0am - 12am
          
          date.add('d',1);
          result.start.day = date.date()
          result.start.month = date.month()
          result.start.year = date.year()
          result = new chrono.ParseResult(result);
        }
      }
      
      return result;
    };
    
  	return parser;
  }
  
  chrono.parsers.THGeneralDateParser = THGeneralDateParser;
})();

