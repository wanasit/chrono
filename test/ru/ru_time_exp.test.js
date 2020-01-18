var chrono = require('../../src/chrono');

test("Test - Single Expression", function() {


    var text = "18:10";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(0)
        expect(result.text).toBe('18:10')

        expect(result.start).not.toBeNull()
        expect(result.start.get('hour')).toBe(18)
        expect(result.start.get('minute')).toBe(10)


        expect(result.start.isCertain('day')).toBe(false)
        expect(result.start.isCertain('month')).toBe(false)
        expect(result.start.isCertain('year')).toBe(false)
        expect(result.start.isCertain('hour')).toBe(true)
        expect(result.start.isCertain('minute')).toBe(true)
        expect(result.start.isCertain('second')).toBe(false)
        expect(result.start.isCertain('millisecond')).toBe(false)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 10);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

});

test("Test - Range Expression", function() {

    var text = "18:10 - 22.32";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(0)
        expect(result.text).toBe('18:10 - 22.32')

        expect(result.start).not.toBeNull()
        expect(result.start.get('hour')).toBe(18)
        expect(result.start.get('minute')).toBe(10)

        expect(result.start.isCertain('day')).toBe(false)
        expect(result.start.isCertain('month')).toBe(false)
        expect(result.start.isCertain('year')).toBe(false)
        expect(result.start.isCertain('hour')).toBe(true)
        expect(result.start.isCertain('minute')).toBe(true)
        expect(result.start.isCertain('second')).toBe(false)
        expect(result.start.isCertain('millisecond')).toBe(false)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 10);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())

        expect(result.end).not.toBeNull()
        expect(result.end.get('hour')).toBe(22)
        expect(result.end.get('minute')).toBe(32)

        expect(result.end.isCertain('day')).toBe(false)
        expect(result.end.isCertain('month')).toBe(false)
        expect(result.end.isCertain('year')).toBe(false)
        expect(result.end.isCertain('hour')).toBe(true)
        expect(result.end.isCertain('minute')).toBe(true)
        expect(result.end.isCertain('second')).toBe(false)
        expect(result.end.isCertain('millisecond')).toBe(false)

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 22, 32);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


/*test("Test - Timezone extraction", function() {

    var text = "Freitag um 14 Uhr";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe(text)
    expect(result.start.isCertain('timezoneOffset')).toBe(false)
    expect(!result.start.get('timezoneOffset')).not.toBeNull()


    var text = "Freitag um 14 Uhr CET";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe(text)
    expect(result.start.isCertain('timezoneOffset')).toBe(true)
    expect(result.start.get('timezoneOffset')).toBe(60)


    var text = "am Freitag um 14 Uhr cet";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe(text)
    expect(result.start.isCertain('timezoneOffset')).toBe(true)
    expect(result.start.get('timezoneOffset')).toBe(60)


    var text = "am Freitag um 14 Uhr cetteln wir etwas an";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    expect(result.text).toBe('am Freitag um 14 Uhr');
    expect(result.start.isCertain('timezoneOffset')).toBe(false)
    expect(!result.start.get('timezoneOffset')).not.toBeNull()
});*/


test("Test - Random date + time expression", function() {

    var text = "в 12 часов";
    var result = chrono.ru.parse(text)[0];
    expect(result.text).toBe('в 12');
    expect(result.start.get('hour')).toBe(12);

    var text = "в Понедельник";
    var result = chrono.ru.parse(text)[0];
    expect(result.text).toBe('в Понедельник');

    var text = "в полдень";
    var result = chrono.ru.parse(text)[0];
    expect(result.text).toBe('в полдень');
    expect(result.start.get('hour')).toBe(12);

    var text = "в полночь";
    var result = chrono.ru.parse(text)[0];
    expect(result.text).toBe('в полночь');
    expect(result.start.get('hour')).toBe(24);

    var text = "ночь";
    var result = chrono.ru.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(24);
});
