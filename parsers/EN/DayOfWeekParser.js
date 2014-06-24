/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(\W|^)((\,|\(|\（)\s*)?((this|last|next)\s*)?(Sunday|Sun|Monday|Mon|Tuesday|Tues|Tue|Wednesday|Wed|Thursday|Thurs|Thur|Friday|Fri|Saturday|Sat)(\s*(\,|\)|\）))?(\W|$)/i;
  
  var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tues':2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thurs':4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
  
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
      index = index + matchedTokens[1].length;
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[9].length - matchedTokens[1].length);
      
      var prefix = matchedTokens[5];
      var dayOfWeek = matchedTokens[6];
      
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
        var ref_offset = date.day();

        if(offset > ref_offset)
          date.day(offset);
        else
          date.day(offset+7);
      }
      
      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          dayOfWeek: offset,
          impliedComponents: ['day','month','year'],
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.DayOfWeekParser = DayOfWeekParser;
})();

