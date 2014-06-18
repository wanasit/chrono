/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /((同|((平成)?([0-9０-９]{2,4})))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
  
  function cleanZengakuNumber(str){
		
		var cleanStr = str; 
		cleanStr = cleanStr.replace(/０/g,'0');
		cleanStr = cleanStr.replace(/１/g,'1');
		cleanStr = cleanStr.replace(/２/g,'2');
		cleanStr = cleanStr.replace(/３/g,'3');
		cleanStr = cleanStr.replace(/４/g,'4');
		cleanStr = cleanStr.replace(/５/g,'5');
		cleanStr = cleanStr.replace(/６/g,'6');
		cleanStr = cleanStr.replace(/７/g,'7');
		cleanStr = cleanStr.replace(/８/g,'8');
		cleanStr = cleanStr.replace(/９/g,'9');
		return cleanStr;
	}
  
  function JPStandardDateParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.parsers.JPGeneralDateParser(text, ref, opt);
		
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
  		var date = null;
  		text = matchedTokens[0];
  		
  		var months = matchedTokens[6];
  		months = cleanZengakuNumber(months);
  		months = parseInt(months);
      if(!months || months == NaN) return null;
      
  		var days = matchedTokens[7];
  		days = cleanZengakuNumber(days);
  		days = parseInt(days);
  		if(!days || days == NaN) return null;

  		var years = matchedTokens[5];
  		if(years){
  		  years = cleanZengakuNumber(years);
    		years = parseInt(years);
  		}
  		
  		if(years && years !== NaN){
				
				if(matchedTokens[4]=='平成'){
					years = years + 1989;
				}
				else if(years < 100){
					years = years + 2000;
				}
				
  			var dateText = years + '-'+months+'-'+days;
  			date = moment(dateText, 'YYYY-MM-DD');
				
  			if(date.format('YYYY-M-D') != dateText)
					return null;
  		}else{

  			var dateText = months+'-'+days;
  			date = moment(dateText, 'MM-DD');
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
    
    
    //Override for day of the week suffix - MM dd () 
    var baseExtractTime = parser.extractTime;
  	parser.extractTime = function(text, result){

      var DAY_OF_WEEK_SUFFIX_PATTERN = /(\,|\(|（|\s)*(月|火|水|木|金|土|日)(曜日|曜)?\s*(\,|）|\))/i;

      if(text.length <= result.index + result.text.length) return null;

      var suffix_text = text.substr(result.index + result.text.length);
      var matchedTokens = suffix_text.match(DAY_OF_WEEK_SUFFIX_PATTERN);
      if( matchedTokens && suffix_text.indexOf(matchedTokens[0]) == 0){
        result.text = result.text + matchedTokens[0];
      }

  		return baseExtractTime.call(this, text, result);
    }
    
    
  	return parser;
  }
  
  chrono.parsers.JPStandardDateParser = JPStandardDateParser;
})();

