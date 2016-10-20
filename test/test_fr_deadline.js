
test("Test - Single Expression", function() {

    var text = "On doit faire quelque chose dans 5 jours.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 28, 'Wrong index');
        ok(result.text == 'dans 5 jours', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "On doit faire quelque chose dans cinq jours.";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 28, 'Wrong index');
        ok(result.text == 'dans cinq jours', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "we have to make something within 10 day";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 26, 'Wrong index');
        ok(result.text == 'within 10 day', result.text );

        ok(result.start, JSON.stringify(result.start) );
        ok(result.start.get('year') == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) );
        ok(result.start.get('month') == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) );
        ok(result.start.get('day') == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 20, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "dans 5 minutes";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'dans 5 minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "en 1 heure";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'en 1 heure', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,13,14);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Dans 5 minutes je vais rentrer chez moi";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Dans 5 minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Dans 5 secondes une voiture va bouger";
    var results = chrono.parse(text, new Date(2012,7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Dans 5 secondes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 14, 5);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "dans deux semaines";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'dans deux semaines', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 24, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "dans un mois";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'dans un mois', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "dans quelques mois";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'dans quelques mois', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 10, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "en une année";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'en une année', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "dans une Année";
    var results = chrono.parse(text, new Date(2012, 7, 10, 12, 14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'dans une Année', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "Dans 5 Minutes une voiture doit être bougée";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Dans 5 Minutes', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


    var text = "Dans 5 mins une voiture doit être bougée";
    var results = chrono.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 1, JSON.stringify( results ) );

    var result = results[0];
    if(result){
        ok(result.index == 0, 'Wrong index');
        ok(result.text == 'Dans 5 mins', result.text );

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }


});


test("Test - Single Expression (Strict)", function() {

    var text = "en une année";
    var results = chrono.strict.parse(text, new Date(2012,7,10,12,14));
    ok(results.length == 0, JSON.stringify( results ) );


    var text = "en quelques mois";
    var results = chrono.strict.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 0, JSON.stringify( results ) )


    var text = "en quelques jours";
    var results = chrono.strict.parse(text, new Date(2012, 8-1, 3));
    ok(results.length == 0, JSON.stringify( results ) )
});
