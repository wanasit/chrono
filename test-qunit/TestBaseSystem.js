test("Test - Module Status", function() {
	ok(chrono, 				'Load: chrono');
	ok(chrono.Parser, 'Load: chrono.Parser');
});

test("Test - Base Parser", function() {
	
	var parser = chrono.Parser('0123456789');
	
	ok(parser, 'Create Parser');
	ok(!parser.finished(), 'Init Value');
	
	for(var i=0; i<11; i++){
		
		var result = parser.exec();
		ok(!result);
	}
	
	ok(parser.finished());
	ok(parser.results());
	ok(parser.results().length == 0);
});

test("Test - Override Base Parser", function() {
	
	var parser = chrono.Parser('01234-pattern-01234-pattern');
	ok(parser, 'Create Parser');
	ok(!parser.finished(), 'Init Value');
	
	//
	var extract_called = 0;
	var expected_result = new chrono.ParseResult({ start:{day:1, month:1, year: 2012}, text:'pattern', index:0 });
	parser.pattern = function () { return /pattern/ }
	parser.extract = function(text, index) {
		
		if(extract_called == 0){
			
			ok(index == 6, 'matched index0:' + index);
			expected_result.index = 6
		}
		else if(extract_called == 1){
			
			ok(index == 20, 'matched index1:' + index);
			expected_result.index = 20
		}
		
		extract_called++;
		return expected_result;
	}
	
	for(var i=0; i<3; i++){
		
		var result = parser.exec();
		
		if(result)
			ok(result == expected_result, result);
	}
	
	ok(extract_called == 2);
	
	ok(parser.finished(),'Finished');
	
	ok(parser.results());
	ok(parser.results().length == 2);
	ok(parser.results()[0] == expected_result);
	ok(parser.results()[1] == expected_result);
});

test("Test - Create Custom Parser", function() {
	
	var text = '01234-pattern-01234-pattern';
	var extract_called = 0;
  
	chrono.parsers.TestCustomParser = function(text, ref, opt) {
	  var parser = chrono.Parser(text, ref, opt);
	  parser.pattern = function () { return /pattern/ }
  	parser.extract = function(text, index) {
  	  
      var expected_result = new chrono.ParseResult({ start:{day:1, month:1, year: 2012}, text:'pattern', index:0 });
      
  		if(extract_called == 0){
  			ok(index == 6, 'matched index0:' + index);
  			expected_result.index = 6
  		} 
  		else if(extract_called == 1){
        
  			ok(index == 20, 'matched index1:' + index);
  			expected_result.index = 20
  		}

  		extract_called++;
  		return new Object(expected_result);
  	}
  	
  	return parser;
	} 
	
	var results = chrono.parse(text)
	ok(results.length == 2, JSON.stringify(results));
	ok(results[0] && results[0].index == 6);
	ok(results[1] && results[1].index == 20);
	delete chrono.parsers.TestCustomParser;
});


test("Test - Day of Week Parser", function() {
	
	var text = "Let's finish this before this Monday.";
	var parser = chrono.parsers.DayOfWeekParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,6,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "Tuesday.";
	var parser = chrono.parsers.DayOfWeekParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )
	
	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 14, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,14,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "Friday.";
	var parser = chrono.parsers.DayOfWeekParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )
	
	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
});

test("Test - Day of Week Parser + Concordance Checking", function() {
	
	var text = "Let's finish this before this Monday.";
	var parser = chrono.parsers.DayOfWeekParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.concordance == "Let's finish this before this Monday.", 'Test Result - (Concordance) ' 
		  + JSON.stringify(result.concordance) +'/'+text)
		
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,6,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "The latest and best tweets on #monday. Read what people are saying and join the conversation.";
	var parser = chrono.parsers.DayOfWeekParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.text == 'monday', 'Test Result - (TEXT) ' +  result.text)
		ok(result.concordance == "...latest and best tweets on #monday. Read what people are sayi...", 'Test Result - (Concordance) ' 
		  + JSON.stringify(result.concordance)  +'/'+text)
		
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,13,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "First Monday is one of the first openly accessible,\n"+
	  "peer–reviewed journals on the Internet, solely devoted to the Internet.";
	  
	var parser = chrono.parsers.DayOfWeekParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.concordance == "First Monday is one of the first openly...", 'Test Result - (Concordance) ' 
		  + JSON.stringify(result.concordance)  +'/'+text)
		
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,13,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	

});

test("Test - International Standard Parser", function() {
	
	var text = "Let's finish this before this 2012-8-9.";
	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,9,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "2012-8-7";
	var parser = chrono.parsers.InternationalStandardParser(text);
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )
	
	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,7,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "2012-8-10";
	var parser = chrono.parsers.InternationalStandardParser(text);
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )
	
	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
});

test("Test - Integrated Parsing", function() {
	
	var text = "Let's finish this before this Monday.";
	var results = chrono.integratedParse(text, new Date(2012,7,8));
  
  ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,6,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "Let's finish this before this 2012-8-9.";
	var results = chrono.integratedParse(text, new Date(2012,7,8));

	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,9,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
});


test("Test - Obj Instanciate", function() {

	var _chrono = new chrono();

	ok(_chrono, 'Init: chrono');
	ok(_chrono.parse, 'Init: chrono.parse');
	ok(typeof(_chrono.parse) === 'function', 'Init: chrono.parse');


	var results = _chrono.parse('2012-8-7')
	ok(results, JSON.stringify(results));
	ok(results.length > 0, JSON.stringify(results));

	// Try delete a parser
	delete _chrono.parsers.InternationalStandardParser
	results = _chrono.parse('2012-8-7')
	ok(results, JSON.stringify(results));
	ok(results.length === 0, JSON.stringify(results));

	// Delete a parser doesn't effect the global parsing
	results = chrono.parse('2012-8-7')
	ok(results, JSON.stringify(results));
	ok(results.length > 0, JSON.stringify(results));


	// Try update the timezone
	_chrono.timezoneMap['CST'] = 1000
	ok(_chrono.timezoneMap['CST'] != chrono.timezoneMap['CST'], chrono.timezoneMap['CST']);
});


test("Test - Obj Instanciate 2", function() {

	var c1 = new chrono();
	c1.timezoneMap['CST'] = 1000;

	var c2 = new chrono();
	c2.timezoneMap['CST'] = -1000;

	//Set different timezones
	ok(c1.timezoneMap['CST'] != c2.timezoneMap['CST'], c1.timezoneMap['CST']);

	var date1 = c1.parseDate('Today 1.00 AM (CST)');
	var date2 = c2.parseDate('Today 1.00 AM (CST)');
	ok(date1.getTime() != date2.getTime(), date1);
	
});


test("Test - Obj Instanciate 3", function() {

	var _chrono = new chrono();
	var result = _chrono.parseDate('Thursday', new Date(2013,11,2))
	var expectDate = new Date(2013, 11, 5, 12);

	ok(result.getTime() == expectDate.getTime(), result);

	_chrono.refiners.PreferPastLastWeekRefiner = {
  		refine: function(text, results) {

  			results.forEach(function(result){
  				if(result.start.isCertain('dayOfWeek') && !result.start.isCertain('day')){
  					result.start.imply('day', result.start.day - 7)
  				}
  			})

  			return results;
  		}
	}

	var result = _chrono.parseDate('Thursday', new Date(2013,11,2))
	var expectDate = new Date(2013, 10, 28, 12);
	ok(result.getTime() == expectDate.getTime(), result);

});


