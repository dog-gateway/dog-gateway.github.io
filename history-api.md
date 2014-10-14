---
layout: default
title: The Dog Gateway - WebSocket API
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
|[/devices/{device-id}/states/continuous/{state-name}/{state-params}](#specificContinuousStatesWithParams) | Tthhe history of all continuous states of the given type, for the given device id, with values restricted to the given parameters only. |