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

    public REST_RemoteControl_Client() {
        Client c = ClientBuilder.newClient();
        target = c.target(Main.M2M_URI);
    }

    public void RemoteControl_temperature(float temperature) {

        target.path("temperature").request().put(Entity.entity("" + temperature, MediaType.TEXT_PLAIN_TYPE));
    }
    public void RemoteControl_light(float light) {

        target.path("light").request().put(Entity.entity("" + light, MediaType.TEXT_PLAIN_TYPE));
    }
}
