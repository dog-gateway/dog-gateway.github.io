---
layout: default
title: The Dog Gateway
---

The Dog gateway (formerly known as Domotic OSGi Gateway) is a software gateway offering a single, uniform, transparent, rest-based access to a variety of home and building automation devices (and protocols). While several alternatives could be found offering apparently similar services, The Dog gateway offers unprecedented
abstraction capability by exploiting a sound, consistent and validated model based on description logic (i.e., the DogOnt ontology).

#### Why device abstraction? ####
* To decouple application development (web, desktop, mobile or cloud) from single technologies and related peculiarities, idiosynchrasies, and issues.
* To enable application-level inter-operation of different technologies, devices, and automation networks.
* To enable developers to only concentrate on control logic, which can be defined *once* and deployed *wherever*  needed, delegating the "network stuff" to the gateway.
* To enable advanced, semantic-based, solutions for home and building automation.

#### Which technologies are supported? ####
The Dog gateway can virtually support any home, building and automation protocol. It currently offers support for a relatively wide range of networks, including bus-technologies, wireless-systems and typical industrial automation solutions. In particular, supported protocols include:

##### Bus technologies #####
* KNX
* MyHome (BTicino)
* Echelon (through the ILON100 gateway)

##### Wireless Technologies #####
* ZWave	
* ZigBee
* EnOcean (currently under development)

##### Industrial automation #####
* Modbus (TCP, RTU, RTU over TCP)

##### Other technologies #####
* Smart Watch - Texas Instruments TIxxx
* Philips HUE (currently under development)

#### How much does it costs? ####
**Nothing**: it is an Open Source software released under the Apache v2.0 License. However if you really like our software, you can provide funding for next developments, in any form you prefer. 

#### If I'm not an hacking guy?####
* You can buy a pre-installed 8Gbyte SD card for your RaspberryPi for just  16 Euro.
* You can buy our hardware, namely "The Orb", with Dog and ZWave pre-installed. (You can also require other technologies when ordering).