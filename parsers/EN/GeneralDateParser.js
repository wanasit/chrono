/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(today|tonight|tomorrow|yesterday|last\s*night|([0-9]+)\s*day(s)\s*ago|([0-9]{1,2})(\.|\:|\：)([0-9]{2})|([0-9]{1,2}\s*\W?\s*)?([0-9]{1,2})\s*(AM|PM)|at\s*([0-9]{1,2}|noon|midnight)|(noon|midnight))(\W|$)/i;
  
  function GeneralDateParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(full_text,index){ 
      
      var matchedTokens = full_text.substr(index).match(PATTERN);
      if(matchedTokens == null){
        finished = true;
        return;
      }
      
      var impliedComponents = null;
      var text = matchedTokens[0].toLowerCase();
      text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[12].length);
      
      var ref_moment = moment(ref);
      if(opt.timezoneOffset !== undefined) 
        ref_moment = ref_moment.zone(opt.timezoneOffset)

      var date = null;
      var lowercase_text = text.toLowerCase();
      if(lowercase_text == 'today' || lowercase_text == 'tonight'){
        date = ref_moment.clone();
      }
      else if(lowercase_text == 'tomorrow'){
        if(ref_moment.hour() < 4) date = ref_moment.clone().hour(6);
        else date = ref_moment.clone().add('d',1);
      }
      else if(lowercase_text == 'yesterday')
        date = ref_moment.clone().add('d',-1);
      else if(lowercase_text.match('last'))
        date = ref_moment.clone().add('d',-1);
      else if(lowercase_text.match('ago')){
        var days_ago = matchedTokens[2];
        days_ago = parseInt(days_ago);
        date = ref_moment.clone().add('d',-days_ago);
      }else{
        if(full_text.charAt(index-1).match(/\d/)) return null;
        if(full_text.match(/\d+(\.\d+)%/)) return null;
        
        while(full_text.charAt(index) == ' ') index++;
        
        impliedComponents = ['year', 'month', 'day'];
        date = ref_moment.clone();
        text = '';
      }
       
      var result = new chrono.ParseResult({
        referenceDate:ref_moment.toDate(),
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          impliedComponents: impliedComponents,
        }
      })
      

      var resultWithTime = parser.extractTime(full_text,result);
      result = resultWithTime || result;

      if(result.text.replace(/\s/g,'').length == 0) return null; 
      if(lowercase_text.match('night')){
        
        if(!resultWithTime){ // Midnight
          
          result.start.day = date.date() + 1;
          result.start.hour = 0;
          result.start.minute = 0;
          result.start.second = 0;
          result.start.impliedComponents = ['hour','minute','second'];
          result = new chrono.ParseResult(result);
          
        }else if(resultWithTime.start.hour < 6){ //Today's 0am - 12am
          
          date.add('d',1);
          result.start.day = date.date()
          result.start.month = date.month()
          result.start.year = date.year()
          result = new chrono.ParseResult(result);
          
        }else if(resultWithTime.start.hour < 12 && !resultWithTime.start.meridiem){ //Today's 0am - 12am
          
          result.start.hour = resultWithTime.start.hour + 12;
          result.start.meridiem = 'pm';
          result.start.impliedComponents = result.start.impliedComponents || [];
          result.start.impliedComponents.push('meridiem')
          result = new chrono.ParseResult(result);
        }
      }
      
      return result;
    };
    
  	return parser;
  }
  
  chrono.parsers.GeneralDateParser = GeneralDateParser;
})();

