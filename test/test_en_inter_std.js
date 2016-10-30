
test("Test - Single Expression", function() {

    var text = "Let's finish this before this 2013-2-7.";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = (result.start.date());
        var expectDate = (new Date(2013,1,7,12));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }


    var text = "1994-11-05T08:15:30-05:30";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 8, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 30, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == -330, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.text == text, result.text)
        
        var resultDate = result.start.date();
        var expectDate = new Date(784043130000);
        
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }    

    var text = "1994-11-05T13:15:30";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 30, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == 0, 'Test Result - (Timezone) ' + JSON.stringify(result.start) )
        ok(result.text == text, result.text)
        
        var resultDate = result.start.date();
        var expectDate = new Date(784041330000);
        
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }       

    var text = "2015-07-31T12:00:00";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )
    
    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2015, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == 0, 'Test Result - (Timezone) ' + JSON.stringify(result.start) )
        ok(result.text == text, result.text)
        
        var resultDate = result.start.date();
        var expectDate = new Date(1438344000000);
        
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }    


    var text = "1994-11-05T13:15:30Z";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 30, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.text == text, result.text)
        
        var resultDate = result.start.date();
        var expectDate = new Date(784041330000);
        
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }    

    var text = "1994-11-05T13:15:30Z";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 30, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.text == text, result.text)
        
        var resultDate = result.start.date();
        var expectDate = new Date(784041330000);
        
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }


    var text = "- 1994-11-05T13:15:30Z";
    var results = chrono.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 11, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 30, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

        ok(result.index == 2, result.index)
        ok(result.text == '1994-11-05T13:15:30Z', result.text)
        
        var resultDate = result.start.date();
        var expectDate = new Date(784041330000);
        
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }

    var text = "2016-05-07T23:45:00.487+01:00";
    var results = chrono.strict.parse(text, new Date(2012,7,8));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.start.get('hour') == 23, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
        ok(result.start.get('minute') == 45, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
        ok(result.start.get('second') == 00, 'Test Result - (Second) ' + JSON.stringify(result.start) )
        ok(result.start.get('timezoneOffset') == 60, 'Test Result - (Timezone) ' + JSON.stringify(result.start) )

        ok(result.text == '2016-05-07T23:45:00.487+01:00', result.text)

        var resultDate = result.start.date();
        var expectDate = new Date(1462661100487);

        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.start.date() ' + resultDate +'/' +expectDate)
    }
});


test("Test - Compare with native js", function() {

    var text = '1994-11-05T13:15:30Z';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)

    var text = '1994-02-28T08:15:30-05:30';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)

    var text = '1994-11-05T08:15:30-05:30';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = '1994-11-05T08:15:30+11:30';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = '2014-11-30T08:15:30-05:30';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = 'Sat, 21 Feb 2015 11:50:48 -0500';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = '22 Feb 2015 04:12:00 -0000';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = '0000-01-01T00:00:00-01:00';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = '0000-01-01T00:00:00-00:00';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = '9999-12-31T23:59:00-00:00';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);
    
    ok(result.text == text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)
});
