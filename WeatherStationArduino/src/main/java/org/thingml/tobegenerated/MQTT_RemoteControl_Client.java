package org.thingml.tobegenerated;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.thingml.generated.WeatherStation;
import org.thingml.generated.api.IWeatherStation_guiClient;

import java.net.URISyntaxException;
import java.nio.ByteBuffer;

/**
 * Created by bmori on 11.09.2014.
 */
public class MQTT_RemoteControl_Client implements IWeatherStation_guiClient {

    MqttClient mqtt;
    WeatherStation weatherStation;

    public MQTT_RemoteControl_Client(WeatherStation ws) {
        weatherStation = ws;
        try {


            /*MqttAsyncClient mqttClient = new MqttAsyncClient("tcp://localhost:1883",
                    MqttClient.generateClientId(), new MemoryPersistence());

            mqttClient.setCallback(new MqttCallback() {*/



        mqtt = new MqttClient("tcp://localhost:1883", "WeatherStation", new MemoryPersistence());
        MqttConnectOptions connOpts = new MqttConnectOptions();
        connOpts.setCleanSession(true);
        System.out.println("Connecting to broker");
        mqtt.connect(connOpts);
        System.out.println("Connected");
                mqtt.setCallback(new MqttCallback() {
                    @Override
                    public void connectionLost(Throwable e) {
                        System.err.println("MQTT connection lost. " + e.getLocalizedMessage());
                    }

                    @Override
                    public void messageArrived(String topic, MqttMessage mqttMessage) throws Exception {
                        if (topic.equals("changeDisplay")) {
                           weatherStation.changeDisplay_via_gui();
                        }
                    }

                    @Override
                    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

                    }
                });
        registerOnChangeDisplay();
        } catch (Exception e) {
            System.err.println("Cannot connect to MQTT Server. " + e.getLocalizedMessage());
        }
    }

    public void stop() {
        try {
            mqtt.disconnect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void registerOnChangeDisplay() {
        try {
            mqtt.subscribe("changeDisplay");
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void temperature_from_gui(short RemoteMonitoringMsgs_temperature_temp__var) {
        try {
            ByteBuffer bb = ByteBuffer.allocate(2);
            bb.putShort(RemoteMonitoringMsgs_temperature_temp__var);
            System.out.println("Publishing temperature: " + RemoteMonitoringMsgs_temperature_temp__var);
            MqttMessage message = new MqttMessage(bb.array());
            message.setQos(2);
            mqtt.publish("temperature", message);
            System.out.println("Message published");
        } catch (Exception e) {
            System.err.println("Cannot publish on MQTT topic. " + e.getLocalizedMessage());
        }

    }

    @Override
    public void light_from_gui(short RemoteMonitoringMsgs_light_light__var) {
        try {
            ByteBuffer bb = ByteBuffer.allocate(2);
            bb.putShort(RemoteMonitoringMsgs_light_light__var);
            System.out.println("Publishing light: " + RemoteMonitoringMsgs_light_light__var);
            MqttMessage message = new MqttMessage(bb.array());
            message.setQos(2);
            mqtt.publish("light", message);
            System.out.println("Message published");
        } catch (Exception e) {
            System.err.println("Cannot publish on MQTT topic. " + e.getLocalizedMessage());
        }
    }
}
