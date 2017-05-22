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

    var text = "Montag";
    var results = chrono.de.parse(text, new Date(2012, 7, 9));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Montag', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 1, 'Test Result - (Weekday) ' + JSON.stringify(result.start));


        ok(!result.start.isCertain('day'));
        ok(!result.start.isCertain('month'));
        ok(!result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 6, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "am Donnerstag";
    var results = chrono.de.parse(text, new Date(2012, 7, 9));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'am Donnerstag', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 4, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "Sonntag";
    var results = chrono.de.parse(text, new Date(2012, 7, 9));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Sonntag', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "Die Deadline war letzten Freitag...";
    var results = chrono.de.parse(text, new Date(2012, 7, 9));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 17, 'Wrong index');
        ok(result.text == 'letzten Freitag', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "Treffen wir uns am Freitag nächste Woche";
    var results = chrono.de.parse(text, new Date(2015, 3, 18));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'am Freitag nächste Woche', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2015, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "Ich habe vor, am Dienstag nächste Woche freizunehmen";
    var results = chrono.de.parse(text, new Date(2015, 3, 18));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 14, 'Wrong index');
        ok(result.text == 'am Dienstag nächste Woche', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2015, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 21, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 2, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 21, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }
});


test("Test - Weekday Overlap", function () {

    var text = "Sonntag, den 7. Dezember 2014";
    var results = chrono.de.parse(text, new Date(2012, 7, 9));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Sonntag, den 7. Dezember 2014', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start));


        ok(result.start.isCertain('day'));
        ok(result.start.isCertain('month'));
        ok(result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12 - 1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "Sonntag 7.12.2014";
    var results = chrono.de.parse(text, new Date(2012, 7, 9));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Sonntag 7.12.2014', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start));


        ok(result.start.isCertain('day'));
        ok(result.start.isCertain('month'));
        ok(result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12 - 1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }
});


test('Test - forward dates only option', function () {

    var text = "diesen Freitag bis diesen Montag";
    var results = chrono.de.parse(text, new Date(2016, 8-1, 4), {forwardDatesOnly: true});
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'diesen Freitag bis diesen Montag', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        ok(!result.start.isCertain('day'));
        ok(!result.start.isCertain('month'));
        ok(!result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)


        ok(result.end, JSON.stringify(result.end));
        ok(result.end.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.end));
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.end));
        ok(result.end.get('day') == 8, 'Test Result - (Day) ' + JSON.stringify(result.end));
        ok(result.end.get('weekday') == 1, 'Test Result - (Weekday) ' + JSON.stringify(result.end));

        ok(!result.end.isCertain('day'));
        ok(!result.end.isCertain('month'));
        ok(!result.end.isCertain('year'));
        ok(result.end.isCertain('weekday'));

        var resultDate = result.end.date();
        var expectDate = new Date(2016, 8-1, 8, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.end.date ' + resultDate + '/' + expectDate)
    }
});
