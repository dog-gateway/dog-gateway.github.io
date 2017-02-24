---
layout: post
title:  "UPnP advertiser available"
date:   2016-10-19 10:29
categories: news
active: Blog
---
Today we have released a first, yet to be refined version, of UPnP advertizer for Dog. 

It describes, and advertises, a Dog gateway as a UPnP Basic device (no services) and exploits the presentation URL field to let applications discover the Dog REST APIs endpoint through UPnP.
The bundle depends on a UPnP base driver implementation. It has been tested by exploiting the <a href="http://4thline.org/m2/org/fourthline/cling/cling-osgi-basedriver/2.0-alpha3/cling-osgi-basedriver-2.0-alpha3.jar">Cling OSGi base driver</a>, also available from (<a href="https://github.com/jomarmar/cling-osgi">https://github.com/jomarmar/cling-osgi</a>). As the bundle is implemented on the basis of the OSGi specification only, it should work with any other implementation of the OSGi UPnP base driver.


Stay tuned and let us know if you experience problems or if you have suggestions!

Have fun!

The Dog development Team