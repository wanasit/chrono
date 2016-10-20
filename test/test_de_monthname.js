test("Test - Month-Year", function() {

    var text = "Oktober 13 v. Chr.";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == text, result.text );

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == -13, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(-13, 10-1, 1, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});
