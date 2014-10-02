package org.thingml.tobegenerated;

import org.dna.mqtt.moquette.server.Server;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.thingml.generated.MessageDeserializer;
import org.thingml.generated.MessageSerializer;
import org.thingml.generated.SerialJava;
import org.thingml.generated.WeatherStation;
import org.thingml.generated.gui.WeatherStationGUIMock;
import org.thingml.java.Connector;

import java.io.IOException;
import java.net.URI;
import java.net.UnknownHostException;

/**
 * Main class.
 *
 */
public class Main {
    // Base URI the Grizzly HTTP server will listen on
    public static final String BASE_URI = "http://localhost:8090/WeatherStation/";
    public static final String TEST_URI = "http://localhost:8090/WeatherStation/M2MMock/";

    /**
     * Main method.
     * @param args
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException {



        //ThingML conf
        // Things
        final WeatherStation WeatherStation_JavaWeatherNode_app = (WeatherStation) new WeatherStation().buildBehavior();     //hacked
        final SerialJava SerialJava_JavaWeatherNode_serial = (SerialJava) new SerialJava(
                "JavaWeatherNode_serial: SerialJava", (String) "COM13",
                (org.thingml.comm.rxtx.Serial4ThingML) null).buildBehavior();
        final byte[] JavaWeatherNode_serializer_buffer_array = new byte[16];
        final MessageSerializer MessageSerializer_JavaWeatherNode_serializer = (MessageSerializer) new MessageSerializer(
                "JavaWeatherNode_serializer: MessageSerializer", (byte) 2,
                (byte) 8, (byte) 2, (short) 16, (byte) 0x12, (byte) 0x13,
                (byte) 0x7D, (int) 3, (int) 4, (int) 5,
                JavaWeatherNode_serializer_buffer_array, (int) 0)
                .buildBehavior();
        final byte[] JavaWeatherNode_deserializer_buffer_array = new byte[16];
        final MessageDeserializer MessageDeserializer_JavaWeatherNode_deserializer = (MessageDeserializer) new MessageDeserializer(
                "JavaWeatherNode_deserializer: MessageDeserializer", (byte) 2,
                (byte) 8, (byte) 2, (short) 16, (byte) 0x12, (byte) 0x13,
                (byte) 0x7D, (int) 3, (int) 4, (int) 5,
                JavaWeatherNode_deserializer_buffer_array, (int) 0)
                .buildBehavior();
        final WeatherStationGUIMock WeatherStationGUI_JavaWeatherNode_gui = new WeatherStationGUIMock(
                "WeatherStationGUI_JavaWeatherNode_gui");
        // Connectors
		/* final Connector c_206313561 = */new Connector(
                MessageSerializer_JavaWeatherNode_serializer.getOut_port(),
                SerialJava_JavaWeatherNode_serial.getIOStream_port(),
                MessageSerializer_JavaWeatherNode_serializer,
                SerialJava_JavaWeatherNode_serial);
		/* final Connector c_1026239926 = */new Connector(
                WeatherStation_JavaWeatherNode_app.getGui_port(),
                WeatherStationGUI_JavaWeatherNode_gui.getGui_port(),
                WeatherStation_JavaWeatherNode_app,
                WeatherStationGUI_JavaWeatherNode_gui);
		/* final Connector c_1473413469 = */new Connector(
                MessageSerializer_JavaWeatherNode_serializer
                        .getRemoteControl_port(),
                WeatherStation_JavaWeatherNode_app.getRemoteControlOut_port(),
                MessageSerializer_JavaWeatherNode_serializer,
                WeatherStation_JavaWeatherNode_app);
		/* final Connector c_480095317 = */new Connector(
                MessageDeserializer_JavaWeatherNode_deserializer.getIn_port(),
                SerialJava_JavaWeatherNode_serial.getIOStream_port(),
                MessageDeserializer_JavaWeatherNode_deserializer,
                SerialJava_JavaWeatherNode_serial);
		/* final Connector c_865931040 = */new Connector(
                MessageDeserializer_JavaWeatherNode_deserializer
                        .getRemoteControl_port(),
                WeatherStation_JavaWeatherNode_app.getRemoteControlIn_port(),
                MessageDeserializer_JavaWeatherNode_deserializer,
                WeatherStation_JavaWeatherNode_app);
        // Starting Things
        SerialJava_JavaWeatherNode_serial.start();
        WeatherStation_JavaWeatherNode_app.start();
        WeatherStationGUI_JavaWeatherNode_gui.start();
        MessageSerializer_JavaWeatherNode_serializer.start();
        MessageDeserializer_JavaWeatherNode_deserializer.start();
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                System.out.println("Terminating ThingML app...");
                MessageSerializer_JavaWeatherNode_serializer.stop();
                SerialJava_JavaWeatherNode_serial.stop();
                WeatherStation_JavaWeatherNode_app.stop();
                WeatherStationGUI_JavaWeatherNode_gui.stop();
                MessageDeserializer_JavaWeatherNode_deserializer.stop();
                System.out.println("ThingML app terminated. RIP!");
            }
        });
        //end ThingML conf


        //final HttpServer server = startServer();
        // create a resource config that scans for JAX-RS resources and providers
        // in org.thingml package
        final ResourceConfig rc = new ResourceConfig();//.packages("org.thingml.tobegenerated");
        rc.register(new REST_RemoteControl_Server(WeatherStation_JavaWeatherNode_app));
        rc.register(new REST_M2M_Mock());

        // create and start a new instance of grizzly http server
        // exposing the Jersey application at BASE_URI
        final HttpServer server = GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);

        System.out.println(String.format("Jersey app started with WADL available at "
                + "%sapplication.wadl\nHit CTRL+C to stop it...", BASE_URI));

        REST_RemoteControl_Client httpclient = new REST_RemoteControl_Client();
        WeatherStation_JavaWeatherNode_app.registerOnGui(httpclient);


        try {
            final WebSocket_UI ui = new WebSocket_UI(8081, WeatherStation_JavaWeatherNode_app);
            ui.start();
            WeatherStation_JavaWeatherNode_app.registerOnGui(ui);
            Runtime.getRuntime().addShutdownHook(new Thread() {
                public void run() {
                    try {
                        ui.stop();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            });
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

        final Server mqttServer = new Server(); //it seems moquette starts something on 8080...
        mqttServer.startServer();
        System.out.println("MQTT Server started");
        //Bind  a shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                mqttServer.stopServer();
            }
        });

        final MQTT_RemoteControl_Client mqqtClient = new MQTT_RemoteControl_Client(WeatherStation_JavaWeatherNode_app);
        WeatherStation_JavaWeatherNode_app.registerOnGui(mqqtClient);
        //mqqtClient.sendChangeDisplay();
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                mqqtClient.stop();
            }
        });

        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                server.shutdownNow();
            }
        });

    }
}

