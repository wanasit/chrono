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

    var text = "hace 5 días, hicimos algo";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'hace 5 días', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 5, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "hace 10 dias, hicimos algo";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'hace 10 dias', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "hace 15 minutos";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'hace 15 minutos', result.text )
        ok(result.start.get('hour') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 59, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,11,59);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "   hace 12 horas";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 3, 'Wrong index')
        ok(result.text == 'hace 12 horas', result.text )
        ok(result.start.get('hour') == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,0,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Single Expression (Casual)", function() {

    var text = "hace 5 meses, hicimos algo";
    var results = chrono.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'hace 5 meses', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 3-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "hace 5 años, hicimos algo";
    var results = chrono.parse(text, new Date(2012, 8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2007, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'hace 5 años', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2007, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "hace una semana, hicimos algo";
    var results = chrono.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 27, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'hace una semana', result.text )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 27, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});
