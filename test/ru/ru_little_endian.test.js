var chrono = require('../../src/chrono');

test("Test - Single expression", function() {


    var text = "10 Августа 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Августа 2012');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    // TODO BE/BC date format
    /*var text = "10. August 113 v. Chr.";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10. August 113 v. Chr.');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(-113);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(-113, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "10. August 85 n. Chr.";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0);
        expect(result.text).toBe('10. August 85 n. Chr.');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(85);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(85, 8-1, 10, 12);
        expectDate.setFullYear(85);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }*/


    var text = '15 сентября';
    var results = chrono.parse(text, new Date(2013,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(0);
        expect(result.text).toBe('15 сентября');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = '15 сен.';
    var results = chrono.parse(text, new Date(2013,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(0);
        expect(result.text).toBe('15 сен');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(15);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "Дедлайн 10 августа";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {

        expect(result.index).toBe(8);
        expect(result.text).toBe('10 августа');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "31 Марта 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {

        expect(result.index).toBe(0);

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(31);

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 3-1, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "31 Мая 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {

        expect(result.index).toBe(0);

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2016);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(31);

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 5-1, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});
// TODO
/*
test("Test - Range expression", function() {


    var text = "10 - 22. Августа 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(2);

    var result = results[0];
    if(result){

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 - 22. Августа 2012');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(22);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "10 Октября - 12 Декабря";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Октября - 12 Декабря');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(10);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 10-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(12);
        expect(result.end.get('day')).toBe(12);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 12-1, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "10 Августа - 12 Октября 2013";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){

        expect(result.index).toBe(0);
        expect(result.text).toBe('10 Августа - 12 Октября 2013');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2013);
        expect(result.end.get('month')).toBe(10);
        expect(result.end.get('day')).toBe(12);

        var resultDate = result.end.date();
        var expectDate = new Date(2013, 10-1, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});
*/


test("Test - Combined expression", function() {

    var text = "12 июля в 19:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(0);
        expect(result.text).toBe('12 июля в 19:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(12);


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "12 Июля в 19 часов";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(0);
        expect(result.text).toBe('12 Июля в 19');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(12);


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "5 Июня в 12:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if(result){
        expect(result.index).toBe(0);
        expect(result.text).toBe('5 Июня в 12:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(6);
        expect(result.start.get('day')).toBe(5);


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 6-1, 5, 12, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});

/*
// TODO: the incorrect date is ignored
// TODO: interpret as full date
test("Test - Impossible Dates (Strict Mode)", function() {

    var text = "32. Dezember 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "29. Februar 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "32. August";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "32. Oktober";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0);

    var text = "29. Februar";
    var results = chrono.strict.parse(text, new Date(2013,7,10));
    expect(results.length).toBe(0)

});*/
