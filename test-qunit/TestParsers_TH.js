
test("Test - General", function() {
	
	var text = "ไปทำงานวันนี้";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == 'วันนี้', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "ไปทำงานพรุ่งนี้";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
	  ok(result.text == 'พรุ่งนี้', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,11,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
  
	var text = "ไปทำงานเมื่อวานนี้";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
	  ok(result.text == 'เมื่อวาน', result.text )
	  
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 9, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,9,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "ไปทำงาน 5 วันก่อน";
	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
	  ok(result.text == '5 วันก่อน', result.text )
	  
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,5,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
});

test("Test - Month Name Little Endian", function() {
	
	var text = "วนสิทธิ์ ธนะกิจรุ่งเรือง เกิดวันที่ 28 มีนาคม 2532";
	var results = chrono.parse(text, new Date(2012,8,3));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == '28 มีนาคม 2532', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 1989, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 28, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(1989,2,28,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	
	var text = "ไปญี่ปุ่นวันที่ 22 ก.ย.";
	var results = chrono.parse(text, new Date(2012,8,3));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == '22 ก.ย.', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 22, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,8,22,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	var text = "ไปญี่ปุ่นวันที่ 22 - 30 ก.ย.";
	var results = chrono.parse(text, new Date(2012,8,3));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == '22 - 30 ก.ย.', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 22, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,8,22,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
		
		
		ok(result.end, JSON.stringify(result.end) )
		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.end.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.end.day == 30, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.endDate);
		var expectDate = (new Date(2012,8,30,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
		
	}
	
	
	
});

test("Test - Day of Week",function() {
  
  var text = "ไปทำงานวันอังคารนี้";
	var results = chrono.parse(text, new Date(2012,8,3));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == 'วันอังคารนี้', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 4, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,8,4,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "ไปทำงานวันอังคารหน้า";
	var results = chrono.parse(text, new Date(2012,8,3));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == 'วันอังคารหน้า', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,8,11,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
	
	var text = "ไปทำงานวันอังคารที่แล้ว";
	var results = chrono.parse(text, new Date(2012,8,3));
	
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
	  
		ok(result.text == 'วันอังคารที่แล้ว', result.text )
		
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 28, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,28,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
})
