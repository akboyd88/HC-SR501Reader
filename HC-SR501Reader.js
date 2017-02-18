var gpio = require('rpi-gpio');

function reader(opts){
	this.pinNumber = opts.pinNumber;
	this.threshold = opts.threshold;
	this.sensorId = opts.sensorId;
	this.MOTION_START = 0;
	this.MOTION_STOP = 1;
	this.motionStopListeners = [];
	this.motionStartListeners = [];
	
	var self = this;

	gpio.on('change', function(channel, value){
        	if(value){
			self.motionStartListeners.forEach(function(listener){
				listener({
					sensorId: self.sensorId,
					time: new Date()
				});
			});
		} else {
			self.motionStopListeners.forEach(function(listener){
				listener({
					sensorId: self.sensorId,
					time: new Date()
				});
			});
		}
	});

	gpio.setup(this.pinNumber, gpio.DIR_IN, gpio.EDGE_BOTH, function(err){
        	if(err != null){
                	console.log('Failed to setup GPIO pin');
                	console.log(err);
        	}else{
                	console.log('Successfully setup GPIO pin');
        	}
	});
	
}

var getEvtCollection = function(reader, evtType){
	switch(evtType){
		case reader.MOTION_START:
			return reader.motionStartListeners;
		case reader.MOTION_STOP:
			return reader.motionStopListeners;
	}
};

reader.prototype.on = function(evtType, evtHdlr){
	var evtListenerCol = getEvtCollection(this, evtType);
	evtListenerCol.push(evtHdlr);	
};

reader.prototype.off = function(evtType, evtHdlr){
	var evtListenerCol = getEvtCollection(this, evtType);
	var placeInArray = evtListenerCol.indexOf(evtHdlr);
	if(placeInArray > 0){
		evtListenerCol.splice(placeInArray, 1);
	}
};

module.exports = reader;
