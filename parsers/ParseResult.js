/*
  Parser, is base object of every chrono parser. The parser must provides these following method  
  
  DateCompoents {
    
    @attrbuite {Integer} year
    @attrbuite {Integer} month
    @attrbuite {Integer} day
		@attrbuite {Integer} hour
		@attrbuite {Integer} minute
		@attrbuite {Integer} second
		
		@method { Date } date 
  }
  
  ParseResult {
    
    @attrbuite {DateCompoents} start
    @attrbuite {Date} startDate
    
    @attrbuite {DateCompoents, Optional} end
    @attrbuite {Date, Optional} endDate
  
    @attrbuite { Date } referenceDate
    @attrbuite { Integer } index
    @attrbuite { String } text
    @attrbuite { String } sentence
    @attrbuite { Number, Optional} timezoneOffset 
  }
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function DateComponents(components) {
    this.year = components.year;
    this.month = components.month;
    this.day = components.day;
    this.hour = components.hour;
    this.minute = components.minute;
    this.second = components.second;
    
    this.date = function() { 
      var dateMoment = moment(new Date(this.year,this.month,this.day));
      //dateMoment.year(this.year);
      //dateMoment.month(this.month);
      //dateMoment.date(this.day);
      dateMoment.hours(this.hour);
      dateMoment.minutes(this.minute);
      dateMoment.seconds(this.second);
      return dateMoment.toDate();
    }
  }
  
  function ParseResult(result){
    
    this.start = new DateComponents(result.start)
    this.startDate = this.start.date();
    
    if(result.end){
      
      this.end = new DateComponents(result.end)
      this.endDate = this.end.date();
    }
    
    
    this.referenceDate = result.referenceDate;
    this.index = result.index;
    this.text = result.text;
    this.concordance = result.concordance;
    
    if(result.timezoneOffset){
     this.timezoneOffset = result.timezoneOffset;
    }
    
  }
  
  chrono.DateComponents = DateComponents;
  chrono.ParseResult = ParseResult;
})();


