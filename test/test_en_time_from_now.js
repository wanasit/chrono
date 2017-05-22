// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------

test("Test - Single Expression", function () {
    var text = "5 days from now, we did something";
    var results = chrono.parse(text, new Date(2012, 7, 10));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 days from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8 - 1, 15, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "10 days from now, we did something";
    var results = chrono.parse(text, new Date(2012, 7, 10));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 20, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 days from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8 - 1, 20, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "15 minute from now";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '15 minute from now', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 29, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 29);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "15 minutes earlier";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '15 minutes earlier', result.text);
        ok(result.start.get('hour') == 11, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 59, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 11, 59);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "15 minute out";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '15 minute out', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 29, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 29);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "   12 hours from now";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 3, 'Wrong index');
        ok(result.text == '12 hours from now', result.text);
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('hour') == 0, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 14, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 0, 14);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "   half an hour from now";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'half an hour from now', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 44, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 44);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "12 hours from now I did something";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12 hours from now', result.text);
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('hour') == 0, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 14, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 0, 14);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "12 seconds from now I did something";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12 seconds from now', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 14, 'Test Result - (Minute) ' + JSON.stringify(result.start));
        ok(result.start.get('second') == 12, 'Test Result - (Second) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 14, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "three seconds from now I did something";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'three seconds from now', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 14, 'Test Result - (Minute) ' + JSON.stringify(result.start));
        ok(result.start.get('second') == 3, 'Test Result - (Second) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 14, 3);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "5 Days from now, we did something";
    var results = chrono.parse(text, new Date(2012, 7, 10));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 Days from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8 - 1, 15, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "   half An hour from now";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'half An hour from now', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 44, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 44);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "A days from now, we did something";
    var results = chrono.parse(text, new Date(2012, 7, 10));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'A days from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8 - 1, 11, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "a min out";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'a min out', result.text);
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start));
        ok(result.start.get('minute') == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 15);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }
});


test("Test - Single Expression (Casual)", function () {
    var text = "5 months from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8 - 1, 10));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 2 - 1, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 months from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1 - 1, 10, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "5 years from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8 - 1, 10));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 years from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2017, 8 - 1, 10, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "a week from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8 - 1, 3));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'a week from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8 - 1, 10, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "a few days from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8 - 1, 3));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'a few days from now', result.text);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8 - 1, 6, 12);
        ok(expectDate.getTime() == resultDate.getTime(), 'Test result.startDate ' + resultDate + '/' + expectDate)
    }
});

test("Test - Single Expression (Strict)", function () {
    var text = "15 min from now";
    var results = chrono.strict.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 0, JSON.stringify(results));

    var text = "a week from now, we did something";
    var results = chrono.strict.parse(text, new Date(2012, 8 - 1, 3));
    ok(results.length == 0, JSON.stringify(results))
});
