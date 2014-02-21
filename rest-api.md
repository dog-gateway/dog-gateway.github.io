--- 
layout: default 
title: The Dog Gateway - Rest API 
active: Rest Api
sidebar: rest-api-sidebar.html
---

## Dog REST API - Documentation ##


The Dog REST API allows developers to easily integrate home and building automation into their applications, be they web applications, smartphone (Android, iOS, etc.) apps or computer programs.

APIs allow to:

* manage connected devices
	* [query the gateway about installed devices, their location, functionalities and configurations](#devices);
	* [require execution of commands to existing devices](#command);
	* [monitor device statuses and measures in real-time](#status);
	* add or update the set of devices controlled through the gateway;
	* update the [location](#device-location) and the [description](#device-description) of a device controlled through the gateway;
* manage information about the environment
	* [insert](#rooms-in-flat), [update](#single-room-in-flat) or delete rooms;
	* [insert](#flats), [update](#single-flat), or delete flats;
* manage rules and automation scenarios
	* [insert](#rules), [update, or delete](#single-rule) automation rules;
	* insert, update, or delete scenarios;
* monitor the home/building performance
	* historical information on consumptions;
	* historical information on activations;
	* related statistics;
* manage Dog 
	* manage system performance;
	* manage system updates;
	* troubleshoot problems.

All API access is currently over HTTP, and accessed from `http://<dog-address>/api/`.
To select the desired response type (JSON or XML), the `Accept` header must be used in the request.

#### Function summary ####

|||
|----|----|
|[Resource /devices](#devices)|Represents domotic devices handled by Dog and "controllable" by applications using this API. |
|[Resource /devices/{device-id} ](#singleDevice)|Represents a single domotic device handled by Dog, identified by a unique *device-id* (currently encoded in the *id* attribute for the XML response to the [GET /devices](#devices) request), and "controllable" by applications using this API. |
|[Resource /devices/{device-id}/location ](#device-location)|Update the location of a single domotic device handled by Dog, identified by a unique *device-id*. |
|[Resource /devices/{device-id}/description ](#device-description)|Update the description (i.e., the long name) of a single domotic device handled by Dog, identified by a unique *device-id*. |
|[Resource /devices/status](#status)|Represents the status of devices registered in the Dog gateway runtime, i.e., defined in the Dog [configuration](#devices) and successfully registered within the gateway runtime.|
|[Resource /devices/{device-id}/status](#status-single)|Represents the status of the device identified by the given *device-id*, registered in the Dog gateway runtime, i.e., defined in the Dog [configuration](#devices) and successfully registered within the gateway runtime.|
|[Resource /devices/{device-id}/commands/{command-name} ](#command)|Represents a command, identified by a *command-name*, to be sent to the device identified by the given *device-id*. Commands are idempotent: the same command always results in the same behavior of the selected device. If the command brings the device in same state in which the device is, no differences will be appreciable.|
|[Resource /dog/configuration](#dogConfiguration)| Unsupported, to be implemented in future... |
|[Resource /environment](#environment)|Represents the environment (i.e., the building) configured in Dog.|
|[Resource /environment/flats](#flats)|Represents all the flats present in the environment (i.e., the building).|
|[Resource /environment/flats/{flat-id}](#single-flat)|Represents a specific flat present in the environment (i.e., the building).|
|[Resource /environment/flats/{flat-id}/rooms](#rooms-in-flat)|Represents all the rooms present in a given flat.|
|[Resource /environment/flats/{flat-id}/rooms/{room-id}](#single-room-in-flat)|Represents a specific room present in a given flat in the environment (i.e., the building).|
|[Resource /rules/](#rules)|Represents the rules registered in Dog. By using this resource, it is possible to get all the existing rules or add a new rule.|
|[Resource /rules/{rule-id}](#single-rule)|Represents a single rule registered in Dog. By using this resource, it is possible to update or delete an existing rule.|

---------------------------------

#### <a id="devices"></a> Resource /devices ####

*Updated on Mon, 2014-01-22*
<span class="label label-info pull-right">API version 1.0</span>

Represents domotic devices handled by Dog and "controllable" by applications using this API.

**URL:** /devices

|Method|Description|
|:-----|:----------|
| GET | List all devices (with their details) used by the Dog gateway |

**Example Request**

	GET http://www.mydog.com/api/devices
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='1' %}
<pre class="pre-scrollable">

	{
	  "devices" : [ {
	    "description" : "The ZWave X gateway",
	    "id" : "zwave-gateway",
	    "isIn" : demo_room,
	    "domoticSystem" : "ZWave",
	    "class" : "ZWaveGateway",
	    "controlFunctionality" : [ {
	       "commands" : [ {
	          "param" : [ {
	            "name" : "realCommandName",
	            "value" : "associate"
	          } ],
	          "name" : "AssociateCommand_zwave-gateway",
	          "id" : "AssociateCommand_zwave-gateway",
	          "class" : "AssociateCommand"
	        }, {
	          "param" : [ {
	            "name" : "realCommandName",
	            "value" : "disassociate"
	          } ],
	          "name" : "DisassociateCommand_zwave-gateway",
	          "id" : "DisassociateCommand_zwave-gateway",
	          "class" : "DisassociateCommand"
	        } ],
	      "class" : "AssociateFunctionality"
	    } ]
	  }, {
	    "description" : "A MainsPowerOutlet instance named MainsPowerOutlet_ZW1",
	    "isIn" : "demo_room",
	    "controlFunctionality" : [ {
	       "commands" : [ {
	          "param" : [ {
	            "name" : "realCommandName",
	            "value" : "off"
	          } ],
	          "name" : "OffCommand_Lamp_Holder",
	          "id" : "OffCommand_Lamp_Holder",
	          "class" : "OffCommand"
	        }, {
	          "param" : [ {
	            "name" : "realCommandName",
	            "value" : "on"
	          } ],
	          "name" : "OnCommand_Lamp_Holder",
	          "id" : "OnCommand_Lamp_Holder",
	          "class" : "OnCommand"
	        } ],
	      "class" : "OnOffFunctionality"
	    } ],
	    "notificationFunctionality" : [ {
	       "notification" : [ {
	          "param" : [ {
	            "name" : "notificationName",
	            "value" : "stateChanged"
	          }, {
	            "name" : "notificationParamName",
	            "value" : "newState",
	            "type" : "State"
	          } ],
	          "id" : "StateChangeNotification_Lamp_Holder",
	          "class" : "StateChangeNotification"
	        } ],
	      "class" : "StateChangeNotificationFunctionality"
	    } ],
	    "state" : [ {
	       "statevalues" : [ {
	          "name" : "off",
	          "class" : "OffStateValue"
	        }, {
	          "name" : "on",
	          "class" : "OnStateValue"
	        } ],
	      "class" : "OnOffState"
	    } ],
	    "id" : "Lamp_Holder",
	    "domoticSystem" : "ZWave",
	    "gateway" : "zwave-gateway",
	    "class" : "LampHolder"
	  }
	}
</pre>


{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='2' %}
<pre class="pre-scrollable">
{% include configuration-response.xml %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}


