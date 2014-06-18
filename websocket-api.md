---
layout: default
title: The Dog Gateway - WebSocket API
active: Develop
sidebar: websocket-api-sidebar.html
---
## <a id="start"></a>Dog WebSocket API - Documentation ##

The Dog WebSocket API allows developers to easily integrate home and building automation into their applications, be they web applications, smartphone (Android, iOS, etc.) apps or computer programs.

The API extends the Dog [REST API](rest-api.html) thus maintaining the same message structure and format.

Specifically, it provides a real full duplex connection between Dog, acting as a server, and a client: in this way, it let developers establish an asynchronous, real time, and bi-directional communication.

Have a look at the dedicated guide (*soon*) for an example of usage.

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
A generic JSON message exchanged via the WebSocket API encompasses the following fields. 

|||
|:----|:----|
| **clientId** | The client identifier sent from the server as soon as the connection is established (in a [presentation](#presentation) message). |
| **sequenceNumber** | A number that identify a specific pair request/response. By this number, it is possible to identify to which [request](#request) corresponds a successive [response](#response) message. |
| **messageType** | The type of the message. Possible values are: *request*, *response*, *notification*, or *presentation*. |
| **action** | The action to perform on the server. The values of this field follow the HTTP verbs, since the WebSocket API extend the REST API. Possible values are *GET*, *PUT*, *POST*, or *DELETE*. |
| **endpoint** | It corresponds to the path representing a RESTful resource, as defined in the [REST API](rest-api.html) or here, for the [notification handling](#notification). |
| **parameters** | Depending on the chosen endPoint, some parameters may be needed for successfully send a request. See the [REST API](rest-api.html) documentation for the list of parameters, in JSON format, accepted by the selected endPoint (i.e., RESTful resource). |
| **response** | Content on the response. |
| **notification** | Content of the notification. |

According to the different message type, some fields may not be present, as shown in the following sections.

---
#### <a id="presentation"></a> Presentation ####
*Updated on Thu, 2014-06-12*
<span class="label label-info pull-right">API version 1.0</span>

As soon as a client establishes a connection with Dog, a *presentation message* is sent to the client with the following information:

* *clientId*: client unique identifier (set by the server)
* *messageType*: type of the message; in this case, the field contains the value: `presentation`

**Example**

	{
  		"clientId":"1f7170d4",
  		"messageType":"presentation",
	}
	
---
#### <a id="request"></a> Request ####
When a connection has been established, to request any information as provided by the [REST API](rest-api.html), the client has to sent a JSON formatted message with the following field.
The order of the fields is not important but no empty fields **should** be present.

* *clientId*: the client identifier sent in the [presentation](#presentation) message
* *sequenceNumber*: number that identify the request, set by the client; the same number will be present in the corresponding [response](#response) message.
* *messageType*: type of the message; in this case, it contains the value: `request`
* *action*: action to perform on the server; the value of this field depends from the chosen request, and corresponds to the HTTP verb of a RESTful resource (see the [REST API](rest-api.html) for the the possible alternatives).
* *endPoint*: it is the path representing the chosen RESTful resource; it corresponds to the URI of a RESTful resource (see the [REST API](rest-api.html) for the the possible alternatives).
* *parameters* (optional): depending on the chosen endPoint (i.e., the RESTful resource) some parameters may be needed.

**Example**

The following message asks for the [status](rest-api.html#status-single) of the device identified by `MeteringPowerOutlet_3`.

	{
		"clientId":"1f7170d4",
		"sequenceNumber":"1",
		"messageType":"request",
		"action":"GET",
		"endPoint":"/api/v1/devices/MeteringPowerOutlet_3/status"
	}
	
---
#### <a id="response"></a> Response ####
*Updated on Thu, 2014-06-12*
<span class="label label-info pull-right">API version 1.0</span>

Responses consist of JSON formatted messages with the following fields:

* *clientId*: client identifier
* *sequenceNumber*: number that identifies the request to which this response replies.
* *messageType*: type of the message; in this case, it contains the value: `response`
* *action*: action that was performed on the server; possible values are *GET*, *PUT*, *POST*, or *DELETE*
* *endPoint*: the URI corresponding to the RESTful resource present in the corresponding request
* *response*: content of the response

**Example**

The following message represent a response for the previous example request.

	{
		"clientId" : "1f7170d4",
		"messageType" : "response",
		"sequenceNumber" : "1",
		"action" : "GET",
		"endPoint" : "/api/devices/MeteringPowerOutlet_3/status",
		"response" :
		{
			"id" : "MeteringPowerOutlet_3",
			"description" : "Kitchen's Wireless Metering Power Outlet",
			"active" : true,
			"status" :
			{
				"SinglePhaseActiveEnergyState" :
				[
					{
						"value" : "0.0 kWh"
					}
				],
				"OnOffState" :
				[
					{
						"value" : "off"
					}
				],
				"SinglePhaseActivePowerMeasurementState" :
				[
					{
						"value" : "0.0 W"
					}
				]
			}
		}
	}

---
#### <a id="notifications"></a>Notifications ####
A client can subscribe (and unsubscribe) the receptions of one or more notifications, in JSON format.
A notification is a message autonomously sent by a device controlled by Dog, without any explicit request.
Typically, it represent an *event* that throws the notification and update the corresponding device status. See the [device reference](device-documentation.html) for further details on which notifications are available for all devices.

Five types of notification-related messages can be sent and received:

* **subscription** of one or more notifications for all the controllable devices;
* **subscription** of one or more notifications for a chosen device;
* **unsubscription** of one notification for all the controllable devices;
* **unsubscription** of one notification for a chosen device;
* the "real" **notification** message.

#### Notification subscription ####
*Updated on Thu, 2014-06-12*
<span class="label label-info pull-right">API version 1.0</span>

Subscription messages follow the same structure of a generic [request](#request) message.

The action and the endpoints are represented by the following method and URLs, respectively:

|Method|Description|
|:-----|:----------|
| POST | Create a new notification subscription. |

For subscribing notifications for all devices:
*URL:* /api/v1/subscriptions/devices/notifications

For subscribing notifications for a chosen devices:
*URL:* /api/v1/subscriptions/devices/{device-id}/notifications

A request body can indicate what notification type the client would receive. The `*` wildcard is used to identify all the possible notification types.

**Example Request**

	{
		"clientId":"1f7170d4",
		"sequenceNumber":"1",
		"messageType":"request",
		"action":"POST",
		"endPoint":"/api/v1/subscriptions/devices/notifications"
		"parameters":"*"
	}

**Example Response**

	{
		"clientId":"1f7170d4",
		"messageType":"response",
		"sequenceNumber":"1",
		"action":"POST",
		"endPoint":"/api/v1/subscriptions/devices/notifications",
		"response": 
		{
			"result":"Registration completed successfully"
		}
	}

#### Notification unsubscription ####
*Updated on Thu, 2014-06-12*
<span class="label label-info pull-right">API version 1.0</span>

Unsubscription messages follow the same structure of a generic [request](#request) message.

The action and the endpoints are represented by the following method and URLs, respectively:

|Method|Description|
|:-----|:----------|
| DELETE | Remove an existing notification subscription. |

For unsubscribing a specific notification for all devices:
*URL:* /api/v1/subscriptions/devices/notifications/{notification-id}

For unsubscribing a specific notification for a chosen devices:
*URL:* /api/v1/subscriptions/devices/{device-id}/notifications/{notification-id}

**Example Request**

	{
		"clientId":"1f7170d4",
		"sequenceNumber":"1",
		"messageType":"request",
		"action":"DELETE",
		"endPoint":"/api/v1/subscriptions/devices/notifications/OnOffNotification"
	}

**Example Response**

	{
		"clientId":"1f7170d4",
		"messageType":"response",
		"sequenceNumber":"1",
		"action":"DELETE",
		"endPoint":"/api/v1/subscriptions/devices/notifications/OnOffNotification",
		"response": 
		{
			"result":"Unregistration completed successfully"
		}
	}
	
	
#### Notification message ####
*Updated on Thu, 2014-06-12*
<span class="label label-info pull-right">API version 1.0</span>

A notification message consists of JSON formatted message containing the following fields:

* *clientId*: client identifier
* *messageType*: type of the message; in this case, it is set to `notification`
* *notification*: content of the notification

**Example**

	{
		"clientId":"1f7170d4",
		"messageType":"notification",
		"notification":
		{
			"notificationTopic":"SinglePhaseActiveEnergyMeasurementNotification",
			"notificationName":"newActiveEnergyValue",
			"value":"16.648 kWh",
			"deviceUri":"SinglePhaseElectricityMeter_7"
		}
	}

---
#### <a id="browser-comp"></a> Browser Compatibility ####

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

