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

    var text = "we have to make something in 5 days.";
    var results = chrono.parse(text, new Date(2012,7,10));

    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index');
        ok(result.text == 'in 5 days', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "we have to make something in five days.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index');
        ok(result.text == 'in five days', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "we have to make something within 10 day";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index');
        ok(result.text == 'within 10 day', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 20, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "in 5 minutes";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'in 5 minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "within 1 hour";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within 1 hour', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,13,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "In 5 minutes I will go home";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'In 5 minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "In 5 minutes A car need to move";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'In 5 minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "In 5 seconds A car need to move";
    var results = chrono.parse(text, new Date(2012,7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'In 5 seconds', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 14, 5);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within half an hour";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within half an hour', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,44);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within two weeks";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within two weeks', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within a month";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within a month', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within a few months";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within a few months', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 10, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within one year";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within one year', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within one Year";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within one Year', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "within One year";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'within One year', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "In 5 Minutes A car need to move";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'In 5 Minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "In 5 mins a car need to move";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'In 5 mins', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "in a week";
    var result = chrono.parse(text, new Date(2016, 10-1, 1))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2016, JSON.stringify(result.start));
    ok(result.start.get('month') == 10, JSON.stringify(result.start));
    ok(result.start.get('day') == 8, JSON.stringify(result.start));
    ok(result.start.get('hour') == 12, JSON.stringify(result.start));

});


test("Test - Single Expression (Strict)", function() {

    var text = "within one year";
    var results = chrono.strict.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 0, JSON.stringify( results ) );


    var text = "within a few months";
    var results = chrono.strict.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 0, JSON.stringify( results ) )


    var text = "within a few days";
    var results = chrono.strict.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 0, JSON.stringify( results ) )
});
