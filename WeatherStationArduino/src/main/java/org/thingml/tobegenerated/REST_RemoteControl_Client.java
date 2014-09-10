package org.thingml.tobegenerated;

import org.thingml.generated.api.IWeatherStation_RemoteControlIn;
import org.thingml.generated.api.IWeatherStation_guiClient;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

/**
 * Created by ffl on 09.09.14.
 */
public class REST_RemoteControl_Client implements IWeatherStation_guiClient {

    private WebTarget target;
    private String last_response;

    public String getLastResponse() {
        return last_response;
    }

    public REST_RemoteControl_Client() {
        setTargetURI(Main.TEST_URI);
    }

    public void setTargetURI(String uri) {
        Client c = ClientBuilder.newClient();
        target = c.target(uri);
    }

    public String getTargetURI() {
        return target.getUri().toString();
    }

    @Override
    public void temperature_from_gui(short RemoteMonitoringMsgs_temperature_temp__var) {
        try {
            last_response = target.path("temperature").request().put(Entity.entity("" + RemoteMonitoringMsgs_temperature_temp__var, MediaType.TEXT_PLAIN_TYPE)).toString();
        }
        catch(Exception e) {
            last_response = "Exception : " + e.getMessage();
        }
    }

    @Override
    public void light_from_gui(short RemoteMonitoringMsgs_light_light__var) {
        try {
            last_response = target.path("light").request().put(Entity.entity("" + RemoteMonitoringMsgs_light_light__var, MediaType.TEXT_PLAIN_TYPE)).toString();
        }
        catch(Exception e) {
            last_response = "Exception : " + e.getMessage();
        }
    }
}
