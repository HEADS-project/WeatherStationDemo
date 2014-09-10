/**
 * File generated by the ThingML IDE
 * /!\Do not edit this file/!\
 * In case of a bug in the generated code,
 * please submit an issue on our GitHub
 **/

package org.thingml.generated;

import org.thingml.java.*;
import org.thingml.java.ext.*;

import org.thingml.generated.api.*;
import org.thingml.generated.messages.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Collections;
import java.util.List;

/**
 * Definition for type : WeatherStationGUI
 **/
public class WeatherStationGUI extends Component
		implements
			IWeatherStationGUI_gui {

	private List<IWeatherStationGUI_guiClient> gui_clients = new LinkedList<IWeatherStationGUI_guiClient>();
	public void registerOnGui(IWeatherStationGUI_guiClient client) {
		gui_clients.add(client);
	}

	public void unregisterFromGui(IWeatherStationGUI_guiClient client) {
		gui_clients.remove(client);
	}

	@Override
	public void temperature_via_gui(
			short RemoteMonitoringMsgs_temperature_temp__var) {
		receive(temperatureType.instantiate(gui_port,
				RemoteMonitoringMsgs_temperature_temp__var), gui_port);
	}

	@Override
	public void light_via_gui(short RemoteMonitoringMsgs_light_light__var) {
		receive(lightType.instantiate(gui_port,
				RemoteMonitoringMsgs_light_light__var), gui_port);
	}

	private void sendChangeDisplay_via_gui() {
		// ThingML send
		send(changeDisplayType.instantiate(gui_port), gui_port);
		// send to other clients
		for (IWeatherStationGUI_guiClient client : gui_clients) {
			client.changeDisplay_from_gui();
		}
	}

	// Attributes
	// Ports
	private Port gui_port;
	// Message types
	private final TemperatureMessageType temperatureType = new TemperatureMessageType();
	private final LightMessageType lightType = new LightMessageType();
	private final ChangeDisplayMessageType changeDisplayType = new ChangeDisplayMessageType();
	// Empty Constructor
	public WeatherStationGUI() {
		super(1);
	}

	// Constructor (all attributes)
	public WeatherStationGUI(String name) {
		super(name, 1);
	}

	// Getters and Setters for non readonly/final attributes
	// Getters for Ports
	public Port getGui_port() {
		return gui_port;
	}
	public Component buildBehavior() {
		// Init ports
		final List<EventType> inEvents_gui = new ArrayList<EventType>();
		final List<EventType> outEvents_gui = new ArrayList<EventType>();
		inEvents_gui.add(temperatureType);
		inEvents_gui.add(lightType);
		outEvents_gui.add(changeDisplayType);
		gui_port = new Port(PortType.PROVIDED, "gui", inEvents_gui,
				outEvents_gui, 0);
		// Init state machine
		return this;
	}

}
