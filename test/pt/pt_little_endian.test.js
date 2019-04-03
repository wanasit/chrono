var chrono = require('../../src/chrono');

test("Test - Single expression", function() {


    var text = "10 Agosto 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if (result) {
        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        expect(result.index).toBe(0)
        expect(result.text).toBe('10 Agosto 2012')

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "10 Agosto 234 AC";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0)
        expect(result.text).toBe('10 Agosto 234 AC')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(-234)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(-234, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "10 Agosto 88 d. C.";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if (result) {
        expect(result.index).toBe(0)
        expect(result.text).toBe('10 Agosto 88 d. C.')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(88)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(88, 8-1, 10, 12);
        expectDate.setFullYear(88);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = 'Dom 15Set';
    var results = chrono.parse(text, new Date(2013,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(0)
        expect(result.text).toBe('Dom 15Set')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2013)
        expect(result.start.get('month')).toBe(9)
        expect(result.start.get('day')).toBe(15)

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = 'DOM 15SET';
    var results = chrono.parse(text, new Date(2013,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(0)
        expect(result.text).toBe('DOM 15SET')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2013)
        expect(result.start.get('month')).toBe(9)
        expect(result.start.get('day')).toBe(15)

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "A data final é em 10 Agosto";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if (result) {

        expect(result.index).toBe(21)
        expect(result.text).toBe('10 Agosto')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "A data final é na Terça, 10 Janeiro";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if (result) {

        expect(result.index).toBe(21)
        expect(result.text).toBe('Terça, 10 Janeiro')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2013)
        expect(result.start.get('month')).toBe(1)
        expect(result.start.get('day')).toBe(10)
        expect(result.start.get('weekday')).toBe(2)

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "A data final é em Mar, 10 Janeiro";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if (result) {

        expect(result.index).toBe(21)
        expect(result.text).toBe('Mar, 10 Janeiro')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2013)
        expect(result.start.get('month')).toBe(1)
        expect(result.start.get('day')).toBe(10)
        expect(result.start.get('weekday')).toBe(2)

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

});


test("Test - Range expression", function() {


    var text = "10 - 22 Agosto 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){

        expect(result.index).toBe(0)
        expect(result.text).toBe('10 - 22 Agosto 2012')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull()
        expect(result.end.get('year')).toBe(2012)
        expect(result.end.get('month')).toBe(8)
        expect(result.end.get('day')).toBe(22)

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "10 a 22 Agosto 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){

        expect(result.index).toBe(0)
        expect(result.text).toBe('10 a 22 Agosto 2012')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull()
        expect(result.end.get('year')).toBe(2012)
        expect(result.end.get('month')).toBe(8)
        expect(result.end.get('day')).toBe(22)

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "10 Agosto - 12 Setembro";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){

        expect(result.index).toBe(0)
        expect(result.text).toBe('10 Agosto - 12 Setembro')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull()
        expect(result.end.get('year')).toBe(2012)
        expect(result.end.get('month')).toBe(9)
        expect(result.end.get('day')).toBe(12)

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 9-1, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "10 Agosto - 12 Setembro 2013";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){

        expect(result.index).toBe(0)
        expect(result.text).toBe('10 Agosto - 12 Setembro 2013')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2013)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 8-1, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())


        expect(result.end).not.toBeNull()
        expect(result.end.get('year')).toBe(2013)
        expect(result.end.get('month')).toBe(9)
        expect(result.end.get('day')).toBe(12)

        var resultDate = result.end.date();
        var expectDate = new Date(2013, 9-1, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test("Test - Combined expression", function() {

    var text = "12 de Julho às 19:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(0)
        expect(result.text).toBe('12 de Julho às 19:00')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(7)
        expect(result.start.get('day')).toBe(12)


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

});

test("Test - Impossible Dates (Strict Mode)", function() {

    var text = "32 Agosto 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0)

    var text = "29 Fevereiro 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0)

    var text = "32 Agosto";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0)

    // TODO
    var text = "29 Fevereiro";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(0)

});

test("Test - Impossible Dates (Casual Mode)", function() {

    var text = "32 Agosto 2015";
    var expectDate = new Date(2015, 8, 1, 12, 0);
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    expect(results.length).toBe(1)
    expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
});