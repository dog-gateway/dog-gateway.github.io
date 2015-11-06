---
layout: post
title:  "Posting notifications to XBMC"
date:   2015-11-06 08:04
categories: news
active: Blog
---
I've been using XBMC at my home for more than one year. Since then, it became the "default" tool for playing music hosted on our NAS drive and, both my wife and my sons accepted it as the "reference" music playing environment. As a consequence, we ended up with a low-end PC (like a RaspberryPi) being always on, and running OpenElec as distribution, connected to our home Hi-Fi. After moving to a new and more "isolated" apartment, I've realized that it would be pretty much useful to receive notifications from our home automation devices (mainly plugs, door contacts and temperature sensors) on the XBMC interface, which is always on. This for example would allow to easily spot someone opening the garage door, while we are inside.

Therefore, I've started working on a simple Dog plug-in (namely an add-on bundle) able to listen to inner Dog notifications and to forward them to XBMC via the XBMC JSON-RPC API. This post reports the complete How-To for anyone wanting to replicate, amend or ameliorate the solution.

#### The start ####
As with any other Dog component, the project starts by defining an empty OSGi bundle using Declarative Services. This can easily be done in Eclipse by selecting **File>New>Plugin project** and by filling-in the needed parameters. Following screenshots report the corresponding steps.

##### Step1 #####

<img src="/assets/img/screenshots/xbmc-addon/new_plugin.png"/ title="first option dialog" alt="first dialog options reported"/>

##### Step 2 #####
<img src="/assets/img/screenshots/xbmc-addon/new_plugin2.png"/ title="second option dialog" alt="second dialog options reported"/>

##### Step 3 #####
<img src="/assets/img/screenshots/xbmc-addon/new_plugin3.png"/ title="third option dialog" alt="third dialog options reported"/>

#### Plugin development as Declarative Service ####

Once the plugin skeleton has been built, it must be configured as a Declarative Service. To do so, we must create a ```OSGI-INF``` folder in the plug-in project and, use Eclipse to create a new *component definition*, by selecting **File>New>Component Definition**, see the screenshots below.

<img src="/assets/img/screenshots/xbmc-addon/declarative_1.png"/ title="folder structure of the Dog add-on after creating the OSGI-INF folder" alt="folder structure of the Dog add-on after creating the OSGI-INF folder"/>

<img src="/assets/img/screenshots/xbmc-addon/declarative_2.png"/ title="The create component definition Dialog" alt="The create component definition Dialog"/>

At this point all the basic  code needed to develop the XBMC addon is in place. We can then create the base class implementing the add-on logic, namely the XBMCNotifier.

#### The XBMCNotifier class ####

<img src="/assets/img/screenshots/xbmc-addon/xbmc_notifier_creation.png" title="class creation dialog" alt="cladd creation dialog for the XBMCNotifier class"/>

After class creation we update the component definition to point to the just created Java object.

<img src="/assets/img/screenshots/xbmc-addon/declarative_3.png"/ title="The updated component information" alt="The updated component information"/>

Then, the design and actual implementation process starts. If we need the bundle to be configurable at runtime, then we will opt to let it implement a so-called *OSGi Managed Service*, i.e. a service able to receive configuration data at runtime. To do so, our ```XBMCNotifier``` class must implement the ```ManagedService``` interface and we need to declare a **service PID** for it inside the component definition file. This, in the end, will permit to correctly associate configurations and corresponding services.

The resulting class will be as follows:

```

/**
 *
 */
package org.doggateway.addons.xbmc.notifier;

import java.util.Dictionary;

import org.osgi.service.cm.ConfigurationException;
import org.osgi.service.cm.ManagedService;

/**
 * @author bonino
 *
 */
public class XBMCNotifier implements ManagedService
{

	/**
	 *
	 */
	public XBMCNotifier()
	{
		// TODO Auto-generated constructor stub
	}

	@Override
	public void updated(Dictionary<String, ?> properties)
			throws ConfigurationException
	{
		// TODO Auto-generated method stub

	}

}

```

#### Service PID and configuration params ####
<img src="/assets/img/screenshots/xbmc-addon/managed_service.png"/ title="Service PID configuration." alt="Service PID configuration."/>

Among the several,, possible, parameters that can be part of the configuration, we will need at least: (a) the set of XBMC servers to which forward the notifications and, (b) the notification classes (types) to forward. The latter could be "encoded" in the configuration, in the first version, and may afterwards be made configurable through dedicated service calls (e.g., through the Dog API).

Since such configuration parameters will be specified in a ```key=value``` properties file, we can fix the allowed keys by defining corresponding constant variables in the ```XBMCNotifier``` class

```
,
// constant keys for accessing configuration data
public static final String XBMC_SERVERS = "xbmc_servers";
public static final String TOPICS_TO_FORWARD = "topics_to_forward";

```

In this first version we will assume to forward the same notifications to all connected XBMC servers. Moreover, we can assume that notifications to forward are filtered on the sole basis of their own topic and ignore other parameters such as the sender module, etc.

For the sake of simplicity, topics to forward will also be the same topics used for listening on the OSGi event bus. This implies that configured topics should be syntactically correct, otherwise no events will be received.

The code responsible for getting, parsing and preparing configuration data is located in the ```update``` method defined by the ```ManagedService``` interface, and could be implemented as follows.

```
	@Override
	/**
	 * Handles configuration data provided through the configuration admin service (Configuration Admin specification)
	 */
	public void updated(Dictionary<String, ?> properties)
			throws ConfigurationException
	{
		// check not null
		if ((properties != null) && (!properties.isEmpty()))
		{
			// configuration data is supposed to be present...

			// get the XBMC servers, different server entries are identifed by
			// comma separation
			String xbmcServerListString = (String) properties
					.get(XBMCNotifier.XBMC_SERVERS);

			// split the string along commas
			String xbmcServerList[] = xbmcServerListString.split(",");

			// check not null or empty
			if ((xbmcServerList != null) && (xbmcServerList.length > 0))
			{
				// fill the inner server list
				// TODO: move to Java8 stream expressions
				for (int i = 0; i < xbmcServerList.length; i++)
				{
					// add to the inner list, trimming leading and trailing
					// spaces
					this.xbmcServers.add(xbmcServerList[i].trim());
				}
			}

			// get the notification topics to forward, for the sake of
			// simplicity these will also be the topics used for listening on
			// the OSGi event bus. This implies that topics should be expressed
			// correctly otherwise no events will be received.

			String topicsListString = (String) properties.get(XBMCNotifier.TOPICS_TO_FORWARD);

			//split the string along commas
			String topicsList[] = topicsListString.split(",");

			//check not null or empty
			if((topicsList!=null)&&(topicsList.length>0))
			{
				//fill the inner topic list
				//TODO: move to Java8 stream expressions
				for(int i=0; i<topicsList.length; i++)
				{
					//add to the inner list, trim leading and trailing spaces
					this.topicsToListen.add(topicsList[i].trim());
				}
			}

			//attempt to register the service, i.e. to subscribe to the given topics.
		}

	}
```

Once configuration data has been correctly handled, and stored for later use, the ```XBMCNotifier``` bundle can be "plugged" in the OSGi framework and in particular can be "attached" to the Dog OSGi Event Bus.

#### Listening to the OSGi event bus ####

This can, in general, be accomplished through proper clauses in the Declarative Services component definition. However, as the actual operation of the bundle depends on the availability of suitable configuration, it is better to opt for *runtime registration of services*, which has to be performed as soon as all the needed parameters are available.

To address such a process, a dedicated registration method is prepared, which takes care of performing the needed operations (see the code snippet below).

```

	@SuppressWarnings("unchecked")
	private void registerService()
	{
		// register the EventHandler service
		Hashtable<String, Object> p = new Hashtable<String, Object>();

		// prepare the notifications
		// this might seem overkill as events are already received as strings
		// however it permits to keep a clear separation between the
		// configuration data format and the inner data structures.
		String topicsArray[] = new String[this.topicsToListen.size()];
		int i = 0;
		for (String topic : this.topicsToListen)
		{
			topicsArray[i] = topic;
			i++;
		}

		// Add this bundle as a listener for the given notifications
		p.put(EventConstants.EVENT_TOPIC, topicsArray);

		// register as EventHandler listening to the given notification topics
		this.eventHandler = (ServiceRegistration<EventHandler>) this.context
				.registerService(EventHandler.class.getName(), this, p);
	}

	/**
	 * remove this service from the framework
	 */
	private void unRegisterService()
	{
		if (this.eventHandler != null)
			this.eventHandler.unregister();
	}
```

The first ```registerService()``` method will be called for registering the ```XBMCNotifier``` as an ```EventHandler``` in the OSGi framework, listening to events dispatched on the given topics (```topicsArray```). The second ```unergisterService()``` method, instead, will unregister the service for a clean shutdown. These methods will respectively be called upon component initialization, when all needed parameters are available, and on shutdown, when all OSGi resources must be cleanly released.

#### Handling bundle activation and deactivation ####

As configuration might happen at any time during the bundle lifetime, the ```registerService()``` method can be called both on bundle activation and on bundle update. This implies that also methods handling the bundle activation and deactivation phases must managed the service registration process (see below);

```

	/**
	 * Handles bundle activation, stores a reference to the bundle context for
	 * performing OSGi-related operations, e.g., registering services.
	 *
	 * @param ctx
	 */
	protected void activate(BundleContext ctx)
	{
		// initialize the logger with a null logger
		this.logger = new LogHelper(ctx);

		// log the activation
		this.logger.log(LogService.LOG_INFO, "Activated XBMCNotifier");

		// store the bundle context
		this.context = ctx;

		// attempt to register the service, i.e. to subscribe to the given
		// topics.
		if ((this.topicsToListen != null) && (!this.topicsToListen.isEmpty())
				&& (this.xbmcServers != null) && (!this.xbmcServers.isEmpty())
				&& (this.eventHandler == null))
		{
			this.registerService();
		}
	}

	/**
	 * Handle the bundle de-activation
	 */
	protected void deactivate()
	{
		// log the de-activation
		if (this.logger != null)
			this.logger.log(LogService.LOG_INFO, "Deactivated XBMCNotifier");

		// de-register the event handler
		this.unRegisterService();
	}
```

The 2 methods above need to be registered as activation and deactivation handlers by adding the proper entries in the component definition file.

<img src="/assets/img/screenshots/xbmc-addon/component_definition.png"/ title="Configuration of activation and deactivation handlers" alt="Configuration of activation and deactivation handlers"/>

Ideally, our bundle is now ready to receive events from the OSGi event bus and to process them for generating XBMC notifications. However, registering in the framework as ```EventHandler``` is not sufficient. The ```XBMCNotifier``` class must in-fact provide the methods defined in the ```EventHandler``` interface to actually receive events. This implies that the ```XBMCNotifier``` must implement the ```EventHandler``` interface, which in turn defines the ```handleEvent``` method.

Event handling in OSGi is a sensible task. Event handlers are typically called in sequence and any task taking long computation times in the event handling process might slow down the entire delivery cycle thus preventing timely delivery of platform events. To avoid such a situation, long tasks (e.g., actual event processing) must be carried outside of the event handling process.

In our case this is accomplished by using an ```ExecutorService``` running submitted tasks in a separate ```Thread```, see below.

```
// create the notification delivery service
// the number of needed threads can be tuned
// depending on the actual event delivery rate
this.notificationDeliveryService = Executors.newSingleThreadExecutor();
```

Such tasks will be realized as classes implementing the ```Runnable``` interface. For example, the picture below shows the corresponding creation wizard in Eclipse, with all needed parameters.

<img src="/assets/img/screenshots/xbmc-addon/notification_task.png"/ title="Creation of the XBMCNotificationTask" alt="Creation of the XBMCNotificationTask"/>

The task skeleton class is reported in the following, where the notification business logic is implemented in the ```run``` method.

```

/*
 * Dog - Addons - XBMC Notifier
 *
 * Copyright (c) 2013-2015 Dario Bonino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
package org.doggateway.addons.xbmc.notifier.tasks;

/**
 * @author bonino
 *
 */
public class XBMCNotificationTask implements Runnable
{

	/**
	 *
	 */
	public XBMCNotificationTask()
	{
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run()
	{
		// TODO Auto-generated method stub

	}

}
```

For the sake of simplicity, we assume to only handle Dog notifications, therefore the task will accept a ```Notification``` as constructor parameter.

```

/**
 * Class constructor, builds an XBMCNotificationTask with a given
 * Notification to be delivered to a given set of Servers.
 */
public XBMCNotificationTask(Notification notification,
		Set<String> xbmcServers, LogHelper logger)
{
	// store the notification to forward
	this.notification = notification;
	// store the logger reference
	this.logger = logger;

	// store tge reference to the servers
	this.xbmcServers = xbmcServers;
}
```

and the corresponding ```handleEvent``` method in the ```XBMCNotifier``` class will reduce to

```
@Override
public void handleEvent(Event event)
{
	// listen to notifications only
	Object eventContent = event.getProperty(EventConstants.EVENT);

	//debug
	this.logger.log(LogService.LOG_INFO, "Received notification: "+event.getTopic());

	if (eventContent instanceof Notification)
	{
		// delivery task
		this.notificationDeliveryService
				.submit(new XBMCNotificationTask(
						(Notification) eventContent, this.xbmcServers,
						this.logger));
	}

}

```

Please note that no checks are performed on the event topic as, by registration, it belongs to the set of notifications to be propagated to XBMC. All other events on the event bus are filtered by the OSGi framework (according to the EventAdmin specification).

Now that everything is complete, we will be able to receive Dog notifications on our XBMC server, like in the figure below. The full code of this simple add-on bundle can be downloaded on [github](https://github.com/dog-gateway/xbmc-notifier-addon)

<img src="/assets/img/screenshots/xbmc-addon/xbmc.png"/ title="Notification on XBMC" alt="Notification on XBMC" width="100%" height="100%"/>
