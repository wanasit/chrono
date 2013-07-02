/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var regFullPattern = /((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?([0-9]{1,2})(st|nd|rd|th)?(\s*(to|\-)?\s*([0-9]{1,2})(st|nd|rd|th)?)?\s*(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)(\s*[0-9]{2,4})(\s*BE)?(\W|$)/i;
  var regShortPattern = /((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?([0-9]{1,2})(st|nd|rd|th)?(\s*(to|\-)?\s*([0-9]{1,2})(st|nd|rd|th)?)?\s*(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)(\W|$)/i;  

  function MonthNameLittleEndianParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return regShortPattern; }
    
    parser.extract = function(text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){ if( index < lastResult.index + lastResult.text.length ) return null; }
      
      var impliedComponents = [];
      var date = null;
      text = text.substr(index);
      originalText = text;
      
      var matchedTokens = text.match(regFullPattern);
      if(matchedTokens &&  text.indexOf(matchedTokens[0]) == 0){
        //Full Pattern with years
        text = matchedTokens[0];
        text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[12].length);
        originalText = text;
        if(matchedTokens[4]) text = text.replace(matchedTokens[4],'');
        if(matchedTokens[5]) text = text.replace(matchedTokens[5],'');
        
        var years = matchedTokens[10];
        years = parseInt(years);
        if(years < 100){ 
          if(years > 20) years = null; //01 - 20
          else years = years + 2000;
        }
        else if(matchedTokens[11]){ //BC
          text = text.replace(matchedTokens[11], '');
          years = years - 543;
        }
        
        //
        text = text.replace(matchedTokens[10], ' ' + years);
        date = moment(text,'DD MMMM YYYY');
        if(!date) return null;
    }else{
    
      matchedTokens = text.match(regShortPattern);
      if(!matchedTokens) return null;
    
      //Short Pattern (without years)
      var text = matchedTokens[0];
      text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[10].length);
      originalText = text;
      if(matchedTokens[4]) text = text.replace(matchedTokens[4],'');
      if(matchedTokens[5]) text = text.replace(matchedTokens[5],'');
      
      date  = moment(text,'DD MMMM');
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
    // Text text can be 'range' value. Such as '12 - 13 January 2012'
    if(matchedTokens[7]){
      var endDay = parseInt(matchedTokens[7]);
      var startDay = parseInt(matchedTokens[3]);
      var endDate = date.clone();
      
      date.date(startDay);
      endDate.date(endDay);
      
      //Check leap day or impossible date
      if(date.format('D') != matchedTokens[3]) return null;
      if(endDate.format('D') != matchedTokens[7]) return null;
      
      return new chrono.ParseResult({
        referenceDate:ref,
        text:originalText,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          impliedComponents: impliedComponents
        },
        end:{
          day:endDate.date(),
          month:endDate.month(),
          year:endDate.year(),
          impliedComponents: impliedComponents
        }
      });
    }
    else{
      //Check leap day or impossible date
      if(date.format('D') != matchedTokens[3]) return null;
    
      return new chrono.ParseResult({
        referenceDate:ref,
        text:originalText,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          impliedComponents: impliedComponents
        }
      });
  	}
  };
  
  //Override for day of the week suffix - MM dd (Thuesday) 
  var baseExtractTime = parser.extractTime;
  parser.extractTime = function(text, result){
    
      var DAY_OF_WEEK_SUFFIX_PATTERN = /(\,|\(|\s)*(Sun|Sunday|Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thur|Thursday|Fri|Friday|Sat|Saturday)(\,|\)|\s)*/i;
      
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
  
  chrono.parsers.MonthNameLittleEndianParser = MonthNameLittleEndianParser;
})();

