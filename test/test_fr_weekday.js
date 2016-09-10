
test("Test - Single Expression", function() {

    var text = "Lundi";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Lundi', result.text )

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

    var text = "Lundi (forward dates only)";
    var results = chrono.casual.parse(text, new Date(2012,7,9), {forwardDatesOnly: true});
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Lundi', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 1, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )


        ok(!result.start.isCertain('day'))
        ok(!result.start.isCertain('month'))
        ok(!result.start.isCertain('year'))
        ok(result.start.isCertain('weekday'))

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 13, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Jeudi";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Jeudi', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 4, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Dimanche";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Dimanche', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 0, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "la deadline était vendredi dernier...";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 18, 'Wrong index')
        ok(result.text == 'vendredi dernier', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Planifions une réuinion vendredi prochain";
    var results = chrono.casual.parse(text, new Date(2015, 3, 18));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 24, 'Wrong index')
        ok(result.text == 'vendredi prochain', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2015, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('weekday') == 5, 'Test Result - (Weekday) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Weekday Overlap", function() {

    var text = "Dimanche 7 décembre 2014";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Dimanche 7 décembre 2014', result.text )

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


    var text = "Dimanche 7/12/2014";
    var results = chrono.casual.parse(text, new Date(2012,7,9));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index')
        ok(result.text == 'Dimanche 7/12/2014', result.text )

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



