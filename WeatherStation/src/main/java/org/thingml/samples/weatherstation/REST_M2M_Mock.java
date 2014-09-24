package org.thingml.samples.weatherstation;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/M2MMock")
public class REST_M2M_Mock {

    @PUT @Path("/temperature")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response temperature(String message) {
        System.out.println("Got temperature : " + Float.parseFloat(message));
        return Response.ok() //200
                .entity("{\"temperature\":" + message + "}")
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }

    @PUT @Path("/light")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response light(String message) {
        System.out.println("Got light : " + Float.parseFloat(message));
        return Response.ok() //200
                .entity("{\"light\":" + message + "}")
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }

}
