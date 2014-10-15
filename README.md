Chrono
======

A natural language date parser in Javascript. It is designed to extract date information from any given text. 

Chrono supports a number of date and time formats, including :

* Today, Tomorrow, Yesterday, Last Friday, etc
* 10/13/2013
* This Friday from 13:00 - 16.00
* Saturday, 17 August 2013 - Monday, 19 August 2013
* Sat Aug 17 2013 18:40:39 GMT+0900 (JST)

### Node.js 

    npm install chrono-node

### Browser

    <script src="https://rawgithub.com/wanasit/chrono/master/chrono.min.js"></script>

## USAGE

Just pass a string to function `chrono.parseDate` or `chrono.parse`. 

```javascript
> var chrono = require('chrono-node')

> chrono.parseDate('An appointment on Sep 12-13') 
Thu Sep 12 2013 12:00:00 GMT+0900 (JST)
    
> chrono.parse('An appointment on Sep 12-13')    
[ { start: 
     { year: 2013,
       month: 8,
       day: 12,
       impliedComponents: [Object],
       isCertain: [Function],
       date: [Function] },
    startDate: Thu Sep 12 2013 12:00:00 GMT+0900 (JST),
    end: 
     { year: 2013,
       month: 8,
       day: 13,
       impliedComponents: [Object],
       isCertain: [Function],
       date: [Function] },
    endDate: Fri Sep 13 2013 12:00:00 GMT+0900 (JST),
    referenceDate: Sat Aug 17 2013 17:54:57 GMT+0900 (JST),
    index: 18,
    text: 'Sep 12-13',
    concordance: 'An appointment on Sep 12-13' } ]
```

### Reference Date

Today's "Friday" is different from last month's "Friday". 
The meaning of the referenced dates depends on when they are mentioned. 
Chrono lets you define a reference date using `chrono.parse(text, ref)` and `chrono.parseDate(text, ref)`.    

```javascript

> chrono.parseDate('Friday', new Date(2012,7,23)); 
Fri Aug 24 2012 12:00:00 GMT+0700 (ICT)

> chrono.parseDate('Friday', new Date(2012,7,1)); 
Fri Aug 03 2012 12:00:00 GMT+0700 (ICT)
```

### Text 

Chrono is designed to work with long text (notes, emails, articles, etc). 
`chrono.parse` will return an array of every date mentioned in the story.

```javascript
> var text = 'October 7, 2011, of which details were not revealed out of respect to Jobs\'s family.[239] Apple announced on the same day that they had no plans for a public service, but were encouraging "well-wishers" to send their remembrance messages to an email address created to receive such messages.[240] Sunday, October 16, 2011'
> chrono.parse(text)
[{ start: 
    { year: 2011,
      month: 9,
      day: 7,
      ....
 { start: 
    { year: 2011,
      month: 9,
      day: 16,
      ....
```

### Parsing Result 

Chrono provides very detailed parsing results as objects of class `chrono.ParseResult`.

* `start (chrono.DateComponents)` : The parsing result as a [DateComponents](#date-components) object
* `startDate (Date)` : The parsing result as a javascript Date object
* `end (chrono.DateComponents)` `endDate (Date)` : Similar to `start` and `startDate` (Optional)
* `index (int)`   : The location within the input text of this result  
* `text (string)` : The mentioned words within the input text of this result 
* `concordance (string)` : The context of mentioned words within the input text (up to 30 characters)
* `referenceDate (Date)` : The [reference date](#reference-date) of this result

#### Date Components

* `year`,`month`,`day`, `dayOfWeek`, `hour`, `minute`, `second` : The datected components
* `impliedComponents (array)` : The components that are not explicitly mentioned 
* `date ( function )` : Return a javascript Date

## Customize Chrono

### Parser

Parser is a module for low-level parsing. Each parser is designed to handle a single specific date format.
In Chrono's parsing process, a number of parsers will be used togather to produce the results. 
You should define new type of parsers for supporting new date formats or languages.

Chrono creates parser objects by [factory method](http://javascript.info/tutorial/factory-constructor-pattern) pattern.
To add a new type of parser, declare a new factory function in `chrono.parsers`. 
Within that function:

* Create an object from `chrono.Parser()` 
* Override the object's `pattern` and `extract` methods 
* Return the object

```javascript
chrono.parsers.ChrismasParser = function(text, ref, opt) {
  
  // Create a chrono's base parser
  var parser = chrono.Parser(text, ref, opt); 
  
  // Extend the parser with our pattern
  parser.pattern = function () { return /Christmas/i } // Provide search pattern
  parser.extract = function(text, index) { 
    // Chrono will find all indexes of the text that match our pattern.
    // We need to check and return the result 
    var mentioned_text = text.substr(index).match(/Christmas/i)[0];
    return new chrono.ParseResult({
      referenceDate: ref,
      text: mentioned_text,
      index: index,
      start: {
        day: 25, month: 11, // It's 25 December
        year: ref.getFullYear() // But we aren't sure about the 'year' 
        impliedComponents: ['year'] 
      }
    });
  }

  return parser;
}

...

// Lets chrono merge and refine our result (See. '2.30 AM')
> chrono.parseDate("I'll arrive at 2.30AM on Christmas night")
Wed Dec 25 2013 02:30:00 GMT+0900 (JST)

```






