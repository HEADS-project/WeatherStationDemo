# Dockerizing HEADS' Weather Station

from base
maintainer Brice Morin <brice.morin@sintef.no>

# Install prerequisites
run apt-get update
run apt-get install -y software-properties-common

# Install java8
run add-apt-repository -y ppa:webupd8team/java
run apt-get update
run echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections
run apt-get install -y oracle-java8-installer

# Install tools
run apt-get install -y git-core maven

# Clone project
run git clone https://github.com/HEADS-project/WeatherStationDemo.git

# Expose the http port
expose 8080
expose 8090
expose 9000

# Build project
run cd WeatherStationDemo/WeatherStationArduino/
run mvn clean install
run mvn exec:java -Dexec.mainClass="org.thingml.tobegenerated.Main"
