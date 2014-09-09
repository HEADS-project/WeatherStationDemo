package org.thingml.samples.weatherstation;

/**
 * sends temperature, light
*/
public interface WeatherStation_RemoteControl_Listener {

    public void RemoteControl_temperature(float temperature);
    public void RemoteControl_light(float light);
}
