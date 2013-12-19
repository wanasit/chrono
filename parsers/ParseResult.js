/* 
  DateCompoents {
    
    @attribute {Integer} year
    @attribute {Integer} month
    @attribute {Integer} day
    @attribute {Integer} hour
    @attribute {Integer} minute
    @attribute {Integer} second
    @attribute {Integer} timezoneOffset
    @attribute {String}  dayOfWeek
    @attribute {String}  meridiem
    
    @method {Date} date() 
    @method {void} assign(String, Value) 
    @method {void} imply(String, Value)
    
    @attribute { Array<String> } impliedComponents
  }
  
  ParseResult {
    
    @attribute {DateCompoents} start
    @attribute {Date} startDate
    
    @attribute {DateCompoents, Optional} end
    @attribute {Date, Optional} endDate
    
    
    @attribute { Date } referenceDate
    @attribute { Integer } index
    @attribute { String } text
    @attribute { String } sentence
    @attribute { Number, Optional} timezoneOffset 
  }
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function DateComponents(components) {
    this.year   = components.year;
    this.month  = components.month;
    this.day    = components.day;
    this.hour   = components.hour;
    this.minute = components.minute;
    this.second = components.second;
    this.timezoneOffset = components.timezoneOffset;
    this.dayOfWeek = components.dayOfWeek;
    
    if(components.meridiem)
      this.meridiem = components.meridiem.toLowerCase(); // am/pm
    
    if(components.impliedComponents && components.impliedComponents.length > 0){
      this.impliedComponents = components.impliedComponents
    }
    
    this.isCertain = function(component) {
      return (this[component] !== undefined && this[component] !== null) 
        && (this.impliedComponents ? this.impliedComponents.indexOf(component) < 0 : true);
    }
    
    this.date = function(timezoneOffset) { 
      
      if(timezoneOffset === undefined || timezoneOffset === null){
        timezoneOffset = this.timezoneOffset;
      }else{
        if(this.isCertain('timezoneOffset')) 
          timezoneOffset = this.timezoneOffset;
      }

      if(timezoneOffset === undefined || timezoneOffset === null)
        timezoneOffset = new Date().getTimezoneOffset()
      
      var dateMoment = moment(new Date(this.year,this.month,this.day));
      
      //If there is only date representation, move the represent time to 12 AM
      if(this.hour === undefined || this.hour === null) dateMoment.hours(12);
      else dateMoment.hours(this.hour);
      
      dateMoment.minutes(this.minute);
      dateMoment.seconds(this.second);

      dateMoment.add('minutes', timezoneOffset - new Date().getTimezoneOffset());
      //console.log(timezoneOffset)
      return dateMoment.toDate();
    }

    this.assign = function(component, value) {
      this[component] = value;
      if(this.impliedComponents && this.impliedComponents.indexOf(component) >= 0){
        var index = this.impliedComponents.indexOf(component);
        this.impliedComponents.splice(index, 1);
      }
    }

    this.imply = function(component, value) {
      this[component] = value;
      if(!this.impliedComponents) this.impliedComponents = [];
      if(this.impliedComponents.indexOf(component) < 0){
        this.impliedComponents.push(component);
      }
    }

    //Checking Value
    if(this.isCertain('hour') && this.hour > 12){
      this.assign('meridiem', 'pm'); 
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


