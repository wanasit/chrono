Chrono
======
A natural language date parser in Javascript, designed for extracting date information from any given text. (Java version is also available [here](https://github.com/wanasit/chrono-java))

[![Build Status](https://travis-ci.org/wanasit/chrono.svg?branch=master)](https://travis-ci.org/wanasit/chrono)
[![Coverage Status](https://img.shields.io/coveralls/wanasit/chrono.svg)](https://coveralls.io/r/wanasit/chrono?branch=master)

Chrono supports most date and time formats, such as :

* Today, Tomorrow, Yesterday, Last Friday, etc
* 17 August 2013 - 19 August 2013
* This Friday from 13:00 - 16.00
* 5 days ago
* Sat Aug 17 2013 18:40:39 GMT+0900 (JST)
* 2014-11-30T08:15:30-05:30

## Install

#### npm (recommended)

Just run:

    $ npm i --save chrono-node
    
And start using chrono:

    var chrono = require('chrono-node')
    chrono.parseDate('An appointment on Sep 12-13') 

#### Bower

Prefer bower? You can do that, too:

Just run:

    $ bower install chrono
  
And use:
   
```html
    <script src="bower_components/chrono/chrono.min.js"></script>
    <script>chrono.parseDate('An appointment on Sep 12-13')</script>
```
    

#### Other Options:

Doing something else? No worries. Try these:

Platform | Installation
---------|----
CDN      | Via [jsDelivr]:<br> `<script src="https://cdn.jsdelivr.net/chrono/VERSION/chrono.min.js"></script>`
Rails    | Install from [Rails Assets] by adding this to your Gemfile:<br> `gem 'rails-assets-chrono', source: 'https://rails-assets.org'`
Swift    | Try using the community-made [chrono-swift] wrapper.

[Rails Assets]: https://rails-assets.org/
[jsDelivr]: https://www.jsdelivr.com/projects/chrono
[chrono-swift]: https://github.com/neilsardesai/chrono-swift

#### Browserify

Chrono's modules are linked and packaged using [Browserify](http://browserify.org) on `src/chrono.js`. By default, `chrono.js` file exports `chrono` object as a window global.

```
browserify src/chrono.js --s chrono -o chrono.js
```

## Usage

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

```javascript
// Remove the timezone offset of a parsed date and then create the Date object
> var results = new chrono.parse('2016-03-08T01:16:07+02:00'); // Create new ParsedResult Object
> results[0].start.assign('timezoneOffset', 0); // Change value in ParsedComponents Object 'start'
> var d = results[0].start.date(); // Create a Date object
> d.toString(); // Display resulting Date object
'Tue Mar 08 2016 01:16:07 GMT+0000 (GMT)'
```

### Strict vs Casual 

Chrono comes with `strict` mode that parse only formal date patterns. 

```javascript
// 'strict' mode
chrono.strict.parseDate('Today');       // null
chrono.strict.parseDate('Friday');      // null
chrono.strict.parseDate('2016-07-01');  // Fri Jul 01 2016 12:00:00 ...
chrono.strict.parseDate('Jul 01 2016'); // Fri Jul 01 2016 12:00:00 ...

// 'casual' mode (default) 
chrono.parseDate('Today');              // Thu Jun 30 2016 12:00:00 ...
chrono.casual.parseDate('Friday');      // Fri Jul 01 2016 12:00:00 ...
chrono.casual.parseDate('Jul 01 2016'); // Fri Jul 01 2016 12:00:00 ...
chrono.casual.parseDate('Friday');      // Fri Jul 01 2016 12:00:00 ...
```


## Customize Chrono

Chrono’s extraction pipeline are mainly separated into 'parse' and ‘refine’ phases. During parsing, ‘parsers’ (`Parser`) are used to extract patterns from the input text. The parsed results ([ParsedResult](#parsedresult)) are the combined, sorted, then refine using ‘refiners’ (`Refiner`). In the refining phase, the results can be combined, filtered-out, or attached with additional information.

### Parser

Parser is a module for low-level pattern-based parsing. Ideally, each parser should be designed to handle a single specific date format. User can add new type of parsers for supporting new date formats or languages.

```javascript
var christmasParser = new chrono.Parser();

// Provide search pattern
christmasParser.pattern = function () { return /Christmas/i } 

// This function will be called when matched pattern is found
christmasParser.extract = function(text, ref, match, opt) { 
    
    // Return a parsed result, that is 25 December
    return new chrono.ParsedResult({
        ref: ref,
        text: match[0],
        index: match.index,
        start: {    
            day: 25, 
            month: 12, 
        }
    });
}

// Create a new custom Chrono. The initial pipeline 'option' can also be specified as 
// - new chrono.Chrono(exports.options.strictOption())
// - new chrono.Chrono(exports.options.casualOption())
var custom = new chrono.Chrono();
custom.parsers.push(christmasParser);

custom.parseDate("I'll arrive at 2.30AM on Christmas night") 
// Wed Dec 25 2013 02:30:00 GMT+0900 (JST)

```

To create a custom parser, override `pattern` and `extract` methods on an object of class `chrono.Parser`. 
* The `pattern` method must return `RegExp` object of searching pattern. 
* The `extract` method will be called with the 
[match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) object when the pattern is found. This function must create and return a [result](#parsedresult) (or null to skip).

### Refiner

Refiner is a heigher level module for improving or manipurating the results. User can add a new type of refiner to customize Chrono's results or to add some custom logic to Chrono.

```javascript
var guessPMRefiner = new chrono.Refiner();
guessPMRefiner.refine = function(text, results, opt) {
    // If there is no AM/PM (meridiem) specified, 
    //  let all time between 1:00 - 4:00 be PM (13.00 - 16.00)
    results.forEach(function (result) {
        if (!result.start.isCertain('meridiem') 
            &&  result.start.get('hour') >= 1 && result.start.get('hour') < 4) {
            
            result.start.assign('meridiem', 1);
            result.start.assign('hour', result.start.get('hour') + 12);
        }
    });
    return results;
} 

// Create a new custom Chrono. The initial pipeline 'option' can also be specified as 
// - new chrono.Chrono(exports.options.strictOption())
// - new chrono.Chrono(exports.options.casualOption())
var custom = new chrono.Chrono();
custom.refiners.push(guessPMRefiner);

// This will be parsed as PM.
// > Tue Dec 16 2014 14:30:00 GMT-0600 (CST) 
custom.parseDate("This is at 2.30");

// Unless the 'AM' part is specified
// > Tue Dec 16 2014 02:30:00 GMT-0600 (CST)
custom.parseDate("This is at 2.30 AM");
```

In the example, a custom refiner is created for assigning PM to parsing results with ambiguous [meridiem](http://en.wikipedia.org/wiki/12-hour_clock). The `refine` method of the refiner class will be called with parsing [results](#parsedresult) (from [parsers](#parser) or other previous refiners). The method must return an array of the new results (which, in this case, we modified those results in place).


## Development Guides

This guide explains how to setup chrono project for prospective contributors.

```bash
# Clone and install library
git clone https://github.com/wanasit/chrono.git chrono
cd chrono
npm install

# Try running the test
npm run test
```

Chrono's source files is in `src` directory. The built bundle (`chrono.js` and `chrono.min.js`) can be built by [Browserify](http://browserify.org) on `src/chrono.js` using the following command 

```
npm run make
```

Parsing date from text is complicated. Sometimes, a small change can have effects on unexpected places. So, Chrono is a heavily tested library. Commits that break a test shouldn't be allowed in any condition.

Chrono's unit testing is based-on [Qunit](https://qunitjs.com/) and [Karma](https://github.com/karma-runner/karma). During the developement, I recommend running Karma test together with watchify.

```
# Start karma
npm run karma

# Start watch (run on a different terminal)
npm run watch
```


