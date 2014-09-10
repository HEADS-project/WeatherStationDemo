package org.thingml.tobegenerated;

import org.thingml.generated.WeatherStation;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/RemoteControl")
public class REST_RemoteControl_Server {

    WeatherStation ws;

    public REST_RemoteControl_Server(WeatherStation ws) {
        this.ws = ws;
    }

/*    @GET @Path("/display")
    @Produces(MediaType.TEXT_PLAIN)
    public String display() {
        return WeatherStationSimulator.getInstance().getDisplayString();
    }
*/

    @PUT @Path("/changeDisplay")
    @Produces(MediaType.TEXT_PLAIN)
   // @Consumes(MediaType.TEXT_PLAIN)
    public String changeDisplay() {
        ws.changeDisplay_via_gui();
        System.out.println("Got changeDisplay");
        return "OK";
    }

}
