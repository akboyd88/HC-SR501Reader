var gpio = require('rpi-gpio');

gpio.on('change', function(channel, value){
	console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH, function(err){
	if(err != null){
		console.log('Failed to setup GPIO pin');	
		console.log(err);
	}else{
		console.log('Successfully setup GPIO pin');
	}
});

process.on('SIGINT', function(){
	console.log('Shuting down');
	process.exit();
});
