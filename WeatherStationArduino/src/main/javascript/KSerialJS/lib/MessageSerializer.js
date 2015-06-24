var StateJS = require('state.js');

/**
 * Definition for type : MessageSerializer
 **/
function MessageSerializer(PacketManager_lengthInteger__var, PacketManager_lengthString__var, PacketManager_lengthUInt16__var, PacketManager_MAX_PACKET_SIZE__var, PacketManager_START_BYTE__var, PacketManager_STOP_BYTE__var, PacketManager_ESCAPE_BYTE__var, PacketManager_CODE_POSITION__var, PacketManager_LENGTH_POSITION__var, PacketManager_DATA_POSITION__var, PacketManager_buffer__var, PacketManager_index__var) {

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
const write_bytesOnoutListeners = [];
this.getWrite_bytesonoutListeners = function() {
return write_bytesOnoutListeners;
};
//ThingML-defined functions
function serializeInteger(SerializerJS_serializeInteger_d__var) {

        var l = SerializerJS_serializeInteger_d__var;
        for ( var index = 0; index < 2; index ++ ) {
            var b = l & 0xff;
            storeByte(b)

            l = (l - b) / 256 ;
        }
        
}

this.serializeInteger = function(SerializerJS_serializeInteger_d__var) {
serializeInteger(SerializerJS_serializeInteger_d__var);};

function serializeUInt16(SerializerJS_serializeUInt16_d__var) {
serializeInteger(SerializerJS_serializeUInt16_d__var);
}

this.serializeUInt16 = function(SerializerJS_serializeUInt16_d__var) {
serializeUInt16(SerializerJS_serializeUInt16_d__var);};

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

//Internal functions
function sendWrite_bytesOnOut(b) {
//notify listeners
const arrayLength = write_bytesOnoutListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
write_bytesOnoutListeners[_i](b);
}
}

//State machine (states and regions)
this.build = function() {
this.MessageSerializer_SerializerBehavior = new StateJS.StateMachine("SerializerBehavior").entry(function () {
})

;
this._initial_MessageSerializer_SerializerBehavior = new StateJS.PseudoState("_initial", this.MessageSerializer_SerializerBehavior, StateJS.PseudoStateKind.Initial);
var MessageSerializer_SerializerBehavior_Serialize = new StateJS.State("Serialize", this.MessageSerializer_SerializerBehavior);
this._initial_MessageSerializer_SerializerBehavior.to(MessageSerializer_SerializerBehavior_Serialize);
MessageSerializer_SerializerBehavior_Serialize.to(null).when(function (message) {return message[0] === "RemoteControl" && message[1] === "changeDisplay";}).effect(function (message) {
setHeader(20, 0);
send();
});
}
}
//Public API for lifecycle management
MessageSerializer.prototype._stop = function() {
this.ready = false;
};

//Public API for third parties
MessageSerializer.prototype._init = function() {
this.SerializerBehavior_instance = new StateJS.StateMachineInstance("SerializerBehavior_instance");
StateJS.initialise( this.MessageSerializer_SerializerBehavior, this.SerializerBehavior_instance );
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.MessageSerializer_SerializerBehavior, this.SerializerBehavior_instance, msg);
msg = this.getQueue().shift();
}
this.ready = true;
};

MessageSerializer.prototype._receive = function() {
this.getQueue().push(arguments);
if (this.ready) {
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.MessageSerializer_SerializerBehavior, this.SerializerBehavior_instance, msg);
msg = this.getQueue().shift();
}
}
};
MessageSerializer.prototype.receivechangeDisplayOnRemoteControl = function() {
this._receive("RemoteControl", "changeDisplay");
};

MessageSerializer.prototype.getName = function() {
return "MessageSerializer";
};

module.exports = MessageSerializer;
