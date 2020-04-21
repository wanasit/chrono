const chrono = require('../../src/chrono');
test('Test - Random text', function() {

    let text = "Datum: 15-mrt-20";
    let results = chrono.nl.parse(text);
    expect(results.length).toBe(1);
    expect(results[0].index).toBe(7);
    // expect(results[0].text).toBe('15-mrt-2020');
    expect(results[0].start.get('day')).toBe(15);
    expect(results[0].start.get('month')).toBe(3);
    expect(results[0].start.get('year')).toBe(2020);


    text = "9:00 tot 17:00, dinsdag 20 mei 2013";
    results = chrono.nl.parse(text);
    expect(results.length).toBe(1);
    expect(results[0].start.get('hour')).toBe(9);
    expect(results[0].end.get('hour')).toBe(17);
    expect(results[0].end.get('meridiem')).toBe(1);
    expect(results[0].end.get('day')).toBe(20);
    expect(results[0].end.get('month')).toBe(5);
    expect(results[0].end.get('year')).toBe(2013);
});
