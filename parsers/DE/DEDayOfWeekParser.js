/*


*/

(function () {

  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';

  var PATTERN = /(\W|^)((\,|\(|\（)\s*)?((diese[rn]?|letzte[rn]?|nächste[rn]?)\s*)?(Sonntag|So|Montag|Mo|Dienstag|Di|Mittwoch|Mi|Donnerstag|Do|Freitag|Fr|Samstag|Sonnabend|Sa)(\s*(\,|\)|\）))?(\W|$)/i;

  var DAYS_OFFSET = { 'sonntag': 0, 'so': 0, 'montag': 1, 'mo': 1,'dienstag': 2, 'di': 2,
    'mittwoch': 3, 'mi': 3, 'donnerstag': 4, 'do':4, 'freitag': 5, 'fr': 5,'samstag': 6,
    'sonnabend': 6, 'sa': 6 }

  var startsWith = function(string, testPrefix) {
    return string.lastIndexOf(testPrefix, 0) === 0;
  };

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
      index = index + matchedTokens[1].length;
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[9].length - matchedTokens[1].length);

      var prefix = matchedTokens[5];
      var dayOfWeek = matchedTokens[6];
      if (dayOfWeek == 'do') return null;

      dayOfWeek = dayOfWeek.toLowerCase();
      var offset = DAYS_OFFSET[dayOfWeek];

      if(offset === undefined) return null;

      var date = moment(ref).clone();

      if(prefix){
        prefix = prefix.toLowerCase();

        if(startsWith(prefix, 'letzte'))
          date.day(offset - 7)
        else if(startsWith(prefix, 'nächste'))
          date.day(offset + 7)
        else if(startsWith(prefix, 'diese')) {
          date.day(offset);
        }
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

  chrono.parsers.DEDayOfWeekParser = DayOfWeekParser;
})();
