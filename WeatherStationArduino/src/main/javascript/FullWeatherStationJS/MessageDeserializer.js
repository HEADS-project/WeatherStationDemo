var StateJS = require('state.js');

/**
 * Definition for type : MessageDeserializer
 **/
function MessageDeserializer(PacketManager_lengthInteger__var, PacketManager_lengthString__var, PacketManager_lengthUInt16__var, PacketManager_MAX_PACKET_SIZE__var, PacketManager_START_BYTE__var, PacketManager_STOP_BYTE__var, PacketManager_ESCAPE_BYTE__var, PacketManager_CODE_POSITION__var, PacketManager_LENGTH_POSITION__var, PacketManager_DATA_POSITION__var, PacketManager_buffer__var, PacketManager_index__var) {

var _this;
this.setThis = function(__this) {
_this = __this;
};

this.ready = false;
//Attributes
this.PacketManager_lengthInteger__var = PacketManager_lengthInteger__var;
this.PacketManager_lengthString__var = PacketManager_lengthString__var;
this.PacketManager_lengthUInt16__var = PacketManager_lengthUInt16__var;
this.PacketManager_MAX_PACKET_SIZE__var = PacketManager_MAX_PACKET_SIZE__var;
this.PacketManager_START_BYTE__var = PacketManager_START_BYTE__var;
this.PacketManager_STOP_BYTE__var = PacketManager_STOP_BYTE__var;
this.PacketManager_ESCAPE_BYTE__var = PacketManager_ESCAPE_BYTE__var;
this.PacketManager_CODE_POSITION__var = PacketManager_CODE_POSITION__var;
this.PacketManager_LENGTH_POSITION__var = PacketManager_LENGTH_POSITION__var;
this.PacketManager_DATA_POSITION__var = PacketManager_DATA_POSITION__var;
this.PacketManager_buffer__var = PacketManager_buffer__var;
this.PacketManager_index__var = PacketManager_index__var;
//message queue
const queue = [];
this.getQueue = function() {
return queue;
};

//callbacks for third-party listeners
const tempOnRemoteControlListeners = [];
this.getTemponRemoteControlListeners = function() {
return tempOnRemoteControlListeners;
};
const luxOnRemoteControlListeners = [];
this.getLuxonRemoteControlListeners = function() {
return luxOnRemoteControlListeners;
};
const write_bytesOnoutListeners = [];
this.getWrite_bytesonoutListeners = function() {
return write_bytesOnoutListeners;
};
//ThingML-defined functions
function forward() {
_this.PacketManager_index__var = _this.PacketManager_DATA_POSITION__var;
const code__var = _this.PacketManager_buffer__var[_this.PacketManager_CODE_POSITION__var]
;

if(code__var === 10) {
deserializeRemote_temperature();

}
if(code__var === 11) {
deserializeRemote_light();

}
}

this.forward = function() {
forward();};

function deserializeRemote_temperature() {
const t__var = deserializeUInt16()
;

process.nextTick(sendTempOnRemoteControl.bind(_this, t__var));
}

this.deserializeRemote_temperature = function() {
deserializeRemote_temperature();};

function deserializeRemote_light() {
const t__var = deserializeUInt16()
;

process.nextTick(sendLuxOnRemoteControl.bind(_this, t__var));
}

this.deserializeRemote_light = function() {
deserializeRemote_light();};

function deserializeInteger() {

        var value = 0;
        for ( var i = 1; i >= 0; i--) {
            value = (value * 256) + readByte()
;
        }
        return value;        
        
}

this.deserializeInteger = function() {
deserializeInteger();};

function deserializeUInt16() {
return deserializeInteger()
;
}

this.deserializeUInt16 = function() {
deserializeUInt16();};

function receive(ArrayDeserializer_receive_bytes__var) {
_this.PacketManager_index__var = 0;
var size__var = _this.PacketManager_DATA_POSITION__var + ArrayDeserializer_receive_bytes__var[_this.PacketManager_LENGTH_POSITION__var + 1]
 + 1;

var i__var = 0;

var current__var = ArrayDeserializer_receive_bytes__var[i__var]
;

if(current__var === _this.PacketManager_START_BYTE__var) {
i__var = i__var + 1;
var next__var = ArrayDeserializer_receive_bytes__var[i__var]
;

if( !((next__var === _this.PacketManager_STOP_BYTE__var))) {
var continue__var = true;

while(continue__var && i__var < size__var) {
current__var = next__var;
i__var = i__var + 1;
next__var = ArrayDeserializer_receive_bytes__var[i__var]
;
if(current__var === _this.PacketManager_ESCAPE_BYTE__var) {
current__var = next__var;
i__var = i__var + 1;
size__var = size__var + 1;
next__var = ArrayDeserializer_receive_bytes__var[i__var]
;

}
storeByte(current__var);
continue__var =  !((next__var === _this.PacketManager_STOP_BYTE__var &&  !((current__var === _this.PacketManager_ESCAPE_BYTE__var))));

}
storeByte(current__var);
forward();

}

}
}

this.receive = function(ArrayDeserializer_receive_bytes__var) {
receive(ArrayDeserializer_receive_bytes__var);};

function setHeader(PacketManager_setHeader_code__var, PacketManager_setHeader_length__var) {
_this.PacketManager_index__var = 0;
storeByte(1);
storeByte(0);
storeByte(0);
_this.PacketManager_CODE_POSITION__var = _this.PacketManager_index__var;
storeByte(PacketManager_setHeader_code__var);
_this.PacketManager_LENGTH_POSITION__var = _this.PacketManager_index__var;
storeByte(PacketManager_setHeader_length__var);
_this.PacketManager_DATA_POSITION__var = _this.PacketManager_index__var;
_this.PacketManager_index__var = _this.PacketManager_DATA_POSITION__var;
}

this.setHeader = function(PacketManager_setHeader_code__var, PacketManager_setHeader_length__var) {
setHeader(PacketManager_setHeader_code__var, PacketManager_setHeader_length__var);};

function storeByte(PacketManager_storeByte_b__var) {
if(_this.PacketManager_index__var === _this.PacketManager_MAX_PACKET_SIZE__var) {
console.log("ERROR: " + ("BUFFER OVERFLOW: " + PacketManager_storeByte_b__var + " has been ignored. Current index = " + _this.PacketManager_index__var));

}
if(_this.PacketManager_index__var < _this.PacketManager_MAX_PACKET_SIZE__var) {
PacketManager_buffer__var[_this.PacketManager_index__var] = PacketManager_storeByte_b__var;
_this.PacketManager_index__var = _this.PacketManager_index__var + 1;

}
}

this.storeByte = function(PacketManager_storeByte_b__var) {
storeByte(PacketManager_storeByte_b__var);};

function readByte() {
var b__var;

if(_this.PacketManager_index__var < _this.PacketManager_MAX_PACKET_SIZE__var) {
b__var = _this.PacketManager_buffer__var[_this.PacketManager_index__var]
;
_this.PacketManager_index__var = _this.PacketManager_index__var + 1;

}
if(_this.PacketManager_index__var === _this.PacketManager_MAX_PACKET_SIZE__var) {
console.log("ERROR: " + ("BUFFER OVERFLOW: trying to read out of buffer boundaries"));
b__var = _this.PacketManager_STOP_BYTE__var;

}
return b__var;
}

this.readByte = function() {
readByte();};

function escape() {
var escaped__var = [];

const stop__var = _this.PacketManager_DATA_POSITION__var + _this.PacketManager_buffer__var[_this.PacketManager_LENGTH_POSITION__var]
;

var i__var = 0;

var j__var = 0;

escaped__var[j__var] = _this.PacketManager_START_BYTE__var;
j__var = j__var + 1;
var current__var;

while(i__var < stop__var) {
current__var = _this.PacketManager_buffer__var[i__var]
;
if(current__var === _this.PacketManager_START_BYTE__var || current__var === _this.PacketManager_STOP_BYTE__var || current__var === _this.PacketManager_ESCAPE_BYTE__var) {
escaped__var[j__var] = _this.PacketManager_ESCAPE_BYTE__var;
j__var = j__var + 1;

}
escaped__var[j__var] = current__var;
j__var = j__var + 1;
i__var = i__var + 1;

}
escaped__var[j__var] = _this.PacketManager_STOP_BYTE__var;
return escaped__var;
}

this.escape = function() {
escape();};

function send() {
process.nextTick(sendWrite_bytesOnOut.bind(_this, escape()
));
}

this.send = function() {
send();};

//Internal functions
function sendTempOnRemoteControl(temp) {
//notify listeners
const arrayLength = tempOnRemoteControlListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
tempOnRemoteControlListeners[_i](temp);
}
}

function sendLuxOnRemoteControl(lux) {
//notify listeners
const arrayLength = luxOnRemoteControlListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
luxOnRemoteControlListeners[_i](lux);
}
}

function sendWrite_bytesOnOut(b) {
//notify listeners
const arrayLength = write_bytesOnoutListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
write_bytesOnoutListeners[_i](b);
}
}

//State machine (states and regions)
this.build = function() {
this.MessageDeserializer_receive = new StateJS.StateMachine("receive").entry(function () {
})

;
this._initial_MessageDeserializer_receive = new StateJS.PseudoState("_initial", this.MessageDeserializer_receive, StateJS.PseudoStateKind.Initial);
var MessageDeserializer_receive_Idle = new StateJS.State("Idle", this.MessageDeserializer_receive).entry(function () {
})

;
this._initial_MessageDeserializer_receive.to(MessageDeserializer_receive_Idle);
MessageDeserializer_receive_Idle.to(null).when(function (message) { v_b = message[2];return message[0] === "in" && message[1] === "receive_bytes";}).effect(function (message) {
 v_b = message[2];receive(v_b);
});
}
}
//Public API for lifecycle management
MessageDeserializer.prototype._stop = function() {
this.MessageDeserializer_receive.beginExit(this._initial_MessageDeserializer_receive );
};

//Public API for third parties
MessageDeserializer.prototype._init = function() {
this.receive_instance = new StateJS.StateMachineInstance("receive_instance");
StateJS.initialise( this.MessageDeserializer_receive, this.receive_instance );
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.MessageDeserializer_receive, this.receive_instance, msg);
msg = this.getQueue().shift();
}
this.ready = true;
};

MessageDeserializer.prototype._receive = function() {
this.getQueue().push(arguments);
if (this.ready) {
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.MessageDeserializer_receive, this.receive_instance, msg);
msg = this.getQueue().shift();
}
}
};
MessageDeserializer.prototype.receivereceive_bytesOnin = function(b) {
this._receive("in", "receive_bytes", b);
};

MessageDeserializer.prototype.getName = function() {
return "MessageDeserializer";
};

module.exports = MessageDeserializer;
