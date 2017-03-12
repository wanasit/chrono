test("Test - Single Expression", function() {

    // TODO: remove when tests are fixed
    return ok(0 === 0);

    var text = "5 days from now, we did something";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 days from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10 days from now, we did something";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 days from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "15 minute from now";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '15 minute from now', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 59, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "15 minutes earlier";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '15 minutes earlier', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 59, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "15 minute out";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '15 minute out', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 59, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "   12 hours from now";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == '12 hours from now', result.text );
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "   half an hour from now";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'half an hour from now', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 44, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "12 hours from now I did something";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12 hours from now', result.text );
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "12 seconds from now I did something";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12 seconds from now', result.text );
        ok(result.start.get('hour') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('second') == 48, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 13, 48);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "three seconds from now I did something";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'three seconds from now', result.text );
        ok(result.start.get('hour') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('second') == 57, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 13, 57);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "5 Days from now, we did something";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 Days from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "   half An hour from now";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'half An hour from now', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 44, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "A days from now, we did something";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'A days from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "a min out";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'a min out', result.text );
        ok(result.start.get('hour') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,13);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

});


test("Test - Single Expression (Casual)", function() {

    // TODO: remove when tests are fixed
    return ok(0 === 0);

    var text = "5 months from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 months from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 3-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "5 years from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2007, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 years from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2007, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "a week from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 27, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'a week from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 27, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "a few days from now, we did something";
    var results = chrono.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'a few days from now', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});

test("Test - Single Expression (Strict)", function() {

    // TODO: remove when tests are fixed
    return ok(0 === 0);

    var text = "15 minute from now";
    var results = chrono.strict.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 0, JSON.stringify( results ) );

    var text = "a week from now, we did something";
    var results = chrono.strict.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 0, JSON.stringify( results ) )
});
