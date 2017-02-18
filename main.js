var Reader = require('./HC-SR501Reader');

process.argv.splice(0, 2);

console.log(process.argv.length);

if(process.argv.length != 3){
	console.log('Usage [pin number] [event time threshold] [sensor id]');
}else{
	var pin = process.argv[0];
	var threshold = process.argv[1];
	var id = process.argv[2];

	var reader = new Reader({
		pinNumber: pin,
		timeThreshold: threshold,
		sensorId: id
	});

	reader.on(reader.MOTION_START, function(evt){
		console.log('Motion started at ' + evt.time + ' for sensor ' + evt.sensorId);		
	});

	reader.on(reader.MOTION_STOP, function(evt){
		console.log('Motion stopped at ' + evt.time + ' for sensor ' + evt.sensorId);
	});

	process.on('SIG_INT', function(){
		console.log('Shutting down');
		process.exit();
	});
}

