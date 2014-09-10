package org.thingml.samples.weatherstation;

import java.util.ArrayList;

/*
thing WeatherStation {
    provided port RemoteControl
    {
        sends temperature, light
        receives changeDisplay
    }

     provided port UI
    {
        sends updateDisplay, putRestData, putRestDataResponse, restURI
        receives changeDisplay, setRestURI, getRestURI
    }
}
*/
public abstract class WeatherStation {

    /**************************************************************************
    * IMPLEMENTATION FOR PORT REMOTE CONTROL (to be implemented over REST)
    ***************************************************************************/

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

    /**************************************************************************
     * IMPLEMENTATION FOR PORT UI (to be implemented with WebSocket)
     ***************************************************************************/

    // definition of the listeners for outgoing messages
    protected ArrayList<WeatherStation_UI_Listener> uiListeners =
            new ArrayList<WeatherStation_UI_Listener>();

    public void addUIListener(WeatherStation_UI_Listener listener){
        uiListeners.add(listener);
    }

    public void removUIListener(WeatherStation_UI_Listener listener){
        uiListeners.remove(listener);
    }


    protected void UI_updateDisplay(String disp)
    {
        for (WeatherStation_UI_Listener l : uiListeners) {
            l.UI_updateDisplay(disp);
        }
    }
    protected void UI_putRestData()
    {
        for (WeatherStation_UI_Listener l : uiListeners) {
            l.UI_putRestData();
        }
    }

    protected void UI_putRestDataResponse(String response)
    {
        for (WeatherStation_UI_Listener l : uiListeners) {
            l.UI_putRestDataResponse(response);
        }
    }
    protected void UI_restURI(String uri)
    {
        for (WeatherStation_UI_Listener l : uiListeners) {
            l.UI_restURI(uri);
        }
    }

    public abstract void  UI_changeDisplay();
    public abstract void  UI_setRestURI(String uri);
    public abstract void  UI_getRestURI();

}
