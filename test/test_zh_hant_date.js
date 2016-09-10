test("Test - Single Expression", function() {

    var text = "雞2016年9月3號全部都係雞";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )
    var result = results[0];
    if (result) {
        ok(result.index == 1, 'Wrong index')
        ok(result.text == '2016年9月3號', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "雞二零一六年，九月三號全部都係雞";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )
    var result = results[0];
    if (result) {
        ok(result.index == 1, 'Wrong index')
        ok(result.text == '二零一六年，九月三號', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "雞九月三號全部都係雞";
    var results = chrono.parse(text, new Date(2014,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )
    var result = results[0];
    if (result) {
        ok(result.index == 1, 'Wrong index')
        ok(result.text == '九月三號', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Range Expression", function() {

    var text = "2016年9月3號-2017年10月24號";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '2016年9月3號-2017年10月24號', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.end) )

        var resultDate = result.end.date();
        var expectDate = new Date(2017, 10-1, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.endDate ' + resultDate +'/' +expectDate)
    }

    var text = "二零一六年九月三號ー2017年10月24號";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '二零一六年九月三號ー2017年10月24號', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2017, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.end) )

        var resultDate = result.end.date();
        var expectDate = new Date(2017, 10-1, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.endDate ' + resultDate +'/' +expectDate)
    }

});
