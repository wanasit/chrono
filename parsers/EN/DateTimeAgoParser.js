/*


*/
(function () {

  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';


  function DateTimeAgoParser(text, ref, opt){

    var PATTERN = /(\W|^)([0-9]+)\s*(minutes?|hours?|days?)\s*ago(?=(?:\W|$))/i;
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);

    parser.pattern = function() { return PATTERN; }

    parser.extract = function(text,index){

      var matchedTokens = text.substr(index).match(PATTERN);
      if(text.substr(index-1).search(PATTERN) == 0) return; //Replicate
      if(matchedTokens == null){
        finished = true;
        return;
      }

      var text = matchedTokens[0];
      text  = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[1].length);
      index = index + matchedTokens[1].length;

      var num = matchedTokens[2];
      num = parseInt(num);

      var date = moment(ref);
      if (matchedTokens[3].match(/day/)) {

        impliedComponents = []
        date.add('d',-num);

        return new chrono.ParseResult({
          referenceDate:ref,
          text:text,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year(),
          }
        })
      }


      if (matchedTokens[3].match(/hour/)) {

        date.add('h',-num);

      } else if (matchedTokens[3].match(/minute/)) {

        date.add('m',-num);
      }

      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          hour:date.hour(),
          minute: date.minute(),
          impliedComponents: ['day', 'month', 'year'],
        }
      })
    };

    return parser;
  }

  chrono.parsers.DateTimeAgoParser = DateTimeAgoParser;

})();
