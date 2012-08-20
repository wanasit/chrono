var util = require('util');
var moment = require('../moment');
var chrono = require('../chrono');

exports.MonthNameLittleEndian = function(test){
		
		var text = "The Deadline is 10 August 2012";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		
		var text = "The Deadline is 10 August";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		
		
		var text = "The Deadline is 10 August 2555 BE";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		var text = "The Deadline is 10 January";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2013,0,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		
		var text = "The Deadline is 10-12 August 2012";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		var text = "The Deadline is 10 to 12 August 2012";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		var text = "The Deadline is 10 - 12 August";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		
		
		var text = "The Deadline is 10 August - 12 September";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
			
			
			test.ok(result.end, JSON.stringify(result.start) )
			test.ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.endDate);
			var expectMoment = moment(new Date(2012,8,12,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		var text = "The Deadline is 10 August to 12 Sep";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
			
			
			test.ok(result.end, JSON.stringify(result.start) )
			test.ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.endDate);
			var expectMoment = moment(new Date(2012,8,12,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		
		var text = "The Deadline is 12 September - 10 August";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2012,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
			
			
			test.ok(result.end, JSON.stringify(result.start) )
			test.ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.endDate);
			var expectMoment = moment(new Date(2012,8,12,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
		
		var text = "The Deadline is 12 September - 10 August 2013";
		var results = chrono.parse(text, new Date(2012,7,10));
		
		test.ok(results.length == 1, JSON.stringify( results ) )

		var result = results[0];
		if(result){
			test.ok(result.start, JSON.stringify(result.start) )
			test.ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.startDate);
			var expectMoment = moment(new Date(2013,7,10,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
			
			
			test.ok(result.end, JSON.stringify(result.start) )
			test.ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
			test.ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
			test.ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
			
			var resultMoment = moment(result.endDate);
			var expectMoment = moment(new Date(2013,8,12,12));
			test.ok(Math.abs(resultMoment.diff(expectMoment)) < 100000, 'Test result.startDate ' + resultMoment +'/' +expectMoment)
		}
		
    
		
		test.done()
}



