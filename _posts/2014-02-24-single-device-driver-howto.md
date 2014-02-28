---
layout: post
title:  "Device driver How-To (for existing technologies)"
date:   2014-02-24 16:30:06
categories: development-howto
---

Even if a given technology, e.g., ZWave, might already be supported in Dog, there are cases in which drivers for specific devices are missing. In this simple tutorial we tackle the development of a new device driver for a technology already supported in Dog.


The first step to accomplish when starting to develop a new device driver is to identify the corresponding device model in DogOnt, or in the [core-library](https://github.com/dog-gateway/core-library) repository.

Let's assume we want to develop a new driver for handling a ZWave clean contact actuator. By analyzing the DogOnt model (or the core library) we can easily conclude that the most suited device category would be OnOffOutput (```it.polito.elite.dog.core.library.model.devicecategory.OnOffOutput```).

### Create a new Plug-in project ###

Given such information, we can start developing the new driver from scratch (let we suppose that the OnOffOutput is not already supported in Dog). The first step to carry is to create a new plugin project:

1. In Eclipse, select File > New > Plug-in project
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
	
The official Dog service declaration guidelines suggest to use Declarative Services whenever possible. Therefore the second step in the development process will be setting up the plugin to use this service registration paradigm.

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

Device drivers encompass at least 2 distinct classes, a "Driver manager" class who registers in the OSGi framework as ```Driver``` service, and a "Driver Instance" class who actually manages the device. At runtime, a single instance of the "Driver Manager" class will be active, whereas for each active device (of the type managed by the driver) a unique instance of the "Driver Instance" class will be created. 

The Dog Gateway naming convention requires the name of the first class to terminate with the word "Driver", while the name of the second should end with the word "DriverInstance". In our sample case we will therefore create 2 classes: the manager class, namely ```com.mycompany.dog.drivers.zwave.onoffoutput.ZWaveOnOffOutputDriver``` and the instance class, i.e., ```com.mycompany.dog.drivers.zwave.onoffoutput.ZWaveOnOffOutputDriverInstance```.

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

We start developing from the driver manager class. Given the initial assumption that the ZWave technology is already supported, the driver manager class is quite easy to develop. It is, in fact, sufficient to inherit from the base driver manager class defined in the gateway driver (```it.polito.elite.dog.drivers.zwave.device.ZWaveDeviceDriver```), and to fill device-specific data.


	package com.mycompany.dog.drivers.zwave.onoffoutput;

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

Remaining tasks, including ```Driver``` interface implementation, are accomplished by the base driver class. If a given device driver needs specific configuration parameters, it may override the ```updated``` method to implement its own configuration policies (according to the OSGi Managed Service specification).
	
Once ended the development of the driver manager class, the corresponding driver instance can be addressed. The driver instance class is charged to handle the entire communication with the connected physical device, by means of the services provided by the technology network driver (```it.polito.elite.dog.drivers.zwave.ZWaveNetwork```, in our case).
	
In general, the driver instance structure is more complex than the driver manager, and typically requires implementation of most functionalities as they are strictly dependent of both the category of the managed device and the network technology. Driver instances inherit from an abstract class defined in the network bundle, e.g.,```it.polito.elite.drivers.zwave.network.ZWaveDriverInstance``` and implement the functionalities of the corresponding device category (in our case: ```OnOffOutput```). 

It is usually advisable to support the entire set of device categories mapping uniquely on the set of supported functionalities. As for the main device category, also in this case DogOnt (or the [core-library](https://github.com/dog-gateway/core-library)) should be considered as the normative source. In our example, additional categories include: ```Lamp```, ```SimpleLamp```, ```Buzzer```, ```MainsPowerOutlet``` and ```LampHolder``` since they share exactly the same definition of the ```OnOffOutput``` category.

The driver instance class structure can be divided in two main parts: an instantiation / inizialization part and an implementation part where methods defined by the supported device categories are actually implemented. The former section, typically encompass: the class constructor, methods inherited from the abstract driver instance class, and inner state initialization (which must respect the corresponding DogOnt model). The latter, instead, encompass all the methods deriving from the device categories definition and the possibly needed support functions. In the following, the driver instance scheleton is reported.


	package it.polito.elite.dog.drivers.zwave.onoffdevice;

	import it.polito.elite.dog.core.library.model.ControllableDevice;
	import it.polito.elite.dog.core.library.model.DeviceStatus;
	import it.polito.elite.dog.core.library.model.devicecategory.Buzzer;
	import it.polito.elite.dog.core.library.model.devicecategory.ElectricalSystem;
	import it.polito.elite.dog.core.library.model.devicecategory.Lamp;
	import it.polito.elite.dog.core.library.model.devicecategory.LampHolder;
	import it.polito.elite.dog.core.library.model.devicecategory.MainsPowerOutlet;
	import it.polito.elite.dog.core.library.model.devicecategory.OnOffOutput;
	import it.polito.elite.dog.core.library.model.devicecategory.SimpleLamp;
	import it.polito.elite.dog.core.library.model.state.OnOffState;
	import it.polito.elite.dog.core.library.model.state.State;
	import it.polito.elite.dog.core.library.model.statevalue.OffStateValue;
	import it.polito.elite.dog.core.library.model.statevalue.OnStateValue;
	import it.polito.elite.dog.core.library.util.LogHelper;
	import it.polito.elite.dog.drivers.zwave.ZWaveAPI;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.CommandClasses;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.Controller;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.Device;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.Instance;
	import it.polito.elite.dog.drivers.zwave.network.ZWaveDriverInstance;
	import it.polito.elite.dog.drivers.zwave.network.info.ZWaveNodeInfo;
	import it.polito.elite.dog.drivers.zwave.network.interfaces.ZWaveNetwork;

	import java.util.HashMap;
	import java.util.HashSet;
	import java.util.Set;

	import org.osgi.framework.BundleContext;

	public class ZWaveOnOffDeviceDriverInstance extends ZWaveDriverInstance implements Lamp, SimpleLamp, Buzzer, MainsPowerOutlet, LampHolder, OnOffOutput
	{
		public ZWaveOnOffDeviceDriverInstance(ZWaveNetwork network, ControllableDevice device, int deviceId,
			Set<Integer> instancesId, int gatewayNodeId, int updateTimeMillis, BundleContext context)
		{
			super(network, device, deviceId, instancesId, gatewayNodeId, updateTimeMillis, context);

			new LogHelper(context);

			// initialize states
			this.initializeStates();
		}

		/**
		* Initializes the state asynchronously as required by OSGi
		*/
		private void initializeStates()
		{
			// intialization of device states
		}

		@Override
		public void notifyStateChanged(State newState)
		{
		
		}

		@Override
		public void newMessageFromHouse(Device deviceNode, Instance instanceNode, 
			Controller controllerNode, String sValue)
		{
			// method defined by the driver instance abstract class, provides information about changes detected on the 
			// automation network who are actually involving the managed device
		}

		/**
		* Check if the current state has been changed. In that case, fire a state
		* change message, otherwise it does nothing
		* 
		* @param OnOffValue
		*            OnOffState.ON or OnOffState.OFF
		*/
		private void changeCurrentState(String OnOffValue)
		{
	
		}

		@Override
		protected void specificConfiguration()
		{
			//carries driver instance specific configuration tasks, it is the last method called by the superclass constructor
		}

		@Override
		protected void addToNetworkDriver(ZWaveNodeInfo nodeInfo)
		{
			// registers this driver instance with the low-level technology-specific network driver
		}

		@Override
		protected boolean isController()
		{
			// inherited from the device instance abstract class (only defined for Z-Wave networks)
		}

		@Override
		public void storeScene(Integer sceneNumber)
		{
			// device category implementation
		}

		@Override
		public void deleteScene(Integer sceneNumber)
		{
			// device category implementation
		}

		@Override
		public void deleteGroup(String groupID)
		{
			// device category implementation
		}

		@Override
		public void storeGroup(String groupID)
		{
			// device category implementation
		}

		@Override
		public DeviceStatus getState()
		{
			// device category implementation
		}

		@Override
		public void on()
		{
			// device category implementation
		}

		@Override
		public void off()
		{
			// device category implementation
		}

		@Override
		protected ZWaveNodeInfo createNodeInfo(int deviceId, Set<Integer> instancesId, boolean isController) 
		{
			// inherited from the device instance abstract class (only defined for Z-Wave networks)
		}
	}

The above structure must be filled with concrete implementation of defined methods. The resulting driver instance will therefore be the following.

	package it.polito.elite.dog.drivers.zwave.onoffdevice;

	import it.polito.elite.dog.core.library.model.ControllableDevice;
	import it.polito.elite.dog.core.library.model.DeviceStatus;
	import it.polito.elite.dog.core.library.model.devicecategory.Buzzer;
	import it.polito.elite.dog.core.library.model.devicecategory.ElectricalSystem;
	import it.polito.elite.dog.core.library.model.devicecategory.Lamp;
	import it.polito.elite.dog.core.library.model.devicecategory.LampHolder;
	import it.polito.elite.dog.core.library.model.devicecategory.MainsPowerOutlet;
	import it.polito.elite.dog.core.library.model.devicecategory.OnOffOutput;
	import it.polito.elite.dog.core.library.model.devicecategory.SimpleLamp;
	import it.polito.elite.dog.core.library.model.state.OnOffState;
	import it.polito.elite.dog.core.library.model.state.State;
	import it.polito.elite.dog.core.library.model.statevalue.OffStateValue;
	import it.polito.elite.dog.core.library.model.statevalue.OnStateValue;
	import it.polito.elite.dog.core.library.util.LogHelper;
	import it.polito.elite.dog.drivers.zwave.ZWaveAPI;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.CommandClasses;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.Controller;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.Device;
	import it.polito.elite.dog.drivers.zwave.model.zway.json.Instance;
	import it.polito.elite.dog.drivers.zwave.network.ZWaveDriverInstance;
	import it.polito.elite.dog.drivers.zwave.network.info.ZWaveNodeInfo;
	import it.polito.elite.dog.drivers.zwave.network.interfaces.ZWaveNetwork;

	import java.util.HashMap;
	import java.util.HashSet;
	import java.util.Set;

	import org.osgi.framework.BundleContext;

	public class ZWaveOnOffDeviceDriverInstance extends ZWaveDriverInstance implements Lamp, SimpleLamp, Buzzer, MainsPowerOutlet, LampHolder, OnOffOutput
	{
		public ZWaveOnOffDeviceDriverInstance(ZWaveNetwork network, ControllableDevice device, int deviceId,
			Set<Integer> instancesId, int gatewayNodeId, int updateTimeMillis, BundleContext context)
		{
			super(network, device, deviceId, instancesId, gatewayNodeId, updateTimeMillis, context);

			new LogHelper(context);

			// initialize states
			this.initializeStates();
		}

		/**
		* Initializes the state asynchronously as required by OSGi
		*/
		private void initializeStates()
		{
			// get the initial state of the device
			Runnable worker = new Runnable() {
				public void run()
				{
					network.read(nodeInfo, true);
				}
			};

			Thread workerThread = new Thread(worker);
			workerThread.start();

		}

		@Override
		public void notifyStateChanged(State newState)
		{
			// debug
			((ElectricalSystem) device).notifyStateChanged(newState);
	
		}

		@Override
		public void newMessageFromHouse(Device deviceNode, Instance instanceNode, 
			Controller controllerNode, String sValue)
		{
			this.deviceNode = deviceNode;

			// Read the value associated with the right CommandClass.
			int nLevel = 0;
			CommandClasses ccEntry = instanceNode.getCommandClass(ZWaveAPI.COMMAND_CLASS_SWITCH_BINARY);

			// Check if it is a real new value or if it is an old one
			if(ccEntry!=null)
			{
				//update last update time
				lastUpdateTime = ccEntry.getLevelUpdateTime();
				nFailedUpdate = 0;

				if (ccEntry != null)
					nLevel = ccEntry.getLevelAsInt();

				if (nLevel > 0)
					changeCurrentState(OnOffState.ON);
				else
					changeCurrentState(OnOffState.OFF);
			
				notifyStateChanged(null);
			}
		}

		/**
		* Check if the current state has been changed. In that case, fire a state
		* change message, otherwise it does nothing
		* 
		* @param OnOffValue
		*            OnOffState.ON or OnOffState.OFF
		*/
		private void changeCurrentState(String OnOffValue)
		{
			String currentStateValue = "";
			State state = currentState.getState(OnOffState.class.getSimpleName());

			if (state != null)
				currentStateValue = (String) state.getCurrentStateValue()[0].getValue();

			// if the current states it is different from the new state
			if (!currentStateValue.equalsIgnoreCase(OnOffValue))
			{
				State newState;
				// set the new state to on or off...
				if (OnOffValue.equalsIgnoreCase(OnOffState.ON))
				{
					newState = new OnOffState(new OnStateValue());
				}
				else
				{
					newState = new OnOffState(new OffStateValue());
				}
				// ... then set the new state for the device and throw a state
				currentState.setState(newState.getStateName(), newState);
			}
		}

		@Override
		protected void specificConfiguration()
		{
			// prepare the device state map
			currentState = new DeviceStatus(device.getDeviceId());
		}

		@Override
		protected void addToNetworkDriver(ZWaveNodeInfo nodeInfo)
		{
			network.addDriver(nodeInfo, updateTimeMillis, this);
		}

		@Override
		protected boolean isController()
		{
			return false;
		}

		@Override
		public void storeScene(Integer sceneNumber)
		{
			// intentionally left empty
		}

		@Override
		public void deleteScene(Integer sceneNumber)
		{
			// intentionally left empty
		}

		@Override
		public void deleteGroup(String groupID)
		{
			// intentionally left empty
		}

		@Override
		public void storeGroup(String groupID)
		{
			// intentionally left empty
		}

		@Override
		public DeviceStatus getState()
		{
			return currentState;
		}

		@Override
		public void on()
		{
			//Sends on command to all instances, probably only one in this case
			for(Integer instanceId : nodeInfo.getInstanceSet())
				network.write(nodeInfo.getDeviceNodeId(), instanceId, ZWaveAPI.COMMAND_CLASS_SWITCH_BINARY, "255");
		}

		@Override
		public void off()
		{
			//Sends off command to all instances, probably only one in this case
			for(Integer instanceId : nodeInfo.getInstanceSet())
				network.write(nodeInfo.getDeviceNodeId(), instanceId, ZWaveAPI.COMMAND_CLASS_SWITCH_BINARY, "0");
		}

		@Override
		protected ZWaveNodeInfo createNodeInfo(int deviceId, Set<Integer> instancesId, boolean isController) 
		{
			HashMap<Integer,Set<Integer>> instanceCommand = new HashMap<Integer, Set<Integer>>();

			HashSet<Integer> ccSet = new HashSet<Integer>();
			ccSet.add(ZWaveAPI.COMMAND_CLASS_SWITCH_BINARY);

			//binary switch has its own command class 
			for(Integer instanceId : instancesId)
			{
				instanceCommand.put(instanceId, ccSet);
			}
			ZWaveNodeInfo nodeInfo = new ZWaveNodeInfo(deviceId, instanceCommand, isController);
			return nodeInfo;
		}
	}

