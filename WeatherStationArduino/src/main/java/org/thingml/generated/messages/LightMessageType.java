/**
 * File generated by the ThingML IDE
 * /!\Do not edit this file/!\
 * In case of a bug in the generated code,
 * please submit an issue on our GitHub
 **/

package org.thingml.generated.messages;

import org.thingml.java.Port;
import org.thingml.java.ext.Event;
import org.thingml.java.ext.EventType;

public class LightMessageType extends EventType {
	public LightMessageType() {
		name = "light";
	}

	public Event instantiate(final Port port, final short light) {
		return new LightMessage(this, port, light);
	}
	public class LightMessage extends Event implements java.io.Serializable {

		public final short light;
		@Override
		public String toString() {
			return "Light " + "short: " + light;
		}

		protected LightMessage(EventType type, Port port, final short light) {
			super(type, port);
			this.light = light;
		}
	}

}
