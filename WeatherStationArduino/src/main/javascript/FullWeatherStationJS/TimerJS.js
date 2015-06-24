var StateJS = require('state.js');

/**
 * Definition for type : TimerJS
 **/
function TimerJS() {

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
const timer_timeoutOntimerListeners = [];
this.getTimer_timeoutontimerListeners = function() {
return timer_timeoutOntimerListeners;
};
//ThingML-defined functions
function cancel() {
clearTimeout(this.timer);
}

this.cancel = function() {
cancel();};

function start(TimerJS_start_delay__var) {
this.timer = setTimeout(onTimeout,TimerJS_start_delay__var);
}

this.start = function(TimerJS_start_delay__var) {
start(TimerJS_start_delay__var);};

function onTimeout() {
process.nextTick(sendTimer_timeoutOnTimer.bind(_this));
}

this.onTimeout = function() {
onTimeout();};

//Internal functions
function sendTimer_timeoutOnTimer() {
//notify listeners
const arrayLength = timer_timeoutOntimerListeners.length;
for (var _i = 0; _i < arrayLength; _i++) {
timer_timeoutOntimerListeners[_i]();
}
}

//State machine (states and regions)
this.build = function() {
this.TimerJS_SoftTimer = new StateJS.StateMachine("SoftTimer");
this._initial_TimerJS_SoftTimer = new StateJS.PseudoState("_initial", this.TimerJS_SoftTimer, StateJS.PseudoStateKind.Initial);
var TimerJS_SoftTimer_default = new StateJS.State("default", this.TimerJS_SoftTimer);
this._initial_TimerJS_SoftTimer.to(TimerJS_SoftTimer_default);
TimerJS_SoftTimer_default.to(null).when(function (message) {return message[0] === "timer" && message[1] === "timer_cancel";}).effect(function (message) {
cancel();
});
TimerJS_SoftTimer_default.to(null).when(function (message) { v_delay = message[2];return message[0] === "timer" && message[1] === "timer_start" && v_delay > 0;}).effect(function (message) {
 v_delay = message[2];start(v_delay);
});
}
}
//Public API for lifecycle management
TimerJS.prototype._stop = function() {
this.TimerJS_SoftTimer.beginExit(this._initial_TimerJS_SoftTimer );
};

//Public API for third parties
TimerJS.prototype._init = function() {
this.SoftTimer_instance = new StateJS.StateMachineInstance("SoftTimer_instance");
StateJS.initialise( this.TimerJS_SoftTimer, this.SoftTimer_instance );
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.TimerJS_SoftTimer, this.SoftTimer_instance, msg);
msg = this.getQueue().shift();
}
this.ready = true;
};

TimerJS.prototype._receive = function() {
this.getQueue().push(arguments);
if (this.ready) {
var msg = this.getQueue().shift();
while(msg !== undefined) {
StateJS.evaluate(this.TimerJS_SoftTimer, this.SoftTimer_instance, msg);
msg = this.getQueue().shift();
}
}
};
TimerJS.prototype.receivetimer_startOntimer = function(delay) {
this._receive("timer", "timer_start", delay);
};

TimerJS.prototype.receivetimer_cancelOntimer = function() {
this._receive("timer", "timer_cancel");
};

TimerJS.prototype.getName = function() {
return "TimerJS";
};

module.exports = TimerJS;
