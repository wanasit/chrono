var chrono = require('../../src/chrono');

test("Test - Single Expression", function() {
    var text = "Дедлайн сейчас";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 8, 9, 10, 11));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(8);
        expect(result.text).toBe('сейчас');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(9);
        expect(result.start.get('second')).toBe(10);
        expect(result.start.get('millisecond')).toBe(11);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 9, 10, 11);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "Дедлайн сегодня";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(8);
        expect(result.text).toBe('сегодня');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "Дедлайн завтра";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(8);
        expect(result.text).toBe('завтра');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    // Say.."Tomorrow" in the late night (1 AM)
    var text = "Дедлайн завтра";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 1));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "Дедлайн был вчера";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(12);
        expect(result.text).toBe('вчера');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test("Test - Combined Expression", function() {


    var text = "Дедлайн сегодня в 5 вечера";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(8);
        expect(result.text).toBe('сегодня в 5 вечера');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(17);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test("Test - Casual date range", function() {

    var text = "мероприятия сегодня - следующая пятница";
    var results = chrono.casual.parse(text, new Date(2012, 7, 4, 12));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(12);
        expect(result.text).toBe('сегодня - следующая пятница');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(4);
        expect(result.start.get('hour')).toBe(12);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 4, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(10);
        expect(result.end.get('hour')).toBe(12);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }



    var text = "мероприятия сегодня - следующая пятница";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(12);
        expect(result.text).toBe('сегодня - следующая пятница');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(12);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(17);
        expect(result.end.get('hour')).toBe(12);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 17, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test('Test - Random text', function() {

    var text = "ночью";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(22);

    var text = "ночью в 8";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);


    var text = "ночью в 8 вечера";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);


    var text = "завтра в 16:00";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(16);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(2);
    expect(result.start.get('meridiem') ).toBe(1);



    var text = "четверг";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('weekday')).toBe(4);


    var text = "чт.";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('weekday')).toBe(4);

    var text = "завтра утром";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(2);
    expect(result.start.get('hour')).toBe(6);

    var text = "сегодня утром в 3";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(3);

    var text = "в 11 вечера";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(23);

    var text = "вечером";
    var result = chrono.parse(text, new Date(2016, 10-1, 1, 8))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2016);
    expect(result.start.get('month')).toBe(10);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(22);
});

// TODO Вроде сделано как с английским парсером, но он все равно ловит слова. Надо когда-нибудь пофиксить
/*test('Test - Random negative text', function() {

    var text = "несегодня";
    var results = chrono.parse(text);
    expect(results.length).toBe(0);


    var text = "незавтра";
    var results = chrono.parse(text);
    expect(results.length).toBe(0);

    var text = "хузавтра";
    var results = chrono.parse(text);
    expect(results.length).toBe(0);

    var text = "сегоднячас";
    var results = chrono.parse(text);
    expect(results.length).toBe(0);

    var text = "сейчасник";
    var results = chrono.parse(text);
    expect(results.length).toBe(0);

    var text = "псегодняда";
    var results = chrono.parse(text);
    expect(results.length).toBe(0)

});*/
