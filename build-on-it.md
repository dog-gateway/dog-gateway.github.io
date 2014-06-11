---
layout: default
title: The Dog Gateway - Build on it
active: Develop
sidebar: build-on-it-sidebar.html
---
# Build on It! #

Want to build your own application once and deploy it everywhere, regardless of the available home, building or industrial automation systems?
The Dog Gateway offers a technology independent REST API upon which you can build your own web applications, mobile apps, or whatever you imagine.
Moreover, it offers a Streaming API, based on the WebSocket technology, that extends the functionalities provided by the REST API.
Exploit the power of standard web technology and interaction paradigms to boost up your productivity and to free your talent, start building now!

## Dog REST API - Summary ##

The Dog REST API allows developers to easily integrate home and building automation into their applications, be they web applications, smartphone (Android, iOS, etc.) apps or computer programs.

APIs allow to:

* manage connected devices
	* [query the gateway about installed devices, their location, functionalities and configurations](rest-api.html#devices);
	* [require execution of commands to existing devices](rest-api.html#command);
	* [monitor device statuses and measures in real-time](rest-api.html#status);
	* add or update the set of devices controlled through the gateway;
	* update the [location](rest-api.html#device-location) and the [description](rest-api.html#device-description) of a device controlled through the gateway;
* manage information about the environment
	* [insert](rest-api.html#rooms-in-flat), [update or delete](rest-api.html#single-room-in-flat) rooms;
	* [insert](rest-api.html#flats), [update or delete](rest-api.html#single-flat) flats;
* manage rules and automation scenarios
	* [insert](rest-api.html#rules), [update, or delete](rest-api.html#single-rule) automation rules;
	* insert, update, or delete scenarios;
* monitor the home/building performance
	* historical information on consumptions;
	* historical information on activations;
	* related statistics;
* manage Dog 
	* manage system performance;
	* manage system updates;
	* troubleshoot problems.

API access is currently available over HTTP, at:

  `http://<dog-address>/api/v1`. 

To select the desired response type (JSON or XML), the `Accept` HTTP header must be used in the request.
In the same way, a proper `Content-Type` *must* be always present for `PUT` and `POST` requests.

See the [REST API](rest-api.html) documentation for further information.


## Dog WebSocket API - Summary ##

The Dog WebSocket API extends the Dog REST API and maintains the same message structure and format employed in it.

Specifically, it provides a real full duplex connection between Dog, acting as a server, and a client: in this way, it let developers establish an asynchronous, real time, and bi-directional communication.

Moreover, it introduces the possibility for a client to receive notifications from the devices present in the environment.

See the [WebSocket API](websocket-api.html) documentation for further information and have a look at the dedicated [guide](websocket-howto.html).