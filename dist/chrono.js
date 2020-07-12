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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

function ParsedResult(result) {
  result = result || {};
  this.ref = result.ref;
  this.index = result.index;
  this.text = result.text;
  this.tags = result.tags || {};
  this.start = new ParsedComponents(result.start, result.ref);

  if (result.end) {
    this.end = new ParsedComponents(result.end, result.ref);
  }
}

ParsedResult.prototype.clone = function () {
  var result = new ParsedResult(this);
  result.tags = JSON.parse(JSON.stringify(this.tags));
  result.start = this.start.clone();

  if (this.end) {
    result.end = this.end.clone();
  }

  return result;
};

ParsedResult.prototype.date = function () {
  return this.start.date();
};

ParsedResult.prototype.hasPossibleDates = function () {
  return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
};

ParsedResult.prototype.isOnlyWeekday = function () {
  return this.start.isOnlyWeekdayComponent();
};

ParsedResult.prototype.isOnlyDayMonth = function () {
  return this.start.isOnlyDayMonthComponent();
};

function ParsedComponents(components, ref) {
  this.knownValues = {};
  this.impliedValues = {};

  if (components) {
    for (var key in components) {
      this.knownValues[key] = components[key];
    }
  }

  if (ref) {
    ref = dayjs(ref);
    this.imply('day', ref.date());
    this.imply('month', ref.month() + 1);
    this.imply('year', ref.year());
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

ParsedComponents.prototype.get = function (component, value) {
  if (component in this.knownValues) return this.knownValues[component];
  if (component in this.impliedValues) return this.impliedValues[component];
};

ParsedComponents.prototype.assign = function (component, value) {
  this.knownValues[component] = value;
  delete this.impliedValues[component];
};

ParsedComponents.prototype.imply = function (component, value) {
  if (component in this.knownValues) return;
  this.impliedValues[component] = value;
};

ParsedComponents.prototype.isCertain = function (component) {
  return component in this.knownValues;
};

ParsedComponents.prototype.isOnlyWeekdayComponent = function () {
  return this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
};

ParsedComponents.prototype.isOnlyDayMonthComponent = function () {
  return this.isCertain('day') && this.isCertain('month') && !this.isCertain('year');
};

ParsedComponents.prototype.isPossibleDate = function () {
  var dateMoment = this.dayjs();

  if (this.isCertain('timezoneOffset')) {
    var adjustTimezoneOffset = this.get('timezoneOffset') - dateMoment.utcOffset();
    dateMoment = dateMoment.add(adjustTimezoneOffset, 'minutes');
  }

  if (dateMoment.get('year') != this.get('year')) return false;
  if (dateMoment.get('month') != this.get('month') - 1) return false;
  if (dateMoment.get('date') != this.get('day')) return false;
  if (dateMoment.get('hour') != this.get('hour')) return false;
  if (dateMoment.get('minute') != this.get('minute')) return false;
  return true;
};

ParsedComponents.prototype.date = function () {
  var result = this.dayjs();
  return result.toDate();
};

ParsedComponents.prototype.dayjs = function () {
  var result = dayjs();
  result = result.year(this.get('year'));
  result = result.month(this.get('month') - 1);
  result = result.date(this.get('day'));
  result = result.hour(this.get('hour'));
  result = result.minute(this.get('minute'));
  result = result.second(this.get('second'));
  result = result.millisecond(this.get('millisecond')); // Javascript Date Object return minus timezone offset

  var currentTimezoneOffset = result.utcOffset();
  var targetTimezoneOffset = this.get('timezoneOffset') !== undefined ? this.get('timezoneOffset') : currentTimezoneOffset;
  var adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
  result = result.add(-adjustTimezoneOffset, 'minute');
  return result;
};

ParsedComponents.prototype.moment = function () {
  // Keep for compatibility
  return this.dayjs();
};

exports.ParsedComponents = ParsedComponents;
exports.ParsedResult = ParsedResult;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

exports.Parser = function (config) {
  config = config || {};
  var strictMode = config.strict;

  this.isStrictMode = function () {
    return strictMode == true;
  };

  this.pattern = function () {
    return /./i;
  };

  this.extract = function (text, ref, match, opt) {
    return null;
  };

  this.execute = function (text, ref, opt) {
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
  };
};

exports.findYearClosestToRef = function (ref, day, month) {
  //Find the most appropriated year
  var refMoment = dayjs(ref);
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
};

exports.ENISOFormatParser = __webpack_require__(14).Parser;
exports.ENDeadlineFormatParser = __webpack_require__(15).Parser;
exports.ENRelativeDateFormatParser = __webpack_require__(16).Parser;
exports.ENMonthNameLittleEndianParser = __webpack_require__(17).Parser;
exports.ENMonthNameMiddleEndianParser = __webpack_require__(18).Parser;
exports.ENMonthNameParser = __webpack_require__(19).Parser;
exports.ENSlashDateFormatParser = __webpack_require__(20).Parser;
exports.ENSlashDateFormatStartWithYearParser = __webpack_require__(21).Parser;
exports.ENSlashMonthFormatParser = __webpack_require__(22).Parser;
exports.ENTimeAgoFormatParser = __webpack_require__(23).Parser;
exports.ENTimeExpressionParser = __webpack_require__(24).Parser;
exports.ENTimeLaterFormatParser = __webpack_require__(25).Parser;
exports.ENWeekdayParser = __webpack_require__(6).Parser;
exports.ENCasualDateParser = __webpack_require__(26).Parser;
exports.ENCasualTimeParser = __webpack_require__(27).Parser;
exports.JPStandardParser = __webpack_require__(28).Parser;
exports.JPCasualDateParser = __webpack_require__(30).Parser;
exports.PTCasualDateParser = __webpack_require__(31).Parser;
exports.PTDeadlineFormatParser = __webpack_require__(32).Parser;
exports.PTMonthNameLittleEndianParser = __webpack_require__(33).Parser;
exports.PTSlashDateFormatParser = __webpack_require__(35).Parser;
exports.PTTimeAgoFormatParser = __webpack_require__(36).Parser;
exports.PTTimeExpressionParser = __webpack_require__(37).Parser;
exports.PTWeekdayParser = __webpack_require__(38).Parser;
exports.ESCasualDateParser = __webpack_require__(39).Parser;
exports.ESDeadlineFormatParser = __webpack_require__(40).Parser;
exports.ESTimeAgoFormatParser = __webpack_require__(41).Parser;
exports.ESTimeExpressionParser = __webpack_require__(42).Parser;
exports.ESWeekdayParser = __webpack_require__(43).Parser;
exports.ESMonthNameLittleEndianParser = __webpack_require__(44).Parser;
exports.ESSlashDateFormatParser = __webpack_require__(46).Parser;
exports.FRCasualDateParser = __webpack_require__(47).Parser;
exports.FRDeadlineFormatParser = __webpack_require__(48).Parser;
exports.FRMonthNameLittleEndianParser = __webpack_require__(49).Parser;
exports.FRSlashDateFormatParser = __webpack_require__(50).Parser;
exports.FRTimeAgoFormatParser = __webpack_require__(51).Parser;
exports.FRTimeExpressionParser = __webpack_require__(52).Parser;
exports.FRWeekdayParser = __webpack_require__(53).Parser;
exports.FRRelativeDateFormatParser = __webpack_require__(54).Parser;
exports.ZHHantDateParser = __webpack_require__(56).Parser;
exports.ZHHantWeekdayParser = __webpack_require__(57).Parser;
exports.ZHHantTimeExpressionParser = __webpack_require__(58).Parser;
exports.ZHHantCasualDateParser = __webpack_require__(59).Parser;
exports.ZHHantDeadlineFormatParser = __webpack_require__(60).Parser;
exports.DEDeadlineFormatParser = __webpack_require__(61).Parser;
exports.DEMonthNameLittleEndianParser = __webpack_require__(62).Parser;
exports.DEMonthNameParser = __webpack_require__(63).Parser;
exports.DESlashDateFormatParser = __webpack_require__(64).Parser;
exports.DETimeAgoFormatParser = __webpack_require__(65).Parser;
exports.DETimeExpressionParser = __webpack_require__(66).Parser;
exports.DEWeekdayParser = __webpack_require__(67).Parser;
exports.DECasualDateParser = __webpack_require__(68).Parser;
exports.NLMonthNameParser = __webpack_require__(69).Parser;
exports.NLMonthNameLittleEndianParser = __webpack_require__(70).Parser;
exports.NLSlashDateFormatParser = __webpack_require__(71).Parser;
exports.NLWeekdayParser = __webpack_require__(72).Parser;
exports.NLTimeExpressionParser = __webpack_require__(73).Parser;
exports.NLCasualDateParser = __webpack_require__(74).Parser;
exports.NLCasualTimeParser = __webpack_require__(75).Parser;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:c,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,u),i=e-r<0,s=t.clone().add(n+(i?-1:1),u);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,D:"date",h:r,m:n,s:e,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,e,n){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),e&&(m[t]=e,r=t);else{var i=t.name;m[i]=t,r=i}return!n&&r&&(l=r),r||!n&&l},g=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new v(n)},D=d;D.l=M,D.i=y,D.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return g(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<g(t)},d.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,e){var n=D.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return f?n:n.endOf(i)},$=function(t,e){return D.w(h.toDate()[t].apply(h.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case n:return $(M+"Seconds",2);case e:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[n]=c+"Minutes",h[e]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(e){var n=g(f);return D.w(n.date(n.date()+Math.round(e*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[n]=6e4,h[r]=36e5,h[e]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:c(h,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return n.replace(f,function(t,e){return e||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[n]=m/6e4,c[e]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,e){return t(e,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports.Refiner = function Refiner() {
  this.refine = function (text, results, opt) {
    return results;
  };
};

exports.Filter = function Filter() {
  exports.Refiner.call(this);

  this.isValid = function (text, result, opt) {
    return true;
  };

  this.refine = function (text, results, opt) {
    var filteredResult = [];

    for (var i = 0; i < results.length; i++) {
      var result = results[i];

      if (this.isValid(text, result, opt)) {
        filteredResult.push(result);
      }
    }

    return filteredResult;
  };
}; // Common refiners


exports.OverlapRemovalRefiner = __webpack_require__(76).Refiner;
exports.ExtractTimezoneOffsetRefiner = __webpack_require__(77).Refiner;
exports.ExtractTimezoneAbbrRefiner = __webpack_require__(78).Refiner;
exports.ForwardDateRefiner = __webpack_require__(79).Refiner;
exports.UnlikelyFormatFilter = __webpack_require__(80).Refiner; // en refiners

exports.ENMergeDateTimeRefiner = __webpack_require__(5).Refiner;
exports.ENMergeDateRangeRefiner = __webpack_require__(9).Refiner;
exports.ENPrioritizeSpecificDateRefiner = __webpack_require__(81).Refiner; // ja refiners

exports.JPMergeDateRangeRefiner = __webpack_require__(82).Refiner; // fr refiners

exports.FRMergeDateRangeRefiner = __webpack_require__(83).Refiner;
exports.FRMergeDateTimeRefiner = __webpack_require__(84).Refiner; // de refiners

exports.DEMergeDateRangeRefiner = __webpack_require__(85).Refiner;
exports.DEMergeDateTimeRefiner = __webpack_require__(86).Refiner; // nl refiners

exports.NLMergeDateRangeRefiner = __webpack_require__(87).Refiner;
exports.NLMergeDateTimeRefiner = __webpack_require__(88).Refiner;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'sunday': 0,
  'sun': 0,
  'monday': 1,
  'mon': 1,
  'tuesday': 2,
  'tue': 2,
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
exports.MONTH_PATTERN = '(?:' + Object.keys(exports.MONTH_OFFSET).join('|').replace(/\./g, '\\.') + ')';
exports.INTEGER_WORDS = {
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
exports.INTEGER_WORDS_PATTERN = '(?:' + Object.keys(exports.INTEGER_WORDS).join('|') + ')';
exports.ORDINAL_WORDS = {
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
var TIME_UNIT = '(' + exports.INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' + '(sec(?:onds?)?|min(?:ute)?s?|h(?:r|rs|our|ours)?|weeks?|days?|months?|years?)\\s*';
var TIME_UNIT_STRICT = '(?:[0-9]+|an?)\\s*' + '(?:seconds?|minutes?|hours?|days?)\\s*';
var PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');
exports.TIME_UNIT_PATTERN = '(?:' + TIME_UNIT + ')+';
exports.TIME_UNIT_STRICT_PATTERN = '(?:' + TIME_UNIT_STRICT + ')+';

exports.extractDateTimeUnitFragments = function (timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = PATTERN_TIME_UNIT.exec(remainingText);

  while (match) {
    collectDateTimeFragment(match, fragments);
    remainingText = remainingText.substring(match[0].length);
    match = PATTERN_TIME_UNIT.exec(remainingText);
  }

  return fragments;
};

function collectDateTimeFragment(match, fragments) {
  var num = match[1].toLowerCase();

  if (exports.INTEGER_WORDS[num] !== undefined) {
    num = exports.INTEGER_WORDS[num];
  } else if (num === 'a' || num === 'an') {
    num = 1;
  } else if (num.match(/few/)) {
    num = 3;
  } else if (num.match(/half/)) {
    num = 0.5;
  } else {
    num = parseFloat(num);
  }

  if (match[2].match(/^h/i)) {
    fragments['hour'] = num;
  } else if (match[2].match(/min/i)) {
    fragments['minute'] = num;
  } else if (match[2].match(/sec/i)) {
    fragments['second'] = num;
  } else if (match[2].match(/week/i)) {
    fragments['week'] = num;
  } else if (match[2].match(/day/i)) {
    fragments['d'] = num;
  } else if (match[2].match(/month/i)) {
    fragments['month'] = num;
  } else if (match[2].match(/year/i)) {
    fragments['year'] = num;
  }

  return fragments;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
    
*/
var ParsedComponents = __webpack_require__(0).ParsedComponents;

var Refiner = __webpack_require__(3).Refiner;

var PATTERN = new RegExp("^[ ]*(T|at|after|before|on|of|,|-)?[ ]*$");

var isDateOnly = exports.isDateOnly = function (result) {
  return !result.start.isCertain('hour');
};

var isTimeOnly = exports.isTimeOnly = function (result) {
  return !result.start.isCertain('month') && !result.start.isCertain('weekday');
};

var isAbleToMerge = exports.isAbleToMerge = function (text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
};

var mergeDateTimeComponent = exports.mergeDateTimeComponent = function (dateComponent, timeComponent) {
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

  if (timeComponent.isCertain('meridiem')) {
    dateTimeComponent.assign('meridiem', timeComponent.get('meridiem'));
  } else if (timeComponent.get('meridiem') !== undefined && dateTimeComponent.get('meridiem') === undefined) {
    dateTimeComponent.imply('meridiem', timeComponent.get('meridiem'));
  }

  if (dateTimeComponent.get('meridiem') == 1 && dateTimeComponent.get('hour') < 12) {
    if (timeComponent.isCertain('hour')) {
      dateTimeComponent.assign('hour', dateTimeComponent.get('hour') + 12);
    } else {
      dateTimeComponent.imply('hour', dateTimeComponent.get('hour') + 12);
    }
  }

  return dateTimeComponent;
};

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

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
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['ENMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function ENMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(prevResult) && isTimeOnly(currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = results[i + 1];
        i += 1;
      } else if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = results[i + 1];
        i += 1;
      }

      mergedResult.push(prevResult);
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var DAYS_OFFSET = {
  'sunday': 0,
  'sun': 0,
  'monday': 1,
  'mon': 1,
  'tuesday': 2,
  'tues': 2,
  'tue': 2,
  'wednesday': 3,
  'wed': 3,
  'thursday': 4,
  'thurs': 4,
  'thur': 4,
  'thu': 4,
  'friday': 5,
  'fri': 5,
  'saturday': 6,
  'sat': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:on\\s*?)?' + '(?:(this|last|past|next)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(this|last|past|next)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {
  var startMoment = dayjs(ref);
  var startMomentFixed = false;
  var refOffset = startMoment.day();

  if (modifier == 'last' || modifier == 'past') {
    startMoment = startMoment.day(offset - 7);
    startMomentFixed = true;
  } else if (modifier == 'next') {
    startMoment = startMoment.day(offset + 7);
    startMomentFixed = true;
  } else if (modifier == 'this') {
    startMoment = startMoment.day(offset);
  } else {
    if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset - 7);
    } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset + 7);
    } else {
      startMoment = startMoment.day(offset);
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

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];

    if (offset === undefined) {
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
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var NUMBER = {
  '零': 0,
  '一': 1,
  '二': 2,
  '兩': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
  '十': 10,
  '廿': 20,
  '卅': 30
};
var WEEKDAY_OFFSET = {
  '天': 0,
  '日': 0,
  '一': 1,
  '二': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6
};
exports.NUMBER = NUMBER;
exports.WEEKDAY_OFFSET = WEEKDAY_OFFSET;

exports.zhStringToNumber = function (text) {
  var number = 0;

  for (var i = 0; i < text.length; i++) {
    var _char = text[i];

    if (_char === '十') {
      number = number === 0 ? NUMBER[_char] : number * NUMBER[_char];
    } else {
      number += NUMBER[_char];
    }
  }

  return number;
};

exports.zhStringToYear = function (text) {
  var string = '';

  for (var i = 0; i < text.length; i++) {
    var _char2 = text[i];
    string = string + NUMBER[_char2];
  }

  return parseInt(string);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'sonntag': 0,
  'so': 0,
  'montag': 1,
  'mo': 1,
  'dienstag': 2,
  'di': 2,
  'mittwoch': 3,
  'mi': 3,
  'donnerstag': 4,
  'do': 4,
  'freitag': 5,
  'fr': 5,
  'samstag': 6,
  'sa': 6
};
exports.MONTH_OFFSET = {
  'januar': 1,
  'jan': 1,
  'jan.': 1,
  'februar': 2,
  'feb': 2,
  'feb.': 2,
  'märz': 3,
  'maerz': 3,
  'mär': 3,
  'mär.': 3,
  'mrz': 3,
  'mrz.': 3,
  'april': 4,
  'apr': 4,
  'apr.': 4,
  'mai': 5,
  'juni': 6,
  'jun': 6,
  'jun.': 6,
  'juli': 7,
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
  'oktober': 10,
  'okt': 10,
  'okt.': 10,
  'november': 11,
  'nov': 11,
  'nov.': 11,
  'dezember': 12,
  'dez': 12,
  'dez.': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:eins|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf)';
exports.INTEGER_WORDS = {
  'eins': 1,
  'zwei': 2,
  'drei': 3,
  'vier': 4,
  'fünf': 5,
  'fuenf': 5,
  'sechs': 6,
  'sieben': 7,
  'acht': 8,
  'neun': 9,
  'zehn': 10,
  'elf': 11,
  'zwölf': 12,
  'zwoelf': 12
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var Refiner = __webpack_require__(3).Refiner;

exports.Refiner = function ENMergeDateRangeRefiner() {
  Refiner.call(this);

  this.pattern = function () {
    return /^\s*(to|\-)\s*$/i;
  };

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (!prevResult.end && !currResult.end && this.isAbleToMerge(text, prevResult, currResult)) {
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

  this.isAbleToMerge = function (text, result1, result2) {
    var begin = result1.index + result1.text.length;
    var end = result2.index;
    var textBetween = text.substring(begin, end);
    return textBetween.match(this.pattern());
  };

  this.mergeResult = function (text, fromResult, toResult) {
    if (!fromResult.isOnlyWeekday() && !toResult.isOnlyWeekday()) {
      var timeKeys = {
        'hour': true,
        'minute': true,
        'second': true
      };

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
      var fromMoment = fromResult.start.dayjs();
      var toMoment = toResult.start.dayjs();

      if (fromResult.isOnlyWeekday() && fromMoment.add(-7, 'days').isBefore(toMoment)) {
        fromMoment = fromMoment.add(-7, 'days');
        fromResult.start.imply('day', fromMoment.date());
        fromResult.start.imply('month', fromMoment.month() + 1);
        fromResult.start.imply('year', fromMoment.year());
      } else if (toResult.isOnlyWeekday() && toMoment.add(7, 'days').isAfter(fromMoment)) {
        toMoment = toMoment.add(7, 'days');
        toResult.start.imply('day', toMoment.date());
        toResult.start.imply('month', toMoment.month() + 1);
        toResult.start.imply('year', toMoment.year());
      } else {
        var tmp = toResult;
        toResult = fromResult;
        fromResult = tmp;
      }
    }

    fromResult.end = toResult.start;

    for (var tag in toResult.tags) {
      fromResult.tags[tag] = true;
    }

    var startIndex = Math.min(fromResult.index, toResult.index);
    var endIndex = Math.max(fromResult.index + fromResult.text.length, toResult.index + toResult.text.length);
    fromResult.index = startIndex;
    fromResult.text = text.substring(startIndex, endIndex);
    fromResult.tags[this.constructor.name] = true;
    return fromResult;
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'dimanche': 0,
  'dim': 0,
  'lundi': 1,
  'lun': 1,
  'mardi': 2,
  'mar': 2,
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
  'fevrier': 2,
  'fev': 2,
  'fev.': 2,
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
  'decembre': 12,
  'dec': 12,
  'dec.': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize)';
exports.INTEGER_WORDS = {
  'un': 1,
  'deux': 2,
  'trois': 3,
  'quatre': 4,
  'cinq': 5,
  'six': 6,
  'sept': 7,
  'huit': 8,
  'neuf': 9,
  'dix': 10,
  'onze': 11,
  'douze': 12,
  'treize': 13
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'zondag': 0,
  'zo': 0,
  'zo.': 0,
  'maandag': 1,
  'ma': 1,
  'ma.': 1,
  'dinsdag': 2,
  'di': 2,
  'di.': 2,
  'woensdag': 3,
  'wo': 3,
  'wo.': 3,
  'donderdag': 4,
  'do': 4,
  'do.': 4,
  'vrijdag': 5,
  'vr': 5,
  'vr.': 5,
  'zaterdag': 6,
  'za': 6,
  'za.': 6
};
exports.WEEKDAY_PATTERN = '(?:' + Object.keys(exports.WEEKDAY_OFFSET).join('|').replace(/\./g, '\\.') + ')';
exports.MONTH_OFFSET = {
  'januari': 1,
  'jan': 1,
  'jan.': 1,
  'februari': 2,
  'feb': 2,
  'feb.': 2,
  'maart': 3,
  'mrt': 3,
  'mrt.': 3,
  'april': 4,
  'apr': 4,
  'apr.': 4,
  'mei': 5,
  'juni': 6,
  'jun': 6,
  'jun.': 6,
  'juli': 7,
  'jul': 7,
  'jul.': 7,
  'augustus': 8,
  'aug': 8,
  'aug.': 8,
  'september': 9,
  'sep': 9,
  'sep.': 9,
  'sept': 9,
  'sept.': 9,
  'oktober': 10,
  'okt': 10,
  'okt.': 10,
  'november': 11,
  'nov': 11,
  'nov.': 11,
  'december': 12,
  'dec': 12,
  'dec.': 12
};
exports.MONTH_PATTERN = '(?:' + Object.keys(exports.MONTH_OFFSET).join('|').replace(/\./g, '\\.') + ')';
exports.INTEGER_WORDS = {
  'een': 1,
  'één': 1,
  'twee': 2,
  'drie': 3,
  'vier': 4,
  'vijf': 5,
  'zes': 6,
  'zeven': 7,
  'acht': 8,
  'negen': 9,
  'tien': 10,
  'elf': 11,
  'twaalf': 12
};
exports.INTEGER_WORDS_PATTERN = '(?:' + Object.keys(exports.INTEGER_WORDS).join('|') + ')';
exports.ORDINAL_WORDS = {
  'eerste': 1,
  'tweede': 2,
  'derde': 3,
  'vierde': 4,
  'vijfde': 5,
  'zesde': 6,
  'zevende': 7,
  'achste': 8,
  'negende': 9,
  'tiende': 10,
  'elfde': 11,
  'twaalfde': 12,
  'dertiende': 13,
  'veertiende': 14,
  'vijftiende': 15,
  'zestiende': 16,
  'zeventiende': 17,
  'achttiende': 18,
  'negentiende': 19,
  'twintigste': 20,
  'eenentwintigste': 21,
  'tweeëntwintigste': 22,
  'drieëntwintigste': 23,
  'vierentwintigste': 24,
  'vijfentwintigste': 25,
  'zesentwintigste': 26,
  'zevenentwintigste': 27,
  'achtentwintigste': 28,
  'negenentwintigste': 29,
  'dertigste': 30,
  'eenendertigste': 31
};
exports.ORDINAL_WORDS_PATTERN = '(?:' + Object.keys(exports.ORDINAL_WORDS).join('|').replace(/ /g, '[ -]') + ')';
var TIME_UNIT = '(' + exports.INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|en(?:\\s*few)?|half)\\s*' + '(sec(?:onde?)?|min(?:uten)?s?|(?:uur|uren)?|weken?|dagen?|maanden?|jaren?)\\s*';
var TIME_UNIT_STRICT = '(?:[0-9]+?)\\s*' + '(?:seconden?|(?:minuut|minuten)|(?:uur|uren)|(?:dag|dagen))\\s*';
var PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');
exports.TIME_UNIT_PATTERN = '(?:' + TIME_UNIT + ')+';
exports.TIME_UNIT_STRICT_PATTERN = '(?:' + TIME_UNIT_STRICT + ')+';

exports.extractDateTimeUnitFragments = function (timeunitText) {
  var fragments = {};
  var remainingText = timeunitText;
  var match = PATTERN_TIME_UNIT.exec(remainingText);

  while (match) {
    collectDateTimeFragment(match, fragments);
    remainingText = remainingText.substring(match[0].length);
    match = PATTERN_TIME_UNIT.exec(remainingText);
  }

  return fragments;
};

function collectDateTimeFragment(match, fragments) {
  var num = match[1].toLowerCase();

  if (exports.INTEGER_WORDS[num] !== undefined) {
    num = exports.INTEGER_WORDS[num];
  } else if (num.match(/half/)) {
    num = 0.5;
  } else {
    num = parseFloat(num);
  }

  if (match[2].match(/^(?:uur|uren)/i)) {
    fragments['hour'] = num;
  } else if (match[2].match(/min/i)) {
    fragments['minute'] = num;
  } else if (match[2].match(/sec/i)) {
    fragments['second'] = num;
  } else if (match[2].match(/week/i)) {
    fragments['week'] = num;
  } else if (match[2].match(/dag/i)) {
    fragments['d'] = num;
  } else if (match[2].match(/maand/i)) {
    fragments['month'] = num;
  } else if (match[2].match(/jaar/i)) {
    fragments['year'] = num;
  }

  return fragments;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var options = exports.options = __webpack_require__(13);

exports.parser = __webpack_require__(1);
exports.refiner = __webpack_require__(3);
exports.Parser = exports.parser.Parser;
exports.Refiner = exports.refiner.Refiner;
exports.Filter = exports.refiner.Filter;
exports.ParsedResult = __webpack_require__(0).ParsedResult;
exports.ParsedComponents = __webpack_require__(0).ParsedComponents;

var Chrono = function Chrono(option) {
  option = option || exports.options.casualOption();
  this.parsers = new Object(option.parsers);
  this.refiners = new Object(option.refiners);
};

Chrono.prototype.parse = function (text, refDate, opt) {
  refDate = refDate || new Date();
  opt = opt || {};
  opt.forwardDate = opt.forwardDate || opt.forwardDate;
  var allResults = [];
  this.parsers.forEach(function (parser) {
    var results = parser.execute(text, refDate, opt);
    allResults = allResults.concat(results);
  });
  allResults.sort(function (a, b) {
    return a.index - b.index;
  });
  this.refiners.forEach(function (refiner) {
    allResults = refiner.refine(text, allResults, opt);
  });
  return allResults;
};

Chrono.prototype.parseDate = function (text, refDate, opt) {
  var results = this.parse(text, refDate, opt);

  if (results.length > 0) {
    return results[0].start.date();
  }

  return null;
};

exports.Chrono = Chrono;
exports.strict = new Chrono(options.strictOption());
exports.casual = new Chrono(options.casualOption());
exports.en = new Chrono(options.mergeOptions([options.en.casual, options.commonPostProcessing]));
exports.en_GB = new Chrono(options.mergeOptions([options.en_GB.casual, options.commonPostProcessing]));
exports.de = new Chrono(options.mergeOptions([options.de.casual, options.en, options.commonPostProcessing]));
exports.nl = new Chrono(options.mergeOptions([options.nl.casual, options.en, options.commonPostProcessing]));
exports.pt = new Chrono(options.mergeOptions([options.pt.casual, options.en, options.commonPostProcessing]));
exports.es = new Chrono(options.mergeOptions([options.es.casual, options.en, options.commonPostProcessing]));
exports.fr = new Chrono(options.mergeOptions([options.fr.casual, options.en, options.commonPostProcessing]));
exports.ja = new Chrono(options.mergeOptions([options.ja.casual, options.en, options.commonPostProcessing]));

exports.parse = function () {
  return exports.casual.parse.apply(exports.casual, arguments);
};

exports.parseDate = function () {
  return exports.casual.parseDate.apply(exports.casual, arguments);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(1);

var refiner = __webpack_require__(3);

exports.mergeOptions = function (options) {
  var addedTypes = {};
  var mergedOption = {
    parsers: [],
    refiners: []
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
};

exports.commonPostProcessing = function () {
  return {
    refiners: [// These should be after all other refiners
    new refiner.ExtractTimezoneOffsetRefiner(), new refiner.ExtractTimezoneAbbrRefiner(), new refiner.UnlikelyFormatFilter()]
  };
}; // -------------------------------------------------------------


exports.strictOption = function () {
  var strictConfig = {
    strict: true
  };
  return exports.mergeOptions([exports.en(strictConfig), exports.de(strictConfig), exports.nl(strictConfig), exports.pt(strictConfig), exports.es(strictConfig), exports.fr(strictConfig), exports.ja(strictConfig), exports.zh, exports.commonPostProcessing]);
};

exports.casualOption = function () {
  return exports.mergeOptions([exports.en.casual, // Some German abbriviate overlap with common English
  exports.de({
    strict: true
  }), exports.nl, exports.pt, exports.es, exports.fr, exports.ja, exports.zh, exports.commonPostProcessing]);
}; // -------------------------------------------------------------


exports.de = function (config) {
  return {
    parsers: [new parser.DEDeadlineFormatParser(config), new parser.DEMonthNameLittleEndianParser(config), new parser.DEMonthNameParser(config), new parser.DESlashDateFormatParser(config), new parser.DETimeAgoFormatParser(config), new parser.DETimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.DEMergeDateTimeRefiner(), new refiner.DEMergeDateRangeRefiner()]
  };
};

exports.de.casual = function () {
  var option = exports.de({
    strict: false
  });
  option.parsers.unshift(new parser.DECasualDateParser());
  option.parsers.unshift(new parser.DEWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.nl = function (config) {
  return {
    parsers: [new parser.NLMonthNameLittleEndianParser(config), new parser.NLMonthNameParser(config), new parser.NLSlashDateFormatParser(config), new parser.NLTimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.NLMergeDateTimeRefiner(), new refiner.NLMergeDateRangeRefiner()]
  };
};

exports.nl.casual = function () {
  var option = exports.nl({
    strict: false
  });
  option.parsers.unshift(new parser.NLCasualDateParser());
  option.parsers.unshift(new parser.NLCasualTimeParser());
  option.parsers.unshift(new parser.NLWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.en = function (config) {
  return {
    parsers: [new parser.ENISOFormatParser(config), new parser.ENDeadlineFormatParser(config), new parser.ENMonthNameLittleEndianParser(config), new parser.ENMonthNameMiddleEndianParser(config), new parser.ENMonthNameParser(config), new parser.ENSlashDateFormatParser(config), new parser.ENSlashDateFormatStartWithYearParser(config), new parser.ENSlashMonthFormatParser(config), new parser.ENTimeAgoFormatParser(config), new parser.ENTimeLaterFormatParser(config), new parser.ENTimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), // English
    new refiner.ENMergeDateTimeRefiner(), new refiner.ENMergeDateRangeRefiner(), new refiner.ENPrioritizeSpecificDateRefiner()]
  };
};

exports.en.casual = function (config) {
  config = config || {};
  config.strict = false;
  var option = exports.en(config); // en

  option.parsers.unshift(new parser.ENCasualDateParser());
  option.parsers.unshift(new parser.ENCasualTimeParser());
  option.parsers.unshift(new parser.ENWeekdayParser());
  option.parsers.unshift(new parser.ENRelativeDateFormatParser());
  return option;
};

exports.en_GB = function (config) {
  config = config || {};
  config.littleEndian = true;
  return exports.en(config);
};

exports.en_GB.casual = function (config) {
  config = config || {};
  config.littleEndian = true;
  return exports.en.casual(config);
}; // -------------------------------------------------------------


exports.ja = function () {
  return {
    parsers: [new parser.JPStandardParser()],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.JPMergeDateRangeRefiner()]
  };
};

exports.ja.casual = function () {
  var option = exports.ja();
  option.parsers.unshift(new parser.JPCasualDateParser());
  return option;
}; // -------------------------------------------------------------


exports.pt = function (config) {
  return {
    parsers: [new parser.PTTimeAgoFormatParser(config), new parser.PTDeadlineFormatParser(config), new parser.PTTimeExpressionParser(config), new parser.PTMonthNameLittleEndianParser(config), new parser.PTSlashDateFormatParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner()]
  };
};

exports.pt.casual = function () {
  var option = exports.pt({
    strict: false
  });
  option.parsers.unshift(new parser.PTCasualDateParser());
  option.parsers.unshift(new parser.PTWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.es = function (config) {
  return {
    parsers: [new parser.ESTimeAgoFormatParser(config), new parser.ESDeadlineFormatParser(config), new parser.ESTimeExpressionParser(config), new parser.ESMonthNameLittleEndianParser(config), new parser.ESSlashDateFormatParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner()]
  };
};

exports.es.casual = function () {
  var option = exports.es({
    strict: false
  });
  option.parsers.unshift(new parser.ESCasualDateParser());
  option.parsers.unshift(new parser.ESWeekdayParser());
  return option;
}; // -------------------------------------------------------------


exports.fr = function (config) {
  return {
    parsers: [new parser.FRDeadlineFormatParser(config), new parser.FRMonthNameLittleEndianParser(config), new parser.FRSlashDateFormatParser(config), new parser.FRTimeAgoFormatParser(config), new parser.FRTimeExpressionParser(config)],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner(), new refiner.FRMergeDateRangeRefiner(), new refiner.FRMergeDateTimeRefiner()]
  };
};

exports.fr.casual = function () {
  var option = exports.fr({
    strict: false
  });
  option.parsers.unshift(new parser.FRCasualDateParser());
  option.parsers.unshift(new parser.FRWeekdayParser());
  option.parsers.unshift(new parser.FRRelativeDateFormatParser());
  return option;
}; // -------------------------------------------------------------


exports.zh = function () {
  return {
    parsers: [new parser.ZHHantDateParser(), new parser.ZHHantWeekdayParser(), new parser.ZHHantTimeExpressionParser(), new parser.ZHHantCasualDateParser(), new parser.ZHHantDeadlineFormatParser()],
    refiners: [new refiner.OverlapRemovalRefiner(), new refiner.ForwardDateRefiner()]
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
    ISO 8601
    http://www.w3.org/TR/NOTE-datetime
    - YYYY-MM-DD
    - YYYY-MM-DDThh:mmTZD
    - YYYY-MM-DDThh:mm:ssTZD
    - YYYY-MM-DDThh:mm:ss.sTZD 
    - TZD = (Z or +hh:mm or -hh:mm)
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})' + '(?:T' //..
+ '([0-9]{1,2}):([0-9]{1,2})' // hh:mm
+ '(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?' // :ss.s
+ '(?:Z|([+-]\\d{2}):?(\\d{2})?)?' // TZD (Z or ±hh:mm or ±hhmm or ±hh)
+ ')?' //..
+ '(?=\\W|$)', 'i');
var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;
var HOUR_NUMBER_GROUP = 5;
var MINUTE_NUMBER_GROUP = 6;
var SECOND_NUMBER_GROUP = 7;
var MILLISECOND_NUMBER_GROUP = 8;
var TZD_HOUR_OFFSET_GROUP = 9;
var TZD_MINUTE_OFFSET_GROUP = 10;

exports.Parser = function ENISOFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
    result.start.assign('month', parseInt(match[MONTH_NUMBER_GROUP]));
    result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

    if (dayjs(result.start.get('month')) > 12 || dayjs(result.start.get('month')) < 1 || dayjs(result.start.get('day')) > 31 || dayjs(result.start.get('day')) < 1) {
      return null;
    }

    if (match[HOUR_NUMBER_GROUP] != null) {
      result.start.assign('hour', parseInt(match[HOUR_NUMBER_GROUP]));
      result.start.assign('minute', parseInt(match[MINUTE_NUMBER_GROUP]));

      if (match[SECOND_NUMBER_GROUP] != null) {
        result.start.assign('second', parseInt(match[SECOND_NUMBER_GROUP]));
      }

      if (match[MILLISECOND_NUMBER_GROUP] != null) {
        result.start.assign('millisecond', parseInt(match[MILLISECOND_NUMBER_GROUP]));
      }

      if (match[TZD_HOUR_OFFSET_GROUP] == null) {
        result.start.assign('timezoneOffset', 0);
      } else {
        var minuteOffset = 0;
        var hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
        if (match[TZD_MINUTE_OFFSET_GROUP] != null) minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
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
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('(\\W|^)' + '(within|in)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' + '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)\\s*' + '(?=\\W|$)', 'i');
var STRICT_PATTERN = new RegExp('(\\W|^)' + '(within|in)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?)\\s*' + '(seconds?|minutes?|hours?|days?)\\s*' + '(?=\\W|$)', 'i');

exports.Parser = function ENDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[3].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'a' || num === 'an') {
      num = 1;
    } else if (num.match(/few/i)) {
      num = 3;
    } else if (num.match(/half/i)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (match[4].match(/day|week|month|year/i)) {
      if (match[4].match(/day/i)) {
        date = date.add(num, 'd');
      } else if (match[4].match(/week/i)) {
        date = date.add(num * 7, 'd');
      } else if (match[4].match(/month/i)) {
        date = date.add(num, 'month');
      } else if (match[4].match(/year/i)) {
        date = date.add(num, 'year');
      }

      result.start.imply('year', date.year());
      result.start.imply('month', date.month() + 1);
      result.start.imply('day', date.date());
      return result;
    }

    if (match[4].match(/hour/i)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/min/i)) {
      date = date.add(num, 'minute');
    } else if (match[4].match(/second/i)) {
      date = date.add(num, 'second');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.imply('hour', date.hour());
    result.start.imply('minute', date.minute());
    result.start.imply('second', date.second());
    result.tags['ENDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('(\\W|^)' + '(this|next|last|past)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|few|half(?:\\s*an?)?)?\\s*' + '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)(?=\\s*)' + '(?=\\W|$)', 'i');
var MODIFIER_WORD_GROUP = 2;
var MULTIPLIER_WORD_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;

exports.Parser = function ENRelativeDateFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    result.tags['ENRelativeDateFormatParser'] = true;
    var num = match[MULTIPLIER_WORD_GROUP] === undefined ? '' : match[3].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === '') {
      num = 1;
    } else if (num.match(/few/i)) {
      num = 3;
    } else if (num.match(/half/i)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    num *= modifier;
    var date = dayjs(ref);

    if (match[MODIFIER_WORD_GROUP].toLowerCase().match(/^this/)) {
      if (match[MULTIPLIER_WORD_GROUP]) {
        return null;
      }

      if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year/i)) {
        // This week
        if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
          date = date.add(-date.get('d'), 'd');
          result.start.imply('day', date.date());
          result.start.imply('month', date.month() + 1);
          result.start.imply('year', date.year());
        } // This month
        else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
            date = date.add(-date.date() + 1, 'd');
            result.start.imply('day', date.date());
            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
          } // This year
          else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
              date = date.add(-date.date() + 1, 'd');
              date = date.add(-date.month(), 'month');
              result.start.imply('day', date.date());
              result.start.imply('month', date.month() + 1);
              result.start.assign('year', date.year());
            }

        return result;
      }
    }

    if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year/i)) {
      if (match[RELATIVE_WORD_GROUP].match(/day/i)) {
        date = date.add(num, 'd');
        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
        result.start.assign('day', date.date());
      } else if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
        date = date.add(num * 7, 'd'); // We don't know the exact date for next/last week so we imply
        // them

        result.start.imply('day', date.date());
        result.start.imply('month', date.month() + 1);
        result.start.imply('year', date.year());
      } else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
        date = date.add(num, 'month'); // We don't know the exact day for next/last month

        result.start.imply('day', date.date());
        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
      } else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
        date = date.add(num, 'year'); // We don't know the exact day for month on next/last year

        result.start.imply('day', date.date());
        result.start.imply('month', date.month() + 1);
        result.start.assign('year', date.year());
      }

      return result;
    }

    if (match[RELATIVE_WORD_GROUP].match(/hour/i)) {
      date = date.add(num, 'hour');
      result.start.imply('minute', date.minute());
      result.start.imply('second', date.second());
    } else if (match[RELATIVE_WORD_GROUP].match(/min/i)) {
      date = date.add(num, 'minute');
      result.start.assign('minute', date.minute());
      result.start.imply('second', date.second());
    } else if (match[RELATIVE_WORD_GROUP].match(/second/i)) {
      date = date.add(num, 'second');
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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('(\\W|^)' + '(?:on\\s*?)?' + '(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\\s*,?\\s*)?' + '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' + '(?:\\s*' + '(?:to|\\-|\\–|until|through|till|\\s)\\s*' + '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' + ')?' + '(?:-|\/|\\s*(?:of)?\\s*)' + '(' + util.MONTH_PATTERN + ')' + '(?:' + '(?:-|\/|,?\\s*)' + '((?:' + '[1-9][0-9]{0,3}\\s*(?:BE|AD|BC)|' + '[1-2][0-9]{3}|' + '[5-9][0-9]' + ')(?![^\\s]\\d))' + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_NUM_GROUP = 4;
var DATE_TO_GROUP = 5;
var DATE_TO_NUM_GROUP = 6;
var MONTH_NAME_GROUP = 7;
var YEAR_GROUP = 8;

exports.Parser = function ENMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_NUM_GROUP] ? parseInt(match[DATE_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];

      if (/BE/i.test(year)) {
        // Buddhist Era
        year = year.replace(/BE/i, '');
        year = parseInt(year) - 543;
      } else if (/BC/i.test(year)) {
        // Before Christ
        year = year.replace(/BC/i, '');
        year = -parseInt(year);
      } else if (/AD/i.test(year)) {
        year = year.replace(/AD/i, '');
        year = parseInt(year);
      } else {
        year = parseInt(year);

        if (year < 100) {
          if (year > 50) {
            year = year + 1900;
          } else {
            year = year + 2000;
          }
        }
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      var endDate = match[DATE_TO_NUM_GROUP] ? parseInt(match[DATE_TO_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_TO_GROUP].trim().replace('-', ' ').toLowerCase()];
      result.end = result.start.clone();
      result.end.assign('day', endDate);
    }

    result.tags['ENMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

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
var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:on\\s*?)?' + '(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\\.?|Mon\\.?|Tue\\.?|Wed\\.?|Thu\\.?|Fri\\.?|Sat\\.?)' + '\\s*,?\\s*)?' + '(' + util.MONTH_PATTERN + ')' + '(?:-|\/|\\s*,?\\s*)' + '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')(?!\\s*(?:am|pm))\\s*' + '' + '(?:' + '(?:to|\\-)\\s*' + '(([0-9]{1,2})(?:st|nd|rd|th)?| ' + util.ORDINAL_WORDS_PATTERN + ')\\s*' + ')?' + '(?:' + '(?:-|\/|\\s*,?\\s*)' + '(?:([0-9]{4})\\s*(BE|AD|BC)?|([0-9]{1,4})\\s*(AD|BC))\\s*' + ')?' + '(?=\\W|$)(?!\\:\\d)', 'i');
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

exports.Parser = function ENMonthNameMiddleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_NUM_GROUP] ? parseInt(match[DATE_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];
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
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as 'January 12 - 13, 2012'


    if (match[DATE_TO_GROUP]) {
      var endDate = match[DATE_TO_NUM_GROUP] ? endDate = parseInt(match[DATE_TO_NUM_GROUP]) : util.ORDINAL_WORDS[match[DATE_TO_GROUP].replace('-', ' ').trim().toLowerCase()];
      result.end = result.start.clone();
      result.end.assign('day', endDate);
    }

    result.tags['ENMonthNameMiddleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*
    
    The parser for parsing month name and year.
    
    EX. 
        - January
        - January 2012
        - January, 2012
*/
var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' + '(' + util.MONTH_PATTERN + ')' + '\\s*' + '(?:' + '[,-]?\\s*([0-9]{4})(\\s*BE|AD|BC)?' + ')?' + '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');
var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var day = 1;
    var monthName = match[MONTH_NAME_GROUP];
    var month = util.MONTH_OFFSET[monthName.toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (match[YEAR_BE_GROUP].match(/BE/)) {
          // Buddhist Era
          year = year - 543;
        } else if (match[YEAR_BE_GROUP].match(/BC/)) {
          // Before Christ
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    }

    if (result.text.match(/^\w{3}$/)) {
      return false;
    }

    result.tags['ENMonthNameParser'] = true;
    return result;
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015 
    - 11/3/2015
    - 11/3

    By default the paser us "middle-endien" format (US English),
    then fallback to little-endian if failed.
    - 11/3/2015 = November 3rd, 2015
    - 23/4/2015 = April 23th, 2015

    If "littleEndian" config is set, the parser will try the little-endian first. 
    - 11/3/2015 = March 11th, 2015
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:on\\s*?)?' + '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' + '\\s*\\,?\\s*' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
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
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;
var WEEKDAY_GROUP = 2;
var FIRST_NUMBERS_GROUP = 3;
var SECOND_NUMBERS_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function ENSlashDateFormatParser(config) {
  Parser.apply(this, arguments);
  config = config || {};
  var littleEndian = config.littleEndian;
  var MONTH_GROUP = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
  var DAY_GROUP = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month
        // looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);

    if (match[YEAR_GROUP]) {
      result.start.assign('year', year);
    } else {
      result.start.imply('year', year);
    } //Day of week


    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['ENSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date. 
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('(\\W|^)' + '([0-9]{4})[\\-\\.\\/]' + '((?:' + util.MONTH_PATTERN + '|[0-9]{1,2}))[\\-\\.\\/]' + '([0-9]{1,2})' + '(?=\\W|$)', 'i');
var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP = 4;

exports.Parser = function ENSlashDateFormatStartWithYearParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    var month = match[MONTH_NUMBER_GROUP].toLowerCase();
    month = util.MONTH_OFFSET[month] | month;
    result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
    result.start.assign('month', parseInt(month));
    result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

    if (dayjs(result.start.get('month')) > 12 || dayjs(result.start.get('month')) < 1 || dayjs(result.start.get('day')) > 31 || dayjs(result.start.get('day')) < 1) {
      return null;
    }

    result.tags['ENDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Month/Year date format with slash "/" (also "-" and ".") between numbers 
    - 11/05
    - 06/2005
*/
var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(^|[^\\d/]\\s+|[^\\w\\s])' + '([0-9]|0[1-9]|1[012])/([0-9]{4})' + '(?=[^\\d/]|$)', 'i');
var OPENNING_GROUP = 1;
var MONTH_GROUP = 2;
var YEAR_GROUP = 3;

exports.Parser = function ENSlashMonthFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length).trim();
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    var year = match[YEAR_GROUP];
    var month = match[MONTH_GROUP];
    var day = 1;
    month = parseInt(month);
    year = parseInt(year);
    result.start.imply('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year);
    result.tags['ENSlashMonthFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('' + '(\\W|^)' + '(?:within\\s*)?' + '(' + util.TIME_UNIT_PATTERN + ')' + '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');
var STRICT_PATTERN = new RegExp('' + '(\\W|^)' + '(?:within\\s*)?' + '(' + util.TIME_UNIT_STRICT_PATTERN + ')' + 'ago(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var fragments = util.extractDateTimeUnitFragments(match[2]);
    var date = dayjs(ref);

    for (var key in fragments) {
      date = date.add(-fragments[key], key);
    }

    if (fragments['hour'] > 0 || fragments['minute'] > 0 || fragments['second'] > 0) {
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags['ENTimeAgoFormatParser'] = true;
    }

    if (fragments['d'] > 0 || fragments['month'] > 0 || fragments['year'] > 0) {
      result.start.assign('day', date.date());
      result.start.assign('month', date.month() + 1);
      result.start.assign('year', date.year());
    } else {
      if (fragments['week'] > 0) {
        result.start.imply('weekday', date.day());
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
    }

    return result;
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:at|from)\\s*)??" + "(\\d{1,4}|noon|midnight)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?|O\\W*CLOCK))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|to|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?|O\\W*CLOCK))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var MILLI_SECOND_GROUP = 5;
var AM_PM_HOUR_GROUP = 6;

exports.Parser = function ENTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlapped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['ENTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Millisecond

    if (match[MILLI_SECOND_GROUP] != null) {
      var millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
      if (millisecond >= 1000) return null;
      result.start.assign('millisecond', millisecond);
    } // ----- Second


    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase() == "noon") {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "midnight") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
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
    } // ----- AM & PM  


    if (match[AM_PM_HOUR_GROUP] != null) {
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
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Millisecond

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

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
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
    } // ----- AM & PM 


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
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
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(4);

var PATTERN = new RegExp('' +
/*match[1]*/
'(\\W|^)' +
/*match[2]*/
'(in )?' +
/*match[3]*/
'(' + util.TIME_UNIT_PATTERN + ')' +
/*match[4]*/
'(later|after|from now|henceforth|forward|out)?' +
/*match[5]*/
'(?=(?:\\W|$))', 'i');
var STRICT_PATTERN = new RegExp('' +
/*match[1]*/
'(\\W|^)' +
/*match[2]*/
'(in )?' +
/*match[3]*/
'(' + util.TIME_UNIT_STRICT_PATTERN + ')' +
/*match[4]*/
'(later|from now)?' +
/*match[5]*/
'(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeLaterFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var prefix = match[2];
    var suffix = match[4];
    if (!prefix && !suffix) return null;
    var preamble = match[1];
    var text = match[0].substr(preamble.length, match[0].length - preamble.length);
    var index = match.index + preamble.length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var fragments = util.extractDateTimeUnitFragments(match[3]);
    var date = dayjs(ref);

    for (var key in fragments) {
      date = date.add(fragments[key], key);
    }

    if (fragments['hour'] > 0 || fragments['minute'] > 0 || fragments['second'] > 0) {
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags['ENTimeAgoFormatParser'] = true;
    }

    if (fragments['d'] > 0 || fragments['month'] > 0 || fragments['year'] > 0) {
      result.start.assign('day', date.date());
      result.start.assign('month', date.month() + 1);
      result.start.assign('year', date.year());
    } else {
      if (fragments['week'] > 0) {
        result.start.imply('weekday', date.day());
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
    }

    return result;
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)(now|today|tonight|last\s*night|(?:tomorrow|tmr|yesterday)\s*|tomorrow|tmr|yesterday)(?=\W|$)/i;

exports.Parser = function ENCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase();

    if (lowerText == 'tonight') {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (/^tomorrow|^tmr/.test(lowerText)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (/^yesterday/.test(lowerText)) {
      startMoment = startMoment.add(-1, 'day');
    } else if (lowerText.match(/last\s*night/)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match("now")) {
      result.start.assign('hour', refMoment.hour());
      result.start.assign('minute', refMoment.minute());
      result.start.assign('second', refMoment.second());
      result.start.assign('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['ENCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)((this)?\s*(morning|afternoon|evening|noon|night))/i;
var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    if (!match[TIME_MATCH]) TIME_MATCH = 3;

    switch (match[TIME_MATCH].toLowerCase()) {
      case 'afternoon':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 15);
        break;

      case 'evening':
      case 'night':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 20);
        break;

      case 'morning':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 6);
        break;

      case 'noon':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 12);
        break;
    }

    result.tags['ENCasualTimeParser'] = true;
    return result;
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(29);

var PATTERN = /(?:(同|今|本|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
var SPECIAL_YEAR_GROUP = 1;
var TYPICAL_YEAR_GROUP = 2;
var ERA_GROUP = 3;
var YEAR_NUMBER_GROUP = 4;
var MONTH_GROUP = 5;
var DAY_GROUP = 6;

exports.Parser = function JPStandardParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0],
      index: match.index,
      ref: ref
    });
    var month = match[MONTH_GROUP];
    month = util.toHankaku(month);
    month = parseInt(month);
    var day = match[DAY_GROUP];
    day = util.toHankaku(day);
    day = parseInt(day);
    result.start.assign('day', day);
    result.start.assign('month', month);

    if (match[TYPICAL_YEAR_GROUP]) {
      var year = match[YEAR_NUMBER_GROUP];

      if (year == '元') {
        year = 1;
      } else {
        year = util.toHankaku(year);
        year = parseInt(year);
      }

      if (match[ERA_GROUP] == '令和') {
        year += 2018;
      } else if (match[ERA_GROUP] == '平成') {
        year += 1988;
      } else if (match[ERA_GROUP] == '昭和') {
        year += 1925;
      }

      result.start.assign('year', year);
    } else if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match('同|今|本')) {
      var moment = dayjs(ref);
      result.start.assign('year', moment.year());
    } else {
      var _year = parser.findYearClosestToRef(ref, day, month);

      result.start.imply('year', _year);
    }

    result.tags['JPStandardParser'] = true;
    return result;
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
exports.toHankaku = function (String, fromCharCode) {
  function toHankaku(string) {
    return String(string).replace(/\u2019/g, "'").replace(/\u201D/g, "\"").replace(/\u3000/g, " ").replace(/\uFFE5/g, "\xA5").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
  }

  function alphaNum(token) {
    return fromCharCode(token.charCodeAt(0) - 65248);
  }

  return toHankaku;
}(String, String.fromCharCode);
/**
 * to-zenkaku.js
 * convert to multi byte strings.
 *
 * @version 1.0.2
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */


exports.toZenkaku = function (String, fromCharCode) {
  function toZenkaku(string) {
    return String(string).replace(/\u0020/g, "\u3000").replace(/\u0022/g, "\u201D").replace(/\u0027/g, "\u2019").replace(/\u00A5/g, "\uFFE5").replace(/[!#-&(),-9\u003C-?A-[\u005D_a-{}~]/g, alphaNum);
  }

  function alphaNum(token) {
    return fromCharCode(token.charCodeAt(0) + 65248);
  }

  return toZenkaku;
}(String, String.fromCharCode);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

exports.Parser = function JPCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    var text = match[0];
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;

    if (text == '今夜' || text == '今夕' || text == '今晩') {
      // Normally means this coming midnight 
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (text == '明日') {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 4) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (text == '昨日') {
      startMoment = startMoment.add(-1, 'day');
    } else if (text.match("今朝")) {
      result.start.imply('hour', 6);
      result.start.imply('meridiem', 0);
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['JPCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;
/*
  Valid patterns:
  - esta manhã -> today in the morning
  - esta tarde -> today in the afternoon/evening
  - esta noite -> tonight
  - ontem de -> yesterday in the morning
  - ontem a tarde -> yesterday in the afternoon/evening
  - ontem a noite -> yesterday at night
  - amanhã de manhã -> tomorrow in the morning
  - amanhã a tarde -> tomorrow in the afternoon/evening
  - amanhã a noite -> tomorrow at night
  - hoje -> today
  - ontem -> yesterday
  - amanhã -> tomorrow
 */


var PATTERN = /(\W|^)(agora|esta\s*(manhã|tarde|noite)|(ontem|amanhã)\s*(de|à)\s*(manhã|tarde|noite)|hoje|amanhã|ontem|noite)(?=\W|$)/i;

exports.Parser = function PTCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

    if (lowerText == 'amanhã') {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (lowerText == 'ontem') {
      startMoment = startMoment.add(-1, 'day');
    } else if (lowerText == 'noite') {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match("esta")) {
      var secondMatch = match[3].toLowerCase();

      if (secondMatch == "tarde") {
        result.start.imply('hour', 18);
      } else if (secondMatch == "manhã") {
        result.start.imply('hour', 6);
      } else if (secondMatch == "noite") {
        // Normally means this coming midnight
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (lowerText.match(/de|à/)) {
      var firstMatch = match[4].toLowerCase();

      if (firstMatch === 'ontem') {
        startMoment = startMoment.add(-1, 'day');
      } else if (firstMatch === 'amanhã') {
        startMoment = startMoment.add(1, 'day');
      }

      var secondMatch = match[6].toLowerCase();

      if (secondMatch == "tarde") {
        result.start.imply('hour', 18);
      } else if (secondMatch == "manhã") {
        result.start.imply('hour', 9);
      } else if (secondMatch == "noite") {
        // Normally means this coming midnight
        result.start.imply('hour', 22);
        result.start.imply('meridiem', 1);
      }
    } else if (lowerText.match("agora")) {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['PTCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|em|em*até)\s*([0-9]+|mei[oa]|uma?)\s*(minutos?|horas?|dias?)\s*(?=(?:\W|$))/i;

exports.Parser = function PTDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[3]);

    if (isNaN(num)) {
      if (match[3].match(/(meio|meia)/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[4].match(/dia/)) {
      date = date.add(num, 'd');
      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (match[4].match(/hora/)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/minuto/)) {
      date = date.add(num, 'minute');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.tags['PTDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(34);

var DAYS_OFFSET = util.WEEKDAY_OFFSET;
var PATTERN = new RegExp('(\\W|^)' + '(?:(domingo|segunda|segunda-feira|terça|terça-feira|quarta|quarta-feira|quinta|quinta-feira|sexta|sexta-feira|sábado|sabado|dom|seg|ter|qua|qui|sex|sab)\\s*,?\\s*)?' + '([0-9]{1,2})(?:º|ª|°)?' + '(?:\\s*(?:desde|de|\\-|\\–|ao?|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' + '(Jan(?:eiro|\\.)?|Fev(?:ereiro|\\.)?|Mar(?:ço|\\.)?|Abr(?:il|\\.)?|Mai(?:o|\\.)?|Jun(?:ho|\\.)?|Jul(?:ho|\\.)?|Ago(?:sto|\\.)?|Set(?:embro|\\.)?|Out(?:ubro|\\.)?|Nov(?:embro|\\.)?|Dez(?:embro|\\.)?)' + '(?:\\s*(?:de?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function PTMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
          // antes de Cristo
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['PTMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'segunda': 1,
  'segunda-feira': 1,
  'seg': 1,
  'terça': 2,
  'terca': 2,
  'terça-feira': 2,
  'terca-feira': 2,
  'ter': 2,
  'quarta': 3,
  'quarta-feira': 3,
  'qua': 3,
  'quinta': 4,
  'quinta-feira': 4,
  'qui': 4,
  'sexta': 5,
  'sexta-feira': 5,
  'sex': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
exports.MONTH_OFFSET = {
  'janeiro': 1,
  'jan': 1,
  'jan.': 1,
  'fevereiro': 2,
  'fev': 2,
  'fev.': 2,
  'março': 3,
  'mar': 3,
  'mar.': 3,
  'abril': 4,
  'abr': 4,
  'abr.': 4,
  'maio': 5,
  'mai': 5,
  'mai.': 5,
  'junho': 6,
  'jun': 6,
  'jun.': 6,
  'julho': 7,
  'jul': 7,
  'jul.': 7,
  'agosto': 8,
  'ago': 8,
  'ago.': 8,
  'setembro': 9,
  'set': 9,
  'set.': 9,
  'outubro': 10,
  'out': 10,
  'out.': 10,
  'novembro': 11,
  'nov': 11,
  'nov.': 11,
  'dezembro': 12,
  'dez': 12,
  'dez.': 12
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '((?:domingo|dom|segunda|segunda-feira|seg|terça|terça-feira|ter|quarta|quarta-feira|qua|quinta|quinta-feira|qui|sexta|sexta-feira|sex|s[áa]bado|sab))' + '\\s*\\,?\\s*' + ')?' + '([0-1]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'segunda': 1,
  'segunda-feira': 1,
  'seg': 1,
  'terça': 2,
  'terça-feira': 2,
  'ter': 2,
  'quarta': 3,
  'quarta-feira': 3,
  'qua': 3,
  'quinta': 4,
  'quinta-feira': 4,
  'qui': 4,
  'sexta': 5,
  'sexta-feira': 5,
  'sex': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6; // in Spanish we use day/month/year

var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 4;
var DAY_GROUP = 3;
var YEAR_GROUP = 5;

exports.Parser = function PTSlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month
        // looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['PTSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)há\s*([0-9]+|mei[oa]|uma?)\s*(minutos?|horas?|semanas?|dias?|mes(es)?|anos?)(?=(?:\W|$))/i;

exports.Parser = function PTTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[2]);

    if (isNaN(num)) {
      if (match[2].match(/mei/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[3].match(/hora/) || match[3].match(/minuto/)) {
      if (match[3].match(/hora/)) {
        date = date.add(-num, 'hour');
      } else if (match[3].match(/minuto/)) {
        date = date.add(-num, 'minute');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.tags['PTTimeAgoFormatParser'] = true;
      return result;
    }

    if (match[3].match(/semana/)) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (match[3].match(/dia/)) {
      date = date.add(-num, 'd');
    }

    if (match[3].match(/mes/)) {
      date = date.add(-num, 'month');
    }

    if (match[3].match(/ano/)) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:ao?|às?|das|da|de|do)\\s*)?" + "(\\d{1,4}|meio-dia|meia-noite|meio dia|meia noite)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|a(?:o)?|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function PTTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['PTTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase().match(/meio\-di/)) {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "meia-noite") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
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
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      }

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p") {
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
    } else if (hour >= 12) {
      meridiem = 1;
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var updateParsedComponent = __webpack_require__(6).updateParsedComponent;

var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'segunda': 1,
  'segunda-feira': 1,
  'seg': 1,
  'terça': 2,
  'terça-feira': 2,
  'ter': 2,
  'quarta': 3,
  'quarta-feira': 3,
  'qua': 3,
  'quinta': 4,
  'quinta-feira': 4,
  'qui': 4,
  'sexta': 5,
  'sexta-feira': 5,
  'sex': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:(este|esta|passado|pr[oó]ximo)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(este|esta|passado|pr[óo]ximo)\\s*semana)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function PTWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];

    if (prefix || postfix) {
      var norm = prefix || postfix;
      norm = norm.toLowerCase();

      if (norm == 'passado') {
        modifier = 'this';
      } else if (norm == 'próximo' || norm == 'proximo') {
        modifier = 'next';
      } else if (norm == 'este') {
        modifier = 'this';
      }
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['PTWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;
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

exports.Parser = function ESCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

    if (lowerText == 'mañana') {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (lowerText == 'ayer') {
      startMoment = startMoment.add(-1, 'day');
    } else if (lowerText == 'anoche') {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
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
        startMoment = startMoment.add(-1, 'day');
      } else if (firstMatch === 'mañana') {
        startMoment = startMoment.add(1, 'day');
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

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['ESCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|en)\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|d[ií]as?)\s*(?=(?:\W|$))/i;

exports.Parser = function ESDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[3]);

    if (isNaN(num)) {
      if (match[3].match(/medi/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[4].match(/d[ií]a/)) {
      date = date.add(num, 'd');
      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (match[4].match(/hora/)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/minuto/)) {
      date = date.add(num, 'minute');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.tags['ESDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)hace\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|semanas?|d[ií]as?|mes(es)?|años?)(?=(?:\W|$))/i;

exports.Parser = function ESTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = parseInt(match[2]);

    if (isNaN(num)) {
      if (match[2].match(/medi/)) {
        num = 0.5;
      } else {
        num = 1;
      }
    }

    var date = dayjs(ref);

    if (match[3].match(/hora/) || match[3].match(/minuto/)) {
      if (match[3].match(/hora/)) {
        date = date.add(-num, 'hour');
      } else if (match[3].match(/minuto/)) {
        date = date.add(-num, 'minute');
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
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (match[3].match(/d[ií]a/)) {
      date = date.add(-num, 'd');
    }

    if (match[3].match(/mes/)) {
      date = date.add(-num, 'month');
    }

    if (match[3].match(/año/)) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:a las?|al?|desde|de)\\s*)?" + "(\\d{1,4}|mediod[ií]a|medianoche)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|a(?:\s*las)?|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function ESTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['ESTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase().match(/mediod/)) {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "medianoche") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
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
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      }

      if (match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p") {
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
    } else if (hour >= 12) {
      meridiem = 1;
    }

    result.text = result.text + match[0];
    result.end.assign('hour', hour);
    result.end.assign('minute', minute);

    if (meridiem >= 0) {
      result.end.assign('meridiem', meridiem);
    }

    if (result.end.date().getTime() < result.start.date().getTime()) {
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var updateParsedComponent = __webpack_require__(6).updateParsedComponent;

var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'lunes': 1,
  'lun': 1,
  'martes': 2,
  'mar': 2,
  'miercoles': 3,
  'miércoles': 3,
  'mie': 3,
  'jueves': 4,
  'jue': 4,
  'viernes': 5,
  'vier': 5,
  'sabado': 6,
  'sábado': 6,
  'sab': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:(este|pasado|pr[oó]ximo)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(este|pasado|pr[óo]ximo)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function ESWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];

    if (prefix || postfix) {
      var norm = prefix || postfix;
      norm = norm.toLowerCase();

      if (norm == 'pasado') {
        modifier = 'this';
      } else if (norm == 'próximo' || norm == 'proximo') {
        modifier = 'next';
      } else if (norm == 'este') {
        modifier = 'this';
      }
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['ESWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(45);

var DAYS_OFFSET = util.WEEKDAY_OFFSET;
var PATTERN = new RegExp('(\\W|^)' + '(?:(Domingo|Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Dom|Lun|Mar|Mie|Jue|Vie|Sab)\\s*,?\\s*)?' + '([0-9]{1,2})(?:º|ª|°)?' + '(?:\\s*(?:desde|de|\\-|\\–|al?|hasta|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' + '(Ene(?:ro|\\.)?|Feb(?:rero|\\.)?|Mar(?:zo|\\.)?|Abr(?:il|\\.)?|May(?:o|\\.)?|Jun(?:io|\\.)?|Jul(?:io|\\.)?|Ago(?:sto|\\.)?|Sep(?:tiembre|\\.)?|Set(?:iembre|\\.)?|Oct(?:ubre|\\.)?|Nov(?:iembre|\\.)?|Dic(?:iembre|\\.)?)' + '(?:\\s*(?:del?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function ESMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
          // antes de Cristo
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['ESMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.WEEKDAY_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'lunes': 1,
  'lun': 1,
  'martes': 2,
  'mar': 2,
  'miércoles': 3,
  'miercoles': 3,
  'mie': 3,
  'jueves': 4,
  'jue': 4,
  'viernes': 5,
  'vie': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
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
  'dic.': 12
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '((?:domingo|dom|lunes|lun|martes|mar|mi[ée]rcoles|mie|jueves|jue|viernes|vie|s[áa]bado|sab))' + '\\s*\\,?\\s*' + ')?' + '([0-1]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'domingo': 0,
  'dom': 0,
  'lunes': 1,
  'lun': 1,
  'martes': 2,
  'mar': 2,
  'miercoles': 3,
  'miércoles': 3,
  'mie': 3,
  'jueves': 4,
  'jue': 4,
  'viernes': 5,
  'vier': 5,
  'sábado': 6,
  'sabado': 6,
  'sab': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6; // in Spanish we use day/month/year

var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 4;
var DAY_GROUP = 3;
var YEAR_GROUP = 5;

exports.Parser = function ESSlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month
        // looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['ESSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)(maintenant|aujourd'hui|ajd|cette\s*nuit|la\s*veille|(demain|hier)(\s*(matin|soir|aprem|après-midi))?|ce\s*(matin|soir)|cet\s*(après-midi|aprem))(?=\W|$)/i;

exports.Parser = function FRCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;
    var lowerText = text.toLowerCase();

    if (lowerText.match(/demain/)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    }

    if (lowerText.match(/hier/)) {
      startMoment = startMoment.add(-1, 'day');
    }

    if (lowerText.match(/cette\s*nuit/)) {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (lowerText.match(/la\s*veille/)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText.match(/(après-midi|aprem)/)) {
      result.start.imply('hour', 14);
    } else if (lowerText.match(/(soir)/)) {
      result.start.imply('hour', 18);
    } else if (lowerText.match(/matin/)) {
      result.start.imply('hour', 8);
    } else if (lowerText.match("maintenant")) {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['FRCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(10);

var PATTERN = new RegExp('(\\W|^)' + '(dans|en)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|une?|(?:\\s*quelques)?|demi(?:\\s*|-?)?)\\s*' + '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|années?)\\s*' + '(?=\\W|$)', 'i');
var STRICT_PATTERN = new RegExp('(\\W|^)' + '(dans|en)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|un?)\\s*' + '(secondes?|minutes?|heures?|jours?)\\s*' + '(?=\\W|$)', 'i');

exports.Parser = function FRDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[3];

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'un' || num === 'une') {
      num = 1;
    } else if (num.match(/quelques?/i)) {
      num = 3;
    } else if (num.match(/demi-?/i)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (match[4].match(/jour|semaine|mois|année/i)) {
      if (match[4].match(/jour/)) {
        date = date.add(num, 'd');
      } else if (match[4].match(/semaine/i)) {
        date = date.add(num * 7, 'd');
      } else if (match[4].match(/mois/i)) {
        date = date.add(num, 'month');
      } else if (match[4].match(/année/i)) {
        date = date.add(num, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (match[4].match(/heure/i)) {
      date = date.add(num, 'hour');
    } else if (match[4].match(/min/i)) {
      date = date.add(num, 'minutes');
    } else if (match[4].match(/secondes/i)) {
      date = date.add(num, 'second');
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

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(10);

var DAYS_OFFSET = util.WEEKDAY_OFFSET;
var PATTERN = new RegExp('(\\W|^)' + '(?:(Dimanche|Lundi|Mardi|mercredi|Jeudi|Vendredi|Samedi|Dim|Lun|Mar|Mer|Jeu|Ven|Sam)\\s*,?\\s*)?' + '([0-9]{1,2}|1er)' + '(?:\\s*(?:au|\\-|\\–|jusqu\'au?|\\s)\\s*([0-9]{1,2})(?:er)?)?\\s*(?:de)?\\s*' + '(Jan(?:vier|\\.)?|F[ée]v(?:rier|\\.)?|Mars|Avr(?:il|\\.)?|Mai|Juin|Juil(?:let|\\.)?|Ao[uû]t|Sept(?:embre|\\.)?|Oct(?:obre|\\.)?|Nov(?:embre|\\.)?|d[ée]c(?:embre|\\.)?)' + '(?:\\s*(\\s*[0-9]{1,4}(?![^\\s]\\d))(?:\\s*(AC|[ap]\\.?\\s*c(?:h(?:r)?)?\\.?\\s*n\\.?))?)?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function FRMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/a/i.test(match[YEAR_BE_GROUP])) {
          // Ante Christe natum
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 janvier 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['FRMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '((?:dimanche|dim|lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|le))' + '\\s*\\,?\\s*' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'dimanche': 0,
  'dim': 0,
  'lundi': 1,
  'lun': 1,
  'mardi': 2,
  'mar': 2,
  'mercredi': 3,
  'mer': 3,
  'jeudi': 4,
  'jeu': 4,
  'vendredi': 5,
  'ven': 5,
  'samedi': 6,
  'sam': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6; // In French we use day/month/year

var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function FRSlashDateFormatParser(argument) {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var date = null;
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    day = parseInt(day);
    month = parseInt(month);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (year < 100) {
        year = year + 2000;
      }
    }

    if (month < 1 || month > 12) {
      if (month > 12) {
        // dd/mm/yyyy date format if day looks like a month, and month looks like a day.
        if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
          // unambiguous
          var tday = month;
          month = day;
          day = tday;
        } else {
          // both month and day are <= 12
          return null;
        }
      }
    }

    if (day < 1 || day > 31) return null;

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Day of week


    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['FRSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)il y a\s*([0-9]+|une?)\s*(minutes?|heures?|semaines?|jours?|mois|années?|ans?)(?=(?:\W|$))/i;

exports.Parser = function FRTimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
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

    var date = dayjs(ref);

    if (match[3].match(/heure/) || match[3].match(/minute/)) {
      if (match[3].match(/heure/)) {
        date = date.add(-num, 'hour');
      } else if (match[3].match(/minute/)) {
        date = date.add(-num, 'minute');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      return result;
    }

    if (match[3].match(/semaine/)) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (match[3].match(/jour/)) {
      date = date.add(-num, 'd');
    }

    if (match[3].match(/mois/)) {
      date = date.add(-num, 'month');
    }

    if (match[3].match(/années?|ans?/)) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:[àa])\\s*)?" + "(\\d{1,2}(?:h)?|midi|minuit)" + "(?:" + "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" + "(?:" + "(?:\\:|\\：|m)(\\d{0,2})(?:s)?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*" + "(\\d{1,2}(?:h)?)" + "(?:" + "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" + "(?:" + "(?:\\.|\\:|\\：|m)(\\d{1,2})(?:s)?" + ")?" + ")?" + "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function FRTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['FRTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (match[HOUR_GROUP].toLowerCase() == "midi") {
      meridiem = 1;
      hour = 12;
    } else if (match[HOUR_GROUP].toLowerCase() == "minuit") {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
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
    }

    result.start.assign('hour', hour);
    result.start.assign('minute', minute);

    if (meridiem >= 0) {
      result.start.assign('meridiem', meridiem);
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();

      if (ampm == "a") {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
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
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var updateParsedComponent = __webpack_require__(6).updateParsedComponent;

var DAYS_OFFSET = {
  'dimanche': 0,
  'dim': 0,
  'lundi': 1,
  'lun': 1,
  'mardi': 2,
  'mar': 2,
  'mercredi': 3,
  'mer': 3,
  'jeudi': 4,
  'jeu': 4,
  'vendredi': 5,
  'ven': 5,
  'samedi': 6,
  'sam': 6
};
var PATTERN = new RegExp('(\\s|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:(ce)\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(dernier|prochain)\\s*)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function FRWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];

    if (prefix || postfix) {
      var norm = prefix || postfix;
      norm = norm.toLowerCase();

      if (norm == 'dernier') {
        modifier = 'last';
      } else if (norm == 'prochain') {
        modifier = 'next';
      } else if (norm == 'ce') {
        modifier = 'this';
      }
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['FRWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var quarterOfYear = __webpack_require__(55);

var dayjs = __webpack_require__(2);

dayjs.extend(quarterOfYear);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(10);

var PATTERN = new RegExp('(\\W|^)' + '(?:les?|la|l\'|du|des?)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|\\d+)?\\s*' + '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?\\s*' + '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|trimestres?|années?)\\s*' + '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?' + '(?=\\W|$)', 'i');
var MULTIPLIER_GROUP = 2;
var MODIFIER_1_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;
var MODIFIER_2_GROUP = 5;

exports.Parser = function FRRelativeDateFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length); // Multiplier

    var multiplier = match[MULTIPLIER_GROUP] === undefined ? '1' : match[MULTIPLIER_GROUP];

    if (util.INTEGER_WORDS[multiplier] !== undefined) {
      multiplier = util.INTEGER_WORDS[multiplier];
    } else {
      multiplier = parseInt(multiplier);
    } // Modifier


    var modifier = match[MODIFIER_1_GROUP] === undefined ? match[MODIFIER_2_GROUP] === undefined ? '' : match[MODIFIER_2_GROUP].toLowerCase() : match[MODIFIER_1_GROUP].toLowerCase();

    if (!modifier) {
      // At least one modifier is mandatory to match this parser
      return;
    }

    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    result.tags['FRRelativeDateFormatParser'] = true;
    var modifierFactor;

    switch (true) {
      case /prochaine?s?/.test(modifier):
      case /suivants?/.test(modifier):
        modifierFactor = 1;
        break;

      case /derni[eè]re?s?/.test(modifier):
      case /pass[ée]e?s?/.test(modifier):
      case /pr[ée]c[ée]dents?/.test(modifier):
        modifierFactor = -1;
        break;
    }

    var total = multiplier * modifierFactor;
    var dateFrom = dayjs(ref);
    var dateTo = dayjs(ref);
    var relative = match[RELATIVE_WORD_GROUP];
    var startOf;

    switch (true) {
      case /secondes?/.test(relative):
        dateFrom = dateFrom.add(total, 's');
        dateTo = dateTo.add(modifierFactor, 's');
        startOf = 'second';
        break;

      case /min(?:ute)?s?/.test(relative):
        dateFrom = dateFrom.add(total, 'm');
        dateTo = dateTo.add(modifierFactor, 'm');
        startOf = 'minute';
        break;

      case /heures?/.test(relative):
        dateFrom = dateFrom.add(total, 'h');
        dateTo = dateTo.add(modifierFactor, 'h');
        startOf = 'hour';
        break;

      case /jours?/.test(relative):
        dateFrom = dateFrom.add(total, 'd');
        dateTo = dateTo.add(modifierFactor, 'd');
        startOf = 'day';
        break;

      case /semaines?/.test(relative):
        dateFrom = dateFrom.add(total, 'w');
        dateTo = dateTo.add(modifierFactor, 'w');
        startOf = 'week';
        break;

      case /mois?/.test(relative):
        dateFrom = dateFrom.add(total, 'M');
        dateTo = dateTo.add(modifierFactor, 'M');
        startOf = 'month';
        break;

      case /trimestres?/.test(relative):
        dateFrom = dateFrom.add(total, 'Q');
        dateTo = dateTo.add(modifierFactor, 'Q');
        startOf = 'quarter';
        break;

      case /années?/.test(relative):
        dateFrom = dateFrom.add(total, 'y');
        dateTo = dateTo.add(modifierFactor, 'y');
        startOf = 'year';
        break;
    } // if we go forward, switch the start and end dates


    if (modifierFactor > 0) {
      var dateTmp = dateFrom;
      dateFrom = dateTo;
      dateTo = dateTmp;
    } // Get start and end of dates


    dateFrom = dateFrom.startOf(startOf);
    dateTo = dateTo.endOf(startOf);

    if (startOf == 'week') {
      // Weekday in FR start on Sat?
      dateFrom = dateFrom.add(1, 'd');
      dateTo = dateTo.add(1, 'd');
    } // Assign results


    result.start.assign('year', dateFrom.year());
    result.start.assign('month', dateFrom.month() + 1);
    result.start.assign('day', dateFrom.date());
    result.start.assign('minute', dateFrom.minute());
    result.start.assign('second', dateFrom.second());
    result.start.assign('hour', dateFrom.hour());
    result.start.assign('millisecond', dateFrom.millisecond());
    result.end = result.start.clone();
    result.end.assign('year', dateTo.year());
    result.end.assign('month', dateTo.month() + 1);
    result.end.assign('day', dateTo.date());
    result.end.assign('minute', dateTo.minute());
    result.end.assign('second', dateTo.second());
    result.end.assign('hour', dateTo.hour());
    result.end.assign('millisecond', dateTo.millisecond());
    return result;
  };
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){"use strict";var t="month",n="quarter";return function(r,i){var e=i.prototype;e.quarter=function(t){return this.$utils().u(t)?Math.ceil((this.month()+1)/3):this.month(this.month()%3+3*(t-1))};var u=e.add;e.add=function(r,i){return r=Number(r),this.$utils().p(i)===n?this.add(3*r,t):u.bind(this)(r,i)};var s=e.startOf;e.startOf=function(r,i){var e=this.$utils(),u=!!e.u(i)||i;if(e.p(r)===n){var a=this.quarter()-1;return u?this.month(3*a).startOf(t).startOf("day"):this.month(3*a+2).endOf(t).endOf("day")}return s.bind(this)(r,i)}}});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(7);

var PATTERN = new RegExp('(\\d{2,4}|[' + Object.keys(util.NUMBER).join('') + ']{2,4})?' + '(?:\\s*)' + '(?:年)?' + '(?:[\\s|,|，]*)' + '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})' + '(?:\\s*)' + '(?:月)' + '(?:\\s*)' + '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})?' + '(?:\\s*)' + '(?:日|號)?');
var YEAR_GROUP = 1;
var MONTH_GROUP = 2;
var DAY_GROUP = 3;

exports.Parser = function ZHHantDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var startMoment = dayjs(ref);
    var result = new ParsedResult({
      text: match[0],
      index: match.index,
      ref: ref
    }); //Month

    var month = parseInt(match[MONTH_GROUP]);
    if (isNaN(month)) month = util.zhStringToNumber(match[MONTH_GROUP]);
    result.start.assign('month', month); //Day

    if (match[DAY_GROUP]) {
      var day = parseInt(match[DAY_GROUP]);
      if (isNaN(day)) day = util.zhStringToNumber(match[DAY_GROUP]);
      result.start.assign('day', day);
    } else {
      result.start.imply('day', startMoment.date());
    } //Year


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

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var updateParsedComponent = __webpack_require__(6).updateParsedComponent;

var util = __webpack_require__(7);

var PATTERN = new RegExp('(上|今|下|這|呢)?' + '(?:個)?' + '(?:星期|禮拜)' + '(' + Object.keys(util.WEEKDAY_OFFSET).join('|') + ')');
var PREFIX_GROUP = 1;
var WEEKDAY_GROUP = 2;

exports.Parser = function ZHHantWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    text = match[0];
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP];
    var offset = util.WEEKDAY_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var modifier = null;
    var prefix = match[PREFIX_GROUP];

    if (prefix == '上') {
      modifier = 'last';
    } else if (prefix == '下') {
      modifier = 'next';
    } else if (prefix == '今' || prefix == '這' || prefix == '呢') {
      modifier = 'this';
    }

    updateParsedComponent(result, ref, offset, modifier);
    result.tags['ZHHantWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var util = __webpack_require__(7);

var patternString1 = '(?:由|從|自)?' + '(?:' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|' + '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)' + '(?:[\\s,，]*)' + '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' + ')?' + '(?:[\\s,，]*)' + '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' + '(?:\\s*)' + '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' + '(?:\\s*)' + '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' + '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';
var patternString2 = '(?:^\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)' + '(?:' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|' + '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)' + '(?:[\\s,，]*)' + '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' + ')?' + '(?:[\\s,，]*)' + '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' + '(?:\\s*)' + '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' + '(?:\\s*)' + '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' + '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';
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

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index;
    result.text = match[0];
    result.tags.ZHTimeExpressionParser = true;
    var startMoment = refMoment.clone(); // ----- Day

    if (match[DAY_GROUP_1]) {
      var day1 = match[DAY_GROUP_1];

      if (day1 == '明' || day1 == '聽') {
        // Check not "Tomorrow" on late night
        if (refMoment.hour() > 1) {
          startMoment.add(1, 'day');
        }
      } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
        startMoment.add(-1, 'day');
      } else if (day1 == "前") {
        startMoment.add(-2, 'day');
      } else if (day1 == "大前") {
        startMoment.add(-3, 'day');
      } else if (day1 == "後") {
        startMoment.add(2, 'day');
      } else if (day1 == "大後") {
        startMoment.add(3, 'day');
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
      } else if (day3 == "前") {
        startMoment.add(-2, 'day');
      } else if (day3 == "大前") {
        startMoment.add(-3, 'day');
      } else if (day3 == "後") {
        startMoment.add(2, 'day');
      } else if (day3 == "大後") {
        startMoment.add(3, 'day');
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
    var meridiem = -1; // ----- Second

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
    } // ----- Minutes


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
    } // ----- AM & PM


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
    } // ==============================================================
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
    result.end = new ParsedComponents(null, null); // ----- Day

    if (match[DAY_GROUP_1]) {
      var day1 = match[DAY_GROUP_1];

      if (day1 == '明' || day1 == '聽') {
        // Check not "Tomorrow" on late night
        if (refMoment.hour() > 1) {
          endMoment.add(1, 'day');
        }
      } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
        endMoment.add(-1, 'day');
      } else if (day1 == "前") {
        endMoment.add(-2, 'day');
      } else if (day1 == "大前") {
        endMoment.add(-3, 'day');
      } else if (day1 == "後") {
        endMoment.add(2, 'day');
      } else if (day1 == "大後") {
        endMoment.add(3, 'day');
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
      } else if (day3 == "前") {
        endMoment.add(-2, 'day');
      } else if (day3 == "大前") {
        endMoment.add(-3, 'day');
      } else if (day3 == "後") {
        endMoment.add(2, 'day');
      } else if (day3 == "大後") {
        endMoment.add(3, 'day');
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
    meridiem = -1; // ----- Second

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
    } // ----- Minutes


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
    } // ----- AM & PM


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
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(而家|立(?:刻|即)|即刻)|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|' + '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' + '(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)' + '(?:[\\s|,|，]*)' + '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?', 'i');
var NOW_GROUP = 1;
var DAY_GROUP_1 = 2;
var TIME_GROUP_1 = 3;
var TIME_GROUP_2 = 4;
var DAY_GROUP_3 = 5;
var TIME_GROUP_3 = 6;

exports.Parser = function ZHHantCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    text = match[0];
    var index = match.index;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var startMoment = refMoment;

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
        if (refMoment.hour() > 1) {
          startMoment = startMoment.add(1, 'day');
        }
      } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
        startMoment = startMoment.add(-1, 'day');
      } else if (day1 == "前") {
        startMoment = startMoment.add(-2, 'day');
      } else if (day1 == "大前") {
        startMoment = startMoment.add(-3, 'day');
      } else if (day1 == "後") {
        startMoment = startMoment.add(2, 'day');
      } else if (day1 == "大後") {
        startMoment = startMoment.add(3, 'day');
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
        if (refMoment.hour() > 1) {
          startMoment = startMoment.add(1, 'day');
        }
      } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
        startMoment = startMoment.add(-1, 'day');
      } else if (day3 == "前") {
        startMoment = startMoment.add(-2, 'day');
      } else if (day3 == "大前") {
        startMoment = startMoment.add(-3, 'day');
      } else if (day3 == "後") {
        startMoment = startMoment.add(2, 'day');
      } else if (day3 == "大後") {
        startMoment = startMoment.add(3, 'day');
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

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags.ZHHantCasualDateParser = true;
    return result;
  };
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(7);

var PATTERN = new RegExp('(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+|半|幾)(?:\\s*)' + '(?:個)?' + '(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)' + '(?:(?:之|過)?後|(?:之)?內)', 'i');
var NUMBER_GROUP = 1;
var UNIT_GROUP = 2;

exports.Parser = function ZHHantCasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index;
    text = match[0];
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var number = parseInt(match[NUMBER_GROUP]);

    if (isNaN(number)) {
      number = util.zhStringToNumber(match[NUMBER_GROUP]);
    }

    if (isNaN(number)) {
      var string = match[NUMBER_GROUP];

      if (string === '幾') {
        number = 3;
      } else if (string === '半') {
        number = 0.5;
      } else {
        //just in case
        return null;
      }
    }

    var date = dayjs(ref);
    var unit = match[UNIT_GROUP];
    var unitAbbr = unit[0];

    if (unitAbbr.match(/[日天星禮月年]/)) {
      if (unitAbbr == '日' || unitAbbr == '天') {
        date = date.add(number, 'd');
      } else if (unitAbbr == '星' || unitAbbr == '禮') {
        date = date.add(number * 7, 'd');
      } else if (unitAbbr == '月') {
        date = date.add(number, 'month');
      } else if (unitAbbr == '年') {
        date = date.add(number, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (unitAbbr == '秒') {
      date = date.add(number, 'second');
    } else if (unitAbbr == '分') {
      date = date.add(number, 'minute');
    } else if (unitAbbr == '小' || unitAbbr == '鐘') {
      date = date.add(number, 'hour');
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

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/*


*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(8);

var PATTERN = new RegExp('(\\W|^)' + '(in|nach)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|einigen|eine[rm]\\s*halben|eine[rm])\\s*' + '(sekunden?|min(?:ute)?n?|stunden?|tag(?:en)?|wochen?|monat(?:en)?|jahr(?:en)?)\\s*' + '(?=\\W|$)', 'i');
var STRICT_PATTERN = new RegExp('(\\W|^)' + '(in|nach)\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|eine(?:r|m)?)\\s*' + '(sekunden?|minuten?|stunden?|tag(?:en)?)\\s*' + '(?=\\W|$)', 'i');

exports.Parser = function DEDeadlineFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[3].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'einer' || num === 'einem') {
      num = 1;
    } else if (num === 'einigen') {
      num = 3;
    } else if (/halben/.test(num)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (/tag|woche|monat|jahr/i.test(match[4])) {
      if (/tag/i.test(match[4])) {
        date = date.add(num, 'd');
      } else if (/woche/i.test(match[4])) {
        date = date.add(num * 7, 'd');
      } else if (/monat/i.test(match[4])) {
        date = date.add(num, 'month');
      } else if (/jahr/i.test(match[4])) {
        date = date.add(num, 'year');
      }

      result.start.assign('year', date.year());
      result.start.assign('month', date.month() + 1);
      result.start.assign('day', date.date());
      return result;
    }

    if (/stunde/i.test(match[4])) {
      date = date.add(num, 'hour');
    } else if (/min/i.test(match[4])) {
      date = date.add(num, 'minute');
    } else if (/sekunde/i.test(match[4])) {
      date = date.add(num, 'second');
    }

    result.start.imply('year', date.year());
    result.start.imply('month', date.month() + 1);
    result.start.imply('day', date.date());
    result.start.assign('hour', date.hour());
    result.start.assign('minute', date.minute());
    result.start.assign('second', date.second());
    result.tags['DEDeadlineFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(8);

var PATTERN = new RegExp('(\\W|^)' + '(?:am\\s*?)?' + '(?:(Sonntag|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|So|Mo|Di|Mi|Do|Fr|Sa)\\s*,?\\s*)?' + '(?:den\\s*)?' + '([0-9]{1,2})\\.' + '(?:\\s*(?:bis(?:\\s*(?:am|zum))?|\\-|\\–|\\s)\\s*([0-9]{1,2})\\.)?\\s*' + '(Jan(?:uar|\\.)?|Feb(?:ruar|\\.)?|Mär(?:z|\\.)?|Maerz|Mrz\\.?|Apr(?:il|\\.)?|Mai|Jun(?:i|\\.)?|Jul(?:i|\\.)?|Aug(?:ust|\\.)?|Sep(?:t|t\\.|tember|\\.)?|Okt(?:ober|\\.)?|Nov(?:ember|\\.)?|Dez(?:ember|\\.)?)' + '(?:' + ',?\\s*([0-9]{1,4}(?![^\\s]\\d))' + '(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?' + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function DEMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (/v/i.test(match[YEAR_BE_GROUP])) {
          // v.Chr.
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 January 2012'


    if (match[DATE_TO_GROUP]) {
      result.end = result.start.clone();
      result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
    }

    result.tags['DEMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/*
    
    The parser for parsing month name and year.
    
    EX. 
        - Januar
        - Januar 2012
*/
var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(8);

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' + '(Jan\\.?|Januar|Feb\\.?|Februar|Mär\\.?|M(?:ä|ae)rz|Mrz\\.?|Apr\\.?|April|Mai\\.?|Jun\\.?|Juni|Jul\\.?|Juli|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Okt\\.?|Oktober|Nov\\.?|November|Dez\\.?|Dezember)' + '\\s*' + '(?:' + ',?\\s*(?:([0-9]{4})(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?|([0-9]{1,4})\\s*([vn]\\.?\\s*C(?:hr)?\\.?))' + ')?' + '(?=[^\\s\\w]|$)', 'i');
var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;
var YEAR_GROUP2 = 5;
var YEAR_BE_GROUP2 = 6;

exports.Parser = function ENMonthNameParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = 1;
    var year = null;

    if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
      year = match[YEAR_GROUP] || match[YEAR_GROUP2];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2]) {
        if (/v/i.test(match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2])) {
          // v.Chr.
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    }

    if (this.isStrictMode() && result.text.match(/^\w+$/)) {
      return false;
    }

    result.tags['DEMonthNameParser'] = true;
    return result;
  };
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015
    - 11/3/2015
    - 11/3
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:am\\s*?)?' + '((?:sonntag|so|montag|mo|dienstag|di|mittwoch|mi|donnerstag|do|freitag|fr|samstag|sa))' + '\\s*\\,?\\s*' + '(?:den\\s*)?' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var DAYS_OFFSET = {
  'sonntag': 0,
  'so': 0,
  'montag': 1,
  'mo': 1,
  'dienstag': 2,
  'di': 2,
  'mittwoch': 3,
  'mi': 3,
  'donnerstag': 4,
  'do': 4,
  'freitag': 5,
  'fr': 5,
  'samstag': 6,
  'sa': 6
};
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;
var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function DESlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['DESlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(8);

var PATTERN = new RegExp('' + '(\\W|^)vor\\s*' + '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|einigen|eine[rm]\\s*halben|eine[rm])\\s*' + '(sekunden?|min(?:ute)?n?|stunden?|wochen?|tag(?:en)?|monat(?:en)?|jahr(?:en)?)\\s*' + '(?=(?:\\W|$))', 'i');
var STRICT_PATTERN = new RegExp('' + '(\\W|^)vor\\s*' + '([0-9]+|eine(?:r|m))\\s*' + '(sekunden?|minuten?|stunden?|tag(?:en)?)' + '(?=(?:\\W|$))', 'i');

exports.Parser = function DETimeAgoFormatParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var text = match[0];
    text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var num = match[2].toLowerCase();

    if (util.INTEGER_WORDS[num] !== undefined) {
      num = util.INTEGER_WORDS[num];
    } else if (num === 'einer' || num === 'einem') {
      num = 1;
    } else if (num === 'einigen') {
      num = 3;
    } else if (/halben/.test(num)) {
      num = 0.5;
    } else {
      num = parseInt(num);
    }

    var date = dayjs(ref);

    if (/stunde|min|sekunde/i.test(match[3])) {
      if (/stunde/i.test(match[3])) {
        date = date.add(-num, 'hour');
      } else if (/min/i.test(match[3])) {
        date = date.add(-num, 'minute');
      } else if (/sekunde/i.test(match[3])) {
        date = date.add(-num, 'second');
      }

      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags['DETimeAgoFormatParser'] = true;
      return result;
    }

    if (/woche/i.test(match[3])) {
      date = date.add(-num, 'week');
      result.start.imply('day', date.date());
      result.start.imply('month', date.month() + 1);
      result.start.imply('year', date.year());
      result.start.imply('weekday', date.day());
      return result;
    }

    if (/tag/i.test(match[3])) {
      date = date.add(-num, 'd');
    }

    if (/monat/i.test(match[3])) {
      date = date.add(-num, 'month');
    }

    if (/jahr/i.test(match[3])) {
      date = date.add(-num, 'year');
    }

    result.start.assign('day', date.date());
    result.start.assign('month', date.month() + 1);
    result.start.assign('year', date.year());
    return result;
  };
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/*


*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:um|von)\\s*)?" + "(\\d{1,4}|mittags?|mitternachts?)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*uhr)?" + "(?:\\s*(morgens|vormittags|mittags|nachmittags|abends|nachts))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|bis|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(morgens|vormittags|mittags|nachmittags|abends|nachts))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function DETimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['DETimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (/mittags?/i.test(match[HOUR_GROUP])) {
      meridiem = 1;
      hour = 12;
    } else if (/mitternachts?/i.test(match[HOUR_GROUP])) {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === 'morgens' || ampm === 'vormittags') {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else {
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
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === 'morgens' || ampm === 'vormittags') {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      } else {
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
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/*


*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var DAYS_OFFSET = {
  'sonntag': 0,
  'so': 0,
  'montag': 1,
  'mo': 1,
  'dienstag': 2,
  'di': 2,
  'mittwoch': 3,
  'mi': 3,
  'donnerstag': 4,
  'do': 4,
  'freitag': 5,
  'fr': 5,
  'samstag': 6,
  'sa': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:a[mn]\\s*?)?' + '(?:(diese[mn]|letzte[mn]|n(?:ä|ae)chste[mn])\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(diese|letzte|n(?:ä|ae)chste)\\s*woche)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function DEWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];
    if (offset === undefined) return null;
    var startMoment = dayjs(ref);
    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];
    var refOffset = startMoment.day();
    var norm = prefix || postfix;
    norm = norm || '';
    norm = norm.toLowerCase();

    if (/letzte/.test(norm)) {
      startMoment = startMoment.day(offset - 7);
    } else if (/n(?:ä|ae)chste/.test(norm)) {
      startMoment = startMoment.day(offset + 7);
    } else if (/diese/.test(norm)) {
      if (opt.forwardDate && refOffset > offset) {
        startMoment = startMoment.day(offset + 7);
      } else {
        startMoment = startMoment.day(offset);
      }
    } else {
      if (opt.forwardDate && refOffset > offset) {
        startMoment = startMoment.day(offset + 7);
      } else if (!opt.forwardDate && Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
        startMoment = startMoment.day(offset - 7);
      } else if (!opt.forwardDate && Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
        startMoment = startMoment.day(offset + 7);
      } else {
        startMoment = startMoment.day(offset);
      }
    }

    result.start.assign('weekday', offset);
    result.start.imply('day', startMoment.date());
    result.start.imply('month', startMoment.month() + 1);
    result.start.imply('year', startMoment.year());
    return result;
  };
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)(' + 'jetzt|' + '(?:heute|diesen)\\s*(morgen|vormittag|mittag|nachmittag|abend)|' + '(?:heute|diese)\\s*nacht|' + 'heute|' + '(?:(?:ü|ue)ber)?morgen(?:\\s*(morgen|vormittag|mittag|nachmittag|abend|nacht))?|' + '(?:vor)?gestern(?:\\s*(morgen|vormittag|mittag|nachmittag|abend|nacht))?|' + 'letzte\\s*nacht' + ')(?=\\W|$)', 'i');

exports.Parser = function DECasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var lowerText = text.toLowerCase();
    var startMoment = refMoment;

    if (/(?:heute|diese)\s*nacht/.test(lowerText)) {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (/^(?:ü|ue)bermorgen/.test(lowerText)) {
      startMoment = startMoment.add(refMoment.hour() > 1 ? 2 : 1, 'day');
    } else if (/^morgen/.test(lowerText)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (/^gestern/.test(lowerText)) {
      startMoment = startMoment.add(-1, 'day');
    } else if (/^vorgestern/.test(lowerText)) {
      startMoment = startMoment.add(-2, 'day');
    } else if (/letzte\s*nacht/.test(lowerText)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText === 'jetzt') {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    var secondMatch = match[3] || match[4] || match[5];

    if (secondMatch) {
      switch (secondMatch.toLowerCase()) {
        case 'morgen':
          result.start.imply('hour', 6);
          break;

        case 'vormittag':
          result.start.imply('hour', 9);
          break;

        case 'mittag':
          result.start.imply('hour', 12);
          break;

        case 'nachmittag':
          result.start.imply('hour', 15);
          result.start.imply('meridiem', 1);
          break;

        case 'abend':
          result.start.imply('hour', 18);
          result.start.imply('meridiem', 1);
          break;

        case 'nacht':
          result.start.imply('hour', 0);
          break;
      }
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['DECasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/*

    The parser for parsing month name and year.

    EX.
        - januari
        - januari 2012
        - januari, 2012
*/
var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(11);

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' + '(' + util.MONTH_PATTERN + ')' + '\\s*' + '(?:' + '[,-]?\\s*([0-9]{4})(\\s*BE|n\.Chr\.|v\.Chr\.)?' + ')?' + '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');
var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var day = 1;
    var monthName = match[MONTH_NAME_GROUP];
    var month = util.MONTH_OFFSET[monthName.toLowerCase()];
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];
      year = parseInt(year);

      if (match[YEAR_BE_GROUP]) {
        if (match[YEAR_BE_GROUP].match(/BE/)) {
          // Buddhist Era
          year = year - 543;
        } else if (match[YEAR_BE_GROUP].match(/v\.Chr\./)) {
          // Before Christ
          year = -year;
        }
      } else if (year < 100) {
        year = year + 2000;
      }
    }

    if (year) {
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.imply('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    }

    if (result.text.match(/^\w{3}$/)) {
      return false;
    }

    result.tags['NLMonthNameParser'] = true;
    return result;
  };
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(1);

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(11);

var PATTERN = new RegExp('(\\W|^)' + '(?:op\\s*?)?' + '(?:' + '(' + util.WEEKDAY_PATTERN + ')' + '\\s*,?\\s*)?' + '([0-9]{1,2})\.?' + '(?:\\s*(?:tot|\\-|\\–|tot en met|t\\/m)\\s*([0-9]{1,2})\.?)?\\s*' + '(' + util.MONTH_PATTERN + ')' + '(?:' + '(?:-|\/|,?\\s*)' + '((?:' + '[1-9][0-9]{0,3}\\s*(?:BE|n\.Chr\.|v\.Chr\.)|' + '[1-2][0-9]{3}|' + '[5-9][0-9]' + ')(?![^\\s]\\d))' + ')?' + '(?=\\W|$)', 'i');
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;

exports.Parser = function ENMonthNameLittleEndianParser() {
  parser.Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var result = new ParsedResult({
      text: match[0].substr(match[1].length, match[0].length - match[1].length),
      index: match.index + match[1].length,
      ref: ref
    });
    var month = match[MONTH_NAME_GROUP];
    month = util.MONTH_OFFSET[month.toLowerCase()];
    var day = match[DATE_GROUP];
    day = parseInt(day);
    var year = null;

    if (match[YEAR_GROUP]) {
      year = match[YEAR_GROUP];

      if (/BE/i.test(year)) {
        // Buddhist Era
        year = year.replace(/BE/i, '');
        year = parseInt(year) - 543;
      } else if (/v\.Chr\./i.test(year)) {
        // Before Christ
        year = year.replace(/v\.Chr\./i, '');
        year = -parseInt(year);
      } else if (/n\.Chr\./i.test(year)) {
        year = year.replace(/n\.Chr\./i, '');
        year = parseInt(year);
      } else {
        year = parseInt(year);

        if (year < 100) {
          if (year > 50) {
            year = year + 1900;
          } else {
            year = year + 2000;
          }
        }
      }
    }

    if (year) {
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.assign('year', year);
    } else {
      year = parser.findYearClosestToRef(ref, day, month);
      result.start.assign('day', day);
      result.start.assign('month', month);
      result.start.imply('year', year);
    } // Weekday component


    if (match[WEEKDAY_GROUP]) {
      var weekday = match[WEEKDAY_GROUP];
      weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
      result.start.assign('weekday', weekday);
    } // Text can be 'range' value. Such as '12 - 13 januari 2012'


    if (match[DATE_TO_GROUP]) {
      var endDate = parseInt(match[DATE_TO_GROUP]);
      result.end = result.start.clone();
      result.end.assign('day', endDate);
    }

    result.tags['NLMonthNameLittleEndianParser'] = true;
    return result;
  };
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Date format with slash "/" (also "-" and ".") between numbers
    - dinsdag 11/3/2015
    - 11/3/2015
    - 11/3
    - dinsdag 11.mrt.15
*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var util = __webpack_require__(11);

var PATTERN = new RegExp('(\\W|^)' + '(?:' + '(?:op\\s*?)?' + '(' + util.WEEKDAY_PATTERN + ')' + '\\s*\\,?\\s*' + '(?:de\\s*)?' + ')?' + '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-1]{0,1}[0-9]{1}|' + util.MONTH_PATTERN + ')' + '(?:' + '[\\/\\.\\-]' + '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' + ')?' + '(\\W|$)', 'i');
var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;
var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function DESlashDateFormatParser(argument) {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    if (match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
      // Long skip, if there is some overlapping like:
      // XX[/YY/ZZ]
      // [XX/YY/]ZZ
      match.index += match[0].length;
      return;
    }

    var index = match.index + match[OPENNING_GROUP].length;
    var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);
    var result = new ParsedResult({
      text: text,
      index: index,
      ref: ref
    });
    if (text.match(/^\d\.\d$/)) return;
    if (text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return; // MM/dd -> OK
    // MM.dd -> NG

    if (!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;
    var year = match[YEAR_GROUP] || dayjs(ref).year() + '';
    var month = match[MONTH_GROUP];
    var day = match[DAY_GROUP];
    month = parseInt(month);

    if (!month) {
      month = util.MONTH_OFFSET[match[MONTH_GROUP].trim().toLowerCase()];
    }

    day = parseInt(day);
    year = parseInt(year);
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    if (year < 100) {
      if (year > 50) {
        year = year + 1900;
      } else {
        year = year + 2000;
      }
    }

    result.start.assign('day', day);
    result.start.assign('month', month);
    result.start.assign('year', year); //Day of week

    if (match[WEEKDAY_GROUP]) {
      result.start.assign('weekday', util.WEEKDAY_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
    }

    result.tags['NLSlashDateFormatParser'] = true;
    return result;
  };
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var DAYS_OFFSET = {
  'zondag': 0,
  'zo': 0,
  'maandag': 1,
  'ma': 1,
  'dinsdag': 2,
  'di': 2,
  'woensdag': 3,
  'wo': 3,
  'donderdag': 4,
  'do': 4,
  'vrijdag': 5,
  'vr': 5,
  'zaterdag': 6,
  'za': 6
};
var PATTERN = new RegExp('(\\W|^)' + '(?:(?:\\,|\\(|\\（)\\s*)?' + '(?:on\\s*?)?' + '(?:(deze|afgelopen|vorige|volgende|komende)\\s*(?:week)?\\s*)?' + '(' + Object.keys(DAYS_OFFSET).join('|') + ')' + '(?:\\s*(?:\\,|\\)|\\）))?' + '(?:\\s*(deze|afgelopen|vorige|volgende|komende)\\s*week)?' + '(?=\\W|$)', 'i');
var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {
  var startMoment = dayjs(ref);
  var startMomentFixed = false;
  var refOffset = startMoment.day();

  if (modifier == 'afgelopen' || modifier == 'vorige') {
    startMoment = startMoment.day(offset - 7);
    startMomentFixed = true;
  } else if (modifier == 'volgende') {
    startMoment = startMoment.day(offset + 7);
    startMomentFixed = true;
  } else if (modifier == 'deze' || modifier == 'komende') {
    startMoment = startMoment.day(offset);
  } else {
    if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset - 7);
    } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
      startMoment = startMoment.day(offset + 7);
    } else {
      startMoment = startMoment.day(offset);
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

exports.Parser = function NLWeekdayParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var index = match.index + match[1].length;
    var text = match[0].substr(match[1].length, match[0].length - match[1].length);
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
    var offset = DAYS_OFFSET[dayOfWeek];

    if (offset === undefined) {
      return null;
    }

    var prefix = match[PREFIX_GROUP];
    var postfix = match[POSTFIX_GROUP];
    var norm = prefix || postfix;
    norm = norm || '';
    norm = norm.toLowerCase();
    exports.updateParsedComponent(result, ref, offset, norm);
    result.tags['NLWeekdayParser'] = true;
    return result;
  };
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/*


*/
var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var ParsedComponents = __webpack_require__(0).ParsedComponents;

var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)" + "(?:(?:om|van)\\s*)?" + "(\\d{1,4}|tussen de middag|middernachts?)" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\:|\\：)(\\d{2})" + ")?" + ")?" + "(?:\\s*uur)?" + "(?:\\s*(\'s morgens|\'s ochtends|in de ochtend|\'s middags|in de middag|\'s avonds|in de avond|\'s nachts))?" + "(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*" + "(\\-|\\–|\\~|\\〜|tot|\\?)\\s*" + "(\\d{1,4})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + "(?:" + "(?:\\.|\\:|\\：)(\\d{1,2})" + ")?" + ")?" + "(?:\\s*(\'s morgens|\'s ochtends|in de ochtend|\'s middags|in de middag|\'s avonds|in de avond|\'s nachts))?" + "(?=\\W|$)", 'i');
var HOUR_GROUP = 2;
var MINUTE_GROUP = 3;
var SECOND_GROUP = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function NLTimeExpressionParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return FIRST_REG_PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    // This pattern can be overlaped Ex. [12] AM, 1[2] AM
    if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
    var refMoment = dayjs(ref);
    var result = new ParsedResult();
    result.ref = ref;
    result.index = match.index + match[1].length;
    result.text = match[0].substring(match[1].length);
    result.tags['NLTimeExpressionParser'] = true;
    result.start.imply('day', refMoment.date());
    result.start.imply('month', refMoment.month() + 1);
    result.start.imply('year', refMoment.year());
    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.start.assign('second', second);
    } // ----- Hours


    if (/tussen de middag/i.test(match[HOUR_GROUP])) {
      meridiem = 1;
      hour = 12;
    } else if (/middernachts?/i.test(match[HOUR_GROUP])) {
      meridiem = 0;
      hour = 0;
    } else {
      hour = parseInt(match[HOUR_GROUP]);
    } // ----- Minutes


    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === "'s ochtends" || ampm === 'in de ochtend' || ampm === "'s morgens") {
        meridiem = 0;
        if (hour == 12) hour = 0;
      } else {
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
    } // ==============================================================
    //                  Extracting the 'to' chunk
    // ==============================================================


    match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));

    if (!match) {
      // Not accept number only result
      if (result.text.match(/^\d+$/)) {
        return null;
      }

      return result;
    } // Pattern "YY.YY -XXXX" is more like timezone offset


    if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
      return result;
    }

    if (result.end == null) {
      result.end = new ParsedComponents(null, result.start.date());
    }

    var hour = 0;
    var minute = 0;
    var meridiem = -1; // ----- Second

    if (match[SECOND_GROUP] != null) {
      var second = parseInt(match[SECOND_GROUP]);
      if (second >= 60) return null;
      result.end.assign('second', second);
    }

    hour = parseInt(match[2]); // ----- Minute

    if (match[MINUTE_GROUP] != null) {
      minute = parseInt(match[MINUTE_GROUP]);
      if (minute >= 60) return result;
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
    } // ----- AM & PM


    if (match[AM_PM_HOUR_GROUP] != null) {
      if (hour > 12) return null;
      var ampm = match[AM_PM_HOUR_GROUP].toLowerCase();

      if (ampm === '\'s ochtends' || ampm === 'in de ochtend' || ampm === '\'s morgens') {
        meridiem = 0;

        if (hour == 12) {
          hour = 0;

          if (!result.end.isCertain('day')) {
            result.end.imply('day', result.end.get('day') + 1);
          }
        }
      } else {
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
      result.end.imply('day', result.end.get('day') + 1);
    }

    return result;
  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var dayjs = __webpack_require__(2);

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = new RegExp('(\\W|^)(' + 'nu|' + 'vroeg in de ochtend|' + '(?:van|deze)\\s*(morgen|ochtend|middag|avond)|' + '\'s morgens|\'s ochtends|tussen de middag|\'s middags|\'s avonds|' + '(?:deze|van)\\s*nacht|' + 'vandaag|' + '(?:over)?morgen(?:\\s*(ochtend|middag|avond|nacht))?|' + '(?:eer)?gister(?:\\s*(ochtend|middag|avond|nacht))?|' + 'afgelopen\\s*nacht' + ')(?=\\W|$)', 'i');

exports.Parser = function DECasualDateParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    var refMoment = dayjs(ref);
    var lowerText = text.toLowerCase();
    var startMoment = refMoment;

    if (/(?:van|deze)\s*nacht/.test(lowerText)) {
      // Normally means this coming midnight
      result.start.imply('hour', 22);
      result.start.imply('meridiem', 1);
    } else if (/^overmorgen/.test(lowerText)) {
      startMoment = startMoment.add(refMoment.hour() > 1 ? 2 : 1, 'day');
    } else if (/^morgen/.test(lowerText)) {
      // Check not "Tomorrow" on late night
      if (refMoment.hour() > 1) {
        startMoment = startMoment.add(1, 'day');
      }
    } else if (/^gisteren/.test(lowerText)) {
      startMoment = startMoment.add(-1, 'day');
    } else if (/^eergisteren/.test(lowerText)) {
      startMoment = startMoment.add(-2, 'day');
    } else if (/afgelopen\s*nacht/.test(lowerText)) {
      result.start.imply('hour', 0);

      if (refMoment.hour() > 6) {
        startMoment = startMoment.add(-1, 'day');
      }
    } else if (lowerText === 'nu') {
      result.start.imply('hour', refMoment.hour());
      result.start.imply('minute', refMoment.minute());
      result.start.imply('second', refMoment.second());
      result.start.imply('millisecond', refMoment.millisecond());
    }

    var secondMatch = match[3] || match[4] || match[5];

    if (secondMatch) {
      switch (secondMatch.toLowerCase()) {
        case 'vroeg in de ochtend':
          result.start.imply('hour', 6);
          break;

        case 'ochtend':
        case 'morgen':
        case '\'s ochtends':
        case '\'s morgends':
          result.start.imply('hour', 9);
          break;

        case 'tussen de middag':
          result.start.imply('hour', 12);
          break;

        case 'middag':
        case 'in de middag':
        case '\'s middags':
          result.start.imply('hour', 15);
          result.start.imply('meridiem', 1);
          break;

        case 'avond':
        case "'s avonds":
          result.start.imply('hour', 18);
          result.start.imply('meridiem', 1);
          break;

        case 'nacht':
        case "'s nachts":
          result.start.imply('hour', 0);
          break;
      }
    }

    result.start.assign('day', startMoment.date());
    result.start.assign('month', startMoment.month() + 1);
    result.start.assign('year', startMoment.year());
    result.tags['NLCasualDateParser'] = true;
    return result;
  };
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1).Parser;

var ParsedResult = __webpack_require__(0).ParsedResult;

var PATTERN = /(\W|^)((deze)?\s*('s morgens|'s ochtends|in de ochtend|'s middags|in de middag|'s avonds|in de avond|'s nachts|ochtend|tussen de middag|middag|avond|nacht))/i;
var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser() {
  Parser.apply(this, arguments);

  this.pattern = function () {
    return PATTERN;
  };

  this.extract = function (text, ref, match, opt) {
    var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new ParsedResult({
      index: index,
      text: text,
      ref: ref
    });
    if (!match[TIME_MATCH]) TIME_MATCH = 3;

    switch (match[TIME_MATCH].toLowerCase()) {
      case 'middag':
      case 'in de middag':
      case '\'s middags':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 15);
        break;

      case 'avond':
      case 'in de avond':
      case '\'s avonds':
        result.start.imply('meridiem', 1);
        result.start.imply('hour', 20);
        break;

      case 'middernacht':
      case 'nacht':
      case '\'s nachts':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 0);
        break;

      case 'ochtend':
      case '\s morgens':
      case '\s ochtends':
      case 'in de ochtend':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 9);
        break;

      case 'tussen de middag':
        result.start.imply('meridiem', 0);
        result.start.imply('hour', 12);
        break;
    }

    result.tags['NLCasualTimeParser'] = true;
    return result;
  };
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var Refiner = __webpack_require__(3).Refiner;

exports.Refiner = function OverlapRemovalRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
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
  };
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var Refiner = __webpack_require__(3).Refiner;

var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(GMT|UTC)?(\\+|\\-)(\\d{1,2}):?(\\d{2})", 'i');
var TIMEZONE_OFFSET_SIGN_GROUP = 2;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 3;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 4;

exports.Refiner = function ExtractTimezoneOffsetRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    results.forEach(function (result) {
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
  };
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/*

*/
var Refiner = __webpack_require__(3).Refiner; // Map ABBR -> Offset in minute


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

exports.Refiner = function ExtractTimezoneAbbrRefiner(config) {
  Refiner.call(this, arguments);

  this.refine = function (text, results, opt) {
    var timezones = new Object(DEFAULT_TIMEZONE_ABBR_MAP);

    if (opt.timezones) {
      for (var name in opt.timezones) {
        timezones[name] = opt.timezones[name];
      }
    }

    results.forEach(function (result) {
      if (!result.tags['ENTimeExpressionParser'] && !result.tags['ENCasualTimeParser'] && !result.tags['ZHTimeExpressionParser'] && !result.tags['FRTimeExpressionParser'] && !result.tags['DETimeExpressionParser']) {
        return;
      }

      var match = TIMEZONE_NAME_PATTERN.exec(text.substring(result.index + result.text.length));

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
        result.tags['ExtractTimezoneAbbrRefiner'] = true;
      }
    });
    return results;
  };
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/
var dayjs = __webpack_require__(2);

var Refiner = __webpack_require__(3).Refiner;

exports.Refiner = function ForwardDateRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (!opt['forwardDate']) {
      return results;
    }

    results.forEach(function (result) {
      var refMoment = dayjs(result.ref);

      if (result.start.isOnlyDayMonthComponent() && refMoment.isAfter(result.start.dayjs())) {
        // Adjust year into the future
        for (var i = 0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
          result.start.imply('year', result.start.get('year') + 1);

          if (result.end && !result.end.isCertain('year')) {
            result.end.imply('year', result.end.get('year') + 1);
          }
        }

        result.tags['ForwardDateRefiner'] = true;
      }

      if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
        // Adjust date to the coming week
        if (refMoment.day() > result.start.get('weekday')) {
          refMoment = refMoment.day(result.start.get('weekday') + 7);
        } else {
          refMoment = refMoment.day(result.start.get('weekday'));
        }

        result.start.imply('day', refMoment.date());
        result.start.imply('month', refMoment.month() + 1);
        result.start.imply('year', refMoment.year());
        result.tags['ForwardDateRefiner'] = true;
      }
    });
    return results;
  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var Filter = __webpack_require__(3).Filter;

exports.Refiner = function UnlikelyFormatFilter() {
  Filter.call(this);

  this.isValid = function (text, result, opt) {
    if (result.text.replace(' ', '').match(/^\d*(\.\d*)?$/)) {
      return false;
    }

    return true;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/*

*/
var ParsedComponents = __webpack_require__(0).ParsedComponents;

var Refiner = __webpack_require__(3).Refiner;

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
  var textBetween = text.substring(prevResult.index + prevResult.text.length, currResult.index); // Only accepts merge if one of them comes from casual relative date

  var includesRelativeResult = prevResult.tags['ENRelativeDateFormatParser'] || currResult.tags['ENRelativeDateFormatParser']; // We assume they refer to the same date if all date fields are implied

  var referToSameDate = !prevResult.start.isCertain('day') && !prevResult.start.isCertain('month') && !prevResult.start.isCertain('year'); // If both years are certain, that determines if they refer to the same date
  // but with one more specific than the other

  if (prevResult.start.isCertain('year') && currResult.start.isCertain('year')) referToSameDate = prevResult.start.get('year') === currResult.start.get('year'); // We now test with the next level (month) if they refer to the same date

  if (prevResult.start.isCertain('month') && currResult.start.isCertain('month')) referToSameDate = prevResult.start.get('month') === currResult.start.get('month') && referToSameDate;
  return includesRelativeResult && textBetween.match(PATTERN) && referToSameDate;
}

function mergeResult(text, specificResult, nonSpecificResult) {
  var specificDate = specificResult.start;
  var nonSpecificDate = nonSpecificResult.start;
  var startIndex = Math.min(specificResult.index, nonSpecificResult.index);
  var endIndex = Math.max(specificResult.index + specificResult.text.length, nonSpecificResult.index + nonSpecificResult.text.length);
  specificResult.index = startIndex;
  specificResult.text = text.substring(startIndex, endIndex);

  for (var tag in nonSpecificResult.tags) {
    specificResult.tags[tag] = true;
  }

  specificResult.tags['ENPrioritizeSpecificDateRefiner'] = true;
  return specificResult;
}

exports.Refiner = function ENPrioritizeSpecificDateRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isMoreSpecific(prevResult, currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      } else if (isMoreSpecific(currResult, prevResult) && isAbleToMerge(text, prevResult, currResult)) {
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
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var ENMergeDateRangeRefiner = __webpack_require__(9).Refiner;

exports.Refiner = function JPMergeDateRangeRefiner() {
  ENMergeDateRangeRefiner.call(this);

  this.pattern = function () {
    return /^\s*(から|ー)\s*$/i;
  };
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var Refiner = __webpack_require__(3).Refiner;

exports.Refiner = function FRMergeDateRangeRefiner() {
  Refiner.call(this);

  this.pattern = function () {
    return /^\s*(à|a|\-)\s*$/i;
  };

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (!prevResult.end && !currResult.end && this.isAbleToMerge(text, prevResult, currResult)) {
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

  this.isAbleToMerge = function (text, result1, result2) {
    var begin = result1.index + result1.text.length;
    var end = result2.index;
    var textBetween = text.substring(begin, end);
    return textBetween.match(this.pattern());
  };

  this.isWeekdayResult = function (result) {
    return result.start.isCertain('weekday') && !result.start.isCertain('day');
  };

  this.mergeResult = function (text, fromResult, toResult) {
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
    var endIndex = Math.max(fromResult.index + fromResult.text.length, toResult.index + toResult.text.length);
    fromResult.index = startIndex;
    fromResult.text = text.substring(startIndex, endIndex);
    fromResult.tags[this.constructor.name] = true;
    return fromResult;
  };
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/*
    
*/
var ParsedComponents = __webpack_require__(0).ParsedComponents;

var Refiner = __webpack_require__(3).Refiner;

var mergeDateTimeComponent = __webpack_require__(5).mergeDateTimeComponent;

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

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

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
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['FRMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function FRMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(prevResult) && isTimeOnly(currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      } else if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
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
  };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/*
  
*/
var ENMergeDateRangeRefiner = __webpack_require__(9).Refiner;

exports.Refiner = function DEMergeDateRangeRefiner() {
  ENMergeDateRangeRefiner.call(this);

  this.pattern = function () {
    return /^\s*(bis(?:\s*(?:am|zum))?|\-)\s*$/i;
  };
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/*
    
*/
var ParsedComponents = __webpack_require__(0).ParsedComponents;

var Refiner = __webpack_require__(3).Refiner;

var mergeDateTimeComponent = __webpack_require__(5).mergeDateTimeComponent;

var isDateOnly = __webpack_require__(5).isDateOnly;

var isTimeOnly = __webpack_require__(5).isTimeOnly;

var PATTERN = new RegExp("^\\s*(T|um|am|,|-)?\\s*$");

function isAbleToMerge(text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

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
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['DEMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function DEMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(prevResult) && isTimeOnly(currResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, prevResult, currResult);
        currResult = null;
        i += 1;
      } else if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
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
  };
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/*

*/
var ENMergeDateRangeRefiner = __webpack_require__(9).Refiner;

exports.Refiner = function NLMergeDateRangeRefiner() {
  ENMergeDateRangeRefiner.call(this);

  this.pattern = function () {
    return /^\s*(tot|t\/m|tot en met|\\-)\s*$/i;
  };
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

/*

*/
var ParsedComponents = __webpack_require__(0).ParsedComponents;

var Refiner = __webpack_require__(3).Refiner;

var mergeDateTimeComponent = __webpack_require__(5).mergeDateTimeComponent;

var isDateOnly = __webpack_require__(5).isDateOnly;

var isTimeOnly = __webpack_require__(5).isTimeOnly;

var PATTERN = new RegExp("^\\s*(T|op|om|voor|na|van|,|-)\\s*$");

function isAbleToMerge(text, prevResult, curResult) {
  var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
  return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult) {
  var beginDate = dateResult.start;
  var beginTime = timeResult.start;
  var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

  if (dateResult.end != null || timeResult.end != null) {
    var endDate = dateResult.end == null ? dateResult.start : dateResult.end;
    var endTime = timeResult.end == null ? timeResult.start : timeResult.end;
    var endDateTime = mergeDateTimeComponent(endDate, endTime);

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
  var endIndex = Math.max(dateResult.index + dateResult.text.length, timeResult.index + timeResult.text.length);
  dateResult.index = startIndex;
  dateResult.text = text.substring(startIndex, endIndex);

  for (var tag in timeResult.tags) {
    dateResult.tags[tag] = true;
  }

  dateResult.tags['NLMergeDateAndTimeRefiner'] = true;
  return dateResult;
}

exports.Refiner = function NLMergeDateTimeRefiner() {
  Refiner.call(this);

  this.refine = function (text, results, opt) {
    if (results.length < 2) return results;
    var mergedResult = [];
    var currResult = null;
    var prevResult = null;

    for (var i = 1; i < results.length; i++) {
      currResult = results[i];
      prevResult = results[i - 1];

      if (isDateOnly(currResult) && isTimeOnly(prevResult) && isAbleToMerge(text, prevResult, currResult)) {
        prevResult = mergeResult(text, currResult, prevResult);
        currResult = null;
        i += 1;
        mergedResult.push(prevResult);
      } else {
        mergedResult.push(prevResult);
      }
    }

    if (currResult != null) {
      mergedResult.push(currResult);
    }

    return mergedResult;
  };
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=chrono.js.map