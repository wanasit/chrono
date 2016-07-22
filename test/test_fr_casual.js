
test("Test - Single Expression", function() {


    var text = "La deadline est maintenant";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 8, 9, 10, 11));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'maintenant', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 8, 'Test Result - (Hour) ' + JSON.stringify(result.start) );
        ok(result.start.get('minute') == 9, 'Test Result - (Minute) ' + JSON.stringify(result.start) );
        ok(result.start.get('second') == 10, 'Test Result - (Second) ' + JSON.stringify(result.start) );
        ok(result.start.get('millisecond') == 11, 'Test Result - (Millisecond) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 9, 10, 11);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline est aujourd'hui";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'aujourd\'hui', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline est demain";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'demain', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    // Say.."Demain" in the late night (1 AM)
    var text = "La deadline est demain";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 1));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline était hier";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 18, 'Wrong index');
        ok(result.text == 'hier', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline était la veille";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 18, 'Wrong index');
        ok(result.text == 'la veille', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 0, 'Test Result - (hour) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 0);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline est ce matin";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'ce matin', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 8, 'Test Result - (hour) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline est cet après-midi";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'cet après-midi', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 14, 'Test Result - (hour) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "La deadline est cet aprem";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'cet aprem', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 14, 'Test Result - (hour) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "La deadline est ce soir";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'ce soir', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 18, 'Test Result - (hour) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Combined Expression", function() {


    var text = "La deadline est aujourd'hui 17:00";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'aujourd\'hui 17:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 17);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "La deadline est demain 17:00";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'demain 17:00', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 17);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "La deadline est demain matin 11h";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 16, 'Wrong index');
        ok(result.text == 'demain matin 11h', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 11, 11);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});


test("Test - Casual date range", function() {

    var text = "L'évenènement est d'aujourd'hui à vendredi prochain";
    var results = chrono.casual.parse(text, new Date(2012, 7, 4, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 20, 'Wrong index' + result.index);
        ok(result.text == "aujourd'hui à vendredi prochain", result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 4, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 4, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


        ok(result.end, JSON.stringify(result.start) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.end.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.end.get('hour') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "L'évenènement est d'aujourd'hui à vendredi prochain";
    var results = chrono.casual.parse(text, new Date(2012, 7, 10, 12));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 20, 'Wrong index');
        ok(result.text == 'aujourd\'hui à vendredi prochain', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.start.get('hour') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


        ok(result.end, JSON.stringify(result.start) );
        ok(result.end.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.end.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.end.get('day') == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) );
        ok(result.end.get('hour') == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 17, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});





test('Test - Random text', function() {

    var text = "cette nuit";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 22, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "ce soir 8pm";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "ce soir 20h";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "ce soir 20:00";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "ce soir 20h00";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "ce soir 20h00m00";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "ce soir 20h00m00s";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "Ce soir à 20h";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));

    var text = "Ce soir a 20h";
    var result = chrono.parse(text, new Date(2012, 1-1, 1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('hour')  == 20, JSON.stringify(result.start));
    ok(result.start.get('year')  == 2012, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day')   == 1, JSON.stringify(result.start));
    ok(result.start.get('meridiem')  == 1, JSON.stringify(result.start));


    var text = "jeu";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text);
    ok(result.start.get('weekday') == 4, result.text);


    var text = "sam";
    var result = chrono.parse(text)[0];
    ok(result.text == text, result.text);
    ok(result.start.get('weekday') == 6, result.text)
});


test('Test - Random negative text', function() {

    var text = "pasaujourd'hui";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) );

    var text = "pashier";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) );

    var text = "maintenanter";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) );

});
