			
test("Test - Wiki-Text 1", function() {
	
	var text = 'October 7, 2011, of which details were not revealed out of respect to Jobs\'s family.[239] Apple announced on the same day that they had no plans for a public service, but were encouraging "well-wishers" to send their remembrance messages to an email address created to receive such messages.[240] Sunday, October 16, 2011';

	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 2, text )
	ok(results.length == 2, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start.year == 2011 && 
		  result.start.month == 9 &&
		  result.start.day   == 7, 
		JSON.stringify(result.start))
		ok(result.index == 0, 'Index : '+result.index)
		ok(result.text == 'October 7, 2011', 'Text :'+ result.text )
	}
	
	var result = results[1];
	if(result){
		ok(result.start.year == 2011 && 
		  result.start.month == 9 &&
		  result.start.day   == 16, 
		JSON.stringify(result.start))
		ok(result.index == 297, 'Index : '+result.index)
		ok(result.text == 'Sunday, October 16, 2011', 'Text :'+ result.text )
	}
	
	
});

test("Test - Email 1", function() {
	
	var text =　"Date:  November 1st, Thursday,15：00〜16：30\nPlace:  Engineering Building No. 2, Room No. 213.";
	
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, text )
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start.year == 2012 && 
		  result.start.month == 10 &&
		  result.start.day   == 1 && 
		  result.start.hour   == 15  && 
		  result.start.minute   == 00,
		JSON.stringify(result.start))
		
		ok(result.end.year == 2012 && 
		  result.end.month == 10 &&
		  result.end.day   == 1  && 
		  result.end.hour   == 16 && 
		  result.end.minute   == 30, 
		JSON.stringify(result.end))
		
		
		//ok(result.index == 0, 'Index : '+result.index)
		//ok(result.text == 'October 7, 2011', 'Text :'+ result.text )
	}
	
});


test("Test - Email 2", function() {
	
	var text =　"Date：July 12th(Fri), 2013 18:15〜20:00\nPlace： CO-OP Chuo Refectory, Hongo Campus (Free)\nMap: Please refer to attached leaflet.";
	
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, 'Unexpected Count' )
	ok(results.length == 1, JSON.stringify( results ))

	var result = results[0];
	if(result){
		ok(result.start.year == 2013);
		ok(result.start.month == 6);
		ok(result.start.day   == 12); 
		ok(result.start.hour   == 18);
		ok(result.start.minute   == 15);
		
		ok(result.end.year == 2013)
		ok(result.end.month == 6)
		ok(result.end.day   == 12) 
		ok(result.end.hour   == 20)
		ok(result.end.minute   == 0)
		
		//ok(result.index == 0, 'Index : '+result.index)
		//ok(result.text == 'October 7, 2011', 'Text :'+ result.text )
	}
	
});


　

