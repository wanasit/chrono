
test("Test - Single expression", function() {


    var text = "10. August 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. August 2012', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "10. August 113 v. Chr.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. August 113 v. Chr.', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == -113, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(-113, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10. August 85 n. Chr.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. August 85 n. Chr.', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 85, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(85, 8-1, 10, 12);
        expectDate.setFullYear(85);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'So 15.Sep';
    var results = chrono.parse(text, new Date(2013,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'So 15.Sep', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'SO 15.SEPT';
    var results = chrono.parse(text, new Date(2013,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'SO 15.SEPT', result.text );
        
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Die Deadline ist am 10. August";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 17, 'Wrong index');
        ok(result.text == 'am 10. August', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Die Deadline ist am Dienstag, den 10. Januar";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 17, 'Wrong index');
        ok(result.text == 'am Dienstag, den 10. Januar', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('weekday') == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Die Deadline ist Di, 10. Januar";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 17, 'Wrong index');
        ok(result.text == 'Di, 10. Januar', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('weekday') == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "31. März 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '31. März 2016', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 3-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "31.Maerz 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '31.Maerz 2016', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2016, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2016, 3-1, 31, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Range expression", function() {


    var text = "10. - 22. August 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. - 22. August 2012', result.text );

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


    var text = "10. bis 22. Oktober 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. bis 22. Oktober 2012', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 10-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) );
        ok(result.end.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.end) );
        ok(result.end.get('day') == 22, 'Test Result - (Day) ' + JSON.stringify(result.end) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 10-1, 22, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10. Oktober - 12. Dezember";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. Oktober - 12. Dezember', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 10-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.end) );
        ok(result.end.get('month') == 12, 'Test Result - (Month) ' + JSON.stringify(result.end) );
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.end) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 12-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "10. August - 12. Oktober 2013";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10. August - 12. Oktober 2013', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate);
        

        ok(result.end, JSON.stringify(result.end) );
        ok(result.end.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.end) );
        ok(result.end.get('month') == 10, 'Test Result - (Month) ' + JSON.stringify(result.end) );
        ok(result.end.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.end) );

        var resultDate = result.end.date();
        var expectDate = new Date(2013, 10-1, 12, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Combined expression", function() {

    var text = "12. Juli um 19:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12. Juli um 19:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "12. Juli um 19 Uhr";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12. Juli um 19 Uhr', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "12. Juli um 19:53 Uhr";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12. Juli um 19:53 Uhr', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 53);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "5. Juni 12:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5. Juni 12:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 6, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 6-1, 5, 12, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});

/*
// TODO: in these cases, the DEMonthNameParser is used (the incorrect date is ignored)
// TODO: interpret as full date
test("Test - Impossible Dates (Strict Mode)", function() {
 
    var text = "32. Dezember 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) );

    var text = "29. Februar 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "32. August";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "32. Oktober";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "29. Februar";
    var results = chrono.strict.parse(text, new Date(2013,7,10));
    ok(results.length == 0, JSON.stringify( results ))

});*/

test("Test - Impossible Dates (Casual Mode)", function() {
 
    var text = "32. Oktober 2015";
    var expectDate = new Date(2015, 10, 1, 12, 0);
    var results = chrono.de.parse(text);
    var resultDate = results[0].start.date();
    ok(results.length == 1, JSON.stringify(results) );
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate);
});
