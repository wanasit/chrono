var chrono = require('../../src/chrono');

test("Test - Single Expression", function() {

    var text = "lundi 8/2/2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2016)
        expect(result.start.get('month')).toBe(2)
        expect(result.start.get('day')).toBe(8)

        expect(result.index).toBe(0)
        expect(result.text).toBe('lundi 8/2/2016')

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 2-1, 8, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "le 8/2/2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1)

    var result = results[0];
    if(result){
        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2016)
        expect(result.start.get('month')).toBe(2)
        expect(result.start.get('day')).toBe(8)

        expect(result.index).toBe(0)
        expect(result.text).toBe('le 8/2/2016')

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 2-1, 8, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }

    var text = "le 8/2";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(8);

        expect(result.index).toBe(0);
        expect(result.text).toBe('le 8/2');

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 2-1, 8, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }


    var text = "samedi 9/2/20 ";
    var results = chrono.parse(text, new Date(2012,7,10));
    expect(results.length).toBe(1);

    var result = results[0];
    if (result) {
        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2020);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe('samedi 9/2/20');

        var resultDate = result.start.date();
        var expectDate = new Date(2020, 2-1, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    }
})
