test("Test - Single Expression", function () {

    var text = "星期四";
    var results = chrono.casual.parse(text, new Date(2016, 9-1, 2));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '星期四', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 4, 'Test Result - (Weekday) ' + JSON.stringify(result.start));


        ok(!result.start.isCertain('day'));
        ok(!result.start.isCertain('month'));
        ok(!result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "禮拜四 (forward dates only)";
    var results = chrono.casual.parse(text, new Date(2016, 9-1, 2), {forwardDatesOnly: true});
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '禮拜四', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 4, 'Test Result - (Weekday) ' + JSON.stringify(result.start));


        ok(!result.start.isCertain('day'));
        ok(!result.start.isCertain('month'));
        ok(!result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 8, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "禮拜日";
    var results = chrono.casual.parse(text, new Date(2016, 9-1, 2));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '禮拜日', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 4, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 4, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }

    var text = "雞上個禮拜三全部都係雞";
    var results = chrono.casual.parse(text, new Date(2016, 9-1, 2));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 1, 'Wrong index');
        ok(result.text == '上個禮拜三', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 3, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 8-1, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }


    var text = "雞下星期天全部都係雞";
    var results = chrono.casual.parse(text, new Date(2016, 9-1, 2));
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 1, 'Wrong index');
        ok(result.text == '下星期天', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 4, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 4, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)
    }
});

test('Test - forward dates only option', function () {

    var text = "星期六-星期一";
    var results = chrono.casual.parse(text, new Date(2016, 9-1, 2), {forwardDatesOnly: true});
    ok(results.length == 1, JSON.stringify(results));

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '星期六-星期一', result.text);

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start));
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start));
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start));
        ok(result.start.get('weekday') == 6, 'Test Result - (Weekday) ' + JSON.stringify(result.start));

        ok(!result.start.isCertain('day'));
        ok(!result.start.isCertain('month'));
        ok(!result.start.isCertain('year'));
        ok(result.start.isCertain('weekday'));

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate + '/' + expectDate)


        ok(result.end, JSON.stringify(result.end));
        ok(result.end.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.end));
        ok(result.end.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.end));
        ok(result.end.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.end));
        ok(result.end.get('weekday') == 1, 'Test Result - (Weekday) ' + JSON.stringify(result.end));

        ok(!result.end.isCertain('day'));
        ok(!result.end.isCertain('month'));
        ok(!result.end.isCertain('year'));
        ok(result.end.isCertain('weekday'));

        var resultDate = result.end.date();
        var expectDate = new Date(2016, 9-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.end.date ' + resultDate + '/' + expectDate)
    }
});
