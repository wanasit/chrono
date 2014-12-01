
test("Test - Single Expression", function() {


    var text = "The Deadline is today";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'today', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is Tomorrow";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index')
        ok(result.text == 'Tomorrow', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    // Say.."Tomorrow" in the late night (1 AM)
    var text = "The Deadline is Tomorrow";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 1));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was yesterday";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'yesterday', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was last night ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'last night', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 0, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline was this morning ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'this morning', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 6, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 6);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline was this afternoon ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'this afternoon', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 15, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 15);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline was this evening ";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.index == 17, 'Wrong index')
        ok(result.text == 'this evening', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 18, 'Test Result - (hour) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }





});


