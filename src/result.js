const dayjs = require('dayjs');

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

    return result
}

ParsedResult.prototype.date = function() {
    return this.start.date();
}

ParsedResult.prototype.hasPossibleDates = function() {
    return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
}

ParsedResult.prototype.isOnlyWeekday = function() {
    return this.start.isOnlyWeekdayComponent();
}

ParsedResult.prototype.isOnlyDayMonth = function() {
    return this.start.isOnlyDayMonthComponent();
}

function ParsedComponents (components, ref){

    this.knownValues = {};
    this.impliedValues = {};

    if (components) {
        for (let key in components) {
            this.knownValues[key] = components[key];
        }
    }

    if (ref) {
        ref = dayjs(ref);
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

ParsedComponents.prototype.isOnlyWeekdayComponent = function() {
    return this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
};

ParsedComponents.prototype.isOnlyDayMonthComponent = function() {
    return this.isCertain('day') && this.isCertain('month') && !this.isCertain('year');
};

ParsedComponents.prototype.isPossibleDate = function() {
    var dateMoment = this.dayjs();
    if (this.isCertain('timezoneOffset')) {
        const adjustTimezoneOffset = this.get('timezoneOffset') - dateMoment.utcOffset();
        dateMoment = dateMoment.add(adjustTimezoneOffset, 'minutes');
    }

    if (dateMoment.get('year') != this.get('year')) return false;
    if (dateMoment.get('month') != this.get('month')-1) return false;
    if (dateMoment.get('date') != this.get('day')) return false;
    if (dateMoment.get('hour') != this.get('hour')) return false;
    if (dateMoment.get('minute') != this.get('minute')) return false;

    return true;
};

ParsedComponents.prototype.date = function() {
    var result = this.dayjs();
    return result.toDate();
};


ParsedComponents.prototype.dayjs = function() {
    var result = dayjs();

    result = result.year(this.get('year'));
    result = result.month(this.get('month') - 1);
    result = result.date(this.get('day'));
    result = result.hour(this.get('hour'));
    result = result.minute(this.get('minute'));
    result = result.second(this.get('second'));
    result = result.millisecond(this.get('millisecond'));

    // Javascript Date Object return minus timezone offset
    var currentTimezoneOffset = result.utcOffset();
    var targetTimezoneOffset = this.get('timezoneOffset') !== undefined ? 
        this.get('timezoneOffset') : currentTimezoneOffset;

    var adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
    result = result.add(-adjustTimezoneOffset, 'minute');

    return result;
};

ParsedComponents.prototype.moment = function() {
    // Keep for compatibility
    return this.dayjs();
};



exports.ParsedComponents = ParsedComponents;
exports.ParsedResult = ParsedResult;
