// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------

test("Test - Single Expression", function() {

    var text = "il y a 5 jours, on a fait quelque chose";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a 5 jours', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "il y a 10 jours, on a fait quelque chose";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a 10 jours', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "il y a 15 minutes";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a 15 minutes', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 59, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "   il y a    12 heures";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'il y a    12 heures', result.text );
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "   half an hour ago";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index');
        ok(result.text == 'half an hour ago', result.text );
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 44, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,44);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "il y a 12 heures il s'est passé quelque chose";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a 12 heures', result.text );
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }




    var text = "5 Days ago, we did something";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 Days ago', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Single Expression (Casual)", function() {

    var text = "il y a 5 mois, on a fait quelque chose";
    var results = chrono.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a 5 mois', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 3-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "il y a 5 ans, on a fait quelque chose";
    var results = chrono.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2007, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a 5 ans', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2007, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "il y a une semaine, on a fait quelque chose";
    var results = chrono.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 27, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'il y a une semaine', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 27, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});

