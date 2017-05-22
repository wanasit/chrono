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

    var text = "主な株主（2012年3月31日現在）";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 5, 'Wrong index')
        ok(result.text == '2012年3月31日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 3-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    } 


    var text = "主な株主（2012年９月3日現在）";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 5, 'Wrong index')
        ok(result.text == '2012年９月3日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    } 

    var text = "主な株主（９月3日現在）";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 5, 'Wrong index')
        ok(result.text == '９月3日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 9-1, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    } 

    var text = "主な株主（平成26年12月29日）";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 5, 'Wrong index')
        ok(result.text == '平成26年12月29日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 29, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12-1, 29, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    } 

    var text = "主な株主（昭和６４年１月７日）";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 5, 'Wrong index')
        ok(result.text == '昭和６４年１月７日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 1989, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(1989, 1-1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    } 

    
});


test("Test - Range Expression", function() {

    var text = "2013年12月26日-2014年1月7日";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '2013年12月26日-2014年1月7日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 26, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(2013, 12-1, 26, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        
        var resultDate = result.end.date();
        var expectDate = new Date(2014, 1-1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.endDate ' + resultDate +'/' +expectDate)
    }

    var text = "２０１３年１２月２６日ー2014年1月7日";
    var results = chrono.parse(text, new Date(2012,8-1,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '２０１３年１２月２６日ー2014年1月7日', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 26, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        
        var resultDate = result.start.date();
        var expectDate = new Date(2013, 12-1, 26, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    
        ok(result.end, JSON.stringify(result.end) )
        ok(result.end.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.end) )
        ok(result.end.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.end) )
        ok(result.end.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.end) )
        
        var resultDate = result.end.date();
        var expectDate = new Date(2014, 1-1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.endDate ' + resultDate +'/' +expectDate)
    } 

    
});





