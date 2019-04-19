---
layout: post
title:  "Updated the Dog core and the Modbus Library"
date:   2019-04-19 07:40
categories: news
active: Blog
---
Today we release a relevant update of the core library which brings Dog in-line with the latest DogOnt v4.0.X ontology. Moreover, the update includes additional features for Notifications. In fact, in this new version, each notification may carry a notification unique id and the class name of the device who generated the notification. Additionally, ParametricNotifications have been enriched to provide a shared, generic, getNotificationValue which allows easier access to measures carried by notifications, without needing to know the exact type of the ParametricNotification being used.

Together with the core library update, we also release a development version of the modbus drivers with an improved handling of register types, byte-word-double-word ordering and several minorfixes. The development version is undergoing tests on the field and will soon be released as official upgrade.

Stay tuned and please contact us for any issue / bug / problem you might notice. 

The Dog development Team
