
test("Test - Single expression", function() {


    var text = "10 August 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 August 2012', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "10 August 2555 BE";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 August 2555 BE', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10 August 234 BC";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 August 234 BC', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == -234, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(-234, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10 August 88 AD";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 August 88 AD', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 88, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(88, 8-1, 10, 12);
        expectDate.setFullYear(88);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'Sun 15Sep';
    var results = chrono.parse(text, new Date(2013,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Sun 15Sep', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'SUN 15SEP';
    var results = chrono.parse(text, new Date(2013,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'SUN 15SEP', result.text );
        
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline is 10 August";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 16, 'Wrong index');
        ok(result.text == '10 August', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is Tuesday, 10 January";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'Tuesday, 10 January', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('weekday') == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "The Deadline is Tue, 10 January";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'Tue, 10 January', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('weekday') == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "31st March, 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '31st March, 2016', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 3-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "23rd february, 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '23rd february, 2016', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 23, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 2-1, 23, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


});


test("Test - Range expression", function() {


    var text = "10 - 22 August 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 - 22 August 2012', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.end.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "10 to 22 August 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 to 22 August 2012', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) );
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.end) );
        ok(result.end.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.end) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 8-1, 22, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10 August - 12 September";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 August - 12 September', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) );
        ok(result.end.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.end) );
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.end) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 9-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10 August - 12 September 2013";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 August - 12 September 2013', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.end) );
        ok(result.end.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.end) );
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.end) );

        var resultDate = result.end.date();
        var expectDate = new Date(2013, 9-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Combined expression", function() {

    var text = "12th of July at 19:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12th of July at 19:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "5 May 12:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 May 12:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 5-1, 5, 12, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "7 May 11:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    
    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '7 May 11:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 5-1, 7, 11, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Ordinal Words", function () {


    var text = 'Twenty-fourth of May';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.text == 'Twenty-fourth of May', result.text );

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) );
    }


    var text = 'Eighth to eleventh May 2010';
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.text == 'Eighth to eleventh May 2010', result.text );

        ok(result.start, JSON.stringify(result.start));
        ok(result.start.get('year') == 2010, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.end, JSON.stringify(result.end));
        ok(result.end.get('year') == 2010, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.end.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.end.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) );
    }

});

test("Test - Impossible Dates (Strict Mode)", function() {
 
    var text = "32 August 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) );

    var text = "29 February 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "32 August";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "29 February";
    var results = chrono.strict.parse(text, new Date(2013,7,10));
    ok(results.length == 0, JSON.stringify( results ))

});

test("Test - Impossible Dates (Casual Mode)", function() {
 
    var text = "32 August 2015";
    var expectDate = new Date(2015, 8, 1, 12, 0);
    var results = chrono.parse(text);
    var resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) );
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);
});

