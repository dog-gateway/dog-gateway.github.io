---
layout: default
title: The Dog Gateway - Develop!
active: Develop
sidebar: develop-sidebar.html
--- 

## Developer Resources ##

### <a id="Requirements"></a> Requirements ###

* Eclipse RCP (4.3 - Kepler), but should work starting from Eclipse RCP (3.6)
* Java (1.6+)
* OSGi framework (4.3+), e.g., Eclipse Equinox or Apache Felix, the former being our reference platform
* Git 
* Some devices to test with

### <a id="Setup"></a> Setup ###
* Install 
	* Java SDK (1.6+)
	* Eclipse RCP 4.3
	* Git
* Download / Fork the project sources
	* see [http://github.com/dog-gateway](http://github.com/dog-gateway)
* Organize the sources in the following working sets (reflecting the Dog logic architecture)
	* addons
		* [stream-processor](http://github.com/dog-gateway/stream-processor)
		* [simple-stream-processor](http://github.com/dog-gateway/simple-stream-processor)
		* [h2-eventstore](http://github.com/dog-gateway/h2-eventstore)
		* [xively](http://github.com/dog-gateway/xively)
		* [rule-engine](http://github.com/dog-gateway/rule-engine)
		
	* admin
		* [system-management](http://github.com/dog-gateway/system-management)
		* [admin-ui](http://github.com/dog-gateway/adminui)
	* communication
		* [rest-dependencies](http://github.com/dog-gateway/rest-dependencies)
		* [device-api](http://github.com/dog-gateway/device-api)
		* [environment-api](http://github.com/dog-gateway/environment-api)
		* [rule-engine-api](http://github.com/dog-gateway/rule-engine-api)
	* core
		* [clock](http://github.com/dog-gateway/clock)
		* [device-factory](http://github.com/dog-gateway/device-factory)
		* [device-manager](http://github.com/dog-gateway/device-manager)
		* [semantic-house-model](http://github.com/dog-gateway/semantic-house-model)
		* [simple-house-model](http://github.com/dog-gateway/simple-house-model)
		* [core-library](http://github.com/dog-gateway/core-library)
		* [jaxb-library](http://github.com/dog-gateway/jaxb-library)
		* [measure-library](http://github.com/dog-gateway/measure-library)
		* [semantic-library](http://github.com/dog-gateway/semantic-library)
		* [stream-library](http://github.com/dog-gateway/stream-library)
		* [console-log](http://github.com/dog-gateway/console-log)
		* [monitor-admin](http://github.com/dog-gateway/monitor-admin)
		* [rxtx] (http://github.com/dog-gateway/rxtx)
	* drivers / knx
		* [knx-drivers](http://github.com/dog-gateway/knx-drivers)
	* drivers / modbus
		* [modbus-drivers](http://github.com/dog-gateway/modbus-drivers)
	* drivers / zwave
		* [zwave-drivers](http://github.com/dog-gateway/zwave-drivers)
	* drivers / bticino
		* [bticino-drivers](http://github.com/dog-gateway/bticino-drivers)
	* drivers / echelon
		* [echelon-drivers](http://github.com/dog-gateway/echelon-drivers)

### <a id="Run"></a> Run / Test ###
Together with source repositories, we provide a set of configuration samples (as separate repositories) designed to allow developers to quickly experiment with Dog and selected technologies. Sample configurations can be used as starting seed for designing or developing new deployments, according to the developer needs.

#### <a id="Configurations"></a> Sample configurations (and Eclipse launchers) ####

* [bticino-configuration](http://github.com/dog-gateway/bticino-configuration)
* [rule-engine-configuration](http://github.com/dog-gateway/rule-engine-configuration)
* [semantic-configuration](http://github.com/dog-gateway/semantic-configuration)
* [eventstore-configuration](http://github.com/dog-gateway/eventstore-configuration)
* [zwave-configuration](http://github.com/dog-gateway/zwave-configuration)
* [knx-configuration](http://github.com/dog-gateway/knx-configuration)
* [xively-configuration](http://github.com/dog-gateway/xively-configuration)
* [adminui-configuration] (http://github.com/dog-gateway/adminui-configuration)


### <a id="Guidelines"></a> Development guidelines ###

We are currently working on formal development guidelines, at the moment we could only provide some references to the OSGi guidelines (which should be respected when developing new bundles) and to some presentations on the Dog Gateway architecture and inner working.


We are also finalizing development **HowTo**s, so please [stay tuned](/blog.html)!

### <a id="Javadoc"></a> Javadoc ###
Please refer to the single gateway bundle repositories to get the corresponding Javadocs.