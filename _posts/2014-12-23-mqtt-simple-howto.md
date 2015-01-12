---
layout: post
title:  "Testing the MqttBridge bundle"
date:   2014-12-23 15:22
categories: development-howto
active: Develop
---
This How-To aims at providing the basics to start experimenting/developing with MQTT and the corresponding Dog MqttBridge bundle. [MQTT](http://mqtt.org) is a lightweight protocol mainly designed for transferring telemetry data, with configurable reliability. It adopts a publish/subscribe communication paradigm based on a central broker (e.g., [Mosquitto](http://mosquitto.org)). Delivered data belongs to specific topics which allow subscribers to select needed streams, only. Topics are hierarchically organized and wildcard constructs are provided to allow subscription to entire families of messages (see for further references). 

Although being originally designed for telemetry (short messages, with high frequencies), the MQTT protocol is emerging as a viable solution for IoT device communication due to some very interesting features:

* The ability to cross LAN boundaries (being based on a central, possibly publicly accessible broker)
* The ability to transfer high-frequency data streams (rates of 1 message per millisecond are gracefully handled)
* The transferred payload is completely opaque (bytes) and can thus host almost any data format, given that it can be safely converted in bytes.

Moreover, MQTT is widely supported and libraries for transmitting (publishing) and receiving (subscribing) data are available for almost all programming languages (see the [Eclipse Paho](http://eclipse.org/paho) initiative, as an example).

For these reasons, we, at the Dog Gateway, decided to offer developers the ability to get real-time information about devices handled by Dog also through MQTT. As data handling may greatly vary depending on applications, context, scenarios, we decided to offer a very flexible and customizable solution that should be able to fulfill many adoption cases. Rather than providing a single monolithic implementation with "proprietary" message formats, we defined a simple, OSGi-based mechanism for defining data-translation (encoding/decoding) mechanisms, which can be plugged as OSGi services and exploited on a per-broker setting.

To better understand how this works, we analyze a simple case of MQTT-based event delivery and we show how-to subscribe to such a stream of data, with a simple Python script.

### Default MQTT translation and data transmission
The MqttBridge offers a base translation facility which converts inner device statuses and notification events into the very same JSON representations provided through the WebSocket APIs (or through the REST APIs, when applicable). The only operation to perform for enabling delivery over MQTT are:

1.	the installation of the MqttBridge bundle, and of the required dependencies
2.	the creation of a suitable configuration for identifying data to be translated, topics and brokers to which the information must be delivered

While the former operation should be familiar for anyone involved in OSGi-based products, the second one needs further explanations. To be able to delivery information over MQTT a couple of configuration parameters shall be specified. The following box reports an excerpt of a sample configuration file for the MqttBridge.

```
#######----  Notification 2 MQTT Bridge configuration ----########

# The MQTT broker(s) addresses in the format host1:port1,host2:port2,...,hostn:portn
mqtt_broker = localhost:1883

# The MQTT QoS to use, AT_MOST_ONCE, AT_LEAST_ONCE, EXACTLY_ONCE
mqtt_qos = AT_MOST_ONCE

#-------- The MQTT topics, shared between all connected brokers -----------

# root-topic
mqtt_root_topic = /dogmqtt

# notifications root topic
mqtt_notification_root_topic = notifications

# states root topic
mqtt_state_root_topic = states

## TODO: check if a pattern for defining single subtopics can be provided at
## configuration time

#-------------------------------------------------------------------------

#------ The Events to bridge --------

bridge_notifications = true
bridge_states = true

#------------------------------------

#------- The Event translators to use -------

# base translators
# the qualified name of a translator service available in the framework
notification2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleNotificationTranslator
state2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleStateTranslator

#host-specific translator
localhost-1883-notification2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleNotificationTranslator
localhost-1883-state2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleStateTranslator

#--------------------------------------------

```
Four main sections can be identified, respectively referring to: 
1. broker identification, 
2. topic definition,
3. data filtering and 
4. translation. 

#### Broker identification


The MqttBridge can deliver messages to multiple brokers, each identified by an ```address:port``` couple provided as value of the ```mqtt_broker``` configuration parameter. Multiple couples can be specified using a comma ```,``` as separator character. 

In the current release, the MQTT Quality of Service level is uniformly applied to all active connections and can be specified through the ```mqtt_qos``` configuration parameter, where the only allowed values include: ``` AT_MOST_ONCE```,```AT_LEAST_ONCE``` and ```EXACTLY_ONCE``` values.

#### Topic definition

Topics for event delivery are defined by means of three parameters: ```mqtt_root_topic```,```mqtt_notification_root_topic``` and ```mqtt_state_root_topic```. They are combined in the following pattern to define spefic topics for state and notification events.

```
# notification topics
/<mqtt_root_topic>/<mqtt_notification_root_topic>/<notification_type>/<device_uri>

# state topics
/<mqtt_root_topic>/<mqtt_state_root_topic>/<device_uri>
```

Aggregations are allowed at different hierarchy levels thanks to wildcard operators. For example, to catch all notifications from a given sensor, e.g., sensor1, the subscription topic could be:

```
/root/notification_root/+/sensor1
```

whereas for subscribing to all temperature measurement notifications the subscription topic can be:

```
/root/notification_root/temperaturemeasurementnotification/#
```

The same applies to state events.

#### Data filtering
Currently the MqttBridge can be configured to either dispatch notifications or states, or both, over MQTT through the ```bridge_notifications``` and ```bridge_states``` parameters. The former enables (when ```true```) delivery of notification events to connected MQTT brokers, while the latter enables dispatching states (when ```true```). Any combination of the two flags is allowed.

#### Data translation
As inner event structures used by Dog can seldom be exploited directly, especially in application scenarios where the payload formats should adhere to externally specified standards (e.g., [Xively MQTT] (https://xively.com/dev/docs/api/communicating/mqtts/)) a flexible, per-broker, data translation mechanism is provided.

Three translation layer can be exploited:

1. By default a simple translation service is provided that exploits the JSON serialization adopted in both the Websocket and the REST APIs. To use such a service, it is sufficient to leave empty the data translation section

2. Two shared translator classes could be specified to respectively handle all state and all notification events. The translator class is identified through its fully qualified Java name:
```
notification2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleNotificationTranslator
state2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleStateTranslator
```
In this case, the MqttBridge bundle will look-up for services implementing the ```NotificationTranslator``` and ```StateTranslator``` interfaces, and check their actual implementation class against the names given in the configuration. In case of match, the first occurrence of each translator type (either notification or state) will be used as base translator service. If, instead, no translator service is registered within the framework, the default inner translation service (see point 1) will be exploited. 

3. Specific translator classes could be specified for each MQTT broker configured in the broker_address parameter. In such a case, the broker address is pre-pended (with colons replaced by underscores) to the configuration parameter name, and the corresponding class is looked-up in the set of available OSGi services, with the same approach used in point 2 (look-up for services implementing the ```NotificationTranslator``` and ```StateTranslator``` interfaces, and check their actual implementation class against the names given in the configuration). 
```
localhost-1883-notification2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleNotificationTranslator
localhost-1883-state2mqtt = it.polito.elite.dog.addons.mqtt.translators.SimpleStateTranslator
```
If no translator service if found, the base translators defined in point 2 are used, and if also those translators are missing the inner ones are exploited.

### Testing
To test that the MqttBridge is actually working and that the provided configuration is valid and working as expected, an MQTT broker and a "catch all" client are needed.

The former can be easily installed on Windows, Mac and Linux-based machines. In this example we consider the case in which a [Mosquitto](http://mosquitto.org) broker is selected. In such a case, under Linux it is sufficient to exploit the system packet manager to install a working mosquitto version (check if additional repositories are needed for you distribution). Packages are available for:

* Arch Linux
* CentOS
* Debian
* Fedora
* FreeBSD
* Gentoo
* OpenSUSE
* OpenWRT
* Raspbian
* Red Hat Enterprise Linux
* Slackware
* SUSE Linux Enterprise Server
* Ubuntu 

For Windows and Mac systems, binary disributions are also available

Once installed the broker, a "catch all" MQTT client shall be exploited to subscribe to all generated messages and thus verify the overall tool chain functionality. While this can be easily written in almost any language supported by the [Eclipse Paho](http://eclipse.org/paho) libraries, it seems reasonable to show a sample Python client as an example.

#### Catch-all Python client
To catch all MQTT events generated by the MqttBridge bundle, it is sufficient to subscribe to the ```<mqtt_root_topic>``` stream on the broker. Assuming that in our example the root topic parameter value is ```dogmqtt```, the topic to subscribe to will be ```\dogmqtt\#```.

The full Python client is reported below and also downloadable as a GitHub [Gist](https://gist.github.com/dbonino/e33b499f31f5b886f425).

``` Python
#!/usr/bin/python
'''
Created on Nov 4, 2014

@author: bonino
'''
import paho.mqtt.client as mqtt 
import time
import getopt
import sys
 
 
mqtt_broker = "localhost"
mqtt_port = 1883
mqtt_topic = "/#"
mqttc = mqtt.Client("mosquitto_dump",True,None,mqtt.MQTTv31)
 
 
def on_message(mqttc, obj, msg):
    payload = str(msg.payload)
    print(msg.topic + " Payload -> \n" + payload)
    
def on_connect(mqttc, userdata, flags, rc):
    print ("rc= %s")%rc
    print "connected, now subscribing..."
    topics = mqtt_topic.split(";")
    for topic in topics:
        mqttc.subscribe(topic, 0)
    
def on_disconnect(client, userdata, rc):
    time.sleep(10)
    print "re-connecting..."
    mqttc.connect(mqtt_broker, mqtt_port, 60)
    
def usage():
    print "Mosquitto Dump utility"
    print "Usage: mosquitto_dump -h mqtt_broker -p port -t topic"
 
def main():
    #reference to the global variables
    global mqtt_broker
    global mqtt_port
    global mqtt_topic
    
    try:
        opts, args = getopt.getopt(sys.argv[1:], "h:p:t:", ["mqttbroker=", "port=", "topic="])
    except getopt.GetoptError as err:
        # print help information and exit:
        print str(err) # will print something like "option -a not recognized"
        usage()
        sys.exit(2)
        
    #handle options
    for o, a in opts:
        if o in ("-h", "--mqttbroker"):
            mqtt_broker = a
        elif o in ("-p", "--port"):
            mqtt_port = a
        elif o in ("-t", "--topic"):
            mqtt_topic = a
        else:
            assert False, "unhandled option"
    
    #business logic to build the mqtt client
    try:        
        #building the client
        print "building the client"
        mqttc.on_message = on_message
        mqttc.on_connect = on_connect
        
        print "connecting..."
        mqttc.connect(mqtt_broker, mqtt_port, 60)
        
        mqttc.loop_forever()
    except KeyboardInterrupt:
        print "stopped"
    
if __name__ == '__main__':
    main()
```

This script can be run from the command line to get the data generated by the MqttBridge bundle, by typing

``` bash
./mosquitto_dump.py -h <broker-host> -p <broker-port> -t /dogmqtt/# 
```

Next posts will show how to define specific translator services, e.g., for Xively.
