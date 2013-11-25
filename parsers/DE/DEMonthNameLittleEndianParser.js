/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var DAYS_OFFSET = {"sonntag":0,"montag":1,"dienstag":2,"mittwoch":3,"donnerstag":4,"freitag":5,"samstag":6
    ,"so":0,"mo":1,"di":2,"mi":3,"do":4,"fr":5,"sa":6}

  var MONTHS_OFFSET = {"januar":0,"februar":1,"märz":2,"april":3,"mai":4,"juni":5,"juli":6,"august":7
    ,"september":8,"oktober":9,"november":10,"dezember":11,"jan":0,"feb":1,"mrz":2
    ,"apr":3,"jun":5,"jul":6,"aug":7,"sep":8,"okt":9,"nov":10,"dez":11}

  var regPattern  = /(\W|^)((Sonntag|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|So|Mo|Di|Mi|Do|Fr|Sa)\s*,?\s*)?(den)?\s*([0-9]{1,2})(\.)?(\s*(to|\-|\s)\s*([0-9]{1,2})(\.)?)?\s*(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Jan|Feb|Mrz|Apr|Mai|Jun|Jul|Aug|Sep|Okt|Nov|Dez)((\s*[0-9]{2,4})(\s*BE)?)?(\W|$)/i;

  function DEMonthNameLittleEndianParser(text, ref, opt){
    
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
      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[15].length - matchedTokens[1].length);
      
      index = index + matchedTokens[1].length;

      var remainingText = remainingText.substr(matchedTokens[1].length + text.length);
      var originalText  = text;

      if(matchedTokens[6]) text = text.replace(matchedTokens[6],'');
      if(matchedTokens[7]) text = text.replace(matchedTokens[7],'');

      var years = null
      if(matchedTokens[12]){
        years = matchedTokens[13];
        years = parseInt(years);

        if(years < 100){ 

          //This should be TIME not YEAR
          if(remainingText.match(/\s*(:|am|pm)/i) != null){
            text = text.replace(matchedTokens[12], '');
            originalText = originalText.replace(matchedTokens[12], '');
            years = null;
          }else{
            if(years > 20) years = null; //01 - 20
            else years = years + 2000;
          }
        }
        else if(matchedTokens[14]){ //BC
          text = text.replace(matchedTokens[14], '');
          years = years - 543;
        }
      }

      var days   = parseInt(matchedTokens[5])
      var months = MONTHS_OFFSET[matchedTokens[11].toLowerCase()];

      if(years){
        date = moment([years, months, days]);
        if(!date) return null;
      }else{

        impliedComponents.push('year')

        date = moment([moment(ref).year(), months, days]);
        if(!date) return null;
        
        //Find the most appropriated year
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
      
      // Text text can be 'range' value. Such as '12. - 13. Januar 2012'
      if(matchedTokens[9]){
        var endDay   = parseInt(matchedTokens[9]);
        var startDay = parseInt(matchedTokens[5]);
        var endDate  = date.clone();
        
        date.date(startDay);
        endDate.date(endDay);
        
        //Check leap day or impossible date
        if(date.format('D') != matchedTokens[5]) return null;
        if(endDate.format('D') != matchedTokens[9]) return null;
        
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
        if(date.format('D') != matchedTokens[5]) return null;
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
    
  	return parser;
  }
  
  chrono.parsers.DEMonthNameLittleEndianParser = DEMonthNameLittleEndianParser;
})();

