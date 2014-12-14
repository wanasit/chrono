Chrono
======

A natural language date parser in Javascript, designed for extracting date information from any given text. 

Chrono supports most date and time formats, such as :

* Today, Tomorrow, Yesterday, Last Friday, etc
* 17 August 2013 - 19 August 2013
* This Friday from 13:00 - 16.00
* 5 days ago
* Sat Aug 17 2013 18:40:39 GMT+0900 (JST)
* 2014-11-30T08:15:30-05:30

#### Node.js 

    npm install chrono-node

#### Browser

    <script src="https://rawgithub.com/wanasit/chrono/master/chrono.min.js"></script>

#### Browserify

Chrono's modules are linked and packaged using [Browserify](http://browserify.org) on `src/chrono.js`. By default, `chrono.js` file exports `chrono` object as a window global.

```
browserify src/chrono.js --s chrono -o chrono.js
```

## USAGE

Simply pass a string to function `chrono.parseDate` or `chrono.parse`. 

```javascript
> var chrono = require('chrono-node')

> chrono.parseDate('An appointment on Sep 12-13') 
Fri Sep 12 2014 12:00:00 GMT-0500 (CDT)
    
> chrono.parse('An appointment on Sep 12-13');
[ { index: 18,
    text: 'Sep 12-13',
    tags: { ENMonthNameMiddleEndianParser: true },
    start: 
     { knownValues: [Object],
       impliedValues: [Object] },
    end: 
     { knownValues: [Object],
       impliedValues: [Object] } } ]
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

### Detailed Parsed Results

The function `chrono.parse` returns detailed parsing results as objects of class `chrono.ParsedResult`. 

```javascript
var results = chrono.parse('I have an appointment tomorrow from 10 to 11 AM')

results[0].index  // 15
results[0].text   // 'tomorrow from 10 to 11 AM'
results[0].ref    // Sat Dec 13 2014 21:50:14 GMT-0600 (CST)

results[0].start.date()  // Sun Dec 14 2014 10:00:00 GMT-0600 (CST)
results[0].end.date()    // Sun Dec 14 2014 11:00:00 GMT-0600 (CST)
```

#### ParsedResult

* `start` The parsed date components as a [ParsedComponents](#parsedcomponents) object
* `end`   Similar to `start` but can be null.
* `index` The location within the input text of this result  
* `text`  The text this result that appears in the input 
* `ref`   The [reference date](#reference-date) of this result

#### ParsedComponents

A group of found date and time components (year, month, hour, etc). ParsedComponents objects consist of `knownValues` and `impliedValues`.

* `assign(component, value)`  Set known value to the component
* `imply(component, value)`   Set implied value to the component
* `get(component)`            Get known or implied value for the component
* `isCertain(component)`      return true if the value of the component is known.
* `date()`                    Create a javascript Date

## Extend Chrono



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






