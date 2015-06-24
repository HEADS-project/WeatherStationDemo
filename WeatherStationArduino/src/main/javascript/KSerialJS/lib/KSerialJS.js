var AbstractComponent = require('kevoree-entities').AbstractComponent;
var SerialJS = require('./SerialJS');
var MessageSerializer = require('./MessageSerializer');
var MessageDeserializer = require('./MessageDeserializer');
/**
* Kevoree component
* @type {KSerialJS}
*/
var KSerialJS = AbstractComponent.extend({
toString: 'KSerialJS',
construct: function() {
var KSerialJS_deserializer_buffer_array = [];
this.KSerialJS_deserializer = new MessageDeserializer(2, 8, 2, 16, 0x12, 0x13, 0x7D, 3, 4, 5, KSerialJS_deserializer_buffer_array, 0);
this.KSerialJS_deserializer.setThis(this.KSerialJS_deserializer);
this.KSerialJS_deserializer.build();
var KSerialJS_serializer_buffer_array = [];
this.KSerialJS_serializer = new MessageSerializer(2, 8, 2, 16, 0x12, 0x13, 0x7D, 3, 4, 5, KSerialJS_serializer_buffer_array, 0);
this.KSerialJS_serializer.setThis(this.KSerialJS_serializer);
this.KSerialJS_serializer.build();
var KSerialJS_serial_buffer_array = [];
this.KSerialJS_serial = new SerialJS("COM27", require("serialport"), null, KSerialJS_serial_buffer_array, 0);
this.KSerialJS_serial.setThis(this.KSerialJS_serial);
this.KSerialJS_serial.build();
this.KSerialJS_serializer.getWrite_bytesonoutListeners().push(this.KSerialJS_serial.receivewrite_bytesOnwrite.bind(this.KSerialJS_serial));
this.KSerialJS_serial.getReceive_bytesonreadListeners().push(this.KSerialJS_deserializer.receivereceive_bytesOnin.bind(this.KSerialJS_deserializer));
this.KSerialJS_deserializer.getTemponRemoteControlListeners().push(this.KSe_Rem_temp_proxy.bind(this));
this.KSerialJS_deserializer.getLuxonRemoteControlListeners().push(this.KSe_Rem_lux_proxy.bind(this));
this.KSerialJS_deserializer.getWrite_bytesonoutListeners().push(this.KSe_out_write_bytes_proxy.bind(this));
},

start: function (done) {
this.KSerialJS_serializer._init();
this.KSerialJS_deserializer._init();
this.KSerialJS_serial._init();
done();
},

stop: function (done) {
this.KSerialJS_serial._stop();
this.KSerialJS_deserializer._stop();
this.KSerialJS_serializer._stop();
done();
},
in_KSe_Rem_changeDisplay_in: function (msg) {
this.KSerialJS_serializer.receivechangeDisplayOnRemoteControl(msg.split(';'));
},
KSe_Rem_temp_proxy: function() {this.out_KSe_Rem_temp_out(arguments[0]);},
out_KSe_Rem_temp_out: function(msg) {/* This will be overwritten @runtime by Kevoree JS */},
KSe_Rem_lux_proxy: function() {this.out_KSe_Rem_lux_out(arguments[0]);},
out_KSe_Rem_lux_out: function(msg) {/* This will be overwritten @runtime by Kevoree JS */},
KSe_out_write_bytes_proxy: function() {this.out_KSe_out_write_bytes_out(arguments[0]);},
out_KSe_out_write_bytes_out: function(msg) {/* This will be overwritten @runtime by Kevoree JS */}});

module.exports = KSerialJS;
