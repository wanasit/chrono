

test("Test - Date + Time Expression", function() {

    var text = "Something happen on 2014-04-18 13:00 - 16:00 as";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )
    ok(results[0].text == '2014-04-18 13:00 - 16:00')
    
});


test("Test - Compare with native js", function() {

    var text = 'Sat Nov 05 1994 22:45:30 GMT+0900 (JST)';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);
    
    ok(result.text == text, result.text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)


    var text = 'Fri, 31 Mar 2000 07:00:00 UTC';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);
    
    ok(result.text == text, result.text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)

    var text = '2014-12-14T18:22:14.759Z';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);
    
    ok(result.text == text, result.text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) == 0)
});


test('Test - Random text', function() { 

    
    var text = "Adam <Adam@supercalendar.com> написал(а):\nThe date is 02.07.2013";
    var result = chrono.parse(text, new Date(2013,5,22,3,33))[0];
    ok(result.text == '02.07.2013', result.text)

    var text = "174 November 1,2001- March 31,2002";
    var results = chrono.parse(text);
    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].text == 'November 1,2001- March 31,2002', JSON.stringify(results) )


    var text = "...Thursday, December 15, 2011 Best Available Rate "
    var results = chrono.parse(text);
    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].start.get('year') == 2011, JSON.stringify(results) )

    
    var text = "SUN 15SEP 11:05 AM - 12:50 PM"
    var results = chrono.parse(text);
    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].text.length == 29, JSON.stringify(results) )

    
    var text = "FRI 13SEP 1:29 PM - FRI 13SEP 3:29 PM"
    var results = chrono.parse(text);
    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].start.get('hour') == 13, JSON.stringify(results) )
    ok(results[0].end.get('hour') == 15, JSON.stringify(results) )

    var text = "9:00 AM to 5:00 PM, Tuesday, 20 May 2013"
    var results = chrono.parse(text);
    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].start.get('hour') == 9, JSON.stringify(results) )
    ok(results[0].end.get('hour') == 17, JSON.stringify(results) )
    ok(results[0].end.get('meridiem') == 1, JSON.stringify(results))


    var resultDate = results[0].start.date();
    var expectDate = new Date(2013, 4, 20, 9, 0);
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate)
    
    var resultDate = results[0].end.date();
    var expectDate = new Date(2013, 4, 20, 17, 0);
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, resultDate +'/' +expectDate)

    var text = "2014-07-07T04:00:00Z"
    var results = chrono.parse(text);

    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].text == '2014-07-07T04:00:00Z', JSON.stringify(results) )
    
})

test("Test - Random non-date patterns", function() {

    var text = ' 3'
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = '       1'
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = '  11 '
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = ' 0.5 '
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = ' 35.49 '
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = '12.53%'
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "6358fe2310> *5.0* / 5 Outstanding";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "6358fe2310> *1.5* / 5 Outstanding";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

    var text = "Total: $1,194.09 [image: View Reservation";
    var results = chrono.parse(text);
    ok(results.length == 0, JSON.stringify(results) )

});


test("Test - Wikipedia Texts", function() {
    
    var text = 'October 7, 2011, of which details were not revealed out of respect to Jobs\'s family.[239] Apple announced on the same day that they had no plans for a public service, but were encouraging "well-wishers" to send their remembrance messages to an email address created to receive such messages.[240] Sunday, October 16, 2011';
    var results = chrono.parse(text, new Date(2012,7,10));
    
    ok(results.length == 2, text )
    ok(results.length == 2, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok( result.start.get('year') == 2011 && 
            result.start.get('month') == 10 &&
            result.start.get('day')   == 7, 
        JSON.stringify(result.start));

        ok(result.index == 0, 'Index : '+result.index)
        ok(result.text == 'October 7, 2011', 'Text :'+ result.text )
    }
    
    var result = results[1];
    if(result){
        ok( result.start.get('year') == 2011 && 
            result.start.get('month') == 10 &&
            result.start.get('day')   == 16, 
        JSON.stringify(result.start));

        ok(result.index == 297, 'Index : '+result.index)
        ok(result.text == 'Sunday, October 16, 2011', 'Text :'+ result.text )
    }
    
});




