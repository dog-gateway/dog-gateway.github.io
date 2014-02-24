---
layout: post
title:  "Device driver How-To (for existing technologies)"
date:   2014-02-14 16:38:11
categories: development-howto
---

Although a technology, e.g., ZWave might already be supported in Dog, there are cases in which drivers for specific devices are missing. In this simple tutorial we will tackle development of a new device driver for a technology already supported in Dog.

The first step to accomplish when starting to develop a new device driver is to identify the corresponding device model in DogOnt, (or in the [core-library](https://github.com/dog-gateway/core-library) repository).