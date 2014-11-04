---
layout: default
title: The Dog Gateway - History API
active: Develop
sidebar: history-api-sidebar.html
---
## <a id="start"></a>Dog History API - Documentation ##

The Dog History API offers REST primitives to query, updated and delete (**soon**) historical data  sampled by Dog and stored locally thanks to the [h2eventstore](https://github.com/dog-gateway/h2-eventstore) bundle.

The API extends the Dog [REST API](rest-api.html) thus maintaining the same message structure and format, but with additional resources and topics.

The History API allows to:

*  Get historical data
	*  about all notifications issued by a device in a given time frame;
	*  about all states assumed by a device in a given time frame;
	*  about specific notifications issued by a device in a given time frame;
	*  about specific states assumed by a device in a given time frame;
*  Insert historical data
	*  about specific notifications issued by a device in a given time frame;
	*  about specific states assumed by a device in a given time frame;
	
API access is currently available over HTTP, at:

  `http://<dog-address>/api/v1/`. 

To select the desired response type (only JSON is currently supported), the `Accept` HTTP header must be used in the request.
In the same way, a proper `Content-Type` *must* be always present for `PUT` and `POST` requests.

#### Function summary ####


|||
|:----|:----|
|Resource | Description |
|[history/devices/{device-id}/notifications/parametric/all](#allParametric) | The history of all parametric notifications associated to the given device, identified by the given device id. |
|[history/devices/{device-id}/notifications/nonparametric/all](#allNonParametric) | The history of all non parametric notifications associated to the given device, identified by the given device id. |
|[history/devices/{device-id}/notifications/parametric/{notification-name}/{notification-params}](#specificParametricNotificationsWithParams) | The history of all parametric notifications of the given type, for the given device id, with values restricted to the given parameters only. |
|[history/devices/{device-id}/notifications/parametric/{notification-name}](#specificParametricNotifications) | The history of all parametric notifications of the given type, for the given device id. |
|[history/devices/{device-id}/notifications/nonparametric/{notification-name}](#specificNonParametricNotifications) | The history of all non-parametric notifications of the given type, for the given device id. |
|[history/devices/{device-id}/states/continuous/all](#allContinuousStates) | The history of all continuous states associated to the given device, identified by the given device id. |
|[history/devices/{device-id}/states/discrete/all](#allDiscreteStates) | The history of all discrete states associated to the given device, identified by the given device id.|
|[history/devices/{device-id}/states/continuous/{state-name}/{state-params}](#specificContinuousStatesWithParams) | The history of all continuous states of the given type, for the given device id, with values restricted to the given parameters only. |
|[history/devices/{device-id}/states/continuous/{state-name}](#specificContinuousStates) | The history of all continuous states of the given type, for the given device id. |
|[history/devices/{device-id}/states/discrete/{state-name}](#specificDiscreteStates) | The history of all discrete states of the given type, for the given device id. |

---------------------------------------

#### <a id="allParametric"></a> Resource history/devices/{device-id}/notifications/parametric/all ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**notifications**|
|Response Object|**Array [Notification]**|
|API Version|**v1.0**|

Represents the history of all parametric notifications associated to the given device, identified by the given device id.

**URL:** history/devices/{device-id}/notifications/parametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/TemperatureAndHumiditySensor_76/notifications/parametric/all?start=20141028T17:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="1" %}
<pre class="pre-scrollable">
{
  "datastreams" : [ {
    "name" : "TemperatureMeasurementNotification",
    "deviceUri" : "TemperatureAndHumiditySensor_76",
    "id" : "TemperatureAndHumiditySensor_76/TemperatureMeasurementNotification",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.314+0000",
      "value" : "24.6",
      "unit" : "C"
    }, {
      "at" : "2014-10-28T16:49:20.323+0000",
      "value" : "24.7",
      "unit" : "C"
    } ],
    "parameters" : ""
  }, {
    "name" : "HumidityMeasurementNotification",
    "deviceUri" : "TemperatureAndHumiditySensor_76",
    "id" : "TemperatureAndHumiditySensor_76/HumidityMeasurementNotification",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.315+0000",
      "value" : "41.0",
      "unit" : "%"
    } ],
    "parameters" : ""
  } ]
}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allNonParametric"></a> Resource history/devices/{device-id}/notifications/nonparametric/all ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**notifications**|
|Response Object|**Array [Notification]**|
|API Version|**v1.0**|

Represents the history of all non-parametric notifications associated to the given device, identified by the given device id.

**URL:** history/devices/{device-id}/notifications/nonparametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all non parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/EnergyAndPowerMeteringLevelControllableOutput_74/notifications/nonparametric/all?start=20141028T17:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="2" %}
<pre class="pre-scrollable">
{
  "datastreams" : [ {
    "name" : "events",
    "deviceUri" : "EnergyAndPowerMeteringLevelControllableOutput_74",
    "id" : "EnergyAndPowerMeteringLevelControllableOutput_74/events",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.273+0000",
      "value" : "on",
      "unit" : ""
    } ],
    "parameters" : ""
  } ]
}	
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificParametricNotificationsWithParams"></a>Resource history/devices/{device-id}/notifications/parametric/{notification-name}/{notification-params} ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**notifications**|
|Response Object|**Array [Notification]**|
|API Version|**v1.0**|

Represents the history of all parametric notifications of the given type, for the given device id, with values restricted to the given parameters only.

**URL:** history/devices/{device-id}/notifications/parametric/{notification-name}/{notification-params}

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications of the given type, for the given device id, with values restricted to the given parameters only. Parameters are expressed in the form: {paramName}-{paramValue}|

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/meter1/notifications/parametric/ThreePhaseActivePowerNotification/phaseId-L1?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="5" %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificParametricNotifications"></a> Resource history/devices/{device-id}/notifications/parametric/{notification-name} ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**notifications**|
|Response Object|**Array [ Notifications]**|
|API Version|**v1.0**|

Represents the history of all parametric notifications of the given type, for the given device id.

**URL:** history/devices/{device-id}/notifications/parametric/{notification-name}

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications of the given type, for the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/meter1/notifications/parametric/ThreePhaseActivePowerNotification?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="6" %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificNonParametricNotifications"></a> Resource history/devices/{device-id}/notifications/nonparametric/{notification-name} ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**notifications**|
|Response Object|**Array [Notifications]**|
|API Version|**v1.0**|

Represents The history of all non-parametric notifications of the given type, for the given device id.

**URL:** history/devices/{device-id}/notifications/nonparametric/{notification-name}

|Method|Description|
|:-----|:----------|
| GET | Lists all non parametric notifications of the given type associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/meter1/notifications/nonparametric/OnNotification?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="7" %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allContinuousStates"></a> Resource history/devices/{device-id}/states/continuous/all ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**states**|
|Response Object|**Array [State]**|
|API Version|**v1.0**|

Represents the history of all continuous states associated to the given device, identified by the given device id. 

**URL:** history/devices/{device-id}/states/continuous/all

|Method|Description|
|:-----|:----------|
| GET | Lists all continuous states associated to the given device, identified by the given device id.  |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/EnergyAndPowerMeteringLevelControllableOutput_74/states/continuous/all?start=20141028T17:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="3" %}
<pre class="pre-scrollable">
{
  "datastreams" : [ {
    "name" : "LevelState",
    "deviceUri" : "EnergyAndPowerMeteringLevelControllableOutput_74",
    "id" : "EnergyAndPowerMeteringLevelControllableOutput_74/LevelState",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.310+0000",
      "value" : "255.0",
      "unit" : ""
    } ],
    "parameters" : ""
  }, {
    "name" : "SinglePhaseActiveEnergyState",
    "deviceUri" : "EnergyAndPowerMeteringLevelControllableOutput_74",
    "id" : "EnergyAndPowerMeteringLevelControllableOutput_74/SinglePhaseActiveEnergyState",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.311+0000",
      "value" : "0.0",
      "unit" : "kWh"
    } ],
    "parameters" : ""
  }, {
    "name" : "SinglePhaseActivePowerMeasurementState",
    "deviceUri" : "EnergyAndPowerMeteringLevelControllableOutput_74",
    "id" : "EnergyAndPowerMeteringLevelControllableOutput_74/SinglePhaseActivePowerMeasurementState",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.312+0000",
      "value" : "0.0",
      "unit" : "W"
    } ],
    "parameters" : ""
  } ]
}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allDiscreteStates"></a> Resource history/devices/{device-id}/states/discrete/all ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**states**|
|Response Object|**Array [State]**|
|API Version|**v1.0**|

Represents the history of all discrete states associated to the given device, identified by the given device id.

**URL:** history/devices/{device-id}/states/discrete/all

|Method|Description|
|:-----|:----------|
| GET | Lists all discrete states associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/EnergyAndPowerMeteringLevelControllableOutput_74/states/discrete/all?start=20141028T17:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="4" %}
<pre class="pre-scrollable">
{
  "datastreams" : [ {
    "name" : "events",
    "deviceUri" : "EnergyAndPowerMeteringLevelControllableOutput_74",
    "id" : "EnergyAndPowerMeteringLevelControllableOutput_74/events",
    "datapoints" : [ {
      "at" : "2014-10-28T16:49:20.311+0000",
      "value" : "on",
      "unit" : ""
    } ],
    "parameters" : ""
  } ]
}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificContinuousStatesWithParams"></a> Resource history/devices/{device-id}/states/continuous/{state-name}/{state-params} ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**states**|
|Response Object|**Array [State]**|
|API Version|**v1.0**|

Represents the history of all continuous states of the given type, for the given device id, with values restricted to the given parameters only.

**URL:** history/devices/{device-id}/states/continuous/{state-name}/{state-params}

|Method|Description|
|:-----|:----------|
| GET | Lists all continuous states of the given type, for the given device id, with values restricted to the given parameters only. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/meter1/states/continuous/ThreePhaseActivePowerMeasurementState/phaseId-L1?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="8" %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificContinuousStates"></a> Resource history/devices/{device-id}/states/continuous/{state-name} ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**states**|
|Response Object|**Array [State]**|
|API Version|**v1.0**|

Represents the history of all continuous states of the given type, for the given device id

**URL:** history/devices/{device-id}/states/continuous/{state-name}

|Method|Description|
|:-----|:----------|
| GET | Lists all continuous states of the given type, for the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/MeteringPowerOutlet_75/states/continuous/SinglePhaseActiveEnergyState?start=20141028T17:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="9" %}
<pre class="pre-scrollable">
{
  	"name" : "SinglePhaseActivePowerMeasurementState",
  	"deviceUri" : "MeteringPowerOutlet_75",
  	"id" : "MeteringPowerOutlet_75/SinglePhaseActivePowerMeasurementState",
	"datapoints":"[
		{
			"at":"2014-10-28T17:49:40.560+0100",
			"value": "0.023",
			"unit":"kWh"
		},
		{
			"at":"2014-10-28T17:49:43.935+0100",
			"value": "0.023",
			"unit":"kWh"
		},
		{
			"at":"2014-10-28T17:49:47.237+0100",
			"value":"0.023",
			"unit":"kWh"
		},
		{
			"at":"2014-10-28T17:49:50.145+0100",
			"value":"0.023",
			"unit":"kWh"
		},
		{
			"at":"2014-10-28T17:49:53.110+0100",
			"value":"0.023",
			"unit":"kWh"
		},
		{
			"at":"2014-10-28T17:49:56.281+0100",
			"value":"0.023",
			"unit":"kWh"
		}
	]
}

</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificDiscreteStates"></a> Resource history/devices/{device-id}/states/discrete/{state-name} ####

*Updated on Fri, 2014-10-17*
<span class="label label-info pull-right">API version 1.0</span>

|||
|----------------|------------------|
|Authentication |**None**|
|Response Format|**json**|
|HTTP Methods|**GET**|
|Resource family|**states**|
|Response Object|**Array [State]**|
|API Version|**v1.0**|

Represents the history of all discrete states of the given type, for the given device id.

**URL:** history/devices/{device-id}/states/discrete/{state-name}

|Method|Description|
|:-----|:----------|
| GET | Lists all discrete states of the given type, for the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/history/devices/MeteringPowerOutlet_75/states/discrete/OnOffState?start=20141017T17:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle="Example Response (JSON)" panelCount="10" %}
<pre class="pre-scrollable">
{
  "name" : "OnOffState",
  "deviceUri" : "MeteringPowerOutlet_75",
  "id" : "MeteringPowerOutlet_75/OnOffState",
  "datapoints" : [ 
  	{
    	"at" : "2014-10-28T16:49:40.560+0000",
    	"value" : "off",
    	"unit" : ""
  	}, 
  	{
    	"at" : "2014-10-28T16:49:43.935+0000",
    	"value" : "off",
    	"unit" : ""
  	}
  ]
}
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}
