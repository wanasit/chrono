var chrono = require('../../src/chrono');

test("Test - Single Expression", function() {


    var text = "O prazo é agora";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 8, 9, 10, 11));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(10)
        expect(result.text).toBe('agora')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)
        expect(result.start.get('hour')).toBe(8)
        expect(result.start.get('minute')).toBe(9)
        expect(result.start.get('second')).toBe(10)
        expect(result.start.get('millisecond')).toBe(11)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 9, 10, 11);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "O prazo é hoje";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(10)
        expect(result.text).toBe('hoje')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "O prazo é Amanhã";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(10)
        expect(result.text).toBe('Amanhã')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(11)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "O prazo é Amanhã";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 1));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "O prazo foi ontem";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(12)
        expect(result.text).toBe('ontem')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(9)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "O prazo foi ontem à noite ";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(12)
        expect(result.text).toBe('ontem à noite')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(9)
        expect(result.start.get('hour')).toBe(22)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 22);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "O prazo foi esta manhã ";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(12)
        expect(result.text).toBe('esta manhã')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)
        expect(result.start.get('hour')).toBe(6)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "O prazo foi esta tarde ";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(12)
        expect(result.text).toBe('esta tarde')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)
        expect(result.start.get('hour')).toBe(18)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test("Test - Combined Expression", function() {


    var text = "O prazo é hoje às 5PM";
    var results = chrono.pt.parse(text, new Date(2012, 7, 10, 12));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.index).toBe(10)
        expect(result.text).toBe('hoje às 5PM')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(10)
        expect(result.start.get('hour')).toBe(17)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
});


test('Test - Random text', function() {

    var text = "esta noite";
    var result = chrono.pt.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text)
    expect(result.start.get('year')).toBe(2012)
    expect(result.start.get('month')).toBe(1)
    expect(result.start.get('day')).toBe(1)
    expect(result.start.get('hour')).toBe(22)
    expect(result.start.get('meridiem') ).toBe(1)

    var text = "esta noite 8pm";
    var result = chrono.pt.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text)
    expect(result.start.get('hour') ).toBe(20)
    expect(result.start.get('year') ).toBe(2012)
    expect(result.start.get('month')).toBe(1)
    expect(result.start.get('day')  ).toBe(1)
    expect(result.start.get('meridiem') ).toBe(1)


    var text = "esta noite at 8"; // TODO
    var result = chrono.pt.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text)
    expect(result.start.get('hour') ).toBe(20)
    expect(result.start.get('year') ).toBe(2012)
    expect(result.start.get('month')).toBe(1)
    expect(result.start.get('day')  ).toBe(1)
    expect(result.start.get('meridiem') ).toBe(1)


    var text = "quinta";
    var result = chrono.pt.parse(text)[0];
    expect(result.text).toBe(text)
    expect(result.start.get('weekday')).toBe(4)


    var text = "sexta";
    var result = chrono.pt.parse(text)[0];
    expect(result.text).toBe(text)
    expect(result.start.get('weekday')).toBe(5)
})


test('Test - Random negative text', function() {

    var text = "naohoje";
    var results = chrono.pt.parse(text);
    expect(results.length).toBe(0)


    var text = "hyamanhã";
    var results = chrono.pt.parse(text);
    expect(results.length).toBe(0)

    var text = "xontem";
    var results = chrono.pt.parse(text);
    expect(results.length).toBe(0)

    var text = "porhora";
    var results = chrono.pt.parse(text);
    expect(results.length).toBe(0)

    var text = "agoraxsd";
    var results = chrono.pt.parse(text);
    expect(results.length).toBe(0)

})
