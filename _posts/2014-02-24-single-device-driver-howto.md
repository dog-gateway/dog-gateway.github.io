---
layout: post
title:  "Device driver How-To (for existing technologies)"
date:   2014-02-24 16:30:06
categories: development-howto
---

Even if a given technology, e.g., ZWave, might already be supported in Dog, there are cases in which drivers for specific devices are missing. In this simple tutorial we will tackle development of a new device driver for a technology already supported in Dog.


The first step to accomplish when starting to develop a new device driver is to identify the corresponding device model in DogOnt, (or in the [core-library](https://github.com/dog-gateway/core-library) repository).

Let's assume we want to develop a new driver for handling a ZWave clean contact actuator. Analyzing the DogOnt model (or the core library) we can easily conclude that the most suited device category would be OnOffOutput (```it.polito.elite.dog.core.library.model.devicecategory.OnOffOutput```).

### Create a new Plug-in project ###

Given such information, we can start developing the new driver from scratch (let we suppose that the OnOffOutput is not already supported in Dog). The first step to carry is to create a new plugin project:

1. Select File > New > Plug-in project
2. Type the project name (using the Java package naming convention, e.g., com.mycompany.dog.drivers.zwave.onoffoutput)
3. Select the plugin target to be a standard OSGi framework
4. Select the working set (drivers / zwave) in which the project must be included
5. Hit on Finish

<img class="img-responsive" src="/assets/img/screenshots/single-device-driver/new-plugin-step1.png" />

The resulting plugin structure will be:

	com.mycompany.dog.drivers.zwave.onoffoutput
	|-- JRE System Library [JavaSE-1.6]
	|-- Plug-in Dependencies
	|-- src
	|-- META-INF
	|	|-- MANIFEST.MF
	|	|-- LICENSE 
	|-- build.properties
	
The official Dog service declaration guidelines suggest to use Declarative Services wherever possible. Therefore the second step in the development process will be setting up the plugin to use this service registration paradigm.

### Set-up the plugin to use Declarative Services ###

1. Create a new folder named ```OSGI-INF``` in the main project folder
2. Select File > New > Component Definition
3. Type the name of the component, ZWaveOnOffOutputDriver in our case
4. Type the name of the class implementing the component, e.g., ```com.mycompany.dog.drivers.zwave.onoffoutput.ZWaveOnOffOutputDriver```
5. Hit on Finish. 

<img class="img-responsive" src="/assets/img/screenshots/single-device-driver/new-plugin-step2.png" />

The resulting plugin structure will be:

	com.mycompany.dog.drivers.zwave.onoffoutput
	|-- JRE System Library [JavaSE-1.6]
	|-- Plug-in Dependencies
	|-- src
	|-- META-INF
	|	|-- MANIFEST.MF
	|	|-- LICENSE 
	|-- OSGI-INF
	|	|-- component.xml
	|-- build.properties
	
### Prepare the driver structure ###

Device drivers encompass at least 2 distinct classes, a "Driver manager" class who registers in the OSGi framework as ```Driver``` service, and a "Driver Instance" class who actually manages the device. At runtime, a single instance of the "Driver Manager" class will be active, whereas for each active device (of the type managed by the driver) a unique instance of the "Driver Instance" class will be created. The Dog gateway naming convention requires the name of the first class to terminate with the word "Driver", while the name of the second should end with the word "DriverInstance". In our sample case we will therefore create 2 classes: the manager class, namely ```com.mycompany.dog.drivers.zwave.onoffoutput.ZWaveOnOffOutputDriver``` and the instance class, i.e., ```com.mycompany.dog.drivers.zwave.onoffoutput.ZWaveOnOffOutputDriverInstance```.

The resulting plugin structure will be:

	com.mycompany.dog.drivers.zwave.onoffoutput
	|-- JRE System Library [JavaSE-1.6]
	|-- Plug-in Dependencies
	|-- src
	|	|-- com.mycompany.dog.drivers.zwave.onoffoutput
	|	|	|-- ZWaveOnOffOutputDriver.java
	|	|	|-- ZWaveOnOffOutputDriverInstance.java
	|-- META-INF
	|	|-- MANIFEST.MF
	|	|-- LICENSE 
	|-- OSGI-INF
	|	|-- component.xml
	|-- build.properties
	
### Create the "Driver manager" class ###

We start developing from the driver manager class. Given the initial assumption that the ZWave technology is already supported, the driver manager class is quite easy to develop. It is, in fact, sufficient to inherit from the base driver manager class defined in the gateway driver (```it.polito.elite.dog.drivers.zwave.device.ZWaveDeviceDriver```), and to fill device specific data.


	package it.polito.elite.dog.drivers.zwave.onoffdevice;

	import it.polito.elite.dog.core.library.model.ControllableDevice;
	import it.polito.elite.dog.drivers.zwave.device.ZWaveDeviceDriver;
	import it.polito.elite.dog.drivers.zwave.network.ZWaveDriverInstance;
	import it.polito.elite.dog.drivers.zwave.network.interfaces.ZWaveNetwork;

	import java.util.HashSet;

	import org.osgi.framework.BundleContext;

	public class ZWaveOnOffOutputDriver extends ZWaveDeviceDriver 
	{

		/**
		* 
		*/
		public ZWaveOnOffOutputDriver()
		{
			super();
			this.driverInstanceClass = ZWaveOnOffOutputDriverInstance.class;
		}

		@Override
		public ZWaveDriverInstance createZWaveDriverInstance(
			ZWaveNetwork zWaveNetwork, ControllableDevice device, int nodeId,
			HashSet<Integer> instancesId, int gatewayNodeId,
			int updateTimeMillis, BundleContext context)
		{
			return new ZWaveOnOffOutputDriverInstance(zWaveNetwork, device, nodeId, instancesId, gatewayNodeId, updateTimeMillis, context);
		}
	}

In particular, the base driver must be "informed" about the type of driver instance being managed (through the following line)

	this.driverInstanceClass = ZWaveOnOffOutputDriverInstance.class;
	
and a facility for building the driver instance class must be provided.

	@Override
	public ZWaveDriverInstance createZWaveDriverInstance(
		ZWaveNetwork zWaveNetwork, ControllableDevice device, int nodeId,
		HashSet<Integer> instancesId, int gatewayNodeId,
		int updateTimeMillis, BundleContext context)
	{
		return new ZWaveOnOffOutputDriverInstance(zWaveNetwork, device, nodeId, instancesId, gatewayNodeId, updateTimeMillis, context);
	}
