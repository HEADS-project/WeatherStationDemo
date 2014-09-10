package org.thingml.samples.weatherstation;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

/**
 * Created by ffl on 09.09.14.
 */
public class REST_RemoteControl_Client implements WeatherStation_RemoteControl_Listener {

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

    public void RemoteControl_temperature(float temperature) {

        try {
            last_response = target.path("temperature").request().put(Entity.entity("" + temperature, MediaType.TEXT_PLAIN_TYPE)).toString();
        }
        catch(Exception e) {
            last_response = "Exception : " + e.getMessage();
        }
    }
    public void RemoteControl_light(float light) {

        try {
        last_response = target.path("light").request().put(Entity.entity("" + light, MediaType.TEXT_PLAIN_TYPE)).toString();
        }
        catch(Exception e) {
            last_response = "Exception : " + e.getMessage();
        }
    }
}
