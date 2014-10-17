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

  `http://<dog-address>/api/v1`. 

To select the desired response type (only JSON is currently supported), the `Accept` HTTP header must be used in the request.
In the same way, a proper `Content-Type` *must* be always present for `PUT` and `POST` requests.

#### Function summary ####


|||
|:----|:----|
|Resource | Description |
|[devices/{device-id}/notifications/parametric/all](#allParametric) | The history of all parametric notifications associated to the given device, identified by the given device id. |
|[devices/{device-id}/notifications/nonparametric/all](#allNonParametric) | The history of all non parametric notifications associated to the given device, identified by the given device id. |
|[/devices/{device-id}/states/continuous/all](#allContinuousStates) | The history of all continuous states associated to the given device, identified by the given device id. |
|[/devices/{device-id}/states/discrete/all](#allDiscreteStates) | The history of all discrete states associated to the given device, identified by the given device id.|
|[/devices/{device-id}/notifications/parametric/{notification-name}/{notification-params}](#specificParametricNotificationsWithParams) | The history of all parametric notifications of the given type, for the given device id, with values restricted to the given parameters only. |
|[/devices/{device-id}/notifications/parametric/{notification-name}](#specificParametricNotifications) | The history of all parametric notifications of the given type, for the given device id. |
|[/devices/{device-id}/notifications/nonparametric/{notification-name}](#specificNonParametricNotifications) | The history of all non-parametric notifications of the given type, for the given device id. |
|[/devices/{device-id}/states/continuous/{state-name}/{state-params}](#specificContinuousStatesWithParams) | The history of all continuous states of the given type, for the given device id, with values restricted to the given parameters only. |
|[/devices/{device-id}/states/continuous/{state-name}](#specificContinuousState) | The history of all continuous states of the given type, for the given device id. |
|[/devices/{device-id}/states/discrete/{state-name}](#specificDiscreteState) | The history of all discrete states of the given type, for the given device id. |

---------------------------------------

#### <a id="allParametric"></a> Resource devices/{device-id}/notifications/parametric/all ####

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

**URL:** devices/{device-id}/notifications/parametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/all?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='1' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allNonParametric"></a> Resource devices/{device-id}/notifications/nonparametric/all ####

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

**URL:** devices/{device-id}/notifications/nonparametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all non parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/nonparametric/all?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='2' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allContinuousStates"></a> Resource /devices/{device-id}/states/continuous/all ####

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

**URL:** /devices/{device-id}/states/continuous/all

|Method|Description|
|:-----|:----------|
| GET | Lists all continuous states associated to the given device, identified by the given device id.  |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1//devices/meter1/states/continuous/all?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='3' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allDiscreteStates"></a> Resource /devices/{device-id}/states/discrete/all ####

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

**URL:** /devices/{device-id}/states/discrete/all

|Method|Description|
|:-----|:----------|
| GET | Lists all discrete states associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1//devices/lamp1/states/discrete/all?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='4' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificParametricNotificationsWithParams"></a>Resource /devices/{device-id}/notifications/parametric/{notification-name}/{notification-params} ####

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

**URL:** /devices/{device-id}/notifications/parametric/{notification-name}/{notification-params}

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications of the given type, for the given device id, with values restricted to the given parameters only. Parameters are expressed in the form: {paramName}-{paramValue}|

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/ThreePhaseActivePowerNotification/phaseId-L1?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='5' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="specificParametricNotifications"></a> Resource /devices/{device-id}/notifications/parametric/{notification-name} ####

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

**URL:** /devices/{device-id}/notifications/parametric/{notification-name}

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications of the given type, for the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/ThreePhaseActivePowerNotification?start=20141017T07:00:000Z&offset=100&limit=100
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='6' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allParametric"></a> Resource devices/{device-id}/notifications/parametric/all ####

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

Represents tyhe history of all parametric notifications associated to the given device, identified by the given device id.

**URL:** devices/{device-id}/notifications/parametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/all
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='7' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allParametric"></a> Resource devices/{device-id}/notifications/parametric/all ####

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

Represents tyhe history of all parametric notifications associated to the given device, identified by the given device id.

**URL:** devices/{device-id}/notifications/parametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/all
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='8' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allParametric"></a> Resource devices/{device-id}/notifications/parametric/all ####

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

Represents tyhe history of all parametric notifications associated to the given device, identified by the given device id.

**URL:** devices/{device-id}/notifications/parametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/all
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='9' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}

---------------------------------------

#### <a id="allParametric"></a> Resource devices/{device-id}/notifications/parametric/all ####

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

Represents tyhe history of all parametric notifications associated to the given device, identified by the given device id.

**URL:** devices/{device-id}/notifications/parametric/all

|Method|Description|
|:-----|:----------|
| GET | Lists all parametric notifications associated to the given device, identified by the given device id. |

{% include historyapi/get-parameters.md %}

**Example Request**

	GET http://www.mydog.com/api/v1/devices/meter1/notifications/parametric/all
	
{% include accordion-header.html %}
{% include open-accordion-item.html panelTitle='Example Response (JSON)' panelCount='10' %}
<pre class="pre-scrollable">
	TO BE FILLED
</pre>
{% include close-accordion-item.html %}
{% include accordion-footer.html %}
