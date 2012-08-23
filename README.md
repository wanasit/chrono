Chrono
======

A natural language date parser in Javascript.


## INSTALLATION

### Node.js

    npm install chrono-node

### Browser

    <script src="https://raw.github.com/berryboy/chrono/master/chrono.min.js"></script>

## USAGE

### Basic

You can parse strings containing a natural language date using the `chrono.parseDate` or `chrono.parse` method.

    > var chrono = require('chrono-node');
    
    > chrono.parseDate('Today'); 
    Thu Aug 23 2012 12:00:00 GMT+0700 (ICT)
    
    > chrono.parse('Today'); 
    [ { start: 
         { year: 2012,
           month: 7,
           day: 23,
           hour: undefined,
           minute: undefined,
           second: undefined,
           date: [Function] },
        startDate: Thu Aug 23 2012 12:00:00 GMT+0700 (ICT),
        referenceDate: Thu Aug 23 2012 01:17:46 GMT+0700 (ICT),
        index: 0,
        text: 'Today',
        sentence: undefined } ]
        
### Reference Date

Today's "Friday" is difference from last month's "Friday". The meaning of mentioned dates are depended on when they were mentioned. Chrono let you define the reference date using `chrono.parse(text,ref)` and `chrono.parseDate(text,ref)`.    

    > chrono.parseDate('Friday', new Date(2012,7,23)); 
    Fri Aug 24 2012 12:00:00 GMT+0700 (ICT)
    
    > chrono.parseDate('Friday', new Date(2012,7,1)); 
    Fri Aug 03 2012 12:00:00 GMT+0700 (ICT)

### Text
        
Chrono is also designed to handle a long text. `chrono.parse` will return a array of every date mentioned in the input text. `chrono.parseDate` will return the first one.
  
    > var text = 'October 7, 2011, of which details were not revealed out of respect to Jobs\'s family.[239] Apple announced on the same day that they had no plans for a public service, but were encouraging "well-wishers" to send their remembrance messages to an email address created to receive such messages.[240] Sunday, October 16, 2011'
    
    > chrono.parse(text)
    [ { start: 
         { year: 2011,
           month: 9,
           day: 7,
           hour: undefined,
           minute: undefined,
           second: undefined,
           date: [Function] },
        startDate: Fri Oct 07 2011 12:00:00 GMT+0700 (ICT),
        referenceDate: Thu Aug 23 2012 01:48:37 GMT+0700 (ICT),
        index: 0,
        text: 'October 7, 2011',
        sentence: undefined },
      { start: 
         { year: 2011,
           month: 9,
           day: 16,
           hour: undefined,
           minute: undefined,
           second: undefined,
           date: [Function] },
        startDate: Sun Oct 16 2011 12:00:00 GMT+0700 (ICT),
        referenceDate: Thu Aug 23 2012 01:48:37 GMT+0700 (ICT),
        index: 297,
        text: 'Sunday, October 16, 2011',
        sentence: undefined } ]
    


## EXAMPLES

Chrono can parse a number of date and time formats. Following are examples of strings that can be parsed properly.

* yesterday
* today
* tomorrow
* thursday
* friday 13:00 
* friday 1pm - saturday 5am
* next tuesday
* last night
* last friday at 20:00
* tomorrow at 6:45pm
* 12/1/2012
* 12 - 13 Jan 2012
* 12 Jan - 13 Feb 2012
* Jan 12 - Feb 13
* 2012-3-12