var chrono = require('../../src/chrono');
test("Test - Single Expression", function () {

    var text = "Понедельник";
    var results = chrono.ru.parse(text, new Date(2012, 7, 9));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Понедельник');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(6);
        expect(result.start.get('weekday')).toBe(1);


        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 6, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "в четверг";
    var results = chrono.ru.parse(text, new Date(2012, 7, 9));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0);
        expect(result.text).toBe('в четверг');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('weekday')).toBe(4);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "воскресенье";
    var results = chrono.ru.parse(text, new Date(2012, 7, 9));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0);
        expect(result.text).toBe('воскресенье');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(12);
        expect(result.start.get('weekday')).toBe(0);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "Дедлайн был в прошлую пятницу";
    var results = chrono.ru.parse(text, new Date(2012, 7, 9));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(12);
        expect(result.text).toBe('в прошлую пятницу');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(3);
        expect(result.start.get('weekday')).toBe(5);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "Давайте встретимся в следующую пятницу";
    var results = chrono.parse(text, new Date(2015, 3, 18));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(19);
        expect(result.text).toBe('в следующую пятницу');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2015);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(24);
        expect(result.start.get('weekday')).toBe(5);

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


   var text = "Я планирую взять выходной в следующий вторник";
    var results = chrono.ru.parse(text, new Date(2015, 3, 18));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(26);
        expect(result.text).toBe('в следующий вторник');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2015);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(21);
        expect(result.start.get('weekday')).toBe(2);

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 21, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test("Test - Weekday Overlap", function () {
    var text = "Воскресенье, 7.12.2014";
    var results = chrono.ru.parse(text, new Date(2012, 7, 9));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Воскресенье, 7.12.2014');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(7);
        expect(result.start.get('weekday')).toBe(0);


        expect(result.start.isCertain('day')).toBe(true);
        expect(result.start.isCertain('month')).toBe(true);
        expect(result.start.isCertain('year')).toBe(true);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12 - 1, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


/*test('Test - forward dates only option', function () {

    var text = "с этой пятницы по этот понедельник";
    var results = chrono.ru.parse(text, new Date(2016, 8-1, 4), {forwardDate: true});
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(18);
        expect(result.text).toBe('с этой пятницы по этот понедельник');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(5);
        expect(result.start.get('weekday')).toBe(5);

        expect(result.start.isCertain('day')).toBe(false);
        expect(result.start.isCertain('month')).toBe(false);
        expect(result.start.isCertain('year')).toBe(false);
        expect(result.start.isCertain('weekday')).toBe(true);

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 8-1, 5, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2016);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(8);
        expect(result.end.get('weekday')).toBe(1);

        expect(result.end.isCertain('day')).toBe(false);
        expect(result.end.isCertain('month')).toBe(false);
        expect(result.end.isCertain('year')).toBe(false);
        expect(result.end.isCertain('weekday')).toBe(true);

        var resultDate = result.end.date();
        var expectDate = new Date(2016, 8-1, 8, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});*/
