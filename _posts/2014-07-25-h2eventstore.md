---
layout: post
title:  "History bundle published"
date:   2014-07-25 12:41:00
categories: news
---

The long awaited history bundle and the corresponding REST API are finally here. Today we publish the first experimental version of the dog history bundle (namely h2eventstore) which exploits the [h2](http://www.h2database.com) file database for storing all events monitored by the Dog gateway. 

The module can be configured to store notification, states, or both, and the event database location can be customized by users through the bundle configuration file (it.polito.elite.dog.addons.h2eventstore.cfg, example content is reported below).


	#set the database file location
	database.location = /path/dbname

	#enable notification storage
	enablenotifications = true

	#enable state storage
	enablestates = true


A REST api is also provided which allows querying the historic data stored by the h2eventstore bundle and to insert new data into the historical database. Delete functions are still under development.


Check out the bundles on github:

* [h2eventstore](https://github.com/dog-gateway/h2-eventstore)
* [historyapi](https://github.com/dog-gateway/history-api)

Have fun and let us know if something is broken!