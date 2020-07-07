(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chrono"] = factory();
	else
		root["chrono"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:c,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,u),i=e-r<0,s=t.clone().add(n+(i?-1:1),u);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,D:"date",h:r,m:n,s:e,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,e,n){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),e&&(m[t]=e,r=t);else{var i=t.name;m[i]=t,r=i}return!n&&r&&(l=r),r||!n&&l},g=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new v(n)},D=d;D.l=M,D.i=y,D.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return g(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<g(t)},d.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,e){var n=D.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return f?n:n.endOf(i)},$=function(t,e){return D.w(h.toDate()[t].apply(h.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case n:return $(M+"Seconds",2);case e:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[n]=c+"Minutes",h[e]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(e){var n=g(f);return D.w(n.date(n.date()+Math.round(e*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[n]=6e4,h[r]=36e5,h[e]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:c(h,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return n.replace(f,function(t,e){return e||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[n]=m/6e4,c[e]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,e){return t(e,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Chrono", function() { return /* reexport */ chrono_Chrono; });
__webpack_require__.d(__webpack_exports__, "strict", function() { return /* binding */ src_strict; });
__webpack_require__.d(__webpack_exports__, "casual", function() { return /* binding */ src_casual; });
__webpack_require__.d(__webpack_exports__, "parse", function() { return /* binding */ src_parse; });
__webpack_require__.d(__webpack_exports__, "parseDate", function() { return /* binding */ src_parseDate; });
__webpack_require__.d(__webpack_exports__, "Meridiem", function() { return /* binding */ Meridiem; });
__webpack_require__.d(__webpack_exports__, "en", function() { return /* reexport */ en_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "ja", function() { return /* reexport */ ja_namespaceObject; });

// NAMESPACE OBJECT: ./src/locales/en/index.ts
var en_namespaceObject = {};
__webpack_require__.r(en_namespaceObject);
__webpack_require__.d(en_namespaceObject, "casual", function() { return casual; });
__webpack_require__.d(en_namespaceObject, "strict", function() { return strict; });
__webpack_require__.d(en_namespaceObject, "GB", function() { return GB; });
__webpack_require__.d(en_namespaceObject, "parse", function() { return parse; });
__webpack_require__.d(en_namespaceObject, "parseDate", function() { return parseDate; });
__webpack_require__.d(en_namespaceObject, "createCasualConfiguration", function() { return createCasualConfiguration; });
__webpack_require__.d(en_namespaceObject, "createConfiguration", function() { return createConfiguration; });

// NAMESPACE OBJECT: ./src/locales/ja/index.ts
var ja_namespaceObject = {};
__webpack_require__.r(ja_namespaceObject);
__webpack_require__.d(ja_namespaceObject, "casual", function() { return ja_casual; });
__webpack_require__.d(ja_namespaceObject, "strict", function() { return ja_strict; });
__webpack_require__.d(ja_namespaceObject, "parse", function() { return ja_parse; });
__webpack_require__.d(ja_namespaceObject, "parseDate", function() { return ja_parseDate; });
__webpack_require__.d(ja_namespaceObject, "createCasualConfiguration", function() { return ja_createCasualConfiguration; });
__webpack_require__.d(ja_namespaceObject, "createConfiguration", function() { return ja_createConfiguration; });

// CONCATENATED MODULE: ./src/utils/pattern.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function extractTerms(dictionary) {
  var keys;

  if (dictionary instanceof Array) {
    keys = _toConsumableArray(dictionary);
  } else if (dictionary instanceof Map) {
    keys = Array.from(dictionary.keys());
  } else {
    keys = Object.keys(dictionary);
  }

  return keys;
}
function matchAnyPattern(dictionary) {
  // TODO: More efficient regex pattern by considering duplicated prefix
  var joinedTerms = extractTerms(dictionary).sort(function (a, b) {
    return b.length - a.length;
  }).join('|').replace(/\./g, '\\.');
  return "(?:".concat(joinedTerms, ")");
}
// CONCATENATED MODULE: ./src/locales/en/constants.ts

var WEEKDAY_DICTIONARY = {
  'sunday': 0,
  'sun': 0,
  'sun.': 0,
  'monday': 1,
  'mon': 1,
  'mon.': 1,
  'tuesday': 2,
  'tue': 2,
  'tue.': 2,
  'wednesday': 3,
  'wed': 3,
  'wed.': 3,
  'thursday': 4,
  'thurs': 4,
  'thurs.': 4,
  'thur': 4,
  'thur.': 4,
  'thu': 4,
  'thu.': 4,
  'friday': 5,
  'fri': 5,
  'fri.': 5,
  'saturday': 6,
  'sat': 6,
  'sat.': 6
};
var MONTH_DICTIONARY = {
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
var INTEGER_WORD_DICTIONARY = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'ten': 10,
  'eleven': 11,
  'twelve': 12
};
var ORDINAL_WORD_DICTIONARY = {
  'first': 1,
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
  'twenty-first': 21,
  'twenty second': 22,
  'twenty-second': 22,
  'twenty third': 23,
  'twenty-third': 23,
  'twenty fourth': 24,
  'twenty-fourth': 24,
  'twenty fifth': 25,
  'twenty-fifth': 25,
  'twenty sixth': 26,
  'twenty-sixth': 26,
  'twenty seventh': 27,
  'twenty-seventh': 27,
  'twenty eighth': 28,
  'twenty-eighth': 28,
  'twenty ninth': 29,
  'twenty-ninth': 29,
  'thirtieth': 30,
  'thirty first': 31,
  'thirty-first': 31
};
var TIME_UNIT_DICTIONARY = {
  'sec': 'second',
  'second': 'second',
  'seconds': 'second',
  'min': 'minute',
  'mins': 'minute',
  'minute': 'minute',
  'minutes': 'minute',
  'h': 'hour',
  'hr': 'hour',
  'hrs': 'hour',
  'hour': 'hour',
  'hours': 'hour',
  'day': 'd',
  'days': 'd',
  'week': 'week',
  'weeks': 'week',
  'month': 'month',
  'months': 'month',
  'yr': 'year',
  'year': 'year',
  'years': 'year'
}; //-----------------------------

var NUMBER_PATTERN = "(?:".concat(matchAnyPattern(INTEGER_WORD_DICTIONARY), "|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s*an?)?|an?(?:\\s*few)?|few)");
function parseNumberPattern(match) {
  var num = match.toLowerCase();

  if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
    return INTEGER_WORD_DICTIONARY[num];
  } else if (num === 'a' || num === 'an') {
    return 1;
  } else if (num.match(/few/)) {
    return 3;
  } else if (num.match(/half/)) {
    return 0.5;
  }

  return parseFloat(num);
} //-----------------------------

var ORDINAL_NUMBER_PATTERN = "(?:".concat(matchAnyPattern(ORDINAL_WORD_DICTIONARY), "|[0-9]{1,2}(?:st|nd|rd|th)?)");
function parseOrdinalNumberPattern(match) {
  var num = match.toLowerCase();

  if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
    return ORDINAL_WORD_DICTIONARY[num];
  }

  num = num.replace(/(?:st|nd|rd|th)$/i, '');
  return parseInt(num);
} //-----------------------------

var YEAR_PATTERN = "(?:[1-9][0-9]{0,3}\\s*(?:BE|AD|BC)|[1-2][0-9]{3}|[5-9][0-9])";
function parseYear(match) {
  if (/BE/i.test(match)) {
    // Buddhist Era
    match = match.replace(/BE/i, '');
    return parseInt(match) - 543;
  }

  if (/BC/i.test(match)) {
    // Before Christ
    match = match.replace(/BC/i, '');
    return -parseInt(match);
  }

  if (/AD/i.test(match)) {
    match = match.replace(/AD/i, '');
    return parseInt(match);
  }

  var yearNumber = parseInt(match);

  if (yearNumber < 100) {
    if (yearNumber > 50) {
      yearNumber = yearNumber + 1900;
    } else {
      yearNumber = yearNumber + 2000;
    }
  }

  return yearNumber;
} //-----------------------------

var SINGLE_TIME_UNIT_PATTERN = "(".concat(NUMBER_PATTERN, ")\\s*(").concat(matchAnyPattern(TIME_UNIT_DICTIONARY), ")\\s*");
var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, 'i');
var SINGLE_TIME_UNIT_PATTERN_NO_CAPTURE = SINGLE_TIME_UNIT_PATTERN.replace(/\((?!\?)/g, '(?:');
var TIME_UNITS_PATTERN = "(?:".concat(SINGLE_TIME_UNIT_PATTERN_NO_CAPTURE, ")+");
function parseTimeUnits(timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);

  while (match) {
    collectDateTimeFragment(fragments, match);
    remainingText = remainingText.substring(match[0].length);
    match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
  }

  return fragments;
}

function collectDateTimeFragment(fragments, match) {
  var num = parseNumberPattern(match[1]);
  var unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
  fragments[unit] = num;
}
// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(0);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// CONCATENATED MODULE: ./src/results.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var results_ParsingComponents = /*#__PURE__*/function () {
  function ParsingComponents(refDate, knownComponents) {
    _classCallCheck(this, ParsingComponents);

    this.knownValues = {};
    this.impliedValues = {};

    if (knownComponents) {
      for (var key in knownComponents) {
        this.knownValues[key] = knownComponents[key];
      }
    }

    var refDayJs = dayjs_min_default()(refDate);

    this.imply('day', refDayJs.date());
    this.imply('month', refDayJs.month() + 1);
    this.imply('year', refDayJs.year());
    this.imply('hour', 12);
    this.imply('minute', 0);
    this.imply('second', 0);
    this.imply('millisecond', 0);
  }

  _createClass(ParsingComponents, [{
    key: "get",
    value: function get(component) {
      if (component in this.knownValues) {
        return this.knownValues[component];
      }

      if (component in this.impliedValues) {
        return this.impliedValues[component];
      }

      return null;
    }
  }, {
    key: "date",
    value: function date() {
      return this.dayjs().toDate();
    }
  }, {
    key: "isCertain",
    value: function isCertain(component) {
      return component in this.knownValues;
    }
  }, {
    key: "getCertainComponents",
    value: function getCertainComponents() {
      return Object.keys(this.knownValues);
    }
  }, {
    key: "imply",
    value: function imply(component, value) {
      if (component in this.knownValues) return;
      this.impliedValues[component] = value;
      return this;
    }
  }, {
    key: "assign",
    value: function assign(component, value) {
      this.knownValues[component] = value;
      delete this.impliedValues[component];
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      var component = new ParsingComponents(new Date());
      component.knownValues = {};
      component.impliedValues = {};

      for (var key in this.knownValues) {
        component.knownValues[key] = this.knownValues[key];
      }

      for (var _key in this.impliedValues) {
        component.impliedValues[_key] = this.impliedValues[_key];
      }

      return component;
    }
  }, {
    key: "isOnlyDate",
    value: function isOnlyDate() {
      return !this.isCertain('hour') && !this.isCertain('minute') && !this.isCertain('second');
    }
  }, {
    key: "isOnlyTime",
    value: function isOnlyTime() {
      return !this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
    }
  }, {
    key: "isOnlyWeekdayComponent",
    value: function isOnlyWeekdayComponent() {
      return this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
    }
  }, {
    key: "isOnlyDayMonthComponent",
    value: function isOnlyDayMonthComponent() {
      return this.isCertain('day') && this.isCertain('month') && !this.isCertain('year');
    }
  }, {
    key: "isValidDate",
    value: function isValidDate() {
      var dateMoment = this.dayjs();

      if (this.isCertain('timezoneOffset')) {
        var adjustTimezoneOffset = this.get('timezoneOffset') - dateMoment.utcOffset();
        dateMoment = dateMoment.add(adjustTimezoneOffset, 'minute');
      }

      if (dateMoment.get('year') != this.get('year')) return false;
      if (dateMoment.get('month') != this.get('month') - 1) return false;
      if (dateMoment.get('date') != this.get('day')) return false;
      if (dateMoment.get('hour') != this.get('hour')) return false;
      if (dateMoment.get('minute') != this.get('minute')) return false;
      return true;
    }
  }, {
    key: "dayjs",
    value: function dayjs() {
      var result = dayjs_min_default()();

      result = result.year(this.get('year'));
      result = result.month(this.get('month') - 1);
      result = result.date(this.get('day'));
      result = result.hour(this.get('hour'));
      result = result.minute(this.get('minute'));
      result = result.second(this.get('second'));
      result = result.millisecond(this.get('millisecond')); // Javascript Date Object return minus timezone offset

      var currentTimezoneOffset = result.utcOffset();
      var targetTimezoneOffset = this.get('timezoneOffset') !== null ? this.get('timezoneOffset') : currentTimezoneOffset;
      var adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
      result = result.add(-adjustTimezoneOffset, 'minute');
      return result;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[ParsingComponents {knownValues: ".concat(JSON.stringify(this.knownValues), ", impliedValues: ").concat(JSON.stringify(this.impliedValues), "}]");
    }
  }], [{
    key: "createRelativeFromRefDate",
    value: function createRelativeFromRefDate(refDate, fragments) {
      var date = dayjs_min_default()(refDate);

      for (var key in fragments) {
        date = date.add(fragments[key], key);
      }

      var components = new ParsingComponents(refDate);

      if (fragments['hour'] || fragments['minute'] || fragments['second']) {
        components.assign('hour', date.hour());
        components.assign('minute', date.minute());
        components.assign('second', date.second());
      }

      if (fragments['d'] || fragments['month'] || fragments['year']) {
        components.assign('day', date.date());
        components.assign('month', date.month() + 1);
        components.assign('year', date.year());
      } else {
        if (fragments['week']) {
          components.imply('weekday', date.day());
        }

        components.imply('day', date.date());
        components.imply('month', date.month() + 1);
        components.imply('year', date.year());
      }

      return components;
    }
  }]);

  return ParsingComponents;
}();
var ParsingResult = /*#__PURE__*/function () {
  function ParsingResult(refDate, index, text, start, end) {
    _classCallCheck(this, ParsingResult);

    this.refDate = refDate;
    this.index = index;
    this.text = text;
    this.start = start || new results_ParsingComponents(this.refDate);
    this.end = end;
  }

  _createClass(ParsingResult, [{
    key: "clone",
    value: function clone() {
      var result = new ParsingResult(this.refDate, this.index, this.text);
      result.start = this.start ? this.start.clone() : null;
      result.end = this.end ? this.end.clone() : null;
      return result;
    }
  }, {
    key: "date",
    value: function date() {
      return this.start.date();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[ParsingResult {index: ".concat(this.index, ", text: '").concat(this.text, "', ...}]");
    }
  }]);

  return ParsingResult;
}();
// CONCATENATED MODULE: ./src/locales/en/parsers/ENTimeUnitDeadlineFormatParser.ts
function ENTimeUnitDeadlineFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENTimeUnitDeadlineFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENTimeUnitDeadlineFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENTimeUnitDeadlineFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENTimeUnitDeadlineFormatParser_defineProperties(Constructor, staticProps); return Constructor; }



var PATTERN = new RegExp("(?<=\\W|^)" + "(?:within|in)\\s*" + '(' + TIME_UNITS_PATTERN + ')' + "(?=\\W|$)", 'i');
var STRICT_PATTERN = new RegExp('(?<=\\W|^)' + "(?:within|in)\\s*" + '(' + TIME_UNITS_PATTERN + ')' + "(?=\\W|$)", 'i');

var ENTimeUnitDeadlineFormatParser_ENTimeUnitDeadlineFormatParser = /*#__PURE__*/function () {
  function ENTimeUnitDeadlineFormatParser(strictMode) {
    ENTimeUnitDeadlineFormatParser_classCallCheck(this, ENTimeUnitDeadlineFormatParser);

    this.strictMode = strictMode;
  }

  ENTimeUnitDeadlineFormatParser_createClass(ENTimeUnitDeadlineFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return this.strictMode ? STRICT_PATTERN : PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var timeUnits = parseTimeUnits(match[1]);
      return results_ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
  }]);

  return ENTimeUnitDeadlineFormatParser;
}();


// CONCATENATED MODULE: ./src/calculation/yearCalculation.ts

function findYearClosestToRef(refDate, day, month) {
  //Find the most appropriated year
  var refMoment = dayjs_min_default()(refDate);
  var dateMoment = refMoment;
  dateMoment = dateMoment.month(month - 1);
  dateMoment = dateMoment.date(day);
  dateMoment = dateMoment.year(refMoment.year());
  var nextYear = dateMoment.add(1, 'y');
  var lastYear = dateMoment.add(-1, 'y');

  if (Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
    dateMoment = nextYear;
  } else if (Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
    dateMoment = lastYear;
  }

  return dateMoment.year();
}
// CONCATENATED MODULE: ./src/locales/en/parsers/ENMonthNameLittleEndianParser.ts
function ENMonthNameLittleEndianParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENMonthNameLittleEndianParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENMonthNameLittleEndianParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENMonthNameLittleEndianParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENMonthNameLittleEndianParser_defineProperties(Constructor, staticProps); return Constructor; }






var ENMonthNameLittleEndianParser_PATTERN = new RegExp('(?<=\\W|^)' + '(?:on\\s*?)?' + "(?:(".concat(matchAnyPattern(WEEKDAY_DICTIONARY), ")\\s*,?\\s*)?") + "(".concat(ORDINAL_NUMBER_PATTERN, ")") + '(?:\\s*' + '(?:to|\\-|\\–|until|through|till|\\s)\\s*' + "(".concat(ORDINAL_NUMBER_PATTERN, ")") + ')?' + '(?:-|/|\\s*(?:of)?\\s*)' + '(' + matchAnyPattern(MONTH_DICTIONARY) + ')' + '(?:' + '(?:-|/|,?\\s*)' + "(".concat(YEAR_PATTERN, "(?![^\\s]\\d))") + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 1;
var DATE_GROUP = 2;
var DATE_TO_GROUP = 3;
var MONTH_NAME_GROUP = 4;
var YEAR_GROUP = 5;

var ENMonthNameLittleEndianParser_ENMonthNameLittleEndianParser = /*#__PURE__*/function () {
  function ENMonthNameLittleEndianParser() {
    ENMonthNameLittleEndianParser_classCallCheck(this, ENMonthNameLittleEndianParser);
  }

  ENMonthNameLittleEndianParser_createClass(ENMonthNameLittleEndianParser, [{
    key: "pattern",
    value: function pattern() {
      return ENMonthNameLittleEndianParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      //console.log(match)
      var result = context.createParsingResult(match.index, match[0]);
      var month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
      var day = parseOrdinalNumberPattern(match[DATE_GROUP]);
      result.start.assign('month', month);
      result.start.assign('day', day);

      if (match[WEEKDAY_GROUP]) {
        var weekday = WEEKDAY_DICTIONARY[match[WEEKDAY_GROUP].toLowerCase()];
        result.start.assign('weekday', weekday);
      }

      if (match[YEAR_GROUP]) {
        var yearNumber = parseYear(match[YEAR_GROUP]);
        result.start.assign('year', yearNumber);
      } else {
        var year = findYearClosestToRef(context.refDate, day, month);
        result.start.imply('year', year);
      }

      if (match[DATE_TO_GROUP]) {
        var endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
        result.end = result.start.clone();
        result.end.assign('day', endDate);
      }

      return result;
    }
  }]);

  return ENMonthNameLittleEndianParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENMonthNameMiddleEndianParser.ts
function ENMonthNameMiddleEndianParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENMonthNameMiddleEndianParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENMonthNameMiddleEndianParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENMonthNameMiddleEndianParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENMonthNameMiddleEndianParser_defineProperties(Constructor, staticProps); return Constructor; }






var ENMonthNameMiddleEndianParser_PATTERN = new RegExp('(?<=\\W|^)' + '(?:' + '(?:on\\s*?)?' + "(".concat(matchAnyPattern(WEEKDAY_DICTIONARY), ")") + '\\s*,?\\s*)?' + "(".concat(matchAnyPattern(MONTH_DICTIONARY), ")") + '(?:-|/|\\s*,?\\s*)' + "(".concat(ORDINAL_NUMBER_PATTERN, ")(?!\\s*(?:am|pm))\\s*") + '(?:' + '(?:to|\\-)\\s*' + "(".concat(ORDINAL_NUMBER_PATTERN, ")\\s*") + ')?' + '(?:' + '(?:-|/|\\s*,?\\s*)' + "(".concat(YEAR_PATTERN, ")") + ')?' + '(?=\\W|$)(?!\\:\\d)', 'i');
var ENMonthNameMiddleEndianParser_WEEKDAY_GROUP = 1;
var ENMonthNameMiddleEndianParser_MONTH_NAME_GROUP = 2;
var ENMonthNameMiddleEndianParser_DATE_GROUP = 3;
var ENMonthNameMiddleEndianParser_DATE_TO_GROUP = 4;
var ENMonthNameMiddleEndianParser_YEAR_GROUP = 5;
/**
 * The parser for parsing US's date format that begin with month's name.
 *  - January 13
 *  - January 13, 2012
 *  - January 13 - 15, 2012
 *  - Tuesday, January 13, 2012
 * Note: Watch out for:
 *  - January 12:00
 *  - January 12.44
 *  - January 1222344
 */

var ENMonthNameMiddleEndianParser_ENMonthNameMiddleEndianParser = /*#__PURE__*/function () {
  function ENMonthNameMiddleEndianParser() {
    ENMonthNameMiddleEndianParser_classCallCheck(this, ENMonthNameMiddleEndianParser);
  }

  ENMonthNameMiddleEndianParser_createClass(ENMonthNameMiddleEndianParser, [{
    key: "pattern",
    value: function pattern() {
      return ENMonthNameMiddleEndianParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var month = MONTH_DICTIONARY[match[ENMonthNameMiddleEndianParser_MONTH_NAME_GROUP].toLowerCase()];
      var day = parseOrdinalNumberPattern(match[ENMonthNameMiddleEndianParser_DATE_GROUP]);
      var components = context.createParsingComponents({
        'day': day,
        'month': month
      });

      if (match[ENMonthNameMiddleEndianParser_YEAR_GROUP]) {
        var year = parseYear(match[ENMonthNameMiddleEndianParser_YEAR_GROUP]);
        components.assign('year', year);
      } else {
        var _year = findYearClosestToRef(context.refDate, day, month);

        components.imply('year', _year);
      } // Weekday component


      if (match[ENMonthNameMiddleEndianParser_WEEKDAY_GROUP]) {
        var weekday = WEEKDAY_DICTIONARY[match[ENMonthNameMiddleEndianParser_WEEKDAY_GROUP].toLowerCase()];
        components.assign('weekday', weekday);
      }

      if (!match[ENMonthNameMiddleEndianParser_DATE_TO_GROUP]) {
        return components;
      } // Text can be 'range' value. Such as 'January 12 - 13, 2012'


      var endDate = parseOrdinalNumberPattern(match[ENMonthNameMiddleEndianParser_DATE_TO_GROUP]);
      var result = context.createParsingResult(match.index, match[0]);
      result.start = components;
      result.end = components.clone();
      result.end.assign('day', endDate);
      return result;
    }
  }]);

  return ENMonthNameMiddleEndianParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENMonthNameParser.ts
function ENMonthNameParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENMonthNameParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENMonthNameParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENMonthNameParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENMonthNameParser_defineProperties(Constructor, staticProps); return Constructor; }





var ENMonthNameParser_PATTERN = new RegExp('(?<=^|\\D\\s+|[^\\w\\s])' + "(".concat(matchAnyPattern(MONTH_DICTIONARY), ")") + '\\s*' + '(?:' + "[,-]?\\s*(".concat(YEAR_PATTERN, ")?") + ')?' + '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');
var ENMonthNameParser_MONTH_NAME_GROUP = 1;
var ENMonthNameParser_YEAR_GROUP = 2;
/**
 * The parser for parsing month name and year.
 * - January, 2012
 * - January 2012
 * - January
 */

var ENMonthNameParser_ENMonthNameParser = /*#__PURE__*/function () {
  function ENMonthNameParser() {
    ENMonthNameParser_classCallCheck(this, ENMonthNameParser);
  }

  ENMonthNameParser_createClass(ENMonthNameParser, [{
    key: "pattern",
    value: function pattern() {
      return ENMonthNameParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      if (match[0].length <= 3) {
        return null;
      }

      var components = context.createParsingComponents();
      components.imply('day', 1);
      var monthName = match[ENMonthNameParser_MONTH_NAME_GROUP];
      var month = MONTH_DICTIONARY[monthName.toLowerCase()];
      components.assign('month', month);

      if (match[ENMonthNameParser_YEAR_GROUP]) {
        var year = parseYear(match[ENMonthNameParser_YEAR_GROUP]);
        components.assign('year', year);
      } else {
        var _year = findYearClosestToRef(context.refDate, 1, month);

        components.imply('year', _year);
      }

      return components;
    }
  }]);

  return ENMonthNameParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENSlashDateFormatParser.ts
function ENSlashDateFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENSlashDateFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENSlashDateFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENSlashDateFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENSlashDateFormatParser_defineProperties(Constructor, staticProps); return Constructor; }




var ENSlashDateFormatParser_PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:on\\s*?)?' + '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' + '\\s*\\,?\\s*' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\\s*\\,?\\s*|[0-9]{2}\\s*\\,?\\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'sunday': 0,
  'sun': 0,
  'monday': 1,
  'mon': 1,
  'tuesday': 2,
  'wednesday': 3,
  'wed': 3,
  'thursday': 4,
  'thur': 4,
  'friday': 5,
  'fri': 5,
  'saturday': 6,
  'sat': 6
};
var OPENING_GROUP = 1;
var ENDING_GROUP = 6;
var ENSlashDateFormatParser_WEEKDAY_GROUP = 2;
var FIRST_NUMBERS_GROUP = 3;
var SECOND_NUMBERS_GROUP = 4;
var ENSlashDateFormatParser_YEAR_GROUP = 5;

var ENSlashDateFormatParser_ENSlashDateFormatParser = /*#__PURE__*/function () {
  function ENSlashDateFormatParser(littleEndian) {
    ENSlashDateFormatParser_classCallCheck(this, ENSlashDateFormatParser);

    this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
    this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
  }

  ENSlashDateFormatParser_createClass(ENSlashDateFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return ENSlashDateFormatParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      if (match[OPENING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
        // Long skip, if there is some overlapping like:
        // XX[/YY/ZZ]
        // [XX/YY/]ZZ
        match.index += match[0].length;
        return;
      }

      var index = match.index + match[OPENING_GROUP].length;
      var text = match[0].substr(match[OPENING_GROUP].length, match[0].length - match[ENDING_GROUP].length); // '1.12', '1.12.12' is more like a version numbers

      if (text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
        return;
      } // MM/dd -> OK
      // MM.dd -> NG


      if (!match[ENSlashDateFormatParser_YEAR_GROUP] && match[0].indexOf('/') < 0) {
        return;
      }

      var result = context.createParsingResult(index, text);
      var month = parseInt(match[this.groupNumberMonth]);
      var day = parseInt(match[this.groupNumberDay]);

      if (month < 1 || month > 12) {
        if (month > 12) {
          if (day >= 1 && day <= 12 && month <= 31) {
            var _ref = [month, day];
            day = _ref[0];
            month = _ref[1];
          } else {
            return null;
          }
        }
      }

      if (day < 1 || day > 31) {
        return null;
      }

      result.start.assign('day', day);
      result.start.assign('month', month);

      if (match[ENSlashDateFormatParser_YEAR_GROUP]) {
        var year = parseYear(match[ENSlashDateFormatParser_YEAR_GROUP]) || dayjs_min_default()(context.refDate).year();
        result.start.assign('year', year);
      } else {
        var _year = findYearClosestToRef(context.refDate, day, month);

        result.start.imply('year', _year);
      } //Day of week


      if (match[ENSlashDateFormatParser_WEEKDAY_GROUP]) {
        result.start.assign('weekday', DAYS_OFFSET[match[ENSlashDateFormatParser_WEEKDAY_GROUP].toLowerCase()]);
      }

      return result;
    }
  }]);

  return ENSlashDateFormatParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENSlashDateFormatStartWithYearParser.ts
function ENSlashDateFormatStartWithYearParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENSlashDateFormatStartWithYearParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENSlashDateFormatStartWithYearParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENSlashDateFormatStartWithYearParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENSlashDateFormatStartWithYearParser_defineProperties(Constructor, staticProps); return Constructor; }



/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date.
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/

var ENSlashDateFormatStartWithYearParser_PATTERN = new RegExp('(?<=\\W|^)' + '([0-9]{4})[\\.\\/]' + '(?:(' + matchAnyPattern(MONTH_DICTIONARY) + ')|([0-9]{1,2}))[\\.\\/]' + '([0-9]{1,2})' + '(?=\\W|$)', 'i');
var YEAR_NUMBER_GROUP = 1;
var ENSlashDateFormatStartWithYearParser_MONTH_NAME_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;

var ENSlashDateFormatStartWithYearParser_ENSlashDateFormatStartWithYearParser = /*#__PURE__*/function () {
  function ENSlashDateFormatStartWithYearParser() {
    ENSlashDateFormatStartWithYearParser_classCallCheck(this, ENSlashDateFormatStartWithYearParser);
  }

  ENSlashDateFormatStartWithYearParser_createClass(ENSlashDateFormatStartWithYearParser, [{
    key: "pattern",
    value: function pattern() {
      return ENSlashDateFormatStartWithYearParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var month = match[MONTH_NUMBER_GROUP] ? parseInt(match[MONTH_NUMBER_GROUP]) : MONTH_DICTIONARY[match[ENSlashDateFormatStartWithYearParser_MONTH_NAME_GROUP].toLowerCase()];
      var year = parseInt(match[YEAR_NUMBER_GROUP]);
      var day = parseInt(match[DATE_NUMBER_GROUP]);
      return {
        'day': day,
        'month': month,
        'year': year
      };
    }
  }]);

  return ENSlashDateFormatStartWithYearParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENSlashMonthFormatParser.ts
function ENSlashMonthFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENSlashMonthFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENSlashMonthFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENSlashMonthFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENSlashMonthFormatParser_defineProperties(Constructor, staticProps); return Constructor; }

var ENSlashMonthFormatParser_PATTERN = new RegExp('(?<=^|[^\\d/]\\s+|[^\\w\\s])' + '([0-9]|0[1-9]|1[012])/([0-9]{4})' + '(?=[^\\d/]|$)', 'i');
var MONTH_GROUP = 1;
var ENSlashMonthFormatParser_YEAR_GROUP = 2;
/**
 * Month/Year date format with slash "/" (also "-" and ".") between numbers
 * - 11/05
 * - 06/2005
 */

var ENSlashMonthFormatParser = /*#__PURE__*/function () {
  function ENSlashMonthFormatParser() {
    ENSlashMonthFormatParser_classCallCheck(this, ENSlashMonthFormatParser);
  }

  ENSlashMonthFormatParser_createClass(ENSlashMonthFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return ENSlashMonthFormatParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var year = parseInt(match[ENSlashMonthFormatParser_YEAR_GROUP]);
      var month = parseInt(match[MONTH_GROUP]);
      return context.createParsingComponents().imply('day', 1).assign('month', month).assign('year', year);
    }
  }]);

  return ENSlashMonthFormatParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENTimeExpressionParser.ts
function ENTimeExpressionParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENTimeExpressionParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENTimeExpressionParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENTimeExpressionParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENTimeExpressionParser_defineProperties(Constructor, staticProps); return Constructor; }



var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:at|from)\\s*)??" + "(\\d{1,4}|noon|midnight)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?|o\\W*clock))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|to|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?|o\\W*clock|at night))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var MILLI_SECOND_GROUP = 5;
var AM_PM_HOUR_GROUP = 6;

var ENTimeExpressionParser_ENTimeExpressionParser = /*#__PURE__*/function () {
  function ENTimeExpressionParser() {
    ENTimeExpressionParser_classCallCheck(this, ENTimeExpressionParser);
  }

  ENTimeExpressionParser_createClass(ENTimeExpressionParser, [{
    key: "pattern",
    value: function pattern() {
      return FIRST_REG_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var refDate = dayjs_min_default()(context.refDate);
      var result = context.createParsingResult(match.index + match[1].length, match[0].substring(match[1].length));

      if (result.text.match(/^\d$/)) {
        return null;
      }

      result.start.imply('day', refDate.date());
      result.start.imply('month', refDate.month() + 1);
      result.start.imply('year', refDate.year());
      result = ENTimeExpressionParser.extractStartTimeComponent(result.clone(), match);

      if (!result) {
        return null;
      }

      var remainingText = context.text.substring(match.index + match[0].length);
      match = SECOND_REG_PATTERN.exec(remainingText);

      if (!match) {
        return result;
      } // Pattern "YY.YY -XXXX" is more like timezone offset


      if (match[0].match(/^\s*([+-])\s*\d{3,4}$/)) {
        return result;
      }

      var newResult = ENTimeExpressionParser.extractEndTimeComponent(result.clone(), match);
      return newResult ? newResult : result;
    }
  }], [{
    key: "extractStartTimeComponent",
    value: function extractStartTimeComponent(result, match) {
      var hour = 0;
      var minute = 0;
      var meridiem = null; // ----- Hours

      if (match[HOUR_GROUP].toLowerCase() == "noon") {
        meridiem = Meridiem.PM;
        hour = 12;
      } else if (match[HOUR_GROUP].toLowerCase() == "midnight") {
        meridiem = Meridiem.AM;
        hour = 0;
      } else {
        hour = parseInt(match[HOUR_GROUP]);
      } // ----- Minutes


      if (match[MINUTE_GROUP] != null) {
        minute = parseInt(match[MINUTE_GROUP]);
      } else if (hour > 100) {
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }

      if (minute >= 60 || hour > 24) {
        return null;
      }

      if (hour >= 12) {
        meridiem = Meridiem.PM;
      } // ----- AM & PM


      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12) return null;
        var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

        if (ampm == "a") {
          meridiem = Meridiem.AM;

          if (hour == 12) {
            hour = 0;
          }
        }

        if (ampm == "p") {
          meridiem = Meridiem.PM;

          if (hour != 12) {
            hour += 12;
          }
        }
      }

      result.start.assign('hour', hour);
      result.start.assign('minute', minute);

      if (meridiem !== null) {
        result.start.assign('meridiem', meridiem);
      } else {
        if (hour < 12) {
          result.start.imply('meridiem', Meridiem.AM);
        } else {
          result.start.imply('meridiem', Meridiem.PM);
        }
      } // ----- Millisecond


      if (match[MILLI_SECOND_GROUP] != null) {
        var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
        if (millisecond >= 1000) return null;
        result.start.assign('millisecond', millisecond);
      } // ----- Second


      if (match[SECOND_GROUP] != null) {
        var second = parseInt(match[SECOND_GROUP]);
        if (second >= 60) return null;
        result.start.assign('second', second);
      }

      return result;
    }
  }, {
    key: "extractEndTimeComponent",
    value: function extractEndTimeComponent(result, match) {
      result.end = result.start.clone(); // ----- Millisecond

      if (match[MILLI_SECOND_GROUP] != null) {
        var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
        if (millisecond >= 1000) return null;
        result.end.assign('millisecond', millisecond);
      } // ----- Second


      if (match[SECOND_GROUP] != null) {
        var second = parseInt(match[SECOND_GROUP]);
        if (second >= 60) return null;
        result.end.assign('second', second);
      }

      var hour = parseInt(match[HOUR_GROUP]);
      var minute = 0;
      var meridiem = -1; // ----- Minute

      if (match[MINUTE_GROUP] != null) {
        minute = parseInt(match[MINUTE_GROUP]);
      } else if (hour > 100) {
        minute = hour % 100;
        hour = Math.floor(hour / 100);
      }

      if (minute >= 60 || hour > 24) {
        return null;
      }

      if (hour >= 12) {
        meridiem = Meridiem.PM;
      } // ----- AM & PM


      if (match[AM_PM_HOUR_GROUP] != null) {
        if (hour > 12) {
          return null;
        }

        var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

        if (ampm == "a") {
          meridiem = Meridiem.AM;

          if (hour == 12) {
            hour = 0;

            if (!result.end.isCertain('day')) {
              result.end.imply('day', result.end.get('day') + 1);
            }
          }
        }

        if (ampm == "p") {
          meridiem = Meridiem.PM;
          if (hour != 12) hour += 12;
        }

        if (!result.start.isCertain('meridiem')) {
          if (meridiem == Meridiem.AM) {
            result.start.imply('meridiem', Meridiem.AM);

            if (result.start.get('hour') == 12) {
              result.start.assign('hour', 0);
            }
          } else {
            result.start.imply('meridiem', Meridiem.PM);

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
        var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == Meridiem.PM;

        if (startAtPM && result.start.get('hour') > hour) {
          // 10pm - 1 (am)
          result.end.imply('meridiem', Meridiem.AM);
        } else if (hour > 12) {
          result.end.imply('meridiem', Meridiem.PM);
        }
      }

      if (result.end.date().getTime() < result.start.date().getTime()) {
        result.end.imply('day', result.end.get('day') + 1);
      }

      return result;
    }
  }]);

  return ENTimeExpressionParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENTimeUnitAgoFormatParser.ts
function ENTimeUnitAgoFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENTimeUnitAgoFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENTimeUnitAgoFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENTimeUnitAgoFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENTimeUnitAgoFormatParser_defineProperties(Constructor, staticProps); return Constructor; }



var ENTimeUnitAgoFormatParser_PATTERN = new RegExp('' + '(?<=\\W|^)' + '(?:within\\s*)?' + '(' + TIME_UNITS_PATTERN + ')' + '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');
var ENTimeUnitAgoFormatParser_STRICT_PATTERN = new RegExp('' + '(?<=\\W|^)' + '(?:within\\s*)?' + '(' + TIME_UNITS_PATTERN + ')' + 'ago(?=(?:\\W|$))', 'i');

var ENTimeUnitAgoFormatParser_ENTimeUnitAgoFormatParser = /*#__PURE__*/function () {
  function ENTimeUnitAgoFormatParser(strictMode) {
    ENTimeUnitAgoFormatParser_classCallCheck(this, ENTimeUnitAgoFormatParser);

    this.strictMode = strictMode;
  }

  ENTimeUnitAgoFormatParser_createClass(ENTimeUnitAgoFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return this.strictMode ? ENTimeUnitAgoFormatParser_STRICT_PATTERN : ENTimeUnitAgoFormatParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var fragments = parseTimeUnits(match[1]);

      for (var key in fragments) {
        fragments[key] = -fragments[key];
      }

      return results_ParsingComponents.createRelativeFromRefDate(context.refDate, fragments);
    }
  }]);

  return ENTimeUnitAgoFormatParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENTimeUnitLaterFormatParser.ts
function ENTimeUnitLaterFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENTimeUnitLaterFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENTimeUnitLaterFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENTimeUnitLaterFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENTimeUnitLaterFormatParser_defineProperties(Constructor, staticProps); return Constructor; }



var ENTimeUnitLaterFormatParser_PATTERN = new RegExp('' + '(?<=\\W|^)' + '(' + TIME_UNITS_PATTERN + ')' + '(later|after|from now|henceforth|forward|out)' + '(?=(?:\\W|$))', 'i');
var ENTimeUnitLaterFormatParser_STRICT_PATTERN = new RegExp('' + '(?<=\\W|^)' + '(' + TIME_UNITS_PATTERN + ')' + '(later|from now)' + '(?=(?:\\W|$))', 'i');
var GROUP_NUM_SUFFIX = 2;
var GROUP_NUM_TIMEUNITS = 1;

var ENTimeUnitLaterFormatParser_ENTimeUnitLaterFormatParser = /*#__PURE__*/function () {
  function ENTimeUnitLaterFormatParser(strictMode) {
    ENTimeUnitLaterFormatParser_classCallCheck(this, ENTimeUnitLaterFormatParser);

    this.strictMode = strictMode;
  }

  ENTimeUnitLaterFormatParser_createClass(ENTimeUnitLaterFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return this.strictMode ? ENTimeUnitLaterFormatParser_STRICT_PATTERN : ENTimeUnitLaterFormatParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var suffix = match[GROUP_NUM_SUFFIX].toLowerCase().trim();

      if (!suffix) {
        return null;
      }

      var fragments = parseTimeUnits(match[GROUP_NUM_TIMEUNITS]);
      return results_ParsingComponents.createRelativeFromRefDate(context.refDate, fragments);
    }
  }]);

  return ENTimeUnitLaterFormatParser;
}();


// CONCATENATED MODULE: ./src/common/abstractRefiners.ts
function abstractRefiners_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function abstractRefiners_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function abstractRefiners_createClass(Constructor, protoProps, staticProps) { if (protoProps) abstractRefiners_defineProperties(Constructor.prototype, protoProps); if (staticProps) abstractRefiners_defineProperties(Constructor, staticProps); return Constructor; }

var Filter = /*#__PURE__*/function () {
  function Filter() {
    abstractRefiners_classCallCheck(this, Filter);
  }

  abstractRefiners_createClass(Filter, [{
    key: "refine",
    value: function refine(context, results) {
      var _this = this;

      return results.filter(function (r) {
        return _this.isValid(context, r);
      });
    }
  }]);

  return Filter;
}();
var MergingRefiner = /*#__PURE__*/function () {
  function MergingRefiner() {
    abstractRefiners_classCallCheck(this, MergingRefiner);
  }

  abstractRefiners_createClass(MergingRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      var _this2 = this;

      if (results.length < 2) {
        return results;
      }

      var mergedResults = [];
      var curResult = results[0];
      var nextResult = null;

      for (var i = 1; i < results.length; i++) {
        nextResult = results[i];

        var _textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);

        if (!this.shouldMergeResults(_textBetween, curResult, nextResult, context)) {
          mergedResults.push(curResult);
          curResult = nextResult;
        } else {
          (function () {
            var left = curResult;
            var right = nextResult;

            var mergedResult = _this2.mergeResults(_textBetween, left, right, context);

            context.debug(function () {
              console.log("".concat(_this2.constructor.name, " merged ").concat(left, " and ").concat(right, " into ").concat(mergedResult));
            });
            curResult = mergedResult;
          })();
        }
      }

      if (curResult != null) {
        mergedResults.push(curResult);
      }

      return mergedResults;
    }
  }]);

  return MergingRefiner;
}();
// CONCATENATED MODULE: ./src/common/refiners/AbstractMergeDateRangeRefiner.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function AbstractMergeDateRangeRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AbstractMergeDateRangeRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AbstractMergeDateRangeRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) AbstractMergeDateRangeRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) AbstractMergeDateRangeRefiner_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
  
*/


var AbstractMergeDateRangeRefiner = /*#__PURE__*/function (_MergingRefiner) {
  _inherits(AbstractMergeDateRangeRefiner, _MergingRefiner);

  var _super = _createSuper(AbstractMergeDateRangeRefiner);

  function AbstractMergeDateRangeRefiner() {
    AbstractMergeDateRangeRefiner_classCallCheck(this, AbstractMergeDateRangeRefiner);

    return _super.apply(this, arguments);
  }

  AbstractMergeDateRangeRefiner_createClass(AbstractMergeDateRangeRefiner, [{
    key: "shouldMergeResults",
    value: function shouldMergeResults(textBetween, currentResult, nextResult) {
      return !currentResult.end && !nextResult.end && textBetween.match(this.patternBetween()) != null;
    }
  }, {
    key: "mergeResults",
    value: function mergeResults(textBetween, fromResult, toResult) {
      if (!fromResult.start.isOnlyWeekdayComponent() && !toResult.start.isOnlyWeekdayComponent()) {
        toResult.start.getCertainComponents().forEach(function (key) {
          if (!fromResult.start.isCertain(key)) {
            fromResult.start.assign(key, toResult.start.get(key));
          }
        });
        fromResult.start.getCertainComponents().forEach(function (key) {
          if (!toResult.start.isCertain(key)) {
            toResult.start.assign(key, fromResult.start.get(key));
          }
        });
      }

      if (fromResult.start.date().getTime() > toResult.start.date().getTime()) {
        var fromMoment = fromResult.start.dayjs();
        var toMoment = toResult.start.dayjs();

        if (fromResult.start.isOnlyWeekdayComponent() && fromMoment.add(-7, 'days').isBefore(toMoment)) {
          fromMoment = fromMoment.add(-7, 'days');
          fromResult.start.imply('day', fromMoment.date());
          fromResult.start.imply('month', fromMoment.month() + 1);
          fromResult.start.imply('year', fromMoment.year());
        } else if (toResult.start.isOnlyWeekdayComponent() && toMoment.add(7, 'days').isAfter(fromMoment)) {
          toMoment = toMoment.add(7, 'days');
          toResult.start.imply('day', toMoment.date());
          toResult.start.imply('month', toMoment.month() + 1);
          toResult.start.imply('year', toMoment.year());
        } else {
          var _ref = [fromResult, toResult];
          toResult = _ref[0];
          fromResult = _ref[1];
        }
      }

      var result = fromResult.clone();
      result.start = fromResult.start;
      result.end = toResult.start;
      result.index = Math.min(fromResult.index, toResult.index);

      if (fromResult.index < toResult.index) {
        result.text = fromResult.text + textBetween + toResult.text;
      } else {
        result.text = toResult.text + textBetween + fromResult.text;
      }

      return result;
    }
  }]);

  return AbstractMergeDateRangeRefiner;
}(MergingRefiner);


// CONCATENATED MODULE: ./src/locales/en/refiners/ENMergeDateRangeRefiner.ts
function ENMergeDateRangeRefiner_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ENMergeDateRangeRefiner_typeof = function _typeof(obj) { return typeof obj; }; } else { ENMergeDateRangeRefiner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ENMergeDateRangeRefiner_typeof(obj); }

function ENMergeDateRangeRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENMergeDateRangeRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENMergeDateRangeRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENMergeDateRangeRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENMergeDateRangeRefiner_defineProperties(Constructor, staticProps); return Constructor; }

function ENMergeDateRangeRefiner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ENMergeDateRangeRefiner_setPrototypeOf(subClass, superClass); }

function ENMergeDateRangeRefiner_setPrototypeOf(o, p) { ENMergeDateRangeRefiner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ENMergeDateRangeRefiner_setPrototypeOf(o, p); }

function ENMergeDateRangeRefiner_createSuper(Derived) { var hasNativeReflectConstruct = ENMergeDateRangeRefiner_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ENMergeDateRangeRefiner_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ENMergeDateRangeRefiner_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ENMergeDateRangeRefiner_possibleConstructorReturn(this, result); }; }

function ENMergeDateRangeRefiner_possibleConstructorReturn(self, call) { if (call && (ENMergeDateRangeRefiner_typeof(call) === "object" || typeof call === "function")) { return call; } return ENMergeDateRangeRefiner_assertThisInitialized(self); }

function ENMergeDateRangeRefiner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ENMergeDateRangeRefiner_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ENMergeDateRangeRefiner_getPrototypeOf(o) { ENMergeDateRangeRefiner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ENMergeDateRangeRefiner_getPrototypeOf(o); }

/*
  
*/

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide English connecting phases
 * - 2020-02-13 [to] 2020-02-13
 * - Wednesday [-] Friday
 */

var ENMergeDateRangeRefiner = /*#__PURE__*/function (_AbstractMergeDateRan) {
  ENMergeDateRangeRefiner_inherits(ENMergeDateRangeRefiner, _AbstractMergeDateRan);

  var _super = ENMergeDateRangeRefiner_createSuper(ENMergeDateRangeRefiner);

  function ENMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner_classCallCheck(this, ENMergeDateRangeRefiner);

    return _super.apply(this, arguments);
  }

  ENMergeDateRangeRefiner_createClass(ENMergeDateRangeRefiner, [{
    key: "patternBetween",
    value: function patternBetween() {
      return /^\s*(to|-)\s*$/i;
    }
  }]);

  return ENMergeDateRangeRefiner;
}(AbstractMergeDateRangeRefiner);


// CONCATENATED MODULE: ./src/calculation/mergingCalculation.ts

function mergeDateTimeResult(dateResult, timeResult) {
  var result = dateResult.clone();
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  result.start = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

    if (dateResult.end == null && endDateTime.date().getTime() < result.start.date().getTime()) {
      // Ex. 9pm - 1am
      if (endDateTime.isCertain('day')) {
        endDateTime.assign('day', endDateTime.get('day') + 1);
      } else {
        endDateTime.imply('day', endDateTime.get('day') + 1);
      }
    }

    result.end = endDateTime;
  }

  return result;
}
function mergeDateTimeComponent(dateComponent, timeComponent) {
  var dateTimeComponent = dateComponent.clone();

  if (timeComponent.isCertain('hour')) {
    dateTimeComponent.assign('hour', timeComponent.get('hour'));
    dateTimeComponent.assign('minute', timeComponent.get('minute'));

    if (timeComponent.isCertain('second')) {
      dateTimeComponent.assign('second', timeComponent.get('second'));

      if (timeComponent.isCertain('millisecond')) {
        dateTimeComponent.assign('millisecond', timeComponent.get('millisecond'));
      } else {
        dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
      }
    } else {
      dateTimeComponent.imply('second', timeComponent.get('second'));
      dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
    }
  } else {
    dateTimeComponent.imply('hour', timeComponent.get('hour'));
    dateTimeComponent.imply('minute', timeComponent.get('minute'));
    dateTimeComponent.imply('second', timeComponent.get('second'));
    dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
  }

  if (timeComponent.isCertain('timezoneOffset')) {
    dateTimeComponent.assign('timezoneOffset', timeComponent.get('timezoneOffset'));
  }

  if (timeComponent.isCertain('meridiem')) {
    dateTimeComponent.assign('meridiem', timeComponent.get('meridiem'));
  } else if (timeComponent.get('meridiem') != null && dateTimeComponent.get('meridiem') == null) {
    dateTimeComponent.imply('meridiem', timeComponent.get('meridiem'));
  }

  if (dateTimeComponent.get('meridiem') == Meridiem.PM && dateTimeComponent.get('hour') < 12) {
    if (timeComponent.isCertain('hour')) {
      dateTimeComponent.assign('hour', dateTimeComponent.get('hour') + 12);
    } else {
      dateTimeComponent.imply('hour', dateTimeComponent.get('hour') + 12);
    }
  }

  return dateTimeComponent;
}
// CONCATENATED MODULE: ./src/common/refiners/AbstractMergeDateTimeRefiner.ts
function AbstractMergeDateTimeRefiner_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AbstractMergeDateTimeRefiner_typeof = function _typeof(obj) { return typeof obj; }; } else { AbstractMergeDateTimeRefiner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AbstractMergeDateTimeRefiner_typeof(obj); }

function AbstractMergeDateTimeRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AbstractMergeDateTimeRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AbstractMergeDateTimeRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) AbstractMergeDateTimeRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) AbstractMergeDateTimeRefiner_defineProperties(Constructor, staticProps); return Constructor; }

function AbstractMergeDateTimeRefiner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) AbstractMergeDateTimeRefiner_setPrototypeOf(subClass, superClass); }

function AbstractMergeDateTimeRefiner_setPrototypeOf(o, p) { AbstractMergeDateTimeRefiner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return AbstractMergeDateTimeRefiner_setPrototypeOf(o, p); }

function AbstractMergeDateTimeRefiner_createSuper(Derived) { var hasNativeReflectConstruct = AbstractMergeDateTimeRefiner_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = AbstractMergeDateTimeRefiner_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = AbstractMergeDateTimeRefiner_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return AbstractMergeDateTimeRefiner_possibleConstructorReturn(this, result); }; }

function AbstractMergeDateTimeRefiner_possibleConstructorReturn(self, call) { if (call && (AbstractMergeDateTimeRefiner_typeof(call) === "object" || typeof call === "function")) { return call; } return AbstractMergeDateTimeRefiner_assertThisInitialized(self); }

function AbstractMergeDateTimeRefiner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function AbstractMergeDateTimeRefiner_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function AbstractMergeDateTimeRefiner_getPrototypeOf(o) { AbstractMergeDateTimeRefiner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return AbstractMergeDateTimeRefiner_getPrototypeOf(o); }

/*

*/



var AbstractMergeDateTimeRefiner_ENMergeDateTimeRefiner = /*#__PURE__*/function (_MergingRefiner) {
  AbstractMergeDateTimeRefiner_inherits(ENMergeDateTimeRefiner, _MergingRefiner);

  var _super = AbstractMergeDateTimeRefiner_createSuper(ENMergeDateTimeRefiner);

  function ENMergeDateTimeRefiner() {
    AbstractMergeDateTimeRefiner_classCallCheck(this, ENMergeDateTimeRefiner);

    return _super.apply(this, arguments);
  }

  AbstractMergeDateTimeRefiner_createClass(ENMergeDateTimeRefiner, [{
    key: "shouldMergeResults",
    value: function shouldMergeResults(textBetween, currentResult, nextResult) {
      return (currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime() || nextResult.start.isOnlyDate() && currentResult.start.isOnlyTime()) && textBetween.match(this.patternBetween()) != null;
    }
  }, {
    key: "mergeResults",
    value: function mergeResults(textBetween, currentResult, nextResult) {
      var result = currentResult.start.isOnlyDate() ? mergeDateTimeResult(currentResult, nextResult) : mergeDateTimeResult(nextResult, currentResult);
      result.index = currentResult.index;
      result.text = currentResult.text + textBetween + nextResult.text;
      return result;
    }
  }]);

  return ENMergeDateTimeRefiner;
}(MergingRefiner);


// CONCATENATED MODULE: ./src/locales/en/refiners/ENMergeDateTimeRefiner.ts
function ENMergeDateTimeRefiner_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ENMergeDateTimeRefiner_typeof = function _typeof(obj) { return typeof obj; }; } else { ENMergeDateTimeRefiner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ENMergeDateTimeRefiner_typeof(obj); }

function ENMergeDateTimeRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENMergeDateTimeRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENMergeDateTimeRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENMergeDateTimeRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENMergeDateTimeRefiner_defineProperties(Constructor, staticProps); return Constructor; }

function ENMergeDateTimeRefiner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ENMergeDateTimeRefiner_setPrototypeOf(subClass, superClass); }

function ENMergeDateTimeRefiner_setPrototypeOf(o, p) { ENMergeDateTimeRefiner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ENMergeDateTimeRefiner_setPrototypeOf(o, p); }

function ENMergeDateTimeRefiner_createSuper(Derived) { var hasNativeReflectConstruct = ENMergeDateTimeRefiner_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ENMergeDateTimeRefiner_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ENMergeDateTimeRefiner_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ENMergeDateTimeRefiner_possibleConstructorReturn(this, result); }; }

function ENMergeDateTimeRefiner_possibleConstructorReturn(self, call) { if (call && (ENMergeDateTimeRefiner_typeof(call) === "object" || typeof call === "function")) { return call; } return ENMergeDateTimeRefiner_assertThisInitialized(self); }

function ENMergeDateTimeRefiner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ENMergeDateTimeRefiner_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ENMergeDateTimeRefiner_getPrototypeOf(o) { ENMergeDateTimeRefiner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ENMergeDateTimeRefiner_getPrototypeOf(o); }


/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 * This implementation should provide English connecting phases
 * - 2020-02-13 [at] 6pm
 * - Tomorrow [after] 7am
 */

var ENMergeDateTimeRefiner_ENMergeDateTimeRefiner = /*#__PURE__*/function (_AbstractMergeDateTim) {
  ENMergeDateTimeRefiner_inherits(ENMergeDateTimeRefiner, _AbstractMergeDateTim);

  var _super = ENMergeDateTimeRefiner_createSuper(ENMergeDateTimeRefiner);

  function ENMergeDateTimeRefiner() {
    ENMergeDateTimeRefiner_classCallCheck(this, ENMergeDateTimeRefiner);

    return _super.apply(this, arguments);
  }

  ENMergeDateTimeRefiner_createClass(ENMergeDateTimeRefiner, [{
    key: "patternBetween",
    value: function patternBetween() {
      return new RegExp("^\\s*(T|at|after|before|on|of|,|-)?\\s*$");
    }
  }]);

  return ENMergeDateTimeRefiner;
}(AbstractMergeDateTimeRefiner_ENMergeDateTimeRefiner);


// CONCATENATED MODULE: ./src/common/refiners/ExtractTimezoneAbbrRefiner.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ExtractTimezoneAbbrRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ExtractTimezoneAbbrRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ExtractTimezoneAbbrRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) ExtractTimezoneAbbrRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) ExtractTimezoneAbbrRefiner_defineProperties(Constructor, staticProps); return Constructor; }

// Map ABBR -> Offset in minute
var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", 'i');
var DEFAULT_TIMEZONE_ABBR_MAP = {
  "ACDT": 630,
  "ACST": 570,
  "ADT": -180,
  "AEDT": 660,
  "AEST": 600,
  "AFT": 270,
  "AKDT": -480,
  "AKST": -540,
  "ALMT": 360,
  "AMST": -180,
  "AMT": -240,
  "ANAST": 720,
  "ANAT": 720,
  "AQTT": 300,
  "ART": -180,
  "AST": -240,
  "AWDT": 540,
  "AWST": 480,
  "AZOST": 0,
  "AZOT": -60,
  "AZST": 300,
  "AZT": 240,
  "BNT": 480,
  "BOT": -240,
  "BRST": -120,
  "BRT": -180,
  "BST": 60,
  "BTT": 360,
  "CAST": 480,
  "CAT": 120,
  "CCT": 390,
  "CDT": -300,
  "CEST": 120,
  "CET": 60,
  "CHADT": 825,
  "CHAST": 765,
  "CKT": -600,
  "CLST": -180,
  "CLT": -240,
  "COT": -300,
  "CST": -360,
  "CVT": -60,
  "CXT": 420,
  "ChST": 600,
  "DAVT": 420,
  "EASST": -300,
  "EAST": -360,
  "EAT": 180,
  "ECT": -300,
  "EDT": -240,
  "EEST": 180,
  "EET": 120,
  "EGST": 0,
  "EGT": -60,
  "EST": -300,
  "ET": -300,
  "FJST": 780,
  "FJT": 720,
  "FKST": -180,
  "FKT": -240,
  "FNT": -120,
  "GALT": -360,
  "GAMT": -540,
  "GET": 240,
  "GFT": -180,
  "GILT": 720,
  "GMT": 0,
  "GST": 240,
  "GYT": -240,
  "HAA": -180,
  "HAC": -300,
  "HADT": -540,
  "HAE": -240,
  "HAP": -420,
  "HAR": -360,
  "HAST": -600,
  "HAT": -90,
  "HAY": -480,
  "HKT": 480,
  "HLV": -210,
  "HNA": -240,
  "HNC": -360,
  "HNE": -300,
  "HNP": -480,
  "HNR": -420,
  "HNT": -150,
  "HNY": -540,
  "HOVT": 420,
  "ICT": 420,
  "IDT": 180,
  "IOT": 360,
  "IRDT": 270,
  "IRKST": 540,
  "IRKT": 540,
  "IRST": 210,
  "IST": 330,
  "JST": 540,
  "KGT": 360,
  "KRAST": 480,
  "KRAT": 480,
  "KST": 540,
  "KUYT": 240,
  "LHDT": 660,
  "LHST": 630,
  "LINT": 840,
  "MAGST": 720,
  "MAGT": 720,
  "MART": -510,
  "MAWT": 300,
  "MDT": -360,
  "MESZ": 120,
  "MEZ": 60,
  "MHT": 720,
  "MMT": 390,
  "MSD": 240,
  "MSK": 240,
  "MST": -420,
  "MUT": 240,
  "MVT": 300,
  "MYT": 480,
  "NCT": 660,
  "NDT": -90,
  "NFT": 690,
  "NOVST": 420,
  "NOVT": 360,
  "NPT": 345,
  "NST": -150,
  "NUT": -660,
  "NZDT": 780,
  "NZST": 720,
  "OMSST": 420,
  "OMST": 420,
  "PDT": -420,
  "PET": -300,
  "PETST": 720,
  "PETT": 720,
  "PGT": 600,
  "PHOT": 780,
  "PHT": 480,
  "PKT": 300,
  "PMDT": -120,
  "PMST": -180,
  "PONT": 660,
  "PST": -480,
  "PT": -480,
  "PWT": 540,
  "PYST": -180,
  "PYT": -240,
  "RET": 240,
  "SAMT": 240,
  "SAST": 120,
  "SBT": 660,
  "SCT": 240,
  "SGT": 480,
  "SRT": -180,
  "SST": -660,
  "TAHT": -600,
  "TFT": 300,
  "TJT": 300,
  "TKT": 780,
  "TLT": 540,
  "TMT": 300,
  "TVT": 720,
  "ULAT": 480,
  "UTC": 0,
  "UYST": -120,
  "UYT": -180,
  "UZT": 300,
  "VET": -210,
  "VLAST": 660,
  "VLAT": 660,
  "VUT": 660,
  "WAST": 120,
  "WAT": 60,
  "WEST": 60,
  "WESZ": 60,
  "WET": 0,
  "WEZ": 0,
  "WFT": 720,
  "WGST": -120,
  "WGT": -180,
  "WIB": 420,
  "WIT": 540,
  "WITA": 480,
  "WST": 780,
  "WT": 0,
  "YAKST": 600,
  "YAKT": 600,
  "YAPT": 600,
  "YEKST": 360,
  "YEKT": 360
};

var ExtractTimezoneAbbrRefiner = /*#__PURE__*/function () {
  function ExtractTimezoneAbbrRefiner(timezoneOverrides) {
    ExtractTimezoneAbbrRefiner_classCallCheck(this, ExtractTimezoneAbbrRefiner);

    this.timezone = _objectSpread(_objectSpread({}, DEFAULT_TIMEZONE_ABBR_MAP), timezoneOverrides);
  }

  ExtractTimezoneAbbrRefiner_createClass(ExtractTimezoneAbbrRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      var timezones = _objectSpread(_objectSpread({}, this.timezone), context.option.timezones);

      results.forEach(function (result) {
        var suffix = context.text.substring(result.index + result.text.length);
        var match = TIMEZONE_NAME_PATTERN.exec(suffix);

        if (match) {
          var timezoneAbbr = match[1].toUpperCase();

          if (timezones[timezoneAbbr] === undefined) {
            return;
          }

          var timezoneOffset = timezones[timezoneAbbr];

          if (!result.start.isCertain('timezoneOffset')) {
            result.start.assign('timezoneOffset', timezoneOffset);
          }

          if (result.end != null && !result.end.isCertain('timezoneOffset')) {
            result.end.assign('timezoneOffset', timezoneOffset);
          }

          result.text += match[0];
        }
      });
      return results;
    }
  }]);

  return ExtractTimezoneAbbrRefiner;
}();


// CONCATENATED MODULE: ./src/common/refiners/ExtractTimezoneOffsetRefiner.ts
function ExtractTimezoneOffsetRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ExtractTimezoneOffsetRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ExtractTimezoneOffsetRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) ExtractTimezoneOffsetRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) ExtractTimezoneOffsetRefiner_defineProperties(Constructor, staticProps); return Constructor; }

/*
  
*/
var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(GMT|UTC)?([+-])(\\d{1,2}):?(\\d{2})", 'i');
var TIMEZONE_OFFSET_SIGN_GROUP = 2;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 3;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 4;

var ExtractTimezoneOffsetRefiner = /*#__PURE__*/function () {
  function ExtractTimezoneOffsetRefiner() {
    ExtractTimezoneOffsetRefiner_classCallCheck(this, ExtractTimezoneOffsetRefiner);
  }

  ExtractTimezoneOffsetRefiner_createClass(ExtractTimezoneOffsetRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      results.forEach(function (result) {
        if (result.start.isCertain('timezoneOffset')) {
          return;
        }

        var suffix = context.text.substring(result.index + result.text.length);
        var match = TIMEZONE_OFFSET_PATTERN.exec(suffix);

        if (!match) {
          return;
        }

        context.debug(function () {
          console.log("Extracting timezone: '".concat(match[0], "' into : ").concat(result));
        });
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
      });
      return results;
    }
  }]);

  return ExtractTimezoneOffsetRefiner;
}();


// CONCATENATED MODULE: ./src/common/refiners/OverlapRemovalRefiner.ts
function OverlapRemovalRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function OverlapRemovalRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function OverlapRemovalRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) OverlapRemovalRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) OverlapRemovalRefiner_defineProperties(Constructor, staticProps); return Constructor; }

/*
  
*/
var OverlapRemovalRefiner = /*#__PURE__*/function () {
  function OverlapRemovalRefiner() {
    OverlapRemovalRefiner_classCallCheck(this, OverlapRemovalRefiner);
  }

  OverlapRemovalRefiner_createClass(OverlapRemovalRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      if (results.length < 2) {
        return results;
      }

      var filteredResults = [];
      var prevResult = results[0];

      for (var i = 1; i < results.length; i++) {
        var result = results[i]; // If overlap, compare the length and discard the shorter one

        if (result.index < prevResult.index + prevResult.text.length) {
          if (result.text.length > prevResult.text.length) {
            prevResult = result;
          }
        } else {
          filteredResults.push(prevResult);
          prevResult = result;
        }
      } // The last one


      if (prevResult != null) {
        filteredResults.push(prevResult);
      }

      return filteredResults;
    }
  }]);

  return OverlapRemovalRefiner;
}();


// CONCATENATED MODULE: ./src/common/refiners/ForwardDateRefiner.ts
function ForwardDateRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ForwardDateRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ForwardDateRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) ForwardDateRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) ForwardDateRefiner_defineProperties(Constructor, staticProps); return Constructor; }

/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/


var ForwardDateRefiner_ForwardDateRefiner = /*#__PURE__*/function () {
  function ForwardDateRefiner() {
    ForwardDateRefiner_classCallCheck(this, ForwardDateRefiner);
  }

  ForwardDateRefiner_createClass(ForwardDateRefiner, [{
    key: "refine",
    value: function refine(context, results) {
      if (!context.option.forwardDate) {
        return results;
      }

      results.forEach(function (result) {
        var refMoment = dayjs_min_default()(context.refDate);

        if (result.start.isOnlyDayMonthComponent() && refMoment.isAfter(result.start.dayjs())) {
          for (var i = 0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
            result.start.imply('year', result.start.get('year') + 1);
            context.debug(function () {
              console.log("Forward yearly adjusted for ".concat(result, " (").concat(result.start, ")"));
            });

            if (result.end && !result.end.isCertain('year')) {
              result.end.imply('year', result.end.get('year') + 1);
              context.debug(function () {
                console.log("Forward yearly adjusted for ".concat(result, " (").concat(result.end, ")"));
              });
            }
          }
        }

        if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
          if (refMoment.day() > result.start.get('weekday')) {
            refMoment = refMoment.day(result.start.get('weekday') + 7);
          } else {
            refMoment = refMoment.day(result.start.get('weekday'));
          }

          result.start.imply('day', refMoment.date());
          result.start.imply('month', refMoment.month() + 1);
          result.start.imply('year', refMoment.year());
          context.debug(function () {
            console.log("Forward weekly adjusted for ".concat(result, " (").concat(result.start, ")"));
          });

          if (result.end && result.end.isOnlyWeekdayComponent()) {
            // Adjust date to the coming week
            if (refMoment.day() > result.end.get('weekday')) {
              refMoment = refMoment.day(result.end.get('weekday') + 7);
            } else {
              refMoment = refMoment.day(result.end.get('weekday'));
            }

            result.end.imply('day', refMoment.date());
            result.end.imply('month', refMoment.month() + 1);
            result.end.imply('year', refMoment.year());
            context.debug(function () {
              console.log("Forward weekly adjusted for ".concat(result, " (").concat(result.end, ")"));
            });
          }
        }
      });
      return results;
    }
  }]);

  return ForwardDateRefiner;
}();


// CONCATENATED MODULE: ./src/common/refiners/UnlikelyFormatFilter.ts
function UnlikelyFormatFilter_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { UnlikelyFormatFilter_typeof = function _typeof(obj) { return typeof obj; }; } else { UnlikelyFormatFilter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return UnlikelyFormatFilter_typeof(obj); }

function UnlikelyFormatFilter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function UnlikelyFormatFilter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function UnlikelyFormatFilter_createClass(Constructor, protoProps, staticProps) { if (protoProps) UnlikelyFormatFilter_defineProperties(Constructor.prototype, protoProps); if (staticProps) UnlikelyFormatFilter_defineProperties(Constructor, staticProps); return Constructor; }

function UnlikelyFormatFilter_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) UnlikelyFormatFilter_setPrototypeOf(subClass, superClass); }

function UnlikelyFormatFilter_setPrototypeOf(o, p) { UnlikelyFormatFilter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return UnlikelyFormatFilter_setPrototypeOf(o, p); }

function UnlikelyFormatFilter_createSuper(Derived) { var hasNativeReflectConstruct = UnlikelyFormatFilter_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = UnlikelyFormatFilter_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = UnlikelyFormatFilter_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return UnlikelyFormatFilter_possibleConstructorReturn(this, result); }; }

function UnlikelyFormatFilter_possibleConstructorReturn(self, call) { if (call && (UnlikelyFormatFilter_typeof(call) === "object" || typeof call === "function")) { return call; } return UnlikelyFormatFilter_assertThisInitialized(self); }

function UnlikelyFormatFilter_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function UnlikelyFormatFilter_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function UnlikelyFormatFilter_getPrototypeOf(o) { UnlikelyFormatFilter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return UnlikelyFormatFilter_getPrototypeOf(o); }



var UnlikelyFormatFilter = /*#__PURE__*/function (_Filter) {
  UnlikelyFormatFilter_inherits(UnlikelyFormatFilter, _Filter);

  var _super = UnlikelyFormatFilter_createSuper(UnlikelyFormatFilter);

  function UnlikelyFormatFilter() {
    UnlikelyFormatFilter_classCallCheck(this, UnlikelyFormatFilter);

    return _super.apply(this, arguments);
  }

  UnlikelyFormatFilter_createClass(UnlikelyFormatFilter, [{
    key: "isValid",
    value: function isValid(context, result) {
      if (result.text.replace(' ', '').match(/^\d*(\.\d*)?$/)) {
        context.debug(function () {
          console.log("Removing unlikely result '".concat(result.text, "'"));
        });
        return false;
      }

      if (!result.start.isValidDate()) {
        context.debug(function () {
          console.log("Removing invalid result: ".concat(result, " (").concat(result.start, ")"));
        });
        return false;
      }

      if (result.end && !result.end.isValidDate()) {
        context.debug(function () {
          console.log("Removing invalid result: ".concat(result, " (").concat(result.end, ")"));
        });
        return false;
      }

      return true;
    }
  }]);

  return UnlikelyFormatFilter;
}(Filter);


// CONCATENATED MODULE: ./src/common/parsers/ISOFormatParser.ts
function ISOFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ISOFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ISOFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ISOFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ISOFormatParser_defineProperties(Constructor, staticProps); return Constructor; }

// ISO 8601
// http://www.w3.org/TR/NOTE-datetime
// - YYYY-MM-DD
// - YYYY-MM-DDThh:mmTZD
// - YYYY-MM-DDThh:mm:ssTZD
// - YYYY-MM-DDThh:mm:ss.sTZD
// - TZD = (Z or +hh:mm or -hh:mm)
var ISOFormatParser_PATTERN = new RegExp('(?<=\\W|^)' + '([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})' + '(?:T' //..
+ '([0-9]{1,2}):([0-9]{1,2})' // hh:mm
+ '(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?' // :ss.s
+ '(?:Z|([+-]\\d{2}):?(\\d{2})?)?' // TZD (Z or ±hh:mm or ±hhmm or ±hh)
+ ')?' //..
+ '(?=\\W|$)', 'i');
var ISOFormatParser_YEAR_NUMBER_GROUP = 1;
var ISOFormatParser_MONTH_NUMBER_GROUP = 2;
var ISOFormatParser_DATE_NUMBER_GROUP = 3;
var HOUR_NUMBER_GROUP = 4;
var MINUTE_NUMBER_GROUP = 5;
var SECOND_NUMBER_GROUP = 6;
var MILLISECOND_NUMBER_GROUP = 7;
var TZD_HOUR_OFFSET_GROUP = 8;
var TZD_MINUTE_OFFSET_GROUP = 9;

var ISOFormatParser = /*#__PURE__*/function () {
  function ISOFormatParser() {
    ISOFormatParser_classCallCheck(this, ISOFormatParser);
  }

  ISOFormatParser_createClass(ISOFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return ISOFormatParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var components = {};
      components['year'] = parseInt(match[ISOFormatParser_YEAR_NUMBER_GROUP]);
      components['month'] = parseInt(match[ISOFormatParser_MONTH_NUMBER_GROUP]);
      components['day'] = parseInt(match[ISOFormatParser_DATE_NUMBER_GROUP]);

      if (match[HOUR_NUMBER_GROUP] != null) {
        components['hour'] = parseInt(match[HOUR_NUMBER_GROUP]);
        components['minute'] = parseInt(match[MINUTE_NUMBER_GROUP]);

        if (match[SECOND_NUMBER_GROUP] != null) {
          components['second'] = parseInt(match[SECOND_NUMBER_GROUP]);
        }

        if (match[MILLISECOND_NUMBER_GROUP] != null) {
          components['millisecond'] = parseInt(match[MILLISECOND_NUMBER_GROUP]);
        }

        if (match[TZD_HOUR_OFFSET_GROUP] == null) {
          components['timezoneOffset'] = 0;
        } else {
          var hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
          var minuteOffset = 0;

          if (match[TZD_MINUTE_OFFSET_GROUP] != null) {
            minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
          }

          var offset = hourOffset * 60;

          if (offset < 0) {
            offset -= minuteOffset;
          } else {
            offset += minuteOffset;
          }

          components['timezoneOffset'] = offset;
        }
      }

      return components;
    }
  }]);

  return ISOFormatParser;
}();


// CONCATENATED MODULE: ./src/configurations.ts






function includeCommonConfiguration(configuration) {
  configuration.parsers.unshift(new ISOFormatParser());
  configuration.refiners.unshift(new ExtractTimezoneAbbrRefiner());
  configuration.refiners.unshift(new ExtractTimezoneOffsetRefiner());
  configuration.refiners.unshift(new OverlapRemovalRefiner());
  configuration.refiners.push(new ForwardDateRefiner_ForwardDateRefiner());
  configuration.refiners.push(new UnlikelyFormatFilter());
  return configuration;
}
// CONCATENATED MODULE: ./src/locales/en/parsers/ENCasualDateParser.ts
function ENCasualDateParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENCasualDateParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENCasualDateParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENCasualDateParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENCasualDateParser_defineProperties(Constructor, staticProps); return Constructor; }




var ENCasualDateParser_ENCasualDateParser = /*#__PURE__*/function () {
  function ENCasualDateParser() {
    ENCasualDateParser_classCallCheck(this, ENCasualDateParser);
  }

  ENCasualDateParser_createClass(ENCasualDateParser, [{
    key: "pattern",
    value: function pattern() {
      return /(?<=\W|^)(now|today|tonight|last\s*night|tomorrow|tmr|yesterday)(?=\W|$)/i;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var targetDate = dayjs_min_default()(context.refDate);
      var lowerText = match[0].toLowerCase();
      var component = context.createParsingComponents();

      if (lowerText == 'tonight') {
        // Normally means this coming midnight
        component.imply('hour', 22);
        component.imply('meridiem', Meridiem.PM);
      } else if (/^tomorrow|^tmr/.test(lowerText)) {
        // Check not "Tomorrow" on late night
        if (targetDate.hour() > 1) {
          targetDate = targetDate.add(1, 'day');
        }
      } else if (/^yesterday/.test(lowerText)) {
        targetDate = targetDate.add(-1, 'day');
      } else if (lowerText.match(/last\s*night/)) {
        component.imply('hour', 0);

        if (targetDate.hour() > 6) {
          targetDate = targetDate.add(-1, 'day');
        }
      } else if (lowerText.match("now")) {
        component.assign('hour', targetDate.hour());
        component.assign('minute', targetDate.minute());
        component.assign('second', targetDate.second());
        component.assign('millisecond', targetDate.millisecond());
      }

      component.assign('day', targetDate.date());
      component.assign('month', targetDate.month() + 1);
      component.assign('year', targetDate.year());
      return component;
    }
  }]);

  return ENCasualDateParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENCasualTimeParser.ts
function ENCasualTimeParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENCasualTimeParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENCasualTimeParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENCasualTimeParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENCasualTimeParser_defineProperties(Constructor, staticProps); return Constructor; }



var ENCasualTimeParser_ENCasualTimeParser = /*#__PURE__*/function () {
  function ENCasualTimeParser() {
    ENCasualTimeParser_classCallCheck(this, ENCasualTimeParser);
  }

  ENCasualTimeParser_createClass(ENCasualTimeParser, [{
    key: "pattern",
    value: function pattern() {
      return /(?<=\W|^)(?:this)?\s*(morning|afternoon|evening|night|noon)(?=\W|$)/i;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var component = context.createParsingComponents();

      switch (match[1].toLowerCase()) {
        case 'afternoon':
          component.imply('meridiem', Meridiem.PM);
          component.imply('hour', 15);
          break;

        case 'evening':
        case 'night':
          component.imply('meridiem', Meridiem.PM);
          component.imply('hour', 20);
          break;

        case 'morning':
          component.imply('meridiem', Meridiem.AM);
          component.imply('hour', 6);
          break;

        case 'noon':
          component.imply('meridiem', Meridiem.AM);
          component.imply('hour', 12);
          break;
      }

      return component;
    }
  }]);

  return ENCasualTimeParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENWeekdayParser.ts
function ENWeekdayParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENWeekdayParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENWeekdayParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENWeekdayParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENWeekdayParser_defineProperties(Constructor, staticProps); return Constructor; }




var ENWeekdayParser_PATTERN = new RegExp('(?<=\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:on\\s*?)?' + '(?:(this|last|past|next)\\s*)?' + "(".concat(matchAnyPattern(WEEKDAY_DICTIONARY), ")") + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(this|last|past|next)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 1;
var ENWeekdayParser_WEEKDAY_GROUP = 2;
var POSTFIX_GROUP = 3;

var ENWeekdayParser_ENWeekdayParser = /*#__PURE__*/function () {
  function ENWeekdayParser() {
    ENWeekdayParser_classCallCheck(this, ENWeekdayParser);
  }

  ENWeekdayParser_createClass(ENWeekdayParser, [{
    key: "pattern",
    value: function pattern() {
      return ENWeekdayParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var dayOfWeek = match[ENWeekdayParser_WEEKDAY_GROUP].toLowerCase();
      var offset = WEEKDAY_DICTIONARY[dayOfWeek];

      if (offset === undefined) {
        return null;
      }

      var prefix = match[PREFIX_GROUP];
      var postfix = match[POSTFIX_GROUP];
      var modifier = prefix || postfix;
      modifier = modifier || '';
      modifier = modifier.toLowerCase();
      var date = this.extractWeekday(context.refDate, offset, modifier);
      return context.createParsingComponents().assign('weekday', offset).imply('day', date.date()).imply('month', date.month() + 1).imply('year', date.year());
    }
  }, {
    key: "extractWeekday",
    value: function extractWeekday(refDate, offset, modifier) {
      var date = dayjs_min_default()(refDate);
      var refOffset = date.day();

      if (modifier == 'last' || modifier == 'past') {
        date = date.day(offset - 7);
      } else if (modifier == 'next') {
        date = date.day(offset + 7);
      } else if (modifier == 'this') {
        date = date.day(offset);
      } else {
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
          date = date.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
          date = date.day(offset + 7);
        } else {
          date = date.day(offset);
        }
      }

      return date;
    }
  }]);

  return ENWeekdayParser;
}();


// CONCATENATED MODULE: ./src/locales/en/parsers/ENRelativeDateFormatParser.ts
function ENRelativeDateFormatParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ENRelativeDateFormatParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ENRelativeDateFormatParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ENRelativeDateFormatParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ENRelativeDateFormatParser_defineProperties(Constructor, staticProps); return Constructor; }



var ENRelativeDateFormatParser_PATTERN = new RegExp('(?<=\\W|^)' + '(this|next|last|past)\\s*' + "(".concat(NUMBER_PATTERN, ")?\\s*") + '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)(?=\\s*)' + '(?=\\W|$)', 'i');
var MODIFIER_WORD_GROUP = 1;
var MULTIPLIER_WORD_GROUP = 2;
var RELATIVE_WORD_GROUP = 3;

var ENRelativeDateFormatParser_ENRelativeDateFormatParser = /*#__PURE__*/function () {
  function ENRelativeDateFormatParser() {
    ENRelativeDateFormatParser_classCallCheck(this, ENRelativeDateFormatParser);
  }

  ENRelativeDateFormatParser_createClass(ENRelativeDateFormatParser, [{
    key: "pattern",
    value: function pattern() {
      return ENRelativeDateFormatParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      if (match[MODIFIER_WORD_GROUP].toLowerCase().match(/^this/)) {
        if (match[MULTIPLIER_WORD_GROUP]) {
          return null;
        }

        return this.extractThisReference(context, match[RELATIVE_WORD_GROUP]);
      }

      var modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
      var parsedNum = match[MULTIPLIER_WORD_GROUP] ? parseNumberPattern(match[MULTIPLIER_WORD_GROUP]) : 1;
      var unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();

      if (unitWord.match(/day|week|month|year/i)) {
        return this.extractDateReference(context, unitWord, parsedNum * modifier);
      } else {
        return this.extractTimeReference(context, unitWord, parsedNum * modifier);
      }
    }
  }, {
    key: "extractTimeReference",
    value: function extractTimeReference(context, timeUnitWord, num) {
      var components = context.createParsingComponents();
      var date = dayjs_min_default()(context.refDate);

      if (timeUnitWord.match(/hour/i)) {
        date = date.add(num, 'hour');
        components.imply('minute', date.minute());
        components.imply('second', date.second());
      } else if (timeUnitWord.match(/min/i)) {
        date = date.add(num, 'minute');
        components.assign('minute', date.minute());
        components.imply('second', date.second());
      } else if (timeUnitWord.match(/second/i)) {
        date = date.add(num, 'second');
        components.assign('second', date.second());
        components.assign('minute', date.minute());
      }

      components.assign('hour', date.hour());
      components.assign('year', date.year());
      components.assign('month', date.month() + 1);
      components.assign('day', date.date());
      return components;
    }
  }, {
    key: "extractDateReference",
    value: function extractDateReference(context, dateUnitWord, num) {
      var components = context.createParsingComponents();
      var date = dayjs_min_default()(context.refDate);

      if (dateUnitWord.match(/day/i)) {
        date = date.add(num, 'd');
        components.assign('year', date.year());
        components.assign('month', date.month() + 1);
        components.assign('day', date.date());
      } else if (dateUnitWord.match(/week/i)) {
        date = date.add(num * 7, 'd'); // We don't know the exact date for next/last week so we imply them

        components.imply('day', date.date());
        components.imply('month', date.month() + 1);
        components.imply('year', date.year());
      } else if (dateUnitWord.match(/month/i)) {
        date = date.add(num, 'month'); // We don't know the exact day for next/last month

        components.imply('day', date.date());
        components.assign('year', date.year());
        components.assign('month', date.month() + 1);
      } else if (dateUnitWord.match(/year/i)) {
        date = date.add(num, 'year'); // We don't know the exact day for month on next/last year

        components.imply('day', date.date());
        components.imply('month', date.month() + 1);
        components.assign('year', date.year());
      }

      return components;
    }
  }, {
    key: "extractThisReference",
    value: function extractThisReference(context, relativeWord) {
      var components = context.createParsingComponents();
      var date = dayjs_min_default()(context.refDate); // This week

      if (relativeWord.match(/week/i)) {
        date = date.add(-date.get('d'), 'd');
        components.imply('day', date.date());
        components.imply('month', date.month() + 1);
        components.imply('year', date.year());
      } // This month
      else if (relativeWord.match(/month/i)) {
          date = date.add(-date.date() + 1, 'd');
          components.imply('day', date.date());
          components.assign('year', date.year());
          components.assign('month', date.month() + 1);
        } // This year
        else if (relativeWord.match(/year/i)) {
            date = date.add(-date.date() + 1, 'd');
            date = date.add(-date.month(), 'month');
            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.assign('year', date.year());
          }

      return components;
    }
  }]);

  return ENRelativeDateFormatParser;
}();


// CONCATENATED MODULE: ./src/chrono.ts
function chrono_toConsumableArray(arr) { return chrono_arrayWithoutHoles(arr) || chrono_iterableToArray(arr) || chrono_unsupportedIterableToArray(arr) || chrono_nonIterableSpread(); }

function chrono_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function chrono_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return chrono_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return chrono_arrayLikeToArray(o, minLen); }

function chrono_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function chrono_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return chrono_arrayLikeToArray(arr); }

function chrono_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function chrono_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function chrono_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function chrono_createClass(Constructor, protoProps, staticProps) { if (protoProps) chrono_defineProperties(Constructor.prototype, protoProps); if (staticProps) chrono_defineProperties(Constructor, staticProps); return Constructor; }



var chrono_Chrono = /*#__PURE__*/function () {
  function Chrono(configuration) {
    chrono_classCallCheck(this, Chrono);

    configuration = configuration || createCasualConfiguration();
    this.parsers = chrono_toConsumableArray(configuration.parsers);
    this.refiners = chrono_toConsumableArray(configuration.refiners);
  }

  chrono_createClass(Chrono, [{
    key: "parseDate",
    value: function parseDate(text, refDate, opt) {
      var results = this.parse(text, refDate, opt);
      return results.length > 0 ? results[0].start.date() : null;
    }
  }, {
    key: "parse",
    value: function parse(text, refDate, opt) {
      var context = new chrono_ParsingContext(text, refDate || new Date(), opt || {});
      var results = [];
      this.parsers.forEach(function (parser) {
        var parsedResults = Chrono.executeParser(context, parser);
        results = results.concat(parsedResults);
      });
      results.sort(function (a, b) {
        return a.index - b.index;
      });
      this.refiners.forEach(function (refiner) {
        results = refiner.refine(context, results);
      });
      return results;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Chrono({
        parsers: chrono_toConsumableArray(this.parsers),
        refiners: chrono_toConsumableArray(this.refiners)
      });
    }
  }], [{
    key: "executeParser",
    value: function executeParser(context, parser) {
      var results = [];
      var pattern = parser.pattern(context);
      var originalText = context.text;
      var remainingText = context.text;
      var match = pattern.exec(remainingText);

      var _loop = function _loop() {
        // Calculate match index on the full text;
        var index = match.index + originalText.length - remainingText.length;
        match.index = index;
        var result = parser.extract(context, match);

        if (!result) {
          // If fail, move on by 1
          remainingText = originalText.substring(index + 1);
          match = pattern.exec(remainingText);
          return "continue";
        }

        var parsedResult = null;

        if (result instanceof ParsingResult) {
          parsedResult = result;
        } else if (result instanceof results_ParsingComponents) {
          parsedResult = context.createParsingResult(index, match[0]);
          parsedResult.start = result;
        } else {
          parsedResult = context.createParsingResult(index, match[0], result);
        }

        '09/25/2017 10:31:50.522 P';
        context.debug(function () {
          return console.log("".concat(parser.constructor.name, " extracted result ").concat(parsedResult));
        });
        results.push(parsedResult);
        remainingText = originalText.substring(index + parsedResult.text.length);
        match = pattern.exec(remainingText);
      };

      while (match) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }

      return results;
    }
  }]);

  return Chrono;
}();
var chrono_ParsingContext = /*#__PURE__*/function () {
  function ParsingContext(text, refDate, option) {
    chrono_classCallCheck(this, ParsingContext);

    this.text = text;
    this.refDate = refDate;
    this.option = option;
  }

  chrono_createClass(ParsingContext, [{
    key: "createParsingComponents",
    value: function createParsingComponents(components) {
      return new results_ParsingComponents(this.refDate, components);
    }
  }, {
    key: "createParsingResult",
    value: function createParsingResult(index, textOrEndIndex, startComponents, endComponents) {
      var text = typeof textOrEndIndex === 'string' ? textOrEndIndex : this.text.substring(index, textOrEndIndex);
      var start = startComponents ? this.createParsingComponents(startComponents) : null;
      var end = endComponents ? this.createParsingComponents(endComponents) : null;
      return new ParsingResult(this.refDate, index, text, start, end);
    }
  }, {
    key: "debug",
    value: function debug(block) {
      if (this.option.debug) {
        if (this.option.debug instanceof Function) {
          this.option.debug(block);
        } else {
          var handler = this.option.debug;
          handler.debug(block);
        }
      }
    }
  }]);

  return ParsingContext;
}();
// CONCATENATED MODULE: ./src/locales/en/index.ts

















 // Shortcuts

var casual = new chrono_Chrono(createCasualConfiguration(false));
var strict = new chrono_Chrono(createConfiguration(true, false));
var GB = new chrono_Chrono(createConfiguration(false, true));
function parse(text, ref, option) {
  return casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
  return casual.parseDate(text, ref, option);
}
function createCasualConfiguration() {
  var littleEndian = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var option = createConfiguration(false, littleEndian);
  option.parsers.unshift(new ENCasualDateParser_ENCasualDateParser());
  option.parsers.unshift(new ENCasualTimeParser_ENCasualTimeParser());
  option.parsers.unshift(new ENWeekdayParser_ENWeekdayParser());
  option.parsers.unshift(new ENRelativeDateFormatParser_ENRelativeDateFormatParser());
  return option;
}
function createConfiguration() {
  var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return includeCommonConfiguration({
    parsers: [new ENTimeUnitDeadlineFormatParser_ENTimeUnitDeadlineFormatParser(strictMode), new ENMonthNameLittleEndianParser_ENMonthNameLittleEndianParser(), new ENMonthNameMiddleEndianParser_ENMonthNameMiddleEndianParser(), new ENMonthNameParser_ENMonthNameParser(), new ENSlashDateFormatParser_ENSlashDateFormatParser(littleEndian), new ENSlashDateFormatStartWithYearParser_ENSlashDateFormatStartWithYearParser(), new ENSlashMonthFormatParser(), new ENTimeExpressionParser_ENTimeExpressionParser(), new ENTimeUnitAgoFormatParser_ENTimeUnitAgoFormatParser(strictMode), new ENTimeUnitLaterFormatParser_ENTimeUnitLaterFormatParser(strictMode)],
    refiners: [new ENMergeDateTimeRefiner_ENMergeDateTimeRefiner(), new ENMergeDateRangeRefiner()]
  });
}
// CONCATENATED MODULE: ./src/locales/ja/constants.ts
/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
function toHankaku(text) {
  return String(text).replace(/\u2019/g, "'").replace(/\u201D/g, "\"").replace(/\u3000/g, " ").replace(/\uFFE5/g, "\xA5").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
}

function alphaNum(token) {
  return String.fromCharCode(token.charCodeAt(0) - 65248);
}
// CONCATENATED MODULE: ./src/locales/ja/parsers/JPStandardParser.ts
function JPStandardParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JPStandardParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JPStandardParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) JPStandardParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) JPStandardParser_defineProperties(Constructor, staticProps); return Constructor; }




var JPStandardParser_PATTERN = /(?:(?:([同今本])|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
var SPECIAL_YEAR_GROUP = 1;
var TYPICAL_YEAR_GROUP = 2;
var ERA_GROUP = 3;
var JPStandardParser_YEAR_NUMBER_GROUP = 4;
var JPStandardParser_MONTH_GROUP = 5;
var DAY_GROUP = 6;

var JPStandardParser_JPStandardParser = /*#__PURE__*/function () {
  function JPStandardParser() {
    JPStandardParser_classCallCheck(this, JPStandardParser);
  }

  JPStandardParser_createClass(JPStandardParser, [{
    key: "pattern",
    value: function pattern() {
      return JPStandardParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var month = parseInt(toHankaku(match[JPStandardParser_MONTH_GROUP]));
      var day = parseInt(toHankaku(match[DAY_GROUP]));
      var components = context.createParsingComponents({
        'day': day,
        'month': month
      });

      if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match('同|今|本')) {
        var moment = dayjs_min_default()(context.refDate);
        components.assign('year', moment.year());
      }

      if (match[TYPICAL_YEAR_GROUP]) {
        var yearNumText = match[JPStandardParser_YEAR_NUMBER_GROUP];
        var year = yearNumText == '元' ? 1 : parseInt(toHankaku(yearNumText));

        if (match[ERA_GROUP] == '令和') {
          year += 2018;
        } else if (match[ERA_GROUP] == '平成') {
          year += 1988;
        } else if (match[ERA_GROUP] == '昭和') {
          year += 1925;
        }

        components.assign('year', year);
      } else {
        var _year = findYearClosestToRef(context.refDate, day, month);

        components.imply('year', _year);
      }

      return components;
    }
  }]);

  return JPStandardParser;
}();


// CONCATENATED MODULE: ./src/locales/ja/refiners/JPMergeDateRangeRefiner.ts
function JPMergeDateRangeRefiner_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { JPMergeDateRangeRefiner_typeof = function _typeof(obj) { return typeof obj; }; } else { JPMergeDateRangeRefiner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return JPMergeDateRangeRefiner_typeof(obj); }

function JPMergeDateRangeRefiner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JPMergeDateRangeRefiner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JPMergeDateRangeRefiner_createClass(Constructor, protoProps, staticProps) { if (protoProps) JPMergeDateRangeRefiner_defineProperties(Constructor.prototype, protoProps); if (staticProps) JPMergeDateRangeRefiner_defineProperties(Constructor, staticProps); return Constructor; }

function JPMergeDateRangeRefiner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) JPMergeDateRangeRefiner_setPrototypeOf(subClass, superClass); }

function JPMergeDateRangeRefiner_setPrototypeOf(o, p) { JPMergeDateRangeRefiner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return JPMergeDateRangeRefiner_setPrototypeOf(o, p); }

function JPMergeDateRangeRefiner_createSuper(Derived) { var hasNativeReflectConstruct = JPMergeDateRangeRefiner_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = JPMergeDateRangeRefiner_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = JPMergeDateRangeRefiner_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return JPMergeDateRangeRefiner_possibleConstructorReturn(this, result); }; }

function JPMergeDateRangeRefiner_possibleConstructorReturn(self, call) { if (call && (JPMergeDateRangeRefiner_typeof(call) === "object" || typeof call === "function")) { return call; } return JPMergeDateRangeRefiner_assertThisInitialized(self); }

function JPMergeDateRangeRefiner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function JPMergeDateRangeRefiner_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function JPMergeDateRangeRefiner_getPrototypeOf(o) { JPMergeDateRangeRefiner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return JPMergeDateRangeRefiner_getPrototypeOf(o); }


/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Japanese connecting phases
 * - 水曜日[ー]日曜日
 * - 水曜日[から]日曜日
 */

var JPMergeDateRangeRefiner = /*#__PURE__*/function (_AbstractMergeDateRan) {
  JPMergeDateRangeRefiner_inherits(JPMergeDateRangeRefiner, _AbstractMergeDateRan);

  var _super = JPMergeDateRangeRefiner_createSuper(JPMergeDateRangeRefiner);

  function JPMergeDateRangeRefiner() {
    JPMergeDateRangeRefiner_classCallCheck(this, JPMergeDateRangeRefiner);

    return _super.apply(this, arguments);
  }

  JPMergeDateRangeRefiner_createClass(JPMergeDateRangeRefiner, [{
    key: "patternBetween",
    value: function patternBetween() {
      return /^\s*(から|ー|-)\s*$/i;
    }
  }]);

  return JPMergeDateRangeRefiner;
}(AbstractMergeDateRangeRefiner);


// CONCATENATED MODULE: ./src/locales/ja/parsers/JPCasualDateParser.ts
function JPCasualDateParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JPCasualDateParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JPCasualDateParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) JPCasualDateParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) JPCasualDateParser_defineProperties(Constructor, staticProps); return Constructor; }



var JPCasualDateParser_PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

var JPCasualDateParser_JPCasualDateParser = /*#__PURE__*/function () {
  function JPCasualDateParser() {
    JPCasualDateParser_classCallCheck(this, JPCasualDateParser);
  }

  JPCasualDateParser_createClass(JPCasualDateParser, [{
    key: "pattern",
    value: function pattern() {
      return JPCasualDateParser_PATTERN;
    }
  }, {
    key: "extract",
    value: function extract(context, match) {
      var text = match[0];
      var date = dayjs_min_default()(context.refDate);
      var components = context.createParsingComponents();

      if (text == '今夜' || text == '今夕' || text == '今晩') {
        components.imply('hour', 22);
        components.assign('meridiem', Meridiem.PM);
      } else if (text.match("今朝")) {
        components.imply('hour', 6);
        components.assign('meridiem', Meridiem.AM);
      } else if (text == '明日') {
        if (date.hour() > 4) {
          // Check not "Tomorrow" on late night
          date = date.add(1, 'day');
        }
      } else if (text == '昨日') {
        date = date.add(-1, 'day');
      }

      components.assign('day', date.date());
      components.assign('month', date.month() + 1);
      components.assign('year', date.year());
      return components;
    }
  }]);

  return JPCasualDateParser;
}();


// CONCATENATED MODULE: ./src/locales/ja/index.ts




// Shortcuts
var ja_casual = new chrono_Chrono(ja_createCasualConfiguration());
var ja_strict = new chrono_Chrono(ja_createConfiguration());
function ja_parse(text, ref, option) {
  return ja_casual.parse(text, ref, option);
}
function ja_parseDate(text, ref, option) {
  return ja_casual.parseDate(text, ref, option);
}
function ja_createCasualConfiguration() {
  var option = ja_createConfiguration();
  option.parsers.unshift(new JPCasualDateParser_JPCasualDateParser());
  return option;
}
function ja_createConfiguration() {
  return {
    parsers: [new JPStandardParser_JPStandardParser()],
    refiners: [new JPMergeDateRangeRefiner()]
  };
}
// CONCATENATED MODULE: ./src/index.ts


var src_strict = strict;
var src_casual = casual;
function src_parse(text, ref, option) {
  return src_casual.parse(text, ref, option);
}
function src_parseDate(text, ref, option) {
  return src_casual.parseDate(text, ref, option);
}
var Meridiem; // export * as xx from './locales/xx'

(function (Meridiem) {
  Meridiem[Meridiem["AM"] = 0] = "AM";
  Meridiem[Meridiem["PM"] = 1] = "PM";
})(Meridiem || (Meridiem = {}));






/***/ })
/******/ ]);
});
//# sourceMappingURL=chrono.js.map