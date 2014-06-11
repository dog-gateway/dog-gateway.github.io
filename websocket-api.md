---
layout: default
title: The Dog Gateway - Rest API
active: Develop
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
	* [insert](#rooms-in-flat), [update or delete](#single-room-in-flat) rooms;
	* [insert](#flats), [update or delete](#single-flat) flats;
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

API access is currently available over HTTP, at:

  `http://<dog-address>/api/v1`. 

To select the desired response type (JSON or XML), the `Accept` HTTP header must be used in the request.
In the same way, a proper `Content-Type` *must* be always present for `PUT` and `POST` requests.

#### Function summary ####


|||
|:----|:----|
|[Resource /devices](#devices) | Represents domotic devices handled by Dog and "controllable" by applications using this API. |
|[Resource /devices/{device-id} ](#singleDevice) | Represents a single domotic device handled by Dog, identified by a unique *device-id* (currently encoded in the *id* attribute for the XML response to the [GET /devices](#devices) request), and "controllable" by applications using this API. |
|[Resource /devices/{device-id}/location ](#device-location) | Update the location of a single domotic device handled by Dog, identified by a unique *device-id*. |
|[Resource /devices/{device-id}/description ](#device-description) | Update the description (i.e., the long name) of a single domotic device handled by Dog, identified by a unique *device-id*. |
|[Resource /devices/status](#status) | Represents the status of devices registered in the Dog gateway runtime, i.e., defined in the Dog [configuration](#devices) and successfully registered within the gateway runtime.|
|[Resource /devices/{device-id}/status](#status-single) | Represents the status of the device identified by the given *device-id*, registered in the Dog gateway runtime, i.e., defined in the Dog [configuration](#devices) and successfully registered within the gateway runtime. | 
|[Resource /devices/{device-id}/commands/{command-name} ](#command)|Represents a command, identified by a *command-name*, to be sent to the device identified by the given *device-id*. Commands are idempotent: the same command always results in the same behavior of the selected device. If the command brings the device in same state in which the device is, no differences will be appreciable.|
|[Resource /dog/configuration](#dogConfiguration) | Unsupported, to be implemented in future... |
|[Resource /environment](#environment) | Represents the environment (i.e., the building) configured in Dog.|
|[Resource /environment/flats](#flats) | Represents all the flats present in the environment (i.e., the building).|
|[Resource /environment/flats/{flat-id}](#single-flat) | Represents a specific flat present in the environment (i.e., the building).|
|[Resource /environment/flats/{flat-id}/rooms](#rooms-in-flat) | Represents all the rooms present in a given flat.|
|[Resource /environment/flats/{flat-id}/rooms/{room-id}](#single-room-in-flat) | Represents a specific room present in a given flat in the environment (i.e., the building).|
|[Resource /rules/](#rules) | Represents the rules registered in Dog. By using this resource, it is possible to get all the existing rules or add a new rule.|
|[Resource /rules/{rule-id}](#single-rule) | Represents a single rule registered in Dog. By using this resource, it is possible to update or delete an existing rule.|

---------------------------------

#### <a id="devices"></a> Resource /devices ####

*Updated on Mon, 2014-01-22*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json** or **xml**|
|HTTP Methods|**GET**|
|Resource family|**device**|
|Response Object|**Array [ Device ]**|
|API Version|**v1.0**|

Represents domotic devices handled by Dog and "controllable" by applications using this API.

**URL:** /devices

|Method|Description|
|:-----|:----------|
| GET | List all devices (with their details) used by the Dog gateway |

**Example Request**

	GET http://www.mydog.com/api/v1/devices
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='1' %}
<pre class="pre-scrollable">
	{% include restapi/get-configuration-response.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='2' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-configuration-response.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}


---

#### <a id="singleDevice"></a> Resource /devices/{device-id} ####

*Updated on Thu, 2014-01-22*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json** or **xml**|
|HTTP Methods|**GET**|
|Resource family|**device**|
|Response Object|**Device**|
|API Version|**v1.0**|

Represents a single domotic device handled by Dog, identified by a unique *device-id* (currently encoded in the *id* attribute for the XML response to the [GET /devices](#devices) request), and "controllable" by applications using this API. 

*URL:* /devices/{device-id}

|Method|Description|
|:-----|:----------|
| GET |Returns the details of the device identified by the given *device-id* |

**GET: Example**

	GET http://www.mydog.com/api/v1/devices/Lamp_Holder

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='3' %}
<pre class="pre-scrollable">
	{% include restapi/get-configuration-single-device.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='4' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-configuration-single-device.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="device-location"></a> Resource /devices/{device-id}/location ####

*Updated on Thu, 2013-11-11*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**PUT**|
|Resource family|**device**|
|Response Object|**String**|
|API Version|**v1.0**|

Updates the location of a single domotic device handled by Dog, identified by a unique *device-id*. 

*URL:* /devices/{device-id}/location

|Method|Description|
|:-----|:----------|
| PUT |Update the location of the device identified by the given *device-id* |

**PUT: Example**

	PUT http://www.mydog.com/api/v1/devices/Lamp_Holder/location
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='5' %}
<pre class="pre-scrollable">
	{% include restapi/put-location-single-device.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="device-description"></a> Resource /devices/{device-id}/description ####

*Updated on Thu, 2013-11-11*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**Requires app key**|
|Response Format|**json**|
|HTTP Methods|**PUT**|
|Resource family|**device**|
|Response Object|**String**|
|API Version|**v1.0**|

Updates the description (i.e., the long name) of a single domotic device handled by Dog, identified by a unique *device-id*. 

*URL:* /devices/{device-id}/description

|Method|Description|
|:-----|:----------|
| PUT |Update the description (i.e., the long name) of the device identified by the given *device-id* |

**PUT: Example**
	
	PUT http://www.mydog.com/api/v1/devices/Lamp_Holder/description
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='6' %}
<pre class="pre-scrollable">
	{% include restapi/put-description-single-device.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="status"></a> Resource /devices/status ####

*Updated on Mon, 2014-01-22* <span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**status**|
|Response Object|**Array [ DeviceState ]**|
|API Version|**v1.0**|

Represents the status of devices registered in the Dog gateway runtime, i.e., defined in the Dog [configuration](#devicesConfiguration) and successfully registered within the gateway runtime.

**URL:** /devices/status

|Method|Description|
|:-----|:----------|
| GET | List the current status of all devices actually managed by the Dog gateway, i.e. defined in the Dog configuration and registered within the gateway runtime, be they active or not |

**Example Request**

	GET http://www.mydog.com/api/v1/devices/status
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='7' %}
<pre class="pre-scrollable">
	{% include restapi/get-all-device-status.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='8' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-all-device-status.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="status-single"></a> Resource /devices/{device-id}/status ####

*Updated on Thu, 2014-01-22*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**status**|
|Response Object|**DeviceState**|
|API Version|**v1.0**|

Represents the status of the device identified by the given *device-id* and registered in the Dog gateway runtime, i.e., defined in the Dog [configuration](#devicesConfiguration) and successfully registered within the gateway runtime.

**URL:** /devices/{device-id}/status

|Method|Description|
|:-----|:----------|
| GET | List the current status of the device identified by the given *device-id* and actually managed by the Dog gateway, i.e. defined in the Dog configuration and registered within the gateway runtime, be they active or not |

**Example Request**

	GET http://www.mydog.com/api/v1/devices/MeteringPowerOutlet/status
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='9' %}
<pre class="pre-scrollable">
	{% include restapi/get-single-device-status.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='10' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-single-device-status.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="command"></a> Resource /devices/{device-id}/commands/{command-name} ####

*Updated on Fri, 2014-05-06* <span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**PUT** or **POST**|
|Resource family|**device**|
|Response Object|**none**|
|API Version|**v1.0**|

Represents a command, identified by a *command-name*, to be sent to the device identified by the given *device-id*.

The *command-name* is the value associated to the `realCommandName` parameter present in the device description (see the [\devices](#devices) resource).

Commands are idempotent: the same command always results in the same behavior of the selected device. 
If the command brings the device in same state in which the device is, no differences will be appreciable. 

*URL:* /devices/{device-id}/commands/{command-name}

|Method|Description|
|:-----|:----------|
| PUT | sends the command identified by the given *command-name*|
| POST | sends the command identified by the given *command-name* (deprecated)|

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Requests' panelCount='11' %}
<pre class="pre-scrollable">
	{% include restapi/put-single-device-command.html %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

### <a id="command-examples"></a> Examples ###

---

#### <a id="thermostatic-valves"></a> Thermostatic Valves ####

---

#### <a id="weekly-schedule"></a> Resource /devices/{device-id}/commands/setClimateSchedule ####

*Updated on Thu, 2013-12-05*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**PUT**|
|Resource family|**device**|
|Response Object|**String**|
|API Version|**v1.0**|

Sets the Weekly Schedule for the Thermostatic Vlave identified by {device-id}

*URL:* /devices/{device-id}/commands/setClimateSchedule

|Method|Description|
|:-----|:----------|
| PUT |Set the new weekly schedule for the Thermostatic Valve identified by {device-id}, the previous schedule is discarded.|
| POST |*(Deprecated)* Set the new weekly schedule for the Thermostatic Valve identified by {device-id}, the previous schedule is discarded.|

**PUT: Example**
	
	PUT http://www.mydog.com/api/v1/devices/ThermostaticRadiatorValve_1/commands/setClimateSchedule

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='12' %}
<pre class="pre-scrollable">
	{% include restapi/put-climate-schedule.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="daily-schedule"></a> Resource /devices/{device-id}/commands/setDailyClimateSchedule ####

*Updated on Thu, 2013-12-05*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**PUT**|
|Resource family|**device**|
|Response Object|**String**|
|API Version|**v1.0**|


Sets the Daily Schedule for the Thermostatic Valve identified by {device-id}

*URL:* /devices/{device-id}/commands/setDailyClimateSchedule

|Method|Description|
|:-----|:----------|
| PUT |Set the new daily schedule for the Thermostatic Valve identified by {device-id}, the previous schedule is discarded.|
| POST |*(Deprecated)* Set the new daily schedule for the Thermostatic Valve identified by {device-id}, the previous schedule is discarded.|

**PUT: Example**

	PUT http://www.mydog.com/api/v1/devices/ThermostaticRadiatorValve_1/commands/setDailyClimateSchedule
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='13' %}
<pre class="pre-scrollable">
	{% include restapi/put-daily-climate-schedule.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="setpoint"></a> Resource /devices/{device-id}/commands/setTemperatureAt ####

*Updated on Thu, 2013-12-05*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**PUT**|
|Resource family|**device**|
|Response Object|**String**|
|API Version|**v1.0**|

Sets the Temperature setPoint for the Thermostatic Valve identified by {device-id}

*URL:* /devices/{device-id}/commands/setTemperatureAt

|Method|Description|
|:-----|:----------|
| PUT |Set the new temperature setPoint for the Thermostatic Valve identified by {device-id}, the previous schedule is discarded.|
| POST |*(Deprecated)* Set the new temperature setPoint for the Thermostatic Valve identified by {device-id}, the previous schedule is discarded.|

**PUT: Example**

	PUT http://www.mydog.com/api/v1/devices/ThermostaticRadiatorValve_1/commands/setTemperatureAt
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='14' %}
<pre class="pre-scrollable">
	{% include restapi/put-setpoint.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="dogConfiguration"></a> Resource /dog/configuration ####

*Updated on Tue, 2013-10-22* <span class="label label-important pull-right">Unavailable</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**configuration**|
|Response Object|**DeviceConfigurations**|
|API Version|**v1.1**|

*URL:* /dog/configuration

|Method|Description|
|:-----|:----------|
| GET | List all low-level device configurations used by the Dog gateway |
| PUT | Create / Update the set of low-level device configurations that Dog should manage. Any device configuration matching an already configured device replaces the existing configuration, whereas devices not being mentioned in the current Dog configurations are added, and deployed at runtime, i.e., made available to calling applications.|

---


## <a id="environmentAPI"></a> Environment API ##

---

#### <a id="environment"></a> Resource /environment ####

*Updated on Thu, 2013-11-09*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json** or **xml**|
|HTTP Methods|**GET**|
|Resource family|**environment**|
|Response Object|**Array [ Buildings ]**|
|API Version|**v1.0**|

Represents the environment (i.e., the building) configured in Dog. 

**URL:** /environment

|Method|Description|
|:-----|:----------|
| GET | List the building environments (i.e., the building) configured in the Dog gateway. |

**Example Request**

	GET http://www.mydog.com/api/v1/environment
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='15' %}
<pre class="pre-scrollable">
	{% include restapi/get-environment.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='16' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-environment.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="flats"></a> Resource /environment/flats ####

*Updated on Thu, 2013-11-09*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET** or **POST**|
|Resource family|**environment**|
|Response Object|**Array [ Flat ]**|
|API Version|**v1.0**|

Represents all the flats present in the environment (i.e., int the building). 

**URL:** /environment/flats

|Method|Description|
|:-----|:----------|
| GET | List all the flats present in the in the (only, right now) building configured in Dog. |
| POST | Add a new flat to the building configured in Dog. |


**Example Requests**

	GET http://www.mydog.com/api/v1/environment/flats
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='17' %}
<pre class="pre-scrollable">
	{% include restapi/get-environment-flat.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	POST http://www.mydog.com/api/v1/environment/flats

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='18' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/post-environment-flat.json %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="single-flat"></a> Resource /environment/flats/{flat-id} ####

*Updated on Wed, 2014-05-07*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET** or **PUT**|
|Resource family|**environment**|
|Response Object|**Flat**|
|API Version|**v1.0**|

Represents a specific flat present in the environment (i.e., in the building). 

**URL:** /environment/flats

|Method|Description|
|:-----|:----------|
| GET | Returns the details of the flat identified by the given *flat-id*. |
| PUT | Update the flat identified by the given *flat-id*. |
| DELETE | Delete the flat identified by the given *flat-id*. |


**Example Requests**

	GET http://www.mydog.com/api/v1/environment/flats/flat
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='19' %}
<pre class="pre-scrollable">
	{% include restapi/get-environment-single-flat.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	PUT http://www.mydog.com/api/v1/environment/flats/flat

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='20' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/put-environment-single-flat.json %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	DELETE http://www.mydog.com/api/v1/environment/flats/flat

---

#### <a id="rooms-in-flat"></a> Resource /environment/flats/{flat-id}/rooms ####

*Updated on Thu, 2013-11-09*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET** or **POST**|
|Resource family|**environment**|
|Response Object|**Array [ Room ]**|
|API Version|**v1.0**|

Represents all the rooms present in a given flat. 

**URL:** /environment/flats

|Method|Description|
|:-----|:----------|
| GET | List all the rooms present in the flat identified by the given *flat-id*. |
| POST | Add a new room to the flat identified by the given *flat-id*. |

**Example Requests**

	GET http://www.mydog.com/api/v1/environment/flats/flat/rooms
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='21' %}
<pre class="pre-scrollable">
	{% include restapi/get-environment-rooms.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	POST http://www.mydog.com/api/v1/environment/flats/flat/rooms

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='22' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/post-environment-rooms.json %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="single-room-in-flat"></a> Resource /environment/flats/{flat-id}/rooms/{room-id} ####

*Updated on Wed, 2014-05-07*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET** or **PUT**|
|Resource family|**environment**|
|Response Object|**Room**|
|API Version|**v1.0**|

Represents a specific room in the flat identified by the given *flat-id*. 

**URL:** /environment/flats/{flat-id}/rooms/{room-id}

|Method|Description|
|:-----|:----------|
| GET | Returns the details of the room identified by the given *room-id* and located in the given flat. |
| PUT | Update the room identified by the given *room-id* and located in the given flat. |
| DELETE | Delete the room identified by the given *room-id* and located in the given flat. |

**Example Requests**

	GET http://www.mydog.com/api/v1/environment/flats/flat/rooms/kitchen
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='23' %}
<pre class="pre-scrollable">
	{% include restapi/get-environment-single-room.json %}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	PUT http://www.mydog.com/api/v1/environment/flats/flat/rooms/kitchen

{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='24' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/put-environment-single-room.json %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	DELETE http://www.mydog.com/api/v1/environment/flats/flat/rooms/kitchen

---

## <a id="rulesAPI"></a> Rules API ##

---

#### <a id="rules"></a> Resource /rules/ ####

*Updated on Thu, 2013-11-08*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**xml** or **json**|
|HTTP Methods|**GET** or **POST**|
|Resource family|**rules**|
|Response Object|**Array [ Rule ]**|
|API Version|**v1.0**|

Represents the rules registered in Dog. By using this resource, it is possible to get all the existing rules or add a new rule.

Currently, all the responses and the requests are in XML format.


**URL:** /rules/

|Method|Description|
|:-----|:----------|
| GET | Returns all the existing rules. |
| POST | Add a new rule to the current rules set. If the rule already exists, it will be overwritten. |

**Example Requests**

	GET http://www.mydog.com/api/v1/rules
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='25' %}
<pre class="pre-scrollable">
	{% include restapi/get-rules.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='26' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-rules.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	POST http://www.mydog.com/api/v1/rules
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='27' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/post-rules.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---

#### <a id="single-rule"></a> Resource /rules/{rule-id} ####

*Updated on Thu, 2013-11-08*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**xml** or **json**|
|HTTP Methods|**GET**, **PUT** or **DELETE**|
|Resource family|**rules**|
|Response Object|**Rule**|
|API Version|**v1.0**|

Represents an existing rule registered in Dog. By using this resource, it is possible to update or delete an existing rule.

Currently, all the responses and the requests are in XML format.

**URL:** /rules/{rule-id}

|Method|Description|
|:-----|:----------|
| GET | Returns the details of the rules identified by *rule-id*. |
| PUT | Update the rule identified by *rule-id*. |
| DELETE | Remove the rule identified by the given *rule-id*. |

**Example Requests**

	GET http://www.mydog.com/api/v1/rules/onToOn
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='28' %}
<pre class="pre-scrollable">
	{% include restapi/get-single-rule.json %}
</pre>
{% include close-accordion-item.html %}
{% include open-accordion-item.html panelTitle='Example Response (XML)' panelCount='29' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/get-single-rule.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

	PUT http://www.mydog.com/api/v1/rules/consumptionToHigh
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Request Body' panelCount='30' %}
<pre class="pre-scrollable">
	{% capture xml %}
	{% include restapi/put-single-rule.xml %}
	{% endcapture %}
	{{ xml | escape }}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}
	
	DELETE http://www.mydog.com/api/v1/rules/onToOn
