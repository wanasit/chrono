// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------

test("Test - Year Guessing", function() {

    // Parsing "January" on February (2016-02-15)
    var text = "January 1st";

    var result = chrono.casual.parse(text, new Date(2016, 2-1, 15))[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var result = chrono.casual.parse(text, new Date(2016, 2-1, 15), {forwardDate: true})[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }
});

test("Test - Year Guessing (Range)", function() {

    // Parsing "February" on March (2016-02-15)
    var text = "22-23 Feb at 7pm";

    var result = chrono.casual.parse(text, new Date(2016, 3-1, 15))[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('hour') == 19, 'Test Result - (Hour) ' + JSON.stringify(result.start));

        ok(result.end.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.end));
        ok(result.end.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.end));
        ok(result.end.get('day') == 23, 'Test Result - (Day) ' + JSON.stringify(result.end));
        ok(result.end.get('hour') == 19, 'Test Result - (Hour) ' + JSON.stringify(result.end));
    }

    var result = chrono.casual.parse(text, new Date(2016, 3-1, 15), {forwardDate: true})[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('hour') == 19, 'Test Result - (Hour) ' + JSON.stringify(result.start));

        ok(result.end.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.end));
        ok(result.end.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.end));
        ok(result.end.get('day') == 23, 'Test Result - (Day) ' + JSON.stringify(result.end));
        ok(result.end.get('hour') == 19, 'Test Result - (Hour) ' + JSON.stringify(result.end));
    }
});

test("Test - Year Guessing (Fixed)", function() {

    // Parsing "February" on March (2016-02-15)
    var text = "22-23 Feb 2016 at 7pm";
    var result = chrono.casual.parse(text, new Date(2016, 3-1, 15), {forwardDate: true})[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('hour') == 19, 'Test Result - (Hour) ' + JSON.stringify(result.start));

        ok(result.end.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.end));
        ok(result.end.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.end));
        ok(result.end.get('day') == 23, 'Test Result - (Day) ' + JSON.stringify(result.end));
        ok(result.end.get('hour') == 19, 'Test Result - (Hour) ' + JSON.stringify(result.end));
    }
});

test("Test - Weekday Guessing", function() {

    // Parsing "Monday" on Thursday (2012-08-09)
    var text = "Monday";

    var result = chrono.casual.parse(text, new Date(2012, 8-1, 9))[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var result = chrono.casual.parse(text, new Date(2012, 8-1, 9), {forwardDate: true})[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }
});


test("Test - Weekday Guessing (Range)", function() {

    // Parsing "Monday to Wednesday" on Thursday (2012-08-09)
    var text = "Monday - Wednesday";

    var result = chrono.casual.parse(text, new Date(2012, 8-1, 9))[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.end.get('day') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var result = chrono.casual.parse(text, new Date(2012, 8-1, 9), {forwardDate: true})[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.end.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }
});


test("Test - Weekday Guessing (Fixed)", function() {

    // Parsing "Monday" on Thursday (2012-08-09)
    var text = "Monday last week";

    var result = chrono.casual.parse(text, new Date(2012, 8-1, 9))[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 30, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }

    var result = chrono.casual.parse(text, new Date(2012, 8-1, 9), {forwardDate: true})[0];
    ok(result);
    if (result) {
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 30, 'Test Result - (Day) ' + JSON.stringify(result.start));
    }
});




