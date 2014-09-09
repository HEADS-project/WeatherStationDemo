package org.thingml.samples.weatherstation;

import java.text.DecimalFormat;

/**
 * Created by ffl on 09.09.14.
 */
public class WeatherStationSimulator extends WeatherStation implements Runnable {

    private static WeatherStationSimulator instance = new WeatherStationSimulator();
    static{
        instance.addRemoteControlListener(new REST_RemoteControl_Client());
        new Thread(instance).start();
    }
    public static WeatherStationSimulator getInstance() { return instance; }

    public WeatherStationSimulator() {
        df.setMaximumFractionDigits(2);
    }

    private float temperature = 25;
    private float light = 45;

    private String display = "Temperature";


    public synchronized void RemoteControl_changeDisplay(){
        if (display.equals("Temperature")) display = "Light";
        else display = "Temperature";
    }

    private DecimalFormat df = new DecimalFormat();
    public String getDisplayString() {
        if (display.equals("Temperature")) {
            return display + ": " + df.format(temperature) + "C";
        }
        else return display + ": " + df.format(light) + "%";
    }

    float dt = 0.05f;
    float dl = -0.1f;
    private void simulate_sensors() {
        if (temperature < 10) dt = Math.abs(dt);
        else if (temperature > 30) dt = -Math.abs(dt);
        temperature += dt;

        if (light < 1) dl = Math.abs(dl);
        else if (light > 99) dl = -Math.abs(dl);
        light += dl;
    }


    public void stop() {
        stop = true;
    }

    boolean stop = false;
    public void run() {
        int clk = 0;

        while (!stop) {
            try {
                simulate_sensors();
                System.out.println("Tick " + getDisplayString());
                Thread.sleep(1000);
                clk++;
                if (clk%5 == 0) { // Every 5 seconds
                    System.out.println("Send values =>");
                    RemoteControl_light(light);
                    RemoteControl_temperature(temperature);
                }
                if (clk==10) { // Every 10 seconds
                    RemoteControl_changeDisplay();
                    clk = 0;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
