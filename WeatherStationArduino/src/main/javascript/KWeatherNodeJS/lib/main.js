var TimerJS = require('./TimerJS');
var WeatherStation = require('./WeatherStation');
var KWeatherNodeJS_timer = new TimerJS();
KWeatherNodeJS_timer.setThis(KWeatherNodeJS_timer);
KWeatherNodeJS_timer.build();
var KWeatherNodeJS_app = new WeatherStation();
KWeatherNodeJS_app.setThis(KWeatherNodeJS_app);
KWeatherNodeJS_app.build();
KWeatherNodeJS_timer.getTimer_timeoutontimerListeners().push(KWeatherNodeJS_app.receivetimer_timeoutOntimer.bind(KWeatherNodeJS_app));
KWeatherNodeJS_app.getTimer_startontimerListeners().push(KWeatherNodeJS_timer.receivetimer_startOntimer.bind(KWeatherNodeJS_timer));
KWeatherNodeJS_app.getTimer_cancelontimerListeners().push(KWeatherNodeJS_timer.receivetimer_cancelOntimer.bind(KWeatherNodeJS_timer));
KWeatherNodeJS_app._init();
KWeatherNodeJS_timer._init();
//terminate all things on SIGINT (e.g. CTRL+C)
process.on('SIGINT', function() {
console.log("Stopping components... CTRL+D to force shutdown");
KWeatherNodeJS_timer._stop();
KWeatherNodeJS_app._stop();
});

