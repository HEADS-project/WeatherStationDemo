var AbstractComponent = require('kevoree-entities').AbstractComponent;
var WeatherStation = require('./WeatherStation');
var TimerJS = require('./TimerJS');
/**
* Kevoree component
* @type {KWeatherNodeJS}
*/
var KWeatherNodeJS = AbstractComponent.extend({
toString: 'KWeatherNodeJS',
construct: function() {
this.KWeatherNodeJS_app = new WeatherStation();
this.KWeatherNodeJS_app.setThis(this.KWeatherNodeJS_app);
this.KWeatherNodeJS_app.build();
this.KWeatherNodeJS_timer = new TimerJS();
this.KWeatherNodeJS_timer.setThis(this.KWeatherNodeJS_timer);
this.KWeatherNodeJS_timer.build();
this.KWeatherNodeJS_timer.getTimer_timeoutontimerListeners().push(this.KWeatherNodeJS_app.receivetimer_timeoutOntimer.bind(this.KWeatherNodeJS_app));
this.KWeatherNodeJS_app.getTimer_startontimerListeners().push(this.KWeatherNodeJS_timer.receivetimer_startOntimer.bind(this.KWeatherNodeJS_timer));
this.KWeatherNodeJS_app.getTimer_cancelontimerListeners().push(this.KWeatherNodeJS_timer.receivetimer_cancelOntimer.bind(this.KWeatherNodeJS_timer));
this.KWeatherNodeJS_app.getTemponguiListeners().push(this.KWe_gui_temp_proxy.bind(this));
this.KWeatherNodeJS_app.getLuxonguiListeners().push(this.KWe_gui_lux_proxy.bind(this));
this.KWeatherNodeJS_app.getChangeDisplayonRemoteControlOutListeners().push(this.KWe_Rem_changeDisplay_proxy.bind(this));
},

start: function (done) {
this.KWeatherNodeJS_app._init();
this.KWeatherNodeJS_timer._init();
done();
},

stop: function (done) {
this.KWeatherNodeJS_app._stop();
this.KWeatherNodeJS_timer._stop();
done();
},
in_KWe_Rem_temp_in: function (msg) {
this.KWeatherNodeJS_app.receivetempOnRemoteControlIn(msg.split(';'));
},
in_KWe_Rem_lux_in: function (msg) {
this.KWeatherNodeJS_app.receiveluxOnRemoteControlIn(msg.split(';'));
},
in_KWe_gui_changeDisplay_in: function (msg) {
this.KWeatherNodeJS_app.receivechangeDisplayOngui(msg.split(';'));
},
KWe_gui_temp_proxy: function() {this.out_KWe_gui_temp_out(arguments[0]);},
out_KWe_gui_temp_out: function(msg) {/* This will be overwritten @runtime by Kevoree JS */},
KWe_gui_lux_proxy: function() {this.out_KWe_gui_lux_out(arguments[0]);},
out_KWe_gui_lux_out: function(msg) {/* This will be overwritten @runtime by Kevoree JS */},
KWe_Rem_changeDisplay_proxy: function() {this.out_KWe_Rem_changeDisplay_out();},
out_KWe_Rem_changeDisplay_out: function(msg) {/* This will be overwritten @runtime by Kevoree JS */}});

module.exports = KWeatherNodeJS;
