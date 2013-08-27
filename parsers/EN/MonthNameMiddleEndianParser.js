/*
  
  The parser for parsing US's date format that begin with month's name.
  
  EX. 
    - January 13
    - January 13, 2012
    - January 13 - 15, 2012
    - Tuesday, January 13, 2012
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
  
  var regFullPattern  = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?(,)?(\s*[0-9]{4})(\s*BE)?(\W|$)/i;
  var regShortPattern = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?([^0-9]|$)/i;
  

  function MonthNameMiddleEndianParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return regShortPattern; }
    
    parser.extract = function(text,index){ 
      
      var impliedComponents = [];
      var date = null;
      var dayOfWeek = null;
      var originalText = '';
      text = text.substr(index);
      
      
      var matchedTokens = text.match(regFullPattern);
      if(matchedTokens && text.indexOf(matchedTokens[0]) == 0){
        
        var text = matchedTokens[0];
        text = text.substring(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[14].length);
  			index = index + matchedTokens[1].length;
        originalText = text;
        
        text = text.replace(matchedTokens[2], '');
        text = text.replace(matchedTokens[4], matchedTokens[4]+' ');
  			if(matchedTokens[5]) text = text.replace(matchedTokens[5],'');
  			if(matchedTokens[10]) text = text.replace(matchedTokens[10],'');
  			if(matchedTokens[11]) text = text.replace(',',' ');
  			if(matchedTokens[13]){
  				var years = matchedTokens[12];
  				years = ' ' + (parseInt(years) - 543);
  				text = text.replace(matchedTokens[13], '');
  				text = text.replace(matchedTokens[12], years);
  			}
        
        text = text.replace(matchedTokens[9],parseInt(matchedTokens[9])+'');
  			date  = moment(text,'MMMM DD YYYY');
        if(!date) return null;
			}
			else{
			  
			  matchedTokens = text.match(regShortPattern);
			  if(!matchedTokens) return null;
			  
			  //Short Pattern (without years)
        var text = matchedTokens[0];
  			text = text.substring(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[11].length);
  			index = index + matchedTokens[1].length;
        originalText = text;

  			text = text.replace(matchedTokens[2], '');
  			text = text.replace(matchedTokens[4], matchedTokens[4]+' ');
  			if(matchedTokens[4]) text = text.replace(matchedTokens[5],'');
  			
  			date = moment(text,'MMMM DD');
  			if(!date) return null;
  			
  			//Find the most appropriated year
  			impliedComponents.push('year')
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
			
			//Day of week
			
      if(matchedTokens[3]) dayOfWeek =  DAYS_OFFSET[matchedTokens[3].toLowerCase()]
      
      if(matchedTokens[5]){
        
        var endDay = parseInt(matchedTokens[9]);
        var startDay = parseInt(matchedTokens[6]);
        var endDate = date.clone();
        
        date.date(startDay);
        endDate.date(endDay);
        
        //Check leap day or impossible date
        if(date.format('D') != matchedTokens[6]) return null;
        if(endDate.format('D') != matchedTokens[9]) return null;
        
        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year(),
            dayOfWeek:dayOfWeek,
            impliedComponents: impliedComponents
          },
          end:{
            day:endDate.date(),
            month:endDate.month(),
            year:endDate.year(),
            impliedComponents: impliedComponents
          }
        });
        
			}else{
        
        if(date.format('D') != parseInt(matchedTokens[9]) + '') return null;

        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year(),
            dayOfWeek:dayOfWeek,
            impliedComponents: impliedComponents
          }
        });
      }
    };
    
    
    
    
    //Override for day of the week suffix - MM dd (Thuesday) 
    var baseExtractTime = parser.extractTime;
		parser.extractTime = function(text, result){
      
      var DAY_OF_WEEK_SUFFIX_PATTERN = /(\,|\(|\s)*(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)(\,|\)|\s)*/i;
      
      if(text.length <= result.index + result.text.length) return null;
      
      var suffix_text = text.substr(result.index + result.text.length, 15);
      var matchedTokens = suffix_text.match(DAY_OF_WEEK_SUFFIX_PATTERN);
      if( matchedTokens && suffix_text.indexOf(matchedTokens[0]) == 0){
        result.text = result.text + matchedTokens[0];
        
        var dayOfWeek = DAYS_OFFSET[matchedTokens[2].toLowerCase()]
        result.start.dayOfWeek = dayOfWeek;
      }
      
      if(!result.start.impliedComponents || result.start.impliedComponents.indexOf('year') < 0)
        return baseExtractTime.call(this, text, result);
      
      //MM dd (Thuesday), YYYY
      var YEAR_SUFFIX_PATTERN = /(\s*[0-9]{4})(\s*BE)?/i;
      
      if(text.length <= result.index + result.text.length) return null;
      
      var suffix_text = text.substr(result.index + result.text.length, 15);
      var matchedTokens = suffix_text.match(YEAR_SUFFIX_PATTERN);
      if( matchedTokens && suffix_text.indexOf(matchedTokens[0]) == 0){
        
        var years = matchedTokens[1];
        years = parseInt(years);
        
        if(years < 100){ 
          if(years > 20) years = null; //01 - 20
          else years = years + 2000;
        }
        else if(matchedTokens[2]){ //BC
          years = years - 543;
        }
        
        var index = result.start.impliedComponents.indexOf('year');
        result.start.impliedComponents.splice(index, 1);
        result.start.year = years;
        
        result.text = result.text + matchedTokens[0];
      }
      
			return baseExtractTime.call(this, text, result);
    }
		
  	return parser;
  }
  
  chrono.parsers.MonthNameMiddleEndianParser = MonthNameMiddleEndianParser;
})();

