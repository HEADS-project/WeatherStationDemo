var StateJS = require('state.js');

/**
 * Definition for type : WeatherStation
 **/
function WeatherStation() {

var _this;
this.setThis = function(__this) {
_this = __this;
};

this.ready = false;
//Attributes
//message queue
const queue = [];
this.getQueue = function() {
return queue;
};

//callbacks for third-party listeners
const tempOnguiListeners = [];
this.getTemponguiListeners = function() {
return tempOnguiListeners;
};
const luxOnguiListeners = [];
this.getLuxonguiListeners = function() {
return luxOnguiListeners;
};
const changeDisplayOnRemoteControlOutListeners = [];
this.getChangeDisplayonRemoteControlOutListeners = function() {
return changeDisplayOnRemoteControlOutListeners;
};
const timer_startOntimerListeners = [];
this.getTimer_startontimerListeners = function() {
return timer_startOntimerListeners;
};
const timer_cancelOntimerListeners = [];
this.getTimer_cancelontimerListeners = function() {
return timer_cancelOntimerListeners;
};
//ThingML-defined functions
//Internal functions
function sendTempOnGui(temp) {
//notify listeners
const arrayLength = tempOnguiListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
tempOnguiListeners[_i](temp);
}
}

function sendLuxOnGui(lux) {
//notify listeners
const arrayLength = luxOnguiListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
luxOnguiListeners[_i](lux);
}
}

function sendChangeDisplayOnRemoteControlOut() {
//notify listeners
const arrayLength = changeDisplayOnRemoteControlOutListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
changeDisplayOnRemoteControlOutListeners[_i]();
}
}

function sendTimer_startOnTimer(delay) {
//notify listeners
const arrayLength = timer_startOntimerListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
timer_startOntimerListeners[_i](delay);
}
}

function sendTimer_cancelOnTimer() {
//notify listeners
const arrayLength = timer_cancelOntimerListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
timer_cancelOntimerListeners[_i]();
}
}

//State machine (states and regions)
this.build = function() {
this.WeatherStation_SensorsDisplayImpl = new StateJS.StateMachine("SensorsDisplayImpl").entry(function () {
console.log(("Weather station ready!"));
})

;
this._initial_WeatherStation_SensorsDisplayImpl = new StateJS.PseudoState("_initial", this.WeatherStation_SensorsDisplayImpl, StateJS.PseudoStateKind.Initial);
var WeatherStation_SensorsDisplayImpl_Process = new StateJS.State("Process", this.WeatherStation_SensorsDisplayImpl).entry(function () {
process.nextTick(sendTimer_startOnTimer.bind(_this, 3000));
})

;
this._initial_WeatherStation_SensorsDisplayImpl.to(WeatherStation_SensorsDisplayImpl_Process);
WeatherStation_SensorsDisplayImpl_Process.to(null).when(function (message) {return message[0] === "gui" && message[1] === "changeDisplay";}).effect(function (message) {
console.log(("Changing Display on Arduino"));
process.nextTick(sendChangeDisplayOnRemoteControlOut.bind(_this));
});
WeatherStation_SensorsDisplayImpl_Process.to(WeatherStation_SensorsDisplayImpl_Process).when(function (message) {return message[0] === "timer" && message[1] === "timer_timeout";}).effect(function (message) {
console.log(("Changing Display on Arduino"));
process.nextTick(sendChangeDisplayOnRemoteControlOut.bind(_this));
});
WeatherStation_SensorsDisplayImpl_Process.to(null).when(function (message) { v_temp = message[2];return message[0] === "RemoteControlIn" && message[1] === "temp";}).effect(function (message) {
 v_temp = message[2];console.log(("Temperature is: " + v_temp));
process.nextTick(sendTempOnGui.bind(_this, v_temp));
});
WeatherStation_SensorsDisplayImpl_Process.to(null).when(function (message) { v_lux = message[2];return message[0] === "RemoteControlIn" && message[1] === "lux";}).effect(function (message) {
 v_lux = message[2];console.log(("Light is: " + v_lux));
process.nextTick(sendLuxOnGui.bind(_this, v_lux));
});
}
}
//Public API for lifecycle management
WeatherStation.prototype._stop = function() {
this.ready = false;
};

//Public API for third parties
WeatherStation.prototype._init = function() {
this.SensorsDisplayImpl_instance = new StateJS.StateMachineInstance("SensorsDisplayImpl_instance");
StateJS.initialise( this.WeatherStation_SensorsDisplayImpl, this.SensorsDisplayImpl_instance );
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.WeatherStation_SensorsDisplayImpl, this.SensorsDisplayImpl_instance, msg);
msg = this.getQueue().shift();
}
this.ready = true;
};

WeatherStation.prototype._receive = function() {
this.getQueue().push(arguments);
if (this.ready) {
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.WeatherStation_SensorsDisplayImpl, this.SensorsDisplayImpl_instance, msg);
msg = this.getQueue().shift();
}
}
};
WeatherStation.prototype.receivetempOnRemoteControlIn = function(temp) {
this._receive("RemoteControlIn", "temp", temp);
};

WeatherStation.prototype.receiveluxOnRemoteControlIn = function(lux) {
this._receive("RemoteControlIn", "lux", lux);
};

WeatherStation.prototype.receivechangeDisplayOngui = function() {
this._receive("gui", "changeDisplay");
};

WeatherStation.prototype.receivetimer_timeoutOntimer = function() {
this._receive("timer", "timer_timeout");
};

WeatherStation.prototype.getName = function() {
return "WeatherStation";
};

module.exports = WeatherStation;
