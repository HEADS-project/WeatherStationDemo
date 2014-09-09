package org.thingml.samples.weatherstation;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/M2MMock")
public class REST_M2M_Mock {

    @PUT @Path("/temperature")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public String temperature(String message) {
        System.out.println("Got temperature : " + Float.parseFloat(message));
        return "OK temperature:"+message;
    }

    @PUT @Path("/light")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public String light(String message) {
        System.out.println("Got light : " + Float.parseFloat(message));
        return "OK light:"+message;
    }

}
