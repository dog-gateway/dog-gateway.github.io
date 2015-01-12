---
layout: post
title:  "ZigBee drivers are now available!"
date:   2014-07-01 12:40:00
categories: news
active: Blog
---
Today we published the first version of the Dog drivers for ZigBee Home Automation devices based on the lower layers of the [Jemma](http://ismb.github.io/jemma/) ZigBee stack. The drivers support: metered plugs, single phase meters, door and window sensors (still under testing), light sensors, movement sensors and, temperature and humidity sensors.

Checkout the OSGi bundles from GitHub:

* [ZigBee Drivers](https://github.com/dog-gateway/zigbee-drivers)
* [Jemma for Dog](https://github.com/dog-gateway/jemma-for-dog)
* [Jemma for Dog dependencies](https://github.com/dog-gateway/jemma-for-dog/tree/master/jemma.dependencies)
* [Sample configuration](https://github.com/dog-gateway/zigbee-configuration)


To start developing using the Dog ZigBee drivers, checkout the above git repositories, import the projects in *ZigBee Drivers* and *Jemma for Dog*, import the jar files in the *Jemma for Dog dependencies* repository as binary plugin-projects and try running the sample configuration available in the *Sample Configuration* repository.


Have fun and let us know if something is broken!