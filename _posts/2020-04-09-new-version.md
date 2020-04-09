---
layout: post
title:  "Dog 3.2.0 is OUT!"
date:   2020-04-09 20:00
categories: news
active: Blog
---
Today we released the 3.2.0 version of Dog, which includes support for device-level diagnostic events and integrates a ConfigAdmin plugin which allows using environment variables in configuration files.
This last change a cornerstone which enables Dog to run inside Docker containers with configuration being provided through env vars.

The corresponding DEBIAN package is now available on this site and includes a minimal, yet working version of Dog incorporating EnOcean and Modbus drivers. It has been tested primarily on Raspbian (Buster and earlier), however it should run on Ubuntu 18.04 and Debian Buster with almost no issue.

Meanwhile, we also updated the stand-alone skeleton for packaging a Dog distribution from scratch. This last version of the stand-alone skeleton is aligned to the one used in packaged versions.

Stay tuned and please contact us for any issue / bug / problem you might notice. 

The Dog development Team
