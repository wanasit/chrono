
test("Test - Single Expression", function() {

    var text = "Wir unternahmen etwas vor 5 Tagen";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 22, 'Wrong index');
        ok(result.text == 'vor 5 Tagen', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Vor 10 Tagen unternahmen wir etwas";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor 10 Tagen', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "vor 15 minuten";
    var results = chrono.de.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'vor 15 minuten', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 59, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "   vor 12 Stunden";
    var results = chrono.de.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'vor 12 Stunden', result.text );
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "   vor einer halben Stunde";
    var results = chrono.de.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'vor einer halben Stunde', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 44, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Vor 12 Stunden tat ich etwas";
    var results = chrono.de.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor 12 Stunden', result.text );
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Vor 12 Sekunden tat ich etwas";
    var results = chrono.de.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor 12 Sekunden', result.text );
        ok(result.start.get('hour') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('second') == 48, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 13, 48);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Vor drei Sekunden trank ich Tee";
    var results = chrono.de.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor drei Sekunden', result.text );
        ok(result.start.get('hour') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('second') == 57, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 13, 57);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "Vor 5 tagen taten wir etwas";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor 5 tagen', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "   vor Einer halben stunde";
    var results = chrono.de.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'vor Einer halben stunde', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 44, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Vor einer tag, wir taten";
    var results = chrono.de.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor einer tag', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "vor einer min";
    var results = chrono.de.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'vor einer min', result.text );
        ok(result.start.get('hour') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,13);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

});


test("Test - Single Expression (Casual)", function() {

    var text = "Vor 5 Monaten unternahmen wir etwas";
    var results = chrono.de.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor 5 Monaten', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 3-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Vor 5 Jahren unternahmen wir etwas";
    var results = chrono.de.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2007, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Vor 5 Jahren', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2007, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "vor einer Woche aßen wir Pizza";
    var results = chrono.de.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 27, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'vor einer Woche', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 27, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "vor einigen Tagen aßen wir Pizza";
    var results = chrono.de.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'vor einigen Tagen', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});

test("Test - Single Expression (Strict)", function() {

    var text = "vor einer woche taten wir etwas";
    var results = chrono.strict.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 0, JSON.stringify( results ) )

    var text = "vor einer woche taten wir etwas";
    var results = chrono.de.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) )
});
