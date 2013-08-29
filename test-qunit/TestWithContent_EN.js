			
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
	}
	
});


test("Test - Email 2", function() {
	
	var text =　"This is a reminder for:\nTitle: block for workout\nWhen: Mon Apr 29, 2013 6:30am ? 9:30am Eastern Time\nCalendar:...";
	
	var results = chrono.parse(text, new Date(2013,7,10));
	
	//ok(results.length == 1, 'Unexpected Count' )
	//ok(results.length == 1, JSON.stringify( results ))

	var result = results[0];
	if(result){
		ok(result.start.year == 2013);
		ok(result.start.month == 3);
		ok(result.start.day   == 29); 
		ok(result.start.hour   == 6);
		ok(result.start.minute   == 30);
		
		ok(result.end.year == 2013)
		ok(result.end.month == 3)
		ok(result.end.day   == 29) 
		ok(result.end.hour   == 9)
		ok(result.end.minute   == 30)
		
		ok(result.text == 'Mon Apr 29, 2013 6:30am ? 9:30am', result.text)
	}
});


test("Test - Email 3", function() {
	
	var text =　"Hey, 11:15pm at hq works great. I'm at if you need it. See you tomorrow!";
	
	var results = chrono.parse(text, new Date(2013,3,30, 22, 04));
	
	var result = results[0];
	if(result){
		ok(result.start.year == 2013);
		ok(result.start.month == 4);
		ok(result.start.day   == 1); 
		ok(result.start.hour   == 23);
		ok(result.start.minute   == 15);
	}
});


test("Test - Email 4", function() {
	
	var text =　"Begin forwarded message:\nFrom> Date: April 30, 2013, 20:38:26 EDT\nTo:\nSubject: Re: Advice\n\nThanks! Friday lunch would be wonderful--12:30?";
	
	var results = chrono.parse(text, new Date(2013,3,30, 22, 04));

	ok(results.length==3, results)
	
	var result = results[0];
	if(result){
		ok(result.text == 'April 30, 2013, 20:38:26 EDT', 
			result.text +' != '+'April 30, 2013, 20:38:26 EDT')
	}
	
	
	var result = results[1];
	if(result){
		ok(result.text == 'Friday', result.text +'!= Friday')
		ok(result.start.year == 2013);
		ok(result.start.month  == 4, result.start.month);
		ok(result.start.day    == 3, result.start.day); 
		ok(result.start.hour   == 12);
		ok(result.start.minute == 30);
	}
	
	var result = results[2];
	if(result){
    ok(result.text == '12:30', result.text +'!= 12:30')
	}
});



test("Test - Email 5", function() {
	
	var text =　"Lets pencil in Tuesday at kings fish house at 12?";
	var results = chrono.parse(text, new Date(2013, 4, 30, 19, 22));

	ok(results.length==2, JSON.stringify(results))
	
	var result = results[0];
	if(result){
		ok(result.text == 'Tuesday', result.text +' != '+'Tuesday')
		ok(result.start.year == 2013);
		ok(result.start.month  == 5, result.start.month);
		ok(result.start.day    == 4, result.start.day);
	}
	
	var result = results[1];
	if(result){
		ok(result.text == 'at 12', result.text +' != '+'at 12')
		ok(result.start.hour == 12, result.start.day);
	}
	
	var text =　"@gmail.com> wrote: yes. my friday looks good. same location?";
	var results = chrono.parse(text, new Date(2013, 5, 6, 9, 2));

	ok(results.length==1, results)
	
	var result = results[0];
	if(result){
		ok(result.text == 'friday', result.text +' != '+'Tuesday')
		ok(result.start.year == 2013);
		ok(result.start.month  == 5, result.start.month);
		ok(result.start.day    == 7, result.start.day);
	}
	
	var text =　"Great! I have your call confirmed for Mon, 5/20 at 4:30pm. You can reach at ";
	var results = chrono.parse(text, new Date(2013, 3, 6, 9, 2));

	ok(results.length==1, JSON.stringify(results))
	
	var result = results[0];
	if(result){
		ok(result.text == 'Mon, 5/20 at 4:30pm', result.text +' != '+'Mon, 5/20 at 4:30pm')
		ok(result.start.year == 2013);
		ok(result.start.month  == 4, result.start.month);
		ok(result.start.day    == 20, result.start.day);
		ok(result.start.hour  == 16, result.start.month);
		ok(result.start.minute    == 30, result.start.day);
	}
	
	var text =　"6 PM on 7/26";
	var results = chrono.parse(text, new Date(2013, 3, 6, 9, 2));
  
	var result = results[0];
	if(result){
		ok(result.start.year == 2013);
		ok(result.start.month  == 6, result.start);
		ok(result.start.day    == 26, result.start);
		ok(result.start.hour  == 18, result.start);
		ok(result.start.minute    == 00, result.start);
	}
	
	var text =　"Date: Wed, Jun 19, 2013 at 12:43 AM\nSubject: Mixology Class\n...is holding mixology classes at Roon this Saturday from 3 to 5 PM.";
	var results = chrono.parse(text, new Date(2013, 5, 19, 9, 2));
  
	var result = results[1];
	if(result){
		ok(result.start.year == 2013);
		ok(result.start.month  == 5, JSON.stringify(result.start));
		ok(result.start.day    == 22, JSON.stringify(result.start));
		ok(result.start.hour   == 15, JSON.stringify(result.start));
		ok(result.start.minute == 00, JSON.stringify(result.start));
	}
});

test("Test - Email 6", function() {

	var text = "13.228.8470 Off 713.228.4147 Fax 909 Texas Avenue Suite 1314 Houston, TX 77002 www.syncrasy.com Sales: 713.228.4407"
	var results = chrono.parse(text);
	ok(results.length == 0, JSON.stringify(results.length))
})



　

