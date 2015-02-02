---
layout: post
title:  "Testing the WebSocket bundle"
date:   2015-01-13 08:45
categories: development-howto
active: Develop
---
This How-To aims at providing the basics to start experimenting/developing with WebSocket and the corresponding Dog WebSocket bundles. WebSocket is a W3C/IETF standard providing full-duplex communication channels over a single TCP connection. The WebSocket standard simplifies much of the complexity around bi-directional web communication and connection management, with the objective to enable effective real-time (event-driven) communication with minimal latency. It uses a dedicated protocol, instead of relying on HTTP.

Moreover, WebSocket is widely supported and libraries for transmitting and receiving data are available for almost all programming languages, like Java, javascript, Python, Ruby, etc.

For these reasons, we, at the Dog Gateway, decided to offer developers the ability to get real-time information from Dog through WebSocket. In order to minimize the knowledge required by developers, we decided to reuse the same data structures and message formats already employed in the REST API, when possible. Rather than providing a single, monolithic, implementation in a OSGi bundle, we defined a set of bundles, easily extensible:

- the [WebSocket Connector](https://github.com/dog-gateway/websocket-connector) is a **mandatory** bundle and is responsible for handling the WebSocket connection in Dog; it also act as a "dispatcher" for the following bundles
- the [WebSocket Device API](https://github.com/dog-gateway/websocket-device-api) is able to provide all the device-related information, including real-time information (called *notifications*); without this bundle, the Dog WebSocket functionalities are still working but Dog is not able to provide information about devices
- the [WebSocket Environment API](https://github.com/dog-gateway/websocket-environment-api) provides all the environment-related information, as defined in the [Environment REST API](http://dog-gateway.github.io/rest-api.html#environment)

Developers, in this way, (a) can cover different aspects of the Dog REST API with a minimum effort and (b) can implement all the adjunctive functionalities that they need, regardless of the REST API.
The WebSocket bundles required their own [dependencies](https://github.com/dog-gateway/websocket-dependencies) and most of the REST API dependencies. In the current implementation, they rely on the [jetty](http://eclipse.org/jetty/) webserver.

To better understand how this works, we analyze the WebSocket configuration in Dog and we show how to get the status of all devices and how to subscribe to all the device notifications, with a simple Python script.

### Add the WebSocket functionalities to Dog
To add the WebSocket functionalities in your instance of Dog is really trivial, assuming that the REST API are working properly. You can download the update version of the Dog gateway, that includes the WebSocket connection or you may install the needed components "by hand".

In the former case, you can skip the following explanation and go directly to the *Add the WebSocket configuration* part of this tutorial.

For the second case, download the WebSocket Connector bundle and the WebSocket dependencies and put them in the `communication` and `dependencies/websocket` folders inside the Dog directory, respectively. Then, you have to decide what functionalities you want to provide via WebSocket: currently, the choice is between device and environment related information. We take both: download both the bundles and put them in the `communication` folder.
Two more steps are missing:

1. let Dog discover the new installed dependencies;
2. add a specific configuration for the WebSocket connection.

#### Let Dog be aware of the WebSocket dependencies
To use the WebSocket functionalities, open the configuration file name `config.ini` (it is in the `configuration` folder) and add `./dependencies/websocket` to the `felix.fileinstall.dir` line. The result should be similar to:

```
...

#Options
#The directories watched by Felix File Install...
felix.fileinstall.dir=./configuration/config,./drivers,./admin,./dependencies/rest,./communication/,./addons,./dependencies/websocket

...
```

#### Add the WebSocket configuration
As the final configuration step, create a text file named `it.polito.elite.dog.communication.websocket.connector.cfg` in the `configuration/config` folder. This configuration tells Dog at what address to make available the WebSocket endpoint:

```
WEBSOCKETPATH=/ws
```

For the reported example, the WebSocket endpoint will be available at the address `ws://<Dog-address>:<Dog-port>/ws`. Note that `ws://` identifies the WebSocket protocol, while `Dog-address` and `Dog-port` are defined in the REST API configuration (e.g., `localhost:8080`).

A full working example of this configuration can be found in the [dedicated GitHub repository](https://github.com/dog-gateway/websocket-configuration). 

### Testing
To test that the WebSocket connection is actually working and that the provided configuration is valid and working as expected, a client is needed.

In our example, we realize the WebSocket client in Python, using the [ws4py](https://ws4py.readthedocs.org) library. The library can be easily installed with the `pip` or `easy_install` tools.

The full Python client is reported below and also downloadable as a GitHub [Gist](https://gist.github.com/luigidr/151985965d177bdadaf8).

<script src="https://gist.github.com/luigidr/151985965d177bdadaf8.js"></script>

This script can be run from the command line to get the data generated by the WebSocket bundles, by typing

``` bash
./ws-py.py -h <Dog-address> -p <Dog-port> -pr /ws 
```
