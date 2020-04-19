import dayjs from 'dayjs';

export class ParsedResult {

    constructor(result) {
        result = result || {};

        this.ref   = result.ref;
        this.index = result.index;
        this.text  = result.text;
        this.tags  = result.tags || {};

        this.start = new ParsedComponents(result.start, result.ref);

        if(result.end){
            this.end = new ParsedComponents(result.end, result.ref);
        }
    }

    clone() {
        var result = new ParsedResult(this);
        result.tags = JSON.parse(JSON.stringify(this.tags));
        result.start = this.start.clone();
        if (this.end) {
            result.end = this.end.clone();
        }

        return result
    }

    date() {
        return this.start.date();
    }

    hasPossibleDates() {
        return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
    }

    isOnlyWeekday() {
        return this.start.isOnlyWeekdayComponent();
    }

    isOnlyDayMonth() {
        return this.start.isOnlyDayMonthComponent();
    }
}

export class ParsedComponents {

    constructor(components, ref) {
        this.knownValues = {};
        this.impliedValues = {};

        if (components) {
            for (let key in components) {
                this.knownValues[key] = components[key];
            }
        }

        if (ref) {
            ref = dayjs(ref);
            this.imply('day', ref.date());
            this.imply('month', ref.month() + 1);
            this.imply('year', ref.year())
        }


        this.imply('hour', 12);
        this.imply('minute', 0);
        this.imply('second', 0);
        this.imply('millisecond', 0);
    }

    get(component) {
        if (component in this.knownValues) return this.knownValues[component];
        if (component in this.impliedValues) return this.impliedValues[component];
    }

    isCertain(component) {
        return component in this.knownValues;
    }

    imply(component, value) {
        if (component in this.knownValues) return;
        this.impliedValues[component] = value;
    }

    assign(component, value) {
        this.knownValues[component] = value;
        delete this.impliedValues[component];
    }

    clone() {
        const component = new ParsedComponents();
        component.knownValues = JSON.parse(JSON.stringify(this.knownValues));
        component.impliedValues = JSON.parse(JSON.stringify(this.impliedValues));
        return component;
    }

    isOnlyWeekdayComponent() {
        return this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
    }

    isOnlyDayMonthComponent() {
        return this.isCertain('day') && this.isCertain('month') && !this.isCertain('year');
    }

    isPossibleDate() {
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
    }

    date() {
        const result = this.dayjs();
        return result.toDate();
    }

    dayjs() {
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
    }

    moment() {
        // Keep for compatibility
        return this.dayjs();
    }
}
