var SerialJS = require('./SerialJS');
var MessageSerializer = require('./MessageSerializer');
var MessageDeserializer = require('./MessageDeserializer');
var KSerialJS_serial_buffer_array = [];
var KSerialJS_serial = new SerialJS("COM27", require("serialport"), null, KSerialJS_serial_buffer_array, 0);
KSerialJS_serial.setThis(KSerialJS_serial);
KSerialJS_serial.build();
var KSerialJS_serializer_buffer_array = [];
var KSerialJS_serializer = new MessageSerializer(2, 8, 2, 16, 0x12, 0x13, 0x7D, 3, 4, 5, KSerialJS_serializer_buffer_array, 0);
KSerialJS_serializer.setThis(KSerialJS_serializer);
KSerialJS_serializer.build();
var KSerialJS_deserializer_buffer_array = [];
var KSerialJS_deserializer = new MessageDeserializer(2, 8, 2, 16, 0x12, 0x13, 0x7D, 3, 4, 5, KSerialJS_deserializer_buffer_array, 0);
KSerialJS_deserializer.setThis(KSerialJS_deserializer);
KSerialJS_deserializer.build();
KSerialJS_serial.getReceive_bytesonreadListeners().push(KSerialJS_deserializer.receivereceive_bytesOnin.bind(KSerialJS_deserializer));
KSerialJS_serializer.getWrite_bytesonoutListeners().push(KSerialJS_serial.receivewrite_bytesOnwrite.bind(KSerialJS_serial));
KSerialJS_serial._init();
KSerialJS_deserializer._init();
KSerialJS_serializer._init();
//terminate all things on SIGINT (e.g. CTRL+C)
process.on('SIGINT', function() {
console.log("Stopping components... CTRL+D to force shutdown");
KSerialJS_deserializer._stop();
KSerialJS_serializer._stop();
KSerialJS_serial._stop();
});

