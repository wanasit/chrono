
test("Test - International Standard Parser", function() {

	var text = "Let's finish this before this 2013-2-7.";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,1,7,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "Let's finish this before this 2013-02-07.";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,1,7,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "Let's finish this before this 2013-02-29.";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 0, JSON.stringify( parser.results() ) )



	var text = "Let's finish this before this 2013-02-29.";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 0, JSON.stringify( parser.results() ) )


	var text = "1994-11-05T13:15:30Z";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ))
	var result = parser.results()[0];
	if(result){

		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year   == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month  == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day    == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour   == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.text == '1994-11-05T13:15:30Z', result.text)

		var resultDate = (result.start.date());
		var expectDate = new Date('1994-11-05T13:15:30Z');
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "1994-11-05T13:15:30.45Z";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ))
	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year   == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month  == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day    == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour   == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.text == '1994-11-05T13:15:30.45Z', result.text)

		var resultDate = (result.start.date());
		var expectDate = new Date('1994-11-05T13:15:30.45Z');
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "1994-11-05T08:15:30-05:00";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ))
	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year   == 1994, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month  == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day    == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour   == 8, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.text == '1994-11-05T08:15:30-05:00', result.text)

		var resultDate = (result.start.date());
		var expectDate = new Date('1994-11-05T13:15:30.45Z');
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "1994-11-05T08:15:30-05:30";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ))
	var result = parser.results()[0];

	var resultDate = (result.start.date());
	var expectDate = new Date('Sat Nov 05 1994 22:45:30 GMT+0900 (JST)');
	ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


	var text = "1994-11-05T08:15:30.51-05:30";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ))
	var result = parser.results()[0];

	var resultDate = (result.start.date());
	var expectDate = new Date('Sat Nov 05 1994 22:45:30 GMT+0900 (JST)');
	ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	
});

test("Test - Slash", function() {

	var text = "The Deadline is 8/10/2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == '8/10/2012', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is 1/10/13";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is 1/10/56";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


  	var text = "The Deadline is 1/10/56 - 3/10/56";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2013,2,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

	}

	var text = "The Deadline is 05/06/13";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,4,6,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	//Should not parse date directly from URLs
	var text = "http://blog.evernote.com/blog/2013/07/11/save-the-date-the-evernote-conference-is-back/";
  	var results = chrono.parse(text);
	ok(results.length == 0, JSON.stringify( results ) )

});

test("Test - Little Endian with Month's name", function() {

	var text = "12th of July at 19:00";
	var results = chrono.parse(text, new Date(2014,6,7));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.text == '12th of July at 19:00', result.text)

		var resultDate = (result.startDate);
		var expectDate = (new Date(2014,6,12,19));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is 10 August 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is 10 August";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "The Deadline is 10 August 2555 BE";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Tuesday, 10 January";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )

		ok(result.text == 'Tuesday, 10 January', result.text)
		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

	}



	var text = "The Deadline is Tue, 10 January";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.text == 'Tue, 10 January', result.text)
		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

	}



	var text = "The Deadline is 10-12 August 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}

	var text = "The Deadline is 10 to 12 August 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}

	var text = "The Deadline is 10 - 12 August";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}



	var text = "The Deadline is 10 August - 12 September";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,8,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}

	var text = "The Deadline is 10 August to 12 Sep";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,8,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}


	var text = "The Deadline is 12 September - 10 August";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,8,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}


	var text = "The Deadline is 12 September - 10 August 2013";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		var resultDate = (result.endDate);
		var expectDate = (new Date(2013,8,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}



	var text = "The Deadline is 12 September - 10 August 2011";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(!result.start.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2011,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(!result.end.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2011,8,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}

	var text = "The Deadline is 10 August - 12 September 2011";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(!result.start.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2011,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(!result.end.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2011,8,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

		ok(result.referenceDate)
	}

});

test("Test - Middle Endian with Month's name", function() {

	var text = "The Deadline is August 10, 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is August 10";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "The Deadline is August 10 2555 BE";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is January 10";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Tuesday, January 10";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.text == 'Tuesday, January 10', result.text)

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is Tue, January 10";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.start.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )

		ok(result.text == 'Tue, January 10', result.text)

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is August 10-12, 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is  August 10 to 12 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is August 10 - 12";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is August 10 - November 12";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,10,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is August 10 to November 12";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,10,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is Aug 10 - Nov 12";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,10,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is Aug 10 - Nov 12, 2013";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2013,10,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is Aug 10 - Nov 12, 2011";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(!result.start.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )
		var resultDate = (result.startDate);
		var expectDate = (new Date(2011,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)


		ok(result.end, JSON.stringify(result.start) )
		ok(result.end.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(!result.end.impliedComponents, 'Implied Components - ' + JSON.stringify(result.end.impliedComponents) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2011,10,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


});

test("Test - Date + Time", function() {

	var text = "The Deadline is August 10, 2012 10:12 pm";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 12, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,22,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is August 10, 2012 10:12:59 pm";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 12, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 59, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,22,12,59));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Friday at 10 am";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 5, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )

		ok(result.text == 'Friday at 10 am', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is Friday at 10am";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 5, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.text == 'Friday at 10am', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Monday at 10 am";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 1, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.text == 'Monday at 10 am', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,13,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Thursday at 10 am";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		ok(result.text == 'Thursday at 10 am', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,16,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "The Deadline is last Friday at 9.30";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 9, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 5, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.text == 'last Friday at 9.30', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,3,9,30,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is 16 Aug 2012 22:48:58 xx";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 48, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 58, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		ok(result.text == '16 Aug 2012 22:48:58', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,16,22,48,58));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Aug 16 2012 22:48:58 xx";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 48, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 58, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		ok(result.text == 'Aug 16 2012 22:48:58', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,16,22,48,58));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "On Jun 26, 2013, at 12:40 AM";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 26, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 0, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 40, 'Test Result - (Minute) ' + JSON.stringify(result.start) )

		ok(result.text == 'Jun 26, 2013, at 12:40 AM', result.text )
	}



	var text = "monday 4/29/2013 630-930am";
	var results = chrono.parse(text, new Date(2012,7,10));
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 29, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 6, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 1, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )

		ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.end) )
  	ok(result.end.month == 3, 'Test Result - (Month) ' + JSON.stringify(result.end) )
  	ok(result.end.day == 29, 'Test Result - (Day) ' + JSON.stringify(result.end) )
  	ok(result.end.hour == 9, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
  	ok(result.end.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.end) )
  	ok(result.end.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.end) )
		ok(result.end.dayOfWeek == 1, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )

		ok(result.concordance )
		var resultDate = result.startDate;
		var expectDate = new Date(2013,3,29,6,30,0);
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}




  var text = "tuesday 6/25/2013 12:30 pm";
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 25, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
    ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
  }

  var text = "tuesday 6/25/2013 12:30 am";
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 25, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 0, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
  }

  var text = "tuesday 6/25/2013 10pm - 12:30 am";
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 25, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

    ok(result.end.year  == 2013, 'Test Result - (Year) ' + JSON.stringify(result.end) )
  	ok(result.end.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.end) )
  	ok(result.end.day   == 26, 'Test Result - (Day) ' + JSON.stringify(result.end) )
    ok(result.end.hour == 0, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
  	ok(result.end.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.end) )
  	ok(result.end.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.end) )
  }

  var text = "7/2/2013 1-230 pm";
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 13, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

    ok(result.end.year  == 2013, 'Test Result - (Year) ' + JSON.stringify(result.end) )
  	ok(result.end.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.end) )
  	ok(result.end.day   == 2, 'Test Result - (Day) ' + JSON.stringify(result.end) )
    ok(result.end.hour == 14, 'Test Result - (Hour) ' + JSON.stringify(result.end) )
  	ok(result.end.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.end) )
  	ok(result.end.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.end) )
  }


  var text = "11:15 tomorrow";
  var results = chrono.parse(text, new Date(2012,7,10,10));
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result) )
    ok(result.text == '11:15 tomorrow', JSON.stringify(result) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 11, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
  }

  var text = "11:15 - 12.15 tomorrow";
  var results = chrono.parse(text, new Date(2012,7,10,10));
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result) )
    ok(result.text == '11:15 - 12.15 tomorrow', JSON.stringify(result) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 11, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

    ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.end.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.end.hour == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.end.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.end.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
  }


  var text = "12.15 on 3/3/2012 - 3/4/2012";
  var results = chrono.parse(text, new Date(2012,7,10));
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result) )
    ok(result.text == '12.15 on 3/3/2012 - 3/4/2012', JSON.stringify(result) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

    ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.end.month == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.end.day == 4, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.end.hour == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.end.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.end.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
  }

  var text = "Tuesday, Jul 9, 5:30pm - 6:00pm (EDT) > Wednesday, Jul 10, 12:00";
  var results = chrono.parse(text, new Date(2012,7,10));
  ok(results.length == 2, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result) )
    ok(result.text == 'Tuesday, Jul 9, 5:30pm - 6:00pm (EDT)', JSON.stringify(result) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 17, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

    ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.end.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.end.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.end.hour == 18, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.end.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.end.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
  }


  var text = "Chrono version 1.1";
  var results = chrono.parse(text, new Date(2012,7,10));
  ok(results.length == 0, JSON.stringify( results ) )

});

test('Test - Timezone', function() {

  var expected = "Thu Aug 29 2013 18:43:10 GMT+0900 (JST)";
  var text = "Thursday, 29 August 2013, 09:43:10 GMT";

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));

  var expected = 'Thu Aug 29 2013 18:24:03 GMT+0900 (JST)';
  var text = 'Thursday, 29 August 2013, 05:24:03 EDT'; //(GMT -4)

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Thu Aug 29 2013 18:54:48 GMT+0900 (JST)';
  var text = 'Thursday, 29 August 2013, 04:54:48 EST';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Fri Dec 20 2013 06:30:00 GMT+0900 (JST)';
  var text = 'Thu Dec 19 2013 16:30:00 GMT-0500 (EST)';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));

  var expected = 'Fri Dec 20 2013 06:30:00 GMT+0900 (JST)';
  var text = 'Thu Dec 19 2013 16:30:00 -0500 (EST)';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Fri Dec 20 2013 06:30:00 GMT+0900 (JST)';
  var text = 'Thu Dec 19 2013 16:30:00 -0500';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));

  var expected = 'Thu Dec 19 2013 20:30:00 GMT+0900 (JST)';
  var text = 'Thu Dec 19 2013 16:30:00 +0500';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Thu Dec 19 2013 20:30:00 GMT+0900 (JST)';
  var text = 'Thu Dec 19 2013 16:30:00 +05:00';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Thu Aug 29 2013 18:54:48 GMT+0900 (JST)';
  var text = 'Thursday, 29 August 2013, 04:54:48 EST';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var text = "It's 29 August 2013, 06.22 in New York"; //GMT -5
  var results = chrono.parse(text, new Date());
  var resultDate = results[0].start.date(240);

  var expected = 'Thu Aug 29 2013 19:22:00 GMT+0900 (JST)';
  ok(resultDate.getTime() == new Date(expected).getTime(),
    resultDate +' != '+ new Date(expected));


  var text = "It's 29 August 2013, 06.22 in Local";
  var results = chrono.parse(text, new Date());
  var resultDate = results[0].start.date(new Date().getTimezoneOffset());
  var resultDate2 = results[0].start.date();
  ok(resultDate.getTime() == resultDate2.getTime(),
    resultDate +' != '+ resultDate2);

});

test("Test - DateOnly", function() {

	var text = "The Deadline is 23th";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 23, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == '23th', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,23,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is 32th";
	var results = chrono.parse(text, new Date(2012,7,10));
	ok(results.length == 0, JSON.stringify( results ) )

});

test("Test - Date & Time ago", function() {

	var text = "5 days ago, we did something";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == '5 days ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,5,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "10 days ago, we did something";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == '10 days ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,6,31,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "5 minutes ago";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == '5 minutes ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12,9));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "15 minute ago";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == '15 minute ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,11,59));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "   1 hour ago";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 3, 'Wrong index')
		ok(result.text == '1 hour ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,11,14));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "   12 hours ago";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 3, 'Wrong index')
		ok(result.text == '12 hours ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,0,14));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "within 12 hours ago";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == 'within 12 hours ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,0,14));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


})

test("Test - Deadline", function() {

	var text = "we have to do something in 5 days.";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 24, 'Wrong index')
		ok(result.text == 'in 5 days', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,15,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "we have to do something within 10 day";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 24, 'Wrong index')
		ok(result.text == 'within 10 day', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,20,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "5 minutes ago";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == '5 minutes ago', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12,9));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "we have to do something within 15 minute";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 24, 'Wrong index')
		ok(result.text == 'within 15 minute', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12,29));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "within 1 hour";
	var results = chrono.parse(text, new Date(2012,7,10,12,14));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 0, 'Wrong index')
		ok(result.text == 'within 1 hour', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,13,14));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

})


test("Test - General", function() {

	var text = "The Deadline is today";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'today', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Tomorrow";
	var results = chrono.parse(text, new Date(2012,7,10,12));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'Tomorrow', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,11,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Tomorrow 12.30pm";
	var results = chrono.parse(text, new Date(2013,5,26,0,40));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 26, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'Tomorrow 12.30pm', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,5,26,12,30));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is yesterday";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'yesterday', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,9,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is last night";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour === 0, 'Test Result - (hour) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'last night', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is last night at 22.30";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour === 22, 'Test Result - (hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute === 30, 'Test Result - (hour) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'last night at 22.30', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,9,22,30));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is last night at 1:23 am";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour === 1, 'Test Result - (hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute === 23, 'Test Result - (hour) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'last night at 1:23 am', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,1,23));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}




	//Time only
	var text = "The Deadline is 12:00";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 12, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == '12:00', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,12,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline is 11:00";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 11, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == '11:00', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,11,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline is 11:00pm    ";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 23, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == '11:00pm', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,23,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }


	var text = "The Deadline is 11:00pm    ";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 23, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == '11:00pm', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,23,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline is Tues";
	var results = chrono.parse(text, new Date(2014,5,23));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) )

    ok(result.text == 'Tues', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2014,5,24,12,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline is Tue";
	var results = chrono.parse(text, new Date(2014,5,23));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) )

    ok(result.text == 'Tue', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2014,5,24,12,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }


});

test("Test - General2", function() {

  var text = "monday 4/29/2013 630-930am";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "wednesday 5/1/2013 1115am";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "friday 5/3/2013 1230pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "sunday 5/6/2013  750am-910am";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "monday 5/13/2013 630-930am";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "wednesday 5/15/2013 1030am";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "friday 6/21/2013 2:30";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "tuesday 7/2/2013 1-230 pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "Monday, 6/24/2013, 7:00pm - 8:30pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "Thursday6/20/2013 from 7:00 PM to 10:00 PM";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "Wednesday, July 03, 2013 2pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)


  var text = "6pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "6 pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "7-10pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "11.1pm";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "that I need to know or am I covered?";
  var result = chrono.parse(text);
  ok(result.length == 0, result)

  var text = "at 12";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "at noon";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)
  ok(result.start.hour == 12, JSON.stringify(result.start))
  ok(result.start.hour == 12, JSON.stringify(result.start))

  var text = "at midnight";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "tonight";
  var result = chrono.parse(text, new Date(2012, 1, 1))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour == 0, result.text)
  ok(result.start.year == 2012, result.text)
  ok(result.start.month == 1, result.text)
  ok(result.start.day == 2, result.text)

  var text = "tonight 8pm";
  var result = chrono.parse(text, new Date(2012, 1, 1))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour  == 20, result.text)
  ok(result.start.year  == 2012, result.text)
  ok(result.start.month == 1, result.text)
  ok(result.start.day   == 1, result.text)
  ok(result.start.meridiem   == 'pm', result.text)

  var text = "tonight at 8";
  var result = chrono.parse(text, new Date(2012, 1, 1))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour  == 20, result.text)
  ok(result.start.year  == 2012, result.text)
  ok(result.start.month == 1, result.text)
  ok(result.start.day   == 1, result.text)
  ok(result.start.meridiem   == 'pm', result.text)


  var text = "thurs";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)
  ok(result.start.dayOfWeek == 4, result.text)


  var text = "thurs";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)
  ok(result.start.dayOfWeek == 4, result.text)


  var text = "the 17th";
  var result = chrono.parse(text, new Date(2013,6,10,3,33))[0];
  ok(result.text == text, result.text)
  ok(result.start.month == 6, result.text)
  ok(result.start.day == 17, JSON.stringify(result))

  var text = "confirmed for noon on the 17th.";
  var result = chrono.parse(text, new Date(2013,6,10,3,33))[0];
  ok(result.text == 'noon on the 17th', result.text)
  ok(result.start.month == 6, result.text)
  ok(result.start.day == 17, JSON.stringify(result))
  ok(result.start.hour == 12, JSON.stringify(result))
  ok(result.start.impliedComponents.indexOf('hour') < 0, JSON.stringify(result))
  ok(result.start.impliedComponents.indexOf('minute') < 0, JSON.stringify(result))
  ok(result.start.impliedComponents.indexOf('month') >= 0, JSON.stringify(result))


  var text = "Adam <Adam@supercalendar.com> написал(а):\nThe date is 02.07.2013";
  var result = chrono.parse(text, new Date(2013,5,22,3,33))[0];
  ok(result.text == '02.07.2013', result.text)


  var text = "tuesday the 25th at 9am";

  var result = chrono.parse(text, new Date(2013,5,22,3,33))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour == 9, JSON.stringify(result))
  ok(result.start.meridiem == 'am', JSON.stringify(result))


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


  var text = "174 November 1,2001- March 31,2002";
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify(results) )
  ok(results[0].text == 'November 1,2001- March 31,2002', JSON.stringify(results) )


  var text = "Total: $1,194.09 [image: View Reservation";
  var results = chrono.parse(text);
  ok(results.length == 0, JSON.stringify(results) )

  var text = "...Thursday, December 15, 2011 Best Available Rate "
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify(results) )
  ok(results[0].start.year == 2011, JSON.stringify(results) )


  var text = "SUN 15SEP 11:05 AM - 12:50 PM"
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify(results) )
  ok(results[0].text.length == 29, JSON.stringify(results) )


  var text = "FRI 13SEP 1:29 PM - FRI 13SEP 3:29 PM"
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify(results) )
  ok(results[0].start.hour == 13, JSON.stringify(results) )
  ok(results[0].end.hour == 15, JSON.stringify(results) )


  var text = "9:00 AM to 5:00 PM, Tuesday, 20 May 2013"
  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify(results) )
  ok(results[0].start.hour == 9, JSON.stringify(results) )
  ok(results[0].end.hour == 17, JSON.stringify(results) )
  ok(results[0].end.meridiem == 'pm', JSON.stringify(results))
  ok(results[0].startDate.getTime() == new Date(2013, 4, 20, 9, 0).getTime(), JSON.stringify(results) )
  ok(results[0].endDate.getTime() == new Date(2013, 4, 20, 17, 0).getTime(), JSON.stringify(results) )

  var text = "2014-07-07T04:00:00Z"
  var results = chrono.parse(text);

  ok(results.length == 1, JSON.stringify(results) )
  ok(results[0].text == '2014-07-07T04:00:00Z', JSON.stringify(results) )
 
});
