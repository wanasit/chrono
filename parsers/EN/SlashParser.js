/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
  
  var PATTERN = /(\W|^)(Sun|Sunday|Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thur|Thursday|Fri|Friday|Sat|Saturday)?\s*\,?\s*([0-9]{1,2})[\/\.]([0-9]{1,2})([\/\.]([0-9]{4}|[0-9]{2}))?(\W|$)/i;
  
  function SlashParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var matchedTokens = text.substr(index).match(PATTERN);
  		if(matchedTokens == null) return;
  		if(matchedTokens[1] == '/' || matchedTokens[7] == '/') return;
  		
      var text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[7].length);
      var orginalText = text;
      
      if(text.match(/^\d.\d$/)) return;
      
      index += matchedTokens[1].length;
      
      // MM/dd -> OK
      // MM.dd -> NG
      if(!matchedTokens[6] && matchedTokens[0].indexOf('/') < 0) return;

      var date = null;
      var years = matchedTokens[6] || moment(ref).year() + '';
      var month = matchedTokens[3];
      var day   = matchedTokens[4];
      
      
      //Day of week
      var dayOfWeek = null;
      if(matchedTokens[2]) dayOfWeek =  DAYS_OFFSET[matchedTokens[2].toLowerCase()]
      
      month = parseInt(month);
      day = parseInt(day);
      years = parseInt(years);
      if(month < 1 || month > 12) return null;
      if(day < 1 || day > 31) return null;

      if(years < 100){
        if(years > 50){
          years = years + 2500 - 543; //BE
        }else{
          years = years + 2000; //AD
        }
      }
      
      text = month+'/'+day+'/'+years
      date = moment(text,'M/D/YYYY');
      if(!date || (date.date() != day)) {
        date = moment(text,'D/M/YYYY');
        if(!date || (date.date() != month)) return null;
      }
      
      return new chrono.ParseResult({
        referenceDate:ref,
        text:orginalText,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          dayOfWeek: dayOfWeek,
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.SlashParser = SlashParser;
})();

