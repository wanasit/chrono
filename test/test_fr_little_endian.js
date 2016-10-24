
test("Test - Single expression", function() {


    var text = "10 Août 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 Août 2012', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "10 Août 234 AC";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '10 Août 234 AC', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == -234, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(-234, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "10 Août 88 p. Chr. n.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if (result) {
        ok(result.index == 0, 'Wrong index')
        ok(result.text == '10 Août 88 p. Chr. n.', result.text )

        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.get('year') == 88, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        var resultDate = result.start.date();
        var expectDate = new Date(88, 8-1, 10, 12);
        expectDate.setFullYear(88);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = 'Dim 15 Sept';
    var results = chrono.parse(text, new Date(2013,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Dim 15 Sept', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = 'DIM 15SEPT';
    var results = chrono.parse(text, new Date(2013,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'DIM 15SEPT', result.text );
        
        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 9, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 9-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "La date limite est le 10 Août";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 22, 'Wrong index');
        ok(result.text == '10 Août', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La date limite est le Mardi 10 janvier";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 22, 'Wrong index');
        ok(result.text == 'Mardi 10 janvier', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('weekday') == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La date limite est Mar 10 Jan";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 19, 'Wrong index');
        ok(result.text == 'Mar 10 Jan', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('weekday') == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 1-1, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "31 mars 2016";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if (result) {

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '31 mars 2016', result.text );

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


    var text = "10 - 22 août 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 - 22 août 2012', result.text );

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


    var text = "10 au 22 août 2012";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 au 22 août 2012', result.text );

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

    var text = "10 août - 12 septembre";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 août - 12 septembre', result.text );

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

    var text = "10 août - 12 septembre 2013";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){

        ok(result.index == 0, 'Wrong index');
        ok(result.text == '10 août - 12 septembre 2013', result.text );

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

    var text = "12 juillet à 19:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '12 juillet à 19:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 7, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7-1, 12, 19, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "5 mai 12:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '5 mai 12:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 5, 'Test Result - (Month) ' + JSON.stringify(result) );
        ok(result.start.get('day') == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) );


        var resultDate = result.start.date();
        var expectDate = new Date(2012, 5-1, 5, 12, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "7 Mai 11:00";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );
    
    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == '7 Mai 11:00', result.text );

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

test("Test - Impossible Dates (Strict Mode)", function() {
 
    var text = "32 Août 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) );

    var text = "29 Février 2014";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "32 Aout";
    var results = chrono.strict.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ));

    var text = "29 Fevrier";
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

