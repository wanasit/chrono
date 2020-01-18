var chrono = require('../../src/chrono');


// soooo, months in js start from 0 to 11

test("Test for planning - Date + Time Expression + Deadline", function() {
    var text = "напомни мне завтра в 19:25 про стэндап";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe('завтра в 19:25');
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(2);
    expect(result.start.get('hour')).toBe(19);
    expect(result.start.get('minute')).toBe(25);


    var text = "напомни мне через 10 минут про встречу";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe('через 10 минут');
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(8);
    expect(result.start.get('minute')).toBe(10);


    var text = "напомни мне через 2 часа доделать парсер";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe('через 2 час');
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(10);

    var text = "напомни мне через час позвонить";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe('через час');
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(9);

    var text = "послезавтра в полночь мне нужно доделать парсер";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe('послезавтра в полночь');
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(3);
    expect(result.start.get('hour')).toBe(24);

    var text = "01.01.2020 в 22:05 дедлайн для парсера дат";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe('01.01.2020 в 22:05');
    expect(result.start.get('year')).toBe(2020);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(22);
    expect(result.start.get('minute')).toBe(5);

    var text = "напомни мне про митинг в воскресенье в 19:30";
    var result = chrono.parse(text, new Date(2020, 1-1, 18, 8))[0];
    expect(result.text).toBe('в воскресенье в 19:30');
    expect(result.start.get('year')).toBe(2020);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')).toBe(19);
    expect(result.start.get('hour')).toBe(19);
    expect(result.start.get('minute')).toBe(30);

    var text = "напомни мне про митинг в следующую субботу в 11 ночи";
    var result = chrono.parse(text, new Date(2020, 1-1, 18, 8))[0];
    expect(result.text).toBe('в следующую субботу в 11 ночи');
    expect(result.start.get('year')).toBe(2020);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')).toBe(25);
    expect(result.start.get('hour')).toBe(23);
    expect(result.start.get('minute')).toBe(0);
});


test("Test - Compare with native js", function() {

    var text = 'Sat Nov 05 1994 22:45:30 GMT+0900 (JST)';
    var result = chrono.parse(text)[0];
    var expected = new Date(text);

    expect(result.text).toBe(text);
    expect(expected.getTime()).toBeCloseTo(result.start.date().getTime())


    var text = 'Fri, 31 Mar 2000 07:00:00 UTC';
    var result = chrono.parse(text)[0];
    var expected = new Date(text);

    expect(result.text).toBe(text);
    expect(expected.getTime()).toBeCloseTo(result.start.date().getTime())

    var text = '2014-12-14T18:22:14.759Z';
    var result = chrono.parse(text)[0];
    var expected = new Date(text);

    expect(result.text).toBe(text);
    expect(Math.abs(expected.getTime() - result.start.date().getTime())).toBe(0)
});

test("Test - Implying timezeon", function() {

    var text = 'Sat Nov 05 1994 22:45:30 GMT+0900 (JST)';
    var result = chrono.parse(text)[0];
    var expected = new Date(text);

    expect(result.text).toBe(text);
    expect(expected.getTime()).toBeCloseTo(result.start.date().getTime())

    var impliedResult = chrono.parse('Sat Nov 05 1994 22:45:30')[0];
    impliedResult.start.imply('timezoneOffset', 540);

    expect(expected.getTime()).toBeCloseTo(impliedResult.start.date().getTime());
});





