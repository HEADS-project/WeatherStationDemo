package org.thingml.samples.weatherstation;

import java.util.ArrayList;

/**
 * thing WeatherStation {
 *     provided port RemoteControl @sync_send "true"
         {
             sends temperature, light
             receives changeDisplay
         }
 }
 */
public abstract class WeatherStation {

    // definition of the listeners for outgoing messages
    protected ArrayList<WeatherStation_RemoteControl_Listener> remoteControlListeners =
            new ArrayList<WeatherStation_RemoteControl_Listener>();

    public void addRemoteControlListener(WeatherStation_RemoteControl_Listener listener){
        remoteControlListeners.add(listener);
    }

    public void removeRemoteControlListener(WeatherStation_RemoteControl_Listener listener){
        remoteControlListeners.remove(listener);
    }

    // Dispatch of the outgoing messages
    protected void RemoteControl_temperature(float temperature) {
        for (WeatherStation_RemoteControl_Listener l : remoteControlListeners) {
            l.RemoteControl_temperature(temperature);
        }
    }

    protected void RemoteControl_light(float light) {
        for (WeatherStation_RemoteControl_Listener l : remoteControlListeners) {
            l.RemoteControl_light(light);
        }
    }

    // Receive message RemoteControl_changeDisplay
    public abstract void  RemoteControl_changeDisplay();

}
