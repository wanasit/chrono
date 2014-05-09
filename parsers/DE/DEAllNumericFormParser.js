/*


*/

(function () {

  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';

  var PATTERN = /([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{4}|[0-9]{2})(\W|$)/i;

  /**
   * InternationalStandartParser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser }
   */
  function DEAllNumericFormParser(text, ref, opt){

    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);

    parser.pattern = function() { return PATTERN; }

    parser.extract = function(text,index){

      var matchedTokens = text.substr(index).match(PATTERN);
  		if(matchedTokens == null){
  			finished = true;
  			return;
  		}

  		var text = matchedTokens[0];
  		text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[4].length);

      var days    = parseInt(matchedTokens[1]);
      var months  = parseInt(matchedTokens[2]) - 1; //JS month
      var years   = parseInt(matchedTokens[3]);

      if(years < 100){
        if(years > 50) years = years + 1900; //01 - 20
        else years = years + 2000;
      }

      var date = moment([years, months, days]);

      //Hit some impossible date or invalid date
  		if(date.date() != days || date.month() != months || date.year() != years){
  		  return null;
  		}

      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          dayOfWeek:date.day()
        }
      })
    };

  	return parser;
  }

  chrono.parsers.DEAllNumericFormParser = DEAllNumericFormParser;
})();
