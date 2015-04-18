
test("Test - Single Expression", function() {

    var text = "Monday";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Monday', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 1, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('weekday'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 6, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Thursday";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Thursday', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 4, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Sunday";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Sunday', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is last Friday...";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'last Friday', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Let's have a meeting on Friday next week";
    var results = chrono.casual.parse(text, new Date(2015, 3, 18));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 24, 'Wrong index')
        ok(result.text == 'Friday next week', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2015, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "I plan on taking the day off on Tuesday, next week";
    var results = chrono.casual.parse(text, new Date(2015, 3, 18));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 32, 'Wrong index')
        ok(result.text == 'Tuesday, next week', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2015, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 21, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 2, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 21, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Weekday Overlap", function() {

    var text = "Sunday, December 7, 2014";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Sunday, December 7, 2014', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )


        ok(result.start.isCertain('day'))
        ok(result.start.isCertain('month'))
        ok(result.start.isCertain('year'))
        ok(result.start.isCertain('weekday'))

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12-1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Sunday 12/7/2014";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Sunday 12/7/2014', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )


        ok(result.start.isCertain('day'))
        ok(result.start.isCertain('month'))
        ok(result.start.isCertain('year'))
        ok(result.start.isCertain('weekday'))

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12-1, 7, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


})



