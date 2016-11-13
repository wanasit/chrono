
test("Test - Single Expression", function() {

    var text = "next week";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 8, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next 2 weeks";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 15, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "last week";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 9, JSON.stringify(result.start));
    ok(result.start.get('day') == 24, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "last 2 weeks";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 9, JSON.stringify(result.start));
    ok(result.start.get('day') == 17, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next day";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 2, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next 2 days";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 3, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "last day";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 9, JSON.stringify(result.start));
    ok(result.start.get('day') == 30, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "last 2 days";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 9, JSON.stringify(result.start));
    ok(result.start.get('day') == 29, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next month";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 11, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next 2 months";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 12, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "last month";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 9, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "last 2 months";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 8, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next few weeks";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 22, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next four weeks";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 29, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "past week";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 9, JSON.stringify(result.start));
    ok(result.start.get('day') == 24, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "next week at 10-06-2016";
    var results = chrono.parse(text, new Date(2016, 10-1, 1));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.text == text, result.text);
        ok(result.start.get('year') == 2016, JSON.stringify(result.start));
        ok(result.start.get('month') == 10, JSON.stringify(result.start));
        ok(result.start.get('day') == 6, JSON.stringify(result.start));
        ok(result.start.get('hour') == 12, JSON.stringify(result.start));
    }

    var text = "next month at 11-06-2016";
    var results = chrono.parse(text, new Date(2016, 10-1, 1));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.text == text, result.text);
        ok(result.start.get('year') == 2016, JSON.stringify(result.start));
        ok(result.start.get('month') == 11, JSON.stringify(result.start));
        ok(result.start.get('day') == 6, JSON.stringify(result.start));
        ok(result.start.get('hour') == 12, JSON.stringify(result.start));
    }

    var text = "next year at Feb-2017";
    var results = chrono.parse(text, new Date(2016, 10, 10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.text == text, result.text);
        ok(result.start.get('year') == 2017, JSON.stringify(result.start));
        ok(result.start.get('month') == 2, JSON.stringify(result.start));
        ok(result.start.get('day') == 1, JSON.stringify(result.start));
        ok(result.start.get('hour') == 12, JSON.stringify(result.start));
    }

    var text = "next week (Dec 2016)";
    var results = chrono.parse(text, new Date(2016, 11, 27));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.text == 'next week (Dec 2016', result.text )
        ok(result.start.get('year') == 2016, JSON.stringify(result.start));
        ok(result.start.get('month') == 12, JSON.stringify(result.start));
        ok(result.start.get('day') == 1, JSON.stringify(result.start));
        ok(result.start.get('hour') == 12, JSON.stringify(result.start));
    }

    var text = 'She is getting married next year (July 2013).';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 23, 'Wrong index')
        ok(result.text == 'next year (July 2013', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});
