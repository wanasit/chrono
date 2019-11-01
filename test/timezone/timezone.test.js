var chrono = require('../../src/chrono');
test("Test - Single Expression", function() {
    var results = chrono.parse('10 pst', new Date('June 02, 2019 PST 9:00'))
    expect(results.length).toBe(1)
    expect(results[0].start.date().valueOf()).toBe(new Date('June 02, 2019 PST 10:00').valueOf())

    var results = chrono.parse('8 pst', new Date('June 02, 2019 PST 9:00'))
    expect(results.length).toBe(1)
    expect(results[0].start.date().valueOf()).toBe(new Date('June 02, 2019 PST 8:00').valueOf())

})