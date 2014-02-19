---
layout: default
title: The Dog Gateway - Use it!
---

# Use Dog now! #

Are you eager to experiment? Do you want to start using the Dog Gateway now? Here you can find some easy recipes to getting you online with your brand new Dog installation!

### Warm up!###
Do  you already have a platform for running the gateway? which technology do you want to interface? 
Before downloading the latest version, check the hardware and software environment in which you plan to run the gateway.

#### Minimum Requirements ####

* Java Runtime Environment v1.6 or greater
* 256 MByte of system memory (actual memory required by the gateway depends on the configuration and typically ranges between 40 and 120 MBytes).
* 64 MByte of storage (typically) 
* Ethernet connection (to access the gateway, and to connect to the automation networks)

### Download ###
Download the latest release from [GitHub](https://github.com/dog-gateway/dog-release). If your are planning to run the Dog Gateway on [RaspberryPi](http://www.raspberrypi.org/) you might also want to check the available pre-compiled [images](#raspberry-images).
Check for which technology drivers are available and choose the ones you prefer; download the latest releases on the corresponding drivers repositories:

 * [MyHome](https://github.com/dog-gateway/bticino-drivers)
 * [KNX](https://github.com/dog-gateway/knx-drivers)
 * [Echelon](https://github.com/dog-gateway/echelon-drivers)
 * [Modbus](https://github.com/dog-gateway/modbus-drivers)
 * [ZWave](https://github.com/dog-gateway/zwave-drivers)

### Installation  ###
Ok you've got the latest release, what to do next?

* Uncompress the release file in the directory in which you want (or move it later to the right place); e.g.,<br/> 
	```
	unzip dog-3.0.zip
	```
* If you downloaded additional drivers, uncompress the driver files in to a temporary folder, and move them to the ```drivers``` sub-directory located in the dog installation folder.<br/>
	```
	unzip dog-zwave.zip 
	```
	<br/>
	```
	cp dog-zwave/*.jar dog/drivers
	```

### Configuration ###
Check configuration details for each technology on the corresponding driver page on GitHub:

* [MyHome](https://github.com/dog-gateway/bticino-drivers)
* [KNX](https://github.com/dog-gateway/knx-drivers)
* [Echelon](https://github.com/dog-gateway/echelon-drivers)
* [Modbus](https://github.com/dog-gateway/modbus-drivers)
* [ZWave](https://github.com/dog-gateway/zwave-drivers)

or have a look at the sample configurations:

* [MyHome](https://github.com/dog-gateway/bticino-configuration)
* [KNX](https://github.com/dog-gateway/knx-configuration)
* Echelon
* Modbus
* [ZWave](https://github.com/dog-gateway/zwave-configuration)

For any additional module (bundle) you download, check the installation and configuration instructions on the corresponding GitHub repository.

### Run ###