package org.thingml.tobegenerated;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;
import org.thingml.generated.api.IWeatherStation_guiClient;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

public class REST_RemoteControl_Client implements IWeatherStation_guiClient {

    private WebTarget target;
    private String last_response;
    private String keyApi;
    private DateTimeFormatter fmt = ISODateTimeFormat.dateTime();

    public String getLastResponse() {
        return last_response;
    }

    public REST_RemoteControl_Client() {
        Properties prop = new Properties();
        String propFileName = "config.properties";

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
            if (inputStream == null) {
                System.err.println("Cannot open config.properties");
            } else {
                try {
                    prop.load(inputStream);
                    Main.TEST_URI = prop.getProperty("M2M");
                    keyApi = prop.getProperty("M2MapiKey");
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        setTargetURI(Main.TEST_URI);
    }

    public void setTargetURI(String uri) {
        Client c = ClientBuilder.newClient();
        target = c.target(uri);
    }

    public String getTargetURI() {
        return target.getUri().toString();
    }

    private String temperatureToJSON(short temp) {
        DateTime dt = new DateTime();
        StringBuilder builder = new StringBuilder();
        builder.append("{\n");
        builder.append("\"nedata\": {\n");
        builder.append("\"location\": { \"coordinates\": [10.711970,59.945274], \"description\": \"SINTEF Room 101\" }\n");
        builder.append("},\n");
        builder.append("\"name\":\"temp_std\",\n");
        builder.append("\"value\": " + temp + ",\n");
        builder.append("\"event_timestamp\":\"2014-10-20T10:10:00.452000Z\",\n");
        builder.append("\"event_id\":\"101\",\n");
        builder.append("\"source_id\":\"102\"\n");
        builder.append("}\n");
        System.out.println("HTTP: " + builder.toString());
        return builder.toString();
    }

    private String lightToJSON(short lux) {
        DateTime dt = new DateTime();
        StringBuilder builder = new StringBuilder();
        builder.append("{\n");
        builder.append("\"nedata\": {\n");
        builder.append("\"location\": { \"coordinates\": [10.711970,59.945274], \"description\": \"SINTEF Room 101\" }\n");
        builder.append("},\n");
        builder.append("\"name\":\"lux_std\",\n");
        builder.append("\"value\": " + lux + ",\n");
        builder.append("\"event_timestamp\":\"2014-10-20T10:10:00.452000Z\",\n");
        builder.append("\"event_id\":\"101\",\n");
        builder.append("\"source_id\":\"102\"\n");
        builder.append("}\n");
        System.out.println("HTTP: " + builder.toString());
        return builder.toString();
    }

    @Override
    public void temperature_from_gui(short RemoteMonitoringMsgs_temperature_temp__var) {
        try {
            last_response = target.path("/").queryParam("api_key", keyApi).request().post(Entity.entity(temperatureToJSON(RemoteMonitoringMsgs_temperature_temp__var), MediaType.APPLICATION_JSON)).toString();
        }
        catch(Exception e) {
            last_response = "Exception : " + e.getMessage();
        }
        System.out.println(last_response);
    }

    @Override
    public void light_from_gui(short RemoteMonitoringMsgs_light_light__var) {
        try {
            last_response = target.path("light").queryParam("api_key", keyApi).request().post(Entity.entity(lightToJSON(RemoteMonitoringMsgs_light_light__var), MediaType.APPLICATION_JSON)).toString();
        }
        catch(Exception e) {
            last_response = "Exception : " + e.getMessage();
        }
        System.out.println(last_response);
    }
}
