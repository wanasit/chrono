/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
  
  var regPattern  = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?([0-9]{1,2})(st|nd|rd|th)?(\s*(to|\-|\s)\s*([0-9]{1,2})(st|nd|rd|th)?)?\s*(?:of)?\s*(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)((\s*[0-9]{2,4})(\s*BE)?)?(\W|$)/i;

  function MonthNameLittleEndianParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return regPattern; }
    
    parser.extract = function(text,index){ 
      
      var impliedComponents = [];
      var date = null;
      var dayOfWeek = null;
      
      text = text.substr(index);
      var originalText = text;
      var remainingText = text;
      
      var matchedTokens = text.match(regPattern);
      text = matchedTokens[0];
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[14].length - matchedTokens[1].length);
      index = index + matchedTokens[1].length;

      var remainingText = remainingText.substr(matchedTokens[1].length + text.length);
      var originalText = text;

      if(matchedTokens[5]) text = text.replace(matchedTokens[5],'');
      if(matchedTokens[6]) text = text.replace(matchedTokens[6],'');

      var years = null
      if(matchedTokens[11]){
        years = matchedTokens[12];
        years = parseInt(years);

        if(years < 100){ 

          //This should be TIME not YEAR
          if(remainingText.match(/\s*(:|am|pm)/i) != null){
            text = text.replace(matchedTokens[11], '');
            originalText = originalText.replace(matchedTokens[11], '');
            years = null;
          }else{
            if(years > 20) years = null; //01 - 20
            else years = years + 2000;
          }
        }
        else if(matchedTokens[13]){ //BC
          text = text.replace(matchedTokens[13], '');
          years = years - 543;
        }
      }

      if(years){
        text = matchedTokens[4] + ' ' + matchedTokens[10] + ' ' + years;
        date = moment(text,'DD MMMM YYYY');
        if(!date) return null;
      }else{
        text  = matchedTokens[4] + ' ' + matchedTokens[10];
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
      
      //Day of week
      if(matchedTokens[3]) dayOfWeek =  DAYS_OFFSET[matchedTokens[3].toLowerCase()]
      
      // Text text can be 'range' value. Such as '12 - 13 January 2012'
      if(matchedTokens[8]){
        var endDay = parseInt(matchedTokens[8]);
        var startDay = parseInt(matchedTokens[4]);
        var endDate = date.clone();
        
        date.date(startDay);
        endDate.date(endDay);
        
        //Check leap day or impossible date
        if(date.format('D') != matchedTokens[4]) return null;
        if(endDate.format('D') != matchedTokens[8]) return null;
        
        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year(),
            dayOfWeek: dayOfWeek,
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
        if(date.format('D') != matchedTokens[4]) return null;
        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year(),
            dayOfWeek: dayOfWeek,
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

