# Dockerizing HEADS' Weather Station

from dockerfile/java:oracle-java8
maintainer Brice Morin <brice.morin@sintef.no>

# Install prerequisites
run apt-get update
run apt-get upgrade

# Install tools
run apt-get install -y git-core maven

# Clone project
run git clone https://github.com/HEADS-project/WeatherStationDemo.git

# Expose the http port
expose 8080
expose 8090
expose 9000

workdir /WeatherStation/WeatherStationArduino

# Build project
cmd ["mvn clean install exec:java -Dexec.mainClass=org.thingml.tobegenerated.Main"]
