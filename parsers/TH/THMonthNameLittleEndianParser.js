/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  	var regFullPattern  = /([0-9]{1,2})(\s*(ถึง|\-)?\s*([0-9]{1,2}))?\s+(มกราคม|ม.ค.|กุมภาพัน|ก.พ.|มีนาคม|มี.ค.|เมษายน|เม.ย.|พฤษภาคม|พ.ค.|มิถุนายน|ม.ย.|มิ.ย.|กรกฎาคม|ก.ค.|สิงหาคม|ส.ค.|กันยายน|ก.ย.|ตุลาคม|ต.ค.|พฤศจิกายน|พ.ย.|ธันวาคม|ธ.ค.)(พ.ศ.|ค.ศ.)?(\s+[0-9]{2,4})(\W|$)/i;
  	var regShortPattern = /([0-9]{1,2})(\s*(ถึง|\-)?\s*([0-9]{1,2}))?\s+(มกราคม|ม.ค.|กุมภาพัน|ก.พ.|มีนาคม|มี.ค.|เมษายน|เม.ย.|พฤษภาคม|พ.ค.|มิถุนายน|ม.ย.|มิ.ย.|กรกฏาคม|ก.ค.|สิงหาคม|ส.ค.|กันยายน|ก.ย.|ตุลาคม|ต.ค.|พฤศจิกายน|พ.ย.|ธันวาคม|ธ.ค.)(\W|$)/i;

  	var momthTranslation = {
  	  'มกราคม':0,'ม.ค.':0,
  		'กุมภาพัน':1,'ก.พ.':1,
  		'มีนาคม':2,'มี.ค.':2,
  		'เมษายน':3,'เม.ย.':4,
  		'พฤษภาคม':4,'พ.ค.':4,
  		'มิถุนายน':5,'มิ.ย.':5,
  		'กรกฎาคม':6,'ก.ค.':6,
  		'สิงหาคม':7,'ส.ค.':7,
  		'กันยายน':8,'ก.ย.':8,
  		'ตุลาคม':9,'ต.ค.':9,
  		'พฤศจิกายน':10,'พ.ย.':10,
  		'ธันวาคม':11,'ธ.ค.':11
    };
  		
  function THMonthNameLittleEndianParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    
    //Inherit Thai-Laguange support from THGeneralDateParser
    var parser = chrono.parsers.THGeneralDateParser(text, ref, opt);
    
    parser.pattern = function() { return regShortPattern; }
    
    parser.extract = function(text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var date = null;
      text = text.substr(index);
      originalText = text;
      
      var matchedTokens = text.match(regFullPattern);
      if(matchedTokens &&  text.indexOf(matchedTokens[0]) == 0){
        //Full Pattern with years
        text = matchedTokens[0];
        text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[8].length);
        originalText = text;
        
        var years = matchedTokens[7];
        years = parseInt(years);
        
        if(matchedTokens[3] && matchedTokens[3] == 'ค.ศ.'){
          
          //Read year as AD
          //AD 2001,2002, ...., 2030
          if(years <= 30 )
            years = years + 2000;
            
          //AD 1931,1932, ...., 1999
          else if(years < 100)
            years = years + 1900;
    			
        }else{
          if(years < 543)
            years = years + 2500;
    			years = years - 543;
        }
        
        var months = momthTranslation[matchedTokens[5]];
        if(typeof months != 'number') return null;
        
        var days = matchedTokens[1];
        days = parseInt(days);
        
        var formatedText = years+'-'+(months+1)+'-'+days;
        
        //Impossible Date or Invalid Date
        var date = moment(formatedText, 'YYYY-MM-DD');
    		if(date.format('YYYY-M-D') != formatedText){
    		  return null;
    		}
			}
			else{
			  
			  matchedTokens = text.match(regShortPattern);
			  if(!matchedTokens) return null;
			  
			  //Short Pattern (without years)
			  var text = matchedTokens[0];
  			text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[6].length);
  			originalText = text;
  			
  			
  			var months = momthTranslation[matchedTokens[5]];
        if(typeof months != 'number') return null;
        
        var days = matchedTokens[1];
        days = parseInt(days);
        
        var formatedText = (months+1)+'-'+days;
        
        //Impossible Date or Invalid Date
        var date = moment(formatedText, 'MM-DD');
    		if(date.format('M-D') != formatedText){
    		  return null;
    		}
  			
  			//Find the year that provide the closest date to the referenceDate  
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
			
			// Text text can be 'range' value. Such as '12 - 13 มีนาคม 2532'
			if(matchedTokens[4]){
			  var endDay = parseInt(matchedTokens[4]);
			  var startDay = parseInt(matchedTokens[1]);
			  var endDate = date.clone();
			  
			  date.date(startDay);
			  endDate.date(endDay);
			  
			  //Check leap day or impossible date
        if(date.format('D') != matchedTokens[1]) return null;
        if(endDate.format('D') != matchedTokens[4]) return null;
        
        return new chrono.ParseResult({
          referenceDate:ref,
          text:originalText,
          index:index,
          start:{
            day:date.date(),
            month:date.month(),
            year:date.year()
          },
          end:{
            day:endDate.date(),
            month:endDate.month(),
            year:endDate.year()
          }
        });
			}
			
			
			return new chrono.ParseResult({
        referenceDate:ref,
        text:originalText,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year()
        }
      });
    };
    
  	return parser;
  }
  
  chrono.parsers.THMonthNameLittleEndianParser = THMonthNameLittleEndianParser;
})();

