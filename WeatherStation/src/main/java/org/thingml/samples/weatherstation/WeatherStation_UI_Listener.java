package org.thingml.samples.weatherstation;

/**
 *  sends updateDisplay, putRestData, putRestDataResponse, restURI
*/
public interface WeatherStation_UI_Listener {
    public void UI_updateDisplay(String disp);
    public void UI_putRestData();
    public void UI_putRestDataResponse(String response);
    public void UI_restURI(String uri);
}
