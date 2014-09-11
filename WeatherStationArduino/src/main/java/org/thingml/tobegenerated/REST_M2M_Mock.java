package org.thingml.tobegenerated;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/M2MMock")
public class REST_M2M_Mock {

    @GET @Path("/temperature")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GETTemperature() {
        /*System.out.println("DEBUG GET temperature : " + Helper.temperature);
        return "{\"temperature\":" + Helper.temperature + "}";*/

        //CORS support (even needed for localhost)
        return Response.ok() //200
                .entity("{\"temperature\":" + Helper.temperature + "}")
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }

    @GET @Path("/light")
    @Produces(MediaType.APPLICATION_JSON)
    public Response GETLight() {
        /*System.out.println("DEBUG GET light : " + Helper.light);
        return "{\"light\":" + Helper.light + "}";*/

        //CORS support (even needed for localhost)
        return Response.ok() //200
                .entity("{\"light\":" + Helper.light + "}")
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }

    @PUT @Path("/temperature")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public String temperature(String message) {
        Helper.temperature = Float.parseFloat(message);
        System.out.println("Got temperature : " + Helper.temperature);
        return "OK temperature:"+message;
    }

    @PUT @Path("/light")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public String light(String message) {
        Helper.light = Float.parseFloat(message);
        System.out.println("Got light : " + Helper.light);
        return "OK light:"+message;
    }

}
