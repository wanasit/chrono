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

Chrono's modules are linked and packaged using [Browserify](http://browserify.org) on `src/chrono.js`. By default, `chrono.js` file exports `chrono` object as a window global. If you need to use this package in a Browserify project, you need to derequire it after building the browserify bundle.

```
browserify src/chrono.js --s chrono -o chrono.js
derequire chrono.js > tmp && mv tmp chrono.js
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

## Customize Chrono

Chrono’s extraction pipeline are mainly separated into 'parse' and ‘refine’ phases. During parsing, ‘parsers’ (`Parser`) are used to extract patterns from the input text. The parsed results ([ParsedResult](#parsedresult)) are the combined, sorted, then refine using ‘refiners’ (`Refiner`). In the refining phase, the results can be combined, filtered-out, or attached with additional information.

### Parser

Parser is a module for low-level pattern-based parsing. Ideally, each parser should be designed to handle a single specific date format. You can add new type of parsers for supporting new date formats or languages.

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

var custom = new chrono.Chrono();
custom.parsers.push(christmasParser);

custom.parseDate("I'll arrive at 2.30AM on Christmas night")
// Wed Dec 25 2013 02:30:00 GMT+0900 (JST)

```

To create a custom parser, override `pattern` and `extract` methods on an object of class `chrono.Parser`.
* The `pattern` method must return `RegExp` object of searching pattern.
* The `extract` will be called with the
[match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) object when the pattern is found. This function must create and return a [result](#parsedresult) (or null to skip).

### Refiner


