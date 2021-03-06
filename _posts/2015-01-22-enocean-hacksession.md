---
layout: post
title:  "EnOcean hack session using Python and Dog"
date:   2015-01-22 12:17
categories: news
active: Blog
---

Since the arrival of NodOn® devices, we wanted to start experimenting with EnOcean and Dog, even if the current version of our EnOcean Java Library (EnJ) is still a bit too experimental for being of any use in Dog drivers creation (they will be delivered in the next months).

We thus decided to set-up a quick Python-based test program to "sniff" EnOcean data generated by the devices using the EnOcean USB300 stick as a gateway. We grabbed the rocker switch EEP specification and  we set-up a first working test quite easily. The soft remote switch worked like a charm, therefore, as sometimes happens, we decided to evolve our bare, low-level, sniffer into a quick hack integration of the remote with Dog, using the NodOn® soft remote to actuate a Dog controlled device. The resulting [Python code](https://gist.github.com/dbonino/a28e8517b0be2ca7c1af#file-enoceansniffer-py) is reported below (exploiting the rest library built in some previous posts, and available [here](https://github.com/AmI-2014/Python-Lights/blob/master/rest.py)) and can be freely re-used under the Apache v2.0 License.

<script src="https://gist.github.com/dbonino/a28e8517b0be2ca7c1af.js"></script>