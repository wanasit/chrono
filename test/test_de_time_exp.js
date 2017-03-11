
test("Test - Single Expression", function() {


    var text = "18:10";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '18:10', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

});

test("Test - Range Expression", function() {

    var text = "18:10 - 22.32";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '18:10 - 22.32', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 18, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('hour'))
        ok(result.start.isCertain('minute'))
        ok(!result.start.isCertain('second'))
        ok(!result.start.isCertain('millisecond'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 10);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.end.get('minute') == 32, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(!result.end.isCertain('day'))
        ok(!result.end.isCertain('month'))
        ok(!result.end.isCertain('year'))
        ok(result.end.isCertain('hour'))
        ok(result.end.isCertain('minute'))
        ok(!result.end.isCertain('second'))
        ok(!result.end.isCertain('millisecond'))

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 22, 32);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = " von 6:30 bis 23:00 ";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 1, 'Wrong index')
        ok(result.text == 'von 6:30 bis 23:00', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('hour') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start))
        ok(result.start.get('minute') == 30, 'Test Result - (Day) ' + JSON.stringify(result.start))
        ok(result.start.get('meridiem') == 0, 'Test Result - (Day) ' + JSON.stringify(result.start))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6, 30);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
        
        ok(result.end, JSON.stringify(result.start) )
        ok(result.end.get('hour') == 23, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('minute') == 0, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        ok(result.end.get('meridiem') == 1, 'Test Result - (Day) ' + JSON.stringify(result.end) )

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 23, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

});


test("Test - Timezone extraction", function() {

    var text = "Freitag um 14 Uhr";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text, result.text)
    ok(!result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(!result.start.get('timezoneOffset'), JSON.stringify(result.start))


    var text = "Freitag um 14 Uhr CET";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text, result.text)
    ok(result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(result.start.get('timezoneOffset') === 60, JSON.stringify(result.start))


    var text = "am Freitag um 14 Uhr cet";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == text, result.text)
    ok(result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(result.start.get('timezoneOffset') === 60, JSON.stringify(result.start))


    var text = "am Freitag um 14 Uhr cetteln wir etwas an";
    var result = chrono.de.parse(text, new Date(2016, 3, 28))[0];
    ok(result.text == 'am Freitag um 14 Uhr', result.text);
    ok(!result.start.isCertain('timezoneOffset'), JSON.stringify(result.start))
    ok(!result.start.get('timezoneOffset'), JSON.stringify(result.start))
});


test("Test - Random date + time expression", function() {

    var text = "um 12";
    var result = chrono.de.parse(text)[0];
    ok(result.text == text, result.text)

    var text = "am Mittag";
    var result = chrono.de.parse(text)[0];
    ok(result.text == 'Mittag', result.text);
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "mittags";
    var result = chrono.de.parse(text)[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

    var text = "um Mitternacht";
    var result = chrono.de.parse(text)[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));

    var text = "mitternachts";
    var result = chrono.de.parse(text)[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
});
