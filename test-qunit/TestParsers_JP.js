
test("Test - General (JP)", function() {
	
	var text = "今日感じたことを忘れずに";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == "今日", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "昨日の全国観測値ランキング";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
	  
		ok(result.text == "昨日", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,9,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
});

test("Test - Standard (JP)", function() {
	
	var text = "主な株主（2012年3月31日現在）";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == "2012年3月31日", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,2,31,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "主な株主（2012年９月3日現在）";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == "2012年９月3日", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 3, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,8,3,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "初めて動画が投稿されたのは同年4月23日である";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == "同年4月23日", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 23, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,3,23,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "初めて動画が投稿されたのは同 4月23日である";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == "4月23日", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 3, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 23, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,3,23,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	
	var text = "平成18年6月1日午前11時から帝国ホテルで行われた、";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == "平成18年6月1日午前11時", result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2007, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2007,5,1,11));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
});
