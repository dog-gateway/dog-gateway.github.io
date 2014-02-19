---
layout: default
title: The Dog Gateway - Use it!
active: Use It!
sidebar: useit-sidebar.html
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

#### Configuration Anatomy ####
The Dog Gateway configuration is stored under the folder named *configuration*, and has the following structure:

	configuration
		|--- config
		|	 |--- com.eclipsesource.jaxrs.connector.cfg
		|	 |--- it.polito.elite.dog.addons.[addon configuration files]
		|	 |--- it.polito.elite.dog.core.housemodel.simple.cfg
		|	 |--- it.polito.elite.dog.core.log.console.cfg
		|	 |--- it.polito.elite.dog.drivers.[technology].[driver configuration files]
		|	 |--- home.xml
		|	 |--- [localRuleStore.xml]
		|	 |--- ...
		|
		|--- config.ini
		
While the ```config.ini``` file usually does not need any change (and, vice-versa any wrong modification may compromise the gateway execution), 
files inside the ```configuration``` folder provide parameters to tune-up the gateway modules and might need to be changed depending on the specific installation. 
Among the available files, two main types can be identified: ```.cfg``` files and ```.xml``` files. The former are ```key = value``` files used to specify configuration
parameters needed by the gateway bundles (either to run, or to tune-up their runtime execution). The latter, instead, are used to provide extensive configuration data, e.g., the home configuration in terms of devices and locations, the set of rules to be executed, etc. They are typically pointed by some parameter specified in ```.cfg``` files.

To better understand the files structure, let us explain one of the most important configuration files, the ```it.polito.elite.dog.core.housemodel.simple.cfg``` which provides details about the home managed by the Dog Gateway.
Such a file is organized as follows:

	# Home configuration file
	# xml files might also be in external directories e.g., /data/dog-config/
	DEVICES=zwave.xml
	SVGPLAN=simple_home.svg

### Run ###
