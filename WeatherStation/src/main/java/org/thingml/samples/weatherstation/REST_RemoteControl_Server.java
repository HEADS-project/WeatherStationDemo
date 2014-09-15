package org.thingml.samples.weatherstation;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/RemoteControl")
public class REST_RemoteControl_Server {


    @GET @Path("/display")
    @Produces(MediaType.TEXT_PLAIN)
    public Response display() {
         return Response.ok() //200
                .entity(WeatherStationSimulator.getInstance().getDisplayString())
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }

    @PUT @Path("/changeDisplay")
    @Produces(MediaType.TEXT_PLAIN)
   // @Consumes(MediaType.TEXT_PLAIN)
    public Response changeDisplay() {
        WeatherStationSimulator.getInstance().RemoteControl_changeDisplay();
        System.out.println("Got changeDisplay");
        return Response.ok() //200
                .entity("OK")
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }

}
