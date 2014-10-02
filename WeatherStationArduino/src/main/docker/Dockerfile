# Dockerizing HEADS' Weather Station

from dockerfile/java:oracle-java8
maintainer Brice Morin <brice.morin@sintef.no>

# Install prerequisites
run apt-get update
run apt-get upgrade -y

# Install tools
run apt-get install -y git-core maven

# Clone and build project
run git clone https://github.com/HEADS-project/WeatherStationDemo.git
run cd /WeatherStation/WeatherStationArduino
run mvn clean install

# Expose the port (for MQTT, WS and HTTP)
expose 8080
expose 8090
expose 9000

workdir /WeatherStation/WeatherStationArduino

# Run Weather station
cmd java -jar target/JavaWeatherNode-1.0-SNAPSHOT.jar
