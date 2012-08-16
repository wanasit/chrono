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
  
  function DateComponents(components, referenceDate) {
    this.year = components.year;
    this.month = components.month;
    this.day = components.day;
    this.hour = components.hour;
    this.minute = components.minute;
    this.second = components.second;
    this.referenceDate = referenceDate || new Date();
    
    this.date = function() { 
      var dateMoment = moment();
      var refMoment = moment(referenceDate);
      dateMoment.year(typeof this.year != 'number' ? refMoment.year() : this.year);
      dateMoment.month(typeof this.month != 'number' ? refMoment.month() : this.month);
      dateMoment.date(typeof this.day != 'number' ? refMoment.day() : this.day);
      dateMoment.hours(typeof this.hour != 'number' ? refMoment.hours() : this.hour);
      dateMoment.minutes(typeof this.minute != 'number' ? refMoment.minutes() : this.minute);
      dateMoment.seconds(typeof this.second != 'number' ? refMoment.seconds() : this.second);
      return dateMoment.toDate();
    }
  }
  
  function ParseResult(result){
    
    this.start = new DateComponents(result.start, result.referenceDate)
    this.startDate = this.start.date();
    
    if(result.end){
      
      this.end = new DateComponents(result.end, result.referenceDate)
      this.endDate = this.end.date();
    }
    
    this.index = result.index;
    this.text = result.text;
    this.sentence = result.sentence;
    
    if(result.timezoneOffset){
     this.timezoneOffset = result.timezoneOffset;
    }
    
  }
  
  chrono.DateComponents = DateComponents;
  chrono.ParseResult = ParseResult;
})()


