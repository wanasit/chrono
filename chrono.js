!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.chrono=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = getParsingFlags(from);
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(+config._d);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (typeof values === 'undefined') {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function get_set__set (mom, unit, value) {
        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = typeof regex === 'function' ? regex : function (isStrict) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  matchWord);
    addRegexToken('MMMM', matchWord);

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m) {
        return this._months[m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m) {
        return this._monthsShort[m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true,
            msgWithStack = msg + '\n' + (new Error()).stack;

        return extend(function () {
            if (firstTime) {
                warn(msgWithStack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
        ['YYYY-DDD', /\d{4}-\d{3}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
        ['HH:mm', /(T| )\d\d:\d\d/],
        ['HH', /(T| )\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = from_string__isoRegex.exec(string);

        if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(matchOffset)) {
                config._f += 'Z';
            }
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYY', 'YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = createUTCDate(year, 0, 1).getUTCDay();
        var daysToAdd;
        var dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year      : dayOfYear > 0 ? year      : year - 1,
            dayOfYear : dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
        }
        return [now.getFullYear(), now.getMonth(), now.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

        configFromArray(config);
    }

    function createFromConfig (config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        res = new Moment(checkOverflow(config));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             return other < this ? this : other;
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            return other > this ? this : other;
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchOffset);
    addRegexToken('ZZ', matchOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(string) {
        var matches = ((string || '').match(matchOffset) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
        return model._isUTC ? local__createLocal(input).zone(model._offset || 0) : local__createLocal(input).local();
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(input);
            }
            if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!input) {
            input = 0;
        }
        else {
            input = local__createLocal(input).utcOffset();
        }

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (this._a) {
            var other = this._isUTC ? create_utc__createUTC(this._a) : local__createLocal(this._a);
            return this.isValid() && compareArrays(this._a, other.toArray()) > 0;
        }

        return false;
    }

    function isLocal () {
        return !this._isUTC;
    }

    function isUtcOffset () {
        return this._isUTC;
    }

    function isUtc () {
        return this._isUTC && this._offset === 0;
    }

    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = create__isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
        return this.format(this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this > +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return inputMs < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this < +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return +this.clone().endOf(units) < inputMs;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var inputMs;
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this === +input;
        } else {
            inputMs = +local__createLocal(input);
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function diff (input, units, asFloat) {
        var that = cloneWithOffset(input, this),
            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
            delta, output;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if ('function' === typeof Date.prototype.toISOString) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    // MOMENTS

    function getSetWeekYear (input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getSetISOWeekYear (input) {
        var year = weekOfYear(this, 1, 4).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    addFormatToken('Q', 0, 0, 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m) {
        return this._weekdays[m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            if (!this._weekdaysParse[i]) {
                mom = local__createLocal([2000, 1]).day(i);
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, function () {
        return this.hours() % 12 || 12;
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    function millisecond__milliseconds (token) {
        addFormatToken(0, [token, 3], 0, 'millisecond');
    }

    millisecond__milliseconds('SSS');
    millisecond__milliseconds('SSSS');

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);
    addRegexToken('SSSS', matchUnsigned);
    addParseToken(['S', 'SS', 'SSS', 'SSSS'], function (input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    });

    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add          = add_subtract__add;
    momentPrototype__proto.calendar     = moment_calendar__calendar;
    momentPrototype__proto.clone        = clone;
    momentPrototype__proto.diff         = diff;
    momentPrototype__proto.endOf        = endOf;
    momentPrototype__proto.format       = format;
    momentPrototype__proto.from         = from;
    momentPrototype__proto.fromNow      = fromNow;
    momentPrototype__proto.to           = to;
    momentPrototype__proto.toNow        = toNow;
    momentPrototype__proto.get          = getSet;
    momentPrototype__proto.invalidAt    = invalidAt;
    momentPrototype__proto.isAfter      = isAfter;
    momentPrototype__proto.isBefore     = isBefore;
    momentPrototype__proto.isBetween    = isBetween;
    momentPrototype__proto.isSame       = isSame;
    momentPrototype__proto.isValid      = moment_valid__isValid;
    momentPrototype__proto.lang         = lang;
    momentPrototype__proto.locale       = locale;
    momentPrototype__proto.localeData   = localeData;
    momentPrototype__proto.max          = prototypeMax;
    momentPrototype__proto.min          = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set          = getSet;
    momentPrototype__proto.startOf      = startOf;
    momentPrototype__proto.subtract     = add_subtract__subtract;
    momentPrototype__proto.toArray      = toArray;
    momentPrototype__proto.toDate       = toDate;
    momentPrototype__proto.toISOString  = moment_format__toISOString;
    momentPrototype__proto.toJSON       = moment_format__toISOString;
    momentPrototype__proto.toString     = toString;
    momentPrototype__proto.unix         = unix;
    momentPrototype__proto.valueOf      = to_type__valueOf;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return typeof output === 'function' ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY LT',
        LLLL : 'dddd, MMMM D, YYYY LT'
    };

    function longDateFormat (key) {
        var output = this._longDateFormat[key];
        if (!output && this._longDateFormat[key.toUpperCase()]) {
            output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                return val.slice(1);
            });
            this._longDateFormat[key] = output;
        }
        return output;
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (typeof output === 'function') ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (typeof prop === 'function') {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months       =        localeMonths;
    prototype__proto._months      = defaultLocaleMonths;
    prototype__proto.monthsShort  =        localeMonthsShort;
    prototype__proto._monthsShort = defaultLocaleMonthsShort;
    prototype__proto.monthsParse  =        localeMonthsParse;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years = 0;

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // Accurately convert days to years, assume start from year 0.
        years = absFloor(daysToYears(days));
        days -= absFloor(yearsToDays(years));

        // 30 days to a month
        // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
        months += absFloor(days / 30);
        days   %= 30;

        // 12 months -> 1 year
        years  += absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absFloor(years / 4) -
        //     absFloor(years / 100) + absFloor(years / 400);
        return years * 146097 / 400;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToYears(days) * 12;
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(yearsToDays(this._months / 12));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var duration_get__milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes === 1          && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   === 1          && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    === 1          && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  === 1          && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   === 1          && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = iso_string__abs(this.years());
        var M = iso_string__abs(this.months());
        var D = iso_string__abs(this.days());
        var h = iso_string__abs(this.hours());
        var m = iso_string__abs(this.minutes());
        var s = iso_string__abs(this.seconds() + this.milliseconds() / 1000);
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = duration_get__milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.10.3';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],2:[function(require,module,exports){

var options = exports.options = require('./options');

exports.parser = require('./parsers/parser');
exports.refiner = require('./refiners/refiner');

exports.Parser = exports.parser.Parser;
exports.Refiner = exports.refiner.Refiner;
exports.Filter = exports.refiner.Filter;

exports.ParsedResult = require('./result').ParsedResult;
exports.ParsedComponents = require('./result').ParsedComponents;

var Chrono = function(option) {

    option = option || exports.options.casualOption();

    this.option = option;
    this.parsers = new Object(option.parsers);
    this.refiners = new Object(option.refiners);
}


Chrono.prototype.parse = function(text, refDate, opt) {

    refDate = refDate || new Date();
    opt = opt || {};

    var allResults = [];

    this.parsers.forEach(function (parser) {
        var results = parser.execute(text, refDate, opt);
        allResults = allResults.concat(results);
    });

    allResults.sort(function(a, b) {
        return a.index - b.index;
    });

    this.refiners.forEach(function (refiner) {
        allResults = refiner.refine(text, allResults, opt);
    });
    
    return allResults;
};


Chrono.prototype.parseDate = function(text, refDate, opt) {
    var results = this.parse(text, refDate, opt);
    if (results.length > 0) {
        return results[0].start.date();
    }
    return null;
}

exports.Chrono = Chrono;
exports.strict = new Chrono( options.strictOption() );
exports.casual = new Chrono( options.casualOption() );

exports.en = new Chrono( options.mergeOptions([
    options.en.casual, options.commonPostProcessing]));

exports.es = new Chrono( options.mergeOptions([
    options.es.casual, options.en, options.commonPostProcessing]));

exports.fr = new Chrono( options.mergeOptions([
    options.fr.casual, options.en, options.commonPostProcessing]));

exports.ja = new Chrono( options.mergeOptions([ 
    options.ja.casual, options.en, options.commonPostProcessing]));


exports.parse = function () {
    return exports.casual.parse.apply(exports.casual, arguments);
}

exports.parseDate = function () {
    return exports.casual.parseDate.apply(exports.casual, arguments);
}





},{"./options":3,"./parsers/parser":39,"./refiners/refiner":51,"./result":52}],3:[function(require,module,exports){
var parser = require('./parsers/parser');
var refiner = require('./refiners/refiner');


exports.mergeOptions = function(options) {

    var addedTypes = {};
    var mergedOption = {
        parsers: [],
        refiners: [],
    };

    options.forEach(function (option) {

        if (option.call) {
            option = option.call();
        }

        if (option.parsers) {
            option.parsers.forEach(function (p) {
                if (!addedTypes[p.constructor]) {
                    mergedOption.parsers.push(p);
                    addedTypes[p.constructor] = true;
                }
            });
        }

        if (option.refiners) {
            option.refiners.forEach(function (r) {
                if (!addedTypes[r.constructor]) {
                    mergedOption.refiners.push(r);
                    addedTypes[r.constructor] = true;
                }
            });
        }
    });

    return mergedOption;
}


exports.commonPostProcessing = function() {
    return {
        refiners: [
            // These should be after all other refiners
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),
            new refiner.UnlikelyFormatFilter()
        ]
    }
}


// -------------------------------------------------------------

exports.strictOption = function () {
    return exports.mergeOptions([
        exports.en(true),
        exports.ja(true),
        exports.es(true),
        exports.fr(true),
        exports.zh,
        exports.commonPostProcessing,
    ]);
};

exports.casualOption = function () {
    return exports.mergeOptions([
        exports.en.casual,
        exports.ja.casual,
        exports.es.casual,
        exports.fr.casual,
        exports.zh,
        exports.commonPostProcessing,
    ]);
};



// -------------------------------------------------------------


exports.en = function(strictMode) {
    return {
        parsers: [
            new parser.ENISOFormatParser(strictMode),
            new parser.ENDeadlineFormatParser(strictMode),
            new parser.ENMonthNameLittleEndianParser(strictMode),
            new parser.ENMonthNameMiddleEndianParser(strictMode),
            new parser.ENMonthNameParser(strictMode),
            new parser.ENSlashDateFormatParser(strictMode),
            new parser.ENSlashDateFormatStartWithYearParser(strictMode),
            new parser.ENSlashMonthFormatParser(strictMode),
            new parser.ENTimeAgoFormatParser(strictMode),
            new parser.ENTimeExpressionParser(strictMode),
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),

            // English
            new refiner.ENMergeDateTimeRefiner(),
            new refiner.ENMergeDateRangeRefiner(),
            new refiner.ENPrioritizeSpecificDateRefiner(),
        ]
    }
}

exports.en.casual = function() {
    var option = exports.en(false);

    // EN
    option.parsers.unshift(new parser.ENCasualDateParser());
    option.parsers.unshift(new parser.ENCasualTimeParser());
    option.parsers.unshift(new parser.ENWeekdayParser());
    option.parsers.unshift(new parser.ENRelativeDateFormatParser());
    return option;
}

// -------------------------------------------------------------

exports.ja = function() {
    return {
        parsers: [
            new parser.JPStandardParser(),
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.JPMergeDateRangeRefiner(),
        ]
    }
}

exports.ja.casual = function() {
    var option = exports.ja();
    option.parsers.unshift(new parser.JPCasualDateParser());
    return option;
}


// -------------------------------------------------------------


exports.es = function(strictMode) {
    return {
        parsers: [
            new parser.ESTimeAgoFormatParser(strictMode),
            new parser.ESDeadlineFormatParser(strictMode),
            new parser.ESTimeExpressionParser(strictMode),
            new parser.ESMonthNameLittleEndianParser(strictMode),
            new parser.ESSlashDateFormatParser(strictMode),
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
        ]
    }
}

exports.es.casual = function() {
    var option = exports.es(false);
    option.parsers.unshift(new parser.ESCasualDateParser());
    option.parsers.unshift(new parser.ESWeekdayParser());
    return option;
}


// -------------------------------------------------------------

exports.fr = function(strictMode) {
    return {
        parsers: [
            new parser.FRDeadlineFormatParser(strictMode),
            new parser.FRMonthNameLittleEndianParser(strictMode),
            new parser.FRSlashDateFormatParser(strictMode),
            new parser.FRTimeAgoFormatParser(strictMode),
            new parser.FRTimeExpressionParser(strictMode),
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.FRMergeDateRangeRefiner(),
            new refiner.FRMergeDateTimeRefiner(),
        ]
    }
}

exports.fr.casual = function() {
    var option = exports.fr(false);
    option.parsers.unshift(new parser.FRCasualDateParser());
    option.parsers.unshift(new parser.FRWeekdayParser());
    return option;
}


// -------------------------------------------------------------

exports.zh = function() {
    return {
        parsers: [
            new parser.ZHHantDateParser(),
            new parser.ZHHantWeekdayParser(),
            new parser.ZHHantTimeExpressionParser(),
            new parser.ZHHantCasualDateParser(),
            new parser.ZHHantDeadlineFormatParser(),
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
        ]
    }
}



},{"./parsers/parser":39,"./refiners/refiner":51}],4:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(now|today|tonight|last\s*night|(?:tomorrow|tmr|yesterday)\s*|tomorrow|tmr|yesterday)(?=\W|$)/i;

exports.Parser = function ENCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase();

        if(lowerText == 'tonight'){
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if (/^tomorrow|^tmr/.test(lowerText)) {

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if (/^yesterday/.test(lowerText)) {

            startMoment.add(-1, 'day');

        } else if(lowerText.match(/last\s*night/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("now")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['ENCasualDateParser'] = true;
        return result;
    }
}

},{"../../result":52,"../parser":39,"moment":1}],5:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((this)?\s*(morning|afternoon|evening|noon))/i;

var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser(){

    Parser.apply(this, arguments);


    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        if(!match[TIME_MATCH]) TIME_MATCH = 3;

        if (match[TIME_MATCH] == "afternoon") {

            result.start.imply('hour', opt['afternoon'] ? opt['afternoon'] : 15);

        } else if (match[TIME_MATCH] == "evening") {

            result.start.imply('hour', opt['evening'] ? opt['evening'] : 18);

        } else if (match[TIME_MATCH] == "morning") {

            result.start.imply('hour', opt['morning'] ? opt['morning'] : 6);

        } else if (match[TIME_MATCH] == "noon") {

            result.start.imply('hour', opt['noon'] ? opt['noon'] : 12);
        }

        result.tags['ENCasualTimeParser'] = true;
        return result;
    };
};

},{"../../result":52,"../parser":39,"moment":1}],6:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
    '(within|in)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)\\s*' +
    '(?=\\W|$)', 'i'
);

var STRICT_PATTERN = new RegExp('(\\W|^)' +
    '(within|in)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?)\\s*' +
    '(seconds?|minutes?|hours?|days?)\\s*' +
    '(?=\\W|$)', 'i'
);

exports.Parser = function ENDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    };

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var num = match[3].toLowerCase();
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if (num === 'a' || num === 'an'){
            num = 1;
        } else if (num.match(/few/i)){
            num = 3;
        } else if (num.match(/half/i)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);
        if (match[4].match(/day|week|month|year/i)) {

            if (match[4].match(/day/i)) {
                date.add(num, 'd');
            } else if (match[4].match(/week/i)) {
                date.add(num * 7, 'd');
            } else if (match[4].match(/month/i)) {
                date.add(num, 'month');
            } else if (match[4].match(/year/i)) {
                date.add(num, 'year');
            }

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (match[4].match(/hour/i)) {

            date.add(num, 'hour');

        } else if (match[4].match(/min/i)) {

            date.add(num, 'minute');

        } else if (match[4].match(/second/i)) {

            date.add(num, 'second');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.start.assign('second', date.second());
        result.tags['ENDeadlineFormatParser'] = true;
        return result;
    };
};

},{"../../result":52,"../../utils/EN":53,"../parser":39,"moment":1}],7:[function(require,module,exports){
/*
    ISO 8601
    http://www.w3.org/TR/NOTE-datetime
    - YYYY-MM-DD
    - YYYY-MM-DDThh:mmTZD
    - YYYY-MM-DDThh:mm:ssTZD
    - YYYY-MM-DDThh:mm:ss.sTZD 
    - TZD = (Z or +hh:mm or -hh:mm)
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' 
            + '([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})'
            + '(?:T' //..
                + '([0-9]{1,2}):([0-9]{1,2})' // hh:mm
                + '(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?' // :ss.s
                + '(?:Z|([+-]\\d{2}):?(\\d{2})?)?' // TZD (Z or ±hh:mm or ±hhmm or ±hh)
            + ')?'  //..
            + '(?=\\W|$)', 'i');

var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP  = 4;
var HOUR_NUMBER_GROUP  = 5;
var MINUTE_NUMBER_GROUP = 6;
var SECOND_NUMBER_GROUP = 7;
var MILLISECOND_NUMBER_GROUP = 8;
var TZD_HOUR_OFFSET_GROUP = 9;
var TZD_MINUTE_OFFSET_GROUP = 10;

exports.Parser = function ENISOFormatParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        })
        
        result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
        result.start.assign('month', parseInt(match[MONTH_NUMBER_GROUP]));
        result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

        if (moment(result.start.get('month')) > 12 || moment(result.start.get('month')) < 1 ||
            moment(result.start.get('day')) > 31 || moment(result.start.get('day')) < 1) {
            return null;
        }

        if (match[HOUR_NUMBER_GROUP] != null) {
            
            result.start.assign('hour',
                    parseInt(match[HOUR_NUMBER_GROUP]));
            result.start.assign('minute',
                    parseInt(match[MINUTE_NUMBER_GROUP]));

            if (match[SECOND_NUMBER_GROUP] != null) {

                result.start.assign('second',
                        parseInt(match[SECOND_NUMBER_GROUP]));
            }

            if (match[MILLISECOND_NUMBER_GROUP] != null) {

                result.start.assign('millisecond',
                        parseInt(match[MILLISECOND_NUMBER_GROUP]));
            }

            if (match[TZD_HOUR_OFFSET_GROUP] == null) {

                result.start.assign('timezoneOffset', 0);
            } else {

                var minuteOffset = 0;
                var hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
                if (match[TZD_MINUTE_OFFSET_GROUP] != null)
                    minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);

                var offset = hourOffset * 60;
                if (offset < 0) {
                    offset -= minuteOffset;
                } else {
                    offset += minuteOffset;
                }

                result.start.assign('timezoneOffset', offset);
            }
        }
        
        result.tags['ENISOFormatParser'] = true;
        return result;
    };

}


},{"../../result":52,"../parser":39,"moment":1}],8:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
        '(?:on\\s*?)?' +
        '(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\\s*,?\\s*)?' +
        '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' +
        '(?:\\s*' +
            '(?:to|\\-|\\–|until|through|till|\\s)\\s*' +
            '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' +
        ')?\\s*(?:of)?\\s*' +
        '(Jan(?:uary|\\.)?|Feb(?:ruary|\\.)?|Mar(?:ch|\\.)?|Apr(?:il|\\.)?|May|Jun(?:e|\\.)?|Jul(?:y|\\.)?|Aug(?:ust|\\.)?|Sep(?:tember|\\.)?|Oct(?:ober|\\.)?|Nov(?:ember|\\.)?|Dec(?:ember|\\.)?)' +
        '(?:' +
            ',?\\s*([0-9]{1,4}(?![^\\s]\\d))' +
            '(\\s*(?:BE|AD|BC))?' +
        ')?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_NUM_GROUP = 4;
var DATE_TO_GROUP = 5;
var DATE_TO_NUM_GROUP = 6;
var MONTH_NAME_GROUP = 7;
var YEAR_GROUP = 8;
var YEAR_BE_GROUP = 9;

exports.Parser = function ENMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_NUM_GROUP] ?
            parseInt(match[DATE_NUM_GROUP]):
            util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){

                if (/BE/i.test(match[YEAR_BE_GROUP])) {
                    // Buddhist Era
                    year = year - 543;
                } else if (/BC/i.test(match[YEAR_BE_GROUP])) {
                    // Before Christ
                    year = -year;
                }

            } else if (year < 10) {

                // require single digit years to always have BC/AD
                return null;

            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[DATE_TO_GROUP]) {
            var endDate = match[DATE_TO_NUM_GROUP] ?
                parseInt(match[DATE_TO_NUM_GROUP]):
                util.ORDINAL_WORDS[match[DATE_TO_GROUP].trim().replace('-', ' ').toLowerCase()];

            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        result.tags['ENMonthNameLittleEndianParser'] = true;
        return result;
    };
};

},{"../../result":52,"../../utils/EN":53,"../parser":39,"moment":1}],9:[function(require,module,exports){
/*

    The parser for parsing US's date format that begin with month's name.

    EX.
        - January 13
        - January 13, 2012
        - January 13 - 15, 2012
        - Tuesday, January 13, 2012

    Watch out for:
        - January 12:00
        - January 12.44
        - January 1222344
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '(?:on\\s*?)?' +
        '(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\\.?|Mon\\.?|Tue\\.?|Wed\\.?|Thu\\.?|Fri\\.?|Sat\\.?)' +
    '\\s*,?\\s*)?' +
    '(Jan\\.?|January|Feb\\.?|February|Mar\\.?|March|Apr\\.?|April|May\\.?|Jun\\.?|June|Jul\\.?|July|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Oct\\.?|October|Nov\\.?|November|Dec\\.?|December)' +
    '\\s*' +
    '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN +')\\s*' +
    '(?:' +
        '(?:to|\\-)\\s*' +
        '(([0-9]{1,2})(?:st|nd|rd|th)?| ' + util.ORDINAL_WORDS_PATTERN + ')\\s*' +
    ')?' +
    '(?:' +
        '\\s*,?\\s*(?:([0-9]{4})\\s*(BE|AD|BC)?|([0-9]{1,4})\\s*(AD|BC))\\s*' +
    ')?' +
    '(?=\\W|$)(?!\\:\\d)', 'i');

var WEEKDAY_GROUP = 2;
var MONTH_NAME_GROUP = 3;
var DATE_GROUP = 4;
var DATE_NUM_GROUP = 5;
var DATE_TO_GROUP = 6;
var DATE_TO_NUM_GROUP = 7;
var YEAR_GROUP = 8;
var YEAR_BE_GROUP = 9;
var YEAR_GROUP2 = 10;
var YEAR_BE_GROUP2 = 11;

exports.Parser = function ENMonthNameMiddleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });


        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];
        var day = match[DATE_NUM_GROUP] ?
            parseInt(match[DATE_NUM_GROUP]) :
            util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];

        var year = null;
        if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
            year = match[YEAR_GROUP] || match[YEAR_GROUP2];
            year = parseInt(year);

            var yearBE = match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2];
            if (yearBE) {
                if (/BE/i.test(yearBE)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (/BC/i.test(yearBE)) {
                    // Before Christ
                    year = -year;
                }
            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as 'January 12 - 13, 2012'
        if (match[DATE_TO_GROUP]) {
            var endDate = match[DATE_TO_NUM_GROUP] ?
                endDate = parseInt(match[DATE_TO_NUM_GROUP]) :
                util.ORDINAL_WORDS[match[DATE_TO_GROUP].replace('-', ' ').trim().toLowerCase()];

            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        result.tags['ENMonthNameMiddleEndianParser'] = true;
        return result;
    }
};
},{"../../result":52,"../../utils/EN":53,"../parser":39,"moment":1}],10:[function(require,module,exports){
/*
    
    The parser for parsing month name and year.
    
    EX. 
        - January
        - January 2012
        - January, 2012
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' +
    '(Jan\\.?|January|Feb\\.?|February|Mar\\.?|March|Apr\\.?|April|May\\.?|Jun\\.?|June|Jul\\.?|July|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Oct\\.?|October|Nov\\.?|November|Dec\\.?|December)' + 
    '\\s*' +
    '(?:' +
        '[,-]?\\s*([0-9]{4})(\\s*BE|AD|BC)?' +
    ')?' +
    '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');

var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){
        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        
        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = 1;

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){
                if (match[YEAR_BE_GROUP].match(/BE/)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (match[YEAR_BE_GROUP].match(/BC/)) {
                    // Before Christ
                    year = -year;
                }

            } else if (year < 100){ 

                year = year + 2000;
            }
        }

        if(year){
            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            
            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){  
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){ 
                refMoment = lastYear;
            }

            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        result.tags['ENMonthNameParser'] = true;
        return result;
    }
}

},{"../../result":52,"../../utils/EN":53,"../parser":39,"moment":1}],11:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
    '(next|last|past)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|few|half(?:\\s*an?)?)?\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)(?=\\s*)' +
    '(?=\\W|$)', 'i'
);

var MODIFIER_WORD_GROUP = 2;
var MULTIPLIER_WORD_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;

exports.Parser = function ENRelativeDateFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });
        result.tags['ENRelativeDateFormatParser'] = true;

        var num = match[MULTIPLIER_WORD_GROUP] === undefined ? '' : match[3].toLowerCase();
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if (num === ''){
            num = 1;
        } else if (num.match(/few/i)){
            num = 3;
        } else if (num.match(/half/i)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        num *= modifier;

        var date = moment(ref);
        if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year/i)) {

            if (match[RELATIVE_WORD_GROUP].match(/day/i)) {
                date.add(num, 'd');
                result.start.assign('year', date.year());
                result.start.assign('month', date.month() + 1);
                result.start.assign('day', date.date());
            } else if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
                date.add(num * 7, 'd');
                // We don't know the exact date for next/last week so we imply
                // them
                result.start.imply('day', date.date());
                result.start.imply('month', date.month() + 1);
                result.start.imply('year', date.year());
            } else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
                date.add(num, 'month');
                // We don't know the exact day for next/last month
                result.start.imply('day', date.date());
                result.start.assign('year', date.year());
                result.start.assign('month', date.month() + 1);
            } else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
                date.add(num, 'year');
                // We don't know the exact day for month on next/last year
                result.start.imply('day', date.date());
                result.start.imply('month', date.month() + 1);
                result.start.assign('year', date.year());
            }

            return result;
        }

        if (match[RELATIVE_WORD_GROUP].match(/hour/i)) {

            date.add(num, 'hour');
            result.start.imply('minute', date.minute());
            result.start.imply('second', date.second());

        } else if (match[RELATIVE_WORD_GROUP].match(/min/i)) {

            date.add(num, 'minute');
            result.start.assign('minute', date.minute());
            result.start.imply('second', date.second());

        } else if (match[RELATIVE_WORD_GROUP].match(/second/i)) {

            date.add(num, 'second');
            result.start.assign('second', date.second());
            result.start.assign('minute', date.minute());
        }

        result.start.assign('hour', date.hour());
        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
        result.start.assign('day', date.date());
        return result;
    };
};

},{"../../result":52,"../../utils/EN":53,"../parser":39,"moment":1}],12:[function(require,module,exports){
/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015
    - 11/3/2015
    - 11/3
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '(?:on\\s*?)?' +
        '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 3;
var DAY_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function ENSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){

        if(match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);


        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        if(text.match(/^\d\.\d$/)) return;
        if(text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return;

        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;

        var date = null;
        var year = match[YEAR_GROUP] || moment(ref).year() + '';
        var month = match[MONTH_GROUP];
        var day   = match[DAY_GROUP];

        month = parseInt(month);
        day  = parseInt(day);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month
                // looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if (year > 50) {
                year = year + 1900;
            } else {
                year = year + 2000;
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        //Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['ENSlashDateFormatParser'] = true;
        return result;
    };
};

},{"../../result":52,"../parser":39,"moment":1}],13:[function(require,module,exports){
/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date. 
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' 
            + '([0-9]{4})[\\-\\.\\/]([0-9]{1,2})[\\-\\.\\/]([0-9]{1,2})'
            + '(?=\\W|$)', 'i');

var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP  = 4;

exports.Parser = function ENSlashDateFormatStartWithYearParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        })
        
        result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
        result.start.assign('month', parseInt(match[MONTH_NUMBER_GROUP]));
        result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

        if (moment(result.start.get('month')) > 12 || moment(result.start.get('month')) < 1 ||
            moment(result.start.get('day')) > 31 || moment(result.start.get('day')) < 1) {
            return null;
        }
        
        result.tags['ENDateFormatParser'] = true;
        return result;
    };
}

},{"../../result":52,"../parser":39,"moment":1}],14:[function(require,module,exports){
/*
    Month/Year date format with slash "/" (also "-" and ".") between numbers 
    - 11/05
    - 06/2005
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(^|[^\\d/]\\s+|[^\\w\\s])' +
    '([0-9]|0[1-9]|1[012])/([0-9]{4})' + 
    '([^\\d/]|$)', 'i');

var OPENNING_GROUP = 1;
var ENDING_GROUP = 4;

var MONTH_GROUP = 2;
var YEAR_GROUP = 3;

exports.Parser = function ENSlashMonthFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){
        
        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - (1 + match[ENDING_GROUP].length)).trim();

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        var date = null;
        var year = match[YEAR_GROUP] ;
        var month = match[MONTH_GROUP];
        var day   = 1;
        
        month = parseInt(month);
        year = parseInt(year);

        result.start.imply('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        result.tags['ENSlashMonthFormatParser'] = true;
        return result;
    };
};

},{"../../result":52,"../parser":39,"moment":1}],15:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('' +
    '(\\W|^)' +
    '(?:within\\s*)?' +
    '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|weeks?|days?|months?|years?)\\s*' +
    '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');

var STRICT_PATTERN = new RegExp('' +
    '(\\W|^)' +
    '(?:within\\s*)?' +
    '([0-9]+|an?)\\s*' +
    '(seconds?|minutes?|hours?|days?)\\s*' +
    'ago(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    };

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var num = match[2].toLowerCase() ;
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if(num === 'a' || num === 'an'){
            num = 1;
        } else if (num.match(/few/)) {
            num = 3;
        } else if (num.match(/half/)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);

        if (match[3].match(/hour|min|second/i)) {
            if (match[3].match(/hour/i)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/min/i)) {

                date.add(-num, 'minute');

            } else if (match[3].match(/second/i)) {

                date.add(-num, 'second');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.start.assign('second', date.second());
            result.tags['ENTimeAgoFormatParser'] = true;
            return result;
        }

        if (match[3].match(/week/i)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/day/i)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/month/i)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/year/i)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":52,"../../utils/EN":53,"../parser":39,"moment":1}],16:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:at|from)\\s*)?" + 
    "(\\d{1,4}|noon|midnight)" + 
    "(?:" + 
        "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        "(?:" + 
            "(?:\\:|\\：)(\\d{2})" + 
        ")?" + 
    ")?" + 
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + 
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" + 
    "(\\-|\\–|\\~|\\〜|to|\\?)\\s*" + 
    "(\\d{1,4})" +
    "(?:" + 
        "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        "(?:" + 
            "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        ")?" + 
    ")?" + 
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + 
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;


exports.Parser = function ENTimeExpressionParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return FIRST_REG_PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index + match[1].length;
        result.text  = match[0].substring(match[1].length);
        result.tags['ENTimeExpressionParser'] = true;

        result.start.imply('day',   refMoment.date());
        result.start.imply('month', refMoment.month()+1);
        result.start.imply('year',  refMoment.year());
        
        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){ 
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.start.assign('second', second);
        }
        
        // ----- Hours
        if (match[HOUR_GROUP].toLowerCase() == "noon"){
            meridiem = 1; 
            hour = 12;
        } else if (match[HOUR_GROUP].toLowerCase() == "midnight") {
            meridiem = 0; 
            hour = 0;
        } else {
            hour = parseInt(match[HOUR_GROUP]);
        }
        
        // ----- Minutes
        if(match[MINUTE_GROUP] != null){ 
            minute = parseInt(match[MINUTE_GROUP]);
        } else if(hour > 100) { 
            minute = hour%100;
            hour   = parseInt(hour/100);
        } 
        
        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) { 
            meridiem = 1;
        }

        // ----- AM & PM  
        if(match[AM_PM_HOUR_GROUP] != null) {
            if(hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0; 
                if(hour == 12) hour = 0;
            }
            
            if(ampm == "p"){
                meridiem = 1; 
                if(hour != 12) hour += 12;
            }
        } 

        result.start.assign('hour', hour);
        result.start.assign('minute', minute);

        if (meridiem >= 0) {
            result.start.assign('meridiem', meridiem);
        } else {
            if (hour < 12) {
                result.start.imply('meridiem', 0);
            } else {
                result.start.imply('meridiem', 1);
            }
        }
        
        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================
        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) { 
                return null;
            }
            return result;
        }



        // Pattern "YY.YY -XXXX" is more like timezone offset
        if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
            return result;
        }

        if(result.end == null){
            result.end = new ParsedComponents(null, result.start.date());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){ 
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.end.assign('second', second);
        }

        hour = parseInt(match[2]);
        
        // ----- Minute
        if (match[MINUTE_GROUP]!= null) {
            
            minute = parseInt(match[MINUTE_GROUP]);
            if(minute >= 60) return result;
            
        } else if (hour > 100) {

            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) { 
            meridiem = 1;
        }
        
        // ----- AM & PM 
        if (match[AM_PM_HOUR_GROUP] != null){

            if (hour > 12) return null;

            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0; 
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            }
            
            if(ampm == "p"){
                meridiem = 1; 
                if(hour != 12) hour += 12;
            }
            
            if (!result.start.isCertain('meridiem')) {
                if (meridiem == 0) {
                    
                    result.start.imply('meridiem', 0);
                    
                    if (result.start.get('hour') == 12) {
                        result.start.assign('hour', 0);
                    }

                } else {

                    result.start.imply('meridiem', 1);
                    
                    if (result.start.get('hour') != 12) {
                        result.start.assign('hour', result.start.get('hour') + 12); 
                    }
                }
            }
        }

        result.text = result.text + match[0];
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        if (meridiem >= 0) {
            result.end.assign('meridiem', meridiem);
        } else {
            var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;
            if (startAtPM && result.start.get('hour') > hour) {
                // 10pm - 1 (am)
                result.end.imply('meridiem', 0);

            } else if (hour > 12) {
                result.end.imply('meridiem', 1);
            }
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply('day', result.end.get('day') + 1)
        }
        
        return result;
    }
}

},{"../../result":52,"../parser":39,"moment":1}],17:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tues':2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thurs':4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6};

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:on\\s*?)?' +
    '(?:(this|last|past|next)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(this|last|past|next)\\s*week)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;


exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {

    var startMoment = moment(ref);
    var startMomentFixed = false;
    var refOffset = startMoment.day();

    if(modifier == 'last' || modifier == 'past') {
        startMoment.day(offset - 7);
        startMomentFixed = true;
    } else if(modifier == 'next') {
        startMoment.day(offset + 7);
        startMomentFixed = true;
    } else if(modifier == 'this') {
        startMoment.day(offset);
    } else {
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment.day(offset + 7);
        } else {
            startMoment.day(offset);
        }
    }

    result.start.assign('weekday', offset);
    if (startMomentFixed) {
        result.start.assign('day', startMoment.date());
        result.start.assign('month', startMoment.month() + 1);
        result.start.assign('year', startMoment.year());
    } else {
        result.start.imply('day', startMoment.date());
        result.start.imply('month', startMoment.month() + 1);
        result.start.imply('year', startMoment.year());
    }

    return result;
};


exports.Parser = function ENWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) {
            return null;
        }

        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        var norm = prefix || postfix;
        norm = norm || '';
        norm = norm.toLowerCase();

        exports.updateParsedComponent(result, ref, offset, norm);
        result.tags['ENWeekdayParser'] = true;

        return result;
    }
};

},{"../../result":52,"../parser":39,"moment":1}],18:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

/*
  Valid patterns:
  - esta mañana -> today in the morning
  - esta tarde -> today in the afternoon/evening
  - esta noche -> tonight
  - ayer por la mañana -> yesterday in the morning
  - ayer por la tarde -> yesterday in the afternoon/evening
  - ayer por la noche -> yesterday at night
  - mañana por la mañana -> tomorrow in the morning
  - mañana por la tarde -> tomorrow in the afternoon/evening
  - mañana por la noche -> tomorrow at night
  - anoche -> tomorrow at night
  - hoy -> today
  - ayer -> yesterday
  - mañana -> tomorrow
 */
var PATTERN = /(\W|^)(ahora|esta\s*(mañana|tarde|noche)|(ayer|mañana)\s*por\s*la\s*(mañana|tarde|noche)|hoy|mañana|ayer|anoche)(?=\W|$)/i;

exports.Parser = function ESCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

        if(lowerText == 'mañana'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if(lowerText == 'ayer') {

            startMoment.add(-1, 'day');
        }
        else if(lowerText == 'anoche') {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("esta")) {

            var secondMatch = match[3].toLowerCase();
            if (secondMatch == "tarde") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "mañana") {

                result.start.imply('hour', 6);

            } else if (secondMatch == "noche") {

              // Normally means this coming midnight
              result.start.imply('hour', 22);
              result.start.imply('meridiem', 1);

            }
        } else if (lowerText.match(/por\s*la/)) {

            var firstMatch = match[4].toLowerCase();
            if (firstMatch === 'ayer') {

              startMoment.add(-1, 'day');

            } else if (firstMatch === 'mañana') {

              startMoment.add(1, 'day');

            }

            var secondMatch = match[5].toLowerCase();
            if (secondMatch == "tarde") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "mañana") {

                result.start.imply('hour', 9);

            } else if (secondMatch == "noche") {

              // Normally means this coming midnight
              result.start.imply('hour', 22);
              result.start.imply('meridiem', 1);

            }

        } else if (lowerText.match("ahora")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['ESCasualDateParser'] = true;
        return result;
    }
}

},{"../../result":52,"../parser":39,"moment":1}],19:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|en)\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|d[ií]as?)\s*(?=(?:\W|$))/i;

exports.Parser = function ESDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = parseInt(match[3]);
        if (isNaN(num)) {
          if (match[3].match(/medi/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = moment(ref);
        if (match[4].match(/d[ií]a/)) {
            date.add(num, 'd');

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }


        if (match[4].match(/hora/)) {

            date.add(num, 'hour');

        } else if (match[4].match(/minuto/)) {

            date.add(num, 'minute');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.tags['ESDeadlineFormatParser'] = true;
        return result;
    };
}

},{"../../result":52,"../parser":39,"moment":1}],20:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/ES');

var DAYS_OFFSET = util.WEEKDAY_OFFSET;

var PATTERN = new RegExp('(\\W|^)' +
        '(?:(Domingo|Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Dom|Lun|Mar|Mie|Jue|Vie|Sab)\\s*,?\\s*)?' +
        '([0-9]{1,2})(?:º|ª|°)?' +
        '(?:\\s*(?:desde|de|\\-|\\–|al?|hasta|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' +
        '(Ene(?:ro|\\.)?|Feb(?:rero|\\.)?|Mar(?:zo|\\.)?|Abr(?:il|\\.)?|May(?:o|\\.)?|Jun(?:io|\\.)?|Jul(?:io|\\.)?|Ago(?:sto|\\.)?|Sep(?:tiembre|\\.)?|Oct(?:ubre|\\.)?|Nov(?:iembre|\\.)?|Dic(?:iembre|\\.)?)' +
        '(?:\\s*(?:del?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function ESMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){
                if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
                    // antes de Cristo
                    year = -year;
                }
            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['ESMonthNameLittleEndianParser'] = true;
        return result;
    };
}
},{"../../result":52,"../../utils/ES":54,"../parser":39,"moment":1}],21:[function(require,module,exports){
/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '((?:domingo|dom|lunes|lun|martes|mar|mi[ée]rcoles|mie|jueves|jue|viernes|vie|s[áa]bado|sab))' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-1]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'domingo': 0, 'dom': 0, 'lunes': 1, 'lun': 1, 'martes': 2, 'mar': 2, 'miercoles': 3, 'miércoles': 3, 'mie': 3,
    'jueves': 4, 'jue': 4, 'viernes': 5, 'vier': 5, 'sábado': 6, 'sabado': 6, 'sab': 6,}


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

// in Spanish we use day/month/year
var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 4;
var DAY_GROUP = 3;
var YEAR_GROUP = 5;

exports.Parser = function ESSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){

        if(match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);


        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        if(text.match(/^\d\.\d$/)) return;
        if(text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return;

        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;

        var date = null;
        var year = match[YEAR_GROUP] || moment(ref).year() + '';
        var month = match[MONTH_GROUP];
        var day   = match[DAY_GROUP];

        month = parseInt(month);
        day  = parseInt(day);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month
                // looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if(year > 50){
                year = year + 1900;
            }else{
                year = year + 2000;
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        //Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['ESSlashDateFormatParser'] = true;
        return result;
    };
};
},{"../../result":52,"../parser":39,"moment":1}],22:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)hace\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|semanas?|d[ií]as?|mes(es)?|años?)(?=(?:\W|$))/i;

exports.Parser = function ESTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    }

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = parseInt(match[2]);
        if (isNaN(num)) {
          if (match[2].match(/medi/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = moment(ref);

        if (match[3].match(/hora/) || match[3].match(/minuto/)) {
            if (match[3].match(/hora/)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/minuto/)) {

                date.add(-num, 'minute');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.tags['ESTimeAgoFormatParser'] = true;
            return result;
        }

        if (match[3].match(/semana/)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/d[ií]a/)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/mes/)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/año/)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":52,"../parser":39,"moment":1}],23:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:a las?|al?|desde|de)\\s*)?" +
    "(\\d{1,4}|mediod[ií]a|medianoche)" +
    "(?:" +
        "(?:\\.|\\:|\\：)(\\d{1,2})" +
        "(?:" +
            "(?:\\:|\\：)(\\d{2})" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" +
    "(\\-|\\–|\\~|\\〜|a(?:\s*las)?|\\?)\\s*" +
    "(\\d{1,4})" +
    "(?:" +
        "(?:\\.|\\:|\\：)(\\d{1,2})" +
        "(?:" +
            "(?:\\.|\\:|\\：)(\\d{1,2})" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function ESTimeExpressionParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return FIRST_REG_PATTERN; }

    this.extract = function(text, ref, match, opt){

        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index + match[1].length;
        result.text  = match[0].substring(match[1].length);
        result.tags['ESTimeExpressionParser'] = true;

        result.start.imply('day',   refMoment.date());
        result.start.imply('month', refMoment.month()+1);
        result.start.imply('year',  refMoment.year());

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.start.assign('second', second);
        }

        // ----- Hours
        if (match[HOUR_GROUP].toLowerCase().match(/mediod/)){
            meridiem = 1;
            hour = 12;
        } else if (match[HOUR_GROUP].toLowerCase() == "medianoche") {
            meridiem = 0;
            hour = 0;
        } else {
            hour = parseInt(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if(match[MINUTE_GROUP] != null){
            minute = parseInt(match[MINUTE_GROUP]);
        } else if(hour > 100) {
            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if(match[AM_PM_HOUR_GROUP] != null) {
            if(hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0;
                if(hour == 12) hour = 0;
            }

            if(ampm == "p"){
                meridiem = 1;
                if(hour != 12) hour += 12;
            }
        }
        result.start.assign('hour', hour);
        result.start.assign('minute', minute);
        if (meridiem >= 0) {
            result.start.assign('meridiem', meridiem);
        }

        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================
        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) {
                return null;
            }
            return result;
        }



        // Pattern "YY.YY -XXXX" is more like timezone offset
        if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
            return result;
        }

        if(result.end == null){
            result.end = new ParsedComponents(null, result.start.date());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.end.assign('second', second);
        }

        hour = parseInt(match[2]);

        // ----- Minute
        if (match[MINUTE_GROUP]!= null) {

            minute = parseInt(match[MINUTE_GROUP]);
            if(minute >= 60) return result;

        } else if (hour > 100) {

            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP] != null){

            if (hour > 12) return null;

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a"){
                meridiem = 0;
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            }

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p"){
                meridiem = 1;
                if(hour != 12) hour += 12;
            }

            if (!result.start.isCertain('meridiem')) {
                if (meridiem == 0) {

                    result.start.imply('meridiem', 0);

                    if (result.start.get('hour') == 12) {
                        result.start.assign('hour', 0);
                    }

                } else {

                    result.start.imply('meridiem', 1);

                    if (result.start.get('hour') != 12) {
                        result.start.assign('hour', result.start.get('hour') + 12);
                    }
                }
            }

        } else if(hour >= 12) {
            meridiem = 1;
        }

        result.text = result.text + match[0];
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        if (meridiem >= 0) {
            result.end.assign('meridiem', meridiem);
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply('day', result.end.get('day') + 1)
        }

        return result;
    }
}

},{"../../result":52,"../parser":39,"moment":1}],24:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var updateParsedComponent = require('../EN/ENWeekdayParser').updateParsedComponent;

var DAYS_OFFSET = { 'domingo': 0, 'dom': 0, 'lunes': 1, 'lun': 1, 'martes': 2, 'mar':2, 'miercoles': 3, 'miércoles': 3, 'mie': 3,
    'jueves': 4, 'jue': 4, 'viernes': 5, 'vier': 5, 'sabado': 6, 'sábado': 6, 'sab': 6,}

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:(este|pasado|pr[oó]ximo)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(este|pasado|pr[óo]ximo)\\s*week)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function ESWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var modifier = null;
        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        if (prefix || postfix) {
            var norm = prefix || postfix;
            norm = norm.toLowerCase();

            if(norm == 'pasado') {
                modifier = 'this';
            }
            else if(norm == 'próximo' || norm == 'proximo') {
                modifier = 'next';
            }
            else if(norm== 'este') {
                modifier =  'this';
            }
        }

        updateParsedComponent(result, ref, offset, modifier);
        result.tags['ESWeekdayParser'] = true;
        return result;
    }
}

},{"../../result":52,"../EN/ENWeekdayParser":17,"../parser":39,"moment":1}],25:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(maintenant|aujourd'hui|ajd|cette\s*nuit|la\s*veille|(demain|hier)(\s*(matin|soir|aprem|après-midi))?|ce\s*(matin|soir)|cet\s*(après-midi|aprem))(?=\W|$)/i;

exports.Parser = function FRCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase();

        if(lowerText.match(/demain/)){
            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }
        } 

        if(lowerText.match(/hier/)) {
            startMoment.add(-1, 'day');
        }

        if(lowerText.match(/cette\s*nuit/)){
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if(lowerText.match(/la\s*veille/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match(/(après-midi|aprem)/)) {

            result.start.imply('hour', 14);

        } else if (lowerText.match(/(soir)/)) {

            result.start.imply('hour', 18);

        } else if (lowerText.match(/matin/)) {

            result.start.imply('hour', 8);

        }  else if (lowerText.match("maintenant")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['FRCasualDateParser'] = true;
        return result;
    }
}

},{"../../result":52,"../parser":39,"moment":1}],26:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/FR');

var PATTERN = new RegExp('(\\W|^)' +
    '(dans|en)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|une?|(?:\\s*quelques)?|demi(?:\\s*|-?)?)\\s*' +
    '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|années?)\\s*' +
    '(?=\\W|$)', 'i'
);

var STRICT_PATTERN = new RegExp('(\\W|^)' +
    '(dans|en)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|un?)\\s*' +
    '(secondes?|minutes?|heures?|jours?)\\s*' +
    '(?=\\W|$)', 'i'
);

exports.Parser = function FRDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    };

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var num = match[3];
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if (num === 'un' || num === 'une'){
            num = 1;
        } else if (num.match(/quelques?/i)){
            num = 3;
        } else if (num.match(/demi-?/i)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);
        if (match[4].match(/jour|semaine|mois|année/i)) {

            if (match[4].match(/jour/)) {
                date.add(num, 'd');
            } else if (match[4].match(/semaine/i)) {
                date.add(num * 7, 'd');
            } else if (match[4].match(/mois/i)) {
                date.add(num, 'month');
            } else if (match[4].match(/année/i)) {
                date.add(num, 'year');
            }

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (match[4].match(/heure/i)) {

            date.add(num, 'hour');

        } else if (match[4].match(/min/i)) {

            date.add(num, 'minutes');

        } else if (match[4].match(/secondes/i)) {

            date.add(num, 'second');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.start.assign('second', date.second());
        result.tags['FRDeadlineFormatParser'] = true;
        return result;
    };
};

},{"../../result":52,"../../utils/FR":55,"../parser":39,"moment":1}],27:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/FR');

var DAYS_OFFSET = util.WEEKDAY_OFFSET;

var PATTERN = new RegExp('(\\W|^)' +
        '(?:(Dimanche|Lundi|Mardi|mercredi|Jeudi|Vendredi|Samedi|Dim|Lun|Mar|Mer|Jeu|Ven|Sam)\\s*,?\\s*)?' +
        '([0-9]{1,2}|1er)' +
        '(?:\\s*(?:au|\\-|\\–|jusqu\'au?|\\s)\\s*([0-9]{1,2})(?:er)?)?\\s*(?:de)?\\s*' +
        '(Jan(?:vier|\\.)?|Fév(?:rier|\\.)?|Mars|Avr(?:il|\\.)?|Mai|Juin|Juil(?:let|\\.)?|Ao[uû]t|Sept(?:embre|\\.)?|Oct(?:obre|\\.)?|Nov(?:embre|\\.)?|déc(?:embre|\\.)?)' +
        '(?:\\s*(\\s*[0-9]{1,4}(?![^\\s]\\d))(?:\\s*(AC|[ap]\\.?\\s*c(?:h(?:r)?)?\\.?\\s*n\\.?))?)?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function FRMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){
                if (/a/i.test(match[YEAR_BE_GROUP])) {
                    // Ante Christe natum
                    year = -year;
                }
            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            // Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 janvier 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['FRMonthNameLittleEndianParser'] = true;
        return result;
    };
}

},{"../../result":52,"../../utils/FR":55,"../parser":39,"moment":1}],28:[function(require,module,exports){
/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '((?:dimanche|dim|lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|le))' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'dimanche': 0, 'dim': 0, 'lundi': 1, 'lun': 1,'mardi': 2, 'mar':2, 'mercredi': 3, 'mer': 3,
    'jeudi': 4, 'jeu':4, 'vendredi': 5, 'ven': 5,'samedi': 6, 'sam': 6};


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

// In French we use day/month/year
var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function FRSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){

        if(match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);


        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        if(text.match(/^\d\.\d$/)) return;
        if(text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return;

        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;

        var date = null;
        var year = match[YEAR_GROUP] || moment(ref).year() + '';
        var month = match[MONTH_GROUP];
        var day   = match[DAY_GROUP];

        day  = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if(year > 50){
                year = year + 1900;
            }else{
                year = year + 2000;
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        // Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['FRSlashDateFormatParser'] = true;
        return result;
    };
};
},{"../../result":52,"../parser":39,"moment":1}],29:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)il y a\s*([0-9]+|une?)\s*(minutes?|heures?|semaines?|jours?|mois|années?|ans?)(?=(?:\W|$))/i;

exports.Parser = function FRTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    }

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });
        result.tags['FRTimeAgoFormatParser'] = true;
        
        var num = parseInt(match[2]);
        if (isNaN(num)) {
          if (match[2].match(/demi/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = moment(ref);

        if (match[3].match(/heure/) || match[3].match(/minute/)) {
            if (match[3].match(/heure/)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/minute/)) {

                date.add(-num, 'minute');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());

            return result;
        }

        if (match[3].match(/semaine/)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/jour/)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/mois/)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/années?|ans?/)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":52,"../parser":39,"moment":1}],30:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:[àa])\\s*)?" +
    "(\\d{1,2}(?:h)?|midi|minuit)" +
    "(?:" +
        "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" +
        "(?:" +
            "(?:\\:|\\：|m)(\\d{0,2})(?:s)?" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" +
    "(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*" +
    "(\\d{1,2}(?:h)?)" +
    "(?:" +
        "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" +
        "(?:" +
            "(?:\\.|\\:|\\：|m)(\\d{1,2})(?:s)?" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function FRTimeExpressionParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return FIRST_REG_PATTERN; }

    this.extract = function(text, ref, match, opt){

        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index + match[1].length;
        result.text  = match[0].substring(match[1].length);
        result.tags['FRTimeExpressionParser'] = true;

        result.start.imply('day',   refMoment.date());
        result.start.imply('month', refMoment.month()+1);
        result.start.imply('year',  refMoment.year());

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.start.assign('second', second);
        }

        // ----- Hours
        if (match[HOUR_GROUP].toLowerCase() == "midi"){
            meridiem = 1;
            hour = 12;
        } else if (match[HOUR_GROUP].toLowerCase() == "minuit") {
            meridiem = 0;
            hour = 0;
        } else {
            hour = parseInt(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if(match[MINUTE_GROUP] != null){
            minute = parseInt(match[MINUTE_GROUP]);
        } else if(hour > 100) {
            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if(match[AM_PM_HOUR_GROUP] != null) {
            if(hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0;
                if(hour == 12) hour = 0;
            }

            if(ampm == "p"){
                meridiem = 1;
                if(hour != 12) hour += 12;
            }
        }
        result.start.assign('hour', hour);
        result.start.assign('minute', minute);
        if (meridiem >= 0) {
            result.start.assign('meridiem', meridiem);
        }

        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================
        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) {
                return null;
            }
            return result;
        }



        // Pattern "YY.YY -XXXX" is more like timezone offset
        if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
            return result;
        }

        if(result.end == null){
            result.end = new ParsedComponents(null, result.start.date());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.end.assign('second', second);
        }

        hour = parseInt(match[2]);

        // ----- Minute
        if (match[MINUTE_GROUP]!= null) {

            minute = parseInt(match[MINUTE_GROUP]);
            if(minute >= 60) return result;

        } else if (hour > 100) {

            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP] != null){

            if (hour > 12) return null;

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a"){
                meridiem = 0;
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            }

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p"){
                meridiem = 1;
                if(hour != 12) hour += 12;
            }

            if (!result.start.isCertain('meridiem')) {
                if (meridiem == 0) {

                    result.start.imply('meridiem', 0);

                    if (result.start.get('hour') == 12) {
                        result.start.assign('hour', 0);
                    }

                } else {

                    result.start.imply('meridiem', 1);

                    if (result.start.get('hour') != 12) {
                        result.start.assign('hour', result.start.get('hour') + 12);
                    }
                }
            }

        } else if(hour >= 12) {
            meridiem = 1;
        }

        result.text = result.text + match[0];
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        if (meridiem >= 0) {
            result.end.assign('meridiem', meridiem);
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply('day', result.end.get('day') + 1)
        }

        return result;
    }
}

},{"../../result":52,"../parser":39,"moment":1}],31:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var updateParsedComponent = require('../EN/ENWeekdayParser').updateParsedComponent;

var DAYS_OFFSET = { 'dimanche': 0, 'dim': 0, 'lundi': 1, 'lun': 1,'mardi': 2, 'mar':2, 'mercredi': 3, 'mer': 3,
    'jeudi': 4, 'jeu':4, 'vendredi': 5, 'ven': 5,'samedi': 6, 'sam': 6};

var PATTERN = new RegExp('(\\s|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:(ce)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(dernier|prochain)\\s*)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function FRWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var modifier = null;
        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        if (prefix || postfix) {
            var norm = prefix || postfix;
            norm = norm.toLowerCase();

            if(norm == 'dernier') {
                modifier = 'last';
            } else if(norm == 'prochain') {
                modifier = 'next';
            } else if(norm== 'ce') {
                modifier = 'this';
            }
        }

        updateParsedComponent(result, ref, offset, modifier);
        result.tags['FRWeekdayParser'] = true;
        return result;
    }
};


},{"../../result":52,"../EN/ENWeekdayParser":17,"../parser":39,"moment":1}],32:[function(require,module,exports){
/*
    
    
*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

exports.Parser = function JPCasualDateParser(){
    
    Parser.apply(this, arguments);
        
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var index = match.index;
        var text = match[0];
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();

        if(text == '今夜' || text == '今夕' || text == '今晩'){
            // Normally means this coming midnight 
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if(text == '明日'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 4) {
                startMoment.add(1, 'day');
            }

        } else if(text == '昨日') {

            startMoment.add(-1, 'day');

        } else if (text.match("今朝")) {

            result.start.imply('hour', 6);
            result.start.imply('meridiem', 0);
        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['JPCasualDateParser'] = true;
        return result;
    }
}


},{"../../result":52,"../parser":39,"moment":1}],33:[function(require,module,exports){
/*
    
    
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/JP'); 
var PATTERN = /(?:(同|((昭和|平成)?([0-9０-９]{2,4})))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
  
var YEAR_GROUP        = 2;
var ERA_GROUP         = 3;
var YEAR_NUMBER_GROUP = 4;
var MONTH_GROUP       = 5;
var DAY_GROUP         = 6;

exports.Parser = function JPStandardParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 

        var startMoment = moment(ref);
        var result = new ParsedResult({
            text: match[0],
            index: match.index,
            ref: ref,
        });
        
        var month = match[MONTH_GROUP];
        month = util.toHankaku(month);
        month = parseInt(month);

        var day = match[DAY_GROUP];
        day = util.toHankaku(day);
        day = parseInt(day);

        startMoment.set('date', day);
        startMoment.set('month', month - 1);
        result.start.assign('day', startMoment.date());
        result.start.assign('month', startMoment.month() + 1);
            
        if (!match[YEAR_GROUP]) {
            
            //Find the most appropriated year
            startMoment.year(moment(ref).year());
            var nextYear = startMoment.clone().add(1, 'y');
            var lastYear = startMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(startMoment.diff(moment(ref))) ){  
                startMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(startMoment.diff(moment(ref))) ){ 
                startMoment = lastYear;
            }

            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.imply('year', startMoment.year());

        } else if (match[YEAR_GROUP].match('同年')) {

            result.start.assign('year', startMoment.year());

        } else {
            var year = match[YEAR_NUMBER_GROUP];
            year = util.toHankaku(year);
            year = parseInt(year);

            if (match[ERA_GROUP] == '平成') {
                year += 1988;
            } else if (match[ERA_GROUP] == '昭和') {
                year += 1925;
            }

            result.start.assign('year', year);
        }
        

        result.tags['JPStandardParser'] = true;
        return result;
    };

}


},{"../../result":52,"../../utils/JP":56,"../parser":39,"moment":1}],34:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp(
    '(而家|立(?:刻|即)|即刻)|' +
    '(今|明|聽|昨|尋|琴)(早|朝|晚)|' +
    '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' +
    '(今|明|聽|昨|尋|琴)(?:日|天)' +
    '(?:[\\s|,|，]*)' +
    '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?', 'i');

var NOW_GROUP = 1;
var DAY_GROUP_1 = 2;
var TIME_GROUP_1 = 3;
var TIME_GROUP_2 = 4;
var DAY_GROUP_3 = 5;
var TIME_GROUP_3 = 6;

exports.Parser = function ZHHantCasualDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        text = match[0];
        var index = match.index;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();

        if (match[NOW_GROUP]) {
            result.start.imply('hour', refMoment.hour());
            result.start.imply('minute', refMoment.minute());
            result.start.imply('second', refMoment.second());
            result.start.imply('millisecond', refMoment.millisecond());
        } else if (match[DAY_GROUP_1]) {
            var day1 = match[DAY_GROUP_1];
            var time1 = match[TIME_GROUP_1];

            if (day1 == '明' || day1 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  startMoment.add(1, 'day');
              }
            } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
                startMoment.add(-1, 'day');
            }

            if (time1 == '早' || time1 == '朝') {
                result.start.imply('hour', 6);
            } else if (time1 == '晚') {
                result.start.imply('hour', 22);
                result.start.imply('meridiem', 1);
            }

        } else if (match[TIME_GROUP_2]) {
            var timeString2 = match[TIME_GROUP_2];
            var time2 = timeString2[0];
            if (time2 == '早' || time2 == '朝' || time2 == '上') {
                result.start.imply('hour', 6);
            } else if (time2 == '下' || time2 == '晏') {
                result.start.imply('hour', 15);
                result.start.imply('meridiem', 1);
            } else if (time2 == '中') {
                result.start.imply('hour', 12);
                result.start.imply('meridiem', 1);
            } else if (time2 == '夜' || time2 == '晚') {
                result.start.imply('hour', 22);
                result.start.imply('meridiem', 1);
            } else if (time2 == '凌') {
                result.start.imply('hour', 0);
            }

        } else if (match[DAY_GROUP_3]) {
            var day3 = match[DAY_GROUP_3];

            if (day3 == '明' || day3 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  startMoment.add(1, 'day');
              }
            } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
                startMoment.add(-1, 'day');
            }


            var timeString3 = match[TIME_GROUP_3];
            if (timeString3) {
                var time3 = timeString3[0];
                if (time3 == '早' || time3 == '朝' || time3 == '上') {
                    result.start.imply('hour', 6);
                } else if (time3 == '下' || time3 == '晏') {
                    result.start.imply('hour', 15);
                    result.start.imply('meridiem', 1);
                } else if (time3 == '中') {
                    result.start.imply('hour', 12);
                    result.start.imply('meridiem', 1);
                } else if (time3 == '夜' || time3 == '晚') {
                    result.start.imply('hour', 22);
                    result.start.imply('meridiem', 1);
                } else if (time3 == '凌') {
                    result.start.imply('hour', 0);
                }
            }
        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags.ZHHantCasualDateParser = true;
        return result;
    };
};

},{"../../result":52,"../parser":39,"moment":1}],35:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util = require('../../utils/ZH-Hant.js');

var PATTERN = new RegExp(
    '(\\d{2,4}|[' + Object.keys(util.NUMBER).join('') + ']{2,4})?' +
    '(?:\\s*)' +
    '(?:年)?' +
    '(?:[\\s|,|，]*)' +
    '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})' +
    '(?:\\s*)' +
    '(?:月)' +
    '(?:\\s*)' +
    '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})?' +
    '(?:\\s*)' +
    '(?:日|號)?'
);

var YEAR_GROUP = 1;
var MONTH_GROUP = 2;
var DAY_GROUP = 3;

exports.Parser = function ZHHantDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        var startMoment = moment(ref);
        var result = new ParsedResult({
            text: match[0],
            index: match.index,
            ref: ref,
        });

        //Month
        var month = parseInt(match[MONTH_GROUP]);
        if (isNaN(month)) month = util.zhStringToNumber(match[MONTH_GROUP]);
        result.start.assign('month', month);

        //Day
        if (match[DAY_GROUP]) {
            var day = parseInt(match[DAY_GROUP]);
            if (isNaN(day)) day = util.zhStringToNumber(match[DAY_GROUP]);
            result.start.assign('day', day);
        } else {
            result.start.imply('day', startMoment.date());
        }

        //Year
        if (match[YEAR_GROUP]) {
            var year = parseInt(match[YEAR_GROUP]);
            if (isNaN(year)) year = util.zhStringToYear(match[YEAR_GROUP]);
            result.start.assign('year', year);
        } else {
            result.start.imply('year', startMoment.year());
        }

        result.tags.ZHHantDateParser = true;
        return result;
    };
};

},{"../../result":52,"../../utils/ZH-Hant.js":57,"../parser":39,"moment":1}],36:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util = require('../../utils/ZH-Hant.js');

var PATTERN = new RegExp(
    '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+|半|幾)(?:\\s*)' +
    '(?:個)?' +
    '(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)' +
    '(?:(?:之|過)?後|(?:之)?內)', 'i'
);

var NUMBER_GROUP = 1;
var UNIT_GROUP = 2;

exports.Parser = function ZHHantCasualDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
      var index = match.index;
      text  = match[0];

      var result = new ParsedResult({
          index: index,
          text: text,
          ref: ref
      });

      var number = parseInt(match[NUMBER_GROUP]);
      if (isNaN(number)){
        number = util.zhStringToNumber(match[NUMBER_GROUP]);
      }

      if (isNaN(number)){
        var string = match[NUMBER_GROUP];
        if (string === '幾'){
          number = 3;
        }else if(string === '半'){
          number = 0.5;
        }else{

          //just in case
          return null;
        }
      }

      var date = moment(ref);
      var unit = match[UNIT_GROUP];
      var unitAbbr = unit[0];

      if (unitAbbr.match(/[日天星禮月年]/)){
        if(unitAbbr == '日' || unitAbbr == '天'){
          date.add(number, 'd');
        }else if(unitAbbr == '星' || unitAbbr == '禮'){
          date.add(number * 7, 'd');
        }else if(unitAbbr == '月'){
          date.add(number, 'month');
        }else if(unitAbbr == '年'){
          date.add(number, 'year');
        }

        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
        result.start.assign('day', date.date());
        return result;
      }

      if(unitAbbr == '秒'){
        date.add(number, 'second');
      }else if(unitAbbr == '分'){
        date.add(number, 'minute');
      }else if(unitAbbr == '小' || unitAbbr == '鐘'){
        date.add(number, 'hour');
      }

      result.start.imply('year', date.year());
      result.start.imply('month', date.month() + 1);
      result.start.imply('day', date.date());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags.ZHHantDeadlineFormatParser = true;
      return result;
    };
};

},{"../../result":52,"../../utils/ZH-Hant.js":57,"../parser":39,"moment":1}],37:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var util = require('../../utils/ZH-Hant.js');

var patternString1 = '(?:由|從|自)?' +
    '(?:' +
    '(今|明|聽|昨|尋|琴)(早|朝|晚)|' +
    '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' +
    '(今|明|聽|昨|尋|琴)(?:日|天)' +
    '(?:[\\s,，]*)' +
    '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' +
    ')?' +
    '(?:[\\s,，]*)' +
    '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' +
    '(?:\\s*)' +
    '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' +
    '(?:\\s*)' +
    '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' +
    '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';

var patternString2 = '(?:\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)' +
    '(?:' +
    '(今|明|聽|昨|尋|琴)(早|朝|晚)|' +
    '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' +
    '(今|明|聽|昨|尋|琴)(?:日|天)' +
    '(?:[\\s,，]*)' +
    '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' +
    ')?' +
    '(?:[\\s,，]*)' +
    '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' +
    '(?:\\s*)' +
    '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' +
    '(?:\\s*)' +
    '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' +
    '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';

var FIRST_REG_PATTERN = new RegExp(patternString1, 'i');
var SECOND_REG_PATTERN = new RegExp(patternString2, 'i');

var DAY_GROUP_1 = 1;
var ZH_AM_PM_HOUR_GROUP_1 = 2;
var ZH_AM_PM_HOUR_GROUP_2 = 3;
var DAY_GROUP_3 = 4;
var ZH_AM_PM_HOUR_GROUP_3 = 5;
var HOUR_GROUP = 6;
var MINUTE_GROUP = 7;
var SECOND_GROUP = 8;
var AM_PM_HOUR_GROUP = 9;

exports.Parser = function ZHHantTimeExpressionParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return FIRST_REG_PATTERN;
    };

    this.extract = function(text, ref, match, opt) {

        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index;
        result.text = match[0];
        result.tags.ZHTimeExpressionParser = true;

        var startMoment = refMoment.clone();

        // ----- Day
        if (match[DAY_GROUP_1]) {
            var day1 = match[DAY_GROUP_1];
            if (day1 == '明' || day1 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  startMoment.add(1, 'day');
              }
            } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
                startMoment.add(-1, 'day');
            }
            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.assign('year', startMoment.year());
        } else if (match[DAY_GROUP_3]) {
            var day3 = match[DAY_GROUP_3];
            if (day3 == '明' || day3 == '聽') {
                startMoment.add(1, 'day');
            } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
                startMoment.add(-1, 'day');
            }
            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.assign('year', startMoment.year());
        } else {
            result.start.imply('day', startMoment.date());
            result.start.imply('month', startMoment.month() + 1);
            result.start.imply('year', startMoment.year());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            var second = parseInt(match[SECOND_GROUP]);
            if (isNaN(second)) {
                second = util.zhStringToNumber(match[SECOND_GROUP]);
            }
            if (second >= 60) return null;
            result.start.assign('second', second);
        }

        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
            hour = util.zhStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] == '半') {
                minute = 30;
            } else if (match[MINUTE_GROUP] == '正' || match[MINUTE_GROUP] == '整') {
                minute = 0;
            } else {
                minute = parseInt(match[MINUTE_GROUP]);
                if (isNaN(minute)) {
                    minute = util.zhStringToNumber(match[MINUTE_GROUP]);
                }
            }
        } else if (hour > 100) {
            minute = hour % 100;
            hour = parseInt(hour / 100);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP]) {
            if (hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            }

            if (ampm == "p") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
            var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
            var zhAMPM1 = zhAMPMString1[0];
            if (zhAMPM1 == '朝' || zhAMPM1 == '早') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM1 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
            var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
            var zhAMPM2 = zhAMPMString2[0];
            if (zhAMPM2 == '上' || zhAMPM2 == '朝' || zhAMPM2 == '早' || zhAMPM2 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM2 == '下' || zhAMPM2 == '晏' || zhAMPM2 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
            var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
            var zhAMPM3 = zhAMPMString3[0];
            if (zhAMPM3 == '上' || zhAMPM3 == '朝' || zhAMPM3 == '早' || zhAMPM3 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM3 == '下' || zhAMPM3 == '晏' || zhAMPM3 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        }

        result.start.assign('hour', hour);
        result.start.assign('minute', minute);

        if (meridiem >= 0) {
            result.start.assign('meridiem', meridiem);
        } else {
            if (hour < 12) {
                result.start.imply('meridiem', 0);
            } else {
                result.start.imply('meridiem', 1);
            }
        }

        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================

        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) {
                return null;
            }
            return result;
        }

        var endMoment = startMoment.clone();
        result.end = new ParsedComponents(null, null);

        // ----- Day
        if (match[DAY_GROUP_1]) {
            var day1 = match[DAY_GROUP_1];
            if (day1 == '明' || day1 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  endMoment.add(1, 'day');
              }
            } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
                endMoment.add(-1, 'day');
            }
            result.end.assign('day', endMoment.date());
            result.end.assign('month', endMoment.month() + 1);
            result.end.assign('year', endMoment.year());
        } else if (match[DAY_GROUP_3]) {
            var day3 = match[DAY_GROUP_3];
            if (day3 == '明' || day3 == '聽') {
                endMoment.add(1, 'day');
            } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
                endMoment.add(-1, 'day');
            }
            result.end.assign('day', endMoment.date());
            result.end.assign('month', endMoment.month() + 1);
            result.end.assign('year', endMoment.year());
        } else {
            result.end.imply('day', endMoment.date());
            result.end.imply('month', endMoment.month() + 1);
            result.end.imply('year', endMoment.year());
        }

        hour = 0;
        minute = 0;
        meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            var second = parseInt(match[SECOND_GROUP]);
            if (isNaN(second)) {
                second = util.zhStringToNumber(match[SECOND_GROUP]);
            }

            if (second >= 60) return null;
            result.end.assign('second', second);
        }

        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
            hour = util.zhStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] == '半') {
                minute = 30;
            } else if (match[MINUTE_GROUP] == '正' || match[MINUTE_GROUP] == '整') {
                minute = 0;
            } else {
                minute = parseInt(match[MINUTE_GROUP]);
                if (isNaN(minute)) {
                    minute = util.zhStringToNumber(match[MINUTE_GROUP]);
                }
            }
        } else if (hour > 100) {
            minute = hour % 100;
            hour = parseInt(hour / 100);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP]) {
            if (hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            }

            if (ampm == "p") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }

            if (!result.start.isCertain('meridiem')) {
                if (meridiem == 0) {

                    result.start.imply('meridiem', 0);

                    if (result.start.get('hour') == 12) {
                        result.start.assign('hour', 0);
                    }

                } else {

                    result.start.imply('meridiem', 1);

                    if (result.start.get('hour') != 12) {
                        result.start.assign('hour', result.start.get('hour') + 12);
                    }
                }
            }

        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
            var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
            var zhAMPM1 = zhAMPMString1[0];
            if (zhAMPM1 == '朝' || zhAMPM1 == '早') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM1 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
            var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
            var zhAMPM2 = zhAMPMString2[0];
            if (zhAMPM2 == '上' || zhAMPM2 == '朝' || zhAMPM2 == '早' || zhAMPM2 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM2 == '下' || zhAMPM2 == '晏' || zhAMPM2 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
            var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
            var zhAMPM3 = zhAMPMString3[0];
            if (zhAMPM3 == '上' || zhAMPM3 == '朝' || zhAMPM3 == '早' || zhAMPM3 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM3 == '下' || zhAMPM3 == '晏' || zhAMPM3 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        }

        result.text = result.text + match[0];
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        if (meridiem >= 0) {
            result.end.assign('meridiem', meridiem);
        } else {
            var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;
            if (startAtPM && result.start.get('hour') > hour) {
                // 10pm - 1 (am)
                result.end.imply('meridiem', 0);

            } else if (hour > 12) {
                result.end.imply('meridiem', 1);
            }
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply('day', result.end.get('day') + 1)
        }

        return result;
    };
};

},{"../../result":52,"../../utils/ZH-Hant.js":57,"../parser":39,"moment":1}],38:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var updateParsedComponent = require('../EN/ENWeekdayParser').updateParsedComponent;

var util = require('../../utils/ZH-Hant.js');

var PATTERN = new RegExp(
    '(上|今|下|這|呢)?' +
    '(?:個)?' +
    '(?:星期|禮拜)' +
    '(' + Object.keys(util.WEEKDAY_OFFSET).join('|') + ')'
);

var PREFIX_GROUP = 1;
var WEEKDAY_GROUP = 2;

exports.Parser = function ZHHantWeekdayParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        var index = match.index;
        text = match[0];
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP];
        var offset = util.WEEKDAY_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var modifier = null;
        var prefix = match[PREFIX_GROUP];

        if(prefix == '上') {
            modifier = 'last';
        } else if(prefix == '下') {
            modifier = 'next';
        } else if(prefix == '今' || prefix == '這' || prefix == '呢') {
            modifier = 'this';
        }

        updateParsedComponent(result, ref, offset, modifier);
        result.tags['ZHHantWeekdayParser'] = true;
        return result;
    };
};

},{"../../result":52,"../../utils/ZH-Hant.js":57,"../EN/ENWeekdayParser":17,"../parser":39,"moment":1}],39:[function(require,module,exports){

function Parser(strictMode) {

    this.isStrictMode = function() { return (strictMode == true) };

    this.pattern = function() { return /./i; }

    this.extract = function(text, ref, match, opt){ return null; }

    this.execute = function(text, ref, opt) {

        var results = [];
        var regex = this.pattern();

        var remainingText = text;
        var match = regex.exec(remainingText);

        while (match) {

            // Calculate match index on the full text;
            match.index += text.length - remainingText.length;

            var result = this.extract(text, ref, match, opt);
            if (result) {

                // If success, start from the end of the result
                remainingText = text.substring(result.index + result.text.length);

                if (!this.isStrictMode() || result.hasPossibleDates()) {
                    results.push(result);
                }

            } else {
                // If fail, move on by 1
                remainingText = text.substring(match.index + 1);
            }

            match = regex.exec(remainingText);
        }

        if (this.refiners) {
            this.refiners.forEach(function () {
                results = refiner.refine(results, text, options);
            });
        }

        return results;
    }
}

exports.Parser = Parser;

exports.ENISOFormatParser = require('./EN/ENISOFormatParser').Parser;
exports.ENDeadlineFormatParser = require('./EN/ENDeadlineFormatParser').Parser;
exports.ENRelativeDateFormatParser = require('./EN/ENRelativeDateFormatParser').Parser;
exports.ENMonthNameLittleEndianParser = require('./EN/ENMonthNameLittleEndianParser').Parser;
exports.ENMonthNameMiddleEndianParser = require('./EN/ENMonthNameMiddleEndianParser').Parser;
exports.ENMonthNameParser = require('./EN/ENMonthNameParser').Parser;
exports.ENSlashDateFormatParser = require('./EN/ENSlashDateFormatParser').Parser;
exports.ENSlashDateFormatStartWithYearParser = require('./EN/ENSlashDateFormatStartWithYearParser').Parser;
exports.ENSlashMonthFormatParser = require('./EN/ENSlashMonthFormatParser').Parser;
exports.ENTimeAgoFormatParser = require('./EN/ENTimeAgoFormatParser').Parser;
exports.ENTimeExpressionParser = require('./EN/ENTimeExpressionParser').Parser;
exports.ENWeekdayParser = require('./EN/ENWeekdayParser').Parser;
exports.ENCasualDateParser = require('./EN/ENCasualDateParser').Parser;
exports.ENCasualTimeParser = require('./EN/ENCasualTimeParser').Parser;

exports.JPStandardParser = require('./JP/JPStandardParser').Parser;
exports.JPCasualDateParser = require('./JP/JPCasualDateParser').Parser;


exports.ESCasualDateParser = require('./ES/ESCasualDateParser').Parser;
exports.ESDeadlineFormatParser = require('./ES/ESDeadlineFormatParser').Parser;
exports.ESTimeAgoFormatParser = require('./ES/ESTimeAgoFormatParser').Parser;
exports.ESTimeExpressionParser = require('./ES/ESTimeExpressionParser').Parser;
exports.ESWeekdayParser = require('./ES/ESWeekdayParser').Parser;
exports.ESMonthNameLittleEndianParser = require('./ES/ESMonthNameLittleEndianParser').Parser;
exports.ESSlashDateFormatParser = require('./ES/ESSlashDateFormatParser').Parser;

exports.FRCasualDateParser = require('./FR/FRCasualDateParser').Parser;
exports.FRDeadlineFormatParser = require('./FR/FRDeadlineFormatParser').Parser;
exports.FRMonthNameLittleEndianParser = require('./FR/FRMonthNameLittleEndianParser').Parser;
exports.FRSlashDateFormatParser = require('./FR/FRSlashDateFormatParser').Parser;
exports.FRTimeAgoFormatParser = require('./FR/FRTimeAgoFormatParser').Parser;
exports.FRTimeExpressionParser = require('./FR/FRTimeExpressionParser').Parser;
exports.FRWeekdayParser = require('./FR/FRWeekdayParser').Parser;

exports.ZHHantDateParser = require('./ZH-Hant/ZHHantDateParser').Parser;
exports.ZHHantWeekdayParser = require('./ZH-Hant/ZHHantWeekdayParser').Parser;
exports.ZHHantTimeExpressionParser = require('./ZH-Hant/ZHHantTimeExpressionParser').Parser;
exports.ZHHantCasualDateParser = require('./ZH-Hant/ZHHantCasualDateParser').Parser;
exports.ZHHantDeadlineFormatParser = require('./ZH-Hant/ZHHantDeadlineFormatParser').Parser;


},{"./EN/ENCasualDateParser":4,"./EN/ENCasualTimeParser":5,"./EN/ENDeadlineFormatParser":6,"./EN/ENISOFormatParser":7,"./EN/ENMonthNameLittleEndianParser":8,"./EN/ENMonthNameMiddleEndianParser":9,"./EN/ENMonthNameParser":10,"./EN/ENRelativeDateFormatParser":11,"./EN/ENSlashDateFormatParser":12,"./EN/ENSlashDateFormatStartWithYearParser":13,"./EN/ENSlashMonthFormatParser":14,"./EN/ENTimeAgoFormatParser":15,"./EN/ENTimeExpressionParser":16,"./EN/ENWeekdayParser":17,"./ES/ESCasualDateParser":18,"./ES/ESDeadlineFormatParser":19,"./ES/ESMonthNameLittleEndianParser":20,"./ES/ESSlashDateFormatParser":21,"./ES/ESTimeAgoFormatParser":22,"./ES/ESTimeExpressionParser":23,"./ES/ESWeekdayParser":24,"./FR/FRCasualDateParser":25,"./FR/FRDeadlineFormatParser":26,"./FR/FRMonthNameLittleEndianParser":27,"./FR/FRSlashDateFormatParser":28,"./FR/FRTimeAgoFormatParser":29,"./FR/FRTimeExpressionParser":30,"./FR/FRWeekdayParser":31,"./JP/JPCasualDateParser":32,"./JP/JPStandardParser":33,"./ZH-Hant/ZHHantCasualDateParser":34,"./ZH-Hant/ZHHantDateParser":35,"./ZH-Hant/ZHHantDeadlineFormatParser":36,"./ZH-Hant/ZHHantTimeExpressionParser":37,"./ZH-Hant/ZHHantWeekdayParser":38}],40:[function(require,module,exports){
/*
  
*/
var Refiner = require('../refiner').Refiner;

exports.Refiner = function ENMergeDateRangeRefiner() {
    Refiner.call(this);

    this.pattern = function () { return /^\s*(to|\-)\s*$/i };

    this.refine = function(text, results, opt) {

        if (results.length < 2) return results;
        
        var mergedResult = [];
        var currResult = null;
        var prevResult = null;
        
        for (var i=1; i<results.length; i++){
            
            currResult = results[i];
            prevResult = results[i-1];
            
            if (!prevResult.end && !currResult.end 
                && this.isAbleToMerge(text, prevResult, currResult)) {
              
                prevResult = this.mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;
            }
            
            mergedResult.push(prevResult);
        }
        
        if (currResult != null) {
            mergedResult.push(currResult);
        }


        return mergedResult;
    };

    this.isAbleToMerge = function(text, result1, result2) {
        var begin = result1.index + result1.text.length;
        var end   = result2.index;
        var textBetween = text.substring(begin,end);

        return textBetween.match(this.pattern());
    };

    this.isWeekdayResult = function (result) {
        return result.start.isCertain('weekday') && !result.start.isCertain('day');
    };

    this.mergeResult = function(text, fromResult, toResult) {

        if (!this.isWeekdayResult(fromResult) && !this.isWeekdayResult(toResult)) {

            for (var key in toResult.start.knownValues) {
                if (!fromResult.start.isCertain(key)) {
                    fromResult.start.assign(key, toResult.start.get(key));
                }
            }

            for (var key in fromResult.start.knownValues) {
                if (!toResult.start.isCertain(key)) {
                    toResult.start.assign(key, fromResult.start.get(key));
                }
            }
        }

        if (fromResult.start.date().getTime() > toResult.start.date().getTime()) {
            var tmp = toResult;
            toResult = fromResult;
            fromResult = tmp;
        }
        
        fromResult.end = toResult.start;

        

        for (var tag in toResult.tags) {
            fromResult.tags[tag] = true;
        }

            
        var startIndex = Math.min(fromResult.index, toResult.index);
        var endIndex = Math.max(
            fromResult.index + fromResult.text.length, 
            toResult.index + toResult.text.length);
            
        fromResult.index = startIndex;
        fromResult.text  = text.substring(startIndex, endIndex);
        fromResult.tags[this.constructor.name] = true;
        return fromResult;
    }
};


},{"../refiner":51}],41:[function(require,module,exports){
/*
    
*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;



var PATTERN = new RegExp("^\\s*(T|at|after|before|on|of|,|-)?\\s*$");

function isDateOnly(result) {
    return !result.start.isCertain('hour');
}
    
function isTimeOnly(result) {
    return !result.start.isCertain('month') && !result.start.isCertain('weekday');
}


function isAbleToMerge(text, prevResult, curResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
    return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult){

    var beginDate = dateResult.start;
    var beginTime = timeResult.start;
        
    var beginDateTime = beginDate.clone();
    beginDateTime.assign('hour', beginTime.get('hour'));
    beginDateTime.assign('minute', beginTime.get('minute'));
    beginDateTime.assign('second', beginTime.get('second'));
        
    if (beginTime.isCertain('meridiem')) {
        beginDateTime.assign('meridiem', beginTime.get('meridiem'));
    } else if (
        beginTime.get('meridiem') !== undefined &&
        beginDateTime.get('meridiem') === undefined
    ) {
        beginDateTime.imply('meridiem', beginTime.get('meridiem'));
    }

    if (beginDateTime.get('meridiem') == 1 && beginDateTime.get('hour') < 12) {
        beginDateTime.assign('hour', beginDateTime.get('hour') + 12);
    }

    if (dateResult.end != null || timeResult.end != null) {
        
        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;            
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;

        var endDateTime = endDate.clone();
        endDateTime.assign('hour', endTime.get('hour'));
        endDateTime.assign('minute', endTime.get('minute'));
        endDateTime.assign('second', endTime.get('second'));
        
        if (endTime.isCertain('meridiem')) {
            endDateTime.assign('meridiem', endTime.get('meridiem'));
        } else if (beginTime.get('meridiem') != null) {
            endDateTime.imply('meridiem', endTime.get('meridiem'));
        }
        
        if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
            // Ex. 9pm - 1am
            if (endDateTime.isCertain('day')) {
                endDateTime.assign('day', endDateTime.get('day') + 1);
            } else {
                endDateTime.imply('day', endDateTime.get('day') + 1);
            }
        }

        dateResult.end = endDateTime;
    }

    dateResult.start = beginDateTime;    

    var startIndex = Math.min(dateResult.index, timeResult.index);
    var endIndex = Math.max(
            dateResult.index + dateResult.text.length, 
            timeResult.index + timeResult.text.length);
    
    dateResult.index = startIndex;
    dateResult.text  = text.substring(startIndex, endIndex);

    for (var tag in timeResult.tags) {
        dateResult.tags[tag] = true;
    }
    dateResult.tags['ENMergeDateAndTimeRefiner'] = true;
    return dateResult;
}

exports.Refiner = function ENMergeDateTimeRefiner() {
    Refiner.call(this);


    this.refine = function(text, results, opt) { 

        if (results.length < 2) return results;

        var mergedResult = [];
        var currResult = null;
        var prevResult = null;

        for (var i = 1; i < results.length; i++) {

            currResult = results[i];
            prevResult = results[i-1];
            
            if (isDateOnly(prevResult) && isTimeOnly(currResult) 
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;
                
            } else if (isDateOnly(currResult) && isTimeOnly(prevResult)
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, currResult, prevResult);
                currResult = null;
                i += 1;
            }
            
            mergedResult.push(prevResult);
        }

        if (currResult != null) {
            mergedResult.push(currResult);
        }

        return mergedResult;
    }
}
},{"../../result":52,"../refiner":51}],42:[function(require,module,exports){
/*

*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;


var PATTERN = new RegExp("^\\s*(at|after|before|on|,|-|\\(|\\))?\\s*$");

function isMoreSpecific(prevResult, currResult) {
    var moreSpecific = false;

    if (prevResult.start.isCertain('year')) {
        if (!currResult.start.isCertain('year')) {
            moreSpecific = true;
        } else {
            if (prevResult.start.isCertain('month')) {
                if (!currResult.start.isCertain('month')) {
                    moreSpecific = true;
                } else {
                    if (prevResult.start.isCertain('day') && !currResult.start.isCertain('day')) {
                        moreSpecific = true;
                    }
                }
            }
        }
    }

    return moreSpecific;
}


function isAbleToMerge(text, prevResult, currResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, currResult.index);

    // Only accepts merge if one of them comes from casual relative date
    var includesRelativeResult = (prevResult.tags['ENRelativeDateFormatParser'] || currResult.tags['ENRelativeDateFormatParser']);

    // We assume they refer to the same date if all date fields are implied
    var referToSameDate = !prevResult.start.isCertain('day') && !prevResult.start.isCertain('month') && !prevResult.start.isCertain('year');

    // If both years are certain, that determines if they refer to the same date
    // but with one more specific than the other
    if (prevResult.start.isCertain('year') && currResult.start.isCertain('year'))
        referToSameDate = (prevResult.start.get('year') === currResult.start.get('year'));

    // We now test with the next level (month) if they refer to the same date
    if (prevResult.start.isCertain('month') && currResult.start.isCertain('month'))
        referToSameDate = (prevResult.start.get('month') === currResult.start.get('month')) && referToSameDate;

    return includesRelativeResult && textBetween.match(PATTERN) && referToSameDate;
}

function mergeResult(text, specificResult, nonSpecificResult){

    var specificDate = specificResult.start;
    var nonSpecificDate = nonSpecificResult.start;

    var startIndex = Math.min(specificResult.index, nonSpecificResult.index);
    var endIndex = Math.max(
            specificResult.index + specificResult.text.length,
            nonSpecificResult.index + nonSpecificResult.text.length);

    specificResult.index = startIndex;
    specificResult.text  = text.substring(startIndex, endIndex);

    for (var tag in nonSpecificResult.tags) {
        specificResult.tags[tag] = true;
    }
    specificResult.tags['ENPrioritizeSpecificDateRefiner'] = true;
    return specificResult;
}

exports.Refiner = function ENPrioritizeSpecificDateRefiner() {
    Refiner.call(this);

    this.refine = function(text, results, opt) {

        if (results.length < 2) return results;

        var mergedResult = [];
        var currResult = null;
        var prevResult = null;

        for (var i = 1; i < results.length; i++) {

            currResult = results[i];
            prevResult = results[i-1];

            if (isMoreSpecific(prevResult, currResult)
                    && isAbleToMerge(text, prevResult, currResult)) {

                prevResult = mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;

            } else if (isMoreSpecific(currResult, prevResult)
                    && isAbleToMerge(text, prevResult, currResult)) {

                prevResult = mergeResult(text, currResult, prevResult);
                currResult = null;
                i += 1;
            }

            mergedResult.push(prevResult);
        }

        if (currResult != null) {
            mergedResult.push(currResult);
        }

        return mergedResult;
    }
}

},{"../../result":52,"../refiner":51}],43:[function(require,module,exports){
/*

*/
var Refiner = require('./refiner').Refiner;

// Map ABBR -> Offset in minute
var TIMEZONE_ABBR_MAP = {};
var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", 'i');

exports.Refiner = function ExtractTimezoneAbbrRefiner() {
	Refiner.call(this);

	this.refine = function(text, results, opt) {

		results.forEach(function(result) {

            if (!result.tags['ENTimeExpressionParser'] && !result.tags['ZHTimeExpressionParser'] && !result.tags['FRTimeExpressionParser']) {
                return;
            }

            var match = TIMEZONE_NAME_PATTERN.exec(text.substring(result.index + result.text.length));
            if (match) {
                var timezoneAbbr = match[1].toUpperCase();
                if (TIMEZONE_ABBR_MAP[timezoneAbbr] === undefined) {
                    return;
                }

                var timezoneOffset = TIMEZONE_ABBR_MAP[timezoneAbbr];
                if (!result.start.isCertain('timezoneOffset')) {
                    result.start.assign('timezoneOffset', timezoneOffset);
                }

                if (result.end != null && !result.end.isCertain('timezoneOffset')) {
                    result.end.assign('timezoneOffset', timezoneOffset);
                }

                result.text += match[0];
                result.tags['ExtractTimezoneAbbrRefiner'] = true;
            }
		});

        return results;
	}
}

// TODO: Move this to some configuration
TIMEZONE_ABBR_MAP = {"ACDT":630,"ACST":570,"ADT":-180,"AEDT":660,"AEST":600,"AFT":270,"AKDT":-480,"AKST":-540,"ALMT":360,"AMST":-180,"AMT":-240,"ANAST":720,"ANAT":720,"AQTT":300,"ART":-180,"AST":-240,"AWDT":540,"AWST":480,"AZOST":0,"AZOT":-60,"AZST":300,"AZT":240,"BNT":480,"BOT":-240,"BRST":-120,"BRT":-180,"BST":60,"BTT":360,"CAST":480,"CAT":120,"CCT":390,"CDT":-300,"CEST":120,"CET":60,"CHADT":825,"CHAST":765,"CKT":-600,"CLST":-180,"CLT":-240,"COT":-300,"CST":-360,"CVT":-60,"CXT":420,"ChST":600,"DAVT":420,"EASST":-300,"EAST":-360,"EAT":180,"ECT":-300,"EDT":-240,"EEST":180,"EET":120,"EGST":0,"EGT":-60,"EST":-300,"ET":-300,"FJST":780,"FJT":720,"FKST":-180,"FKT":-240,"FNT":-120,"GALT":-360,"GAMT":-540,"GET":240,"GFT":-180,"GILT":720,"GMT":0,"GST":240,"GYT":-240,"HAA":-180,"HAC":-300,"HADT":-540,"HAE":-240,"HAP":-420,"HAR":-360,"HAST":-600,"HAT":-90,"HAY":-480,"HKT":480,"HLV":-210,"HNA":-240,"HNC":-360,"HNE":-300,"HNP":-480,"HNR":-420,"HNT":-150,"HNY":-540,"HOVT":420,"ICT":420,"IDT":180,"IOT":360,"IRDT":270,"IRKST":540,"IRKT":540,"IRST":210,"IST":60,"JST":540,"KGT":360,"KRAST":480,"KRAT":480,"KST":540,"KUYT":240,"LHDT":660,"LHST":630,"LINT":840,"MAGST":720,"MAGT":720,"MART":-510,"MAWT":300,"MDT":-360,"MESZ":120,"MEZ":60,"MHT":720,"MMT":390,"MSD":240,"MSK":240,"MST":-420,"MUT":240,"MVT":300,"MYT":480,"NCT":660,"NDT":-90,"NFT":690,"NOVST":420,"NOVT":360,"NPT":345,"NST":-150,"NUT":-660,"NZDT":780,"NZST":720,"OMSST":420,"OMST":420,"PDT":-420,"PET":-300,"PETST":720,"PETT":720,"PGT":600,"PHOT":780,"PHT":480,"PKT":300,"PMDT":-120,"PMST":-180,"PONT":660,"PST":-480,"PT":-480,"PWT":540,"PYST":-180,"PYT":-240,"RET":240,"SAMT":240,"SAST":120,"SBT":660,"SCT":240,"SGT":480,"SRT":-180,"SST":-660,"TAHT":-600,"TFT":300,"TJT":300,"TKT":780,"TLT":540,"TMT":300,"TVT":720,"ULAT":480,"UTC":0,"UYST":-120,"UYT":-180,"UZT":300,"VET":-210,"VLAST":660,"VLAT":660,"VUT":660,"WAST":120,"WAT":60,"WEST":60,"WESZ":60,"WET":0,"WEZ":0,"WFT":720,"WGST":-120,"WGT":-180,"WIB":420,"WIT":540,"WITA":480,"WST":780,"WT":0,"YAKST":600,"YAKT":600,"YAPT":600,"YEKST":360,"YEKT":360}

},{"./refiner":51}],44:[function(require,module,exports){
/*
  
*/
var Refiner = require('./refiner').Refiner;


var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(GMT|UTC)?(\\+|\\-)(\\d{1,2}):?(\\d{2})", 'i');
var TIMEZONE_OFFSET_SIGN_GROUP = 2;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 3;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 4;

exports.Refiner = function ExtractTimezoneOffsetRefiner() {
    Refiner.call(this);

    this.refine = function(text, results, opt) {

        results.forEach(function(result) {

            if (result.start.isCertain('timezoneOffset')) {
                return;
            }

            var match = TIMEZONE_OFFSET_PATTERN.exec(text.substring(result.index + result.text.length));
            if (!match) {
                return;
            }

            var hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
            var minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP]);
            var timezoneOffset = hourOffset * 60 + minuteOffset;
            if (match[TIMEZONE_OFFSET_SIGN_GROUP] === '-') {
                timezoneOffset = -timezoneOffset;
            }

            if (result.end != null) {
                result.end.assign('timezoneOffset', timezoneOffset);
            }

            result.start.assign('timezoneOffset', timezoneOffset);
            result.text += match[0];
            result.tags['ExtractTimezoneOffsetRefiner'] = true;
        });

        return results;
    }
}

},{"./refiner":51}],45:[function(require,module,exports){
/*
  
*/
var Refiner = require('../refiner').Refiner;

exports.Refiner = function FRMergeDateRangeRefiner() {
    Refiner.call(this);

    this.pattern = function () { return /^\s*(à|a|\-)\s*$/i };

    this.refine = function(text, results, opt) {

        if (results.length < 2) return results;
        
        var mergedResult = [];
        var currResult = null;
        var prevResult = null;
        
        for (var i=1; i<results.length; i++){
            
            currResult = results[i];
            prevResult = results[i-1];
            
            if (!prevResult.end && !currResult.end 
                && this.isAbleToMerge(text, prevResult, currResult)) {
              
                prevResult = this.mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;
            }
            
            mergedResult.push(prevResult);
        }
        
        if (currResult != null) {
            mergedResult.push(currResult);
        }


        return mergedResult;
    };

    this.isAbleToMerge = function(text, result1, result2) {
        var begin = result1.index + result1.text.length;
        var end   = result2.index;
        var textBetween = text.substring(begin,end);

        return textBetween.match(this.pattern());
    };

    this.isWeekdayResult = function (result) {
        return result.start.isCertain('weekday') && !result.start.isCertain('day');
    };

    this.mergeResult = function(text, fromResult, toResult) {

        if (!this.isWeekdayResult(fromResult) && !this.isWeekdayResult(toResult)) {

            for (var key in toResult.start.knownValues) {
                if (!fromResult.start.isCertain(key)) {
                    fromResult.start.assign(key, toResult.start.get(key));
                }
            }

            for (var key in fromResult.start.knownValues) {
                if (!toResult.start.isCertain(key)) {
                    toResult.start.assign(key, fromResult.start.get(key));
                }
            }
        }

        if (fromResult.start.date().getTime() > toResult.start.date()) {
            var tmp = toResult;
            toResult = fromResult;
            fromResult = tmp;
        }
        
        fromResult.end = toResult.start;

        

        for (var tag in toResult.tags) {
            fromResult.tags[tag] = true;
        }

            
        var startIndex = Math.min(fromResult.index, toResult.index);
        var endIndex = Math.max(
            fromResult.index + fromResult.text.length, 
            toResult.index + toResult.text.length);
            
        fromResult.index = startIndex;
        fromResult.text  = text.substring(startIndex, endIndex);
        fromResult.tags[this.constructor.name] = true;
        return fromResult;
    }
};


},{"../refiner":51}],46:[function(require,module,exports){
/*
    
*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;



var PATTERN = new RegExp("^\\s*(T|à|a|vers|de|,|-)?\\s*$");

function isDateOnly(result) {
    return !result.start.isCertain('hour') || result.tags['FRCasualDateParser'];
}
    
function isTimeOnly(result) {
    return !result.start.isCertain('month') && !result.start.isCertain('weekday');
}


function isAbleToMerge(text, prevResult, curResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
    return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult){

    var beginDate = dateResult.start;
    var beginTime = timeResult.start;
        
    var beginDateTime = beginDate.clone();
    beginDateTime.assign('hour', beginTime.get('hour'));
    beginDateTime.assign('minute', beginTime.get('minute'));
    beginDateTime.assign('second', beginTime.get('second'));
        
    if (beginTime.isCertain('meridiem')) {
        beginDateTime.assign('meridiem', beginTime.get('meridiem'));
    } else if (
        beginTime.get('meridiem') !== undefined &&
        beginDateTime.get('meridiem') === undefined
    ) {
        beginDateTime.imply('meridiem', beginTime.get('meridiem'));
    }

    if (beginDateTime.get('meridiem') == 1 && beginDateTime.get('hour') < 12) {
        beginDateTime.assign('hour', beginDateTime.get('hour') + 12);
    }

    if (dateResult.end != null || timeResult.end != null) {
        
        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;            
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;

        var endDateTime = endDate.clone();
        endDateTime.assign('hour', endTime.get('hour'));
        endDateTime.assign('minute', endTime.get('minute'));
        endDateTime.assign('second', endTime.get('second'));
        
        if (endTime.isCertain('meridiem')) {
            endDateTime.assign('meridiem', endTime.get('meridiem'));
        } else if (beginTime.get('meridiem') != null) {
            endDateTime.imply('meridiem', endTime.get('meridiem'));
        }
        
        if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
            // Ex. 9pm - 1am
            if (endDateTime.isCertain('day')) {
                endDateTime.assign('day', endDateTime.get('day') + 1);
            } else {
                endDateTime.imply('day', endDateTime.get('day') + 1);
            }
        }

        dateResult.end = endDateTime;
    }

    dateResult.start = beginDateTime;    

    var startIndex = Math.min(dateResult.index, timeResult.index);
    var endIndex = Math.max(
            dateResult.index + dateResult.text.length, 
            timeResult.index + timeResult.text.length);
    
    dateResult.index = startIndex;
    dateResult.text  = text.substring(startIndex, endIndex);

    for (var tag in timeResult.tags) {
        dateResult.tags[tag] = true;
    }
    dateResult.tags['FRMergeDateAndTimeRefiner'] = true;
    return dateResult;
}

exports.Refiner = function FRMergeDateTimeRefiner() {
    Refiner.call(this);


    this.refine = function(text, results, opt) { 

        if (results.length < 2) return results;

        var mergedResult = [];
        var currResult = null;
        var prevResult = null;

        for (var i = 1; i < results.length; i++) {

            currResult = results[i];
            prevResult = results[i-1];
            
            if (isDateOnly(prevResult) && isTimeOnly(currResult) 
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;
                
            } else if (isDateOnly(currResult) && isTimeOnly(prevResult)
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, currResult, prevResult);
                currResult = null;
                i += 1;
            }
            
            mergedResult.push(prevResult);
        }

        if (currResult != null) {
            mergedResult.push(currResult);
        }

        return mergedResult;
    }
}
},{"../../result":52,"../refiner":51}],47:[function(require,module,exports){
/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/
var moment = require('moment');
var Refiner = require('./refiner').Refiner;

exports.Refiner = function ForwardDateRefiner() {
    Refiner.call(this);

    this.refine = function(text, results, opt) {

        if (!opt['forwardDate'] && !opt['forwardDatesOnly']) {
            return results;
        }

        results.forEach(function(result) {

            var refMoment = moment(result.ref);

            if (result.start.isCertain('day') && result.start.isCertain('month') &&
                !result.start.isCertain('year') &&
                refMoment.isAfter(result.start.moment())
            ) {
                // Adjust year into the future
                for (var i=0; i < 3 && refMoment.isAfter(result.start.moment()); i++) {
                    result.start.imply('year', result.start.get('year') + 1);

                    if (result.end && !result.end.isCertain('year')) {
                        result.end.imply('year', result.end.get('year') + 1);
                    }
                }

                result.tags['ExtractTimezoneOffsetRefiner'] = true;
            }

            if (!result.start.isCertain('day') && !result.start.isCertain('month') && !result.start.isCertain('year') &&
                result.start.isCertain('weekday') &&
                refMoment.isAfter(result.start.moment())
            ) {
                // Adjust date to the coming week
                if (refMoment.day() > result.start.get('weekday')) {
                    refMoment.day(result.start.get('weekday') + 7);
                } else {
                    refMoment.day(result.start.get('weekday'));
                }

                result.start.imply('day', refMoment.date());
                result.start.imply('month', refMoment.month() + 1);
                result.start.imply('year', refMoment.year());
                result.tags['ExtractTimezoneOffsetRefiner'] = true;
            }
        });

        return results;
    }
};

},{"./refiner":51,"moment":1}],48:[function(require,module,exports){
/*
  
*/
var ENMergeDateRangeRefiner = require('../EN/ENMergeDateRangeRefiner').Refiner;

exports.Refiner = function JPMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner.call(this);

    this.pattern = function () { return /^\s*(から|ー)\s*$/i };
}


},{"../EN/ENMergeDateRangeRefiner":40}],49:[function(require,module,exports){
/*
  
*/
var Refiner = require('./refiner').Refiner;

exports.Refiner = function OverlapRemovalRefiner() {
	Refiner.call(this);
	

	this.refine = function(text, results, opt) { 

        if (results.length < 2) return results;
        
        var filteredResults = [];
        var prevResult = results[0];
        
        for (var i=1; i<results.length; i++){
            
            var result = results[i];
            
            // If overlap, compare the length and discard the shorter one
            if (result.index < prevResult.index + prevResult.text.length) {

                if (result.text.length > prevResult.text.length){
                    prevResult = result;
                }
                
            } else {
                filteredResults.push(prevResult);
                prevResult = result;
            }
        }
        
        // The last one
        if (prevResult != null) {
            filteredResults.push(prevResult);
        }

        return filteredResults;
    }
}
},{"./refiner":51}],50:[function(require,module,exports){
/*
  
*/
var Filter = require('./refiner').Filter;

exports.Refiner = function UnlikelyFormatFilter() {
    Filter.call(this);
    

    this.isValid = function(text, result, opt) { 

        if (result.text.replace(' ','').match(/^\d*(\.\d*)?$/)) {
            return false;
        }

        return true; 
    }
}
},{"./refiner":51}],51:[function(require,module,exports){

exports.Refiner = function Refiner() { 

    this.refine = function(text, results, opt) { return results; };
}

exports.Filter = function Filter() { 
    
    exports.Refiner.call(this);

    this.isValid = function(text, result, opt) { return true; }
    this.refine = function(text, results, opt) { 

        var filteredResult = [];
        for (var i=0; i < results.length; i++) {

            var result = results[i];
            if (this.isValid(text, result, opt)) {
                filteredResult.push(result);
            }
        }

        return filteredResult;
    }
}


// Common refiners
exports.OverlapRemovalRefiner = require('./OverlapRemovalRefiner').Refiner;
exports.ExtractTimezoneOffsetRefiner = require('./ExtractTimezoneOffsetRefiner').Refiner;
exports.ExtractTimezoneAbbrRefiner = require('./ExtractTimezoneAbbrRefiner').Refiner;
exports.ForwardDateRefiner = require('./ForwardDateRefiner').Refiner;
exports.UnlikelyFormatFilter = require('./UnlikelyFormatFilter').Refiner;

// EN refiners
exports.ENMergeDateTimeRefiner = require('./EN/ENMergeDateTimeRefiner').Refiner;
exports.ENMergeDateRangeRefiner = require('./EN/ENMergeDateRangeRefiner').Refiner;
exports.ENPrioritizeSpecificDateRefiner = require('./EN/ENPrioritizeSpecificDateRefiner').Refiner;

// JP refiners
exports.JPMergeDateRangeRefiner = require('./JP/JPMergeDateRangeRefiner').Refiner;

// FR refiners
exports.FRMergeDateRangeRefiner = require('./FR/FRMergeDateRangeRefiner').Refiner;
exports.FRMergeDateTimeRefiner = require('./FR/FRMergeDateTimeRefiner').Refiner;

},{"./EN/ENMergeDateRangeRefiner":40,"./EN/ENMergeDateTimeRefiner":41,"./EN/ENPrioritizeSpecificDateRefiner":42,"./ExtractTimezoneAbbrRefiner":43,"./ExtractTimezoneOffsetRefiner":44,"./FR/FRMergeDateRangeRefiner":45,"./FR/FRMergeDateTimeRefiner":46,"./ForwardDateRefiner":47,"./JP/JPMergeDateRangeRefiner":48,"./OverlapRemovalRefiner":49,"./UnlikelyFormatFilter":50}],52:[function(require,module,exports){
var moment = require('moment');

function ParsedResult(result){
    result = result || {};

    this.ref   = result.ref;
    this.index = result.index;
    this.text  = result.text;
    this.tags  = result.tags || {};

    this.start = new ParsedComponents(result.start, result.ref)
    if(result.end){
        this.end = new ParsedComponents(result.end, result.ref)
    }
}

ParsedResult.prototype.clone = function() {
    var result = new ParsedResult(this);
    result.tags = JSON.parse(JSON.stringify(this.tags));
    result.start = this.start.clone();
    if (this.end) {
        result.end = this.end.clone();
    }
}

ParsedResult.prototype.hasPossibleDates = function() {
    return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
}


function ParsedComponents (components, ref){

    this.knownValues = {};
    this.impliedValues = {};

    if (components) {
        for (key in components) {
            this.knownValues[key] = components[key];
        }
    }

    if (ref) {
        ref = moment(ref);
        this.imply('day', ref.date())
        this.imply('month', ref.month() + 1)
        this.imply('year', ref.year())
    }
    

    this.imply('hour', 12);
    this.imply('minute', 0);
    this.imply('second', 0);
    this.imply('millisecond', 0);
}

ParsedComponents.prototype.clone = function () {
    var component = new ParsedComponents();
    component.knownValues = JSON.parse(JSON.stringify(this.knownValues));
    component.impliedValues = JSON.parse(JSON.stringify(this.impliedValues));
    return component;
};

ParsedComponents.prototype.get = function(component, value) {
    if (component in this.knownValues) return this.knownValues[component];
    if (component in this.impliedValues) return this.impliedValues[component];
};

ParsedComponents.prototype.assign = function(component, value) {
    this.knownValues[component] = value;
    delete this.impliedValues[component];
};

ParsedComponents.prototype.imply = function(component, value) {
    if (component in this.knownValues) return;
    this.impliedValues[component] = value;
};

ParsedComponents.prototype.isCertain = function(component) {
    return component in this.knownValues;
};

ParsedComponents.prototype.isPossibleDate = function() {
    var dateMoment = this.moment();
    if (this.isCertain('timezoneOffset')) {
        dateMoment.utcOffset(this.get('timezoneOffset'))
    }

    if (dateMoment.get('year') != this.get('year')) return false;
    if (dateMoment.get('month') != this.get('month')-1) return false;
    if (dateMoment.get('date') != this.get('day')) return false;
    if (dateMoment.get('hour') != this.get('hour')) return false;
    if (dateMoment.get('minute') != this.get('minute')) return false;

    return true;
};

ParsedComponents.prototype.date = function() {
    var dateMoment = this.moment();
    return dateMoment.toDate();
};

ParsedComponents.prototype.moment = function() {
    var dateMoment = moment();

    dateMoment.set('year', this.get('year'));
    dateMoment.set('month', this.get('month')-1);
    dateMoment.set('date', this.get('day'));
    dateMoment.set('hour', this.get('hour'));
    dateMoment.set('minute', this.get('minute'));
    dateMoment.set('second', this.get('second'));
    dateMoment.set('millisecond', this.get('millisecond'));

    // Javascript Date Object return minus timezone offset
    var currentTimezoneOffset = dateMoment.utcOffset();
    var targetTimezoneOffset = this.isCertain('timezoneOffset') ? 
        this.get('timezoneOffset') : currentTimezoneOffset;

    var adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
    dateMoment.add(-adjustTimezoneOffset, 'minutes');

    return dateMoment;
};



exports.ParsedComponents = ParsedComponents;
exports.ParsedResult = ParsedResult;

},{"moment":1}],53:[function(require,module,exports){
exports.WEEKDAY_OFFSET = { 
    'sunday': 0, 
    'sun': 0, 
    'monday': 1, 
    'mon': 1,
    'tuesday': 2, 
    'tue':2, 
    'wednesday': 3, 
    'wed': 3, 
    'thursday': 4, 
    'thur': 4, 
    'thu': 4,
    'friday': 5, 
    'fri': 5,
    'saturday': 6, 
    'sat': 6
};
    
exports.MONTH_OFFSET = { 
    'january': 1,
    'jan': 1,
    'jan.': 1,
    'february': 2,
    'feb': 2,
    'feb.': 2,
    'march': 3,
    'mar': 3,
    'mar.': 3,
    'april': 4,
    'apr': 4,
    'apr.': 4,
    'may': 5,
    'june': 6,
    'jun': 6,
    'jun.': 6,
    'july': 7,
    'jul': 7,
    'jul.': 7,
    'august': 8,
    'aug': 8,
    'aug.': 8,
    'september': 9,
    'sep': 9,
    'sep.': 9,
    'sept': 9,
    'sept.': 9,
    'october': 10,
    'oct': 10,
    'oct.': 10,
    'november': 11,
    'nov': 11,
    'nov.': 11,
    'december': 12,
    'dec': 12,
    'dec.': 12
};

exports.INTEGER_WORDS = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5,
    'six' : 6,
    'seven' : 7,
    'eight' : 8,
    'nine' : 9,
    'ten' : 10,
    'eleven' : 11,
    'twelve' : 12
};
exports.INTEGER_WORDS_PATTERN = '(?:' + Object.keys(exports.INTEGER_WORDS).join('|') +')';

exports.ORDINAL_WORDS = {
    'first' : 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'eighth': 8,
    'ninth': 9,
    'tenth': 10,
    'eleventh': 11,
    'twelfth': 12,
    'thirteenth': 13,
    'fourteenth': 14,
    'fifteenth': 15,
    'sixteenth': 16,
    'seventeenth': 17,
    'eighteenth': 18,
    'nineteenth': 19,
    'twentieth': 20,
    'twenty first': 21,
    'twenty second': 22,
    'twenty third': 23,
    'twenty fourth': 24,
    'twenty fifth': 25,
    'twenty sixth': 26,
    'twenty seventh': 27,
    'twenty eighth': 28,
    'twenty ninth': 29,
    'thirtieth': 30,
    'thirty first': 31
};
exports.ORDINAL_WORDS_PATTERN = '(?:' + Object.keys(exports.ORDINAL_WORDS).join('|').replace(/ /g, '[ -]') + ')';
},{}],54:[function(require,module,exports){
exports.WEEKDAY_OFFSET = {
    'domingo': 0,
    'dom': 0,
    'lunes': 1,
    'lun': 1,
    'martes': 2,
    'mar':2,
    'miércoles': 3,
    'miercoles': 3,
    'mie': 3,
    'jueves': 4,
    'jue': 4,
    'viernes': 5,
    'vie': 5,
    'sábado': 6,
    'sabado': 6,
    'sab': 6,}

exports.MONTH_OFFSET = {
    'enero': 1,
    'ene': 1,
    'ene.': 1,
    'febrero': 2,
    'feb': 2,
    'feb.': 2,
    'marzo': 3,
    'mar': 3,
    'mar.': 3,
    'abril': 4,
    'abr': 4,
    'abr.': 4,
    'mayo': 5,
    'may': 5,
    'may.': 5,
    'junio': 6,
    'jun': 6,
    'jun.': 6,
    'julio': 7,
    'jul': 7,
    'jul.': 7,
    'agosto': 8,
    'ago': 8,
    'ago.': 8,
    'septiembre': 9,
    'sep': 9,
    'sept': 9,
    'sep.': 9,
    'sept.': 9,
    'octubre': 10,
    'oct': 10,
    'oct.': 10,
    'noviembre': 11,
    'nov': 11,
    'nov.': 11,
    'diciembre': 12,
    'dic': 12,
    'dic.': 12,
}

},{}],55:[function(require,module,exports){
exports.WEEKDAY_OFFSET = { 
    'dimanche': 0, 
    'dim': 0, 
    'lundi': 1, 
    'lun': 1,
    'mardi': 2, 
    'mar':2, 
    'mercredi': 3, 
    'mer': 3, 
    'jeudi': 4, 
    'jeu': 4, 
    'vendredi': 5, 
    'ven': 5,
    'samedi': 6, 
    'sam': 6
};
    
exports.MONTH_OFFSET = { 
    'janvier': 1,
    'jan': 1,
    'jan.': 1,
    'février': 2,
    'fév': 2,
    'fév.': 2,
    'mars': 3,
    'mar': 3,
    'mar.': 3,
    'avril': 4,
    'avr': 4,
    'avr.': 4,
    'mai': 5,
    'juin': 6,
    'jun': 6,
    'juillet': 7,
    'jul': 7,
    'jul.': 7,
    'août': 8,
    'aout': 8,
    'septembre': 9,
    'sep': 9,
    'sep.': 9,
    'sept': 9,
    'sept.': 9,
    'octobre': 10,
    'oct': 10,
    'oct.': 10,
    'novembre': 11,
    'nov': 11,
    'nov.': 11,
    'décembre': 12,
    'dec': 12,
    'dec.': 12
};

exports.INTEGER_WORDS_PATTERN = '(?:un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize)';
exports.INTEGER_WORDS = {
    'un' : 1,
    'deux' : 2,
    'trois' : 3,
    'quatre' : 4,
    'cinq' : 5,
    'six' : 6,
    'sept' : 7,
    'huit' : 8,
    'neuf' : 9,
    'dix' : 10,
    'onze' : 11,
    'douze' : 12,
    'treize' : 13,
};

},{}],56:[function(require,module,exports){


/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
 
exports.toHankaku = (function (String, fromCharCode) {
 
    function toHankaku (string) {
        return String(string).replace(/\u2019/g, '\u0027').replace(/\u201D/g, '\u0022').replace(/\u3000/g, '\u0020').replace(/\uFFE5/g, '\u00A5').replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
    }
 
    function alphaNum (token) {
        return fromCharCode(token.charCodeAt(0) - 65248);
    }
 
    return toHankaku;
})(String, String.fromCharCode);

/**
 * to-zenkaku.js
 * convert to multi byte strings.
 *
 * @version 1.0.2
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
exports.toZenkaku = (function (String, fromCharCode) {
 
    function toZenkaku (string) {
        return String(string).replace(/\u0020/g, '\u3000').replace(/\u0022/g, '\u201D').replace(/\u0027/g, '\u2019').replace(/\u00A5/g, '\uFFE5').replace(/[!#-&(),-9\u003C-?A-[\u005D_a-{}~]/g, alphaNum);
    }
 
    function alphaNum (token) {
        return fromCharCode(token.charCodeAt(0) + 65248);
    }
 
    return toZenkaku;
})(String, String.fromCharCode);
},{}],57:[function(require,module,exports){
var NUMBER ={
  '零':0,
  '一':1,
  '二':2,
  '兩':2,
  '三':3,
  '四':4,
  '五':5,
  '六':6,
  '七':7,
  '八':8,
  '九':9,
  '十':10,
  '廿':20,
  '卅':30,
};

var WEEKDAY_OFFSET ={
  '天':0,
  '日':0,
  '一':1,
  '二':2,
  '三':3,
  '四':4,
  '五':5,
  '六':6,
};

exports.NUMBER = NUMBER;
exports.WEEKDAY_OFFSET = WEEKDAY_OFFSET;

exports.zhStringToNumber=function(text){
  var number = 0;
  for(var i=0; i<text.length ;i++){
    var char = text[i];
    if(char === '十'){
      number = number=== 0 ? NUMBER[char] : (number * NUMBER[char]);
    }else{
      number += NUMBER[char];
    }
  }
  return number;
};

exports.zhStringToYear=function(text){
  var string = '';
  for(var i=0; i<text.length ;i++){
    var char = text[i];
    string = string + NUMBER[char];
  }
  return parseInt(string);
};

},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbW9tZW50L21vbWVudC5qcyIsInNyYy9jaHJvbm8uanMiLCJzcmMvb3B0aW9ucy5qcyIsInNyYy9wYXJzZXJzL0VOL0VOQ2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOQ2FzdWFsVGltZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VORGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTklTT0Zvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTk1vbnRoTmFtZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTlNsYXNoRGF0ZUZvcm1hdFN0YXJ0V2l0aFllYXJQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTlRpbWVBZ29Gb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTlRpbWVFeHByZXNzaW9uUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5XZWVrZGF5UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNDYXN1YWxEYXRlUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNEZWFkbGluZUZvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNTbGFzaERhdGVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FUy9FU1RpbWVBZ29Gb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FUy9FU1RpbWVFeHByZXNzaW9uUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNXZWVrZGF5UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRlIvRlJDYXN1YWxEYXRlUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRlIvRlJEZWFkbGluZUZvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0ZSL0ZSTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRlIvRlJTbGFzaERhdGVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9GUi9GUlRpbWVBZ29Gb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9GUi9GUlRpbWVFeHByZXNzaW9uUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRlIvRlJXZWVrZGF5UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvSlAvSlBDYXN1YWxEYXRlUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvSlAvSlBTdGFuZGFyZFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL1pILUhhbnQvWkhIYW50Q2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL1pILUhhbnQvWkhIYW50RGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL1pILUhhbnQvWkhIYW50RGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9aSC1IYW50L1pISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvWkgtSGFudC9aSEhhbnRXZWVrZGF5UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvcGFyc2VyLmpzIiwic3JjL3JlZmluZXJzL0VOL0VOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0VOL0VOTWVyZ2VEYXRlVGltZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRU4vRU5Qcmlvcml0aXplU3BlY2lmaWNEYXRlUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9FeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9FeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0ZSL0ZSTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0ZSL0ZSTWVyZ2VEYXRlVGltZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRm9yd2FyZERhdGVSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0pQL0pQTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL092ZXJsYXBSZW1vdmFsUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9Vbmxpa2VseUZvcm1hdEZpbHRlci5qcyIsInNyYy9yZWZpbmVycy9yZWZpbmVyLmpzIiwic3JjL3Jlc3VsdC5qcyIsInNyYy91dGlscy9FTi5qcyIsInNyYy91dGlscy9FUy5qcyIsInNyYy91dGlscy9GUi5qcyIsInNyYy91dGlscy9KUC5qcyIsInNyYy91dGlscy9aSC1IYW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RpR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vISBtb21lbnQuanNcbi8vISB2ZXJzaW9uIDogMi4xMC4zXG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xuLy8hIGxpY2Vuc2UgOiBNSVRcbi8vISBtb21lbnRqcy5jb21cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICBnbG9iYWwubW9tZW50ID0gZmFjdG9yeSgpXG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGhvb2tDYWxsYmFjaztcblxuICAgIGZ1bmN0aW9uIHV0aWxzX2hvb2tzX19ob29rcyAoKSB7XG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayAoY2FsbGJhY2spIHtcbiAgICAgICAgaG9va0NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RhdGUoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRGF0ZSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwKGFyciwgZm4pIHtcbiAgICAgICAgdmFyIHJlcyA9IFtdLCBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXMucHVzaChmbihhcnJbaV0sIGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc093blByb3AoYSwgYikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcbiAgICAgICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIHRydWUpLnV0YygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRQYXJzaW5nRmxhZ3MoKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGVlcCBjbG9uZSB0aGlzIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVtcHR5ICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgdW51c2VkVG9rZW5zICAgIDogW10sXG4gICAgICAgICAgICB1bnVzZWRJbnB1dCAgICAgOiBbXSxcbiAgICAgICAgICAgIG92ZXJmbG93ICAgICAgICA6IC0yLFxuICAgICAgICAgICAgY2hhcnNMZWZ0T3ZlciAgIDogMCxcbiAgICAgICAgICAgIG51bGxJbnB1dCAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgaW52YWxpZE1vbnRoICAgIDogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQgICA6IGZhbHNlLFxuICAgICAgICAgICAgdXNlckludmFsaWRhdGVkIDogZmFsc2UsXG4gICAgICAgICAgICBpc28gICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNpbmdGbGFncyhtKSB7XG4gICAgICAgIGlmIChtLl9wZiA9PSBudWxsKSB7XG4gICAgICAgICAgICBtLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5fcGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRfX2lzVmFsaWQobSkge1xuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSk7XG4gICAgICAgICAgICBtLl9pc1ZhbGlkID0gIWlzTmFOKG0uX2QuZ2V0VGltZSgpKSAmJlxuICAgICAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkTW9udGggJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRGb3JtYXQgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MudXNlckludmFsaWRhdGVkO1xuXG4gICAgICAgICAgICBpZiAobS5fc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgbS5faXNWYWxpZCA9IG0uX2lzVmFsaWQgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmJpZ0hvdXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5faXNWYWxpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZF9fY3JlYXRlSW52YWxpZCAoZmxhZ3MpIHtcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoTmFOKTtcbiAgICAgICAgaWYgKGZsYWdzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgdmFyIG1vbWVudFByb3BlcnRpZXMgPSB1dGlsc19ob29rc19faG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY29weUNvbmZpZyh0bywgZnJvbSkge1xuICAgICAgICB2YXIgaSwgcHJvcCwgdmFsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5faXNBTW9tZW50T2JqZWN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2lzQU1vbWVudE9iamVjdCA9IGZyb20uX2lzQU1vbWVudE9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX2kgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5faSA9IGZyb20uX2k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9mICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2YgPSBmcm9tLl9mO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5fbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9sID0gZnJvbS5fbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX3N0cmljdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9zdHJpY3QgPSBmcm9tLl9zdHJpY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl90em0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5fdHptID0gZnJvbS5fdHptO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5faXNVVEMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5faXNVVEMgPSBmcm9tLl9pc1VUQztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX29mZnNldCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9vZmZzZXQgPSBmcm9tLl9vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9wZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9wZiA9IGdldFBhcnNpbmdGbGFncyhmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX2xvY2FsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9sb2NhbGUgPSBmcm9tLl9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9tZW50UHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gbW9tZW50UHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIHByb3AgPSBtb21lbnRQcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bztcbiAgICB9XG5cbiAgICB2YXIgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcbiAgICBmdW5jdGlvbiBNb21lbnQoY29uZmlnKSB7XG4gICAgICAgIGNvcHlDb25maWcodGhpcywgY29uZmlnKTtcbiAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKCtjb25maWcuX2QpO1xuICAgICAgICAvLyBQcmV2ZW50IGluZmluaXRlIGxvb3AgaW4gY2FzZSB1cGRhdGVPZmZzZXQgY3JlYXRlcyBuZXcgbW9tZW50XG4gICAgICAgIC8vIG9iamVjdHMuXG4gICAgICAgIGlmICh1cGRhdGVJblByb2dyZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNb21lbnQgKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0ludChhcmd1bWVudEZvckNvZXJjaW9uKSB7XG4gICAgICAgIHZhciBjb2VyY2VkTnVtYmVyID0gK2FyZ3VtZW50Rm9yQ29lcmNpb24sXG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG5cbiAgICAgICAgaWYgKGNvZXJjZWROdW1iZXIgIT09IDAgJiYgaXNGaW5pdGUoY29lcmNlZE51bWJlcikpIHtcbiAgICAgICAgICAgIGlmIChjb2VyY2VkTnVtYmVyID49IDApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IoY29lcmNlZE51bWJlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5jZWlsKGNvZXJjZWROdW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBhcmVBcnJheXMoYXJyYXkxLCBhcnJheTIsIGRvbnRDb252ZXJ0KSB7XG4gICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbihhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGxlbmd0aERpZmYgPSBNYXRoLmFicyhhcnJheTEubGVuZ3RoIC0gYXJyYXkyLmxlbmd0aCksXG4gICAgICAgICAgICBkaWZmcyA9IDAsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoZG9udENvbnZlcnQgJiYgYXJyYXkxW2ldICE9PSBhcnJheTJbaV0pIHx8XG4gICAgICAgICAgICAgICAgKCFkb250Q29udmVydCAmJiB0b0ludChhcnJheTFbaV0pICE9PSB0b0ludChhcnJheTJbaV0pKSkge1xuICAgICAgICAgICAgICAgIGRpZmZzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMb2NhbGUoKSB7XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsZXMgPSB7fTtcbiAgICB2YXIgZ2xvYmFsTG9jYWxlO1xuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID8ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnXycsICctJykgOiBrZXk7XG4gICAgfVxuXG4gICAgLy8gcGljayB0aGUgbG9jYWxlIGZyb20gdGhlIGFycmF5XG4gICAgLy8gdHJ5IFsnZW4tYXUnLCAnZW4tZ2InXSBhcyAnZW4tYXUnLCAnZW4tZ2InLCAnZW4nLCBhcyBpbiBtb3ZlIHRocm91Z2ggdGhlIGxpc3QgdHJ5aW5nIGVhY2hcbiAgICAvLyBzdWJzdHJpbmcgZnJvbSBtb3N0IHNwZWNpZmljIHRvIGxlYXN0LCBidXQgbW92ZSB0byB0aGUgbmV4dCBhcnJheSBpdGVtIGlmIGl0J3MgYSBtb3JlIHNwZWNpZmljIHZhcmlhbnQgdGhhbiB0aGUgY3VycmVudCByb290XG4gICAgZnVuY3Rpb24gY2hvb3NlTG9jYWxlKG5hbWVzKSB7XG4gICAgICAgIHZhciBpID0gMCwgaiwgbmV4dCwgbG9jYWxlLCBzcGxpdDtcblxuICAgICAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XG4gICAgICAgICAgICBqID0gc3BsaXQubGVuZ3RoO1xuICAgICAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQgPyBuZXh0LnNwbGl0KCctJykgOiBudWxsO1xuICAgICAgICAgICAgd2hpbGUgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5sZW5ndGggPj0gaiAmJiBjb21wYXJlQXJyYXlzKHNwbGl0LCBuZXh0LCB0cnVlKSA+PSBqIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGFycmF5IGl0ZW0gaXMgYmV0dGVyIHRoYW4gYSBzaGFsbG93ZXIgc3Vic3RyaW5nIG9mIHRoaXMgb25lXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZExvY2FsZShuYW1lKSB7XG4gICAgICAgIHZhciBvbGRMb2NhbGUgPSBudWxsO1xuICAgICAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSB0byByZWdpc3RlciBhbmQgbG9hZCBhbGwgdGhlIGxvY2FsZXMgaW4gTm9kZVxuICAgICAgICBpZiAoIWxvY2FsZXNbbmFtZV0gJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vbG9jYWxlLycgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGRlZmluZUxvY2FsZSBjdXJyZW50bHkgYWxzbyBzZXRzIHRoZSBnbG9iYWwgbG9jYWxlLCB3ZVxuICAgICAgICAgICAgICAgIC8vIHdhbnQgdG8gdW5kbyB0aGF0IGZvciBsYXp5IGxvYWRlZCBsb2NhbGVzXG4gICAgICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgbG9jYWxlIGFuZCB0aGVuIHNldCB0aGUgZ2xvYmFsIGxvY2FsZS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbiAgICAvLyBsb2NhbGUga2V5LlxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmaW5lTG9jYWxlIChuYW1lLCB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsdWVzLmFiYnIgPSBuYW1lO1xuICAgICAgICAgICAgaWYgKCFsb2NhbGVzW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0uc2V0KHZhbHVlcyk7XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShuYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIGxvY2FsZSBkYXRhXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSAoa2V5KSB7XG4gICAgICAgIHZhciBsb2NhbGU7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xuICAgICAgICAgICAga2V5ID0ga2V5Ll9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAgICAvL3Nob3J0LWNpcmN1aXQgZXZlcnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xuICAgIH1cblxuICAgIHZhciBhbGlhc2VzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRVbml0QWxpYXMgKHVuaXQsIHNob3J0aGFuZCkge1xuICAgICAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnID8gYWxpYXNlc1t1bml0c10gfHwgYWxpYXNlc1t1bml0cy50b0xvd2VyQ2FzZSgpXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVPYmplY3RVbml0cyhpbnB1dE9iamVjdCkge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0ge30sXG4gICAgICAgICAgICBub3JtYWxpemVkUHJvcCxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIGlucHV0T2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChpbnB1dE9iamVjdCwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkUHJvcCA9IG5vcm1hbGl6ZVVuaXRzKHByb3ApO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkUHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRbbm9ybWFsaXplZFByb3BdID0gaW5wdXRPYmplY3RbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0U2V0ICh1bml0LCBrZWVwVGltZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGdldF9zZXRfX3NldCh0aGlzLCB1bml0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRfc2V0X19nZXQodGhpcywgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X3NldF9fZ2V0IChtb20sIHVuaXQpIHtcbiAgICAgICAgcmV0dXJuIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX3NldCAobW9tLCB1bml0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXQgKHVuaXRzLCB2YWx1ZSkge1xuICAgICAgICB2YXIgdW5pdDtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAodW5pdCBpbiB1bml0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHVuaXQsIHVuaXRzW3VuaXRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW3VuaXRzXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gemVyb0ZpbGwobnVtYmVyLCB0YXJnZXRMZW5ndGgsIGZvcmNlU2lnbikge1xuICAgICAgICB2YXIgb3V0cHV0ID0gJycgKyBNYXRoLmFicyhudW1iZXIpLFxuICAgICAgICAgICAgc2lnbiA9IG51bWJlciA+PSAwO1xuXG4gICAgICAgIHdoaWxlIChvdXRwdXQubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSAnMCcgKyBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgKyBvdXRwdXQ7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UXxZWVlZWVl8WVlZWVl8WVlZWXxZWXxnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xtbT98c3M/fFN7MSw0fXx4fFh8eno/fFpaP3wuKS9nO1xuXG4gICAgdmFyIGxvY2FsRm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2c7XG5cbiAgICB2YXIgZm9ybWF0RnVuY3Rpb25zID0ge307XG5cbiAgICB2YXIgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuICAgIC8vIHRva2VuOiAgICAnTSdcbiAgICAvLyBwYWRkZWQ6ICAgWydNTScsIDJdXG4gICAgLy8gb3JkaW5hbDogICdNbydcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cbiAgICBmdW5jdGlvbiBhZGRGb3JtYXRUb2tlbiAodG9rZW4sIHBhZGRlZCwgb3JkaW5hbCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gZnVuYztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFkZGVkKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1twYWRkZWRbMF1dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB6ZXJvRmlsbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHBhZGRlZFsxXSwgcGFkZGVkWzJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGluYWwpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdG9rZW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJztcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBhcnJheVtpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdCkgOiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xuICAgICAgICBpZiAoIW0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGV4cGFuZEZvcm1hdChmb3JtYXQsIG0ubG9jYWxlRGF0YSgpKTtcblxuICAgICAgICBpZiAoIWZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKSB7XG4gICAgICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9IG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKG0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xuICAgICAgICB2YXIgaSA9IDU7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLmxvbmdEYXRlRm9ybWF0KGlucHV0KSB8fCBpbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy50ZXN0KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKGxvY2FsRm9ybWF0dGluZ1Rva2VucywgcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKTtcbiAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2gxICAgICAgICAgPSAvXFxkLzsgICAgICAgICAgICAvLyAgICAgICAwIC0gOVxuICAgIHZhciBtYXRjaDIgICAgICAgICA9IC9cXGRcXGQvOyAgICAgICAgICAvLyAgICAgIDAwIC0gOTlcbiAgICB2YXIgbWF0Y2gzICAgICAgICAgPSAvXFxkezN9LzsgICAgICAgICAvLyAgICAgMDAwIC0gOTk5XG4gICAgdmFyIG1hdGNoNCAgICAgICAgID0gL1xcZHs0fS87ICAgICAgICAgLy8gICAgMDAwMCAtIDk5OTlcbiAgICB2YXIgbWF0Y2g2ICAgICAgICAgPSAvWystXT9cXGR7Nn0vOyAgICAvLyAtOTk5OTk5IC0gOTk5OTk5XG4gICAgdmFyIG1hdGNoMXRvMiAgICAgID0gL1xcZFxcZD8vOyAgICAgICAgIC8vICAgICAgIDAgLSA5OVxuICAgIHZhciBtYXRjaDF0bzMgICAgICA9IC9cXGR7MSwzfS87ICAgICAgIC8vICAgICAgIDAgLSA5OTlcbiAgICB2YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxuICAgIHZhciBtYXRjaDF0bzYgICAgICA9IC9bKy1dP1xcZHsxLDZ9LzsgIC8vIC05OTk5OTkgLSA5OTk5OTlcblxuICAgIHZhciBtYXRjaFVuc2lnbmVkICA9IC9cXGQrLzsgICAgICAgICAgIC8vICAgICAgIDAgLSBpbmZcbiAgICB2YXIgbWF0Y2hTaWduZWQgICAgPSAvWystXT9cXGQrLzsgICAgICAvLyAgICAtaW5mIC0gaW5mXG5cbiAgICB2YXIgbWF0Y2hPZmZzZXQgICAgPSAvWnxbKy1dXFxkXFxkOj9cXGRcXGQvZ2k7IC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuXG4gICAgdmFyIG1hdGNoVGltZXN0YW1wID0gL1srLV0/XFxkKyhcXC5cXGR7MSwzfSk/LzsgLy8gMTIzNDU2Nzg5IDEyMzQ1Njc4OS4xMjNcblxuICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxuICAgIHZhciBtYXRjaFdvcmQgPSAvWzAtOV0qWydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdK3xbXFx1MDYwMC1cXHUwNkZGXFwvXSsoXFxzKj9bXFx1MDYwMC1cXHUwNkZGXSspezEsMn0vaTtcblxuICAgIHZhciByZWdleGVzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ZXNbdG9rZW5dID0gdHlwZW9mIHJlZ2V4ID09PSAnZnVuY3Rpb24nID8gcmVnZXggOiBmdW5jdGlvbiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNTdHJpY3QgJiYgc3RyaWN0UmVnZXgpID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4gKHRva2VuLCBjb25maWcpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHJlZ2V4ZXMsIHRva2VuKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodW5lc2NhcGVGb3JtYXQodG9rZW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWdleGVzW3Rva2VuXShjb25maWcuX3N0cmljdCwgY29uZmlnLl9sb2NhbGUpO1xuICAgIH1cblxuICAgIC8vIENvZGUgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NjE0OTMvaXMtdGhlcmUtYS1yZWdleHAtZXNjYXBlLWZ1bmN0aW9uLWluLWphdmFzY3JpcHRcbiAgICBmdW5jdGlvbiB1bmVzY2FwZUZvcm1hdChzKSB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoJ1xcXFwnLCAnJykucmVwbGFjZSgvXFxcXChcXFspfFxcXFwoXFxdKXxcXFsoW15cXF1cXFtdKilcXF18XFxcXCguKS9nLCBmdW5jdGlvbiAobWF0Y2hlZCwgcDEsIHAyLCBwMywgcDQpIHtcbiAgICAgICAgICAgIHJldHVybiBwMSB8fCBwMiB8fCBwMyB8fCBwNDtcbiAgICAgICAgfSkucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpLCBmdW5jID0gY2FsbGJhY2s7XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0b2tlbiA9IFt0b2tlbl07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbY2FsbGJhY2tdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbltpXV0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkV2Vla1BhcnNlVG9rZW4gKHRva2VuLCBjYWxsYmFjaykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBZRUFSID0gMDtcbiAgICB2YXIgTU9OVEggPSAxO1xuICAgIHZhciBEQVRFID0gMjtcbiAgICB2YXIgSE9VUiA9IDM7XG4gICAgdmFyIE1JTlVURSA9IDQ7XG4gICAgdmFyIFNFQ09ORCA9IDU7XG4gICAgdmFyIE1JTExJU0VDT05EID0gNjtcblxuICAgIGZ1bmN0aW9uIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCArIDEsIDApKS5nZXRVVENEYXRlKCk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ00nLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NJywgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignTU1NJywgIG1hdGNoV29yZCk7XG4gICAgYWRkUmVnZXhUb2tlbignTU1NTScsIG1hdGNoV29yZCk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnTScsICdNTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01PTlRIXSA9IHRvSW50KGlucHV0KSAtIDE7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnTU1NJywgJ01NTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXG4gICAgICAgIGlmIChtb250aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBhcnJheVtNT05USF0gPSBtb250aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRNb250aCA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZU1vbnRocyA9ICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRocyAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNQYXJzZSAobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU1NJyAmJiB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU0nICYmIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBzZXRNb250aCAobW9tLCB2YWx1ZSkge1xuICAgICAgICB2YXIgZGF5T2ZNb250aDtcblxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgb3V0IG9mIGhlcmUhXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG1vbS5sb2NhbGVEYXRhKCkubW9udGhzUGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgLy8gVE9ETzogQW5vdGhlciBzaWxlbnQgZmFpbHVyZT9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRheU9mTW9udGggPSBNYXRoLm1pbihtb20uZGF0ZSgpLCBkYXlzSW5Nb250aChtb20ueWVhcigpLCB2YWx1ZSkpO1xuICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgJ01vbnRoJ10odmFsdWUsIGRheU9mTW9udGgpO1xuICAgICAgICByZXR1cm4gbW9tO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldE1vbnRoICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0TW9udGgodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldF9zZXRfX2dldCh0aGlzLCAnTW9udGgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERheXNJbk1vbnRoICgpIHtcbiAgICAgICAgcmV0dXJuIGRheXNJbk1vbnRoKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3cgKG0pIHtcbiAgICAgICAgdmFyIG92ZXJmbG93O1xuICAgICAgICB2YXIgYSA9IG0uX2E7XG5cbiAgICAgICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgICAgIGFbTU9OVEhdICAgICAgIDwgMCB8fCBhW01PTlRIXSAgICAgICA+IDExICA/IE1PTlRIIDpcbiAgICAgICAgICAgICAgICBhW0RBVEVdICAgICAgICA8IDEgfHwgYVtEQVRFXSAgICAgICAgPiBkYXlzSW5Nb250aChhW1lFQVJdLCBhW01PTlRIXSkgPyBEQVRFIDpcbiAgICAgICAgICAgICAgICBhW0hPVVJdICAgICAgICA8IDAgfHwgYVtIT1VSXSAgICAgICAgPiAyNCB8fCAoYVtIT1VSXSA9PT0gMjQgJiYgKGFbTUlOVVRFXSAhPT0gMCB8fCBhW1NFQ09ORF0gIT09IDAgfHwgYVtNSUxMSVNFQ09ORF0gIT09IDApKSA/IEhPVVIgOlxuICAgICAgICAgICAgICAgIGFbTUlOVVRFXSAgICAgIDwgMCB8fCBhW01JTlVURV0gICAgICA+IDU5ICA/IE1JTlVURSA6XG4gICAgICAgICAgICAgICAgYVtTRUNPTkRdICAgICAgPCAwIHx8IGFbU0VDT05EXSAgICAgID4gNTkgID8gU0VDT05EIDpcbiAgICAgICAgICAgICAgICBhW01JTExJU0VDT05EXSA8IDAgfHwgYVtNSUxMSVNFQ09ORF0gPiA5OTkgPyBNSUxMSVNFQ09ORCA6XG4gICAgICAgICAgICAgICAgLTE7XG5cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93RGF5T2ZZZWFyICYmIChvdmVyZmxvdyA8IFlFQVIgfHwgb3ZlcmZsb3cgPiBEQVRFKSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID0gb3ZlcmZsb3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXJuKG1zZykge1xuICAgICAgICBpZiAodXRpbHNfaG9va3NfX2hvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9PT0gZmFsc2UgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nOiAnICsgbXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZShtc2csIGZuKSB7XG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlLFxuICAgICAgICAgICAgbXNnV2l0aFN0YWNrID0gbXNnICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrO1xuXG4gICAgICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0VGltZSkge1xuICAgICAgICAgICAgICAgIHdhcm4obXNnV2l0aFN0YWNrKTtcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBmbik7XG4gICAgfVxuXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlU2ltcGxlKG5hbWUsIG1zZykge1xuICAgICAgICBpZiAoIWRlcHJlY2F0aW9uc1tuYW1lXSkge1xuICAgICAgICAgICAgd2Fybihtc2cpO1xuICAgICAgICAgICAgZGVwcmVjYXRpb25zW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcblxuICAgIHZhciBmcm9tX3N0cmluZ19faXNvUmVnZXggPSAvXlxccyooPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86KFxcZFxcZC1cXGRcXGQpfChXXFxkXFxkJCl8KFdcXGRcXGQtXFxkKXwoXFxkXFxkXFxkKSkoKFR8ICkoXFxkXFxkKDpcXGRcXGQoOlxcZFxcZChcXC5cXGQrKT8pPyk/KT8oW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvO1xuXG4gICAgdmFyIGlzb0RhdGVzID0gW1xuICAgICAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZHsyfS1cXGR7Mn0vXSxcbiAgICAgICAgWydZWVlZLU1NLUREJywgL1xcZHs0fS1cXGR7Mn0tXFxkezJ9L10sXG4gICAgICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkezJ9LVxcZC9dLFxuICAgICAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGR7Mn0vXSxcbiAgICAgICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L11cbiAgICBdO1xuXG4gICAgLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xuICAgIHZhciBpc29UaW1lcyA9IFtcbiAgICAgICAgWydISDptbTpzcy5TU1NTJywgLyhUfCApXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGQrL10sXG4gICAgICAgIFsnSEg6bW06c3MnLCAvKFR8IClcXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICBbJ0hIOm1tJywgLyhUfCApXFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICBbJ0hIJywgLyhUfCApXFxkXFxkL11cbiAgICBdO1xuXG4gICAgdmFyIGFzcE5ldEpzb25SZWdleCA9IC9eXFwvP0RhdGVcXCgoXFwtP1xcZCspL2k7XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JU08oY29uZmlnKSB7XG4gICAgICAgIHZhciBpLCBsLFxuICAgICAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgbWF0Y2ggPSBmcm9tX3N0cmluZ19faXNvUmVnZXguZXhlYyhzdHJpbmcpO1xuXG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29EYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhzdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoWzVdIHNob3VsZCBiZSAnVCcgb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5fZiA9IGlzb0RhdGVzW2ldWzBdICsgKG1hdGNoWzZdIHx8ICcgJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvVGltZXNbaV1bMV0uZXhlYyhzdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5fZiArPSBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0cmluZy5tYXRjaChtYXRjaE9mZnNldCkpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2YgKz0gJ1onO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcblxuICAgICAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50IGNvbnN0cnVjdGlvbiBmYWxscyBiYWNrIHRvIGpzIERhdGUuIFRoaXMgaXMgJyArXG4gICAgICAgICdkaXNjb3VyYWdlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHVwY29taW5nIG1ham9yICcgK1xuICAgICAgICAncmVsZWFzZS4gUGxlYXNlIHJlZmVyIHRvICcgK1xuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDcgZm9yIG1vcmUgaW5mby4nLFxuICAgICAgICBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kgKyAoY29uZmlnLl91c2VVVEMgPyAnIFVUQycgOiAnJykpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURhdGUgKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgICAgIC8vY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XG4gICAgICAgIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xODEzNDgvaW5zdGFudGlhdGluZy1hLWphdmFzY3JpcHQtb2JqZWN0LWJ5LWNhbGxpbmctcHJvdG90eXBlLWNvbnN0cnVjdG9yLWFwcGx5XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xuXG4gICAgICAgIC8vdGhlIGRhdGUgY29uc3RydWN0b3IgZG9lc24ndCBhY2NlcHQgeWVhcnMgPCAxOTcwXG4gICAgICAgIGlmICh5IDwgMTk3MCkge1xuICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlICh5KSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgIGlmICh5IDwgMTk3MCkge1xuICAgICAgICAgICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZJywgICA0XSwgICAgICAgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZJywgIDVdLCAgICAgICAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVlZJywgNiwgdHJ1ZV0sIDAsICd5ZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3llYXInLCAneScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWScsICAgICAgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWVknLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydZWVlZJywgJ1lZWVlZJywgJ1lZWVlZWSddLCBZRUFSKTtcbiAgICBhZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHllYXIpID8gMzY2IDogMzY1O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICAgICAgICByZXR1cm4gKHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDApIHx8IHllYXIgJSA0MDAgPT09IDA7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhciA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xuICAgIH07XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgZmFsc2UpO1xuXG4gICAgZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3cnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCd3dycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdXJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignV1cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ3cnLCAnd3cnLCAnVycsICdXVyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMSldID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gZmlyc3REYXlPZldlZWsgICAgICAgMCA9IHN1biwgNiA9IHNhdFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIHRoZSBkYXkgb2YgdGhlIHdlZWsgdGhhdCBzdGFydHMgdGhlIHdlZWtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAodXN1YWxseSBzdW5kYXkgb3IgbW9uZGF5KVxuICAgIC8vIGZpcnN0RGF5T2ZXZWVrT2ZZZWFyIDAgPSBzdW4sIDYgPSBzYXRcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3Qgd2VlayBpcyB0aGUgd2VlayB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIG9mIHRoaXMgZGF5IG9mIHRoZSB3ZWVrXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgKGVnLiBJU08gd2Vla3MgdXNlIHRodXJzZGF5ICg0KSlcbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZmlyc3REYXlPZldlZWssIGZpcnN0RGF5T2ZXZWVrT2ZZZWFyKSB7XG4gICAgICAgIHZhciBlbmQgPSBmaXJzdERheU9mV2Vla09mWWVhciAtIGZpcnN0RGF5T2ZXZWVrLFxuICAgICAgICAgICAgZGF5c1RvRGF5T2ZXZWVrID0gZmlyc3REYXlPZldlZWtPZlllYXIgLSBtb20uZGF5KCksXG4gICAgICAgICAgICBhZGp1c3RlZE1vbWVudDtcblxuXG4gICAgICAgIGlmIChkYXlzVG9EYXlPZldlZWsgPiBlbmQpIHtcbiAgICAgICAgICAgIGRheXNUb0RheU9mV2VlayAtPSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRheXNUb0RheU9mV2VlayA8IGVuZCAtIDcpIHtcbiAgICAgICAgICAgIGRheXNUb0RheU9mV2VlayArPSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgYWRqdXN0ZWRNb21lbnQgPSBsb2NhbF9fY3JlYXRlTG9jYWwobW9tKS5hZGQoZGF5c1RvRGF5T2ZXZWVrLCAnZCcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2VlazogTWF0aC5jZWlsKGFkanVzdGVkTW9tZW50LmRheU9mWWVhcigpIC8gNyksXG4gICAgICAgICAgICB5ZWFyOiBhZGp1c3RlZE1vbWVudC55ZWFyKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrIChtb20pIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xuICAgICAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgZG95IDogNiAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mV2VlayAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHRoaXMubG9jYWxlRGF0YSgpLndlZWsodGhpcyk7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRJU09XZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsICBtYXRjaDF0bzMpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydEREQnLCAnRERERCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvL2h0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZSNDYWxjdWxhdGluZ19hX2RhdGVfZ2l2ZW5fdGhlX3llYXIuMkNfd2Vla19udW1iZXJfYW5kX3dlZWtkYXlcbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla3MoeWVhciwgd2Vlaywgd2Vla2RheSwgZmlyc3REYXlPZldlZWtPZlllYXIsIGZpcnN0RGF5T2ZXZWVrKSB7XG4gICAgICAgIHZhciBkID0gY3JlYXRlVVRDRGF0ZSh5ZWFyLCAwLCAxKS5nZXRVVENEYXkoKTtcbiAgICAgICAgdmFyIGRheXNUb0FkZDtcbiAgICAgICAgdmFyIGRheU9mWWVhcjtcblxuICAgICAgICBkID0gZCA9PT0gMCA/IDcgOiBkO1xuICAgICAgICB3ZWVrZGF5ID0gd2Vla2RheSAhPSBudWxsID8gd2Vla2RheSA6IGZpcnN0RGF5T2ZXZWVrO1xuICAgICAgICBkYXlzVG9BZGQgPSBmaXJzdERheU9mV2VlayAtIGQgKyAoZCA+IGZpcnN0RGF5T2ZXZWVrT2ZZZWFyID8gNyA6IDApIC0gKGQgPCBmaXJzdERheU9mV2VlayA/IDcgOiAwKTtcbiAgICAgICAgZGF5T2ZZZWFyID0gNyAqICh3ZWVrIC0gMSkgKyAod2Vla2RheSAtIGZpcnN0RGF5T2ZXZWVrKSArIGRheXNUb0FkZCArIDE7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXIgICAgICA6IGRheU9mWWVhciA+IDAgPyB5ZWFyICAgICAgOiB5ZWFyIC0gMSxcbiAgICAgICAgICAgIGRheU9mWWVhciA6IGRheU9mWWVhciA+IDAgPyBkYXlPZlllYXIgOiBkYXlzSW5ZZWFyKHllYXIgLSAxKSArIGRheU9mWWVhclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhciAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBkYXlPZlllYXIgOiB0aGlzLmFkZCgoaW5wdXQgLSBkYXlPZlllYXIpLCAnZCcpO1xuICAgIH1cblxuICAgIC8vIFBpY2sgdGhlIGZpcnN0IGRlZmluZWQgb2YgdHdvIG9yIHRocmVlIGFyZ3VtZW50cy5cbiAgICBmdW5jdGlvbiBkZWZhdWx0cyhhLCBiLCBjKSB7XG4gICAgICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm93LmdldFVUQ0Z1bGxZZWFyKCksIG5vdy5nZXRVVENNb250aCgpLCBub3cuZ2V0VVRDRGF0ZSgpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW25vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKV07XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXG4gICAgLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcbiAgICAvLyBub3RlOiBhbGwgdmFsdWVzIHBhc3QgdGhlIHllYXIgYXJlIG9wdGlvbmFsIGFuZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cbiAgICAvLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tQXJyYXkgKGNvbmZpZykge1xuICAgICAgICB2YXIgaSwgZGF0ZSwgaW5wdXQgPSBbXSwgY3VycmVudERhdGUsIHllYXJUb1VzZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcblxuICAgICAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIpIHtcbiAgICAgICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dEYXlPZlllYXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxuICAgICAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XG4gICAgICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXG4gICAgICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXG4gICAgICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlOVVRFXSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xuICAgICAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBjcmVhdGVVVENEYXRlIDogY3JlYXRlRGF0ZSkuYXBwbHkobnVsbCwgaW5wdXQpO1xuICAgICAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcbiAgICAgICAgLy8gd2l0aCBwYXJzZVpvbmUuXG4gICAgICAgIGlmIChjb25maWcuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fbmV4dERheSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgICAgIHZhciB3LCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXA7XG5cbiAgICAgICAgdyA9IGNvbmZpZy5fdztcbiAgICAgICAgaWYgKHcuR0cgIT0gbnVsbCB8fCB3LlcgIT0gbnVsbCB8fCB3LkUgIT0gbnVsbCkge1xuICAgICAgICAgICAgZG93ID0gMTtcbiAgICAgICAgICAgIGRveSA9IDQ7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IFdlIG5lZWQgdG8gdGFrZSB0aGUgY3VycmVudCBpc29XZWVrWWVhciwgYnV0IHRoYXQgZGVwZW5kcyBvblxuICAgICAgICAgICAgLy8gaG93IHdlIGludGVycHJldCBub3cgKGxvY2FsLCB1dGMsIGZpeGVkIG9mZnNldCkuIFNvIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYSBub3cgdmVyc2lvbiBvZiBjdXJyZW50IGNvbmZpZyAodGFrZSBsb2NhbC91dGMvb2Zmc2V0IGZsYWdzLCBhbmRcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBub3cpLlxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LkdHLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIDEsIDQpLnllYXIpO1xuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcuVywgMSk7XG4gICAgICAgICAgICB3ZWVrZGF5ID0gZGVmYXVsdHMody5FLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvdyA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRvdztcbiAgICAgICAgICAgIGRveSA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRveTtcblxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIGRvdywgZG95KS55ZWFyKTtcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIDEpO1xuXG4gICAgICAgICAgICBpZiAody5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5kO1xuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICsrd2VlaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbG9jYWwgd2Vla2RheSAtLSBjb3VudGluZyBzdGFydHMgZnJvbSBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZSArIGRvdztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3ksIGRvdyk7XG5cbiAgICAgICAgY29uZmlnLl9hW1lFQVJdID0gdGVtcC55ZWFyO1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRlbXAuZGF5T2ZZZWFyO1xuICAgIH1cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKSB7XG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGNyZWF0aW9uIGZsb3cgdG8gcHJldmVudCBjaXJjdWxhciBkZXBzXG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IHV0aWxzX2hvb2tzX19ob29rcy5JU09fODYwMSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLl9hID0gW107XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcblxuICAgICAgICAvLyBUaGlzIGFycmF5IGlzIHVzZWQgdG8gbWFrZSBhIERhdGUsIGVpdGhlciB3aXRoIGBuZXcgRGF0ZWAgb3IgYERhdGUuVVRDYFxuICAgICAgICB2YXIgc3RyaW5nID0gJycgKyBjb25maWcuX2ksXG4gICAgICAgICAgICBpLCBwYXJzZWRJbnB1dCwgdG9rZW5zLCB0b2tlbiwgc2tpcHBlZCxcbiAgICAgICAgICAgIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoID0gMDtcblxuICAgICAgICB0b2tlbnMgPSBleHBhbmRGb3JtYXQoY29uZmlnLl9mLCBjb25maWcuX2xvY2FsZSkubWF0Y2goZm9ybWF0dGluZ1Rva2VucykgfHwgW107XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBza2lwcGVkID0gc3RyaW5nLnN1YnN0cigwLCBzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkpO1xuICAgICAgICAgICAgICAgIGlmIChza2lwcGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChza2lwcGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnNsaWNlKHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSArIHBhcnNlZElucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb24ndCBwYXJzZSBpZiBpdCdzIG5vdCBhIGtub3duIHRva2VuXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBwYXJzZWRJbnB1dCwgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCByZW1haW5pbmcgdW5wYXJzZWQgaW5wdXQgbGVuZ3RoIHRvIHRoZSBzdHJpbmdcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuY2hhcnNMZWZ0T3ZlciA9IHN0cmluZ0xlbmd0aCAtIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGg7XG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChzdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcbiAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPD0gMTIgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPiAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhhbmRsZSBtZXJpZGllbVxuICAgICAgICBjb25maWcuX2FbSE9VUl0gPSBtZXJpZGllbUZpeFdyYXAoY29uZmlnLl9sb2NhbGUsIGNvbmZpZy5fYVtIT1VSXSwgY29uZmlnLl9tZXJpZGllbSk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcCAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgICAgICB2YXIgaXNQbTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xuICAgICAgICB2YXIgdGVtcENvbmZpZyxcbiAgICAgICAgICAgIGJlc3RNb21lbnQsXG5cbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEZvcm1hdCA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZy5fZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gMDtcbiAgICAgICAgICAgIHRlbXBDb25maWcgPSBjb3B5Q29uZmlnKHt9LCBjb25maWcpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKHRlbXBDb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLmNoYXJzTGVmdE92ZXI7XG5cbiAgICAgICAgICAgIC8vb3IgdG9rZW5zXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnNjb3JlID0gY3VycmVudFNjb3JlO1xuXG4gICAgICAgICAgICBpZiAoc2NvcmVUb0JlYXQgPT0gbnVsbCB8fCBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xuICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgICAgIGJlc3RNb21lbnQgPSB0ZW1wQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XG4gICAgICAgIGNvbmZpZy5fYSA9IFtpLnllYXIsIGkubW9udGgsIGkuZGF5IHx8IGkuZGF0ZSwgaS5ob3VyLCBpLm1pbnV0ZSwgaS5zZWNvbmQsIGkubWlsbGlzZWNvbmRdO1xuXG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZyb21Db25maWcgKGNvbmZpZykge1xuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2ksXG4gICAgICAgICAgICBmb3JtYXQgPSBjb25maWcuX2YsXG4gICAgICAgICAgICByZXM7XG5cbiAgICAgICAgY29uZmlnLl9sb2NhbGUgPSBjb25maWcuX2xvY2FsZSB8fCBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGNvbmZpZy5fbCk7XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoe251bGxJbnB1dDogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZy5faSA9IGlucHV0ID0gY29uZmlnLl9sb2NhbGUucHJlcGFyc2UoaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTW9tZW50KGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhpbnB1dCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZm9ybWF0KSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0KSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gaW5wdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25maWdGcm9tSW5wdXQoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcyA9IG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhjb25maWcpKTtcbiAgICAgICAgaWYgKHJlcy5fbmV4dERheSkge1xuICAgICAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXG4gICAgICAgICAgICByZXMuYWRkKDEsICdkJyk7XG4gICAgICAgICAgICByZXMuX25leHREYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgICAgICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgraW5wdXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG9iaiwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaW5wdXQpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uZmlnRnJvbU9iamVjdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbE9yVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBpZiAodHlwZW9mKGxvY2FsZSkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xuICAgICAgICBjLl9sID0gbG9jYWxlO1xuICAgICAgICBjLl9pID0gaW5wdXQ7XG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcblxuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbF9fY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAgICAgICdtb21lbnQoKS5taW4gaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxuICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgIHZhciBvdGhlciA9IGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgIHJldHVybiBvdGhlciA8IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgICB9XG4gICAgICk7XG5cbiAgICB2YXIgcHJvdG90eXBlTWF4ID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIC8vIFBpY2sgYSBtb21lbnQgbSBmcm9tIG1vbWVudHMgc28gdGhhdCBtW2ZuXShvdGhlcikgaXMgdHJ1ZSBmb3IgYWxsXG4gICAgLy8gb3RoZXIuIFRoaXMgcmVsaWVzIG9uIHRoZSBmdW5jdGlvbiBmbiB0byBiZSB0cmFuc2l0aXZlLlxuICAgIC8vXG4gICAgLy8gbW9tZW50cyBzaG91bGQgZWl0aGVyIGJlIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzIG9yIGFuIGFycmF5LCB3aG9zZVxuICAgIC8vIGZpcnN0IGVsZW1lbnQgaXMgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMuXG4gICAgZnVuY3Rpb24gcGlja0J5KGZuLCBtb21lbnRzKSB7XG4gICAgICAgIHZhciByZXMsIGk7XG4gICAgICAgIGlmIChtb21lbnRzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG1vbWVudHNbMF0pKSB7XG4gICAgICAgICAgICBtb21lbnRzID0gbW9tZW50c1swXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1vbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzID0gbW9tZW50c1swXTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChtb21lbnRzW2ldW2ZuXShyZXMpKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gbW9tZW50c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XG4gICAgZnVuY3Rpb24gbWluICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXggKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gRHVyYXRpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXG4gICAgICAgICAgICB5ZWFycyA9IG5vcm1hbGl6ZWRJbnB1dC55ZWFyIHx8IDAsXG4gICAgICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXG4gICAgICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcbiAgICAgICAgICAgIHdlZWtzID0gbm9ybWFsaXplZElucHV0LndlZWsgfHwgMCxcbiAgICAgICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXG4gICAgICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXG4gICAgICAgICAgICBtaW51dGVzID0gbm9ybWFsaXplZElucHV0Lm1pbnV0ZSB8fCAwLFxuICAgICAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xuXG4gICAgICAgIC8vIHJlcHJlc2VudGF0aW9uIGZvciBkYXRlQWRkUmVtb3ZlXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9ICttaWxsaXNlY29uZHMgK1xuICAgICAgICAgICAgc2Vjb25kcyAqIDFlMyArIC8vIDEwMDBcbiAgICAgICAgICAgIG1pbnV0ZXMgKiA2ZTQgKyAvLyAxMDAwICogNjBcbiAgICAgICAgICAgIGhvdXJzICogMzZlNTsgLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgLy8gQmVjYXVzZSBvZiBkYXRlQWRkUmVtb3ZlIHRyZWF0cyAyNCBob3VycyBhcyBkaWZmZXJlbnQgZnJvbSBhXG4gICAgICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcbiAgICAgICAgdGhpcy5fZGF5cyA9ICtkYXlzICtcbiAgICAgICAgICAgIHdlZWtzICogNztcbiAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAgICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXG4gICAgICAgICAgICBxdWFydGVycyAqIDMgK1xuICAgICAgICAgICAgeWVhcnMgKiAxMjtcblxuICAgICAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICAgICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xuXG4gICAgICAgIHRoaXMuX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRHVyYXRpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb2Zmc2V0ICh0b2tlbiwgc2VwYXJhdG9yKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgICAgIHZhciBzaWduID0gJysnO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNpZ24gPSAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2lnbiArIHplcm9GaWxsKH5+KG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyB6ZXJvRmlsbCh+fihvZmZzZXQpICUgNjAsIDIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvZmZzZXQoJ1onLCAnOicpO1xuICAgIG9mZnNldCgnWlonLCAnJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdaJywgIG1hdGNoT2Zmc2V0KTtcbiAgICBhZGRSZWdleFRva2VuKCdaWicsIG1hdGNoT2Zmc2V0KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl91c2VVVEMgPSB0cnVlO1xuICAgICAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gdGltZXpvbmUgY2h1bmtlclxuICAgIC8vICcrMTA6MDAnID4gWycxMCcsICAnMDAnXVxuICAgIC8vICctMTUzMCcgID4gWyctMTUnLCAnMzAnXVxuICAgIHZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcblxuICAgIGZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gKChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoT2Zmc2V0KSB8fCBbXSk7XG4gICAgICAgIHZhciBjaHVuayAgID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdIHx8IFtdO1xuICAgICAgICB2YXIgcGFydHMgICA9IChjaHVuayArICcnKS5tYXRjaChjaHVua09mZnNldCkgfHwgWyctJywgMCwgMF07XG4gICAgICAgIHZhciBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcblxuICAgICAgICByZXR1cm4gcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBtb21lbnQgZnJvbSBpbnB1dCwgdGhhdCBpcyBsb2NhbC91dGMvem9uZSBlcXVpdmFsZW50IHRvIG1vZGVsLlxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICAgIGRpZmYgPSAoaXNNb21lbnQoaW5wdXQpIHx8IGlzRGF0ZShpbnB1dCkgPyAraW5wdXQgOiArbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KSkgLSAoK3Jlcyk7XG4gICAgICAgICAgICAvLyBVc2UgbG93LWxldmVsIGFwaSwgYmVjYXVzZSB0aGlzIGZuIGlzIGxvdy1sZXZlbCBhcGkuXG4gICAgICAgICAgICByZXMuX2Quc2V0VGltZSgrcmVzLl9kICsgZGlmZik7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHJlcywgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vZGVsLl9pc1VUQyA/IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkuem9uZShtb2RlbC5fb2Zmc2V0IHx8IDApIDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS5sb2NhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVPZmZzZXQgKG0pIHtcbiAgICAgICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvcHVsbC8xODcxXG4gICAgICAgIHJldHVybiAtTWF0aC5yb3VuZChtLl9kLmdldFRpbWV6b25lT2Zmc2V0KCkgLyAxNSkgKiAxNTtcbiAgICB9XG5cbiAgICAvLyBIT09LU1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciBhIG1vbWVudCBpcyBtdXRhdGVkLlxuICAgIC8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxuICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxuICAgIC8vIGFmZmVjdGluZyB0aGUgbG9jYWwgaG91ci4gU28gNTozMToyNiArMDMwMCAtLVt1dGNPZmZzZXQoMiwgdHJ1ZSldLS0+XG4gICAgLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxuICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cbiAgICAvL1xuICAgIC8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxuICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxuICAgIC8vIGEgc2Vjb25kIHRpbWUuIEluIGNhc2UgaXQgd2FudHMgdXMgdG8gY2hhbmdlIHRoZSBvZmZzZXQgYWdhaW5cbiAgICAvLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2VcbiAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxuICAgIGZ1bmN0aW9uIGdldFNldE9mZnNldCAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX29mZnNldCB8fCAwLFxuICAgICAgICAgICAgbG9jYWxBZGp1c3Q7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gb2Zmc2V0RnJvbVN0cmluZyhpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoaW5wdXQpIDwgMTYpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVVRDICYmIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgY3JlYXRlX19jcmVhdGVEdXJhdGlvbihpbnB1dCAtIG9mZnNldCwgJ20nKSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gb2Zmc2V0IDogZ2V0RGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldFpvbmUgKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gLWlucHV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9VVEMgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvTG9jYWwgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzVVRDKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMpLCAnbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3R6bSkge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodGhpcy5fdHptKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5faSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KG9mZnNldEZyb21TdHJpbmcodGhpcy5faSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0IChpbnB1dCkge1xuICAgICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dCA9IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkudXRjT2Zmc2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDApLnV0Y09mZnNldCgpIHx8XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2EpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IHRoaXMuX2lzVVRDID8gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKHRoaXMuX2EpIDogbG9jYWxfX2NyZWF0ZUxvY2FsKHRoaXMuX2EpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpICYmIGNvbXBhcmVBcnJheXModGhpcy5fYSwgb3RoZXIudG9BcnJheSgpKSA+IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMb2NhbCAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5faXNVVEM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGNPZmZzZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgJiYgdGhpcy5fb2Zmc2V0ID09PSAwO1xuICAgIH1cblxuICAgIHZhciBhc3BOZXRSZWdleCA9IC8oXFwtKT8oPzooXFxkKilcXC4pPyhcXGQrKVxcOihcXGQrKSg/OlxcOihcXGQrKVxcLj8oXFxkezN9KT8pPy87XG5cbiAgICAvLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxuICAgIC8vIHNvbWV3aGF0IG1vcmUgaW4gbGluZSB3aXRoIDQuNC4zLjIgMjAwNCBzcGVjLCBidXQgYWxsb3dzIGRlY2ltYWwgYW55d2hlcmVcbiAgICB2YXIgY3JlYXRlX19pc29SZWdleCA9IC9eKC0pP1AoPzooPzooWzAtOSwuXSopWSk/KD86KFswLTksLl0qKU0pPyg/OihbMC05LC5dKilEKT8oPzpUKD86KFswLTksLl0qKUgpPyg/OihbMC05LC5dKilNKT8oPzooWzAtOSwuXSopUyk/KT98KFswLTksLl0qKVcpJC87XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgIHNpZ24sXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgICAgIGQgIDogaW5wdXQuX2RheXMsXG4gICAgICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9IGlucHV0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbi5taWxsaXNlY29uZHMgPSBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHkgIDogMCxcbiAgICAgICAgICAgICAgICBkICA6IHRvSW50KG1hdGNoW0RBVEVdKSAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIGggIDogdG9JbnQobWF0Y2hbSE9VUl0pICAgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBzICA6IHRvSW50KG1hdGNoW1NFQ09ORF0pICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIG1zIDogdG9JbnQobWF0Y2hbTUlMTElTRUNPTkRdKSAqIHNpZ25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBjcmVhdGVfX2lzb1JlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHkgOiBwYXJzZUlzbyhtYXRjaFsyXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgTSA6IHBhcnNlSXNvKG1hdGNoWzNdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBkIDogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs1XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgbSA6IHBhcnNlSXNvKG1hdGNoWzZdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBzIDogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHcgOiBwYXJzZUlzbyhtYXRjaFs4XSwgc2lnbilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkgey8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAnb2JqZWN0JyAmJiAoJ2Zyb20nIGluIGR1cmF0aW9uIHx8ICd0bycgaW4gZHVyYXRpb24pKSB7XG4gICAgICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UobG9jYWxfX2NyZWF0ZUxvY2FsKGR1cmF0aW9uLmZyb20pLCBsb2NhbF9fY3JlYXRlTG9jYWwoZHVyYXRpb24udG8pKTtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2xvY2FsZScpKSB7XG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24uZm4gPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XG4gICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgICAgIC8vIGNvbnZlcnRzIGZsb2F0cyB0byBpbnRzLlxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAvLyBhcHBseSBzaWduIHdoaWxlIHdlJ3JlIGF0IGl0XG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXMgPSB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuXG4gICAgICAgIHJlcy5tb250aHMgPSBvdGhlci5tb250aCgpIC0gYmFzZS5tb250aCgpICtcbiAgICAgICAgICAgIChvdGhlci55ZWFyKCkgLSBiYXNlLnllYXIoKSkgKiAxMjtcbiAgICAgICAgaWYgKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKS5pc0FmdGVyKG90aGVyKSkge1xuICAgICAgICAgICAgLS1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICsoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpKTtcblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXM7XG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIHBlcmlvZCkge1xuICAgICAgICAgICAgdmFyIGR1ciwgdG1wO1xuICAgICAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XG4gICAgICAgICAgICBpZiAocGVyaW9kICE9PSBudWxsICYmICFpc05hTigrcGVyaW9kKSkge1xuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCAnbW9tZW50KCkuJyArIG5hbWUgICsgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICsgbmFtZSArICcobnVtYmVyLCBwZXJpb2QpLicpO1xuICAgICAgICAgICAgICAgIHRtcCA9IHZhbDsgdmFsID0gcGVyaW9kOyBwZXJpb2QgPSB0bXA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gK3ZhbCA6IHZhbDtcbiAgICAgICAgICAgIGR1ciA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24odmFsLCBwZXJpb2QpO1xuICAgICAgICAgICAgYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBkdXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0IChtb20sIGR1cmF0aW9uLCBpc0FkZGluZywgdXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZGF5cyA9IGR1cmF0aW9uLl9kYXlzLFxuICAgICAgICAgICAgbW9udGhzID0gZHVyYXRpb24uX21vbnRocztcbiAgICAgICAgdXBkYXRlT2Zmc2V0ID0gdXBkYXRlT2Zmc2V0ID09IG51bGwgPyB0cnVlIDogdXBkYXRlT2Zmc2V0O1xuXG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgICAgIG1vbS5fZC5zZXRUaW1lKCttb20uX2QgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRheXMpIHtcbiAgICAgICAgICAgIGdldF9zZXRfX3NldChtb20sICdEYXRlJywgZ2V0X3NldF9fZ2V0KG1vbSwgJ0RhdGUnKSArIGRheXMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vbnRocykge1xuICAgICAgICAgICAgc2V0TW9udGgobW9tLCBnZXRfc2V0X19nZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlT2Zmc2V0KSB7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFkZF9zdWJ0cmFjdF9fYWRkICAgICAgPSBjcmVhdGVBZGRlcigxLCAnYWRkJyk7XG4gICAgdmFyIGFkZF9zdWJ0cmFjdF9fc3VidHJhY3QgPSBjcmVhdGVBZGRlcigtMSwgJ3N1YnRyYWN0Jyk7XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfY2FsZW5kYXJfX2NhbGVuZGFyICh0aW1lKSB7XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gY29tcGFyZSB0aGUgc3RhcnQgb2YgdG9kYXksIHZzIHRoaXMuXG4gICAgICAgIC8vIEdldHRpbmcgc3RhcnQtb2YtdG9kYXkgZGVwZW5kcyBvbiB3aGV0aGVyIHdlJ3JlIGxvY2FsL3V0Yy9vZmZzZXQgb3Igbm90LlxuICAgICAgICB2YXIgbm93ID0gdGltZSB8fCBsb2NhbF9fY3JlYXRlTG9jYWwoKSxcbiAgICAgICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICAgICAgZGlmZiA9IHRoaXMuZGlmZihzb2QsICdkYXlzJywgdHJ1ZSksXG4gICAgICAgICAgICBmb3JtYXQgPSBkaWZmIDwgLTYgPyAnc2FtZUVsc2UnIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgLTEgPyAnbGFzdFdlZWsnIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMCA/ICdsYXN0RGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDEgPyAnc2FtZURheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAyID8gJ25leHREYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgNyA/ICduZXh0V2VlaycgOiAnc2FtZUVsc2UnO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5sb2NhbGVEYXRhKCkuY2FsZW5kYXIoZm9ybWF0LCB0aGlzLCBsb2NhbF9fY3JlYXRlTG9jYWwobm93KSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb25lICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBZnRlciAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBpbnB1dE1zO1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHR5cGVvZiB1bml0cyAhPT0gJ3VuZGVmaW5lZCcgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzID4gK2lucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9IGlzTW9tZW50KGlucHV0KSA/ICtpbnB1dCA6ICtsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0TXMgPCArdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgaW5wdXRNcztcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh0eXBlb2YgdW5pdHMgIT09ICd1bmRlZmluZWQnID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiArdGhpcyA8ICtpbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0TXMgPSBpc01vbWVudChpbnB1dCkgPyAraW5wdXQgOiArbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiArdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKSA8IGlucHV0TXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JldHdlZW4gKGZyb20sIHRvLCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FmdGVyKGZyb20sIHVuaXRzKSAmJiB0aGlzLmlzQmVmb3JlKHRvLCB1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGlucHV0TXM7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMgfHwgJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgaW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMgPT09ICtpbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0TXMgPSArbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiArKHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKSkgPD0gaW5wdXRNcyAmJiBpbnB1dE1zIDw9ICsodGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNGbG9vciAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlmZiAoaW5wdXQsIHVuaXRzLCBhc0Zsb2F0KSB7XG4gICAgICAgIHZhciB0aGF0ID0gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCB0aGlzKSxcbiAgICAgICAgICAgIHpvbmVEZWx0YSA9ICh0aGF0LnV0Y09mZnNldCgpIC0gdGhpcy51dGNPZmZzZXQoKSkgKiA2ZTQsXG4gICAgICAgICAgICBkZWx0YSwgb3V0cHV0O1xuXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3llYXInIHx8IHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTtcbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0IC8gMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsdGEgPSB0aGlzIC0gdGhhdDtcbiAgICAgICAgICAgIG91dHB1dCA9IHVuaXRzID09PSAnc2Vjb25kJyA/IGRlbHRhIC8gMWUzIDogLy8gMTAwMFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnbWludXRlJyA/IGRlbHRhIC8gNmU0IDogLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdob3VyJyA/IGRlbHRhIC8gMzZlNSA6IC8vIDEwMDAgKiA2MCAqIDYwXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdkYXknID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDg2NGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCwgbmVnYXRlIGRzdFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnd2VlaycgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gNjA0OGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgICAgICBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXNGbG9hdCA/IG91dHB1dCA6IGFic0Zsb29yKG91dHB1dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9udGhEaWZmIChhLCBiKSB7XG4gICAgICAgIC8vIGRpZmZlcmVuY2UgaW4gbW9udGhzXG4gICAgICAgIHZhciB3aG9sZU1vbnRoRGlmZiA9ICgoYi55ZWFyKCkgLSBhLnllYXIoKSkgKiAxMikgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcbiAgICAgICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXG4gICAgICAgICAgICBhbmNob3IgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmLCAnbW9udGhzJyksXG4gICAgICAgICAgICBhbmNob3IyLCBhZGp1c3Q7XG5cbiAgICAgICAgaWYgKGIgLSBhbmNob3IgPCAwKSB7XG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiAtIDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yIC0gYW5jaG9yMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgICAgICBhZGp1c3QgPSAoYiAtIGFuY2hvcikgLyAoYW5jaG9yMiAtIGFuY2hvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCk7XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onO1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmxvY2FsZSgnZW4nKS5mb3JtYXQoJ2RkZCBNTU0gREQgWVlZWSBISDptbTpzcyBbR01UXVpaJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmcgKCkge1xuICAgICAgICB2YXIgbSA9IHRoaXMuY2xvbmUoKS51dGMoKTtcbiAgICAgICAgaWYgKDAgPCBtLnllYXIoKSAmJiBtLnllYXIoKSA8PSA5OTk5KSB7XG4gICAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGlzIH41MHggZmFzdGVyLCB1c2UgaXQgd2hlbiB3ZSBjYW5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdCAoaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdE1vbWVudCh0aGlzLCBpbnB1dFN0cmluZyB8fCB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdCk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5wb3N0Zm9ybWF0KG91dHB1dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJvbSAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7dG86IHRoaXMsIGZyb206IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb21Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG8gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oe2Zyb206IHRoaXMsIHRvOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b05vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy50byhsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFuZyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVEYXRhICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydE9mICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBzd2l0Y2ggaW50ZW50aW9uYWxseSBvbWl0cyBicmVhayBrZXl3b3Jkc1xuICAgICAgICAvLyB0byB1dGlsaXplIGZhbGxpbmcgdGhyb3VnaCB0aGUgY2FzZXMuXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICB0aGlzLm1vbnRoKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgY2FzZSAnaXNvV2Vlayc6XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICB0aGlzLmhvdXJzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIHRoaXMubWludXRlcygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMubWlsbGlzZWNvbmRzKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Vla3MgYXJlIGEgc3BlY2lhbCBjYXNlXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgICB0aGlzLndlZWtkYXkoMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVuaXRzID09PSAnaXNvV2VlaycpIHtcbiAgICAgICAgICAgIHRoaXMuaXNvV2Vla2RheSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHF1YXJ0ZXJzIGFyZSBhbHNvIHNwZWNpYWxcbiAgICAgICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMubW9udGgoTWF0aC5mbG9vcih0aGlzLm1vbnRoKCkgLyAzKSAqIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kT2YgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRPZih1bml0cykuYWRkKDEsICh1bml0cyA9PT0gJ2lzb1dlZWsnID8gJ3dlZWsnIDogdW5pdHMpKS5zdWJ0cmFjdCgxLCAnbXMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b190eXBlX192YWx1ZU9mICgpIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLl9kIC0gKCh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5peCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCt0aGlzIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9EYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldCA/IG5ldyBEYXRlKCt0aGlzKSA6IHRoaXMuX2Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9BcnJheSAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcztcbiAgICAgICAgcmV0dXJuIFttLnllYXIoKSwgbS5tb250aCgpLCBtLmRhdGUoKSwgbS5ob3VyKCksIG0ubWludXRlKCksIG0uc2Vjb25kKCksIG0ubWlsbGlzZWNvbmQoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50X3ZhbGlkX19pc1ZhbGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkX19pc1ZhbGlkKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNpbmdGbGFncyAoKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGdldFBhcnNpbmdGbGFncyh0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW52YWxpZEF0ICgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ2dnJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnR0cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYWRkV2Vla1llYXJGb3JtYXRUb2tlbiAodG9rZW4sIGdldHRlcikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIHRva2VuLmxlbmd0aF0sIDAsIGdldHRlcik7XG4gICAgfVxuXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZycsICAgICAnd2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICAgICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAgJ2lzb1dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHR0cnLCAnaXNvV2Vla1llYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2Vla1llYXInLCAnZ2cnKTtcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWtZZWFyJywgJ0dHJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdHJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignZycsICAgICAgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdnZycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignR0dHRycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHRycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZ2cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZ2dnJywgJ2dnZ2dnJywgJ0dHR0cnLCAnR0dHR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDIpXSA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2cnLCAnR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW5dID0gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIGZ1bmN0aW9uIHdlZWtzSW5ZZWFyKHllYXIsIGRvdywgZG95KSB7XG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKGxvY2FsX19jcmVhdGVMb2NhbChbeWVhciwgMTEsIDMxICsgZG93IC0gZG95XSksIGRvdywgZG95KS53ZWVrO1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyIChpbnB1dCkge1xuICAgICAgICB2YXIgeWVhciA9IHdlZWtPZlllYXIodGhpcywgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LCB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3kpLnllYXI7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8geWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIHllYXIpLCAneScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyIChpbnB1dCkge1xuICAgICAgICB2YXIgeWVhciA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkueWVhcjtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB5ZWFyIDogdGhpcy5hZGQoKGlucHV0IC0geWVhciksICd5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIgKCkge1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIDEsIDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5ZZWFyICgpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgMCwgJ3F1YXJ0ZXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcbiAgICBhZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlciAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMykgOiB0aGlzLm1vbnRoKChpbnB1dCAtIDEpICogMyArIHRoaXMubW9udGgoKSAlIDMpO1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0QnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdEbycsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IGxvY2FsZS5fb3JkaW5hbFBhcnNlIDogbG9jYWxlLl9vcmRpbmFsUGFyc2VMZW5pZW50O1xuICAgIH0pO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ0QnLCAnREQnXSwgREFURSk7XG4gICAgYWRkUGFyc2VUb2tlbignRG8nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSwgMTApO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldERheU9mTW9udGggPSBtYWtlR2V0U2V0KCdEYXRlJywgdHJ1ZSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZCcsIDAsICdkbycsICdkYXknKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNTaG9ydCh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5cyh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2UnLCAwLCAwLCAnd2Vla2RheScpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdFJywgMCwgMCwgJ2lzb1dlZWtkYXknKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnZGF5JywgJ2QnKTtcbiAgICBhZGRVbml0QWxpYXMoJ3dlZWtkYXknLCAnZScpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla2RheScsICdFJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdkJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdlJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdFJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdkZCcsICAgbWF0Y2hXb3JkKTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCAgbWF0Y2hXb3JkKTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGRkJywgbWF0Y2hXb3JkKTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZGQnLCAnZGRkJywgJ2RkZGQnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcpIHtcbiAgICAgICAgdmFyIHdlZWtkYXkgPSBjb25maWcuX2xvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KTtcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGdldCBhIHdlZWtkYXkgbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkXG4gICAgICAgIGlmICh3ZWVrZGF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHdlZWsuZCA9IHdlZWtkYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkV2Vla2RheSA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2QnLCAnZScsICdFJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuXSA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIGZ1bmN0aW9uIHBhcnNlV2Vla2RheShpbnB1dCwgbG9jYWxlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gcGFyc2VJbnQoaW5wdXQsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5cyA9ICdTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheScuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5cyAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNbbS5kYXkoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0ID0gJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0IChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4gKG0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluW20uZGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2UgKHdlZWtkYXlOYW1lKSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICBtb20gPSBsb2NhbF9fY3JlYXRlTG9jYWwoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRheTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxuICAgICAgICAvLyBhcyBhIGdldHRlciwgcmV0dXJucyA3IGluc3RlYWQgb2YgMCAoMS03IHJhbmdlIGluc3RlYWQgb2YgMC02KVxuICAgICAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gdGhpcy5kYXkoKSB8fCA3IDogdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyBpbnB1dCA6IGlucHV0IC0gNyk7XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0gnLCBbJ0hIJywgMl0sIDAsICdob3VyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ2gnLCBbJ2hoJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSAlIDEyIHx8IDEyO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW0gKHRva2VuLCBsb3dlcmNhc2UpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tZXJpZGllbSh0aGlzLmhvdXJzKCksIHRoaXMubWludXRlcygpLCBsb3dlcmNhc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtZXJpZGllbSgnYScsIHRydWUpO1xuICAgIG1lcmlkaWVtKCdBJywgZmFsc2UpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdob3VyJywgJ2gnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGZ1bmN0aW9uIG1hdGNoTWVyaWRpZW0gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5fbWVyaWRpZW1QYXJzZTtcbiAgICB9XG5cbiAgICBhZGRSZWdleFRva2VuKCdhJywgIG1hdGNoTWVyaWRpZW0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0EnLCAgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignSCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2gnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdISCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdoaCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydIJywgJ0hIJ10sIEhPVVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydhJywgJ0EnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5faXNQbSA9IGNvbmZpZy5fbG9jYWxlLmlzUE0oaW5wdXQpO1xuICAgICAgICBjb25maWcuX21lcmlkaWVtID0gaW5wdXQ7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ2gnLCAnaGgnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0gKGlucHV0KSB7XG4gICAgICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcbiAgICAgICAgLy8gVXNpbmcgY2hhckF0IHNob3VsZCBiZSBtb3JlIGNvbXBhdGlibGUuXG4gICAgICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxuICAgIC8vIHNwZWNpZmllZCB3aGljaCBob3VyIGhlIHdhbnRzLiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cbiAgICAvLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcbiAgICAvLyB0aGlzIHJ1bGUuXG4gICAgdmFyIGdldFNldEhvdXIgPSBtYWtlR2V0U2V0KCdIb3VycycsIHRydWUpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sIDAsICdtaW51dGUnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWludXRlJywgJ20nKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ20nLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdzZWNvbmQnLCAncycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3NzJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydzJywgJ3NzJ10sIFNFQ09ORCk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0U2Vjb25kID0gbWFrZUdldFNldCgnU2Vjb25kcycsIGZhbHNlKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdTJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTAwKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTApO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWlsbGlzZWNvbmRfX21pbGxpc2Vjb25kcyAodG9rZW4pIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XG4gICAgfVxuXG4gICAgbWlsbGlzZWNvbmRfX21pbGxpc2Vjb25kcygnU1NTJyk7XG4gICAgbWlsbGlzZWNvbmRfX21pbGxpc2Vjb25kcygnU1NTUycpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdtaWxsaXNlY29uZCcsICdtcycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignUycsICAgIG1hdGNoMXRvMywgbWF0Y2gxKTtcbiAgICBhZGRSZWdleFRva2VuKCdTUycsICAgbWF0Y2gxdG8zLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTUycsICBtYXRjaDF0bzMsIG1hdGNoMyk7XG4gICAgYWRkUmVnZXhUb2tlbignU1NTUycsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydTJywgJ1NTJywgJ1NTUycsICdTU1NTJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRNaWxsaXNlY29uZCA9IG1ha2VHZXRTZXQoJ01pbGxpc2Vjb25kcycsIGZhbHNlKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCd6JywgIDAsIDAsICd6b25lQWJicicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd6eicsIDAsIDAsICd6b25lTmFtZScpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0Wm9uZUFiYnIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnVVRDJyA6ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvbmVOYW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ0Nvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lJyA6ICcnO1xuICAgIH1cblxuICAgIHZhciBtb21lbnRQcm90b3R5cGVfX3Byb3RvID0gTW9tZW50LnByb3RvdHlwZTtcblxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uYWRkICAgICAgICAgID0gYWRkX3N1YnRyYWN0X19hZGQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jYWxlbmRhciAgICAgPSBtb21lbnRfY2FsZW5kYXJfX2NhbGVuZGFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uY2xvbmUgICAgICAgID0gY2xvbmU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kaWZmICAgICAgICAgPSBkaWZmO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZW5kT2YgICAgICAgID0gZW5kT2Y7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mb3JtYXQgICAgICAgPSBmb3JtYXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mcm9tICAgICAgICAgPSBmcm9tO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbU5vdyAgICAgID0gZnJvbU5vdztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvICAgICAgICAgICA9IHRvO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9Ob3cgICAgICAgID0gdG9Ob3c7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgPSBnZXRTZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pbnZhbGlkQXQgICAgPSBpbnZhbGlkQXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0FmdGVyICAgICAgPSBpc0FmdGVyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNCZWZvcmUgICAgID0gaXNCZWZvcmU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0JldHdlZW4gICAgPSBpc0JldHdlZW47XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWUgICAgICAgPSBpc1NhbWU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1ZhbGlkICAgICAgPSBtb21lbnRfdmFsaWRfX2lzVmFsaWQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sYW5nICAgICAgICAgPSBsYW5nO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWxlICAgICAgID0gbG9jYWxlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubG9jYWxlRGF0YSAgID0gbG9jYWxlRGF0YTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1heCAgICAgICAgICA9IHByb3RvdHlwZU1heDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbiAgICAgICAgICA9IHByb3RvdHlwZU1pbjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnBhcnNpbmdGbGFncyA9IHBhcnNpbmdGbGFncztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICA9IGdldFNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnN0YXJ0T2YgICAgICA9IHN0YXJ0T2Y7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgPSBhZGRfc3VidHJhY3RfX3N1YnRyYWN0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9BcnJheSAgICAgID0gdG9BcnJheTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvRGF0ZSAgICAgICA9IHRvRGF0ZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvSVNPU3RyaW5nICA9IG1vbWVudF9mb3JtYXRfX3RvSVNPU3RyaW5nO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9KU09OICAgICAgID0gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b1N0cmluZyAgICAgPSB0b1N0cmluZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnVuaXggICAgICAgICA9IHVuaXg7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgPSB0b190eXBlX192YWx1ZU9mO1xuXG4gICAgLy8gWWVhclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcblxuICAgIC8vIFdlZWsgWWVhclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla1llYXIgICAgPSBnZXRTZXRXZWVrWWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XG5cbiAgICAvLyBRdWFydGVyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVyID0gbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XG5cbiAgICAvLyBNb250aFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGggICAgICAgPSBnZXRTZXRNb250aDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGg7XG5cbiAgICAvLyBXZWVrXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgID0gZ2V0U2V0V2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWsgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrcyAgICAgPSBnZXRTZXRJU09XZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3NJblllYXIgICAgPSBnZXRXZWVrc0luWWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XG5cbiAgICAvLyBEYXlcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRhdGUgICAgICAgPSBnZXRTZXREYXlPZk1vbnRoO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5ICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgICA9IGdldFNldERheU9mV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5T2ZZZWFyICA9IGdldFNldERheU9mWWVhcjtcblxuICAgIC8vIEhvdXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXJzID0gZ2V0U2V0SG91cjtcblxuICAgIC8vIE1pbnV0ZVxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWludXRlID0gbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xuXG4gICAgLy8gU2Vjb25kXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgPSBnZXRTZXRTZWNvbmQ7XG5cbiAgICAvLyBNaWxsaXNlY29uZFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xuXG4gICAgLy8gT2Zmc2V0XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51dGNPZmZzZXQgICAgICAgICAgICA9IGdldFNldE9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0YyAgICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9VVEM7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbCAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvTG9jYWw7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzZVpvbmUgICAgICAgICAgICA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUICAgICAgICAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0RTVFNoaWZ0ZWQgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTG9jYWwgICAgICAgICAgICAgID0gaXNMb2NhbDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjT2Zmc2V0ICAgICAgICAgID0gaXNVdGNPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1V0YyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVVEMgICAgICAgICAgICAgICAgPSBpc1V0YztcblxuICAgIC8vIFRpbWV6b25lXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lQWJiciA9IGdldFpvbmVBYmJyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcblxuICAgIC8vIERlcHJlY2F0aW9uc1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZXMgID0gZGVwcmVjYXRlKCdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsIGdldFNldERheU9mTW9udGgpO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFycyAgPSBkZXByZWNhdGUoJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLCBnZXRTZXRZZWFyKTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmUgICA9IGRlcHJlY2F0ZSgnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNzc5JywgZ2V0U2V0Wm9uZSk7XG5cbiAgICB2YXIgbW9tZW50UHJvdG90eXBlID0gbW9tZW50UHJvdG90eXBlX19wcm90bztcblxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlVW5peCAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCAqIDEwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlSW5ab25lICgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXG4gICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXG4gICAgICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxuICAgICAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcbiAgICAgICAgc2FtZUVsc2UgOiAnTCdcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhciAoa2V5LCBtb20sIG5vdykge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvdXRwdXQgPT09ICdmdW5jdGlvbicgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb25nRGF0ZUZvcm1hdCA9IHtcbiAgICAgICAgTFRTICA6ICdoOm1tOnNzIEEnLFxuICAgICAgICBMVCAgIDogJ2g6bW0gQScsXG4gICAgICAgIEwgICAgOiAnTU0vREQvWVlZWScsXG4gICAgICAgIExMICAgOiAnTU1NTSBELCBZWVlZJyxcbiAgICAgICAgTExMICA6ICdNTU1NIEQsIFlZWVkgTFQnLFxuICAgICAgICBMTExMIDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBMVCdcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9uZ0RhdGVGb3JtYXQgKGtleSkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XTtcbiAgICAgICAgaWYgKCFvdXRwdXQgJiYgdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV0ucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLnNsaWNlKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gb3V0cHV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xuXG4gICAgZnVuY3Rpb24gaW52YWxpZERhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJztcbiAgICB2YXIgZGVmYXVsdE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XG5cbiAgICBmdW5jdGlvbiBvcmRpbmFsIChudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgICAgIGZ1dHVyZSA6ICdpbiAlcycsXG4gICAgICAgIHBhc3QgICA6ICclcyBhZ28nLFxuICAgICAgICBzICA6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgICAgbSAgOiAnYSBtaW51dGUnLFxuICAgICAgICBtbSA6ICclZCBtaW51dGVzJyxcbiAgICAgICAgaCAgOiAnYW4gaG91cicsXG4gICAgICAgIGhoIDogJyVkIGhvdXJzJyxcbiAgICAgICAgZCAgOiAnYSBkYXknLFxuICAgICAgICBkZCA6ICclZCBkYXlzJyxcbiAgICAgICAgTSAgOiAnYSBtb250aCcsXG4gICAgICAgIE1NIDogJyVkIG1vbnRocycsXG4gICAgICAgIHkgIDogJ2EgeWVhcicsXG4gICAgICAgIHl5IDogJyVkIHllYXJzJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJpbmddO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBvdXRwdXQgPT09ICdmdW5jdGlvbicpID9cbiAgICAgICAgICAgIG91dHB1dChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIDpcbiAgICAgICAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhc3RGdXR1cmUgKGRpZmYsIG91dHB1dCkge1xuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuICAgICAgICByZXR1cm4gdHlwZW9mIGZvcm1hdCA9PT0gJ2Z1bmN0aW9uJyA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlX3NldF9fc2V0IChjb25maWcpIHtcbiAgICAgICAgdmFyIHByb3AsIGk7XG4gICAgICAgIGZvciAoaSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIHByb3AgPSBjb25maWdbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gcHJvcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXG4gICAgICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX29yZGluYWxQYXJzZUxlbmllbnQuXG4gICAgICAgIHRoaXMuX29yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UgKyAnfCcgKyAoL1xcZHsxLDJ9Lykuc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG90eXBlX19wcm90byA9IExvY2FsZS5wcm90b3R5cGU7XG5cbiAgICBwcm90b3R5cGVfX3Byb3RvLl9jYWxlbmRhciAgICAgICA9IGRlZmF1bHRDYWxlbmRhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmNhbGVuZGFyICAgICAgICA9IGxvY2FsZV9jYWxlbmRhcl9fY2FsZW5kYXI7XG4gICAgcHJvdG90eXBlX19wcm90by5fbG9uZ0RhdGVGb3JtYXQgPSBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQ7XG4gICAgcHJvdG90eXBlX19wcm90by5sb25nRGF0ZUZvcm1hdCAgPSBsb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9pbnZhbGlkRGF0ZSAgICA9IGRlZmF1bHRJbnZhbGlkRGF0ZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmludmFsaWREYXRlICAgICA9IGludmFsaWREYXRlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX29yZGluYWwgICAgICAgID0gZGVmYXVsdE9yZGluYWw7XG4gICAgcHJvdG90eXBlX19wcm90by5vcmRpbmFsICAgICAgICAgPSBvcmRpbmFsO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX29yZGluYWxQYXJzZSAgID0gZGVmYXVsdE9yZGluYWxQYXJzZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnByZXBhcnNlICAgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnBvc3Rmb3JtYXQgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9yZWxhdGl2ZVRpbWUgICA9IGRlZmF1bHRSZWxhdGl2ZVRpbWU7XG4gICAgcHJvdG90eXBlX19wcm90by5yZWxhdGl2ZVRpbWUgICAgPSByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucGFzdEZ1dHVyZSAgICAgID0gcGFzdEZ1dHVyZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICAgICA9IGxvY2FsZV9zZXRfX3NldDtcblxuICAgIC8vIE1vbnRoXG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHMgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRocyAgICAgID0gZGVmYXVsdExvY2FsZU1vbnRocztcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1Nob3J0ICA9ICAgICAgICBsb2NhbGVNb250aHNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNTaG9ydCA9IGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1BhcnNlICA9ICAgICAgICBsb2NhbGVNb250aHNQYXJzZTtcblxuICAgIC8vIFdlZWtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWsgPSBsb2NhbGVXZWVrO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWsgPSBkZWZhdWx0TG9jYWxlV2VlaztcbiAgICBwcm90b3R5cGVfX3Byb3RvLmZpcnN0RGF5T2ZZZWFyID0gbG9jYWxlRmlyc3REYXlPZlllYXI7XG4gICAgcHJvdG90eXBlX19wcm90by5maXJzdERheU9mV2VlayA9IGxvY2FsZUZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgLy8gRGF5IG9mIFdlZWtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzICAgICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzICAgICAgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXM7XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c01pbiAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c01pbjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c01pbiAgID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNTaG9ydCAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c1Nob3J0ID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1BhcnNlICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG4gICAgLy8gSG91cnNcbiAgICBwcm90b3R5cGVfX3Byb3RvLmlzUE0gPSBsb2NhbGVJc1BNO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21lcmlkaWVtUGFyc2UgPSBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fZ2V0IChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCk7XG4gICAgICAgIHZhciB1dGMgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoKS5zZXQoc2V0dGVyLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBsb2NhbGVbZmllbGRdKHV0YywgZm9ybWF0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0IChmb3JtYXQsIGluZGV4LCBmaWVsZCwgY291bnQsIHNldHRlcikge1xuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xuXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdHNfX2dldChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBsaXN0c19fZ2V0KGZvcm1hdCwgaSwgZmllbGQsIHNldHRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdE1vbnRocyAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnbW9udGhzJywgMTIsICdtb250aCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0TW9udGhzU2hvcnQgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0JywgMTIsICdtb250aCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXMgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzJywgNywgJ2RheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNTaG9ydCcsIDcsICdkYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzTWluIChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicsIDcsICdkYXknKTtcbiAgICB9XG5cbiAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKCdlbicsIHtcbiAgICAgICAgb3JkaW5hbFBhcnNlOiAvXFxkezEsMn0odGh8c3R8bmR8cmQpLyxcbiAgICAgICAgb3JkaW5hbCA6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRvSW50KG51bWJlciAlIDEwMCAvIDEwKSA9PT0gMSkgPyAndGgnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMSkgPyAnc3QnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMikgPyAnbmQnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMykgPyAncmQnIDogJ3RoJztcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcbiAgICB1dGlsc19ob29rc19faG9va3MubGFuZyA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLCBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKTtcbiAgICB1dGlsc19ob29rc19faG9va3MubGFuZ0RhdGEgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nRGF0YSBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZURhdGEgaW5zdGVhZC4nLCBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKTtcblxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hYnNfX2FicyAoKSB7XG4gICAgICAgIHZhciBkYXRhICAgICAgICAgICA9IHRoaXMuX2RhdGE7XG5cbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gbWF0aEFicyh0aGlzLl9taWxsaXNlY29uZHMpO1xuICAgICAgICB0aGlzLl9kYXlzICAgICAgICAgPSBtYXRoQWJzKHRoaXMuX2RheXMpO1xuICAgICAgICB0aGlzLl9tb250aHMgICAgICAgPSBtYXRoQWJzKHRoaXMuX21vbnRocyk7XG5cbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgID0gbWF0aEFicyhkYXRhLm1pbGxpc2Vjb25kcyk7XG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgICA9IG1hdGhBYnMoZGF0YS5zZWNvbmRzKTtcbiAgICAgICAgZGF0YS5taW51dGVzICAgICAgID0gbWF0aEFicyhkYXRhLm1pbnV0ZXMpO1xuICAgICAgICBkYXRhLmhvdXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xuICAgICAgICBkYXRhLm1vbnRocyAgICAgICAgPSBtYXRoQWJzKGRhdGEubW9udGhzKTtcbiAgICAgICAgZGF0YS55ZWFycyAgICAgICAgID0gbWF0aEFicyhkYXRhLnllYXJzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0IChkdXJhdGlvbiwgaW5wdXQsIHZhbHVlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbihpbnB1dCwgdmFsdWUpO1xuXG4gICAgICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcbiAgICAgICAgZHVyYXRpb24uX2RheXMgICAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fZGF5cztcbiAgICAgICAgZHVyYXRpb24uX21vbnRocyAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fbW9udGhzO1xuXG4gICAgICAgIHJldHVybiBkdXJhdGlvbi5fYnViYmxlKCk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgYWRkKDEsICdzJykgb3IgYWRkKGR1cmF0aW9uKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkIChpbnB1dCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgaW5wdXQsIHZhbHVlLCAxKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3QgKGlucHV0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBpbnB1dCwgdmFsdWUsIC0xKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWJibGUgKCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuICAgICAgICB2YXIgZGF5cyAgICAgICAgID0gdGhpcy5fZGF5cztcbiAgICAgICAgdmFyIG1vbnRocyAgICAgICA9IHRoaXMuX21vbnRocztcbiAgICAgICAgdmFyIGRhdGEgICAgICAgICA9IHRoaXMuX2RhdGE7XG4gICAgICAgIHZhciBzZWNvbmRzLCBtaW51dGVzLCBob3VycywgeWVhcnMgPSAwO1xuXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAgICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XG5cbiAgICAgICAgc2Vjb25kcyAgICAgICAgICAgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgPSBzZWNvbmRzICUgNjA7XG5cbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICA9IG1pbnV0ZXMgJSA2MDtcblxuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgID0gaG91cnMgJSAyNDtcblxuICAgICAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgICAgIC8vIEFjY3VyYXRlbHkgY29udmVydCBkYXlzIHRvIHllYXJzLCBhc3N1bWUgc3RhcnQgZnJvbSB5ZWFyIDAuXG4gICAgICAgIHllYXJzID0gYWJzRmxvb3IoZGF5c1RvWWVhcnMoZGF5cykpO1xuICAgICAgICBkYXlzIC09IGFic0Zsb29yKHllYXJzVG9EYXlzKHllYXJzKSk7XG5cbiAgICAgICAgLy8gMzAgZGF5cyB0byBhIG1vbnRoXG4gICAgICAgIC8vIFRPRE8gKGlza3Jlbik6IFVzZSBhbmNob3IgZGF0ZSAobGlrZSAxc3QgSmFuKSB0byBjb21wdXRlIHRoaXMuXG4gICAgICAgIG1vbnRocyArPSBhYnNGbG9vcihkYXlzIC8gMzApO1xuICAgICAgICBkYXlzICAgJT0gMzA7XG5cbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICB5ZWFycyAgKz0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgICAgICBtb250aHMgJT0gMTI7XG5cbiAgICAgICAgZGF0YS5kYXlzICAgPSBkYXlzO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICAgICAgZGF0YS55ZWFycyAgPSB5ZWFycztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzVG9ZZWFycyAoZGF5cykge1xuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXG4gICAgICAgIHJldHVybiBkYXlzICogNDAwIC8gMTQ2MDk3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHllYXJzVG9EYXlzICh5ZWFycykge1xuICAgICAgICAvLyB5ZWFycyAqIDM2NSArIGFic0Zsb29yKHllYXJzIC8gNCkgLVxuICAgICAgICAvLyAgICAgYWJzRmxvb3IoeWVhcnMgLyAxMDApICsgYWJzRmxvb3IoeWVhcnMgLyA0MDApO1xuICAgICAgICByZXR1cm4geWVhcnMgKiAxNDYwOTcgLyA0MDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXMgKHVuaXRzKSB7XG4gICAgICAgIHZhciBkYXlzO1xuICAgICAgICB2YXIgbW9udGhzO1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBkYXlzICAgPSB0aGlzLl9kYXlzICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgIG1vbnRocyA9IHRoaXMuX21vbnRocyArIGRheXNUb1llYXJzKGRheXMpICogMTI7XG4gICAgICAgICAgICByZXR1cm4gdW5pdHMgPT09ICdtb250aCcgPyBtb250aHMgOiBtb250aHMgLyAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZCh5ZWFyc1RvRGF5cyh0aGlzLl9tb250aHMgLyAxMikpO1xuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3dlZWsnICAgOiByZXR1cm4gZGF5cyAvIDcgICAgICsgbWlsbGlzZWNvbmRzIC8gNjA0OGU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RheScgICAgOiByZXR1cm4gZGF5cyAgICAgICAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cicgICA6IHJldHVybiBkYXlzICogMjQgICAgKyBtaWxsaXNlY29uZHMgLyAzNmU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbnV0ZScgOiByZXR1cm4gZGF5cyAqIDE0NDAgICsgbWlsbGlzZWNvbmRzIC8gNmU0O1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NlY29uZCcgOiByZXR1cm4gZGF5cyAqIDg2NDAwICsgbWlsbGlzZWNvbmRzIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAvLyBNYXRoLmZsb29yIHByZXZlbnRzIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIGhlcmVcbiAgICAgICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZCc6IHJldHVybiBNYXRoLmZsb29yKGRheXMgKiA4NjRlNSkgKyBtaWxsaXNlY29uZHM7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQgJyArIHVuaXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IFVzZSB0aGlzLmFzKCdtcycpP1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FzX192YWx1ZU9mICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xuICAgICAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXG4gICAgICAgICAgICB0b0ludCh0aGlzLl9tb250aHMgLyAxMikgKiAzMTUzNmU2XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUFzIChhbGlhcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXMoYWxpYXMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBhc01pbGxpc2Vjb25kcyA9IG1ha2VBcygnbXMnKTtcbiAgICB2YXIgYXNTZWNvbmRzICAgICAgPSBtYWtlQXMoJ3MnKTtcbiAgICB2YXIgYXNNaW51dGVzICAgICAgPSBtYWtlQXMoJ20nKTtcbiAgICB2YXIgYXNIb3VycyAgICAgICAgPSBtYWtlQXMoJ2gnKTtcbiAgICB2YXIgYXNEYXlzICAgICAgICAgPSBtYWtlQXMoJ2QnKTtcbiAgICB2YXIgYXNXZWVrcyAgICAgICAgPSBtYWtlQXMoJ3cnKTtcbiAgICB2YXIgYXNNb250aHMgICAgICAgPSBtYWtlQXMoJ00nKTtcbiAgICB2YXIgYXNZZWFycyAgICAgICAgPSBtYWtlQXMoJ3knKTtcblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2dldF9fZ2V0ICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHMgKyAncyddKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldHRlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgZHVyYXRpb25fZ2V0X19taWxsaXNlY29uZHMgPSBtYWtlR2V0dGVyKCdtaWxsaXNlY29uZHMnKTtcbiAgICB2YXIgc2Vjb25kcyAgICAgID0gbWFrZUdldHRlcignc2Vjb25kcycpO1xuICAgIHZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XG4gICAgdmFyIGhvdXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ2hvdXJzJyk7XG4gICAgdmFyIGRheXMgICAgICAgICA9IG1ha2VHZXR0ZXIoJ2RheXMnKTtcbiAgICB2YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XG4gICAgdmFyIHllYXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ3llYXJzJyk7XG5cbiAgICBmdW5jdGlvbiB3ZWVrcyAoKSB7XG4gICAgICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xuICAgIH1cblxuICAgIHZhciByb3VuZCA9IE1hdGgucm91bmQ7XG4gICAgdmFyIHRocmVzaG9sZHMgPSB7XG4gICAgICAgIHM6IDQ1LCAgLy8gc2Vjb25kcyB0byBtaW51dGVcbiAgICAgICAgbTogNDUsICAvLyBtaW51dGVzIHRvIGhvdXJcbiAgICAgICAgaDogMjIsICAvLyBob3VycyB0byBkYXlcbiAgICAgICAgZDogMjYsICAvLyBkYXlzIHRvIG1vbnRoXG4gICAgICAgIE06IDExICAgLy8gbW9udGhzIHRvIHllYXJcbiAgICB9O1xuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBtb21lbnQuZm4uZnJvbSwgbW9tZW50LmZuLmZyb21Ob3csIGFuZCBtb21lbnQuZHVyYXRpb24uZm4uaHVtYW5pemVcbiAgICBmdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLnJlbGF0aXZlVGltZShudW1iZXIgfHwgMSwgISF3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpO1xuICAgICAgICB2YXIgc2Vjb25kcyAgPSByb3VuZChkdXJhdGlvbi5hcygncycpKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgID0gcm91bmQoZHVyYXRpb24uYXMoJ20nKSk7XG4gICAgICAgIHZhciBob3VycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdoJykpO1xuICAgICAgICB2YXIgZGF5cyAgICAgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKTtcbiAgICAgICAgdmFyIG1vbnRocyAgID0gcm91bmQoZHVyYXRpb24uYXMoJ00nKSk7XG4gICAgICAgIHZhciB5ZWFycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpO1xuXG4gICAgICAgIHZhciBhID0gc2Vjb25kcyA8IHRocmVzaG9sZHMucyAmJiBbJ3MnLCBzZWNvbmRzXSAgfHxcbiAgICAgICAgICAgICAgICBtaW51dGVzID09PSAxICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCB0aHJlc2hvbGRzLm0gJiYgWydtbScsIG1pbnV0ZXNdIHx8XG4gICAgICAgICAgICAgICAgaG91cnMgICA9PT0gMSAgICAgICAgICAmJiBbJ2gnXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBob3VycyAgIDwgdGhyZXNob2xkcy5oICYmIFsnaGgnLCBob3Vyc10gICB8fFxuICAgICAgICAgICAgICAgIGRheXMgICAgPT09IDEgICAgICAgICAgJiYgWydkJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgZGF5cyAgICA8IHRocmVzaG9sZHMuZCAmJiBbJ2RkJywgZGF5c10gICAgfHxcbiAgICAgICAgICAgICAgICBtb250aHMgID09PSAxICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1vbnRocyAgPCB0aHJlc2hvbGRzLk0gJiYgWydNTScsIG1vbnRoc10gIHx8XG4gICAgICAgICAgICAgICAgeWVhcnMgICA9PT0gMSAgICAgICAgICAmJiBbJ3knXSAgICAgICAgICAgfHwgWyd5eScsIHllYXJzXTtcblxuICAgICAgICBhWzJdID0gd2l0aG91dFN1ZmZpeDtcbiAgICAgICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XG4gICAgICAgIGFbNF0gPSBsb2NhbGU7XG4gICAgICAgIHJldHVybiBzdWJzdGl0dXRlVGltZUFnby5hcHBseShudWxsLCBhKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkICh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBodW1hbml6ZSAod2l0aFN1ZmZpeCkge1xuICAgICAgICB2YXIgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIHZhciBvdXRwdXQgPSBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lKHRoaXMsICF3aXRoU3VmZml4LCBsb2NhbGUpO1xuXG4gICAgICAgIGlmICh3aXRoU3VmZml4KSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBsb2NhbGUucGFzdEZ1dHVyZSgrdGhpcywgb3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsb2NhbGUucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgIH1cblxuICAgIHZhciBpc29fc3RyaW5nX19hYnMgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKCkge1xuICAgICAgICAvLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZG9yZGlsbGUvbW9tZW50LWlzb2R1cmF0aW9uL2Jsb2IvbWFzdGVyL21vbWVudC5pc29kdXJhdGlvbi5qc1xuICAgICAgICB2YXIgWSA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLnllYXJzKCkpO1xuICAgICAgICB2YXIgTSA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLm1vbnRocygpKTtcbiAgICAgICAgdmFyIEQgPSBpc29fc3RyaW5nX19hYnModGhpcy5kYXlzKCkpO1xuICAgICAgICB2YXIgaCA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLmhvdXJzKCkpO1xuICAgICAgICB2YXIgbSA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLm1pbnV0ZXMoKSk7XG4gICAgICAgIHZhciBzID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuc2Vjb25kcygpICsgdGhpcy5taWxsaXNlY29uZHMoKSAvIDEwMDApO1xuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpO1xuXG4gICAgICAgIGlmICghdG90YWwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiAnUDBEJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAodG90YWwgPCAwID8gJy0nIDogJycpICtcbiAgICAgICAgICAgICdQJyArXG4gICAgICAgICAgICAoWSA/IFkgKyAnWScgOiAnJykgK1xuICAgICAgICAgICAgKE0gPyBNICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChEID8gRCArICdEJyA6ICcnKSArXG4gICAgICAgICAgICAoKGggfHwgbSB8fCBzKSA/ICdUJyA6ICcnKSArXG4gICAgICAgICAgICAoaCA/IGggKyAnSCcgOiAnJykgK1xuICAgICAgICAgICAgKG0gPyBtICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChzID8gcyArICdTJyA6ICcnKTtcbiAgICB9XG5cbiAgICB2YXIgZHVyYXRpb25fcHJvdG90eXBlX19wcm90byA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWJzICAgICAgICAgICAgPSBkdXJhdGlvbl9hYnNfX2FicztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQ7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgICA9IGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hcyAgICAgICAgICAgICA9IGFzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzU2Vjb25kcyAgICAgID0gYXNTZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaW51dGVzICAgICAgPSBhc01pbnV0ZXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0RheXMgICAgICAgICA9IGFzRGF5cztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzV2Vla3MgICAgICAgID0gYXNXZWVrcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1llYXJzICAgICAgICA9IGFzWWVhcnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgICA9IGR1cmF0aW9uX2FzX192YWx1ZU9mO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uX2J1YmJsZSAgICAgICAgPSBidWJibGU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICA9IGR1cmF0aW9uX2dldF9fZ2V0O1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzICAgPSBkdXJhdGlvbl9nZXRfX21pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgICAgICAgID0gc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1pbnV0ZXMgICAgICAgID0gbWludXRlcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmhvdXJzICAgICAgICAgID0gaG91cnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5kYXlzICAgICAgICAgICA9IGRheXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by53ZWVrcyAgICAgICAgICA9IHdlZWtzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubW9udGhzICAgICAgICAgPSBtb250aHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by55ZWFycyAgICAgICAgICA9IHllYXJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uaHVtYW5pemUgICAgICAgPSBodW1hbml6ZTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSVNPU3RyaW5nICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b1N0cmluZyAgICAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9KU09OICAgICAgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxvY2FsZSAgICAgICAgID0gbG9jYWxlO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubG9jYWxlRGF0YSAgICAgPSBsb2NhbGVEYXRhO1xuXG4gICAgLy8gRGVwcmVjYXRpb25zXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0lzb1N0cmluZyA9IGRlcHJlY2F0ZSgndG9Jc29TdHJpbmcoKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRvSVNPU3RyaW5nKCkgaW5zdGVhZCAobm90aWNlIHRoZSBjYXBpdGFscyknLCBpc29fc3RyaW5nX190b0lTT1N0cmluZyk7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sYW5nID0gbGFuZztcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuICAgIGFkZEZvcm1hdFRva2VuKCdYJywgMCwgMCwgJ3VuaXgnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigneCcsIDAsIDAsICd2YWx1ZU9mJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCd4JywgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XG4gICAgYWRkUGFyc2VUb2tlbignWCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KGlucHV0LCAxMCkgKiAxMDAwKTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCd4JywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XG4gICAgfSk7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5cblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy52ZXJzaW9uID0gJzIuMTAuMyc7XG5cbiAgICBzZXRIb29rQ2FsbGJhY2sobG9jYWxfX2NyZWF0ZUxvY2FsKTtcblxuICAgIHV0aWxzX2hvb2tzX19ob29rcy5mbiAgICAgICAgICAgICAgICAgICAgPSBtb21lbnRQcm90b3R5cGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1pbiAgICAgICAgICAgICAgICAgICA9IG1pbjtcbiAgICB1dGlsc19ob29rc19faG9va3MubWF4ICAgICAgICAgICAgICAgICAgID0gbWF4O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy51dGMgICAgICAgICAgICAgICAgICAgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVuaXggICAgICAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlVW5peDtcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzICAgICAgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzRGF0ZSAgICAgICAgICAgICAgICA9IGlzRGF0ZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlICAgICAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3MuaW52YWxpZCAgICAgICAgICAgICAgID0gdmFsaWRfX2NyZWF0ZUludmFsaWQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmR1cmF0aW9uICAgICAgICAgICAgICA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb247XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzTW9tZW50ICAgICAgICAgICAgICA9IGlzTW9tZW50O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5cyAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVpvbmUgICAgICAgICAgICAgPSBtb21lbnRfX2NyZWF0ZUluWm9uZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlRGF0YSAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEdXJhdGlvbiAgICAgICAgICAgID0gaXNEdXJhdGlvbjtcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzU2hvcnQgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHNTaG9ydDtcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNNaW4gICAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c01pbjtcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmaW5lTG9jYWxlICAgICAgICAgID0gZGVmaW5lTG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5c1Nob3J0ICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzU2hvcnQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm5vcm1hbGl6ZVVuaXRzICAgICAgICA9IG5vcm1hbGl6ZVVuaXRzO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkO1xuXG4gICAgdmFyIF9tb21lbnQgPSB1dGlsc19ob29rc19faG9va3M7XG5cbiAgICByZXR1cm4gX21vbWVudDtcblxufSkpOyIsIlxudmFyIG9wdGlvbnMgPSBleHBvcnRzLm9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKTtcblxuZXhwb3J0cy5wYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcnMvcGFyc2VyJyk7XG5leHBvcnRzLnJlZmluZXIgPSByZXF1aXJlKCcuL3JlZmluZXJzL3JlZmluZXInKTtcblxuZXhwb3J0cy5QYXJzZXIgPSBleHBvcnRzLnBhcnNlci5QYXJzZXI7XG5leHBvcnRzLlJlZmluZXIgPSBleHBvcnRzLnJlZmluZXIuUmVmaW5lcjtcbmV4cG9ydHMuRmlsdGVyID0gZXhwb3J0cy5yZWZpbmVyLkZpbHRlcjtcblxuZXhwb3J0cy5QYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbmV4cG9ydHMuUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vcmVzdWx0JykuUGFyc2VkQ29tcG9uZW50cztcblxudmFyIENocm9ubyA9IGZ1bmN0aW9uKG9wdGlvbikge1xuXG4gICAgb3B0aW9uID0gb3B0aW9uIHx8IGV4cG9ydHMub3B0aW9ucy5jYXN1YWxPcHRpb24oKTtcblxuICAgIHRoaXMub3B0aW9uID0gb3B0aW9uO1xuICAgIHRoaXMucGFyc2VycyA9IG5ldyBPYmplY3Qob3B0aW9uLnBhcnNlcnMpO1xuICAgIHRoaXMucmVmaW5lcnMgPSBuZXcgT2JqZWN0KG9wdGlvbi5yZWZpbmVycyk7XG59XG5cblxuQ2hyb25vLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHRleHQsIHJlZkRhdGUsIG9wdCkge1xuXG4gICAgcmVmRGF0ZSA9IHJlZkRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICBvcHQgPSBvcHQgfHwge307XG5cbiAgICB2YXIgYWxsUmVzdWx0cyA9IFtdO1xuXG4gICAgdGhpcy5wYXJzZXJzLmZvckVhY2goZnVuY3Rpb24gKHBhcnNlcikge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHBhcnNlci5leGVjdXRlKHRleHQsIHJlZkRhdGUsIG9wdCk7XG4gICAgICAgIGFsbFJlc3VsdHMgPSBhbGxSZXN1bHRzLmNvbmNhdChyZXN1bHRzKTtcbiAgICB9KTtcblxuICAgIGFsbFJlc3VsdHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgICB9KTtcblxuICAgIHRoaXMucmVmaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAocmVmaW5lcikge1xuICAgICAgICBhbGxSZXN1bHRzID0gcmVmaW5lci5yZWZpbmUodGV4dCwgYWxsUmVzdWx0cywgb3B0KTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gYWxsUmVzdWx0cztcbn07XG5cblxuQ2hyb25vLnByb3RvdHlwZS5wYXJzZURhdGUgPSBmdW5jdGlvbih0ZXh0LCByZWZEYXRlLCBvcHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IHRoaXMucGFyc2UodGV4dCwgcmVmRGF0ZSwgb3B0KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzWzBdLnN0YXJ0LmRhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydHMuQ2hyb25vID0gQ2hyb25vO1xuZXhwb3J0cy5zdHJpY3QgPSBuZXcgQ2hyb25vKCBvcHRpb25zLnN0cmljdE9wdGlvbigpICk7XG5leHBvcnRzLmNhc3VhbCA9IG5ldyBDaHJvbm8oIG9wdGlvbnMuY2FzdWFsT3B0aW9uKCkgKTtcblxuZXhwb3J0cy5lbiA9IG5ldyBDaHJvbm8oIG9wdGlvbnMubWVyZ2VPcHRpb25zKFtcbiAgICBvcHRpb25zLmVuLmNhc3VhbCwgb3B0aW9ucy5jb21tb25Qb3N0UHJvY2Vzc2luZ10pKTtcblxuZXhwb3J0cy5lcyA9IG5ldyBDaHJvbm8oIG9wdGlvbnMubWVyZ2VPcHRpb25zKFtcbiAgICBvcHRpb25zLmVzLmNhc3VhbCwgb3B0aW9ucy5lbiwgb3B0aW9ucy5jb21tb25Qb3N0UHJvY2Vzc2luZ10pKTtcblxuZXhwb3J0cy5mciA9IG5ldyBDaHJvbm8oIG9wdGlvbnMubWVyZ2VPcHRpb25zKFtcbiAgICBvcHRpb25zLmZyLmNhc3VhbCwgb3B0aW9ucy5lbiwgb3B0aW9ucy5jb21tb25Qb3N0UHJvY2Vzc2luZ10pKTtcblxuZXhwb3J0cy5qYSA9IG5ldyBDaHJvbm8oIG9wdGlvbnMubWVyZ2VPcHRpb25zKFsgXG4gICAgb3B0aW9ucy5qYS5jYXN1YWwsIG9wdGlvbnMuZW4sIG9wdGlvbnMuY29tbW9uUG9zdFByb2Nlc3NpbmddKSk7XG5cblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5jYXN1YWwucGFyc2UuYXBwbHkoZXhwb3J0cy5jYXN1YWwsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydHMucGFyc2VEYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBleHBvcnRzLmNhc3VhbC5wYXJzZURhdGUuYXBwbHkoZXhwb3J0cy5jYXN1YWwsIGFyZ3VtZW50cyk7XG59XG5cblxuXG5cbiIsInZhciBwYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcnMvcGFyc2VyJyk7XG52YXIgcmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcnMvcmVmaW5lcicpO1xuXG5cbmV4cG9ydHMubWVyZ2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgdmFyIGFkZGVkVHlwZXMgPSB7fTtcbiAgICB2YXIgbWVyZ2VkT3B0aW9uID0ge1xuICAgICAgICBwYXJzZXJzOiBbXSxcbiAgICAgICAgcmVmaW5lcnM6IFtdLFxuICAgIH07XG5cbiAgICBvcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG9wdGlvbikge1xuXG4gICAgICAgIGlmIChvcHRpb24uY2FsbCkge1xuICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uLmNhbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb24ucGFyc2Vycykge1xuICAgICAgICAgICAgb3B0aW9uLnBhcnNlcnMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIGlmICghYWRkZWRUeXBlc1twLmNvbnN0cnVjdG9yXSkge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRPcHRpb24ucGFyc2Vycy5wdXNoKHApO1xuICAgICAgICAgICAgICAgICAgICBhZGRlZFR5cGVzW3AuY29uc3RydWN0b3JdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb24ucmVmaW5lcnMpIHtcbiAgICAgICAgICAgIG9wdGlvbi5yZWZpbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhZGRlZFR5cGVzW3IuY29uc3RydWN0b3JdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlZE9wdGlvbi5yZWZpbmVycy5wdXNoKHIpO1xuICAgICAgICAgICAgICAgICAgICBhZGRlZFR5cGVzW3IuY29uc3RydWN0b3JdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1lcmdlZE9wdGlvbjtcbn1cblxuXG5leHBvcnRzLmNvbW1vblBvc3RQcm9jZXNzaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIC8vIFRoZXNlIHNob3VsZCBiZSBhZnRlciBhbGwgb3RoZXIgcmVmaW5lcnNcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkV4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkV4dHJhY3RUaW1lem9uZUFiYnJSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Vbmxpa2VseUZvcm1hdEZpbHRlcigpXG4gICAgICAgIF1cbiAgICB9XG59XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLnN0cmljdE9wdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5tZXJnZU9wdGlvbnMoW1xuICAgICAgICBleHBvcnRzLmVuKHRydWUpLFxuICAgICAgICBleHBvcnRzLmphKHRydWUpLFxuICAgICAgICBleHBvcnRzLmVzKHRydWUpLFxuICAgICAgICBleHBvcnRzLmZyKHRydWUpLFxuICAgICAgICBleHBvcnRzLnpoLFxuICAgICAgICBleHBvcnRzLmNvbW1vblBvc3RQcm9jZXNzaW5nLFxuICAgIF0pO1xufTtcblxuZXhwb3J0cy5jYXN1YWxPcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMubWVyZ2VPcHRpb25zKFtcbiAgICAgICAgZXhwb3J0cy5lbi5jYXN1YWwsXG4gICAgICAgIGV4cG9ydHMuamEuY2FzdWFsLFxuICAgICAgICBleHBvcnRzLmVzLmNhc3VhbCxcbiAgICAgICAgZXhwb3J0cy5mci5jYXN1YWwsXG4gICAgICAgIGV4cG9ydHMuemgsXG4gICAgICAgIGV4cG9ydHMuY29tbW9uUG9zdFByb2Nlc3NpbmcsXG4gICAgXSk7XG59O1xuXG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbmV4cG9ydHMuZW4gPSBmdW5jdGlvbihzdHJpY3RNb2RlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VyczogW1xuICAgICAgICAgICAgbmV3IHBhcnNlci5FTklTT0Zvcm1hdFBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5EZWFkbGluZUZvcm1hdFBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTk1vbnRoTmFtZVBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTlRpbWVBZ29Gb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOVGltZUV4cHJlc3Npb25QYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmluZXJzOiBbXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5PdmVybGFwUmVtb3ZhbFJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkZvcndhcmREYXRlUmVmaW5lcigpLFxuXG4gICAgICAgICAgICAvLyBFbmdsaXNoXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5FTk1lcmdlRGF0ZVRpbWVSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5FTk1lcmdlRGF0ZVJhbmdlUmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRU5Qcmlvcml0aXplU3BlY2lmaWNEYXRlUmVmaW5lcigpLFxuICAgICAgICBdXG4gICAgfVxufVxuXG5leHBvcnRzLmVuLmNhc3VhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb24gPSBleHBvcnRzLmVuKGZhbHNlKTtcblxuICAgIC8vIEVOXG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkVOQ2FzdWFsRGF0ZVBhcnNlcigpKTtcbiAgICBvcHRpb24ucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuRU5DYXN1YWxUaW1lUGFyc2VyKCkpO1xuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FTldlZWtkYXlQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkVOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyKCkpO1xuICAgIHJldHVybiBvcHRpb247XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5qYSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhcnNlcnM6IFtcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuSlBTdGFuZGFyZFBhcnNlcigpLFxuICAgICAgICBdLFxuICAgICAgICByZWZpbmVyczogW1xuICAgICAgICAgICAgbmV3IHJlZmluZXIuT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Gb3J3YXJkRGF0ZVJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkpQTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCksXG4gICAgICAgIF1cbiAgICB9XG59XG5cbmV4cG9ydHMuamEuY2FzdWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbiA9IGV4cG9ydHMuamEoKTtcbiAgICBvcHRpb24ucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuSlBDYXN1YWxEYXRlUGFyc2VyKCkpO1xuICAgIHJldHVybiBvcHRpb247XG59XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbmV4cG9ydHMuZXMgPSBmdW5jdGlvbihzdHJpY3RNb2RlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VyczogW1xuICAgICAgICAgICAgbmV3IHBhcnNlci5FU1RpbWVBZ29Gb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVTRGVhZGxpbmVGb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVTVGltZUV4cHJlc3Npb25QYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FU1NsYXNoRGF0ZUZvcm1hdFBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLk92ZXJsYXBSZW1vdmFsUmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRm9yd2FyZERhdGVSZWZpbmVyKCksXG4gICAgICAgIF1cbiAgICB9XG59XG5cbmV4cG9ydHMuZXMuY2FzdWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbiA9IGV4cG9ydHMuZXMoZmFsc2UpO1xuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FU0Nhc3VhbERhdGVQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkVTV2Vla2RheVBhcnNlcigpKTtcbiAgICByZXR1cm4gb3B0aW9uO1xufVxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5mciA9IGZ1bmN0aW9uKHN0cmljdE1vZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZXJzOiBbXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkZSRGVhZGxpbmVGb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkZSTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5GUlNsYXNoRGF0ZUZvcm1hdFBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRlJUaW1lQWdvRm9ybWF0UGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5GUlRpbWVFeHByZXNzaW9uUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICBdLFxuICAgICAgICByZWZpbmVyczogW1xuICAgICAgICAgICAgbmV3IHJlZmluZXIuT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Gb3J3YXJkRGF0ZVJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkZSTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5GUk1lcmdlRGF0ZVRpbWVSZWZpbmVyKCksXG4gICAgICAgIF1cbiAgICB9XG59XG5cbmV4cG9ydHMuZnIuY2FzdWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbiA9IGV4cG9ydHMuZnIoZmFsc2UpO1xuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5GUkNhc3VhbERhdGVQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkZSV2Vla2RheVBhcnNlcigpKTtcbiAgICByZXR1cm4gb3B0aW9uO1xufVxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy56aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhcnNlcnM6IFtcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuWkhIYW50RGF0ZVBhcnNlcigpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5aSEhhbnRXZWVrZGF5UGFyc2VyKCksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLlpISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyKCksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLlpISGFudENhc3VhbERhdGVQYXJzZXIoKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuWkhIYW50RGVhZGxpbmVGb3JtYXRQYXJzZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLk92ZXJsYXBSZW1vdmFsUmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRm9yd2FyZERhdGVSZWZpbmVyKCksXG4gICAgICAgIF1cbiAgICB9XG59XG5cblxuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSAvKFxcV3xeKShub3d8dG9kYXl8dG9uaWdodHxsYXN0XFxzKm5pZ2h0fCg/OnRvbW9ycm93fHRtcnx5ZXN0ZXJkYXkpXFxzKnx0b21vcnJvd3x0bXJ8eWVzdGVyZGF5KSg/PVxcV3wkKS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOQ2FzdWFsRGF0ZVBhcnNlcigpe1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZihsb3dlclRleHQgPT0gJ3RvbmlnaHQnKXtcbiAgICAgICAgICAgIC8vIE5vcm1hbGx5IG1lYW5zIHRoaXMgY29taW5nIG1pZG5pZ2h0XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgvXnRvbW9ycm93fF50bXIvLnRlc3QobG93ZXJUZXh0KSkge1xuXG4gICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKC9eeWVzdGVyZGF5Ly50ZXN0KGxvd2VyVGV4dCkpIHtcblxuICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG5cbiAgICAgICAgfSBlbHNlIGlmKGxvd2VyVGV4dC5tYXRjaCgvbGFzdFxccypuaWdodC8pKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDApO1xuICAgICAgICAgICAgaWYgKHJlZk1vbWVudC5ob3VyKCkgPiA2KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChsb3dlclRleHQubWF0Y2goXCJub3dcIikpIHtcblxuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIHJlZk1vbWVudC5ob3VyKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWludXRlJywgcmVmTW9tZW50Lm1pbnV0ZSgpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIHJlZk1vbWVudC5zZWNvbmQoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaWxsaXNlY29uZCcsIHJlZk1vbWVudC5taWxsaXNlY29uZCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5Jywgc3RhcnRNb21lbnQuZGF0ZSgpKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxuICAgICAgICByZXN1bHQudGFnc1snRU5DYXN1YWxEYXRlUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gLyhcXFd8XikoKHRoaXMpP1xccyoobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xub29uKSkvaTtcblxudmFyIFRJTUVfTUFUQ0ggPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOQ2FzdWFsVGltZVBhcnNlcigpe1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgpO1xuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZighbWF0Y2hbVElNRV9NQVRDSF0pIFRJTUVfTUFUQ0ggPSAzO1xuXG4gICAgICAgIGlmIChtYXRjaFtUSU1FX01BVENIXSA9PSBcImFmdGVybm9vblwiKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIG9wdFsnYWZ0ZXJub29uJ10gPyBvcHRbJ2FmdGVybm9vbiddIDogMTUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbVElNRV9NQVRDSF0gPT0gXCJldmVuaW5nXCIpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgb3B0WydldmVuaW5nJ10gPyBvcHRbJ2V2ZW5pbmcnXSA6IDE4KTtcblxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1RJTUVfTUFUQ0hdID09IFwibW9ybmluZ1wiKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIG9wdFsnbW9ybmluZyddID8gb3B0Wydtb3JuaW5nJ10gOiA2KTtcblxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1RJTUVfTUFUQ0hdID09IFwibm9vblwiKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIG9wdFsnbm9vbiddID8gb3B0Wydub29uJ10gOiAxMik7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRU5DYXN1YWxUaW1lUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgJyh3aXRoaW58aW4pXFxcXHMqJyArXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfGFuPyg/OlxcXFxzKmZldyk/fGhhbGYoPzpcXFxccyphbj8pPylcXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbig/OnV0ZSk/cz98aG91cnM/fGRheXM/fHdlZWtzP3xtb250aHM/fHllYXJzPylcXFxccyonICtcbiAgICAnKD89XFxcXFd8JCknLCAnaSdcbik7XG5cbnZhciBTVFJJQ1RfUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcod2l0aGlufGluKVxcXFxzKicgK1xuICAgICcoJysgdXRpbC5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gKyAnfFswLTldK3xhbj8pXFxcXHMqJyArXG4gICAgJyhzZWNvbmRzP3xtaW51dGVzP3xob3Vycz98ZGF5cz8pXFxcXHMqJyArXG4gICAgJyg/PVxcXFxXfCQpJywgJ2knXG4pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVORGVhZGxpbmVGb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmljdE1vZGUoKT8gU1RSSUNUX1BBVFRFUk4gOiBQQVRURVJOO1xuICAgIH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbnVtID0gbWF0Y2hbM10udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHV0aWwuSU5URUdFUl9XT1JEU1tudW1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG51bSA9IHV0aWwuSU5URUdFUl9XT1JEU1tudW1dO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gJ2EnIHx8IG51bSA9PT0gJ2FuJyl7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvZmV3L2kpKXtcbiAgICAgICAgICAgIG51bSA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9oYWxmL2kpKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcbiAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9kYXl8d2Vla3xtb250aHx5ZWFyL2kpKSB7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvZGF5L2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnZCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFs0XS5tYXRjaCgvd2Vlay9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSAqIDcsICdkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9tb250aC9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC95ZWFyL2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAneWVhcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbNF0ubWF0Y2goL2hvdXIvaSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnaG91cicpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21pbi9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdtaW51dGUnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9zZWNvbmQvaSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnc2Vjb25kJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLCBkYXRlLnNlY29uZCgpKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VORGVhZGxpbmVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuICAgIElTTyA4NjAxXG4gICAgaHR0cDovL3d3dy53My5vcmcvVFIvTk9URS1kYXRldGltZVxuICAgIC0gWVlZWS1NTS1ERFxuICAgIC0gWVlZWS1NTS1ERFRoaDptbVRaRFxuICAgIC0gWVlZWS1NTS1ERFRoaDptbTpzc1RaRFxuICAgIC0gWVlZWS1NTS1ERFRoaDptbTpzcy5zVFpEIFxuICAgIC0gVFpEID0gKFogb3IgK2hoOm1tIG9yIC1oaDptbSlcbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknIFxuICAgICAgICAgICAgKyAnKFswLTldezR9KVxcXFwtKFswLTldezEsMn0pXFxcXC0oWzAtOV17MSwyfSknXG4gICAgICAgICAgICArICcoPzpUJyAvLy4uXG4gICAgICAgICAgICAgICAgKyAnKFswLTldezEsMn0pOihbMC05XXsxLDJ9KScgLy8gaGg6bW1cbiAgICAgICAgICAgICAgICArICcoPzo6KFswLTldezEsMn0pKD86XFxcXC4oXFxcXGR7MSw0fSkpPyk/JyAvLyA6c3Muc1xuICAgICAgICAgICAgICAgICsgJyg/Olp8KFsrLV1cXFxcZHsyfSk6PyhcXFxcZHsyfSk/KT8nIC8vIFRaRCAoWiBvciDCsWhoOm1tIG9yIMKxaGhtbSBvciDCsWhoKVxuICAgICAgICAgICAgKyAnKT8nICAvLy4uXG4gICAgICAgICAgICArICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBZRUFSX05VTUJFUl9HUk9VUCA9IDI7XG52YXIgTU9OVEhfTlVNQkVSX0dST1VQID0gMztcbnZhciBEQVRFX05VTUJFUl9HUk9VUCAgPSA0O1xudmFyIEhPVVJfTlVNQkVSX0dST1VQICA9IDU7XG52YXIgTUlOVVRFX05VTUJFUl9HUk9VUCA9IDY7XG52YXIgU0VDT05EX05VTUJFUl9HUk9VUCA9IDc7XG52YXIgTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQID0gODtcbnZhciBUWkRfSE9VUl9PRkZTRVRfR1JPVVAgPSA5O1xudmFyIFRaRF9NSU5VVEVfT0ZGU0VUX0dST1VQID0gMTA7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5JU09Gb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBwYXJzZUludChtYXRjaFtZRUFSX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBwYXJzZUludChtYXRjaFtNT05USF9OVU1CRVJfR1JPVVBdKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfTlVNQkVSX0dST1VQXSkpO1xuXG4gICAgICAgIGlmIChtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnbW9udGgnKSkgPiAxMiB8fCBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnbW9udGgnKSkgPCAxIHx8XG4gICAgICAgICAgICBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnZGF5JykpID4gMzEgfHwgbW9tZW50KHJlc3VsdC5zdGFydC5nZXQoJ2RheScpKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoW0hPVVJfTlVNQkVSX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtYXRjaFtIT1VSX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGNoW01JTlVURV9OVU1CRVJfR1JPVVBdKSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFtTRUNPTkRfTlVNQkVSX0dST1VQXSAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbU0VDT05EX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdGNoW01JTExJU0VDT05EX05VTUJFUl9HUk9VUF0gIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWlsbGlzZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2hbVFpEX0hPVVJfT0ZGU0VUX0dST1VQXSA9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd0aW1lem9uZU9mZnNldCcsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciBtaW51dGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBob3VyT2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hbVFpEX0hPVVJfT0ZGU0VUX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoW1RaRF9NSU5VVEVfT0ZGU0VUX0dST1VQXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBtaW51dGVPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUWkRfTUlOVVRFX09GRlNFVF9HUk9VUF0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IGhvdXJPZmZzZXQgKiA2MDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLT0gbWludXRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBtaW51dGVPZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXN1bHQudGFnc1snRU5JU09Gb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufVxuXG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9FTicpO1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICAgICAnKD86b25cXFxccyo/KT8nICtcbiAgICAgICAgJyg/OihTdW5kYXl8TW9uZGF5fFR1ZXNkYXl8V2VkbmVzZGF5fFRodXJzZGF5fEZyaWRheXxTYXR1cmRheXxTdW58TW9ufFR1ZXxXZWR8VGh1fEZyaXxTYXQpXFxcXHMqLD9cXFxccyopPycgK1xuICAgICAgICAnKChbMC05XXsxLDJ9KSg/OnN0fG5kfHJkfHRoKT98JyArIHV0aWwuT1JESU5BTF9XT1JEU19QQVRURVJOICsgJyknICtcbiAgICAgICAgJyg/OlxcXFxzKicgK1xuICAgICAgICAgICAgJyg/OnRvfFxcXFwtfFxcXFzigJN8dW50aWx8dGhyb3VnaHx0aWxsfFxcXFxzKVxcXFxzKicgK1xuICAgICAgICAgICAgJygoWzAtOV17MSwyfSkoPzpzdHxuZHxyZHx0aCk/fCcgKyB1dGlsLk9SRElOQUxfV09SRFNfUEFUVEVSTiArICcpJyArXG4gICAgICAgICcpP1xcXFxzKig/Om9mKT9cXFxccyonICtcbiAgICAgICAgJyhKYW4oPzp1YXJ5fFxcXFwuKT98RmViKD86cnVhcnl8XFxcXC4pP3xNYXIoPzpjaHxcXFxcLik/fEFwcig/OmlsfFxcXFwuKT98TWF5fEp1big/OmV8XFxcXC4pP3xKdWwoPzp5fFxcXFwuKT98QXVnKD86dXN0fFxcXFwuKT98U2VwKD86dGVtYmVyfFxcXFwuKT98T2N0KD86b2JlcnxcXFxcLik/fE5vdig/OmVtYmVyfFxcXFwuKT98RGVjKD86ZW1iZXJ8XFxcXC4pPyknICtcbiAgICAgICAgJyg/OicgK1xuICAgICAgICAgICAgJyw/XFxcXHMqKFswLTldezEsNH0oPyFbXlxcXFxzXVxcXFxkKSknICtcbiAgICAgICAgICAgICcoXFxcXHMqKD86QkV8QUR8QkMpKT8nICtcbiAgICAgICAgJyk/JyArXG4gICAgICAgICcoPz1cXFxcV3wkKScsICdpJ1xuICAgICk7XG5cbnZhciBXRUVLREFZX0dST1VQID0gMjtcbnZhciBEQVRFX0dST1VQID0gMztcbnZhciBEQVRFX05VTV9HUk9VUCA9IDQ7XG52YXIgREFURV9UT19HUk9VUCA9IDU7XG52YXIgREFURV9UT19OVU1fR1JPVVAgPSA2O1xudmFyIE1PTlRIX05BTUVfR1JPVVAgPSA3O1xudmFyIFlFQVJfR1JPVVAgPSA4O1xudmFyIFlFQVJfQkVfR1JPVVAgPSA5O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX05BTUVfR1JPVVBdO1xuICAgICAgICBtb250aCA9IHV0aWwuTU9OVEhfT0ZGU0VUW21vbnRoLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIHZhciBkYXkgPSBtYXRjaFtEQVRFX05VTV9HUk9VUF0gP1xuICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbREFURV9OVU1fR1JPVVBdKTpcbiAgICAgICAgICAgIHV0aWwuT1JESU5BTF9XT1JEU1ttYXRjaFtEQVRFX0dST1VQXS50cmltKCkucmVwbGFjZSgnLScsICcgJykudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIHllYXIgPSBudWxsO1xuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcbiAgICAgICAgICAgIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYobWF0Y2hbWUVBUl9CRV9HUk9VUF0pe1xuXG4gICAgICAgICAgICAgICAgaWYgKC9CRS9pLnRlc3QobWF0Y2hbWUVBUl9CRV9HUk9VUF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1ZGRoaXN0IEVyYVxuICAgICAgICAgICAgICAgICAgICB5ZWFyID0geWVhciAtIDU0MztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9CQy9pLnRlc3QobWF0Y2hbWUVBUl9CRV9HUk9VUF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJlZm9yZSBDaHJpc3RcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IC15ZWFyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTApIHtcblxuICAgICAgICAgICAgICAgIC8vIHJlcXVpcmUgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIGFsd2F5cyBoYXZlIEJDL0FEXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7XG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG4gICAgICAgICAgICByZWZNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgtMSwgJ3knKTtcbiAgICAgICAgICAgIGlmKCBNYXRoLmFicyhuZXh0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBKYW51YXJ5IDIwMTInXG4gICAgICAgIGlmIChtYXRjaFtEQVRFX1RPX0dST1VQXSkge1xuICAgICAgICAgICAgdmFyIGVuZERhdGUgPSBtYXRjaFtEQVRFX1RPX05VTV9HUk9VUF0gP1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fTlVNX0dST1VQXSk6XG4gICAgICAgICAgICAgICAgdXRpbC5PUkRJTkFMX1dPUkRTW21hdGNoW0RBVEVfVE9fR1JPVVBdLnRyaW0oKS5yZXBsYWNlKCctJywgJyAnKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIGVuZERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuICAgIFRoZSBwYXJzZXIgZm9yIHBhcnNpbmcgVVMncyBkYXRlIGZvcm1hdCB0aGF0IGJlZ2luIHdpdGggbW9udGgncyBuYW1lLlxuXG4gICAgRVguXG4gICAgICAgIC0gSmFudWFyeSAxM1xuICAgICAgICAtIEphbnVhcnkgMTMsIDIwMTJcbiAgICAgICAgLSBKYW51YXJ5IDEzIC0gMTUsIDIwMTJcbiAgICAgICAgLSBUdWVzZGF5LCBKYW51YXJ5IDEzLCAyMDEyXG5cbiAgICBXYXRjaCBvdXQgZm9yOlxuICAgICAgICAtIEphbnVhcnkgMTI6MDBcbiAgICAgICAgLSBKYW51YXJ5IDEyLjQ0XG4gICAgICAgIC0gSmFudWFyeSAxMjIyMzQ0XG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRU4nKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKD86JyArXG4gICAgICAgICcoPzpvblxcXFxzKj8pPycgK1xuICAgICAgICAnKFN1bmRheXxNb25kYXl8VHVlc2RheXxXZWRuZXNkYXl8VGh1cnNkYXl8RnJpZGF5fFNhdHVyZGF5fFN1blxcXFwuP3xNb25cXFxcLj98VHVlXFxcXC4/fFdlZFxcXFwuP3xUaHVcXFxcLj98RnJpXFxcXC4/fFNhdFxcXFwuPyknICtcbiAgICAnXFxcXHMqLD9cXFxccyopPycgK1xuICAgICcoSmFuXFxcXC4/fEphbnVhcnl8RmViXFxcXC4/fEZlYnJ1YXJ5fE1hclxcXFwuP3xNYXJjaHxBcHJcXFxcLj98QXByaWx8TWF5XFxcXC4/fEp1blxcXFwuP3xKdW5lfEp1bFxcXFwuP3xKdWx5fEF1Z1xcXFwuP3xBdWd1c3R8U2VwXFxcXC4/fFNlcHRcXFxcLj98U2VwdGVtYmVyfE9jdFxcXFwuP3xPY3RvYmVyfE5vdlxcXFwuP3xOb3ZlbWJlcnxEZWNcXFxcLj98RGVjZW1iZXIpJyArXG4gICAgJ1xcXFxzKicgK1xuICAgICcoKFswLTldezEsMn0pKD86c3R8bmR8cmR8dGgpP3wnICsgdXRpbC5PUkRJTkFMX1dPUkRTX1BBVFRFUk4gKycpXFxcXHMqJyArXG4gICAgJyg/OicgK1xuICAgICAgICAnKD86dG98XFxcXC0pXFxcXHMqJyArXG4gICAgICAgICcoKFswLTldezEsMn0pKD86c3R8bmR8cmR8dGgpP3wgJyArIHV0aWwuT1JESU5BTF9XT1JEU19QQVRURVJOICsgJylcXFxccyonICtcbiAgICAnKT8nICtcbiAgICAnKD86JyArXG4gICAgICAgICdcXFxccyosP1xcXFxzKig/OihbMC05XXs0fSlcXFxccyooQkV8QUR8QkMpP3woWzAtOV17MSw0fSlcXFxccyooQUR8QkMpKVxcXFxzKicgK1xuICAgICcpPycgK1xuICAgICcoPz1cXFxcV3wkKSg/IVxcXFw6XFxcXGQpJywgJ2knKTtcblxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xudmFyIE1PTlRIX05BTUVfR1JPVVAgPSAzO1xudmFyIERBVEVfR1JPVVAgPSA0O1xudmFyIERBVEVfTlVNX0dST1VQID0gNTtcbnZhciBEQVRFX1RPX0dST1VQID0gNjtcbnZhciBEQVRFX1RPX05VTV9HUk9VUCA9IDc7XG52YXIgWUVBUl9HUk9VUCA9IDg7XG52YXIgWUVBUl9CRV9HUk9VUCA9IDk7XG52YXIgWUVBUl9HUk9VUDIgPSAxMDtcbnZhciBZRUFSX0JFX0dST1VQMiA9IDExO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX05BTUVfR1JPVVBdO1xuICAgICAgICBtb250aCA9IHV0aWwuTU9OVEhfT0ZGU0VUW21vbnRoLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB2YXIgZGF5ID0gbWF0Y2hbREFURV9OVU1fR1JPVVBdID9cbiAgICAgICAgICAgIHBhcnNlSW50KG1hdGNoW0RBVEVfTlVNX0dST1VQXSkgOlxuICAgICAgICAgICAgdXRpbC5PUkRJTkFMX1dPUkRTW21hdGNoW0RBVEVfR1JPVVBdLnRyaW0oKS5yZXBsYWNlKCctJywgJyAnKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgeWVhciA9IG51bGw7XG4gICAgICAgIGlmIChtYXRjaFtZRUFSX0dST1VQXSB8fCBtYXRjaFtZRUFSX0dST1VQMl0pIHtcbiAgICAgICAgICAgIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXSB8fCBtYXRjaFtZRUFSX0dST1VQMl07XG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgICAgIHZhciB5ZWFyQkUgPSBtYXRjaFtZRUFSX0JFX0dST1VQXSB8fCBtYXRjaFtZRUFSX0JFX0dST1VQMl07XG4gICAgICAgICAgICBpZiAoeWVhckJFKSB7XG4gICAgICAgICAgICAgICAgaWYgKC9CRS9pLnRlc3QoeWVhckJFKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBCdWRkaGlzdCBFcmFcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IHllYXIgLSA1NDM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvQkMvaS50ZXN0KHllYXJCRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQmVmb3JlIENocmlzdFxuICAgICAgICAgICAgICAgICAgICB5ZWFyID0gLXllYXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKXtcblxuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMjAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHllYXIpe1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgcmVmTW9tZW50LmRhdGUoZGF5KTtcblxuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKDEsICd5Jyk7XG4gICAgICAgICAgICB2YXIgbGFzdFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoLTEsICd5Jyk7XG4gICAgICAgICAgICBpZiggTWF0aC5hYnMobmV4dFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApe1xuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IG5leHRZZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggTWF0aC5hYnMobGFzdFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApe1xuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlZWtkYXkgY29tcG9uZW50XG4gICAgICAgIGlmIChtYXRjaFtXRUVLREFZX0dST1VQXSkge1xuICAgICAgICAgICAgdmFyIHdlZWtkYXkgPSBtYXRjaFtXRUVLREFZX0dST1VQXTtcbiAgICAgICAgICAgIHdlZWtkYXkgPSB1dGlsLldFRUtEQVlfT0ZGU0VUW3dlZWtkYXkudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCB3ZWVrZGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgY2FuIGJlICdyYW5nZScgdmFsdWUuIFN1Y2ggYXMgJ0phbnVhcnkgMTIgLSAxMywgMjAxMidcbiAgICAgICAgaWYgKG1hdGNoW0RBVEVfVE9fR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgZW5kRGF0ZSA9IG1hdGNoW0RBVEVfVE9fTlVNX0dST1VQXSA/XG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fTlVNX0dST1VQXSkgOlxuICAgICAgICAgICAgICAgIHV0aWwuT1JESU5BTF9XT1JEU1ttYXRjaFtEQVRFX1RPX0dST1VQXS5yZXBsYWNlKCctJywgJyAnKS50cmltKCkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSByZXN1bHQuc3RhcnQuY2xvbmUoKTtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdkYXknLCBlbmREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzWydFTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59OyIsIi8qXG4gICAgXG4gICAgVGhlIHBhcnNlciBmb3IgcGFyc2luZyBtb250aCBuYW1lIGFuZCB5ZWFyLlxuICAgIFxuICAgIEVYLiBcbiAgICAgICAgLSBKYW51YXJ5XG4gICAgICAgIC0gSmFudWFyeSAyMDEyXG4gICAgICAgIC0gSmFudWFyeSwgMjAxMlxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKF58XFxcXERcXFxccyt8W15cXFxcd1xcXFxzXSknICtcbiAgICAnKEphblxcXFwuP3xKYW51YXJ5fEZlYlxcXFwuP3xGZWJydWFyeXxNYXJcXFxcLj98TWFyY2h8QXByXFxcXC4/fEFwcmlsfE1heVxcXFwuP3xKdW5cXFxcLj98SnVuZXxKdWxcXFxcLj98SnVseXxBdWdcXFxcLj98QXVndXN0fFNlcFxcXFwuP3xTZXB0XFxcXC4/fFNlcHRlbWJlcnxPY3RcXFxcLj98T2N0b2JlcnxOb3ZcXFxcLj98Tm92ZW1iZXJ8RGVjXFxcXC4/fERlY2VtYmVyKScgKyBcbiAgICAnXFxcXHMqJyArXG4gICAgJyg/OicgK1xuICAgICAgICAnWywtXT9cXFxccyooWzAtOV17NH0pKFxcXFxzKkJFfEFEfEJDKT8nICtcbiAgICAnKT8nICtcbiAgICAnKD89W15cXFxcc1xcXFx3XXxcXFxccytbXjAtOV18XFxcXHMrJHwkKScsICdpJyk7XG5cbnZhciBNT05USF9OQU1FX0dST1VQID0gMjtcbnZhciBZRUFSX0dST1VQID0gMztcbnZhciBZRUFSX0JFX0dST1VQID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTk1vbnRoTmFtZVBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG4gICAgXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIGRheSA9IDE7XG5cbiAgICAgICAgdmFyIHllYXIgPSBudWxsO1xuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcbiAgICAgICAgICAgIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYobWF0Y2hbWUVBUl9CRV9HUk9VUF0pe1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFtZRUFSX0JFX0dST1VQXS5tYXRjaCgvQkUvKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBCdWRkaGlzdCBFcmFcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IHllYXIgLSA1NDM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtZRUFSX0JFX0dST1VQXS5tYXRjaCgvQkMvKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBCZWZvcmUgQ2hyaXN0XG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSAteWVhcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7IFxuXG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcil7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG5cbiAgICAgICAgICAgIHZhciBuZXh0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgxLCAneScpO1xuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHJlZk1vbWVudC5kaWZmKG1vbWVudChyZWYpKSkgKXsgIFxuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IG5leHRZZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggTWF0aC5hYnMobGFzdFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyBcbiAgICAgICAgICAgICAgICByZWZNb21lbnQgPSBsYXN0WWVhcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzWydFTk1vbnRoTmFtZVBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRU4nKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKG5leHR8bGFzdHxwYXN0KVxcXFxzKicgK1xuICAgICcoJysgdXRpbC5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gKyAnfFswLTldK3xmZXd8aGFsZig/OlxcXFxzKmFuPyk/KT9cXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbig/OnV0ZSk/cz98aG91cnM/fGRheXM/fHdlZWtzP3xtb250aHM/fHllYXJzPykoPz1cXFxccyopJyArXG4gICAgJyg/PVxcXFxXfCQpJywgJ2knXG4pO1xuXG52YXIgTU9ESUZJRVJfV09SRF9HUk9VUCA9IDI7XG52YXIgTVVMVElQTElFUl9XT1JEX0dST1VQID0gMztcbnZhciBSRUxBVElWRV9XT1JEX0dST1VQID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9O1xuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG1vZGlmaWVyID0gbWF0Y2hbTU9ESUZJRVJfV09SRF9HUk9VUF0udG9Mb3dlckNhc2UoKS5tYXRjaCgvXm5leHQvKSA/IDEgOiAtMTtcbiAgICAgICAgdmFyIHRleHQgID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdC50YWdzWydFTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlciddID0gdHJ1ZTtcblxuICAgICAgICB2YXIgbnVtID0gbWF0Y2hbTVVMVElQTElFUl9XT1JEX0dST1VQXSA9PT0gdW5kZWZpbmVkID8gJycgOiBtYXRjaFszXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodXRpbC5JTlRFR0VSX1dPUkRTW251bV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbnVtID0gdXRpbC5JTlRFR0VSX1dPUkRTW251bV07XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09PSAnJyl7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvZmV3L2kpKXtcbiAgICAgICAgICAgIG51bSA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9oYWxmL2kpKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbnVtICo9IG1vZGlmaWVyO1xuXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG4gICAgICAgIGlmIChtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS5tYXRjaCgvZGF5fHdlZWt8bW9udGh8eWVhci9pKSkge1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbUkVMQVRJVkVfV09SRF9HUk9VUF0ubWF0Y2goL2RheS9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ2QnKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS5tYXRjaCgvd2Vlay9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSAqIDcsICdkJyk7XG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyB0aGUgZXhhY3QgZGF0ZSBmb3IgbmV4dC9sYXN0IHdlZWsgc28gd2UgaW1wbHlcbiAgICAgICAgICAgICAgICAvLyB0aGVtXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbUkVMQVRJVkVfV09SRF9HUk9VUF0ubWF0Y2goL21vbnRoL2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnbW9udGgnKTtcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBrbm93IHRoZSBleGFjdCBkYXkgZm9yIG5leHQvbGFzdCBtb250aFxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbUkVMQVRJVkVfV09SRF9HUk9VUF0ubWF0Y2goL3llYXIvaSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLmFkZChudW0sICd5ZWFyJyk7XG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyB0aGUgZXhhY3QgZGF5IGZvciBtb250aCBvbiBuZXh0L2xhc3QgeWVhclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoW1JFTEFUSVZFX1dPUkRfR1JPVVBdLm1hdGNoKC9ob3VyL2kpKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ2hvdXInKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWludXRlJywgZGF0ZS5taW51dGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbUkVMQVRJVkVfV09SRF9HUk9VUF0ubWF0Y2goL21pbi9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdtaW51dGUnKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdzZWNvbmQnLCBkYXRlLnNlY29uZCgpKTtcblxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1JFTEFUSVZFX1dPUkRfR1JPVVBdLm1hdGNoKC9zZWNvbmQvaSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnc2Vjb25kJyk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLCBkYXRlLnNlY29uZCgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcbiAgICBEYXRlIGZvcm1hdCB3aXRoIHNsYXNoIFwiL1wiIChhbHNvIFwiLVwiIGFuZCBcIi5cIikgYmV0d2VlbiBudW1iZXJzXG4gICAgLSBUdWVzZGF5IDExLzMvMjAxNVxuICAgIC0gMTEvMy8yMDE1XG4gICAgLSAxMS8zXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgJyg/OicgK1xuICAgICAgICAnKD86b25cXFxccyo/KT8nICtcbiAgICAgICAgJygoPzpzdW58bW9ufHR1ZXM/fHdlZCg/Om5lcyk/fHRodSg/OnJzPyk/fGZyaXxzYXQoPzp1cik/KSg/OmRheSk/KScgK1xuICAgICAgICAnXFxcXHMqXFxcXCw/XFxcXHMqJyArXG4gICAgJyk/JyArXG4gICAgJyhbMC0zXXswLDF9WzAtOV17MX0pW1xcXFwvXFxcXC5cXFxcLV0oWzAtM117MCwxfVswLTldezF9KScgK1xuICAgICcoPzonICtcbiAgICAgICAgJ1tcXFxcL1xcXFwuXFxcXC1dJyArXG4gICAgICAgICcoWzAtOV17NH1cXHMqXFwsP1xccyp8WzAtOV17Mn1cXHMqXFwsP1xccyopJyArXG4gICAgJyk/JyArXG4gICAgJyhcXFxcV3wkKScsICdpJyk7XG5cbnZhciBEQVlTX09GRlNFVCA9IHsgJ3N1bmRheSc6IDAsICdzdW4nOiAwLCAnbW9uZGF5JzogMSwgJ21vbic6IDEsJ3R1ZXNkYXknOiAyLCAnd2VkbmVzZGF5JzogMywgJ3dlZCc6IDMsXG4gICAgJ3RodXJzZGF5JzogNCwgJ3RodXInOiA0LCdmcmlkYXknOiA1LCAnZnJpJzogNSwnc2F0dXJkYXknOiA2LCAnc2F0JzogNix9XG5cblxudmFyIE9QRU5OSU5HX0dST1VQID0gMTtcbnZhciBFTkRJTkdfR1JPVVAgPSA2O1xuXG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG52YXIgTU9OVEhfR1JPVVAgPSAzO1xudmFyIERBWV9HUk9VUCA9IDQ7XG52YXIgWUVBUl9HUk9VUCA9IDU7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIoYXJndW1lbnQpIHtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBBVFRFUk47IH07XG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZihtYXRjaFtPUEVOTklOR19HUk9VUF0gPT0gJy8nIHx8IG1hdGNoW0VORElOR19HUk9VUF0gPT0gJy8nKSB7XG4gICAgICAgICAgICAvLyBMb25nIHNraXAsIGlmIHRoZXJlIGlzIHNvbWUgb3ZlcmxhcHBpbmcgbGlrZTpcbiAgICAgICAgICAgIC8vIFhYWy9ZWS9aWl1cbiAgICAgICAgICAgIC8vIFtYWC9ZWS9dWlpcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aCk7XG5cblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGQkLykpIHJldHVybjtcbiAgICAgICAgaWYodGV4dC5tYXRjaCgvXlxcZFxcLlxcZHsxLDJ9XFwuXFxkezEsMn0kLykpIHJldHVybjtcblxuICAgICAgICAvLyBNTS9kZCAtPiBPS1xuICAgICAgICAvLyBNTS5kZCAtPiBOR1xuICAgICAgICBpZighbWF0Y2hbWUVBUl9HUk9VUF0gJiYgbWF0Y2hbMF0uaW5kZXhPZignLycpIDwgMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkYXRlID0gbnVsbDtcbiAgICAgICAgdmFyIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXSB8fCBtb21lbnQocmVmKS55ZWFyKCkgKyAnJztcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfR1JPVVBdO1xuICAgICAgICB2YXIgZGF5ICAgPSBtYXRjaFtEQVlfR1JPVVBdO1xuXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xuICAgICAgICBkYXkgID0gcGFyc2VJbnQoZGF5KTtcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgIGlmKG1vbnRoIDwgMSB8fCBtb250aCA+IDEyKSB7XG4gICAgICAgICAgICBpZihtb250aCA+IDEyKSB7XG4gICAgICAgICAgICAgICAgLy8gZGQvbW0veXl5eSBkYXRlIGZvcm1hdCBpZiBkYXkgbG9va3MgbGlrZSBhIG1vbnRoLCBhbmQgbW9udGhcbiAgICAgICAgICAgICAgICAvLyBsb29rcyBsaWtlIGEgZGF5LlxuICAgICAgICAgICAgICAgIGlmIChkYXkgPj0gMSAmJiBkYXkgPD0gMTIgJiYgbW9udGggPj0gMTMgJiYgbW9udGggPD0gMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5hbWJpZ3VvdXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRkYXkgPSBtb250aDtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXk7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IHRkYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBib3RoIG1vbnRoIGFuZCBkYXkgYXJlIDw9IDEyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihkYXkgPCAxIHx8IGRheSA+IDMxKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZih5ZWFyIDwgMTAwKXtcbiAgICAgICAgICAgIGlmICh5ZWFyID4gNTApIHtcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDE5MDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMjAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgeWVhcik7XG5cbiAgICAgICAgLy9EYXkgb2Ygd2Vla1xuICAgICAgICBpZihtYXRjaFtXRUVLREFZX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIERBWVNfT0ZGU0VUW21hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzWydFTlNsYXNoRGF0ZUZvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufTtcbiIsIi8qXG4gICAgRGF0ZSBmb3JtYXQgd2l0aCBzbGFzaCBcIi9cIiBiZXR3ZWVuIG51bWJlcnMgbGlrZSBFTlNsYXNoRGF0ZUZvcm1hdFBhcnNlcixcbiAgICBidXQgdGhpcyBwYXJzZXIgZXhwZWN0IHllYXIgYmVmb3JlIG1vbnRoIGFuZCBkYXRlLiBcbiAgICAtIFlZWVkvTU0vRERcbiAgICAtIFlZWVktTU0tRERcbiAgICAtIFlZWVkuTU0uRERcbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknIFxuICAgICAgICAgICAgKyAnKFswLTldezR9KVtcXFxcLVxcXFwuXFxcXC9dKFswLTldezEsMn0pW1xcXFwtXFxcXC5cXFxcL10oWzAtOV17MSwyfSknXG4gICAgICAgICAgICArICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBZRUFSX05VTUJFUl9HUk9VUCA9IDI7XG52YXIgTU9OVEhfTlVNQkVSX0dST1VQID0gMztcbnZhciBEQVRFX05VTUJFUl9HUk9VUCAgPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHBhcnNlSW50KG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHBhcnNlSW50KG1hdGNoW01PTlRIX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgcGFyc2VJbnQobWF0Y2hbREFURV9OVU1CRVJfR1JPVVBdKSk7XG5cbiAgICAgICAgaWYgKG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSA+IDEyIHx8IG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSA8IDEgfHxcbiAgICAgICAgICAgIG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdkYXknKSkgPiAzMSB8fCBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnZGF5JykpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC50YWdzWydFTkRhdGVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgTW9udGgvWWVhciBkYXRlIGZvcm1hdCB3aXRoIHNsYXNoIFwiL1wiIChhbHNvIFwiLVwiIGFuZCBcIi5cIikgYmV0d2VlbiBudW1iZXJzIFxuICAgIC0gMTEvMDVcbiAgICAtIDA2LzIwMDVcbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXnxbXlxcXFxkL11cXFxccyt8W15cXFxcd1xcXFxzXSknICtcbiAgICAnKFswLTldfDBbMS05XXwxWzAxMl0pLyhbMC05XXs0fSknICsgXG4gICAgJyhbXlxcXFxkL118JCknLCAnaScpO1xuXG52YXIgT1BFTk5JTkdfR1JPVVAgPSAxO1xudmFyIEVORElOR19HUk9VUCA9IDQ7XG5cbnZhciBNT05USF9HUk9VUCA9IDI7XG52YXIgWUVBUl9HUk9VUCA9IDM7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyKGFyZ3VtZW50KSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQQVRURVJOOyB9O1xuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIFxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoW09QRU5OSU5HX0dST1VQXS5sZW5ndGg7XG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoW09QRU5OSU5HX0dST1VQXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtICgxICsgbWF0Y2hbRU5ESU5HX0dST1VQXS5sZW5ndGgpKS50cmltKCk7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZGF0ZSA9IG51bGw7XG4gICAgICAgIHZhciB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF0gO1xuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9HUk9VUF07XG4gICAgICAgIHZhciBkYXkgICA9IDE7XG4gICAgICAgIFxuICAgICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoKTtcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF5KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcblxuICAgICAgICByZXN1bHQudGFnc1snRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnJyArXG4gICAgJyhcXFxcV3xeKScgK1xuICAgICcoPzp3aXRoaW5cXFxccyopPycgK1xuICAgICcoJyArIHV0aWwuSU5URUdFUl9XT1JEU19QQVRURVJOICsgJ3xbMC05XSt8YW4/KD86XFxcXHMqZmV3KT98aGFsZig/OlxcXFxzKmFuPyk/KVxcXFxzKicgK1xuICAgICcoc2Vjb25kcz98bWluKD86dXRlKT9zP3xob3Vycz98d2Vla3M/fGRheXM/fG1vbnRocz98eWVhcnM/KVxcXFxzKicgK1xuICAgICcoPzphZ298YmVmb3JlfGVhcmxpZXIpKD89KD86XFxcXFd8JCkpJywgJ2knKTtcblxudmFyIFNUUklDVF9QQVRURVJOID0gbmV3IFJlZ0V4cCgnJyArXG4gICAgJyhcXFxcV3xeKScgK1xuICAgICcoPzp3aXRoaW5cXFxccyopPycgK1xuICAgICcoWzAtOV0rfGFuPylcXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbnV0ZXM/fGhvdXJzP3xkYXlzPylcXFxccyonICtcbiAgICAnYWdvKD89KD86XFxcXFd8JCkpJywgJ2knKTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTlRpbWVBZ29Gb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmljdE1vZGUoKT8gU1RSSUNUX1BBVFRFUk4gOiBQQVRURVJOO1xuICAgIH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG51bSA9IG1hdGNoWzJdLnRvTG93ZXJDYXNlKCkgO1xuICAgICAgICBpZiAodXRpbC5JTlRFR0VSX1dPUkRTW251bV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbnVtID0gdXRpbC5JTlRFR0VSX1dPUkRTW251bV07XG4gICAgICAgIH0gZWxzZSBpZihudW0gPT09ICdhJyB8fCBudW0gPT09ICdhbicpe1xuICAgICAgICAgICAgbnVtID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2Zldy8pKSB7XG4gICAgICAgICAgICBudW0gPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvaGFsZi8pKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2hvdXJ8bWlufHNlY29uZC9pKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9ob3VyL2kpKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnaG91cicpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdLm1hdGNoKC9taW4vaSkpIHtcblxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtaW51dGUnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFszXS5tYXRjaCgvc2Vjb25kL2kpKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnc2Vjb25kJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgZGF0ZS5zZWNvbmQoKSk7XG4gICAgICAgICAgICByZXN1bHQudGFnc1snRU5UaW1lQWdvRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvd2Vlay9pKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ3dlZWsnKTtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3dlZWtkYXknLCBkYXRlLmRheSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2RheS9pKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ2QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvbW9udGgvaSkpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtb250aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC95ZWFyL2kpKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICd5ZWFyJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9O1xufVxuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciBQYXJzZWRDb21wb25lbnRzID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkQ29tcG9uZW50cztcblxudmFyIEZJUlNUX1JFR19QQVRURVJOICA9IG5ldyBSZWdFeHAoXCIoXnxcXFxcc3xUKVwiICtcbiAgICBcIig/Oig/OmF0fGZyb20pXFxcXHMqKT9cIiArIFxuICAgIFwiKFxcXFxkezEsNH18bm9vbnxtaWRuaWdodClcIiArIFxuICAgIFwiKD86XCIgKyBcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yaKShcXFxcZHsxLDJ9KVwiICsgXG4gICAgICAgIFwiKD86XCIgKyBcbiAgICAgICAgICAgIFwiKD86XFxcXDp8XFxcXO+8mikoXFxcXGR7Mn0pXCIgKyBcbiAgICAgICAgXCIpP1wiICsgXG4gICAgXCIpP1wiICsgXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cblxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcLXxcXFxc4oCTfFxcXFx+fFxcXFzjgJx8dG98XFxcXD8pXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcZHsxLDR9KVwiICtcbiAgICBcIig/OlwiICsgXG4gICAgICAgIFwiKD86XFxcXC58XFxcXDp8XFxcXO+8mikoXFxcXGR7MSwyfSlcIiArIFxuICAgICAgICBcIig/OlwiICsgXG4gICAgICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgKyBcbiAgICAgICAgXCIpP1wiICsgXG4gICAgXCIpP1wiICsgXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cbnZhciBIT1VSX0dST1VQICAgID0gMjtcbnZhciBNSU5VVEVfR1JPVVAgID0gMztcbnZhciBTRUNPTkRfR1JPVVAgID0gNDtcbnZhciBBTV9QTV9IT1VSX0dST1VQID0gNTtcblxuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOVGltZUV4cHJlc3Npb25QYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIC8vIFRoaXMgcGF0dGVybiBjYW4gYmUgb3ZlcmxhcGVkIEV4LiBbMTJdIEFNLCAxWzJdIEFNXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KCk7XG4gICAgICAgIHJlc3VsdC5yZWYgPSByZWY7XG4gICAgICAgIHJlc3VsdC5pbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICByZXN1bHQudGV4dCAgPSBtYXRjaFswXS5zdWJzdHJpbmcobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOVGltZUV4cHJlc3Npb25QYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCAgIHJlZk1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkrMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsICByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpeyBcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIEhvdXJzXG4gICAgICAgIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibm9vblwiKXtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbSE9VUl9HUk9VUF0udG9Mb3dlckNhc2UoKSA9PSBcIm1pZG5pZ2h0XCIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMDsgXG4gICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZXNcbiAgICAgICAgaWYobWF0Y2hbTUlOVVRFX0dST1VQXSAhPSBudWxsKXsgXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPiAxMDApIHsgXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcbiAgICAgICAgICAgIGhvdXIgICA9IHBhcnNlSW50KGhvdXIvMTAwKTtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7IFxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTSAgXG4gICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihhbXBtID09IFwiYVwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhbXBtID09IFwicFwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtZXJpZGllbScsIG1lcmlkaWVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBFeHRyYWN0aW5nIHRoZSAndG8nIGNodW5rXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIG1hdGNoID0gU0VDT05EX1JFR19QQVRURVJOLmV4ZWModGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKSk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIE5vdCBhY2NlcHQgbnVtYmVyIG9ubHkgcmVzdWx0XG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubWF0Y2goL15cXGQrJC8pKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBQYXR0ZXJuIFwiWVkuWVkgLVhYWFhcIiBpcyBtb3JlIGxpa2UgdGltZXpvbmUgb2Zmc2V0XG4gICAgICAgIGlmIChtYXRjaFswXS5tYXRjaCgvXlxccyooXFwrfFxcLSlcXHMqXFxkezMsNH0kLykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZXN1bHQuZW5kID09IG51bGwpe1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKG51bGwsIHJlc3VsdC5zdGFydC5kYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7IFxuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHBhcnNlSW50KG1hdGNoW1NFQ09ORF9HUk9VUF0pO1xuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgICAgICBcbiAgICAgICAgLy8gLS0tLS0gTWludXRlXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdIT0gbnVsbCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcblxuICAgICAgICAgICAgbWludXRlID0gaG91ciUxMDA7XG4gICAgICAgICAgICBob3VyICAgPSBwYXJzZUludChob3VyLzEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtaW51dGUgPj0gNjApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaG91ciA+IDI0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91ciA+PSAxMikgeyBcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTSBcbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xuXG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIGFtcG0gPSBtYXRjaFtBTV9QTV9IT1VSX0dST1VQXVswXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoYW1wbSA9PSBcImFcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwOyBcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCdkYXknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGFtcG0gPT0gXCJwXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICAgICAgaWYoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lcmlkaWVtID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldCgnaG91cicpICE9IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgcmVzdWx0LnN0YXJ0LmdldCgnaG91cicpICsgMTIpOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50ZXh0ID0gcmVzdWx0LnRleHQgKyBtYXRjaFswXTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRBdFBNID0gcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbWVyaWRpZW0nKSAmJiByZXN1bHQuc3RhcnQuZ2V0KCdtZXJpZGllbScpID09IDE7XG4gICAgICAgICAgICBpZiAoc3RhcnRBdFBNICYmIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSA+IGhvdXIpIHtcbiAgICAgICAgICAgICAgICAvLyAxMHBtIC0gMSAoYW0pXG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5lbmQuZGF0ZSgpLmdldFRpbWUoKSA8IHJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdzdW5kYXknOiAwLCAnc3VuJzogMCwgJ21vbmRheSc6IDEsICdtb24nOiAxLCd0dWVzZGF5JzogMiwgJ3R1ZXMnOjIsICd0dWUnOjIsICd3ZWRuZXNkYXknOiAzLCAnd2VkJzogMyxcbiAgICAndGh1cnNkYXknOiA0LCAndGh1cnMnOjQsICd0aHVyJzogNCwgJ3RodSc6IDQsJ2ZyaWRheSc6IDUsICdmcmknOiA1LCdzYXR1cmRheSc6IDYsICdzYXQnOiA2fTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKD86KD86XFxcXCx8XFxcXCh8XFxcXO+8iClcXFxccyopPycgK1xuICAgICcoPzpvblxcXFxzKj8pPycgK1xuICAgICcoPzoodGhpc3xsYXN0fHBhc3R8bmV4dClcXFxccyopPycgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKERBWVNfT0ZGU0VUKS5qb2luKCd8JykgKyAnKScgK1xuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXG4gICAgJyg/OlxcXFxzKih0aGlzfGxhc3R8cGFzdHxuZXh0KVxcXFxzKndlZWspPycgK1xuICAgICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBQUkVGSVhfR1JPVVAgPSAyO1xudmFyIFdFRUtEQVlfR1JPVVAgPSAzO1xudmFyIFBPU1RGSVhfR1JPVVAgPSA0O1xuXG5cbmV4cG9ydHMudXBkYXRlUGFyc2VkQ29tcG9uZW50ID0gZnVuY3Rpb24gdXBkYXRlUGFyc2VkQ29tcG9uZW50KHJlc3VsdCwgcmVmLCBvZmZzZXQsIG1vZGlmaWVyKSB7XG5cbiAgICB2YXIgc3RhcnRNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICB2YXIgc3RhcnRNb21lbnRGaXhlZCA9IGZhbHNlO1xuICAgIHZhciByZWZPZmZzZXQgPSBzdGFydE1vbWVudC5kYXkoKTtcblxuICAgIGlmKG1vZGlmaWVyID09ICdsYXN0JyB8fCBtb2RpZmllciA9PSAncGFzdCcpIHtcbiAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCAtIDcpO1xuICAgICAgICBzdGFydE1vbWVudEZpeGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYobW9kaWZpZXIgPT0gJ25leHQnKSB7XG4gICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgc3RhcnRNb21lbnRGaXhlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmKG1vZGlmaWVyID09ICd0aGlzJykge1xuICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMob2Zmc2V0IC0gNyAtIHJlZk9mZnNldCkgPCBNYXRoLmFicyhvZmZzZXQgLSByZWZPZmZzZXQpKSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0IC0gNyk7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMob2Zmc2V0ICsgNyAtIHJlZk9mZnNldCkgPCBNYXRoLmFicyhvZmZzZXQgLSByZWZPZmZzZXQpKSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0ICsgNyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCBvZmZzZXQpO1xuICAgIGlmIChzdGFydE1vbWVudEZpeGVkKSB7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHN0YXJ0TW9tZW50LnllYXIoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTldlZWtkYXlQYXJzZXIoKSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGRheU9mV2VlayA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBvZmZzZXQgPSBEQVlTX09GRlNFVFtkYXlPZldlZWtdO1xuICAgICAgICBpZihvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJlZml4ID0gbWF0Y2hbUFJFRklYX0dST1VQXTtcbiAgICAgICAgdmFyIHBvc3RmaXggPSBtYXRjaFtQT1NURklYX0dST1VQXTtcbiAgICAgICAgdmFyIG5vcm0gPSBwcmVmaXggfHwgcG9zdGZpeDtcbiAgICAgICAgbm9ybSA9IG5vcm0gfHwgJyc7XG4gICAgICAgIG5vcm0gPSBub3JtLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZXhwb3J0cy51cGRhdGVQYXJzZWRDb21wb25lbnQocmVzdWx0LCByZWYsIG9mZnNldCwgbm9ybSk7XG4gICAgICAgIHJlc3VsdC50YWdzWydFTldlZWtkYXlQYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxuLypcbiAgVmFsaWQgcGF0dGVybnM6XG4gIC0gZXN0YSBtYcOxYW5hIC0+IHRvZGF5IGluIHRoZSBtb3JuaW5nXG4gIC0gZXN0YSB0YXJkZSAtPiB0b2RheSBpbiB0aGUgYWZ0ZXJub29uL2V2ZW5pbmdcbiAgLSBlc3RhIG5vY2hlIC0+IHRvbmlnaHRcbiAgLSBheWVyIHBvciBsYSBtYcOxYW5hIC0+IHllc3RlcmRheSBpbiB0aGUgbW9ybmluZ1xuICAtIGF5ZXIgcG9yIGxhIHRhcmRlIC0+IHllc3RlcmRheSBpbiB0aGUgYWZ0ZXJub29uL2V2ZW5pbmdcbiAgLSBheWVyIHBvciBsYSBub2NoZSAtPiB5ZXN0ZXJkYXkgYXQgbmlnaHRcbiAgLSBtYcOxYW5hIHBvciBsYSBtYcOxYW5hIC0+IHRvbW9ycm93IGluIHRoZSBtb3JuaW5nXG4gIC0gbWHDsWFuYSBwb3IgbGEgdGFyZGUgLT4gdG9tb3Jyb3cgaW4gdGhlIGFmdGVybm9vbi9ldmVuaW5nXG4gIC0gbWHDsWFuYSBwb3IgbGEgbm9jaGUgLT4gdG9tb3Jyb3cgYXQgbmlnaHRcbiAgLSBhbm9jaGUgLT4gdG9tb3Jyb3cgYXQgbmlnaHRcbiAgLSBob3kgLT4gdG9kYXlcbiAgLSBheWVyIC0+IHllc3RlcmRheVxuICAtIG1hw7FhbmEgLT4gdG9tb3Jyb3dcbiAqL1xudmFyIFBBVFRFUk4gPSAvKFxcV3xeKShhaG9yYXxlc3RhXFxzKihtYcOxYW5hfHRhcmRlfG5vY2hlKXwoYXllcnxtYcOxYW5hKVxccypwb3JcXHMqbGFcXHMqKG1hw7FhbmF8dGFyZGV8bm9jaGUpfGhveXxtYcOxYW5hfGF5ZXJ8YW5vY2hlKSg/PVxcV3wkKS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTQ2FzdWFsRGF0ZVBhcnNlcigpe1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG5cbiAgICAgICAgaWYobG93ZXJUZXh0ID09ICdtYcOxYW5hJyl7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgaWYocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZihsb3dlclRleHQgPT0gJ2F5ZXInKSB7XG5cbiAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobG93ZXJUZXh0ID09ICdhbm9jaGUnKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDApO1xuICAgICAgICAgICAgaWYgKHJlZk1vbWVudC5ob3VyKCkgPiA2KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChsb3dlclRleHQubWF0Y2goXCJlc3RhXCIpKSB7XG5cbiAgICAgICAgICAgIHZhciBzZWNvbmRNYXRjaCA9IG1hdGNoWzNdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoc2Vjb25kTWF0Y2ggPT0gXCJ0YXJkZVwiKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxOCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kTWF0Y2ggPT0gXCJtYcOxYW5hXCIpIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDYpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZE1hdGNoID09IFwibm9jaGVcIikge1xuXG4gICAgICAgICAgICAgIC8vIE5vcm1hbGx5IG1lYW5zIHRoaXMgY29taW5nIG1pZG5pZ2h0XG4gICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDIyKTtcbiAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKC9wb3JcXHMqbGEvKSkge1xuXG4gICAgICAgICAgICB2YXIgZmlyc3RNYXRjaCA9IG1hdGNoWzRdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoZmlyc3RNYXRjaCA9PT0gJ2F5ZXInKSB7XG5cbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RNYXRjaCA9PT0gJ21hw7FhbmEnKSB7XG5cbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2Vjb25kTWF0Y2ggPSBtYXRjaFs1XS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlY29uZE1hdGNoID09IFwidGFyZGVcIikge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZE1hdGNoID09IFwibWHDsWFuYVwiKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA5KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRNYXRjaCA9PSBcIm5vY2hlXCIpIHtcblxuICAgICAgICAgICAgICAvLyBOb3JtYWxseSBtZWFucyB0aGlzIGNvbWluZyBtaWRuaWdodFxuICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKFwiYWhvcmFcIikpIHtcblxuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIHJlZk1vbWVudC5ob3VyKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWludXRlJywgcmVmTW9tZW50Lm1pbnV0ZSgpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIHJlZk1vbWVudC5zZWNvbmQoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaWxsaXNlY29uZCcsIHJlZk1vbWVudC5taWxsaXNlY29uZCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5Jywgc3RhcnRNb21lbnQuZGF0ZSgpKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxuICAgICAgICByZXN1bHQudGFnc1snRVNDYXN1YWxEYXRlUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gLyhcXFd8XikoZGVudHJvXFxzKmRlfGVuKVxccyooWzAtOV0rfG1lZGlbb2FdfHVuYT8pXFxzKihtaW51dG9zP3xob3Jhcz98ZFtpw61dYXM/KVxccyooPz0oPzpcXFd8JCkpL2k7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNEZWFkbGluZUZvcm1hdFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICAgICAgaWYgKGlzTmFOKG51bSkpIHtcbiAgICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL21lZGkvKSkge1xuICAgICAgICAgICAgbnVtID0gMC41O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG4gICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvZFtpw61dYS8pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdkJyk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9ob3JhLykpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnaG91cicpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21pbnV0by8pKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21pbnV0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTRGVhZGxpbmVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRVMnKTtcblxudmFyIERBWVNfT0ZGU0VUID0gdXRpbC5XRUVLREFZX09GRlNFVDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAgICAgJyg/OihEb21pbmdvfEx1bmVzfE1hcnRlc3xNacOpcmNvbGVzfE1pZXJjb2xlc3xKdWV2ZXN8Vmllcm5lc3xTw6FiYWRvfFNhYmFkb3xEb218THVufE1hcnxNaWV8SnVlfFZpZXxTYWIpXFxcXHMqLD9cXFxccyopPycgK1xuICAgICAgICAnKFswLTldezEsMn0pKD86wrp8wqp8wrApPycgK1xuICAgICAgICAnKD86XFxcXHMqKD86ZGVzZGV8ZGV8XFxcXC18XFxcXOKAk3xhbD98aGFzdGF8XFxcXHMpXFxcXHMqKFswLTldezEsMn0pKD86wrp8wqp8wrApPyk/XFxcXHMqKD86ZGUpP1xcXFxzKicgK1xuICAgICAgICAnKEVuZSg/OnJvfFxcXFwuKT98RmViKD86cmVyb3xcXFxcLik/fE1hcig/OnpvfFxcXFwuKT98QWJyKD86aWx8XFxcXC4pP3xNYXkoPzpvfFxcXFwuKT98SnVuKD86aW98XFxcXC4pP3xKdWwoPzppb3xcXFxcLik/fEFnbyg/OnN0b3xcXFxcLik/fFNlcCg/OnRpZW1icmV8XFxcXC4pP3xPY3QoPzp1YnJlfFxcXFwuKT98Tm92KD86aWVtYnJlfFxcXFwuKT98RGljKD86aWVtYnJlfFxcXFwuKT8pJyArXG4gICAgICAgICcoPzpcXFxccyooPzpkZWw/KT8oXFxcXHMqWzAtOV17MSw0fSg/IVteXFxcXHNdXFxcXGQpKShcXFxccypbYWRdXFxcXC4/XFxcXHMqY1xcXFwuP3xhXFxcXC4/XFxcXHMqZFxcXFwuPyk/KT8nICtcbiAgICAgICAgJyg/PVxcXFxXfCQpJywgJ2knXG4gICAgKTtcblxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xudmFyIERBVEVfR1JPVVAgPSAzO1xudmFyIERBVEVfVE9fR1JPVVAgPSA0O1xudmFyIE1PTlRIX05BTUVfR1JPVVAgPSA1O1xudmFyIFlFQVJfR1JPVVAgPSA2O1xudmFyIFlFQVJfQkVfR1JPVVAgPSA3O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9OQU1FX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgZGF5ID0gbWF0Y2hbREFURV9HUk9VUF07XG4gICAgICAgIGRheSA9IHBhcnNlSW50KGRheSk7XG5cbiAgICAgICAgdmFyIHllYXIgPSBudWxsO1xuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcbiAgICAgICAgICAgIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYobWF0Y2hbWUVBUl9CRV9HUk9VUF0pe1xuICAgICAgICAgICAgICAgIGlmICgvYVxcLj9cXHMqY1xcLj8vaS50ZXN0KG1hdGNoW1lFQVJfQkVfR1JPVVBdKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbnRlcyBkZSBDcmlzdG9cbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IC15ZWFyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7XG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG4gICAgICAgICAgICByZWZNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgtMSwgJ3knKTtcbiAgICAgICAgICAgIGlmKCBNYXRoLmFicyhuZXh0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBKYW51YXJ5IDIwMTInXG4gICAgICAgIGlmIChtYXRjaFtEQVRFX1RPX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fR1JPVVBdKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRVNNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn0iLCIvKlxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgKGFsc28gXCItXCIgYW5kIFwiLlwiKSBiZXR3ZWVuIG51bWJlcnNcbiAgICAtIE1hcnRlcyAzLzExLzIwMTVcbiAgICAtIDMvMTEvMjAxNVxuICAgIC0gMy8xMVxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzonICtcbiAgICAgICAgJygoPzpkb21pbmdvfGRvbXxsdW5lc3xsdW58bWFydGVzfG1hcnxtaVvDqWVdcmNvbGVzfG1pZXxqdWV2ZXN8anVlfHZpZXJuZXN8dmllfHNbw6FhXWJhZG98c2FiKSknICtcbiAgICAgICAgJ1xcXFxzKlxcXFwsP1xcXFxzKicgK1xuICAgICcpPycgK1xuICAgICcoWzAtMV17MCwxfVswLTldezF9KVtcXFxcL1xcXFwuXFxcXC1dKFswLTNdezAsMX1bMC05XXsxfSknICtcbiAgICAnKD86JyArXG4gICAgICAgICdbXFxcXC9cXFxcLlxcXFwtXScgK1xuICAgICAgICAnKFswLTldezR9XFxzKlxcLD9cXHMqfFswLTldezJ9XFxzKlxcLD9cXHMqKScgK1xuICAgICcpPycgK1xuICAgICcoXFxcXFd8JCknLCAnaScpO1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdkb21pbmdvJzogMCwgJ2RvbSc6IDAsICdsdW5lcyc6IDEsICdsdW4nOiAxLCAnbWFydGVzJzogMiwgJ21hcic6IDIsICdtaWVyY29sZXMnOiAzLCAnbWnDqXJjb2xlcyc6IDMsICdtaWUnOiAzLFxuICAgICdqdWV2ZXMnOiA0LCAnanVlJzogNCwgJ3ZpZXJuZXMnOiA1LCAndmllcic6IDUsICdzw6FiYWRvJzogNiwgJ3NhYmFkbyc6IDYsICdzYWInOiA2LH1cblxuXG52YXIgT1BFTk5JTkdfR1JPVVAgPSAxO1xudmFyIEVORElOR19HUk9VUCA9IDY7XG5cbi8vIGluIFNwYW5pc2ggd2UgdXNlIGRheS9tb250aC95ZWFyXG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG52YXIgTU9OVEhfR1JPVVAgPSA0O1xudmFyIERBWV9HUk9VUCA9IDM7XG52YXIgWUVBUl9HUk9VUCA9IDU7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNTbGFzaERhdGVGb3JtYXRQYXJzZXIoYXJndW1lbnQpIHtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBBVFRFUk47IH07XG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZihtYXRjaFtPUEVOTklOR19HUk9VUF0gPT0gJy8nIHx8IG1hdGNoW0VORElOR19HUk9VUF0gPT0gJy8nKSB7XG4gICAgICAgICAgICAvLyBMb25nIHNraXAsIGlmIHRoZXJlIGlzIHNvbWUgb3ZlcmxhcHBpbmcgbGlrZTpcbiAgICAgICAgICAgIC8vIFhYWy9ZWS9aWl1cbiAgICAgICAgICAgIC8vIFtYWC9ZWS9dWlpcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aCk7XG5cblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGQkLykpIHJldHVybjtcbiAgICAgICAgaWYodGV4dC5tYXRjaCgvXlxcZFxcLlxcZHsxLDJ9XFwuXFxkezEsMn0kLykpIHJldHVybjtcblxuICAgICAgICAvLyBNTS9kZCAtPiBPS1xuICAgICAgICAvLyBNTS5kZCAtPiBOR1xuICAgICAgICBpZighbWF0Y2hbWUVBUl9HUk9VUF0gJiYgbWF0Y2hbMF0uaW5kZXhPZignLycpIDwgMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkYXRlID0gbnVsbDtcbiAgICAgICAgdmFyIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXSB8fCBtb21lbnQocmVmKS55ZWFyKCkgKyAnJztcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfR1JPVVBdO1xuICAgICAgICB2YXIgZGF5ICAgPSBtYXRjaFtEQVlfR1JPVVBdO1xuXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xuICAgICAgICBkYXkgID0gcGFyc2VJbnQoZGF5KTtcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgIGlmKG1vbnRoIDwgMSB8fCBtb250aCA+IDEyKSB7XG4gICAgICAgICAgICBpZihtb250aCA+IDEyKSB7XG4gICAgICAgICAgICAgICAgLy8gZGQvbW0veXl5eSBkYXRlIGZvcm1hdCBpZiBkYXkgbG9va3MgbGlrZSBhIG1vbnRoLCBhbmQgbW9udGhcbiAgICAgICAgICAgICAgICAvLyBsb29rcyBsaWtlIGEgZGF5LlxuICAgICAgICAgICAgICAgIGlmIChkYXkgPj0gMSAmJiBkYXkgPD0gMTIgJiYgbW9udGggPj0gMTMgJiYgbW9udGggPD0gMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5hbWJpZ3VvdXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRkYXkgPSBtb250aDtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXk7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IHRkYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBib3RoIG1vbnRoIGFuZCBkYXkgYXJlIDw9IDEyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihkYXkgPCAxIHx8IGRheSA+IDMxKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZih5ZWFyIDwgMTAwKXtcbiAgICAgICAgICAgIGlmKHllYXIgPiA1MCl7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAxOTAwO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcblxuICAgICAgICAvL0RheSBvZiB3ZWVrXG4gICAgICAgIGlmKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5JywgREFZU19PRkZTRVRbbWF0Y2hbV0VFS0RBWV9HUk9VUF0udG9Mb3dlckNhc2UoKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTU2xhc2hEYXRlRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59OyIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gLyhcXFd8XiloYWNlXFxzKihbMC05XSt8bWVkaVtvYV18dW5hPylcXHMqKG1pbnV0b3M/fGhvcmFzP3xzZW1hbmFzP3xkW2nDrV1hcz98bWVzKGVzKT98YcOxb3M/KSg/PSg/OlxcV3wkKSkvaTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU1RpbWVBZ29Gb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgICAgaWYgKG1hdGNoWzJdLm1hdGNoKC9tZWRpLykpIHtcbiAgICAgICAgICAgIG51bSA9IDAuNTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudChyZWYpO1xuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvaG9yYS8pIHx8IG1hdGNoWzNdLm1hdGNoKC9taW51dG8vKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9ob3JhLykpIHtcblxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdob3VyJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbM10ubWF0Y2goL21pbnV0by8pKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnbWludXRlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTVGltZUFnb0Zvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL3NlbWFuYS8pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnd2VlaycpO1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnd2Vla2RheScsIGRhdGUuZGF5KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvZFtpw61dYS8pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9tZXMvKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ21vbnRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2HDsW8vKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAneWVhcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfTtcbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XG5cbnZhciBGSVJTVF9SRUdfUEFUVEVSTiAgPSBuZXcgUmVnRXhwKFwiKF58XFxcXHN8VClcIiArXG4gICAgXCIoPzooPzphIGxhcz98YWw/fGRlc2RlfGRlKVxcXFxzKik/XCIgK1xuICAgIFwiKFxcXFxkezEsNH18bWVkaW9kW2nDrV1hfG1lZGlhbm9jaGUpXCIgK1xuICAgIFwiKD86XCIgK1xuICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgK1xuICAgICAgICBcIig/OlwiICtcbiAgICAgICAgICAgIFwiKD86XFxcXDp8XFxcXO+8mikoXFxcXGR7Mn0pXCIgK1xuICAgICAgICBcIik/XCIgK1xuICAgIFwiKT9cIiArXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgK1xuICAgIFwiKD89XFxcXFd8JClcIiwgJ2knKTtcblxuXG52YXIgU0VDT05EX1JFR19QQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArXG4gICAgXCIoXFxcXC18XFxcXOKAk3xcXFxcfnxcXFxc44CcfGEoPzpcXHMqbGFzKT98XFxcXD8pXFxcXHMqXCIgK1xuICAgIFwiKFxcXFxkezEsNH0pXCIgK1xuICAgIFwiKD86XCIgK1xuICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgK1xuICAgICAgICBcIig/OlwiICtcbiAgICAgICAgICAgIFwiKD86XFxcXC58XFxcXDp8XFxcXO+8mikoXFxcXGR7MSwyfSlcIiArXG4gICAgICAgIFwiKT9cIiArXG4gICAgXCIpP1wiICtcbiAgICBcIig/OlxcXFxzKihBXFxcXC5NXFxcXC58UFxcXFwuTVxcXFwufEFNP3xQTT8pKT9cIiArXG4gICAgXCIoPz1cXFxcV3wkKVwiLCAnaScpO1xuXG52YXIgSE9VUl9HUk9VUCAgICA9IDI7XG52YXIgTUlOVVRFX0dST1VQICA9IDM7XG52YXIgU0VDT05EX0dST1VQICA9IDQ7XG52YXIgQU1fUE1fSE9VUl9HUk9VUCA9IDU7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNUaW1lRXhwcmVzc2lvblBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBGSVJTVF9SRUdfUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICAvLyBUaGlzIHBhdHRlcm4gY2FuIGJlIG92ZXJsYXBlZCBFeC4gWzEyXSBBTSwgMVsyXSBBTVxuICAgICAgICBpZiAobWF0Y2guaW5kZXggPiAwICYmIHRleHRbbWF0Y2guaW5kZXgtMV0ubWF0Y2goL1xcdy8pKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCgpO1xuICAgICAgICByZXN1bHQucmVmID0gcmVmO1xuICAgICAgICByZXN1bHQuaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0LnRleHQgID0gbWF0Y2hbMF0uc3Vic3RyaW5nKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHJlc3VsdC50YWdzWydFU1RpbWVFeHByZXNzaW9uUGFyc2VyJ10gPSB0cnVlO1xuXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgICByZWZNb21lbnQuZGF0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIHJlZk1vbWVudC5tb250aCgpKzEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCAgcmVmTW9tZW50LnllYXIoKSk7XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZihzZWNvbmQgPj0gNjApIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLCBzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gSG91cnNcbiAgICAgICAgaWYgKG1hdGNoW0hPVVJfR1JPVVBdLnRvTG93ZXJDYXNlKCkubWF0Y2goL21lZGlvZC8pKXtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgIGhvdXIgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibWVkaWFub2NoZVwiKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmKG1hdGNoW01JTlVURV9HUk9VUF0gIT0gbnVsbCl7XG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIlMTAwO1xuICAgICAgICAgICAgaG91ciAgID0gcGFyc2VJbnQoaG91ci8xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhvdXIgPiAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE1cbiAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHZhciBhbXBtID0gbWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKGFtcG0gPT0gXCJhXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYW1wbSA9PSBcInBcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgbWF0Y2ggPSBTRUNPTkRfUkVHX1BBVFRFUk4uZXhlYyh0ZXh0LnN1YnN0cmluZyhyZXN1bHQuaW5kZXggKyByZXN1bHQudGV4dC5sZW5ndGgpKTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgLy8gTm90IGFjY2VwdCBudW1iZXIgb25seSByZXN1bHRcbiAgICAgICAgICAgIGlmIChyZXN1bHQudGV4dC5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gUGF0dGVybiBcIllZLllZIC1YWFhYXCIgaXMgbW9yZSBsaWtlIHRpbWV6b25lIG9mZnNldFxuICAgICAgICBpZiAobWF0Y2hbMF0ubWF0Y2goL15cXHMqKFxcK3xcXC0pXFxzKlxcZHszLDR9JC8pKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocmVzdWx0LmVuZCA9PSBudWxsKXtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBuZXcgUGFyc2VkQ29tcG9uZW50cyhudWxsLCByZXN1bHQuc3RhcnQuZGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpe1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHBhcnNlSW50KG1hdGNoW1NFQ09ORF9HUk9VUF0pO1xuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZVxuICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSE9IG51bGwpIHtcblxuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgICAgICBpZihtaW51dGUgPj0gNjApIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTAwKSB7XG5cbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIlMTAwO1xuICAgICAgICAgICAgaG91ciAgID0gcGFyc2VJbnQoaG91ci8xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhvdXIgPiAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE1cbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xuXG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKSA9PSBcImFcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVuZC5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKSA9PSBcInBcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbWVyaWRpZW0nKSkge1xuICAgICAgICAgICAgICAgIGlmIChtZXJpZGllbSA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSAhPSAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSArIDEyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYoaG91ciA+PSAxMikge1xuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRleHQgPSByZXN1bHQudGV4dCArIG1hdGNoWzBdO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWludXRlJywgbWludXRlKTtcbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdtZXJpZGllbScsIG1lcmlkaWVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuZW5kLmRhdGUoKS5nZXRUaW1lKCkgPCByZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcblxuXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXBkYXRlUGFyc2VkQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vRU4vRU5XZWVrZGF5UGFyc2VyJykudXBkYXRlUGFyc2VkQ29tcG9uZW50O1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdkb21pbmdvJzogMCwgJ2RvbSc6IDAsICdsdW5lcyc6IDEsICdsdW4nOiAxLCAnbWFydGVzJzogMiwgJ21hcic6MiwgJ21pZXJjb2xlcyc6IDMsICdtacOpcmNvbGVzJzogMywgJ21pZSc6IDMsXG4gICAgJ2p1ZXZlcyc6IDQsICdqdWUnOiA0LCAndmllcm5lcyc6IDUsICd2aWVyJzogNSwgJ3NhYmFkbyc6IDYsICdzw6FiYWRvJzogNiwgJ3NhYic6IDYsfVxuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXG4gICAgJyg/Oihlc3RlfHBhc2Fkb3xwcltvw7NdeGltbylcXFxccyopPycgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKERBWVNfT0ZGU0VUKS5qb2luKCd8JykgKyAnKScgK1xuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXG4gICAgJyg/OlxcXFxzKihlc3RlfHBhc2Fkb3xwclvDs29deGltbylcXFxccyp3ZWVrKT8nICtcbiAgICAnKD89XFxcXFd8JCknLCAnaScpO1xuXG52YXIgUFJFRklYX0dST1VQID0gMjtcbnZhciBXRUVLREFZX0dST1VQID0gMztcbnZhciBQT1NURklYX0dST1VQID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU1dlZWtkYXlQYXJzZXIoKSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZGF5T2ZXZWVrID0gbWF0Y2hbV0VFS0RBWV9HUk9VUF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG9mZnNldCA9IERBWVNfT0ZGU0VUW2RheU9mV2Vla107XG4gICAgICAgIGlmKG9mZnNldCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgbW9kaWZpZXIgPSBudWxsO1xuICAgICAgICB2YXIgcHJlZml4ID0gbWF0Y2hbUFJFRklYX0dST1VQXTtcbiAgICAgICAgdmFyIHBvc3RmaXggPSBtYXRjaFtQT1NURklYX0dST1VQXTtcbiAgICAgICAgaWYgKHByZWZpeCB8fCBwb3N0Zml4KSB7XG4gICAgICAgICAgICB2YXIgbm9ybSA9IHByZWZpeCB8fCBwb3N0Zml4O1xuICAgICAgICAgICAgbm9ybSA9IG5vcm0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYobm9ybSA9PSAncGFzYWRvJykge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gJ3RoaXMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihub3JtID09ICdwcsOzeGltbycgfHwgbm9ybSA9PSAncHJveGltbycpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9ICduZXh0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobm9ybT09ICdlc3RlJykge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gICd0aGlzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVBhcnNlZENvbXBvbmVudChyZXN1bHQsIHJlZiwgb2Zmc2V0LCBtb2RpZmllcik7XG4gICAgICAgIHJlc3VsdC50YWdzWydFU1dlZWtkYXlQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcclxuXHJcblxyXG4qL1xyXG5cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xyXG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xyXG5cclxudmFyIFBBVFRFUk4gPSAvKFxcV3xeKShtYWludGVuYW50fGF1am91cmQnaHVpfGFqZHxjZXR0ZVxccypudWl0fGxhXFxzKnZlaWxsZXwoZGVtYWlufGhpZXIpKFxccyoobWF0aW58c29pcnxhcHJlbXxhcHLDqHMtbWlkaSkpP3xjZVxccyoobWF0aW58c29pcil8Y2V0XFxzKihhcHLDqHMtbWlkaXxhcHJlbSkpKD89XFxXfCQpL2k7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSQ2FzdWFsRGF0ZVBhcnNlcigpe1xyXG5cclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxyXG5cclxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIHJlZjogcmVmLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XHJcbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gcmVmTW9tZW50LmNsb25lKCk7XHJcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYobG93ZXJUZXh0Lm1hdGNoKC9kZW1haW4vKSl7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxyXG4gICAgICAgICAgICBpZihyZWZNb21lbnQuaG91cigpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGlmKGxvd2VyVGV4dC5tYXRjaCgvaGllci8pKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobG93ZXJUZXh0Lm1hdGNoKC9jZXR0ZVxccypudWl0Lykpe1xyXG4gICAgICAgICAgICAvLyBOb3JtYWxseSBtZWFucyB0aGlzIGNvbWluZyBtaWRuaWdodFxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmKGxvd2VyVGV4dC5tYXRjaCgvbGFcXHMqdmVpbGxlLykpIHtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDApO1xyXG4gICAgICAgICAgICBpZiAocmVmTW9tZW50LmhvdXIoKSA+IDYpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKC8oYXByw6hzLW1pZGl8YXByZW0pLykpIHtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDE0KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChsb3dlclRleHQubWF0Y2goLyhzb2lyKS8pKSB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxOCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKC9tYXRpbi8pKSB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA4KTtcclxuXHJcbiAgICAgICAgfSAgZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKFwibWFpbnRlbmFudFwiKSkge1xyXG5cclxuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIHJlZk1vbWVudC5ob3VyKCkpO1xyXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaW51dGUnLCByZWZNb21lbnQubWludXRlKCkpO1xyXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdzZWNvbmQnLCByZWZNb21lbnQuc2Vjb25kKCkpO1xyXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaWxsaXNlY29uZCcsIHJlZk1vbWVudC5taWxsaXNlY29uZCgpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSlcclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxyXG4gICAgICAgIHJlc3VsdC50YWdzWydGUkNhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG5cclxuXHJcbiovXHJcblxyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XHJcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XHJcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0ZSJyk7XHJcblxyXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xyXG4gICAgJyhkYW5zfGVuKVxcXFxzKicgK1xyXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfHVuZT98KD86XFxcXHMqcXVlbHF1ZXMpP3xkZW1pKD86XFxcXHMqfC0/KT8pXFxcXHMqJyArXHJcbiAgICAnKHNlY29uZGVzP3xtaW4oPzp1dGUpP3M/fGhldXJlcz98am91cnM/fHNlbWFpbmVzP3xtb2lzfGFubsOpZXM/KVxcXFxzKicgK1xyXG4gICAgJyg/PVxcXFxXfCQpJywgJ2knXHJcbik7XHJcblxyXG52YXIgU1RSSUNUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcclxuICAgICcoZGFuc3xlbilcXFxccyonICtcclxuICAgICcoJysgdXRpbC5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gKyAnfFswLTldK3x1bj8pXFxcXHMqJyArXHJcbiAgICAnKHNlY29uZGVzP3xtaW51dGVzP3xoZXVyZXM/fGpvdXJzPylcXFxccyonICtcclxuICAgICcoPz1cXFxcV3wkKScsICdpJ1xyXG4pO1xyXG5cclxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBGUkRlYWRsaW5lRm9ybWF0UGFyc2VyKCl7XHJcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmljdE1vZGUoKT8gU1RSSUNUX1BBVFRFUk4gOiBQQVRURVJOO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG5cclxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcclxuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcclxuICAgICAgICB0ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICByZWY6IHJlZlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgbnVtID0gbWF0Y2hbM107XHJcbiAgICAgICAgaWYgKHV0aWwuSU5URUdFUl9XT1JEU1tudW1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbnVtID0gdXRpbC5JTlRFR0VSX1dPUkRTW251bV07XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09ICd1bicgfHwgbnVtID09PSAndW5lJyl7XHJcbiAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL3F1ZWxxdWVzPy9pKSl7XHJcbiAgICAgICAgICAgIG51bSA9IDM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2RlbWktPy9pKSkge1xyXG4gICAgICAgICAgICBudW0gPSAwLjU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XHJcbiAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9qb3VyfHNlbWFpbmV8bW9pc3xhbm7DqWUvaSkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvam91ci8pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlLmFkZChudW0sICdkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL3NlbWFpbmUvaSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSAqIDcsICdkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21vaXMvaSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL2FubsOpZS9pKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAneWVhcicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2hbNF0ubWF0Y2goL2hldXJlL2kpKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdob3VyJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21pbi9pKSkge1xyXG5cclxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnbWludXRlcycpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9zZWNvbmRlcy9pKSkge1xyXG5cclxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnc2Vjb25kJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgZGF0ZS5zZWNvbmQoKSk7XHJcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0ZSRGVhZGxpbmVGb3JtYXRQYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbn07XHJcbiIsIi8qXHJcblxyXG5cclxuKi9cclxuXHJcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuXHJcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XHJcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XHJcblxyXG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9GUicpO1xyXG5cclxudmFyIERBWVNfT0ZGU0VUID0gdXRpbC5XRUVLREFZX09GRlNFVDtcclxuXHJcbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXHJcbiAgICAgICAgJyg/OihEaW1hbmNoZXxMdW5kaXxNYXJkaXxtZXJjcmVkaXxKZXVkaXxWZW5kcmVkaXxTYW1lZGl8RGltfEx1bnxNYXJ8TWVyfEpldXxWZW58U2FtKVxcXFxzKiw/XFxcXHMqKT8nICtcclxuICAgICAgICAnKFswLTldezEsMn18MWVyKScgK1xyXG4gICAgICAgICcoPzpcXFxccyooPzphdXxcXFxcLXxcXFxc4oCTfGp1c3F1XFwnYXU/fFxcXFxzKVxcXFxzKihbMC05XXsxLDJ9KSg/OmVyKT8pP1xcXFxzKig/OmRlKT9cXFxccyonICtcclxuICAgICAgICAnKEphbig/OnZpZXJ8XFxcXC4pP3xGw6l2KD86cmllcnxcXFxcLik/fE1hcnN8QXZyKD86aWx8XFxcXC4pP3xNYWl8SnVpbnxKdWlsKD86bGV0fFxcXFwuKT98QW9bdcO7XXR8U2VwdCg/OmVtYnJlfFxcXFwuKT98T2N0KD86b2JyZXxcXFxcLik/fE5vdig/OmVtYnJlfFxcXFwuKT98ZMOpYyg/OmVtYnJlfFxcXFwuKT8pJyArXHJcbiAgICAgICAgJyg/OlxcXFxzKihcXFxccypbMC05XXsxLDR9KD8hW15cXFxcc11cXFxcZCkpKD86XFxcXHMqKEFDfFthcF1cXFxcLj9cXFxccypjKD86aCg/OnIpPyk/XFxcXC4/XFxcXHMqblxcXFwuPykpPyk/JyArXHJcbiAgICAgICAgJyg/PVxcXFxXfCQpJywgJ2knXHJcbiAgICApO1xyXG5cclxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xyXG52YXIgREFURV9HUk9VUCA9IDM7XHJcbnZhciBEQVRFX1RPX0dST1VQID0gNDtcclxudmFyIE1PTlRIX05BTUVfR1JPVVAgPSA1O1xyXG52YXIgWUVBUl9HUk9VUCA9IDY7XHJcbnZhciBZRUFSX0JFX0dST1VQID0gNztcclxuXHJcbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRlJNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIoKXtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxyXG5cclxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcclxuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcclxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICByZWY6IHJlZixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XHJcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfR1JPVVBdO1xyXG4gICAgICAgIGRheSA9IHBhcnNlSW50KGRheSk7XHJcblxyXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcclxuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcclxuICAgICAgICAgICAgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdO1xyXG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XHJcblxyXG4gICAgICAgICAgICBpZihtYXRjaFtZRUFSX0JFX0dST1VQXSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoL2EvaS50ZXN0KG1hdGNoW1lFQVJfQkVfR1JPVVBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFudGUgQ2hyaXN0ZSBuYXR1bVxyXG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSAteWVhcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKXtcclxuXHJcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHllYXIpe1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXHJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcclxuICAgICAgICAgICAgcmVmTW9tZW50Lm1vbnRoKG1vbnRoIC0gMSk7XHJcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XHJcbiAgICAgICAgICAgIHJlZk1vbWVudC55ZWFyKG1vbWVudChyZWYpLnllYXIoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcclxuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xyXG4gICAgICAgICAgICBpZiggTWF0aC5hYnMobmV4dFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApe1xyXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiggTWF0aC5hYnMobGFzdFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApe1xyXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlZWtkYXkgY29tcG9uZW50XHJcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrZGF5ID0gbWF0Y2hbV0VFS0RBWV9HUk9VUF07XHJcbiAgICAgICAgICAgIHdlZWtkYXkgPSB1dGlsLldFRUtEQVlfT0ZGU0VUW3dlZWtkYXkudG9Mb3dlckNhc2UoKV1cclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBqYW52aWVyIDIwMTInXHJcbiAgICAgICAgaWYgKG1hdGNoW0RBVEVfVE9fR1JPVVBdKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSByZXN1bHQuc3RhcnQuY2xvbmUoKTtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fR1JPVVBdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQudGFnc1snRlJNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbn1cclxuIiwiLypcclxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgKGFsc28gXCItXCIgYW5kIFwiLlwiKSBiZXR3ZWVuIG51bWJlcnNcclxuICAgIC0gTWFydGVzIDMvMTEvMjAxNVxyXG4gICAgLSAzLzExLzIwMTVcclxuICAgIC0gMy8xMVxyXG4qL1xyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XHJcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XHJcblxyXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xyXG4gICAgJyg/OicgK1xyXG4gICAgICAgICcoKD86ZGltYW5jaGV8ZGltfGx1bmRpfGx1bnxtYXJkaXxtYXJ8bWVyY3JlZGl8bWVyfGpldWRpfGpldXx2ZW5kcmVkaXx2ZW58c2FtZWRpfHNhbXxsZSkpJyArXHJcbiAgICAgICAgJ1xcXFxzKlxcXFwsP1xcXFxzKicgK1xyXG4gICAgJyk/JyArXHJcbiAgICAnKFswLTNdezAsMX1bMC05XXsxfSlbXFxcXC9cXFxcLlxcXFwtXShbMC0zXXswLDF9WzAtOV17MX0pJyArXHJcbiAgICAnKD86JyArXHJcbiAgICAgICAgJ1tcXFxcL1xcXFwuXFxcXC1dJyArXHJcbiAgICAgICAgJyhbMC05XXs0fVxccypcXCw/XFxzKnxbMC05XXsyfVxccypcXCw/XFxzKiknICtcclxuICAgICcpPycgK1xyXG4gICAgJyhcXFxcV3wkKScsICdpJyk7XHJcblxyXG52YXIgREFZU19PRkZTRVQgPSB7ICdkaW1hbmNoZSc6IDAsICdkaW0nOiAwLCAnbHVuZGknOiAxLCAnbHVuJzogMSwnbWFyZGknOiAyLCAnbWFyJzoyLCAnbWVyY3JlZGknOiAzLCAnbWVyJzogMyxcclxuICAgICdqZXVkaSc6IDQsICdqZXUnOjQsICd2ZW5kcmVkaSc6IDUsICd2ZW4nOiA1LCdzYW1lZGknOiA2LCAnc2FtJzogNn07XHJcblxyXG5cclxudmFyIE9QRU5OSU5HX0dST1VQID0gMTtcclxudmFyIEVORElOR19HUk9VUCA9IDY7XHJcblxyXG4vLyBJbiBGcmVuY2ggd2UgdXNlIGRheS9tb250aC95ZWFyXHJcbnZhciBXRUVLREFZX0dST1VQID0gMjtcclxudmFyIERBWV9HUk9VUCA9IDM7XHJcbnZhciBNT05USF9HUk9VUCA9IDQ7XHJcbnZhciBZRUFSX0dST1VQID0gNTtcclxuXHJcbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRlJTbGFzaERhdGVGb3JtYXRQYXJzZXIoYXJndW1lbnQpIHtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBBVFRFUk47IH07XHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG5cclxuICAgICAgICBpZihtYXRjaFtPUEVOTklOR19HUk9VUF0gPT0gJy8nIHx8IG1hdGNoW0VORElOR19HUk9VUF0gPT0gJy8nKSB7XHJcbiAgICAgICAgICAgIC8vIExvbmcgc2tpcCwgaWYgdGhlcmUgaXMgc29tZSBvdmVybGFwcGluZyBsaWtlOlxyXG4gICAgICAgICAgICAvLyBYWFsvWVkvWlpdXHJcbiAgICAgICAgICAgIC8vIFtYWC9ZWS9dWlpcclxuICAgICAgICAgICAgbWF0Y2guaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbT1BFTk5JTkdfR1JPVVBdLmxlbmd0aDtcclxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgcmVmOiByZWYsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGQkLykpIHJldHVybjtcclxuICAgICAgICBpZih0ZXh0Lm1hdGNoKC9eXFxkXFwuXFxkezEsMn1cXC5cXGR7MSwyfSQvKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBNTS9kZCAtPiBPS1xyXG4gICAgICAgIC8vIE1NLmRkIC0+IE5HXHJcbiAgICAgICAgaWYoIW1hdGNoW1lFQVJfR1JPVVBdICYmIG1hdGNoWzBdLmluZGV4T2YoJy8nKSA8IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBudWxsO1xyXG4gICAgICAgIHZhciB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF0gfHwgbW9tZW50KHJlZikueWVhcigpICsgJyc7XHJcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfR1JPVVBdO1xyXG4gICAgICAgIHZhciBkYXkgICA9IG1hdGNoW0RBWV9HUk9VUF07XHJcblxyXG4gICAgICAgIGRheSAgPSBwYXJzZUludChkYXkpO1xyXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xyXG4gICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcclxuXHJcbiAgICAgICAgaWYobW9udGggPCAxIHx8IG1vbnRoID4gMTIpIHtcclxuICAgICAgICAgICAgaWYobW9udGggPiAxMikge1xyXG4gICAgICAgICAgICAgICAgLy8gZGQvbW0veXl5eSBkYXRlIGZvcm1hdCBpZiBkYXkgbG9va3MgbGlrZSBhIG1vbnRoLCBhbmQgbW9udGggbG9va3MgbGlrZSBhIGRheS5cclxuICAgICAgICAgICAgICAgIGlmIChkYXkgPj0gMSAmJiBkYXkgPD0gMTIgJiYgbW9udGggPj0gMTMgJiYgbW9udGggPD0gMzEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1bmFtYmlndW91c1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZGF5ID0gbW9udGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gdGRheTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJvdGggbW9udGggYW5kIGRheSBhcmUgPD0gMTJcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXkgPCAxIHx8IGRheSA+IDMxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoeWVhciA8IDEwMCl7XHJcbiAgICAgICAgICAgIGlmKHllYXIgPiA1MCl7XHJcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDE5MDA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcclxuXHJcbiAgICAgICAgLy8gRGF5IG9mIHdlZWtcclxuICAgICAgICBpZihtYXRjaFtXRUVLREFZX0dST1VQXSkge1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5JywgREFZU19PRkZTRVRbbWF0Y2hbV0VFS0RBWV9HUk9VUF0udG9Mb3dlckNhc2UoKV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0ZSU2xhc2hEYXRlRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG59OyIsIi8qXHJcblxyXG5cclxuKi9cclxuXHJcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcclxudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcclxuXHJcbnZhciBQQVRURVJOID0gLyhcXFd8XilpbCB5IGFcXHMqKFswLTldK3x1bmU/KVxccyoobWludXRlcz98aGV1cmVzP3xzZW1haW5lcz98am91cnM/fG1vaXN8YW5uw6llcz98YW5zPykoPz0oPzpcXFd8JCkpL2k7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSVGltZUFnb0Zvcm1hdFBhcnNlcigpe1xyXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoLmluZGV4ID4gMCAmJiB0ZXh0W21hdGNoLmluZGV4LTFdLm1hdGNoKC9cXHcvKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF07XHJcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xyXG4gICAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICByZWY6IHJlZixcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXN1bHQudGFnc1snRlJUaW1lQWdvRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludChtYXRjaFsyXSk7XHJcbiAgICAgICAgaWYgKGlzTmFOKG51bSkpIHtcclxuICAgICAgICAgIGlmIChtYXRjaFsyXS5tYXRjaCgvZGVtaS8pKSB7XHJcbiAgICAgICAgICAgIG51bSA9IDAuNTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudChyZWYpO1xyXG5cclxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2hldXJlLykgfHwgbWF0Y2hbM10ubWF0Y2goL21pbnV0ZS8pKSB7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvaGV1cmUvKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdob3VyJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdLm1hdGNoKC9taW51dGUvKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtaW51dGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL3NlbWFpbmUvKSkge1xyXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3dlZWtkYXknLCBkYXRlLmRheSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvam91ci8pKSB7XHJcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL21vaXMvKSkge1xyXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvYW5uw6llcz98YW5zPy8pKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAneWVhcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH07XHJcbn1cclxuIiwiLypcclxuXHJcblxyXG4qL1xyXG5cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xyXG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xyXG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XHJcblxyXG52YXIgRklSU1RfUkVHX1BBVFRFUk4gID0gbmV3IFJlZ0V4cChcIihefFxcXFxzfFQpXCIgK1xyXG4gICAgXCIoPzooPzpbw6BhXSlcXFxccyopP1wiICtcclxuICAgIFwiKFxcXFxkezEsMn0oPzpoKT98bWlkaXxtaW51aXQpXCIgK1xyXG4gICAgXCIoPzpcIiArXHJcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yafGgpKFxcXFxkezEsMn0pKD86bSk/XCIgK1xyXG4gICAgICAgIFwiKD86XCIgK1xyXG4gICAgICAgICAgICBcIig/OlxcXFw6fFxcXFzvvJp8bSkoXFxcXGR7MCwyfSkoPzpzKT9cIiArXHJcbiAgICAgICAgXCIpP1wiICtcclxuICAgIFwiKT9cIiArXHJcbiAgICBcIig/OlxcXFxzKihBXFxcXC5NXFxcXC58UFxcXFwuTVxcXFwufEFNP3xQTT8pKT9cIiArXHJcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XHJcblxyXG5cclxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgK1xyXG4gICAgXCIoXFxcXC18XFxcXOKAk3xcXFxcfnxcXFxc44CcfFvDoGFdfFxcXFw/KVxcXFxzKlwiICtcclxuICAgIFwiKFxcXFxkezEsMn0oPzpoKT8pXCIgK1xyXG4gICAgXCIoPzpcIiArXHJcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yafGgpKFxcXFxkezEsMn0pKD86bSk/XCIgK1xyXG4gICAgICAgIFwiKD86XCIgK1xyXG4gICAgICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJp8bSkoXFxcXGR7MSwyfSkoPzpzKT9cIiArXHJcbiAgICAgICAgXCIpP1wiICtcclxuICAgIFwiKT9cIiArXHJcbiAgICBcIig/OlxcXFxzKihBXFxcXC5NXFxcXC58UFxcXFwuTVxcXFwufEFNP3xQTT8pKT9cIiArXHJcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XHJcblxyXG52YXIgSE9VUl9HUk9VUCAgICA9IDI7XHJcbnZhciBNSU5VVEVfR1JPVVAgID0gMztcclxudmFyIFNFQ09ORF9HUk9VUCAgPSA0O1xyXG52YXIgQU1fUE1fSE9VUl9HUk9VUCA9IDU7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSVGltZUV4cHJlc3Npb25QYXJzZXIoKXtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cclxuXHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG5cclxuICAgICAgICAvLyBUaGlzIHBhdHRlcm4gY2FuIGJlIG92ZXJsYXBlZCBFeC4gWzEyXSBBTSwgMVsyXSBBTVxyXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCgpO1xyXG4gICAgICAgIHJlc3VsdC5yZWYgPSByZWY7XHJcbiAgICAgICAgcmVzdWx0LmluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XHJcbiAgICAgICAgcmVzdWx0LnRleHQgID0gbWF0Y2hbMF0uc3Vic3RyaW5nKG1hdGNoWzFdLmxlbmd0aCk7XHJcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0ZSVGltZUV4cHJlc3Npb25QYXJzZXInXSA9IHRydWU7XHJcblxyXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgICByZWZNb21lbnQuZGF0ZSgpKTtcclxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkrMSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgIHJlZk1vbWVudC55ZWFyKCkpO1xyXG5cclxuICAgICAgICB2YXIgaG91ciA9IDA7XHJcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XHJcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxyXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcclxuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLSBIb3Vyc1xyXG4gICAgICAgIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibWlkaVwiKXtcclxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xyXG4gICAgICAgICAgICBob3VyID0gMTI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibWludWl0XCIpIHtcclxuICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xyXG4gICAgICAgICAgICBob3VyID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbSE9VUl9HUk9VUF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0gTWludXRlc1xyXG4gICAgICAgIGlmKG1hdGNoW01JTlVURV9HUk9VUF0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KG1hdGNoW01JTlVURV9HUk9VUF0pO1xyXG4gICAgICAgIH0gZWxzZSBpZihob3VyID4gMTAwKSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIlMTAwO1xyXG4gICAgICAgICAgICBob3VyICAgPSBwYXJzZUludChob3VyLzEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtaW51dGUgPj0gNjApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihob3VyID4gMjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XHJcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE1cclxuICAgICAgICBpZihtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhbXBtID0gbWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYoYW1wbSA9PSBcImFcIil7XHJcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSBob3VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoYW1wbSA9PSBcInBcIil7XHJcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7XHJcbiAgICAgICAgICAgICAgICBpZihob3VyICE9IDEyKSBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xyXG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIG1hdGNoID0gU0VDT05EX1JFR19QQVRURVJOLmV4ZWModGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKSk7XHJcbiAgICAgICAgaWYgKCFtYXRjaCkge1xyXG4gICAgICAgICAgICAvLyBOb3QgYWNjZXB0IG51bWJlciBvbmx5IHJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubWF0Y2goL15cXGQrJC8pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLyBQYXR0ZXJuIFwiWVkuWVkgLVhYWFhcIiBpcyBtb3JlIGxpa2UgdGltZXpvbmUgb2Zmc2V0XHJcbiAgICAgICAgaWYgKG1hdGNoWzBdLm1hdGNoKC9eXFxzKihcXCt8XFwtKVxccypcXGR7Myw0fSQvKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocmVzdWx0LmVuZCA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKG51bGwsIHJlc3VsdC5zdGFydC5kYXRlKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGhvdXIgPSAwO1xyXG4gICAgICAgIHZhciBtaW51dGUgPSAwO1xyXG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xyXG5cclxuICAgICAgICAvLyAtLS0tLSBTZWNvbmRcclxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpe1xyXG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XHJcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFsyXSk7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZVxyXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XHJcbiAgICAgICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTAwKSB7XHJcblxyXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcclxuICAgICAgICAgICAgaG91ciAgID0gcGFyc2VJbnQoaG91ci8xMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWludXRlID49IDYwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaG91ciA+IDI0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaG91ciA+PSAxMikge1xyXG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXHJcbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xyXG5cclxuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZihtYXRjaFtBTV9QTV9IT1VSX0dST1VQXVswXS50b0xvd2VyQ2FzZSgpID09IFwiYVwiKXtcclxuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcclxuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCkgPT0gXCJwXCIpe1xyXG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYoaG91ciAhPSAxMikgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgIT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSArIDEyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPj0gMTIpIHtcclxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnRleHQgPSByZXN1bHQudGV4dCArIG1hdGNoWzBdO1xyXG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdob3VyJywgaG91cik7XHJcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XHJcbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5lbmQuZGF0ZSgpLmdldFRpbWUoKSA8IHJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ2RheScsIHJlc3VsdC5lbmQuZ2V0KCdkYXknKSArIDEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcblxyXG5cclxuKi9cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xyXG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xyXG52YXIgdXBkYXRlUGFyc2VkQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vRU4vRU5XZWVrZGF5UGFyc2VyJykudXBkYXRlUGFyc2VkQ29tcG9uZW50O1xyXG5cclxudmFyIERBWVNfT0ZGU0VUID0geyAnZGltYW5jaGUnOiAwLCAnZGltJzogMCwgJ2x1bmRpJzogMSwgJ2x1bic6IDEsJ21hcmRpJzogMiwgJ21hcic6MiwgJ21lcmNyZWRpJzogMywgJ21lcic6IDMsXHJcbiAgICAnamV1ZGknOiA0LCAnamV1Jzo0LCAndmVuZHJlZGknOiA1LCAndmVuJzogNSwnc2FtZWRpJzogNiwgJ3NhbSc6IDZ9O1xyXG5cclxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknICtcclxuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXHJcbiAgICAnKD86KGNlKVxcXFxzKik/JyArXHJcbiAgICAnKCcgKyBPYmplY3Qua2V5cyhEQVlTX09GRlNFVCkuam9pbignfCcpICsgJyknICtcclxuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXHJcbiAgICAnKD86XFxcXHMqKGRlcm5pZXJ8cHJvY2hhaW4pXFxcXHMqKT8nICtcclxuICAgICcoPz1cXFxcV3wkKScsICdpJyk7XHJcblxyXG52YXIgUFJFRklYX0dST1VQID0gMjtcclxudmFyIFdFRUtEQVlfR1JPVVAgPSAzO1xyXG52YXIgUE9TVEZJWF9HUk9VUCA9IDQ7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSV2Vla2RheVBhcnNlcigpIHtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfTtcclxuXHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgcmVmOiByZWZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGRheU9mV2VlayA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IERBWVNfT0ZGU0VUW2RheU9mV2Vla107XHJcbiAgICAgICAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICB2YXIgbW9kaWZpZXIgPSBudWxsO1xyXG4gICAgICAgIHZhciBwcmVmaXggPSBtYXRjaFtQUkVGSVhfR1JPVVBdO1xyXG4gICAgICAgIHZhciBwb3N0Zml4ID0gbWF0Y2hbUE9TVEZJWF9HUk9VUF07XHJcbiAgICAgICAgaWYgKHByZWZpeCB8fCBwb3N0Zml4KSB7XHJcbiAgICAgICAgICAgIHZhciBub3JtID0gcHJlZml4IHx8IHBvc3RmaXg7XHJcbiAgICAgICAgICAgIG5vcm0gPSBub3JtLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZihub3JtID09ICdkZXJuaWVyJykge1xyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAnbGFzdCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihub3JtID09ICdwcm9jaGFpbicpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gJ25leHQnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYobm9ybT09ICdjZScpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gJ3RoaXMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVQYXJzZWRDb21wb25lbnQocmVzdWx0LCByZWYsIG9mZnNldCwgbW9kaWZpZXIpO1xyXG4gICAgICAgIHJlc3VsdC50YWdzWydGUldlZWtkYXlQYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufTtcclxuXHJcbiIsIi8qXG4gICAgXG4gICAgXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSAv5LuK5pelfOW9k+aXpXzmmKjml6V85piO5pelfOS7iuWknHzku4rlpJV85LuK5pmpfOS7iuacnS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEpQQ2FzdWFsRGF0ZVBhcnNlcigpe1xuICAgIFxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4O1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gcmVmTW9tZW50LmNsb25lKCk7XG5cbiAgICAgICAgaWYodGV4dCA9PSAn5LuK5aScJyB8fCB0ZXh0ID09ICfku4rlpJUnIHx8IHRleHQgPT0gJ+S7iuaZqScpe1xuICAgICAgICAgICAgLy8gTm9ybWFsbHkgbWVhbnMgdGhpcyBjb21pbmcgbWlkbmlnaHQgXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgfSBlbHNlIGlmKHRleHQgPT0gJ+aYjuaXpScpe1xuXG4gICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiA0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYodGV4dCA9PSAn5pio5pelJykge1xuXG4gICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRleHQubWF0Y2goXCLku4rmnJ1cIikpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzWydKUENhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4iLCIvKlxuICAgIFxuICAgIFxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvSlAnKTsgXG52YXIgUEFUVEVSTiA9IC8oPzoo5ZCMfCgo5pit5ZKMfOW5s+aIkCk/KFswLTnvvJAt77yZXXsyLDR9KSkp5bm0XFxzKik/KFswLTnvvJAt77yZXXsxLDJ9KeaciFxccyooWzAtOe+8kC3vvJldezEsMn0p5pelL2k7XG4gIFxudmFyIFlFQVJfR1JPVVAgICAgICAgID0gMjtcbnZhciBFUkFfR1JPVVAgICAgICAgICA9IDM7XG52YXIgWUVBUl9OVU1CRVJfR1JPVVAgPSA0O1xudmFyIE1PTlRIX0dST1VQICAgICAgID0gNTtcbnZhciBEQVlfR1JPVVAgICAgICAgICA9IDY7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gSlBTdGFuZGFyZFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7IFxuXG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLnRvSGFua2FrdShtb250aCk7XG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xuXG4gICAgICAgIHZhciBkYXkgPSBtYXRjaFtEQVlfR1JPVVBdO1xuICAgICAgICBkYXkgPSB1dGlsLnRvSGFua2FrdShkYXkpO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHN0YXJ0TW9tZW50LnNldCgnZGF0ZScsIGRheSk7XG4gICAgICAgIHN0YXJ0TW9tZW50LnNldCgnbW9udGgnLCBtb250aCAtIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAoIW1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vRmluZCB0aGUgbW9zdCBhcHByb3ByaWF0ZWQgeWVhclxuICAgICAgICAgICAgc3RhcnRNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gc3RhcnRNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHN0YXJ0TW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHN0YXJ0TW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyAgXG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQgPSBuZXh0WWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIE1hdGguYWJzKGxhc3RZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHN0YXJ0TW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyBcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbWUVBUl9HUk9VUF0ubWF0Y2goJ+WQjOW5tCcpKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSB1dGlsLnRvSGFua2FrdSh5ZWFyKTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoW0VSQV9HUk9VUF0gPT0gJ+W5s+aIkCcpIHtcbiAgICAgICAgICAgICAgICB5ZWFyICs9IDE5ODg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW0VSQV9HUk9VUF0gPT0gJ+aYreWSjCcpIHtcbiAgICAgICAgICAgICAgICB5ZWFyICs9IDE5MjU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICByZXN1bHQudGFnc1snSlBTdGFuZGFyZFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59XG5cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKOiAjOWutnznq4soPzrliLt85Y2zKXzljbPliLspfCcgK1xuICAgICco5LuKfOaYjnzogb185piofOWwi3znkLQpKOaXqXzmnJ185pmaKXwnICtcbiAgICAnKOS4iig/OuWNiHzmmZ0pfOacnSg/OuaXqSl85pepKD865LiKKXzkuIsoPzrljYh85pmdKXzmmY8oPzrmmZ0pfOaZmig/OuS4iil85aScKD865pmaKT985LitKD865Y2IKXzlh4woPzrmmagpKXwnICtcbiAgICAnKOS7inzmmI586IG9fOaYqHzlsIt855C0KSg/OuaXpXzlpKkpJyArXG4gICAgJyg/OltcXFxcc3wsfO+8jF0qKScgK1xuICAgICcoPzoo5LiKKD865Y2IfOaZnSl85pydKD865pepKXzml6koPzrkuIopfOS4iyg/OuWNiHzmmZ0pfOaZjyg/OuaZnSl85pmaKD865LiKKXzlpJwoPzrmmZopP3zkuK0oPzrljYgpfOWHjCg/OuaZqCkpKT8nLCAnaScpO1xuXG52YXIgTk9XX0dST1VQID0gMTtcbnZhciBEQVlfR1JPVVBfMSA9IDI7XG52YXIgVElNRV9HUk9VUF8xID0gMztcbnZhciBUSU1FX0dST1VQXzIgPSA0O1xudmFyIERBWV9HUk9VUF8zID0gNTtcbnZhciBUSU1FX0dST1VQXzMgPSA2O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIFpISGFudENhc3VhbERhdGVQYXJzZXIoKSB7XG5cbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9O1xuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KSB7XG4gICAgICAgIHRleHQgPSBtYXRjaFswXTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcblxuICAgICAgICBpZiAobWF0Y2hbTk9XX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgcmVmTW9tZW50LmhvdXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbnV0ZScsIHJlZk1vbWVudC5taW51dGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIHJlZk1vbWVudC5zZWNvbmQoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbGxpc2Vjb25kJywgcmVmTW9tZW50Lm1pbGxpc2Vjb25kKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW0RBWV9HUk9VUF8xXSkge1xuICAgICAgICAgICAgdmFyIGRheTEgPSBtYXRjaFtEQVlfR1JPVVBfMV07XG4gICAgICAgICAgICB2YXIgdGltZTEgPSBtYXRjaFtUSU1FX0dST1VQXzFdO1xuXG4gICAgICAgICAgICBpZiAoZGF5MSA9PSAn5piOJyB8fCBkYXkxID09ICfogb0nKSB7XG4gICAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgICBpZihyZWZNb21lbnQuaG91cigpID4gMSkge1xuICAgICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXkxID09ICfmmKgnIHx8IGRheTEgPT0gJ+WwiycgfHwgZGF5MSA9PSAn55C0Jykge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGltZTEgPT0gJ+aXqScgfHwgdGltZTEgPT0gJ+acnScpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA2KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZTEgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbVElNRV9HUk9VUF8yXSkge1xuICAgICAgICAgICAgdmFyIHRpbWVTdHJpbmcyID0gbWF0Y2hbVElNRV9HUk9VUF8yXTtcbiAgICAgICAgICAgIHZhciB0aW1lMiA9IHRpbWVTdHJpbmcyWzBdO1xuICAgICAgICAgICAgaWYgKHRpbWUyID09ICfml6knIHx8IHRpbWUyID09ICfmnJ0nIHx8IHRpbWUyID09ICfkuIonKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUyID09ICfkuIsnIHx8IHRpbWUyID09ICfmmY8nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZTIgPT0gJ+S4rScpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lMiA9PSAn5aScJyB8fCB0aW1lMiA9PSAn5pmaJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDIyKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUyID09ICflh4wnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtEQVlfR1JPVVBfM10pIHtcbiAgICAgICAgICAgIHZhciBkYXkzID0gbWF0Y2hbREFZX0dST1VQXzNdO1xuXG4gICAgICAgICAgICBpZiAoZGF5MyA9PSAn5piOJyB8fCBkYXkzID09ICfogb0nKSB7XG4gICAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgICBpZihyZWZNb21lbnQuaG91cigpID4gMSkge1xuICAgICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXkzID09ICfmmKgnIHx8IGRheTMgPT0gJ+WwiycgfHwgZGF5MyA9PSAn55C0Jykge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciB0aW1lU3RyaW5nMyA9IG1hdGNoW1RJTUVfR1JPVVBfM107XG4gICAgICAgICAgICBpZiAodGltZVN0cmluZzMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZTMgPSB0aW1lU3RyaW5nM1swXTtcbiAgICAgICAgICAgICAgICBpZiAodGltZTMgPT0gJ+aXqScgfHwgdGltZTMgPT0gJ+acnScgfHwgdGltZTMgPT0gJ+S4iicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lMyA9PSAn5LiLJyB8fCB0aW1lMyA9PSAn5pmPJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxNSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUzID09ICfkuK0nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDEyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZTMgPT0gJ+WknCcgfHwgdGltZTMgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMjIpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lMyA9PSAn5YeMJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzLlpISGFudENhc3VhbERhdGVQYXJzZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy9aSC1IYW50LmpzJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKFxcXFxkezIsNH18WycgKyBPYmplY3Qua2V5cyh1dGlsLk5VTUJFUikuam9pbignJykgKyAnXXsyLDR9KT8nICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoPzrlubQpPycgK1xuICAgICcoPzpbXFxcXHN8LHzvvIxdKiknICtcbiAgICAnKFxcXFxkezEsMn18WycgKyBPYmplY3Qua2V5cyh1dGlsLk5VTUJFUikuam9pbignJykgKyAnXXsxLDJ9KScgK1xuICAgICcoPzpcXFxccyopJyArXG4gICAgJyg/OuaciCknICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoXFxcXGR7MSwyfXxbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddezEsMn0pPycgK1xuICAgICcoPzpcXFxccyopJyArXG4gICAgJyg/OuaXpXzomZ8pPydcbik7XG5cbnZhciBZRUFSX0dST1VQID0gMTtcbnZhciBNT05USF9HUk9VUCA9IDI7XG52YXIgREFZX0dST1VQID0gMztcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBaSEhhbnREYXRlUGFyc2VyKCkge1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCkge1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0sXG4gICAgICAgICAgICBpbmRleDogbWF0Y2guaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb250aFxuICAgICAgICB2YXIgbW9udGggPSBwYXJzZUludChtYXRjaFtNT05USF9HUk9VUF0pO1xuICAgICAgICBpZiAoaXNOYU4obW9udGgpKSBtb250aCA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtNT05USF9HUk9VUF0pO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcblxuICAgICAgICAvL0RheVxuICAgICAgICBpZiAobWF0Y2hbREFZX0dST1VQXSkge1xuICAgICAgICAgICAgdmFyIGRheSA9IHBhcnNlSW50KG1hdGNoW0RBWV9HUk9VUF0pO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGRheSkpIGRheSA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtEQVlfR1JPVVBdKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1llYXJcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KG1hdGNoW1lFQVJfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmIChpc05hTih5ZWFyKSkgeWVhciA9IHV0aWwuemhTdHJpbmdUb1llYXIobWF0Y2hbWUVBUl9HUk9VUF0pO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzLlpISGFudERhdGVQYXJzZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy9aSC1IYW50LmpzJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKFxcXFxkK3xbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddK3zljYp85bm+KSg/OlxcXFxzKiknICtcbiAgICAnKD865YCLKT8nICtcbiAgICAnKOenkig/OumQmCk/fOWIhumQmHzlsI/mmYJ86ZCYfOaXpXzlpKl85pif5pyffOemruaLnHzmnIh85bm0KScgK1xuICAgICcoPzooPzrkuYt86YGOKT/lvox8KD865LmLKT/lhacpJywgJ2knXG4pO1xuXG52YXIgTlVNQkVSX0dST1VQID0gMTtcbnZhciBVTklUX0dST1VQID0gMjtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBaSEhhbnRDYXN1YWxEYXRlUGFyc2VyKCkge1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCkge1xuICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICB0ZXh0ICA9IG1hdGNoWzBdO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgcmVmOiByZWZcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbTlVNQkVSX0dST1VQXSk7XG4gICAgICBpZiAoaXNOYU4obnVtYmVyKSl7XG4gICAgICAgIG51bWJlciA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtOVU1CRVJfR1JPVVBdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTmFOKG51bWJlcikpe1xuICAgICAgICB2YXIgc3RyaW5nID0gbWF0Y2hbTlVNQkVSX0dST1VQXTtcbiAgICAgICAgaWYgKHN0cmluZyA9PT0gJ+W5vicpe1xuICAgICAgICAgIG51bWJlciA9IDM7XG4gICAgICAgIH1lbHNlIGlmKHN0cmluZyA9PT0gJ+WNiicpe1xuICAgICAgICAgIG51bWJlciA9IDAuNTtcbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAvL2p1c3QgaW4gY2FzZVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG4gICAgICB2YXIgdW5pdCA9IG1hdGNoW1VOSVRfR1JPVVBdO1xuICAgICAgdmFyIHVuaXRBYmJyID0gdW5pdFswXTtcblxuICAgICAgaWYgKHVuaXRBYmJyLm1hdGNoKC9b5pel5aSp5pif56au5pyI5bm0XS8pKXtcbiAgICAgICAgaWYodW5pdEFiYnIgPT0gJ+aXpScgfHwgdW5pdEFiYnIgPT0gJ+WkqScpe1xuICAgICAgICAgIGRhdGUuYWRkKG51bWJlciwgJ2QnKTtcbiAgICAgICAgfWVsc2UgaWYodW5pdEFiYnIgPT0gJ+aYnycgfHwgdW5pdEFiYnIgPT0gJ+emricpe1xuICAgICAgICAgIGRhdGUuYWRkKG51bWJlciAqIDcsICdkJyk7XG4gICAgICAgIH1lbHNlIGlmKHVuaXRBYmJyID09ICfmnIgnKXtcbiAgICAgICAgICBkYXRlLmFkZChudW1iZXIsICdtb250aCcpO1xuICAgICAgICB9ZWxzZSBpZih1bml0QWJiciA9PSAn5bm0Jyl7XG4gICAgICAgICAgZGF0ZS5hZGQobnVtYmVyLCAneWVhcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBpZih1bml0QWJiciA9PSAn56eSJyl7XG4gICAgICAgIGRhdGUuYWRkKG51bWJlciwgJ3NlY29uZCcpO1xuICAgICAgfWVsc2UgaWYodW5pdEFiYnIgPT0gJ+WIhicpe1xuICAgICAgICBkYXRlLmFkZChudW1iZXIsICdtaW51dGUnKTtcbiAgICAgIH1lbHNlIGlmKHVuaXRBYmJyID09ICflsI8nIHx8IHVuaXRBYmJyID09ICfpkJgnKXtcbiAgICAgICAgZGF0ZS5hZGQobnVtYmVyLCAnaG91cicpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XG4gICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuICAgICAgcmVzdWx0LnRhZ3MuWkhIYW50RGVhZGxpbmVGb3JtYXRQYXJzZXIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufTtcbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvWkgtSGFudC5qcycpO1xuXG52YXIgcGF0dGVyblN0cmluZzEgPSAnKD8655SxfOW+nnzoh6opPycgK1xuICAgICcoPzonICtcbiAgICAnKOS7inzmmI586IG9fOaYqHzlsIt855C0KSjml6l85pydfOaZmil8JyArXG4gICAgJyjkuIooPzrljYh85pmdKXzmnJ0oPzrml6kpfOaXqSg/OuS4iil85LiLKD865Y2IfOaZnSl85pmPKD865pmdKXzmmZooPzrkuIopfOWknCg/OuaZmik/fOS4rSg/OuWNiCl85YeMKD865pmoKSl8JyArXG4gICAgJyjku4p85piOfOiBvXzmmKh85bCLfOeQtCkoPzrml6V85aSpKScgK1xuICAgICcoPzpbXFxcXHMs77yMXSopJyArXG4gICAgJyg/OijkuIooPzrljYh85pmdKXzmnJ0oPzrml6kpfOaXqSg/OuS4iil85LiLKD865Y2IfOaZnSl85pmPKD865pmdKXzmmZooPzrkuIopfOWknCg/OuaZmik/fOS4rSg/OuWNiCl85YeMKD865pmoKSkpPycgK1xuICAgICcpPycgK1xuICAgICcoPzpbXFxcXHMs77yMXSopJyArXG4gICAgJyg/OihcXFxcZCt8WycgKyBPYmplY3Qua2V5cyh1dGlsLk5VTUJFUikuam9pbignJykgKyAnXSspKD86XFxcXHMqKSg/Oum7nnzmmYJ8OnzvvJopJyArXG4gICAgJyg/OlxcXFxzKiknICtcbiAgICAnKFxcXFxkK3zljYp85q2jfOaVtHxbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddKyk/KD86XFxcXHMqKSg/OuWIhnw6fO+8mik/JyArXG4gICAgJyg/OlxcXFxzKiknICtcbiAgICAnKFxcXFxkK3xbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddKyk/KD86XFxcXHMqKSg/Ouenkik/KScgK1xuICAgICcoPzpcXFxccyooQVxcLk1cXC58UFxcLk1cXC58QU0/fFBNPykpPyc7XG5cbnZhciBwYXR0ZXJuU3RyaW5nMiA9ICcoPzpcXFxccyooPzrliLB86IezfFxcXFwtfFxcXFzigJN8XFxcXH58XFxcXOOAnClcXFxccyopJyArXG4gICAgJyg/OicgK1xuICAgICco5LuKfOaYjnzogb185piofOWwi3znkLQpKOaXqXzmnJ185pmaKXwnICtcbiAgICAnKOS4iig/OuWNiHzmmZ0pfOacnSg/OuaXqSl85pepKD865LiKKXzkuIsoPzrljYh85pmdKXzmmY8oPzrmmZ0pfOaZmig/OuS4iil85aScKD865pmaKT985LitKD865Y2IKXzlh4woPzrmmagpKXwnICtcbiAgICAnKOS7inzmmI586IG9fOaYqHzlsIt855C0KSg/OuaXpXzlpKkpJyArXG4gICAgJyg/OltcXFxccyzvvIxdKiknICtcbiAgICAnKD86KOS4iig/OuWNiHzmmZ0pfOacnSg/OuaXqSl85pepKD865LiKKXzkuIsoPzrljYh85pmdKXzmmY8oPzrmmZ0pfOaZmig/OuS4iil85aScKD865pmaKT985LitKD865Y2IKXzlh4woPzrmmagpKSk/JyArXG4gICAgJyk/JyArXG4gICAgJyg/OltcXFxccyzvvIxdKiknICtcbiAgICAnKD86KFxcXFxkK3xbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddKykoPzpcXFxccyopKD866buefOaZgnw6fO+8miknICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoXFxcXGQrfOWNinzmraN85pW0fFsnICsgT2JqZWN0LmtleXModXRpbC5OVU1CRVIpLmpvaW4oJycpICsgJ10rKT8oPzpcXFxccyopKD865YiGfDp877yaKT8nICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoXFxcXGQrfFsnICsgT2JqZWN0LmtleXModXRpbC5OVU1CRVIpLmpvaW4oJycpICsgJ10rKT8oPzpcXFxccyopKD8656eSKT8pJyArXG4gICAgJyg/OlxcXFxzKihBXFwuTVxcLnxQXFwuTVxcLnxBTT98UE0/KSk/JztcblxudmFyIEZJUlNUX1JFR19QQVRURVJOID0gbmV3IFJlZ0V4cChwYXR0ZXJuU3RyaW5nMSwgJ2knKTtcbnZhciBTRUNPTkRfUkVHX1BBVFRFUk4gPSBuZXcgUmVnRXhwKHBhdHRlcm5TdHJpbmcyLCAnaScpO1xuXG52YXIgREFZX0dST1VQXzEgPSAxO1xudmFyIFpIX0FNX1BNX0hPVVJfR1JPVVBfMSA9IDI7XG52YXIgWkhfQU1fUE1fSE9VUl9HUk9VUF8yID0gMztcbnZhciBEQVlfR1JPVVBfMyA9IDQ7XG52YXIgWkhfQU1fUE1fSE9VUl9HUk9VUF8zID0gNTtcbnZhciBIT1VSX0dST1VQID0gNjtcbnZhciBNSU5VVEVfR1JPVVAgPSA3O1xudmFyIFNFQ09ORF9HUk9VUCA9IDg7XG52YXIgQU1fUE1fSE9VUl9HUk9VUCA9IDk7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gWkhIYW50VGltZUV4cHJlc3Npb25QYXJzZXIoKSB7XG5cbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCkge1xuXG4gICAgICAgIC8vIFRoaXMgcGF0dGVybiBjYW4gYmUgb3ZlcmxhcGVkIEV4LiBbMTJdIEFNLCAxWzJdIEFNXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleCAtIDFdLm1hdGNoKC9cXHcvKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoKTtcbiAgICAgICAgcmVzdWx0LnJlZiA9IHJlZjtcbiAgICAgICAgcmVzdWx0LmluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIHJlc3VsdC50ZXh0ID0gbWF0Y2hbMF07XG4gICAgICAgIHJlc3VsdC50YWdzLlpIVGltZUV4cHJlc3Npb25QYXJzZXIgPSB0cnVlO1xuXG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IHJlZk1vbWVudC5jbG9uZSgpO1xuXG4gICAgICAgIC8vIC0tLS0tIERheVxuICAgICAgICBpZiAobWF0Y2hbREFZX0dST1VQXzFdKSB7XG4gICAgICAgICAgICB2YXIgZGF5MSA9IG1hdGNoW0RBWV9HUk9VUF8xXTtcbiAgICAgICAgICAgIGlmIChkYXkxID09ICfmmI4nIHx8IGRheTEgPT0gJ+iBvScpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgbm90IFwiVG9tb3Jyb3dcIiBvbiBsYXRlIG5pZ2h0XG4gICAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRheTEgPT0gJ+aYqCcgfHwgZGF5MSA9PSAn5bCLJyB8fCBkYXkxID09ICfnkLQnKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtEQVlfR1JPVVBfM10pIHtcbiAgICAgICAgICAgIHZhciBkYXkzID0gbWF0Y2hbREFZX0dST1VQXzNdO1xuICAgICAgICAgICAgaWYgKGRheTMgPT0gJ+aYjicgfHwgZGF5MyA9PSAn6IG9Jykge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgxLCAnZGF5Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRheTMgPT0gJ+aYqCcgfHwgZGF5MyA9PSAn5bCLJyB8fCBkYXkzID09ICfnkLQnKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5Jywgc3RhcnRNb21lbnQuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmIChtYXRjaFtTRUNPTkRfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oc2Vjb25kKSkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWNvbmQgPj0gNjApIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIGlmIChpc05hTihob3VyKSkge1xuICAgICAgICAgICAgaG91ciA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSA9PSAn5Y2KJykge1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDMwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdID09ICfmraMnIHx8IG1hdGNoW01JTlVURV9HUk9VUF0gPT0gJ+aVtCcpIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSB1dGlsLnpoU3RyaW5nVG9OdW1iZXIobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIgJSAxMDA7XG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQoaG91ciAvIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmIChtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoYW1wbSA9PSBcImFcIikge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbXBtID09IFwicFwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMV0pIHtcbiAgICAgICAgICAgIHZhciB6aEFNUE1TdHJpbmcxID0gbWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8xXTtcbiAgICAgICAgICAgIHZhciB6aEFNUE0xID0gemhBTVBNU3RyaW5nMVswXTtcbiAgICAgICAgICAgIGlmICh6aEFNUE0xID09ICfmnJ0nIHx8IHpoQU1QTTEgPT0gJ+aXqScpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh6aEFNUE0xID09ICfmmZonKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMl0pIHtcbiAgICAgICAgICAgIHZhciB6aEFNUE1TdHJpbmcyID0gbWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8yXTtcbiAgICAgICAgICAgIHZhciB6aEFNUE0yID0gemhBTVBNU3RyaW5nMlswXTtcbiAgICAgICAgICAgIGlmICh6aEFNUE0yID09ICfkuIonIHx8IHpoQU1QTTIgPT0gJ+acnScgfHwgemhBTVBNMiA9PSAn5pepJyB8fCB6aEFNUE0yID09ICflh4wnKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemhBTVBNMiA9PSAn5LiLJyB8fCB6aEFNUE0yID09ICfmmY8nIHx8IHpoQU1QTTIgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8zXSkge1xuICAgICAgICAgICAgdmFyIHpoQU1QTVN0cmluZzMgPSBtYXRjaFtaSF9BTV9QTV9IT1VSX0dST1VQXzNdO1xuICAgICAgICAgICAgdmFyIHpoQU1QTTMgPSB6aEFNUE1TdHJpbmczWzBdO1xuICAgICAgICAgICAgaWYgKHpoQU1QTTMgPT0gJ+S4iicgfHwgemhBTVBNMyA9PSAn5pydJyB8fCB6aEFNUE0zID09ICfml6knIHx8IHpoQU1QTTMgPT0gJ+WHjCcpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh6aEFNUE0zID09ICfkuIsnIHx8IHpoQU1QTTMgPT0gJ+aZjycgfHwgemhBTVBNMyA9PSAn5pmaJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgbWludXRlKTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICBtYXRjaCA9IFNFQ09ORF9SRUdfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAvLyBOb3QgYWNjZXB0IG51bWJlciBvbmx5IHJlc3VsdFxuICAgICAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRNb21lbnQgPSBzdGFydE1vbWVudC5jbG9uZSgpO1xuICAgICAgICByZXN1bHQuZW5kID0gbmV3IFBhcnNlZENvbXBvbmVudHMobnVsbCwgbnVsbCk7XG5cbiAgICAgICAgLy8gLS0tLS0gRGF5XG4gICAgICAgIGlmIChtYXRjaFtEQVlfR1JPVVBfMV0pIHtcbiAgICAgICAgICAgIHZhciBkYXkxID0gbWF0Y2hbREFZX0dST1VQXzFdO1xuICAgICAgICAgICAgaWYgKGRheTEgPT0gJ+aYjicgfHwgZGF5MSA9PSAn6IG9Jykge1xuICAgICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgICAgaWYocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIGVuZE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRheTEgPT0gJ+aYqCcgfHwgZGF5MSA9PSAn5bCLJyB8fCBkYXkxID09ICfnkLQnKSB7XG4gICAgICAgICAgICAgICAgZW5kTW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIGVuZE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21vbnRoJywgZW5kTW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCd5ZWFyJywgZW5kTW9tZW50LnllYXIoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbREFZX0dST1VQXzNdKSB7XG4gICAgICAgICAgICB2YXIgZGF5MyA9IG1hdGNoW0RBWV9HUk9VUF8zXTtcbiAgICAgICAgICAgIGlmIChkYXkzID09ICfmmI4nIHx8IGRheTMgPT0gJ+iBvScpIHtcbiAgICAgICAgICAgICAgICBlbmRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF5MyA9PSAn5pioJyB8fCBkYXkzID09ICflsIsnIHx8IGRheTMgPT0gJ+eQtCcpIHtcbiAgICAgICAgICAgICAgICBlbmRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignZGF5JywgZW5kTW9tZW50LmRhdGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbW9udGgnLCBlbmRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3llYXInLCBlbmRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ2RheScsIGVuZE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbW9udGgnLCBlbmRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgneWVhcicsIGVuZE1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaG91ciA9IDA7XG4gICAgICAgIG1pbnV0ZSA9IDA7XG4gICAgICAgIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmIChtYXRjaFtTRUNPTkRfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oc2Vjb25kKSkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIGlmIChpc05hTihob3VyKSkge1xuICAgICAgICAgICAgaG91ciA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSA9PSAn5Y2KJykge1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDMwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdID09ICfmraMnIHx8IG1hdGNoW01JTlVURV9HUk9VUF0gPT0gJ+aVtCcpIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSB1dGlsLnpoU3RyaW5nVG9OdW1iZXIobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIgJSAxMDA7XG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQoaG91ciAvIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmIChtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoYW1wbSA9PSBcImFcIikge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbXBtID09IFwicFwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldCgnaG91cicpID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgIT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCByZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgKyAxMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtaSF9BTV9QTV9IT1VSX0dST1VQXzFdKSB7XG4gICAgICAgICAgICB2YXIgemhBTVBNU3RyaW5nMSA9IG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMV07XG4gICAgICAgICAgICB2YXIgemhBTVBNMSA9IHpoQU1QTVN0cmluZzFbMF07XG4gICAgICAgICAgICBpZiAoemhBTVBNMSA9PSAn5pydJyB8fCB6aEFNUE0xID09ICfml6knKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemhBTVBNMSA9PSAn5pmaJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtaSF9BTV9QTV9IT1VSX0dST1VQXzJdKSB7XG4gICAgICAgICAgICB2YXIgemhBTVBNU3RyaW5nMiA9IG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMl07XG4gICAgICAgICAgICB2YXIgemhBTVBNMiA9IHpoQU1QTVN0cmluZzJbMF07XG4gICAgICAgICAgICBpZiAoemhBTVBNMiA9PSAn5LiKJyB8fCB6aEFNUE0yID09ICfmnJ0nIHx8IHpoQU1QTTIgPT0gJ+aXqScgfHwgemhBTVBNMiA9PSAn5YeMJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHpoQU1QTTIgPT0gJ+S4iycgfHwgemhBTVBNMiA9PSAn5pmPJyB8fCB6aEFNUE0yID09ICfmmZonKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfM10pIHtcbiAgICAgICAgICAgIHZhciB6aEFNUE1TdHJpbmczID0gbWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8zXTtcbiAgICAgICAgICAgIHZhciB6aEFNUE0zID0gemhBTVBNU3RyaW5nM1swXTtcbiAgICAgICAgICAgIGlmICh6aEFNUE0zID09ICfkuIonIHx8IHpoQU1QTTMgPT0gJ+acnScgfHwgemhBTVBNMyA9PSAn5pepJyB8fCB6aEFNUE0zID09ICflh4wnKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemhBTVBNMyA9PSAn5LiLJyB8fCB6aEFNUE0zID09ICfmmY8nIHx8IHpoQU1QTTMgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGV4dCA9IHJlc3VsdC50ZXh0ICsgbWF0Y2hbMF07XG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdob3VyJywgaG91cik7XG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0YXJ0QXRQTSA9IHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21lcmlkaWVtJykgJiYgcmVzdWx0LnN0YXJ0LmdldCgnbWVyaWRpZW0nKSA9PSAxO1xuICAgICAgICAgICAgaWYgKHN0YXJ0QXRQTSAmJiByZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPiBob3VyKSB7XG4gICAgICAgICAgICAgICAgLy8gMTBwbSAtIDEgKGFtKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuZW5kLmRhdGUoKS5nZXRUaW1lKCkgPCByZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHVwZGF0ZVBhcnNlZENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL0VOL0VOV2Vla2RheVBhcnNlcicpLnVwZGF0ZVBhcnNlZENvbXBvbmVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy9aSC1IYW50LmpzJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKOS4inzku4p85LiLfOmAmXzlkaIpPycgK1xuICAgICcoPzrlgIspPycgK1xuICAgICcoPzrmmJ/mnJ9856au5oucKScgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKHV0aWwuV0VFS0RBWV9PRkZTRVQpLmpvaW4oJ3wnKSArICcpJ1xuKTtcblxudmFyIFBSRUZJWF9HUk9VUCA9IDE7XG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gWkhIYW50V2Vla2RheVBhcnNlcigpIHtcblxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQQVRURVJOO1xuICAgIH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIHRleHQgPSBtYXRjaFswXTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkYXlPZldlZWsgPSBtYXRjaFtXRUVLREFZX0dST1VQXTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbZGF5T2ZXZWVrXTtcbiAgICAgICAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBtb2RpZmllciA9IG51bGw7XG4gICAgICAgIHZhciBwcmVmaXggPSBtYXRjaFtQUkVGSVhfR1JPVVBdO1xuXG4gICAgICAgIGlmKHByZWZpeCA9PSAn5LiKJykge1xuICAgICAgICAgICAgbW9kaWZpZXIgPSAnbGFzdCc7XG4gICAgICAgIH0gZWxzZSBpZihwcmVmaXggPT0gJ+S4iycpIHtcbiAgICAgICAgICAgIG1vZGlmaWVyID0gJ25leHQnO1xuICAgICAgICB9IGVsc2UgaWYocHJlZml4ID09ICfku4onIHx8IHByZWZpeCA9PSAn6YCZJyB8fCBwcmVmaXggPT0gJ+WRoicpIHtcbiAgICAgICAgICAgIG1vZGlmaWVyID0gJ3RoaXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlUGFyc2VkQ29tcG9uZW50KHJlc3VsdCwgcmVmLCBvZmZzZXQsIG1vZGlmaWVyKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ1pISGFudFdlZWtkYXlQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCJcbmZ1bmN0aW9uIFBhcnNlcihzdHJpY3RNb2RlKSB7XG5cbiAgICB0aGlzLmlzU3RyaWN0TW9kZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHN0cmljdE1vZGUgPT0gdHJ1ZSkgfTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gLy4vaTsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXsgcmV0dXJuIG51bGw7IH1cblxuICAgIHRoaXMuZXhlY3V0ZSA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgb3B0KSB7XG5cbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgdmFyIHJlZ2V4ID0gdGhpcy5wYXR0ZXJuKCk7XG5cbiAgICAgICAgdmFyIHJlbWFpbmluZ1RleHQgPSB0ZXh0O1xuICAgICAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbmluZ1RleHQpO1xuXG4gICAgICAgIHdoaWxlIChtYXRjaCkge1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbWF0Y2ggaW5kZXggb24gdGhlIGZ1bGwgdGV4dDtcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IHRleHQubGVuZ3RoIC0gcmVtYWluaW5nVGV4dC5sZW5ndGg7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmV4dHJhY3QodGV4dCwgcmVmLCBtYXRjaCwgb3B0KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgIC8vIElmIHN1Y2Nlc3MsIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGV4dCA9IHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTdHJpY3RNb2RlKCkgfHwgcmVzdWx0Lmhhc1Bvc3NpYmxlRGF0ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgZmFpbCwgbW92ZSBvbiBieSAxXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGV4dCA9IHRleHQuc3Vic3RyaW5nKG1hdGNoLmluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hdGNoID0gcmVnZXguZXhlYyhyZW1haW5pbmdUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlZmluZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmluZXJzLmZvckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZWZpbmVyLnJlZmluZShyZXN1bHRzLCB0ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuXG5leHBvcnRzLlBhcnNlciA9IFBhcnNlcjtcblxuZXhwb3J0cy5FTklTT0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5JU09Gb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVORGVhZGxpbmVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VORGVhZGxpbmVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOTW9udGhOYW1lUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTk1vbnRoTmFtZVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOU2xhc2hEYXRlRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTlNsYXNoRGF0ZUZvcm1hdFN0YXJ0V2l0aFllYXJQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOVGltZUFnb0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5UaW1lQWdvRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTlRpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlRpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTldlZWtkYXlQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOV2Vla2RheVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5DYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTkNhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOQ2FzdWFsVGltZVBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5DYXN1YWxUaW1lUGFyc2VyJykuUGFyc2VyO1xuXG5leHBvcnRzLkpQU3RhbmRhcmRQYXJzZXIgPSByZXF1aXJlKCcuL0pQL0pQU3RhbmRhcmRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkpQQ2FzdWFsRGF0ZVBhcnNlciA9IHJlcXVpcmUoJy4vSlAvSlBDYXN1YWxEYXRlUGFyc2VyJykuUGFyc2VyO1xuXG5cbmV4cG9ydHMuRVNDYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU0Nhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVTRGVhZGxpbmVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTRGVhZGxpbmVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVTVGltZUFnb0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNUaW1lQWdvRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FU1RpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU1RpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FU1dlZWtkYXlQYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTV2Vla2RheVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRVNNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FU1NsYXNoRGF0ZUZvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNTbGFzaERhdGVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5cbmV4cG9ydHMuRlJDYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9GUi9GUkNhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkZSRGVhZGxpbmVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0ZSL0ZSRGVhZGxpbmVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkZSTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyID0gcmVxdWlyZSgnLi9GUi9GUk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRlJTbGFzaERhdGVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0ZSL0ZSU2xhc2hEYXRlRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5GUlRpbWVBZ29Gb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0ZSL0ZSVGltZUFnb0Zvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRlJUaW1lRXhwcmVzc2lvblBhcnNlciA9IHJlcXVpcmUoJy4vRlIvRlJUaW1lRXhwcmVzc2lvblBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRlJXZWVrZGF5UGFyc2VyID0gcmVxdWlyZSgnLi9GUi9GUldlZWtkYXlQYXJzZXInKS5QYXJzZXI7XG5cbmV4cG9ydHMuWkhIYW50RGF0ZVBhcnNlciA9IHJlcXVpcmUoJy4vWkgtSGFudC9aSEhhbnREYXRlUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5aSEhhbnRXZWVrZGF5UGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudFdlZWtkYXlQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLlpISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5aSEhhbnRDYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudENhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLlpISGFudERlYWRsaW5lRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudERlYWRsaW5lRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuXG4iLCIvKlxuICBcbiovXG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4uL3JlZmluZXInKS5SZWZpbmVyO1xuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBFTk1lcmdlRGF0ZVJhbmdlUmVmaW5lcigpIHtcbiAgICBSZWZpbmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiAvXlxccyoodG98XFwtKVxccyokL2kgfTtcblxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7XG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWVyZ2VkUmVzdWx0ID0gW107XG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaT0xOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdXJyUmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcHJldlJlc3VsdC5lbmQgJiYgIWN1cnJSZXN1bHQuZW5kIFxuICAgICAgICAgICAgICAgICYmIHRoaXMuaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gdGhpcy5tZXJnZVJlc3VsdCh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoY3VyclJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZXJnZWRSZXN1bHQucHVzaChjdXJyUmVzdWx0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG1lcmdlZFJlc3VsdDtcbiAgICB9O1xuXG4gICAgdGhpcy5pc0FibGVUb01lcmdlID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0MSwgcmVzdWx0Mikge1xuICAgICAgICB2YXIgYmVnaW4gPSByZXN1bHQxLmluZGV4ICsgcmVzdWx0MS50ZXh0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGVuZCAgID0gcmVzdWx0Mi5pbmRleDtcbiAgICAgICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcoYmVnaW4sZW5kKTtcblxuICAgICAgICByZXR1cm4gdGV4dEJldHdlZW4ubWF0Y2godGhpcy5wYXR0ZXJuKCkpO1xuICAgIH07XG5cbiAgICB0aGlzLmlzV2Vla2RheVJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3dlZWtkYXknKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignZGF5Jyk7XG4gICAgfTtcblxuICAgIHRoaXMubWVyZ2VSZXN1bHQgPSBmdW5jdGlvbih0ZXh0LCBmcm9tUmVzdWx0LCB0b1Jlc3VsdCkge1xuXG4gICAgICAgIGlmICghdGhpcy5pc1dlZWtkYXlSZXN1bHQoZnJvbVJlc3VsdCkgJiYgIXRoaXMuaXNXZWVrZGF5UmVzdWx0KHRvUmVzdWx0KSkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdG9SZXN1bHQuc3RhcnQua25vd25WYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZyb21SZXN1bHQuc3RhcnQuaXNDZXJ0YWluKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbVJlc3VsdC5zdGFydC5hc3NpZ24oa2V5LCB0b1Jlc3VsdC5zdGFydC5nZXQoa2V5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZnJvbVJlc3VsdC5zdGFydC5rbm93blZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICghdG9SZXN1bHQuc3RhcnQuaXNDZXJ0YWluKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9SZXN1bHQuc3RhcnQuYXNzaWduKGtleSwgZnJvbVJlc3VsdC5zdGFydC5nZXQoa2V5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21SZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSA+IHRvUmVzdWx0LnN0YXJ0LmRhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSB0b1Jlc3VsdDtcbiAgICAgICAgICAgIHRvUmVzdWx0ID0gZnJvbVJlc3VsdDtcbiAgICAgICAgICAgIGZyb21SZXN1bHQgPSB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZyb21SZXN1bHQuZW5kID0gdG9SZXN1bHQuc3RhcnQ7XG5cbiAgICAgICAgXG5cbiAgICAgICAgZm9yICh2YXIgdGFnIGluIHRvUmVzdWx0LnRhZ3MpIHtcbiAgICAgICAgICAgIGZyb21SZXN1bHQudGFnc1t0YWddID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihmcm9tUmVzdWx0LmluZGV4LCB0b1Jlc3VsdC5pbmRleCk7XG4gICAgICAgIHZhciBlbmRJbmRleCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgZnJvbVJlc3VsdC5pbmRleCArIGZyb21SZXN1bHQudGV4dC5sZW5ndGgsIFxuICAgICAgICAgICAgdG9SZXN1bHQuaW5kZXggKyB0b1Jlc3VsdC50ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgZnJvbVJlc3VsdC5pbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgICAgIGZyb21SZXN1bHQudGV4dCAgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgICAgIGZyb21SZXN1bHQudGFnc1t0aGlzLmNvbnN0cnVjdG9yLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZyb21SZXN1bHQ7XG4gICAgfVxufTtcblxuIiwiLypcbiAgICBcbiovXG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4uL3JlZmluZXInKS5SZWZpbmVyO1xuXG5cblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKihUfGF0fGFmdGVyfGJlZm9yZXxvbnxvZnwsfC0pP1xcXFxzKiRcIik7XG5cbmZ1bmN0aW9uIGlzRGF0ZU9ubHkocmVzdWx0KSB7XG4gICAgcmV0dXJuICFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdob3VyJyk7XG59XG4gICAgXG5mdW5jdGlvbiBpc1RpbWVPbmx5KHJlc3VsdCkge1xuICAgIHJldHVybiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbW9udGgnKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignd2Vla2RheScpO1xufVxuXG5cbmZ1bmN0aW9uIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyUmVzdWx0KSB7XG4gICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcocHJldlJlc3VsdC5pbmRleCArIHByZXZSZXN1bHQudGV4dC5sZW5ndGgsIGN1clJlc3VsdC5pbmRleCk7XG4gICAgcmV0dXJuIHRleHRCZXR3ZWVuLm1hdGNoKFBBVFRFUk4pO1xufVxuXG5mdW5jdGlvbiBtZXJnZVJlc3VsdCh0ZXh0LCBkYXRlUmVzdWx0LCB0aW1lUmVzdWx0KXtcblxuICAgIHZhciBiZWdpbkRhdGUgPSBkYXRlUmVzdWx0LnN0YXJ0O1xuICAgIHZhciBiZWdpblRpbWUgPSB0aW1lUmVzdWx0LnN0YXJ0O1xuICAgICAgICBcbiAgICB2YXIgYmVnaW5EYXRlVGltZSA9IGJlZ2luRGF0ZS5jbG9uZSgpO1xuICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdob3VyJywgYmVnaW5UaW1lLmdldCgnaG91cicpKTtcbiAgICBiZWdpbkRhdGVUaW1lLmFzc2lnbignbWludXRlJywgYmVnaW5UaW1lLmdldCgnbWludXRlJykpO1xuICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdzZWNvbmQnLCBiZWdpblRpbWUuZ2V0KCdzZWNvbmQnKSk7XG4gICAgICAgIFxuICAgIGlmIChiZWdpblRpbWUuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdtZXJpZGllbScsIGJlZ2luVGltZS5nZXQoJ21lcmlkaWVtJykpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJlZ2luVGltZS5nZXQoJ21lcmlkaWVtJykgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBiZWdpbkRhdGVUaW1lLmdldCgnbWVyaWRpZW0nKSA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuaW1wbHkoJ21lcmlkaWVtJywgYmVnaW5UaW1lLmdldCgnbWVyaWRpZW0nKSk7XG4gICAgfVxuXG4gICAgaWYgKGJlZ2luRGF0ZVRpbWUuZ2V0KCdtZXJpZGllbScpID09IDEgJiYgYmVnaW5EYXRlVGltZS5nZXQoJ2hvdXInKSA8IDEyKSB7XG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdob3VyJywgYmVnaW5EYXRlVGltZS5nZXQoJ2hvdXInKSArIDEyKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZVJlc3VsdC5lbmQgIT0gbnVsbCB8fCB0aW1lUmVzdWx0LmVuZCAhPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZW5kRGF0ZSAgID0gZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCA/IGRhdGVSZXN1bHQuc3RhcnQgOiBkYXRlUmVzdWx0LmVuZDsgICAgICAgICAgICBcbiAgICAgICAgdmFyIGVuZFRpbWUgICA9IHRpbWVSZXN1bHQuZW5kID09IG51bGwgPyB0aW1lUmVzdWx0LnN0YXJ0IDogdGltZVJlc3VsdC5lbmQ7XG5cbiAgICAgICAgdmFyIGVuZERhdGVUaW1lID0gZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICBlbmREYXRlVGltZS5hc3NpZ24oJ2hvdXInLCBlbmRUaW1lLmdldCgnaG91cicpKTtcbiAgICAgICAgZW5kRGF0ZVRpbWUuYXNzaWduKCdtaW51dGUnLCBlbmRUaW1lLmdldCgnbWludXRlJykpO1xuICAgICAgICBlbmREYXRlVGltZS5hc3NpZ24oJ3NlY29uZCcsIGVuZFRpbWUuZ2V0KCdzZWNvbmQnKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZW5kVGltZS5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignbWVyaWRpZW0nLCBlbmRUaW1lLmdldCgnbWVyaWRpZW0nKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYmVnaW5UaW1lLmdldCgnbWVyaWRpZW0nKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlbmREYXRlVGltZS5pbXBseSgnbWVyaWRpZW0nLCBlbmRUaW1lLmdldCgnbWVyaWRpZW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkYXRlUmVzdWx0LmVuZCA9PSBudWxsICYmIGVuZERhdGVUaW1lLmRhdGUoKS5nZXRUaW1lKCkgPCBiZWdpbkRhdGVUaW1lLmRhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIC8vIEV4LiA5cG0gLSAxYW1cbiAgICAgICAgICAgIGlmIChlbmREYXRlVGltZS5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZVRpbWUuYXNzaWduKCdkYXknLCBlbmREYXRlVGltZS5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuZERhdGVUaW1lLmltcGx5KCdkYXknLCBlbmREYXRlVGltZS5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlUmVzdWx0LmVuZCA9IGVuZERhdGVUaW1lO1xuICAgIH1cblxuICAgIGRhdGVSZXN1bHQuc3RhcnQgPSBiZWdpbkRhdGVUaW1lOyAgICBcblxuICAgIHZhciBzdGFydEluZGV4ID0gTWF0aC5taW4oZGF0ZVJlc3VsdC5pbmRleCwgdGltZVJlc3VsdC5pbmRleCk7XG4gICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBkYXRlUmVzdWx0LmluZGV4ICsgZGF0ZVJlc3VsdC50ZXh0Lmxlbmd0aCwgXG4gICAgICAgICAgICB0aW1lUmVzdWx0LmluZGV4ICsgdGltZVJlc3VsdC50ZXh0Lmxlbmd0aCk7XG4gICAgXG4gICAgZGF0ZVJlc3VsdC5pbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgZGF0ZVJlc3VsdC50ZXh0ICA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcblxuICAgIGZvciAodmFyIHRhZyBpbiB0aW1lUmVzdWx0LnRhZ3MpIHtcbiAgICAgICAgZGF0ZVJlc3VsdC50YWdzW3RhZ10gPSB0cnVlO1xuICAgIH1cbiAgICBkYXRlUmVzdWx0LnRhZ3NbJ0VOTWVyZ2VEYXRlQW5kVGltZVJlZmluZXInXSA9IHRydWU7XG4gICAgcmV0dXJuIGRhdGVSZXN1bHQ7XG59XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEVOTWVyZ2VEYXRlVGltZVJlZmluZXIoKSB7XG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xuXG5cbiAgICB0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkgeyBcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB2YXIgbWVyZ2VkUmVzdWx0ID0gW107XG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjdXJyUmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc0RhdGVPbmx5KHByZXZSZXN1bHQpICYmIGlzVGltZU9ubHkoY3VyclJlc3VsdCkgXG4gICAgICAgICAgICAgICAgICAgICYmIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gbWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY3VyclJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGVPbmx5KGN1cnJSZXN1bHQpICYmIGlzVGltZU9ubHkocHJldlJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSBtZXJnZVJlc3VsdCh0ZXh0LCBjdXJyUmVzdWx0LCBwcmV2UmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH1cbn0iLCIvKlxuXG4qL1xudmFyIFBhcnNlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuLi9yZWZpbmVyJykuUmVmaW5lcjtcblxuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqKGF0fGFmdGVyfGJlZm9yZXxvbnwsfC18XFxcXCh8XFxcXCkpP1xcXFxzKiRcIik7XG5cbmZ1bmN0aW9uIGlzTW9yZVNwZWNpZmljKHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpIHtcbiAgICB2YXIgbW9yZVNwZWNpZmljID0gZmFsc2U7XG5cbiAgICBpZiAocHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3llYXInKSkge1xuICAgICAgICBpZiAoIWN1cnJSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd5ZWFyJykpIHtcbiAgICAgICAgICAgIG1vcmVTcGVjaWZpYyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vcmVTcGVjaWZpYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKSAmJiAhY3VyclJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JlU3BlY2lmaWMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcmVTcGVjaWZpYztcbn1cblxuXG5mdW5jdGlvbiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpIHtcbiAgICB2YXIgdGV4dEJldHdlZW4gPSB0ZXh0LnN1YnN0cmluZyhwcmV2UmVzdWx0LmluZGV4ICsgcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCwgY3VyclJlc3VsdC5pbmRleCk7XG5cbiAgICAvLyBPbmx5IGFjY2VwdHMgbWVyZ2UgaWYgb25lIG9mIHRoZW0gY29tZXMgZnJvbSBjYXN1YWwgcmVsYXRpdmUgZGF0ZVxuICAgIHZhciBpbmNsdWRlc1JlbGF0aXZlUmVzdWx0ID0gKHByZXZSZXN1bHQudGFnc1snRU5SZWxhdGl2ZURhdGVGb3JtYXRQYXJzZXInXSB8fCBjdXJyUmVzdWx0LnRhZ3NbJ0VOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyJ10pO1xuXG4gICAgLy8gV2UgYXNzdW1lIHRoZXkgcmVmZXIgdG8gdGhlIHNhbWUgZGF0ZSBpZiBhbGwgZGF0ZSBmaWVsZHMgYXJlIGltcGxpZWRcbiAgICB2YXIgcmVmZXJUb1NhbWVEYXRlID0gIXByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKSAmJiAhcHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykgJiYgIXByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd5ZWFyJyk7XG5cbiAgICAvLyBJZiBib3RoIHllYXJzIGFyZSBjZXJ0YWluLCB0aGF0IGRldGVybWluZXMgaWYgdGhleSByZWZlciB0byB0aGUgc2FtZSBkYXRlXG4gICAgLy8gYnV0IHdpdGggb25lIG1vcmUgc3BlY2lmaWMgdGhhbiB0aGUgb3RoZXJcbiAgICBpZiAocHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3llYXInKSAmJiBjdXJyUmVzdWx0LnN0YXJ0LmlzQ2VydGFpbigneWVhcicpKVxuICAgICAgICByZWZlclRvU2FtZURhdGUgPSAocHJldlJlc3VsdC5zdGFydC5nZXQoJ3llYXInKSA9PT0gY3VyclJlc3VsdC5zdGFydC5nZXQoJ3llYXInKSk7XG5cbiAgICAvLyBXZSBub3cgdGVzdCB3aXRoIHRoZSBuZXh0IGxldmVsIChtb250aCkgaWYgdGhleSByZWZlciB0byB0aGUgc2FtZSBkYXRlXG4gICAgaWYgKHByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpICYmIGN1cnJSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpKVxuICAgICAgICByZWZlclRvU2FtZURhdGUgPSAocHJldlJlc3VsdC5zdGFydC5nZXQoJ21vbnRoJykgPT09IGN1cnJSZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSAmJiByZWZlclRvU2FtZURhdGU7XG5cbiAgICByZXR1cm4gaW5jbHVkZXNSZWxhdGl2ZVJlc3VsdCAmJiB0ZXh0QmV0d2Vlbi5tYXRjaChQQVRURVJOKSAmJiByZWZlclRvU2FtZURhdGU7XG59XG5cbmZ1bmN0aW9uIG1lcmdlUmVzdWx0KHRleHQsIHNwZWNpZmljUmVzdWx0LCBub25TcGVjaWZpY1Jlc3VsdCl7XG5cbiAgICB2YXIgc3BlY2lmaWNEYXRlID0gc3BlY2lmaWNSZXN1bHQuc3RhcnQ7XG4gICAgdmFyIG5vblNwZWNpZmljRGF0ZSA9IG5vblNwZWNpZmljUmVzdWx0LnN0YXJ0O1xuXG4gICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihzcGVjaWZpY1Jlc3VsdC5pbmRleCwgbm9uU3BlY2lmaWNSZXN1bHQuaW5kZXgpO1xuICAgIHZhciBlbmRJbmRleCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgc3BlY2lmaWNSZXN1bHQuaW5kZXggKyBzcGVjaWZpY1Jlc3VsdC50ZXh0Lmxlbmd0aCxcbiAgICAgICAgICAgIG5vblNwZWNpZmljUmVzdWx0LmluZGV4ICsgbm9uU3BlY2lmaWNSZXN1bHQudGV4dC5sZW5ndGgpO1xuXG4gICAgc3BlY2lmaWNSZXN1bHQuaW5kZXggPSBzdGFydEluZGV4O1xuICAgIHNwZWNpZmljUmVzdWx0LnRleHQgID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuXG4gICAgZm9yICh2YXIgdGFnIGluIG5vblNwZWNpZmljUmVzdWx0LnRhZ3MpIHtcbiAgICAgICAgc3BlY2lmaWNSZXN1bHQudGFnc1t0YWddID0gdHJ1ZTtcbiAgICB9XG4gICAgc3BlY2lmaWNSZXN1bHQudGFnc1snRU5Qcmlvcml0aXplU3BlY2lmaWNEYXRlUmVmaW5lciddID0gdHJ1ZTtcbiAgICByZXR1cm4gc3BlY2lmaWNSZXN1bHQ7XG59XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEVOUHJpb3JpdGl6ZVNwZWNpZmljRGF0ZVJlZmluZXIoKSB7XG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB2YXIgbWVyZ2VkUmVzdWx0ID0gW107XG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjdXJyUmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XG5cbiAgICAgICAgICAgIGlmIChpc01vcmVTcGVjaWZpYyhwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gbWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY3VyclJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTW9yZVNwZWNpZmljKGN1cnJSZXN1bHQsIHByZXZSZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICYmIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCkpIHtcblxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSBtZXJnZVJlc3VsdCh0ZXh0LCBjdXJyUmVzdWx0LCBwcmV2UmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cbiovXG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLlJlZmluZXI7XG5cbi8vIE1hcCBBQkJSIC0+IE9mZnNldCBpbiBtaW51dGVcbnZhciBUSU1FWk9ORV9BQkJSX01BUCA9IHt9O1xudmFyIFRJTUVaT05FX05BTUVfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXFxcXCg/KFtBLVpdezIsNH0pXFxcXCk/KD89XFxcXFd8JClcIiwgJ2knKTtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXIoKSB7XG5cdFJlZmluZXIuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkge1xuXG5cdFx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC50YWdzWydFTlRpbWVFeHByZXNzaW9uUGFyc2VyJ10gJiYgIXJlc3VsdC50YWdzWydaSFRpbWVFeHByZXNzaW9uUGFyc2VyJ10gJiYgIXJlc3VsdC50YWdzWydGUlRpbWVFeHByZXNzaW9uUGFyc2VyJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXRjaCA9IFRJTUVaT05FX05BTUVfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWV6b25lQWJiciA9IG1hdGNoWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKFRJTUVaT05FX0FCQlJfTUFQW3RpbWV6b25lQWJicl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gVElNRVpPTkVfQUJCUl9NQVBbdGltZXpvbmVBYmJyXTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3RpbWV6b25lT2Zmc2V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lbmQgIT0gbnVsbCAmJiAhcmVzdWx0LmVuZC5pc0NlcnRhaW4oJ3RpbWV6b25lT2Zmc2V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgdGltZXpvbmVPZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50YWdzWydFeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblx0XHR9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcblx0fVxufVxuXG4vLyBUT0RPOiBNb3ZlIHRoaXMgdG8gc29tZSBjb25maWd1cmF0aW9uXG5USU1FWk9ORV9BQkJSX01BUCA9IHtcIkFDRFRcIjo2MzAsXCJBQ1NUXCI6NTcwLFwiQURUXCI6LTE4MCxcIkFFRFRcIjo2NjAsXCJBRVNUXCI6NjAwLFwiQUZUXCI6MjcwLFwiQUtEVFwiOi00ODAsXCJBS1NUXCI6LTU0MCxcIkFMTVRcIjozNjAsXCJBTVNUXCI6LTE4MCxcIkFNVFwiOi0yNDAsXCJBTkFTVFwiOjcyMCxcIkFOQVRcIjo3MjAsXCJBUVRUXCI6MzAwLFwiQVJUXCI6LTE4MCxcIkFTVFwiOi0yNDAsXCJBV0RUXCI6NTQwLFwiQVdTVFwiOjQ4MCxcIkFaT1NUXCI6MCxcIkFaT1RcIjotNjAsXCJBWlNUXCI6MzAwLFwiQVpUXCI6MjQwLFwiQk5UXCI6NDgwLFwiQk9UXCI6LTI0MCxcIkJSU1RcIjotMTIwLFwiQlJUXCI6LTE4MCxcIkJTVFwiOjYwLFwiQlRUXCI6MzYwLFwiQ0FTVFwiOjQ4MCxcIkNBVFwiOjEyMCxcIkNDVFwiOjM5MCxcIkNEVFwiOi0zMDAsXCJDRVNUXCI6MTIwLFwiQ0VUXCI6NjAsXCJDSEFEVFwiOjgyNSxcIkNIQVNUXCI6NzY1LFwiQ0tUXCI6LTYwMCxcIkNMU1RcIjotMTgwLFwiQ0xUXCI6LTI0MCxcIkNPVFwiOi0zMDAsXCJDU1RcIjotMzYwLFwiQ1ZUXCI6LTYwLFwiQ1hUXCI6NDIwLFwiQ2hTVFwiOjYwMCxcIkRBVlRcIjo0MjAsXCJFQVNTVFwiOi0zMDAsXCJFQVNUXCI6LTM2MCxcIkVBVFwiOjE4MCxcIkVDVFwiOi0zMDAsXCJFRFRcIjotMjQwLFwiRUVTVFwiOjE4MCxcIkVFVFwiOjEyMCxcIkVHU1RcIjowLFwiRUdUXCI6LTYwLFwiRVNUXCI6LTMwMCxcIkVUXCI6LTMwMCxcIkZKU1RcIjo3ODAsXCJGSlRcIjo3MjAsXCJGS1NUXCI6LTE4MCxcIkZLVFwiOi0yNDAsXCJGTlRcIjotMTIwLFwiR0FMVFwiOi0zNjAsXCJHQU1UXCI6LTU0MCxcIkdFVFwiOjI0MCxcIkdGVFwiOi0xODAsXCJHSUxUXCI6NzIwLFwiR01UXCI6MCxcIkdTVFwiOjI0MCxcIkdZVFwiOi0yNDAsXCJIQUFcIjotMTgwLFwiSEFDXCI6LTMwMCxcIkhBRFRcIjotNTQwLFwiSEFFXCI6LTI0MCxcIkhBUFwiOi00MjAsXCJIQVJcIjotMzYwLFwiSEFTVFwiOi02MDAsXCJIQVRcIjotOTAsXCJIQVlcIjotNDgwLFwiSEtUXCI6NDgwLFwiSExWXCI6LTIxMCxcIkhOQVwiOi0yNDAsXCJITkNcIjotMzYwLFwiSE5FXCI6LTMwMCxcIkhOUFwiOi00ODAsXCJITlJcIjotNDIwLFwiSE5UXCI6LTE1MCxcIkhOWVwiOi01NDAsXCJIT1ZUXCI6NDIwLFwiSUNUXCI6NDIwLFwiSURUXCI6MTgwLFwiSU9UXCI6MzYwLFwiSVJEVFwiOjI3MCxcIklSS1NUXCI6NTQwLFwiSVJLVFwiOjU0MCxcIklSU1RcIjoyMTAsXCJJU1RcIjo2MCxcIkpTVFwiOjU0MCxcIktHVFwiOjM2MCxcIktSQVNUXCI6NDgwLFwiS1JBVFwiOjQ4MCxcIktTVFwiOjU0MCxcIktVWVRcIjoyNDAsXCJMSERUXCI6NjYwLFwiTEhTVFwiOjYzMCxcIkxJTlRcIjo4NDAsXCJNQUdTVFwiOjcyMCxcIk1BR1RcIjo3MjAsXCJNQVJUXCI6LTUxMCxcIk1BV1RcIjozMDAsXCJNRFRcIjotMzYwLFwiTUVTWlwiOjEyMCxcIk1FWlwiOjYwLFwiTUhUXCI6NzIwLFwiTU1UXCI6MzkwLFwiTVNEXCI6MjQwLFwiTVNLXCI6MjQwLFwiTVNUXCI6LTQyMCxcIk1VVFwiOjI0MCxcIk1WVFwiOjMwMCxcIk1ZVFwiOjQ4MCxcIk5DVFwiOjY2MCxcIk5EVFwiOi05MCxcIk5GVFwiOjY5MCxcIk5PVlNUXCI6NDIwLFwiTk9WVFwiOjM2MCxcIk5QVFwiOjM0NSxcIk5TVFwiOi0xNTAsXCJOVVRcIjotNjYwLFwiTlpEVFwiOjc4MCxcIk5aU1RcIjo3MjAsXCJPTVNTVFwiOjQyMCxcIk9NU1RcIjo0MjAsXCJQRFRcIjotNDIwLFwiUEVUXCI6LTMwMCxcIlBFVFNUXCI6NzIwLFwiUEVUVFwiOjcyMCxcIlBHVFwiOjYwMCxcIlBIT1RcIjo3ODAsXCJQSFRcIjo0ODAsXCJQS1RcIjozMDAsXCJQTURUXCI6LTEyMCxcIlBNU1RcIjotMTgwLFwiUE9OVFwiOjY2MCxcIlBTVFwiOi00ODAsXCJQVFwiOi00ODAsXCJQV1RcIjo1NDAsXCJQWVNUXCI6LTE4MCxcIlBZVFwiOi0yNDAsXCJSRVRcIjoyNDAsXCJTQU1UXCI6MjQwLFwiU0FTVFwiOjEyMCxcIlNCVFwiOjY2MCxcIlNDVFwiOjI0MCxcIlNHVFwiOjQ4MCxcIlNSVFwiOi0xODAsXCJTU1RcIjotNjYwLFwiVEFIVFwiOi02MDAsXCJURlRcIjozMDAsXCJUSlRcIjozMDAsXCJUS1RcIjo3ODAsXCJUTFRcIjo1NDAsXCJUTVRcIjozMDAsXCJUVlRcIjo3MjAsXCJVTEFUXCI6NDgwLFwiVVRDXCI6MCxcIlVZU1RcIjotMTIwLFwiVVlUXCI6LTE4MCxcIlVaVFwiOjMwMCxcIlZFVFwiOi0yMTAsXCJWTEFTVFwiOjY2MCxcIlZMQVRcIjo2NjAsXCJWVVRcIjo2NjAsXCJXQVNUXCI6MTIwLFwiV0FUXCI6NjAsXCJXRVNUXCI6NjAsXCJXRVNaXCI6NjAsXCJXRVRcIjowLFwiV0VaXCI6MCxcIldGVFwiOjcyMCxcIldHU1RcIjotMTIwLFwiV0dUXCI6LTE4MCxcIldJQlwiOjQyMCxcIldJVFwiOjU0MCxcIldJVEFcIjo0ODAsXCJXU1RcIjo3ODAsXCJXVFwiOjAsXCJZQUtTVFwiOjYwMCxcIllBS1RcIjo2MDAsXCJZQVBUXCI6NjAwLFwiWUVLU1RcIjozNjAsXCJZRUtUXCI6MzYwfVxuIiwiLypcbiAgXG4qL1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuL3JlZmluZXInKS5SZWZpbmVyO1xuXG5cbnZhciBUSU1FWk9ORV9PRkZTRVRfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqKEdNVHxVVEMpPyhcXFxcK3xcXFxcLSkoXFxcXGR7MSwyfSk6PyhcXFxcZHsyfSlcIiwgJ2knKTtcbnZhciBUSU1FWk9ORV9PRkZTRVRfU0lHTl9HUk9VUCA9IDI7XG52YXIgVElNRVpPTkVfT0ZGU0VUX0hPVVJfT0ZGU0VUX0dST1VQID0gMztcbnZhciBUSU1FWk9ORV9PRkZTRVRfTUlOVVRFX09GRlNFVF9HUk9VUCA9IDQ7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEV4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIoKSB7XG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcblxuICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd0aW1lem9uZU9mZnNldCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBUSU1FWk9ORV9PRkZTRVRfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUSU1FWk9ORV9PRkZTRVRfSE9VUl9PRkZTRVRfR1JPVVBdKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUSU1FWk9ORV9PRkZTRVRfTUlOVVRFX09GRlNFVF9HUk9VUF0pO1xuICAgICAgICAgICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gaG91ck9mZnNldCAqIDYwICsgbWludXRlT2Zmc2V0O1xuICAgICAgICAgICAgaWYgKG1hdGNoW1RJTUVaT05FX09GRlNFVF9TSUdOX0dST1VQXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgPSAtdGltZXpvbmVPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgdGltZXpvbmVPZmZzZXQpO1xuICAgICAgICAgICAgcmVzdWx0LnRleHQgKz0gbWF0Y2hbMF07XG4gICAgICAgICAgICByZXN1bHQudGFnc1snRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwiLypcclxuICBcclxuKi9cclxudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuLi9yZWZpbmVyJykuUmVmaW5lcjtcclxuXHJcbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEZSTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCkge1xyXG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIC9eXFxzKijDoHxhfFxcLSlcXHMqJC9pIH07XHJcblxyXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1lcmdlZFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcclxuICAgICAgICB2YXIgcHJldlJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgaT0xOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY3VyclJlc3VsdCA9IHJlc3VsdHNbaV07XHJcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXByZXZSZXN1bHQuZW5kICYmICFjdXJyUmVzdWx0LmVuZCBcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IHRoaXMubWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2gocHJldlJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjdXJyUmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZFJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pc0FibGVUb01lcmdlID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0MSwgcmVzdWx0Mikge1xyXG4gICAgICAgIHZhciBiZWdpbiA9IHJlc3VsdDEuaW5kZXggKyByZXN1bHQxLnRleHQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBlbmQgICA9IHJlc3VsdDIuaW5kZXg7XHJcbiAgICAgICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcoYmVnaW4sZW5kKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHRCZXR3ZWVuLm1hdGNoKHRoaXMucGF0dGVybigpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pc1dlZWtkYXlSZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3dlZWtkYXknKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignZGF5Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubWVyZ2VSZXN1bHQgPSBmdW5jdGlvbih0ZXh0LCBmcm9tUmVzdWx0LCB0b1Jlc3VsdCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNXZWVrZGF5UmVzdWx0KGZyb21SZXN1bHQpICYmICF0aGlzLmlzV2Vla2RheVJlc3VsdCh0b1Jlc3VsdCkpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0b1Jlc3VsdC5zdGFydC5rbm93blZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmcm9tUmVzdWx0LnN0YXJ0LmlzQ2VydGFpbihrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbVJlc3VsdC5zdGFydC5hc3NpZ24oa2V5LCB0b1Jlc3VsdC5zdGFydC5nZXQoa2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tUmVzdWx0LnN0YXJ0Lmtub3duVmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvUmVzdWx0LnN0YXJ0LmlzQ2VydGFpbihrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9SZXN1bHQuc3RhcnQuYXNzaWduKGtleSwgZnJvbVJlc3VsdC5zdGFydC5nZXQoa2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmcm9tUmVzdWx0LnN0YXJ0LmRhdGUoKS5nZXRUaW1lKCkgPiB0b1Jlc3VsdC5zdGFydC5kYXRlKCkpIHtcclxuICAgICAgICAgICAgdmFyIHRtcCA9IHRvUmVzdWx0O1xyXG4gICAgICAgICAgICB0b1Jlc3VsdCA9IGZyb21SZXN1bHQ7XHJcbiAgICAgICAgICAgIGZyb21SZXN1bHQgPSB0bXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZyb21SZXN1bHQuZW5kID0gdG9SZXN1bHQuc3RhcnQ7XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBmb3IgKHZhciB0YWcgaW4gdG9SZXN1bHQudGFncykge1xyXG4gICAgICAgICAgICBmcm9tUmVzdWx0LnRhZ3NbdGFnXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihmcm9tUmVzdWx0LmluZGV4LCB0b1Jlc3VsdC5pbmRleCk7XHJcbiAgICAgICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgIGZyb21SZXN1bHQuaW5kZXggKyBmcm9tUmVzdWx0LnRleHQubGVuZ3RoLCBcclxuICAgICAgICAgICAgdG9SZXN1bHQuaW5kZXggKyB0b1Jlc3VsdC50ZXh0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGZyb21SZXN1bHQuaW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgIGZyb21SZXN1bHQudGV4dCAgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEluZGV4LCBlbmRJbmRleCk7XHJcbiAgICAgICAgZnJvbVJlc3VsdC50YWdzW3RoaXMuY29uc3RydWN0b3IubmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmcm9tUmVzdWx0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuIiwiLypcclxuICAgIFxyXG4qL1xyXG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XHJcbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi4vcmVmaW5lcicpLlJlZmluZXI7XHJcblxyXG5cclxuXHJcbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccyooVHzDoHxhfHZlcnN8ZGV8LHwtKT9cXFxccyokXCIpO1xyXG5cclxuZnVuY3Rpb24gaXNEYXRlT25seShyZXN1bHQpIHtcclxuICAgIHJldHVybiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignaG91cicpIHx8IHJlc3VsdC50YWdzWydGUkNhc3VhbERhdGVQYXJzZXInXTtcclxufVxyXG4gICAgXHJcbmZ1bmN0aW9uIGlzVGltZU9ubHkocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykgJiYgIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3dlZWtkYXknKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyUmVzdWx0KSB7XHJcbiAgICB2YXIgdGV4dEJldHdlZW4gPSB0ZXh0LnN1YnN0cmluZyhwcmV2UmVzdWx0LmluZGV4ICsgcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCwgY3VyUmVzdWx0LmluZGV4KTtcclxuICAgIHJldHVybiB0ZXh0QmV0d2Vlbi5tYXRjaChQQVRURVJOKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWVyZ2VSZXN1bHQodGV4dCwgZGF0ZVJlc3VsdCwgdGltZVJlc3VsdCl7XHJcblxyXG4gICAgdmFyIGJlZ2luRGF0ZSA9IGRhdGVSZXN1bHQuc3RhcnQ7XHJcbiAgICB2YXIgYmVnaW5UaW1lID0gdGltZVJlc3VsdC5zdGFydDtcclxuICAgICAgICBcclxuICAgIHZhciBiZWdpbkRhdGVUaW1lID0gYmVnaW5EYXRlLmNsb25lKCk7XHJcbiAgICBiZWdpbkRhdGVUaW1lLmFzc2lnbignaG91cicsIGJlZ2luVGltZS5nZXQoJ2hvdXInKSk7XHJcbiAgICBiZWdpbkRhdGVUaW1lLmFzc2lnbignbWludXRlJywgYmVnaW5UaW1lLmdldCgnbWludXRlJykpO1xyXG4gICAgYmVnaW5EYXRlVGltZS5hc3NpZ24oJ3NlY29uZCcsIGJlZ2luVGltZS5nZXQoJ3NlY29uZCcpKTtcclxuICAgICAgICBcclxuICAgIGlmIChiZWdpblRpbWUuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XHJcbiAgICAgICAgYmVnaW5EYXRlVGltZS5hc3NpZ24oJ21lcmlkaWVtJywgYmVnaW5UaW1lLmdldCgnbWVyaWRpZW0nKSk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGJlZ2luVGltZS5nZXQoJ21lcmlkaWVtJykgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuZ2V0KCdtZXJpZGllbScpID09PSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuaW1wbHkoJ21lcmlkaWVtJywgYmVnaW5UaW1lLmdldCgnbWVyaWRpZW0nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJlZ2luRGF0ZVRpbWUuZ2V0KCdtZXJpZGllbScpID09IDEgJiYgYmVnaW5EYXRlVGltZS5nZXQoJ2hvdXInKSA8IDEyKSB7XHJcbiAgICAgICAgYmVnaW5EYXRlVGltZS5hc3NpZ24oJ2hvdXInLCBiZWdpbkRhdGVUaW1lLmdldCgnaG91cicpICsgMTIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRlUmVzdWx0LmVuZCAhPSBudWxsIHx8IHRpbWVSZXN1bHQuZW5kICE9IG51bGwpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZW5kRGF0ZSAgID0gZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCA/IGRhdGVSZXN1bHQuc3RhcnQgOiBkYXRlUmVzdWx0LmVuZDsgICAgICAgICAgICBcclxuICAgICAgICB2YXIgZW5kVGltZSAgID0gdGltZVJlc3VsdC5lbmQgPT0gbnVsbCA/IHRpbWVSZXN1bHQuc3RhcnQgOiB0aW1lUmVzdWx0LmVuZDtcclxuXHJcbiAgICAgICAgdmFyIGVuZERhdGVUaW1lID0gZW5kRGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignaG91cicsIGVuZFRpbWUuZ2V0KCdob3VyJykpO1xyXG4gICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignbWludXRlJywgZW5kVGltZS5nZXQoJ21pbnV0ZScpKTtcclxuICAgICAgICBlbmREYXRlVGltZS5hc3NpZ24oJ3NlY29uZCcsIGVuZFRpbWUuZ2V0KCdzZWNvbmQnKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGVuZFRpbWUuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XHJcbiAgICAgICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignbWVyaWRpZW0nLCBlbmRUaW1lLmdldCgnbWVyaWRpZW0nKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChiZWdpblRpbWUuZ2V0KCdtZXJpZGllbScpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZW5kRGF0ZVRpbWUuaW1wbHkoJ21lcmlkaWVtJywgZW5kVGltZS5nZXQoJ21lcmlkaWVtJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCAmJiBlbmREYXRlVGltZS5kYXRlKCkuZ2V0VGltZSgpIDwgYmVnaW5EYXRlVGltZS5kYXRlKCkuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIC8vIEV4LiA5cG0gLSAxYW1cclxuICAgICAgICAgICAgaWYgKGVuZERhdGVUaW1lLmlzQ2VydGFpbignZGF5JykpIHtcclxuICAgICAgICAgICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignZGF5JywgZW5kRGF0ZVRpbWUuZ2V0KCdkYXknKSArIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZVRpbWUuaW1wbHkoJ2RheScsIGVuZERhdGVUaW1lLmdldCgnZGF5JykgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0ZVJlc3VsdC5lbmQgPSBlbmREYXRlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRlUmVzdWx0LnN0YXJ0ID0gYmVnaW5EYXRlVGltZTsgICAgXHJcblxyXG4gICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihkYXRlUmVzdWx0LmluZGV4LCB0aW1lUmVzdWx0LmluZGV4KTtcclxuICAgIHZhciBlbmRJbmRleCA9IE1hdGgubWF4KFxyXG4gICAgICAgICAgICBkYXRlUmVzdWx0LmluZGV4ICsgZGF0ZVJlc3VsdC50ZXh0Lmxlbmd0aCwgXHJcbiAgICAgICAgICAgIHRpbWVSZXN1bHQuaW5kZXggKyB0aW1lUmVzdWx0LnRleHQubGVuZ3RoKTtcclxuICAgIFxyXG4gICAgZGF0ZVJlc3VsdC5pbmRleCA9IHN0YXJ0SW5kZXg7XHJcbiAgICBkYXRlUmVzdWx0LnRleHQgID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xyXG5cclxuICAgIGZvciAodmFyIHRhZyBpbiB0aW1lUmVzdWx0LnRhZ3MpIHtcclxuICAgICAgICBkYXRlUmVzdWx0LnRhZ3NbdGFnXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBkYXRlUmVzdWx0LnRhZ3NbJ0ZSTWVyZ2VEYXRlQW5kVGltZVJlZmluZXInXSA9IHRydWU7XHJcbiAgICByZXR1cm4gZGF0ZVJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gRlJNZXJnZURhdGVUaW1lUmVmaW5lcigpIHtcclxuICAgIFJlZmluZXIuY2FsbCh0aGlzKTtcclxuXHJcblxyXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHsgXHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA8IDIpIHJldHVybiByZXN1bHRzO1xyXG5cclxuICAgICAgICB2YXIgbWVyZ2VkUmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIHZhciBwcmV2UmVzdWx0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjdXJyUmVzdWx0ID0gcmVzdWx0c1tpXTtcclxuICAgICAgICAgICAgcHJldlJlc3VsdCA9IHJlc3VsdHNbaS0xXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChpc0RhdGVPbmx5KHByZXZSZXN1bHQpICYmIGlzVGltZU9ubHkoY3VyclJlc3VsdCkgXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gbWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGkgKz0gMTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZU9ubHkoY3VyclJlc3VsdCkgJiYgaXNUaW1lT25seShwcmV2UmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICYmIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IG1lcmdlUmVzdWx0KHRleHQsIGN1cnJSZXN1bHQsIHByZXZSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgY3VyclJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJSZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtZXJnZWRSZXN1bHQucHVzaChjdXJyUmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXJnZWRSZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCIvKlxuICAgIEVuZm9yY2UgJ2ZvcndhcmREYXRlJyBvcHRpb24gdG8gb24gdGhlIHJlc3VsdHMuIFdoZW4gdGhlcmUgYXJlIG1pc3NpbmcgY29tcG9uZW50LFxuICAgIGUuZy4gXCJNYXJjaCAxMi0xMyAod2l0aG91dCB5ZWFyKVwiIG9yIFwiVGh1cnNkYXlcIiwgdGhlIHJlZmluZXIgd2lsbCB0cnkgdG8gYWRqdXN0IHRoZSByZXN1bHRcbiAgICBpbnRvIHRoZSBmdXR1cmUgaW5zdGVhZCBvZiB0aGUgcGFzdC5cbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLlJlZmluZXI7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEZvcndhcmREYXRlUmVmaW5lcigpIHtcbiAgICBSZWZpbmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkge1xuXG4gICAgICAgIGlmICghb3B0Wydmb3J3YXJkRGF0ZSddICYmICFvcHRbJ2ZvcndhcmREYXRlc09ubHknXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVzdWx0LnJlZik7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKSAmJiByZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpICYmXG4gICAgICAgICAgICAgICAgIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3llYXInKSAmJlxuICAgICAgICAgICAgICAgIHJlZk1vbWVudC5pc0FmdGVyKHJlc3VsdC5zdGFydC5tb21lbnQoKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIEFkanVzdCB5ZWFyIGludG8gdGhlIGZ1dHVyZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IDMgJiYgcmVmTW9tZW50LmlzQWZ0ZXIocmVzdWx0LnN0YXJ0Lm1vbWVudCgpKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlc3VsdC5zdGFydC5nZXQoJ3llYXInKSArIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZW5kICYmICFyZXN1bHQuZW5kLmlzQ2VydGFpbigneWVhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCd5ZWFyJywgcmVzdWx0LmVuZC5nZXQoJ3llYXInKSArIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnRhZ3NbJ0V4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXInXSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignZGF5JykgJiYgIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykgJiYgIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3llYXInKSAmJlxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3dlZWtkYXknKSAmJlxuICAgICAgICAgICAgICAgIHJlZk1vbWVudC5pc0FmdGVyKHJlc3VsdC5zdGFydC5tb21lbnQoKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIEFkanVzdCBkYXRlIHRvIHRoZSBjb21pbmcgd2Vla1xuICAgICAgICAgICAgICAgIGlmIChyZWZNb21lbnQuZGF5KCkgPiByZXN1bHQuc3RhcnQuZ2V0KCd3ZWVrZGF5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmTW9tZW50LmRheShyZXN1bHQuc3RhcnQuZ2V0KCd3ZWVrZGF5JykgKyA3KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWZNb21lbnQuZGF5KHJlc3VsdC5zdGFydC5nZXQoJ3dlZWtkYXknKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCByZWZNb21lbnQuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGFnc1snRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufTtcbiIsIi8qXG4gIFxuKi9cbnZhciBFTk1lcmdlRGF0ZVJhbmdlUmVmaW5lciA9IHJlcXVpcmUoJy4uL0VOL0VOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gSlBNZXJnZURhdGVSYW5nZVJlZmluZXIoKSB7XG4gICAgRU5NZXJnZURhdGVSYW5nZVJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIC9eXFxzKijjgYvjgol844O8KVxccyokL2kgfTtcbn1cblxuIiwiLypcbiAgXG4qL1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuL3JlZmluZXInKS5SZWZpbmVyO1xuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBPdmVybGFwUmVtb3ZhbFJlZmluZXIoKSB7XG5cdFJlZmluZXIuY2FsbCh0aGlzKTtcblx0XG5cblx0dGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHsgXG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIFxuICAgICAgICB2YXIgZmlsdGVyZWRSZXN1bHRzID0gW107XG4gICAgICAgIHZhciBwcmV2UmVzdWx0ID0gcmVzdWx0c1swXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGk9MTsgaTxyZXN1bHRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIG92ZXJsYXAsIGNvbXBhcmUgdGhlIGxlbmd0aCBhbmQgZGlzY2FyZCB0aGUgc2hvcnRlciBvbmVcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5kZXggPCBwcmV2UmVzdWx0LmluZGV4ICsgcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lmxlbmd0aCA+IHByZXZSZXN1bHQudGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRSZXN1bHRzLnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gVGhlIGxhc3Qgb25lXG4gICAgICAgIGlmIChwcmV2UmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkUmVzdWx0cy5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkUmVzdWx0cztcbiAgICB9XG59IiwiLypcbiAgXG4qL1xudmFyIEZpbHRlciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLkZpbHRlcjtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gVW5saWtlbHlGb3JtYXRGaWx0ZXIoKSB7XG4gICAgRmlsdGVyLmNhbGwodGhpcyk7XG4gICAgXG5cbiAgICB0aGlzLmlzVmFsaWQgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHQsIG9wdCkgeyBcblxuICAgICAgICBpZiAocmVzdWx0LnRleHQucmVwbGFjZSgnICcsJycpLm1hdGNoKC9eXFxkKihcXC5cXGQqKT8kLykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlOyBcbiAgICB9XG59IiwiXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBSZWZpbmVyKCkgeyBcblxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7IHJldHVybiByZXN1bHRzOyB9O1xufVxuXG5leHBvcnRzLkZpbHRlciA9IGZ1bmN0aW9uIEZpbHRlcigpIHsgXG4gICAgXG4gICAgZXhwb3J0cy5SZWZpbmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLmlzVmFsaWQgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHQsIG9wdCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7IFxuXG4gICAgICAgIHZhciBmaWx0ZXJlZFJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCh0ZXh0LCByZXN1bHQsIG9wdCkpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFJlc3VsdC5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRSZXN1bHQ7XG4gICAgfVxufVxuXG5cbi8vIENvbW1vbiByZWZpbmVyc1xuZXhwb3J0cy5PdmVybGFwUmVtb3ZhbFJlZmluZXIgPSByZXF1aXJlKCcuL092ZXJsYXBSZW1vdmFsUmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLkV4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIgPSByZXF1aXJlKCcuL0V4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5FeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lciA9IHJlcXVpcmUoJy4vRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5Gb3J3YXJkRGF0ZVJlZmluZXIgPSByZXF1aXJlKCcuL0ZvcndhcmREYXRlUmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLlVubGlrZWx5Rm9ybWF0RmlsdGVyID0gcmVxdWlyZSgnLi9Vbmxpa2VseUZvcm1hdEZpbHRlcicpLlJlZmluZXI7XG5cbi8vIEVOIHJlZmluZXJzXG5leHBvcnRzLkVOTWVyZ2VEYXRlVGltZVJlZmluZXIgPSByZXF1aXJlKCcuL0VOL0VOTWVyZ2VEYXRlVGltZVJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5FTk1lcmdlRGF0ZVJhbmdlUmVmaW5lciA9IHJlcXVpcmUoJy4vRU4vRU5NZXJnZURhdGVSYW5nZVJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5FTlByaW9yaXRpemVTcGVjaWZpY0RhdGVSZWZpbmVyID0gcmVxdWlyZSgnLi9FTi9FTlByaW9yaXRpemVTcGVjaWZpY0RhdGVSZWZpbmVyJykuUmVmaW5lcjtcblxuLy8gSlAgcmVmaW5lcnNcbmV4cG9ydHMuSlBNZXJnZURhdGVSYW5nZVJlZmluZXIgPSByZXF1aXJlKCcuL0pQL0pQTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcblxuLy8gRlIgcmVmaW5lcnNcbmV4cG9ydHMuRlJNZXJnZURhdGVSYW5nZVJlZmluZXIgPSByZXF1aXJlKCcuL0ZSL0ZSTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcbmV4cG9ydHMuRlJNZXJnZURhdGVUaW1lUmVmaW5lciA9IHJlcXVpcmUoJy4vRlIvRlJNZXJnZURhdGVUaW1lUmVmaW5lcicpLlJlZmluZXI7XG4iLCJ2YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbmZ1bmN0aW9uIFBhcnNlZFJlc3VsdChyZXN1bHQpe1xuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcblxuICAgIHRoaXMucmVmICAgPSByZXN1bHQucmVmO1xuICAgIHRoaXMuaW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgdGhpcy50ZXh0ICA9IHJlc3VsdC50ZXh0O1xuICAgIHRoaXMudGFncyAgPSByZXN1bHQudGFncyB8fCB7fTtcblxuICAgIHRoaXMuc3RhcnQgPSBuZXcgUGFyc2VkQ29tcG9uZW50cyhyZXN1bHQuc3RhcnQsIHJlc3VsdC5yZWYpXG4gICAgaWYocmVzdWx0LmVuZCl7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IFBhcnNlZENvbXBvbmVudHMocmVzdWx0LmVuZCwgcmVzdWx0LnJlZilcbiAgICB9XG59XG5cblBhcnNlZFJlc3VsdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh0aGlzKTtcbiAgICByZXN1bHQudGFncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy50YWdzKSk7XG4gICAgcmVzdWx0LnN0YXJ0ID0gdGhpcy5zdGFydC5jbG9uZSgpO1xuICAgIGlmICh0aGlzLmVuZCkge1xuICAgICAgICByZXN1bHQuZW5kID0gdGhpcy5lbmQuY2xvbmUoKTtcbiAgICB9XG59XG5cblBhcnNlZFJlc3VsdC5wcm90b3R5cGUuaGFzUG9zc2libGVEYXRlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0LmlzUG9zc2libGVEYXRlKCkgJiYgKCF0aGlzLmVuZCB8fCB0aGlzLmVuZC5pc1Bvc3NpYmxlRGF0ZSgpKTtcbn1cblxuXG5mdW5jdGlvbiBQYXJzZWRDb21wb25lbnRzIChjb21wb25lbnRzLCByZWYpe1xuXG4gICAgdGhpcy5rbm93blZhbHVlcyA9IHt9O1xuICAgIHRoaXMuaW1wbGllZFZhbHVlcyA9IHt9O1xuXG4gICAgaWYgKGNvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICAgICAgdGhpcy5rbm93blZhbHVlc1trZXldID0gY29tcG9uZW50c1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlZikge1xuICAgICAgICByZWYgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdGhpcy5pbXBseSgnZGF5JywgcmVmLmRhdGUoKSlcbiAgICAgICAgdGhpcy5pbXBseSgnbW9udGgnLCByZWYubW9udGgoKSArIDEpXG4gICAgICAgIHRoaXMuaW1wbHkoJ3llYXInLCByZWYueWVhcigpKVxuICAgIH1cbiAgICBcblxuICAgIHRoaXMuaW1wbHkoJ2hvdXInLCAxMik7XG4gICAgdGhpcy5pbXBseSgnbWludXRlJywgMCk7XG4gICAgdGhpcy5pbXBseSgnc2Vjb25kJywgMCk7XG4gICAgdGhpcy5pbXBseSgnbWlsbGlzZWNvbmQnLCAwKTtcbn1cblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKCk7XG4gICAgY29tcG9uZW50Lmtub3duVmFsdWVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmtub3duVmFsdWVzKSk7XG4gICAgY29tcG9uZW50LmltcGxpZWRWYWx1ZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuaW1wbGllZFZhbHVlcykpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihjb21wb25lbnQsIHZhbHVlKSB7XG4gICAgaWYgKGNvbXBvbmVudCBpbiB0aGlzLmtub3duVmFsdWVzKSByZXR1cm4gdGhpcy5rbm93blZhbHVlc1tjb21wb25lbnRdO1xuICAgIGlmIChjb21wb25lbnQgaW4gdGhpcy5pbXBsaWVkVmFsdWVzKSByZXR1cm4gdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF07XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5hc3NpZ24gPSBmdW5jdGlvbihjb21wb25lbnQsIHZhbHVlKSB7XG4gICAgdGhpcy5rbm93blZhbHVlc1tjb21wb25lbnRdID0gdmFsdWU7XG4gICAgZGVsZXRlIHRoaXMuaW1wbGllZFZhbHVlc1tjb21wb25lbnRdO1xufTtcblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuaW1wbHkgPSBmdW5jdGlvbihjb21wb25lbnQsIHZhbHVlKSB7XG4gICAgaWYgKGNvbXBvbmVudCBpbiB0aGlzLmtub3duVmFsdWVzKSByZXR1cm47XG4gICAgdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF0gPSB2YWx1ZTtcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmlzQ2VydGFpbiA9IGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQgaW4gdGhpcy5rbm93blZhbHVlcztcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmlzUG9zc2libGVEYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGVNb21lbnQgPSB0aGlzLm1vbWVudCgpO1xuICAgIGlmICh0aGlzLmlzQ2VydGFpbigndGltZXpvbmVPZmZzZXQnKSkge1xuICAgICAgICBkYXRlTW9tZW50LnV0Y09mZnNldCh0aGlzLmdldCgndGltZXpvbmVPZmZzZXQnKSlcbiAgICB9XG5cbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ3llYXInKSAhPSB0aGlzLmdldCgneWVhcicpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVNb21lbnQuZ2V0KCdtb250aCcpICE9IHRoaXMuZ2V0KCdtb250aCcpLTEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ2RhdGUnKSAhPSB0aGlzLmdldCgnZGF5JykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ2hvdXInKSAhPSB0aGlzLmdldCgnaG91cicpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVNb21lbnQuZ2V0KCdtaW51dGUnKSAhPSB0aGlzLmdldCgnbWludXRlJykpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRlTW9tZW50ID0gdGhpcy5tb21lbnQoKTtcbiAgICByZXR1cm4gZGF0ZU1vbWVudC50b0RhdGUoKTtcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLm1vbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRlTW9tZW50ID0gbW9tZW50KCk7XG5cbiAgICBkYXRlTW9tZW50LnNldCgneWVhcicsIHRoaXMuZ2V0KCd5ZWFyJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdtb250aCcsIHRoaXMuZ2V0KCdtb250aCcpLTEpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdkYXRlJywgdGhpcy5nZXQoJ2RheScpKTtcbiAgICBkYXRlTW9tZW50LnNldCgnaG91cicsIHRoaXMuZ2V0KCdob3VyJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdtaW51dGUnLCB0aGlzLmdldCgnbWludXRlJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdzZWNvbmQnLCB0aGlzLmdldCgnc2Vjb25kJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdtaWxsaXNlY29uZCcsIHRoaXMuZ2V0KCdtaWxsaXNlY29uZCcpKTtcblxuICAgIC8vIEphdmFzY3JpcHQgRGF0ZSBPYmplY3QgcmV0dXJuIG1pbnVzIHRpbWV6b25lIG9mZnNldFxuICAgIHZhciBjdXJyZW50VGltZXpvbmVPZmZzZXQgPSBkYXRlTW9tZW50LnV0Y09mZnNldCgpO1xuICAgIHZhciB0YXJnZXRUaW1lem9uZU9mZnNldCA9IHRoaXMuaXNDZXJ0YWluKCd0aW1lem9uZU9mZnNldCcpID8gXG4gICAgICAgIHRoaXMuZ2V0KCd0aW1lem9uZU9mZnNldCcpIDogY3VycmVudFRpbWV6b25lT2Zmc2V0O1xuXG4gICAgdmFyIGFkanVzdFRpbWV6b25lT2Zmc2V0ID0gdGFyZ2V0VGltZXpvbmVPZmZzZXQgLSBjdXJyZW50VGltZXpvbmVPZmZzZXQ7XG4gICAgZGF0ZU1vbWVudC5hZGQoLWFkanVzdFRpbWV6b25lT2Zmc2V0LCAnbWludXRlcycpO1xuXG4gICAgcmV0dXJuIGRhdGVNb21lbnQ7XG59O1xuXG5cblxuZXhwb3J0cy5QYXJzZWRDb21wb25lbnRzID0gUGFyc2VkQ29tcG9uZW50cztcbmV4cG9ydHMuUGFyc2VkUmVzdWx0ID0gUGFyc2VkUmVzdWx0O1xuIiwiZXhwb3J0cy5XRUVLREFZX09GRlNFVCA9IHsgXG4gICAgJ3N1bmRheSc6IDAsIFxuICAgICdzdW4nOiAwLCBcbiAgICAnbW9uZGF5JzogMSwgXG4gICAgJ21vbic6IDEsXG4gICAgJ3R1ZXNkYXknOiAyLCBcbiAgICAndHVlJzoyLCBcbiAgICAnd2VkbmVzZGF5JzogMywgXG4gICAgJ3dlZCc6IDMsIFxuICAgICd0aHVyc2RheSc6IDQsIFxuICAgICd0aHVyJzogNCwgXG4gICAgJ3RodSc6IDQsXG4gICAgJ2ZyaWRheSc6IDUsIFxuICAgICdmcmknOiA1LFxuICAgICdzYXR1cmRheSc6IDYsIFxuICAgICdzYXQnOiA2XG59O1xuICAgIFxuZXhwb3J0cy5NT05USF9PRkZTRVQgPSB7IFxuICAgICdqYW51YXJ5JzogMSxcbiAgICAnamFuJzogMSxcbiAgICAnamFuLic6IDEsXG4gICAgJ2ZlYnJ1YXJ5JzogMixcbiAgICAnZmViJzogMixcbiAgICAnZmViLic6IDIsXG4gICAgJ21hcmNoJzogMyxcbiAgICAnbWFyJzogMyxcbiAgICAnbWFyLic6IDMsXG4gICAgJ2FwcmlsJzogNCxcbiAgICAnYXByJzogNCxcbiAgICAnYXByLic6IDQsXG4gICAgJ21heSc6IDUsXG4gICAgJ2p1bmUnOiA2LFxuICAgICdqdW4nOiA2LFxuICAgICdqdW4uJzogNixcbiAgICAnanVseSc6IDcsXG4gICAgJ2p1bCc6IDcsXG4gICAgJ2p1bC4nOiA3LFxuICAgICdhdWd1c3QnOiA4LFxuICAgICdhdWcnOiA4LFxuICAgICdhdWcuJzogOCxcbiAgICAnc2VwdGVtYmVyJzogOSxcbiAgICAnc2VwJzogOSxcbiAgICAnc2VwLic6IDksXG4gICAgJ3NlcHQnOiA5LFxuICAgICdzZXB0Lic6IDksXG4gICAgJ29jdG9iZXInOiAxMCxcbiAgICAnb2N0JzogMTAsXG4gICAgJ29jdC4nOiAxMCxcbiAgICAnbm92ZW1iZXInOiAxMSxcbiAgICAnbm92JzogMTEsXG4gICAgJ25vdi4nOiAxMSxcbiAgICAnZGVjZW1iZXInOiAxMixcbiAgICAnZGVjJzogMTIsXG4gICAgJ2RlYy4nOiAxMlxufTtcblxuZXhwb3J0cy5JTlRFR0VSX1dPUkRTID0ge1xuICAgICdvbmUnIDogMSxcbiAgICAndHdvJyA6IDIsXG4gICAgJ3RocmVlJyA6IDMsXG4gICAgJ2ZvdXInIDogNCxcbiAgICAnZml2ZScgOiA1LFxuICAgICdzaXgnIDogNixcbiAgICAnc2V2ZW4nIDogNyxcbiAgICAnZWlnaHQnIDogOCxcbiAgICAnbmluZScgOiA5LFxuICAgICd0ZW4nIDogMTAsXG4gICAgJ2VsZXZlbicgOiAxMSxcbiAgICAndHdlbHZlJyA6IDEyXG59O1xuZXhwb3J0cy5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gPSAnKD86JyArIE9iamVjdC5rZXlzKGV4cG9ydHMuSU5URUdFUl9XT1JEUykuam9pbignfCcpICsnKSc7XG5cbmV4cG9ydHMuT1JESU5BTF9XT1JEUyA9IHtcbiAgICAnZmlyc3QnIDogMSxcbiAgICAnc2Vjb25kJzogMixcbiAgICAndGhpcmQnOiAzLFxuICAgICdmb3VydGgnOiA0LFxuICAgICdmaWZ0aCc6IDUsXG4gICAgJ3NpeHRoJzogNixcbiAgICAnc2V2ZW50aCc6IDcsXG4gICAgJ2VpZ2h0aCc6IDgsXG4gICAgJ25pbnRoJzogOSxcbiAgICAndGVudGgnOiAxMCxcbiAgICAnZWxldmVudGgnOiAxMSxcbiAgICAndHdlbGZ0aCc6IDEyLFxuICAgICd0aGlydGVlbnRoJzogMTMsXG4gICAgJ2ZvdXJ0ZWVudGgnOiAxNCxcbiAgICAnZmlmdGVlbnRoJzogMTUsXG4gICAgJ3NpeHRlZW50aCc6IDE2LFxuICAgICdzZXZlbnRlZW50aCc6IDE3LFxuICAgICdlaWdodGVlbnRoJzogMTgsXG4gICAgJ25pbmV0ZWVudGgnOiAxOSxcbiAgICAndHdlbnRpZXRoJzogMjAsXG4gICAgJ3R3ZW50eSBmaXJzdCc6IDIxLFxuICAgICd0d2VudHkgc2Vjb25kJzogMjIsXG4gICAgJ3R3ZW50eSB0aGlyZCc6IDIzLFxuICAgICd0d2VudHkgZm91cnRoJzogMjQsXG4gICAgJ3R3ZW50eSBmaWZ0aCc6IDI1LFxuICAgICd0d2VudHkgc2l4dGgnOiAyNixcbiAgICAndHdlbnR5IHNldmVudGgnOiAyNyxcbiAgICAndHdlbnR5IGVpZ2h0aCc6IDI4LFxuICAgICd0d2VudHkgbmludGgnOiAyOSxcbiAgICAndGhpcnRpZXRoJzogMzAsXG4gICAgJ3RoaXJ0eSBmaXJzdCc6IDMxXG59O1xuZXhwb3J0cy5PUkRJTkFMX1dPUkRTX1BBVFRFUk4gPSAnKD86JyArIE9iamVjdC5rZXlzKGV4cG9ydHMuT1JESU5BTF9XT1JEUykuam9pbignfCcpLnJlcGxhY2UoLyAvZywgJ1sgLV0nKSArICcpJzsiLCJleHBvcnRzLldFRUtEQVlfT0ZGU0VUID0ge1xuICAgICdkb21pbmdvJzogMCxcbiAgICAnZG9tJzogMCxcbiAgICAnbHVuZXMnOiAxLFxuICAgICdsdW4nOiAxLFxuICAgICdtYXJ0ZXMnOiAyLFxuICAgICdtYXInOjIsXG4gICAgJ21pw6lyY29sZXMnOiAzLFxuICAgICdtaWVyY29sZXMnOiAzLFxuICAgICdtaWUnOiAzLFxuICAgICdqdWV2ZXMnOiA0LFxuICAgICdqdWUnOiA0LFxuICAgICd2aWVybmVzJzogNSxcbiAgICAndmllJzogNSxcbiAgICAnc8OhYmFkbyc6IDYsXG4gICAgJ3NhYmFkbyc6IDYsXG4gICAgJ3NhYic6IDYsfVxuXG5leHBvcnRzLk1PTlRIX09GRlNFVCA9IHtcbiAgICAnZW5lcm8nOiAxLFxuICAgICdlbmUnOiAxLFxuICAgICdlbmUuJzogMSxcbiAgICAnZmVicmVybyc6IDIsXG4gICAgJ2ZlYic6IDIsXG4gICAgJ2ZlYi4nOiAyLFxuICAgICdtYXJ6byc6IDMsXG4gICAgJ21hcic6IDMsXG4gICAgJ21hci4nOiAzLFxuICAgICdhYnJpbCc6IDQsXG4gICAgJ2Ficic6IDQsXG4gICAgJ2Fici4nOiA0LFxuICAgICdtYXlvJzogNSxcbiAgICAnbWF5JzogNSxcbiAgICAnbWF5Lic6IDUsXG4gICAgJ2p1bmlvJzogNixcbiAgICAnanVuJzogNixcbiAgICAnanVuLic6IDYsXG4gICAgJ2p1bGlvJzogNyxcbiAgICAnanVsJzogNyxcbiAgICAnanVsLic6IDcsXG4gICAgJ2Fnb3N0byc6IDgsXG4gICAgJ2Fnbyc6IDgsXG4gICAgJ2Fnby4nOiA4LFxuICAgICdzZXB0aWVtYnJlJzogOSxcbiAgICAnc2VwJzogOSxcbiAgICAnc2VwdCc6IDksXG4gICAgJ3NlcC4nOiA5LFxuICAgICdzZXB0Lic6IDksXG4gICAgJ29jdHVicmUnOiAxMCxcbiAgICAnb2N0JzogMTAsXG4gICAgJ29jdC4nOiAxMCxcbiAgICAnbm92aWVtYnJlJzogMTEsXG4gICAgJ25vdic6IDExLFxuICAgICdub3YuJzogMTEsXG4gICAgJ2RpY2llbWJyZSc6IDEyLFxuICAgICdkaWMnOiAxMixcbiAgICAnZGljLic6IDEyLFxufVxuIiwiZXhwb3J0cy5XRUVLREFZX09GRlNFVCA9IHsgXHJcbiAgICAnZGltYW5jaGUnOiAwLCBcclxuICAgICdkaW0nOiAwLCBcclxuICAgICdsdW5kaSc6IDEsIFxyXG4gICAgJ2x1bic6IDEsXHJcbiAgICAnbWFyZGknOiAyLCBcclxuICAgICdtYXInOjIsIFxyXG4gICAgJ21lcmNyZWRpJzogMywgXHJcbiAgICAnbWVyJzogMywgXHJcbiAgICAnamV1ZGknOiA0LCBcclxuICAgICdqZXUnOiA0LCBcclxuICAgICd2ZW5kcmVkaSc6IDUsIFxyXG4gICAgJ3Zlbic6IDUsXHJcbiAgICAnc2FtZWRpJzogNiwgXHJcbiAgICAnc2FtJzogNlxyXG59O1xyXG4gICAgXHJcbmV4cG9ydHMuTU9OVEhfT0ZGU0VUID0geyBcclxuICAgICdqYW52aWVyJzogMSxcclxuICAgICdqYW4nOiAxLFxyXG4gICAgJ2phbi4nOiAxLFxyXG4gICAgJ2bDqXZyaWVyJzogMixcclxuICAgICdmw6l2JzogMixcclxuICAgICdmw6l2Lic6IDIsXHJcbiAgICAnbWFycyc6IDMsXHJcbiAgICAnbWFyJzogMyxcclxuICAgICdtYXIuJzogMyxcclxuICAgICdhdnJpbCc6IDQsXHJcbiAgICAnYXZyJzogNCxcclxuICAgICdhdnIuJzogNCxcclxuICAgICdtYWknOiA1LFxyXG4gICAgJ2p1aW4nOiA2LFxyXG4gICAgJ2p1bic6IDYsXHJcbiAgICAnanVpbGxldCc6IDcsXHJcbiAgICAnanVsJzogNyxcclxuICAgICdqdWwuJzogNyxcclxuICAgICdhb8O7dCc6IDgsXHJcbiAgICAnYW91dCc6IDgsXHJcbiAgICAnc2VwdGVtYnJlJzogOSxcclxuICAgICdzZXAnOiA5LFxyXG4gICAgJ3NlcC4nOiA5LFxyXG4gICAgJ3NlcHQnOiA5LFxyXG4gICAgJ3NlcHQuJzogOSxcclxuICAgICdvY3RvYnJlJzogMTAsXHJcbiAgICAnb2N0JzogMTAsXHJcbiAgICAnb2N0Lic6IDEwLFxyXG4gICAgJ25vdmVtYnJlJzogMTEsXHJcbiAgICAnbm92JzogMTEsXHJcbiAgICAnbm92Lic6IDExLFxyXG4gICAgJ2TDqWNlbWJyZSc6IDEyLFxyXG4gICAgJ2RlYyc6IDEyLFxyXG4gICAgJ2RlYy4nOiAxMlxyXG59O1xyXG5cclxuZXhwb3J0cy5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gPSAnKD86dW58ZGV1eHx0cm9pc3xxdWF0cmV8Y2lucXxzaXh8c2VwdHxodWl0fG5ldWZ8ZGl4fG9uemV8ZG91emV8dHJlaXplKSc7XHJcbmV4cG9ydHMuSU5URUdFUl9XT1JEUyA9IHtcclxuICAgICd1bicgOiAxLFxyXG4gICAgJ2RldXgnIDogMixcclxuICAgICd0cm9pcycgOiAzLFxyXG4gICAgJ3F1YXRyZScgOiA0LFxyXG4gICAgJ2NpbnEnIDogNSxcclxuICAgICdzaXgnIDogNixcclxuICAgICdzZXB0JyA6IDcsXHJcbiAgICAnaHVpdCcgOiA4LFxyXG4gICAgJ25ldWYnIDogOSxcclxuICAgICdkaXgnIDogMTAsXHJcbiAgICAnb256ZScgOiAxMSxcclxuICAgICdkb3V6ZScgOiAxMixcclxuICAgICd0cmVpemUnIDogMTMsXHJcbn07XHJcbiIsIlxuXG4vKipcbiAqIHRvLWhhbmtha3UuanNcbiAqIGNvbnZlcnQgdG8gYXNjaWkgY29kZSBzdHJpbmdzLlxuICpcbiAqIEB2ZXJzaW9uIDEuMC4xXG4gKiBAYXV0aG9yIHRoaW5rNDlcbiAqIEB1cmwgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vOTY0NTkyXG4gKiBAbGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCAoVGhlIE1JVCBMaWNlbnNlKVxuICovXG4gXG5leHBvcnRzLnRvSGFua2FrdSA9IChmdW5jdGlvbiAoU3RyaW5nLCBmcm9tQ2hhckNvZGUpIHtcbiBcbiAgICBmdW5jdGlvbiB0b0hhbmtha3UgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvXFx1MjAxOS9nLCAnXFx1MDAyNycpLnJlcGxhY2UoL1xcdTIwMUQvZywgJ1xcdTAwMjInKS5yZXBsYWNlKC9cXHUzMDAwL2csICdcXHUwMDIwJykucmVwbGFjZSgvXFx1RkZFNS9nLCAnXFx1MDBBNScpLnJlcGxhY2UoL1tcXHVGRjAxXFx1RkYwMy1cXHVGRjA2XFx1RkYwOFxcdUZGMDlcXHVGRjBDLVxcdUZGMTlcXHVGRjFDLVxcdUZGMUZcXHVGRjIxLVxcdUZGM0JcXHVGRjNEXFx1RkYzRlxcdUZGNDEtXFx1RkY1QlxcdUZGNURcXHVGRjVFXS9nLCBhbHBoYU51bSk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIGFscGhhTnVtICh0b2tlbikge1xuICAgICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKHRva2VuLmNoYXJDb2RlQXQoMCkgLSA2NTI0OCk7XG4gICAgfVxuIFxuICAgIHJldHVybiB0b0hhbmtha3U7XG59KShTdHJpbmcsIFN0cmluZy5mcm9tQ2hhckNvZGUpO1xuXG4vKipcbiAqIHRvLXplbmtha3UuanNcbiAqIGNvbnZlcnQgdG8gbXVsdGkgYnl0ZSBzdHJpbmdzLlxuICpcbiAqIEB2ZXJzaW9uIDEuMC4yXG4gKiBAYXV0aG9yIHRoaW5rNDlcbiAqIEB1cmwgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vOTY0NTkyXG4gKiBAbGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCAoVGhlIE1JVCBMaWNlbnNlKVxuICovXG5leHBvcnRzLnRvWmVua2FrdSA9IChmdW5jdGlvbiAoU3RyaW5nLCBmcm9tQ2hhckNvZGUpIHtcbiBcbiAgICBmdW5jdGlvbiB0b1plbmtha3UgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvXFx1MDAyMC9nLCAnXFx1MzAwMCcpLnJlcGxhY2UoL1xcdTAwMjIvZywgJ1xcdTIwMUQnKS5yZXBsYWNlKC9cXHUwMDI3L2csICdcXHUyMDE5JykucmVwbGFjZSgvXFx1MDBBNS9nLCAnXFx1RkZFNScpLnJlcGxhY2UoL1shIy0mKCksLTlcXHUwMDNDLT9BLVtcXHUwMDVEX2Ete31+XS9nLCBhbHBoYU51bSk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIGFscGhhTnVtICh0b2tlbikge1xuICAgICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKHRva2VuLmNoYXJDb2RlQXQoMCkgKyA2NTI0OCk7XG4gICAgfVxuIFxuICAgIHJldHVybiB0b1plbmtha3U7XG59KShTdHJpbmcsIFN0cmluZy5mcm9tQ2hhckNvZGUpOyIsInZhciBOVU1CRVIgPXtcbiAgJ+mbtic6MCxcbiAgJ+S4gCc6MSxcbiAgJ+S6jCc6MixcbiAgJ+WFqSc6MixcbiAgJ+S4iSc6MyxcbiAgJ+Wbmyc6NCxcbiAgJ+S6lCc6NSxcbiAgJ+WFrSc6NixcbiAgJ+S4gyc6NyxcbiAgJ+WFqyc6OCxcbiAgJ+S5nSc6OSxcbiAgJ+WNgSc6MTAsXG4gICflu78nOjIwLFxuICAn5Y2FJzozMCxcbn07XG5cbnZhciBXRUVLREFZX09GRlNFVCA9e1xuICAn5aSpJzowLFxuICAn5pelJzowLFxuICAn5LiAJzoxLFxuICAn5LqMJzoyLFxuICAn5LiJJzozLFxuICAn5ZubJzo0LFxuICAn5LqUJzo1LFxuICAn5YWtJzo2LFxufTtcblxuZXhwb3J0cy5OVU1CRVIgPSBOVU1CRVI7XG5leHBvcnRzLldFRUtEQVlfT0ZGU0VUID0gV0VFS0RBWV9PRkZTRVQ7XG5cbmV4cG9ydHMuemhTdHJpbmdUb051bWJlcj1mdW5jdGlvbih0ZXh0KXtcbiAgdmFyIG51bWJlciA9IDA7XG4gIGZvcih2YXIgaT0wOyBpPHRleHQubGVuZ3RoIDtpKyspe1xuICAgIHZhciBjaGFyID0gdGV4dFtpXTtcbiAgICBpZihjaGFyID09PSAn5Y2BJyl7XG4gICAgICBudW1iZXIgPSBudW1iZXI9PT0gMCA/IE5VTUJFUltjaGFyXSA6IChudW1iZXIgKiBOVU1CRVJbY2hhcl0pO1xuICAgIH1lbHNle1xuICAgICAgbnVtYmVyICs9IE5VTUJFUltjaGFyXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydHMuemhTdHJpbmdUb1llYXI9ZnVuY3Rpb24odGV4dCl7XG4gIHZhciBzdHJpbmcgPSAnJztcbiAgZm9yKHZhciBpPTA7IGk8dGV4dC5sZW5ndGggO2krKyl7XG4gICAgdmFyIGNoYXIgPSB0ZXh0W2ldO1xuICAgIHN0cmluZyA9IHN0cmluZyArIE5VTUJFUltjaGFyXTtcbiAgfVxuICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nKTtcbn07XG4iXX0=
