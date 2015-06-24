var StateJS = require('state.js');

/**
 * Definition for type : SerialJS
 **/
function SerialJS(SerialJS_serialPort__var, SerialJS_lib__var, SerialJS_serialP__var, SerialJS_buffer__var, SerialJS_index__var) {

var _this;
this.setThis = function(__this) {
_this = __this;
};

this.ready = false;
//Attributes
this.SerialJS_serialPort__var = SerialJS_serialPort__var;
this.SerialJS_lib__var = SerialJS_lib__var;
this.SerialJS_serialP__var = SerialJS_serialP__var;
this.SerialJS_buffer__var = SerialJS_buffer__var;
this.SerialJS_index__var = SerialJS_index__var;
//message queue
const queue = [];
this.getQueue = function() {
return queue;
};

//callbacks for third-party listeners
const receive_bytesOnreadListeners = [];
this.getReceive_bytesonreadListeners = function() {
return receive_bytesOnreadListeners;
};
const receive_bytesOnIOStreamListeners = [];
this.getReceive_bytesonIOStreamListeners = function() {
return receive_bytesOnIOStreamListeners;
};
//ThingML-defined functions
function receive(SerialJS_receive_byte__var) {
if(_this.SerialJS_buffer__var[0]
 === 0x13 && SerialJS_receive_byte__var === 0x12 || _this.SerialJS_buffer__var[0]
 === 0x12) {
if( !((SerialJS_receive_byte__var === 0x13)) || _this.SerialJS_buffer__var[_this.SerialJS_index__var - 1]
 === 0x7D) {
SerialJS_buffer__var[_this.SerialJS_index__var] = SerialJS_receive_byte__var;
_this.SerialJS_index__var = _this.SerialJS_index__var + 1;

}
if(SerialJS_receive_byte__var === 0x13 &&  !((_this.SerialJS_buffer__var[_this.SerialJS_index__var - 1]
 === 0x7D))) {
process.nextTick(sendReceive_bytesOnRead.bind(_this, _this.SerialJS_buffer__var.slice()));
_this.SerialJS_index__var = 0;
var i__var = 0;

while(i__var < 18) {
SerialJS_buffer__var[i__var] = 0x13;
i__var = i__var + 1;

}

}

}
}

this.receive = function(SerialJS_receive_byte__var) {
receive(SerialJS_receive_byte__var);};

function initSerial() {
var i__var = 0;

while(i__var < 18) {
SerialJS_buffer__var[i__var] = 0x13;
i__var = i__var + 1;

}
_this.SerialJS_serialP__var = new _this.SerialJS_lib__var.SerialPort(_this.SerialJS_serialPort__var, {baudrate: 9600,   parser: _this.SerialJS_lib__var.parsers.byteLength(1)}, false);;
_this.SerialJS_serialP__var.open(function (error) {
if (error){
console.log("ERROR: " + ("Problem opening the serial port... It might work, though most likely not :-)"));
console.log(error);
console.log("ERROR: " + ("Available serial ports:"));
_this.SerialJS_lib__var.list(function (err, ports) {
            ports.forEach(function(port) {
                console.log(port.comName);                
            });
        });
}else{
_this.SerialJS_serialP__var.on('data', function(data) {
receive(data[0]);
});
console.log(("Serial port opened sucessfully!"));
}})
}

this.initSerial = function() {
initSerial();};

function killSerial() {
_this.SerialJS_serialP__var.close(function (error) {
if (error){
console.log("ERROR: " + ("Problem closing the serial port..."));
console.log(error);
}else
console.log(("serial port closed!"));
});
}

this.killSerial = function() {
killSerial();};

//Internal functions
function sendReceive_bytesOnRead(b) {
//notify listeners
const arrayLength = receive_bytesOnreadListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
receive_bytesOnreadListeners[_i](b);
}
}

function sendReceive_bytesOnIOStream(b) {
//notify listeners
const arrayLength = receive_bytesOnIOStreamListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
receive_bytesOnIOStreamListeners[_i](b);
}
}

//State machine (states and regions)
this.build = function() {
this.SerialJS_behavior = new StateJS.StateMachine("behavior").entry(function () {
initSerial();
console.log(("Serial port ready!"));
})

.exit(function () {
killSerial();
console.log(("Serial port killed, RIP!"));
})

;
this._initial_SerialJS_behavior = new StateJS.PseudoState("_initial", this.SerialJS_behavior, StateJS.PseudoStateKind.Initial);
var SerialJS_behavior_default = new StateJS.State("default", this.SerialJS_behavior);
this._initial_SerialJS_behavior.to(SerialJS_behavior_default);
SerialJS_behavior_default.to(null).when(function (message) { v_b = message[2];return message[0] === "write" && message[1] === "write_bytes";}).effect(function (message) {
 v_b = message[2];_this.SerialJS_serialP__var.write(v_b, function(err, results) {
});
});
}
}
//Public API for lifecycle management
SerialJS.prototype._stop = function() {
this.SerialJS_behavior.beginExit(this._initial_SerialJS_behavior );
};

//Public API for third parties
SerialJS.prototype._init = function() {
this.behavior_instance = new StateJS.StateMachineInstance("behavior_instance");
StateJS.initialise( this.SerialJS_behavior, this.behavior_instance );
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.SerialJS_behavior, this.behavior_instance, msg);
msg = this.getQueue().shift();
}
this.ready = true;
};

SerialJS.prototype._receive = function() {
this.getQueue().push(arguments);
if (this.ready) {
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.SerialJS_behavior, this.behavior_instance, msg);
msg = this.getQueue().shift();
}
}
};
SerialJS.prototype.receivewrite_bytesOnwrite = function(b) {
this._receive("write", "write_bytes", b);
};

SerialJS.prototype.receivewrite_bytesOnIOStream = function(b) {
this._receive("IOStream", "write_bytes", b);
};

SerialJS.prototype.getName = function() {
return "SerialJS";
};

module.exports = SerialJS;
