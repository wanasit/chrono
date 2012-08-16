/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var regFullPattern = /(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?(,)?(\s*[0-9]{4})(\s*BE)?/i;
  var regShortPattern = /(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})([^0-9]|$)/i;
  	
  function MonthNameMiddleEndianParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return regShortPattern; }
    
    parser.extract = function(text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var date = null;
      text = text.substr(index);
      originalText = text;
      
      var matchedTokens = text.match(regFullPattern);
      if(matchedTokens && text.indexOf(matchedTokens[0]) == 0){
        
        var text = matchedTokens[0];
        originalText = text;
        
  			text = text.replace(matchedTokens[1], matchedTokens[1]+' ');
  			if(matchedTokens[2]) text = text.replace(matchedTokens[2],'');
  			if(matchedTokens[7]) text = text.replace(matchedTokens[7],'');
  			if(matchedTokens[8]) text = text.replace(',','');
  			if(matchedTokens[10]){
  				var years = matchedTokens[9];
  				years = ' ' + (parseInt(years) - 543);
  				text = text.replace(matchedTokens[10], '');
  				text = text.replace(matchedTokens[9], years);
  			}

  			date  = moment(text,'MMMM DD YYYY');
        if(!date) return null;
			}
			else{
			  
			  matchedTokens = text.match(regShortPattern);
			  if(!matchedTokens) return null;
			  
			  //Short Pattern (without years)
  			text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[7].length);
  			originalText = text;
  			
  			text = text.replace(matchedTokens[1], matchedTokens[1]+' ');
  			if(matchedTokens[2]) text = text.replace(matchedTokens[2],'');
  			
  			date = moment(text,'MMMM DD');
  			if(!date) return null;
  			
  			//Find the most appropriated year
  			date.year(moment(ref).year());
  			var nextYear = date.clone().add('y',1);
  			var lastYear = date.clone().add('y',-1);
  			if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(date.diff(moment(ref))) ){	
  				date = nextYear;
  			}
  			else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(date.diff(moment(ref))) ){	
  				date = lastYear;
  			}
			}
			
			if(matchedTokens[2]){
			  
			  var endDay = parseInt(matchedTokens[6]);
			  var startDay = parseInt(matchedTokens[3]);
			  var endDate = date.clone();
			  
			  date.date(startDay);
			  endDate.date(endDay);
			  
			  //Check leap day or impossible date
        if(date.format('D') != matchedTokens[3]) return null;
        if(endDate.format('D') != matchedTokens[6]) return null;
        
        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year()
          },
          end:{
            day:endDate.date(),
            month:endDate.month(),
            year:endDate.year()
          }
        });
        
			}else{
			  
			  if(date.format('D') != matchedTokens[6]) return null;

        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year()
          }
        });
			}
    };
    
    //Check case.. MM dd - MM dd, YYYY
    var _checkOverlapResult = parser.checkOverlapResult;
    parser.checkOverlapResult = function(text, result1, result2){
    
      var result = _checkOverlapResult(text, result1, result2);
      if(result){
    
        if(result1.text.match(regFullPattern) && !result2.text.match(regFullPattern)){
          result2.start.year = result1.start.year;
          result2 = new chrono.ParseResult(result2);
        }
    
        if(result2.text.match(regFullPattern) && !result1.text.match(regFullPattern)){
          result1.start.year = result2.start.year;
          result1 = new chrono.ParseResult(result1);
        }
    
        result = _checkOverlapResult(text, result1, result2);
      }
    
      return result;
    }
    
  	return parser;
  }
  
  chrono.parsers.MonthNameMiddleEndianParser = MonthNameMiddleEndianParser;
})();

