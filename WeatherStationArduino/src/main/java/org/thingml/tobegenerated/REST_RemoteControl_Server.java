package org.thingml.tobegenerated;

import org.thingml.generated.WeatherStation;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/RemoteControl")
public class REST_RemoteControl_Server {

    private WeatherStation weatherStation;

    public REST_RemoteControl_Server(WeatherStation thing) {
        weatherStation = thing;
    }

    @PUT @Path("/changeDisplay")
    @Produces(MediaType.TEXT_PLAIN)
   // @Consumes(MediaType.TEXT_PLAIN)
    public String changeDisplay() {
        weatherStation.changeDisplay_via_gui();
        System.out.println("Got changeDisplay");
        return "OK";
    }

}
