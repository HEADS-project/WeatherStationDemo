/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.thingml.samples.weatherstation;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.nio.channels.NotYetConnectedException;
import java.util.Collection;

/**
 *
 * @author ffl
 */
public class WebSocket_UI extends WebSocketServer implements WeatherStation_UI_Listener {

    protected WeatherStation weatherstation;

    public WebSocket_UI(int port, WeatherStation weatherstation) throws UnknownHostException {
        super(new InetSocketAddress(port));
        this.weatherstation = weatherstation;
        System.out.println("[WebSocket_UI] Server stated on port " + this.getPort());
    }

    public void UI_updateDisplay(String disp) {
        sendToAll("updateDisplay:" + disp);
    }
    public void UI_putRestData(){
        sendToAll("putRestData:");
    }
    public void UI_putRestDataResponse(String response){
        sendToAll("putRestDataResponse:" + response);
    }
    public void UI_restURI(String uri){
        sendToAll("restURI:" + uri);
    }

    @Override
    public void onOpen(WebSocket ws, ClientHandshake ch) {
        System.out.println("[WebSocket_UI] Open Client: " + ws.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onClose(WebSocket ws, int i, String string, boolean bln) {
        System.out.println("[WebSocket_UI] Close Client: " + ws.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onMessage(WebSocket ws, String string) {
        System.out.println("[WebSocket_UI] Message from " + ws.getRemoteSocketAddress().getAddress().getHostAddress() + " Data = " + string);
        // Just echo for now
        //ws.send("Echo : " + string);
        //Parse the message and forward to the weather station
        try {
        String[] message = string.split(":");
        if (message[0].trim().equals("changeDisplay")) weatherstation.UI_changeDisplay();
        else if (message[0].trim().equals("setRestURI")) weatherstation.UI_setRestURI(string.substring(string.indexOf(":")+1));
        else if (message[0].trim().equals("getRestURI")) weatherstation.UI_getRestURI();
        else {
            System.out.println("[WebSocket_UI] Bad Command : " + string);
        }
        }
        catch(Exception e) {
            System.out.println("[WebSocket_UI] Bad Command : " + string + " " + e.getMessage());
        }
    }

    @Override
    public void onError(WebSocket ws, Exception excptn) {
        System.out.println("[WebSocket_UI] Error ws = " + ws + " exception = " + excptn.getMessage());
        excptn.printStackTrace();
    }

    /**
     * Sends <var>text</var> to all currently connected WebSocket clients.
     *
     * @param text The String to send across the network.
     * @throws InterruptedException When socket related I/O errors occur.
     */
    public void sendToAll(String text) {
        Collection<WebSocket> con = connections();
        synchronized (con) {
            for (WebSocket c : con) {
                try {
                c.send(text);
                } catch (NotYetConnectedException ignored) {}
            }
        }
    }

}
