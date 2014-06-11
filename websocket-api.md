---
layout: default
title: The Dog Gateway - WebSocket API
active: Develop
---
## Dog WebSocket API - Documentation ##

The Dog WebSocket API allows developers to easily integrate home and building automation into their applications, be they web applications, smartphone (Android, iOS, etc.) apps or computer programs.

The API extends the Dog [REST API](rest-api.html) thus maintaining the same message structure and format.

Specifically, it provides a real full duplex connection between Dog, acting as a server, and a client: in this way, it let developers establish an asynchronous, real time, and bi-directional communication.

Have a look at the dedicated [guide](websocket-howto.html) for an example of usage.

Like the REST APIs, the WebSocket APIs allow to:

* manage connected devices
	* query the gateway about installed devices, their location, functionalities and configurations;
	* require execution of commands to existing devices;
	* monitor device statuses and measures in real-time;
	* update the location and the description of a device controlled through the gateway;
* manage information about the environment
	* insert, update or delete rooms;
	* insert, update or delete flats.

Moreover, they allows a client to:

* manage notifications coming from connected devices
	* subscribe to one or more notification coming from them;
	* unsubscribe to one or more notification coming from them;
	* receive notifications as soon as they happen in the environment.

API access is currently available over the standard WebSocket protocol, at:

  `ws://<dog-address>/ws`.

All the messages handled by the API are in JSON format.
Refer to the [REST API](rest-api.html) for the possible responses coming from the common functionalities.

#### Summary ####

---
#### JSON structure ####

---
#### Presentation ####

---
#### Request ####

---
#### Response ####

---
#### Notifications ####

---
#### Browser compatibility ####

Nowadays, WebSocket is compatible with most of the major desktop and mobile browsers.
To check if your browser supports WebSocket, visit http://www.websocket.org/demos.html

**Supported Desktop Browser**

* Google Chrome (from Version 8)
* Apple Safari (from Version 5)
* Mozilla Firefox (from Version 4)
* Opera (from Version 4)
* Internet Explorer (from Version 10)

Firefox 4 and Opera 11 have their WebSocket support disabled by default.


**Supported Mobile Browser**

* Google Chrome (from version 16)
* Firefox Mobile (from version 11)
* Opera Mobile (from version 12.10)
* Apple Safari (from iOS 4.2)
* Blackberry Browser (from Version 6)

